import { ModelService } from "@/services/model.service";
import { Model, ModelInput } from "@LunaiTypes/model";

export const modelResolvers = {
  Query: {
    models: async () => {
      const modelService = ModelService.getInstance();
      return modelService.getModels();
    },
    modelByName: async (_: any, { name }: { name: string }) => {
      const modelService = ModelService.getInstance();
      return modelService.getModelByName(name);
    },
    activeModel: async (_: any) => {
      const modelService = ModelService.getInstance();
      return modelService.getActiveModel();
    }
  },
  Mutation: {
    setModels: async (_: any, { modelInputs }: { modelInputs: ModelInput[] }) => {
      const modelService = ModelService.getInstance();
      return modelService.setModels(modelInputs);
    },
    addModel: async (_: any, { modelInput }: { modelInput: ModelInput }) => {
      const modelService = ModelService.getInstance();
      return modelService.addModel(modelInput);
    },
    addModels: async (_: any, { modelInputs }: { modelInputs: ModelInput[] }) => {
      const modelService = ModelService.getInstance();
      return modelService.addModels(modelInputs);
    },
    removeModelByName: async (_: any, { name }: { name: string }) => {
      const modelService = ModelService.getInstance();
      return modelService.removeModelByName(name);
    },
    removeModelById: async (_: any, { id }: { id: string }) => {
      const modelService = ModelService.getInstance();
      return modelService.removeModelById(id);
    },
    setActiveModel: async (_: any, { id }: { id: string }) => {
      const modelService = ModelService.getInstance();
      return modelService.setActiveModel(id);
    }
  }
};
