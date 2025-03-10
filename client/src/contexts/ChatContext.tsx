import { createContext, useContext, useEffect, useState } from "react";
import { ApolloError, LazyQueryHookOptions, useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import { Chat } from "@LunaiTypes/chat";
import { Message } from "@LunaiTypes/message";
import { useSpinnerContext } from "./SpinnerContext";
import { CreateStreamedTextReplyFromConversationDocument, CreateStreamedTextReplyFromPromptDocument, CreateTextReplyFromPromptDocument, DeleteChatDocument, GetChatDocument, GetChatsDocument, OnMessageStreamCompleteDocument, OnMessageStreamDocument, OnReasoningStreamCompleteDocument, OnReasoningStreamDocument, UpdateChatDocument } from "@/graphql/generated/graphql";

export interface ChatContextProps {
  chats: Chat[];
  activeChat: Chat | null;
  activeChatId: string;
  localMessages: Message[];
  updateChatLoading: boolean;
  updateChatError: ApolloError | undefined;
  getChat: (options: LazyQueryHookOptions<any, any>) => void;
  getChatLoading: boolean;
  getChatError: ApolloError | undefined;
  pendingText: { text: string, chatId: string };
  pendingReasoning: { text: string, chatId: string, messageId: string };
  deleteChatById: (id: string) => void;
  focusChat: (id: string) => void;
  focusNewChat: () => void;
  editChat: (id: string, payload: Partial<Chat>) => void;
  refetchChats: () => void;
  onSendTextReply: (prompt: string) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { enableLoading, disableLoading } = useSpinnerContext();
  // TODO: implement cache for chats, meaning that the chats will be fetched from the cache first, and then from the server if not found in the cache
  const [chats, setChats] = useState<Chat[]>([])
  // used to store the streamed text reply from the conversation with the chatId
  const [pendingText, setPendingText] = useState<{ text: string, chatId: string }>({ text: "", chatId: "" });
  // used to store the streamed reasoning from the conversation with the chatId and messageId
  const [pendingReasoning, setPendingReasoning] = useState<{ text: string, chatId: string, messageId: string }>({ text: "", chatId: "", messageId: "" });
  // used to store the active chatId
  const [activeChatId, setActiveChatId] = useState<string>("");
  // used to store the active chat
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  // used to store the local messages, which might be deviated from the server for a pending reply
  const [localMessages, setLocalMessages] = useState<Message[]>([]);


  const { data: chatsData, refetch: refetchChatsData } = useQuery(GetChatsDocument);
  const [getChat, { loading: getChatLoading, error: getChatError, refetch: refetchChat }] = useLazyQuery(GetChatDocument, { fetchPolicy: 'network-only' });

  const [updateChat, { loading: updateChatLoading, error: updateChatError }] = useMutation(UpdateChatDocument);
  const [deleteChat] = useMutation(DeleteChatDocument);

  const [createTextReplyFromPrompt] = useMutation(CreateTextReplyFromPromptDocument);
  const [createStreamedTextReplyFromPrompt] = useMutation(CreateStreamedTextReplyFromPromptDocument);
  const [createStreamedTextReplyFromConversation] = useMutation(CreateStreamedTextReplyFromConversationDocument);

  const { data: messageStreamData, error: messageStreamError } = useSubscription(OnMessageStreamDocument);
  const { data: messageStreamCompleteData, error: messageStreamCompleteError } = useSubscription(OnMessageStreamCompleteDocument);
  const { data: reasoningStreamData, error: reasoningStreamError } = useSubscription(OnReasoningStreamDocument);
  const { data: reasoningStreamCompleteData, error: reasoningStreamCompleteError } = useSubscription(OnReasoningStreamCompleteDocument);

  /**
   * function to send textreply  
   * @param prompt the prompt to send  
   * @param routingCallback the callback function to navigate to the new chat
   */
  const onSendTextReply = async (prompt: string) => {
    try {
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

        if(data?.createStreamedTextReplyFromConversation) {
          const { chatId, success, error } = data.createStreamedTextReplyFromConversation;
          if(success) {
            refetchChats();
          } else {
            throw new Error(error ?? "Failed to create streamed text reply from conversation");
          }
        }
      } else {
        const { data, errors } = await createStreamedTextReplyFromPrompt({ variables: { prompt }});

        if(errors) {
          throw new Error(errors[0].message);
        }

        if(data?.createStreamedTextReplyFromPrompt) {
          const { success, error } = data.createStreamedTextReplyFromPrompt;
          if(success) {
            refetchChats();
          } else {
            throw new Error(error ?? "Failed to create streamed text reply from prompt");
          }
        }
      }
    } catch (error) {
      console.error(error);
      // revert the local messages
      setLocalMessages(localMessages => localMessages.filter(message => message.id !== "temp-id"));
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

  const focusNewChat = () => {
    setActiveChat(null);
    setLocalMessages([]);
    setActiveChatId("");
  }

  // Handle message stream updates
  useEffect(() => {
    if(messageStreamData && messageStreamData.messageStream) {
      const chatId = messageStreamData.messageStream?.chatId ?? "";
      if(!activeChatId && chatId) {
        setActiveChatId(chatId);
      }

      setPendingText((prev) => ({
        // TODO: fix this 
        chatId: prev.chatId ? prev.chatId : messageStreamData.messageStream?.chatId ?? "",
        text: prev.text + (messageStreamData.messageStream?.content?.[0]?.text ?? "")
      }));

    }
  },[messageStreamData]);
  

  useEffect(() => {
    if(messageStreamCompleteData?.messageStreamComplete) {
      const { chatId, message } = messageStreamCompleteData.messageStreamComplete;

      setLocalMessages((prev) => [...prev, message as Message]);

      if(chatId === activeChatId) {
        setPendingText({ chatId: "", text: "" });
      }
    }
  },[messageStreamCompleteData]);

  useEffect(() => {
    if(reasoningStreamData && reasoningStreamData.reasoningStream) {
      const chatId = reasoningStreamData.reasoningStream?.chatId ?? "";
      if(!activeChatId && chatId) {
        setActiveChatId(chatId);
      }

      setPendingReasoning((prev) => ({
        chatId: prev.chatId ? prev.chatId : reasoningStreamData.reasoningStream?.chatId ?? "",
        text: prev.text + (reasoningStreamData.reasoningStream?.content?.[0]?.text ?? ""),
        messageId: reasoningStreamData.reasoningStream?.messageId ?? ""
      }));
    }
  },[reasoningStreamData]);
  
  useEffect(() => {
    if(reasoningStreamCompleteData?.reasoningStreamComplete) {
      const { chatId } = reasoningStreamCompleteData.reasoningStreamComplete;
      if(chatId === activeChatId) {
        setPendingReasoning({ chatId: "", text: "", messageId: "" });
      }
    }
  },[reasoningStreamCompleteData])

  /**
   * delete chat by id
   * @param {string} id the chatId of the chat to delete 
   */
  const deleteChatById = async (id: string) => {
    const { data, errors } = await deleteChat({ variables: { id }});
    if(errors) {
      console.error(errors);
    }

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
  }

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
      activeChatId,
      localMessages,
      updateChatLoading,
      updateChatError,
      getChat,
      getChatError,
      getChatLoading,
      deleteChatById,
      pendingText,
      pendingReasoning,
      focusChat,
      focusNewChat,
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