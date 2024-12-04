import { useEffect, useRef, useState } from "react";
import { useChatContext } from "../contexts/ChatContext";
import { Chat } from "@LunaiTypes/chat";
import { useSpinnerContext } from "@/contexts/SpinnerContext";

const useChatRename = (enableKeyboard: boolean = false) => {
  const [editingChat, setEditingChat] = useState<{ id: string | null, title: string | undefined }>({ id: null, title: undefined });
  const inputRef = useRef<HTMLInputElement>(null);
  const { editChat, updateChatLoading } = useChatContext();
  const { enableLoading, disableLoading } = useSpinnerContext();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(!enableKeyboard) return;

      if(e.key === "Enter") {
        handleSave();
      } else if (e.key === "Escape") {
        handleInputCancel();
      }
    }

    if(inputRef.current && editingChat.id !== null) {
      document.addEventListener("keydown", handleKeyDown);
      inputRef.current.focus();
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [editingChat]);

  useEffect(() => {
    if(updateChatLoading) {
      enableLoading();
    } else {
      disableLoading();
    }
  },[updateChatLoading])

  const onEdit = (entry: Chat) => {
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

  const handleSave = async () => {
    if(editingChat.id != null && editingChat.title != undefined) {
      await editChat(editingChat.id, {
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