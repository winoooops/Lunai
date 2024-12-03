import React, { useEffect } from "react";
import Modal, { ActionButton } from "../../../ui/Modal";
import { useDialog } from "../../../contexts/DialogContext";
import useChatRename from "../../../hooks/useChatRename";
import { Chat } from "@LunaiTypes/chat";

interface ChatRenamingModalProps {
  chat: Chat;
}

const ChatRenamingModel: React.FC<ChatRenamingModalProps> = ({ chat }) => {
  const { closeDialog } = useDialog();
  const { editingChat, inputRef, handleInputChange, handleInputFocus, handleSave, onEdit } = useChatRename();

  const handleClose = () => closeDialog();

  const handleEditSave = () => {
    handleSave();
    handleClose();
  }

  const actionButtons: ActionButton[] = [
    {
      text: "Cancel",
      type: "info",
      onClick: handleClose
    },
    {
      text: "Rename",
      type: "success",
      onClick: handleEditSave 
    }
  ];


  // when the modal is opened, automatically sets the state to editting 
  useEffect(() => {
    onEdit(chat);
  }, []);

  return (
    <Modal 
      title="Rename chat" 
      onClose={handleClose} 
      actions={actionButtons}
    >
      <input ref={inputRef} 
        onChange={handleInputChange}
        value={editingChat.title} 
        onFocus={handleInputFocus}
        className="rounded px-2 py-1 border border-slate-600 text-slate-200 font-bold text-lg bg-slate-800 min-w-[30em] focus:outline-none focus:border focus:border-yellow-400"
      /> 
    </Modal>
  );
}

export default ChatRenamingModel;