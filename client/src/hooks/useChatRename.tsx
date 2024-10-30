import { useEffect, useRef, useState } from "react";
import { ChatItem } from "../types/Chat";
import { useChatContext } from "../contexts/ChatContext";

const useChatRename = () => {
  const [editingChat, setEditingChat] = useState<{ id: number | null, title: string | undefined }>({ id: null, title: undefined });
  const inputRef = useRef<HTMLInputElement>(null);
  const { editChat } = useChatContext();
  
  useEffect(() => {
    if(inputRef.current && editingChat.id !== null) {
      inputRef.current.focus();
    }
  }, [editingChat]);

  const onEdit = (entry: ChatItem) => {
    setEditingChat({
      id: entry.id,
      title: entry.title
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingChat((prev) => ({...prev, title: e.target.value}))
  }

  const handleInputCancel = () => {
    setEditingChat({ id: null, title: undefined });
  }

  const handleSave = () => {
    if(editingChat.id != null && editingChat.title != undefined) {
      editChat(editingChat.id, {
        title: editingChat.title
      });
    }
    setEditingChat({ id: null, title: undefined });
  }

  const handleInputFocus = () => {
    if(inputRef.current) {
      inputRef.current.select();
    }
  }

  return {
    editingChat,
    inputRef,
    onEdit,
    handleInputChange,
    handleInputCancel,
    handleSave,
    handleInputFocus
  }
}

export default useChatRename;