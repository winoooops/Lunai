import { GetConfigDocument, SetConfigDocument, GetModelsDocument, GetActiveModelDocument, SetActiveModelDocument } from "@/graphql/generated/graphql";
import { Model } from "@LunaiTypes/model";
import { useMutation, useQuery } from "@apollo/client";
import { Config } from "@LunaiTypes/config";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSpinnerContext } from "./SpinnerContext";

interface ConfigContextProps {
  config: Config | null;
  models: Model[];
  activeModel: Model | null;
  updateConfig: (config: Partial<Config>) => void;
  handleSetActiveModel: (model: Model) => void;
}

const ConfigContext = createContext<ConfigContextProps | null>(null);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const { enableLoading, disableLoading } = useSpinnerContext();
  const [config, setConfig] = useState<Config | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [activeModel, setActiveModel] = useState<Model | null>(null);

  const { data: configData, loading: configLoading, error: configError } = useQuery(GetConfigDocument);
  const { data: modelListData, loading: modelListLoading, error: modelListError } = useQuery(GetModelsDocument);
  const { data: activeModelData, loading: activeModelLoading, error: activeModelError, refetch: refetchActiveModel } = useQuery(GetActiveModelDocument);

  const [setActiveModelMutation] = useMutation(SetActiveModelDocument);


  const [setConfigMutation] = useMutation(SetConfigDocument);

  /**
   * set config when config data is fetched
   */
  useEffect(() => {
    if(configData?.config) {
      setConfig(configData.config);
    }
  }, [configData]);

  /**
   * set model list when model list data is fetched
   */
  useEffect(() => {
    if(modelListData?.models) {
      setModels(modelListData.models as Model[]);
    }
  }, [modelListData]);

  /**
   * set active model when active model data is fetched
   */
  useEffect(() => {
    if(activeModelData?.activeModel) {
      setActiveModel(activeModelData.activeModel as Model);
      refetchActiveModel();
    }
  }, [activeModelData]);

  /**
   * enable loading when config or model list is loading
   */
  useEffect(() => {
    if(configLoading || modelListLoading) {
      enableLoading();
    } else {
      disableLoading();
    }
  }, [configLoading, modelListLoading]);


  /**
   * set active model
   * @param {Model} model - the model to set as active
   */
  const handleSetActiveModel = async (model: Model) => {
    const { data, errors } = await setActiveModelMutation({ variables: { id: model.id } });

    if(errors) {
      throw new Error(errors[0].message);
    }

    if(data && data.setActiveModel) {
      setActiveModel(model);
    }
  }


  /**
   * update config
   * @param {Partial<Config>} configPayload - the config to update
   */
  const updateConfig = async (configPayload: Partial<Config>) => {
    enableLoading();
    const { data, errors } = await setConfigMutation({ variables: { config: configPayload } });

    if(errors) {
      throw new Error(errors[0].message);
    }

    if(data && data.setConfig) {
      setConfig(data.setConfig);
    }

    disableLoading();
  }

  
  return (
    <ConfigContext.Provider value={{ config, models, activeModel, updateConfig, handleSetActiveModel }}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfigContext = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
}
