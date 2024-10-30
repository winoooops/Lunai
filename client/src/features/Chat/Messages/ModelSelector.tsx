import { GrFormDown } from "react-icons/gr";
import { DialogButton } from "../../../ui/Dialog";
import React, { useEffect, useState } from "react";
import { useDialog } from "../../../contexts/DialogContext";

interface ModelItem {
  id: number;
  name: string;
  label: string;
  description?: string;
}


const ModelList: React.FC<{ models: ModelItem[], onSelect: (model: ModelItem) => void }> = ({ models, onSelect }) => {

  return (
    <ul className="p-2 bg-slate-700 rounded" id="model-selctor">
      { models?.map(item => 
        <li 
          id={item.name}
          key={item.id}
          className="px-2 py-1 font-semibold text-lg rounded text-slate-200 transition-all duration-200 hover:scale-105 hover:text-yellow-300 hover:bg-slate-900"
          onClick={() => onSelect(item)}
        >
          {item.label}
        </li>)} 
    </ul>
  );
}



const ModelSelector: React.FC = () => {
  const [activeModel, setActiveModel] = useState<ModelItem | undefined>(undefined);
  const { closeDialog } = useDialog();

  const models: ModelItem[] = [
    { id: 1, name: "model 1", label: "model 1" },
    { id: 2, name: "model 2", label: "model 2"}
  ]

  useEffect(() => {
    setActiveModel(models[0]);
  },[])

  const handleSelect = (model: ModelItem) => {
    setActiveModel(model);
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
          {activeModel?.label}
          <GrFormDown className="text-slate-900 group-hover:text-slate-200"/>
        </DialogButton>
      </div>
    </div>
  );
}

export default ModelSelector;