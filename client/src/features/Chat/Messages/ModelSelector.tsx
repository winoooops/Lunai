import React from "react";
import { GrFormDown } from "react-icons/gr";
import { DialogButton } from "../../../ui/Dialog";
import { useDialog } from "../../../contexts/DialogContext";
import { useConfigContext } from "../../../contexts/ConfigContext";
import { Model } from "@LunaiTypes/model";

const ModelList: React.FC<{ models: Model[], onSelect: (model: Model) => void }> = ({ models, onSelect }) => {
  return (
    <ul className="p-2 bg-slate-700 rounded" id="model-selctor">
      { models?.map(item => 
        <li 
          id={item.name}
          key={item.id}
          className="px-2 py-1 font-semibold text-lg rounded text-slate-200 transition-all duration-200 hover:scale-105 hover:text-yellow-300 hover:bg-slate-900"
          onClick={() => onSelect(item)}
        >
          {item.name}
        </li>)} 
    </ul>
  );
}


const ModelSelector: React.FC = () => {
  const { models, activeModel, handleSetActiveModel } = useConfigContext();
  const { closeDialog } = useDialog();

  const handleSelect = (model: Model) => {
    handleSetActiveModel(model);
    closeDialog();
  }

  return (
    <div className="absolute bottom-1 left-2">
      <div className="relative">
        <DialogButton 
          id="model-selector" 
          content={<ModelList models={models} onSelect={handleSelect}/>}
          className="group px-2 py-1 flex gap-1 items-center bg-slate-900 hover:bg-slate-800 hover:text-slate-200 " 
          variation="dropup"
        >
          {activeModel?.name}
          <GrFormDown className="text-slate-900 group-hover:text-slate-200"/>
        </DialogButton>
      </div>
    </div>
  );
}

export default ModelSelector;
