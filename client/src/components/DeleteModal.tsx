import React from "react";
import { useDialog } from "../contexts/DialogContext";
import Modal, { ActionButton } from "../ui/Modal";

const DeleteModal: React.FC<{onDelete: () => void}> = ({ onDelete }) => {
  const { closeDialog, activeDialogId } = useDialog();

  const handleDelete = () => {
    onDelete();
    closeDialog(activeDialogId!);
  }

  const handleClose = () => closeDialog(activeDialogId!);

  const actions: ActionButton[] = [
    {
      text: "Cancel",
      type: "info",
      onClick: handleClose
    },
    {
      text: "Delete",
      type: "danger",
      onClick: handleDelete
    }
  ]


  return (
    <Modal
      title="Delete Confirmation" 
      onClose={handleClose}
      actions={actions}
    >
      <p className="text-slate-400 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
    </Modal>
  );
};

export default DeleteModal;