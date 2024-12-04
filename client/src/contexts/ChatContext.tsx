import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CHAT, GET_CHAT, GET_CHATS, UPDATE_CHAT } from "../graphql/operations";
import { Chat } from "@LunaiTypes/chat";
import { Message } from "@LunaiTypes/message";

interface ChatContextProps {
  chats: Chat[];
  activeChat: Chat | null;
  activeMessages: Message[];
  updateChatLoading: boolean;
  deleteChatById: (id: string) => void;
  focusChat: (id: string) => void;
  editChat: (id: string, payload: Partial<Chat>) => void;
  refetchChats: () => void;
  refetchChat: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TODO: Implement subscriptions to listen for real-time chat updates
  // This will allow the application to automatically receive updates
  // when chats are created, updated, or deleted.
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string>("");
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const { data: chatsData, refetch: refetchChatsData } = useQuery(GET_CHATS);
  const { loading, error, data: chatData, refetch: refetchChatData } = useQuery(GET_CHAT, {
    variables: { id: activeChatId || ""},
    skip: !activeChatId
  });

  const [updateChat, { loading: updateChatLoading }] = useMutation(UPDATE_CHAT);
  const [deleteChat] = useMutation(DELETE_CHAT);

  console.log(updateChatLoading);

  useEffect(() => {
    if(chatsData && chatsData.chats) {
      setChats(chatsData.chats);
    }

    return () => setChats([]);
  },[chatsData]);

  // Todo: should display a pending singal
  useEffect(() => {
    if(activeChatId && activeChatId !== "") {
      refetchChatData();
    }
  }, [activeChatId, refetchChatData])

  useEffect(() => {
    if(chatData && chatData.getChat) {
      setActiveChat(chatData.getChat);
    }

    return () => setActiveChat(null);
  },[chatData])

  const deleteChatById = async (id: string) => {
    const { data, errors } = await deleteChat({ variables: { id }});
    if(errors) {
      console.error(errors);
    }

    console.log(data);
    setActiveChat(null);
    setActiveChatId("");
    refetchChats();
  }

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

  const focusChat = (id: string) => {
    setActiveChatId(id); 
  }

  const activeMessages = activeChat ? activeChat.messages : [];  

  const refetchChats = () => refetchChatsData();

  const refetchChat = () => refetchChatData();

  return (
    <ChatContext.Provider value={{
      chats,
      activeChat,
      activeMessages,
      updateChatLoading,
      deleteChatById,
      focusChat,
      editChat,
      refetchChats,
      refetchChat
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