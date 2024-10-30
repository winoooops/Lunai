import React from "react";
import Button from "./Button";
import { RiCloseFill } from "react-icons/ri";

export interface ActionButton {
  text: string;
  type: "success" | "info" | "danger";
  onClick: () => void;
}


interface ModalProps {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
  actions?: ActionButton[];
}


const Modal: React.FC<ModalProps> = ({ title, onClose, children, actions }) => {
  const actionBtnClass = (type: 'success' | 'info' | 'danger') => {
    switch(type) {
      case 'success':
        return 'bg-indigo-500 text-white hover:bg-indigo-600';
      case 'info':
        return 'bg-slate-500 text-white hover:bg-slate-600';
      case 'danger':
        return 'bg-red-500 text-white hover:bg-red-600';
      default:
        return '';
    } 
  }


  return (
    <div className="modal-content bg-slate-900 rounded-lg p-4">
      <div className="modal-header w-full flex items-center justify-between mb-4">
        <h2 className="modal-header text-slate-200 text-xl font-semibold">
          {title}
        </h2>
        <Button shape="pill" className="text-slate-400 bg-transparent hover:text-yellow-400 px-4 py-1" onClick={onClose}>
          <RiCloseFill />
        </Button>
      </div>
      <div className="modal-body mb-4">
        {children}
      </div>  
      <div className="modal-footer flex justify-end gap-2">
        {actions && actions.map((action, index) => (
          <Button key={index} shape="rounded" className={`${actionBtnClass(action.type)}`} onClick={action.onClick}>
            {action.text}
          </Button>
        ))}
      </div>  
    </div>
  );
}

export default Modal;