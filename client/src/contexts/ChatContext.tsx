import { createContext, useContext, useEffect, useState } from "react";
import { ApolloError, LazyQueryHookOptions, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_TEXT_REPLY_FROM_CONVERSATION, CREATE_TEXT_REPLY_FROM_PROMPT, DELETE_CHAT, GET_CHAT, GET_CHATS, UPDATE_CHAT } from "../graphql/operations";
import { Chat } from "@LunaiTypes/chat";
import { Message } from "@LunaiTypes/message";

interface ChatContextProps {
  chats: Chat[];
  activeChat: Chat | null;
  localMessages: Message[];
  updateChatLoading: boolean;
  updateChatError: ApolloError | undefined;
  getChat: (options: LazyQueryHookOptions<any, any>) => void;
  getChatLoading: boolean;
  getChatError: ApolloError | undefined;
  deleteChatById: (id: string) => void;
  focusChat: (id: string) => void;
  editChat: (id: string, payload: Partial<Chat>) => void;
  refetchChats: () => void;
  onSendTextReply: (prompt: string, routingCallback: (url: string) => void) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TODO: Implement subscriptions to listen for real-time chat updates
  // This will allow the application to automatically receive updates
  // when chats are created, updated, or deleted.
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string>("");
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);

  const { data: chatsData, refetch: refetchChatsData } = useQuery(GET_CHATS);
  const [getChat, { loading: getChatLoading, error: getChatError }] = useLazyQuery(GET_CHAT);

  const [updateChat, { loading: updateChatLoading, error: updateChatError }] = useMutation(UPDATE_CHAT);
  const [deleteChat] = useMutation(DELETE_CHAT);

  const [createTextReplyFromConversation] = useMutation(CREATE_TEXT_REPLY_FROM_CONVERSATION);
  const [createTextReplyFromPrompt] = useMutation(CREATE_TEXT_REPLY_FROM_PROMPT);


  /**
   * function to send textreply  
   * @param prompt the prompt to send  
   * @param routingCallback the callback function to navigate to the new chat
   */
  const onSendTextReply = async (prompt: string, routingCallback: (url: string) => void) => {
    if(activeChat && activeChat.messages.length > 0) {
      // update the local messages
      setLocalMessages([...localMessages, { 
        id: "temp-id",
        timestamp: new Date().toISOString(),
        model: "",
        role: "user",
        chatId: activeChatId,
        content: [{ type: "text", text: prompt }]
      }]);
      // getting text reply from conversation
      const { data, errors } = await createTextReplyFromConversation({ variables: { prompt, chatId: activeChatId }});

      if(errors) {
        throw new Error(errors[0].message);
      }

      setLocalMessages((prev) => [...prev, data.createTextReplyFromConversation]);
    } else {
      // getting text reply from prompt
      const { data, errors } = await createTextReplyFromPrompt({ variables: { prompt }});

      if(errors) {
        throw new Error(errors[0].message);
      }

      if(data.createTextReplyFromPrompt.chatId) {
        refetchChats();
        
        routingCallback(`/chat/${data.createTextReplyFromPrompt.chatId}`);
      }
    }
  }

  /**
   * fetch chats  
   */
  useEffect(() => {
    if(chatsData && chatsData.chats) {
      setChats(chatsData.chats);
    }

    return () => setChats([]);
  },[chatsData]);


  /**
   * fetch chat when active chat id changes
   */
  useEffect(() => {
    const fetchChat = async () => {
      if(activeChatId && activeChatId !== "") {
        const { data } = await getChat({ variables: { id: activeChatId }});
        if(data && data.getChat) {
          setActiveChat(data.getChat);
          // when a new chat is fetched, reset the local messages to sync up with the remote ones
          setLocalMessages(data.getChat.messages);
        }
      }
    }

    fetchChat();

    return () => {
      setActiveChat(null);
      setLocalMessages([]);
    }
  }, [activeChatId, getChat])


  /**
   * delete chat by id
   * @param {string} id the chatId of the chat to delete 
   */
  const deleteChatById = async (id: string) => {
    const { data, errors } = await deleteChat({ variables: { id }});
    if(errors) {
      console.error(errors);
    }

    console.log(data);
    // reset active chat
    setActiveChat(null);
    setActiveChatId("");
    // refetch chats to keep the list in sync
    refetchChatsData();
  }

  /**
   * edit chat by id
   * @param {string} updateChatId the chatId of the chat to update
   * @param {Partial<Chat>} input the partial chat object to update
   */
  const editChat = async (updateChatId: string, input: Partial<Chat>) => {
    const { data, errors, } = await updateChat({ variables: { 
      updateChatId,
      input
    }});

    if(errors) {
      console.error(errors);
    }

    console.log(data);
  }

  /**
   * focus chat by id
   * @param {string} id the chatId of the chat to focus
   */
  const focusChat = (id: string) => {
    // reset active chat
    setActiveChat(null);
    setActiveChatId(id); 
  }

  const refetchChats = () => refetchChatsData();

  return (
    <ChatContext.Provider value={{
      chats,
      activeChat,
      localMessages,
      updateChatLoading,
      updateChatError,
      getChat,
      getChatError,
      getChatLoading,
      deleteChatById,
      focusChat,
      editChat,
      refetchChats,
      onSendTextReply
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if(!context) {
    throw new Error(`useChatContext must be used within ChatContextProvider.`);
  }

  return context;
}