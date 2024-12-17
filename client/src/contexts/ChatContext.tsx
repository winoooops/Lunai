import { createContext, useContext, useEffect, useState } from "react";
import { ApolloError, DocumentNode, LazyQueryHookOptions, useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import { Chat } from "@LunaiTypes/chat";
import { Message } from "@LunaiTypes/message";
import { useSpinnerContext } from "./SpinnerContext";
import { GET_CHATS } from "@/graphql/operations";
import { CreateStreamedTextReplyFromConversationDocument, CreateTextReplyFromPromptDocument, DeleteChatDocument, GetChatDocument, GetChatsDocument, OnMessageStreamCompleteDocument, OnMessageStreamDocument, UpdateChatDocument } from "@/graphql/generated/graphql";

interface ChatContextProps {
  chats: Chat[];
  activeChat: Chat | null;
  localMessages: Message[];
  updateChatLoading: boolean;
  updateChatError: ApolloError | undefined;
  getChat: (options: LazyQueryHookOptions<any, any>) => void;
  getChatLoading: boolean;
  getChatError: ApolloError | undefined;
  pendingText: { text: string, chatId: string };
  deleteChatById: (id: string) => void;
  focusChat: (id: string) => void;
  editChat: (id: string, payload: Partial<Chat>) => void;
  refetchChats: () => void;
  onSendTextReply: (prompt: string, routingCallback: (url: string) => void) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { enableLoading, disableLoading } = useSpinnerContext();
  // TODO: implement cache for chats, meaning that the chats will be fetched from the cache first, and then from the server if not found in the cache
  const [chats, setChats] = useState<Chat[]>([])
  const [pendingText, setPendingText] = useState<{ text: string, chatId: string }>({ text: "", chatId: "" });
  const [activeChatId, setActiveChatId] = useState<string>("");
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);


  const { data: chatsData, refetch: refetchChatsData } = useQuery(GetChatsDocument);
  const [getChat, { loading: getChatLoading, error: getChatError }] = useLazyQuery(GetChatDocument, { fetchPolicy: 'network-only' });

  const [updateChat, { loading: updateChatLoading, error: updateChatError }] = useMutation(UpdateChatDocument);
  const [deleteChat] = useMutation(DeleteChatDocument);

  const [createTextReplyFromPrompt] = useMutation(CreateTextReplyFromPromptDocument);
  const [createStreamedTextReplyFromConversation] = useMutation(CreateStreamedTextReplyFromConversationDocument);


  const { data: messageStreamData, error: messageStreamError } = useSubscription(OnMessageStreamDocument);
  const { data: messageStreamCompleteData, error: messageStreamCompleteError } = useSubscription(OnMessageStreamCompleteDocument);

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
      const { data, errors } = await createStreamedTextReplyFromConversation({ variables: { prompt, chatId: activeChatId }});

      if(errors) {
        throw new Error(errors[0].message);
      }


      if(data && data.createStreamedTextReplyFromConversation && data.createStreamedTextReplyFromConversation.chatId) {
        setLocalMessages((prev) => [...prev, data.createStreamedTextReplyFromConversation as Message]);
      }
    } else {
      // getting text reply from prompt
      const { data, errors } = await createTextReplyFromPrompt({ variables: { prompt }});

      if(errors) {
        throw new Error(errors[0].message);
      }

      if(data && data.createTextReplyFromPrompt && data.createTextReplyFromPrompt.chatId) {
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
      setChats(chatsData.chats as Chat[]);
    }

    return () => setChats([]);
  },[chatsData]);


  /**
   * fetch chat when active chat id changes
   */
  useEffect(() => {
    const fetchChat = async () => {
      if(activeChatId && activeChatId !== "") {
        // Clear the current messages while fetching
        setLocalMessages([]);
        
        const { data } = await getChat({ 
          variables: { id: activeChatId },
        });

        if(data && data.getChat) {
          setActiveChat(data.getChat as Chat);
          setLocalMessages(data.getChat.messages as Message[]);
        }
      }
    }

    fetchChat();

    return () => {
      setActiveChat(null);
      setLocalMessages([]);
      // Also clear any pending text when switching chats
      setPendingText({ chatId: "", text: "" });
    }
  }, [activeChatId, getChat]);


  useEffect(() => {
    if(getChatLoading) {
      enableLoading();
    } else {
      disableLoading();
    }
  },[getChatLoading])

  /**
   * focus chat by id
   * @param {string} id the chatId of the chat to focus
   */
  const focusChat = (id: string) => {
    if (id !== activeChatId) {  // Only update if it's a different chat
      setActiveChat(null);
      setLocalMessages([]);
      setActiveChatId(id);
    }
  }

  // Handle message stream updates
  useEffect(() => {
    if(messageStreamData && messageStreamData.messageStream) {
      setPendingText((prev) => ({
        // TODO: fix this 
        chatId: prev.chatId ? prev.chatId : messageStreamData.messageStream?.chatId ?? "",
        text: prev.text + (messageStreamData.messageStream?.content?.[0]?.text ?? "")
      }));
    }
  },[messageStreamData]);
  

  useEffect(() => {
    if(messageStreamCompleteData?.messageStreamComplete) {
      const { chatId } = messageStreamCompleteData.messageStreamComplete;
      if(chatId === activeChatId) {
        setPendingText({ chatId: "", text: "" });
      }
    }
  },[messageStreamCompleteData]);

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


  console.log(messageStreamData);
  if(messageStreamError) {
    console.error(messageStreamError);
  }

  if(messageStreamCompleteError) {
    console.error(messageStreamCompleteError);
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
      pendingText,
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