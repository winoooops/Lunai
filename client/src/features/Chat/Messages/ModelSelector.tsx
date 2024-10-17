import { GrFormDown } from "react-icons/gr";
import { DialogButton } from "../../../ui/Dialog";
import React from "react";

const ModelList: React.FC = () => {
  const models = [
    { name: "model 1", label: "model 1" },
    { name: "model 2", label: "model 2"}
  ]


  return (
    <ul className="bg-slate-700 rounded-md" id="model-selctor">
      { models?.map(item => 
        <li 
          id={item.name}
          className="text-slate-200 hover:text-yellow-300"
        >
          {item.label}
        </li>)} 
    </ul>
  );
}



const ModelSelector: React.FC = () => {
  return (
    <div className="absolute bottom-1 left-2">
      <div className="relative">
        <DialogButton 
          id="model-selector" 
          content={<ModelList />}
          className="px-2 py-1 flex gap-1 items-center" 
          variation="dropup"
        >
          Model
          <GrFormDown />
        </DialogButton>
      </div>
    </div>
  );
}

export default ModelSelector;