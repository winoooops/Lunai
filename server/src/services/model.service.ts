import { Model, ModelInput } from "@LunaiTypes/model";
import { v4 as uuidv4 } from 'uuid';
import { config } from "dotenv";
import axios from "axios";

config();

export class ModelService {
  private models: Model[];
  private static instance: ModelService;
  private activeModel: Model | null = null;

  constructor() {
    const id = uuidv4();
    this.models = [
      {id, name: "grok-beta(Anthropic SDK)", owned_by: "anthropic"},
    ];
    this.initModels();

    this.setActiveModel(id);
  }

  public static getInstance(): ModelService {
    if (!ModelService.instance) {
      ModelService.instance = new ModelService();
    }
    return ModelService.instance;
  }

  public async getModels(): Promise<Model[]> {
    return this.models;
  }

  public async setModels(models: ModelInput[]): Promise<Model[]> {
    this.models = models.map(model => ({...model, id: uuidv4()}));
    return this.models;
  }

  public async addModel(model: ModelInput): Promise<Model[]> {
    this.models.push({...model, id: uuidv4()});
    return this.models;
  }

  public async addModels(models: ModelInput[]): Promise<Model[]> {
    this.models.push(...models.map(model => ({...model, id: uuidv4()})));
    return this.models;
  }

  public async getModelByName(name: string): Promise<Model | undefined> {
    return this.models.find((model) => model.name === name);
  }

  public async removeModelByName(name: string): Promise<Model[]> {
    this.models = this.models.filter((model) => model.name !== name);
    return this.models;
  }

  public async removeModelById(id: string): Promise<Model[]> {
    this.models = this.models.filter((model) => model.id !== id);
    return this.models;
  }

  public setActiveModel(id: string): boolean {
    if(this.activeModel) {
      this.activeModel.active = false;
    }
    
    this.models.forEach((model) => {
      if(model.id === id) {
        model.active = true;
        this.activeModel = model;
        return true;
      }
    });

    return false;
  }

  public getActiveModel(): Model | null {
    return this.activeModel;
  }

  private async initModels(): Promise<void> {
    this.addModels([
      {name: "claude-3-5-haiku-latest", owned_by: "anthropic"},
      {name: "claude-3-5-haiku-20241022", owned_by: "anthropic"}, 
      {name: "claude-3-5-sonnet-latest", owned_by: "anthropic"},
      {name: "claude-3-5-sonnet-20241022", owned_by: "anthropic"},
      {name: "claude-3-5-sonnet-20240620", owned_by: "anthropic"},
      {name: "claude-3-opus-latest", owned_by: "anthropic"},
      {name: "claude-3-opus-20240229", owned_by: "anthropic"},
      {name: "claude-3-sonnet-20240229", owned_by: "anthropic"},
      {name: "claude-3-haiku-20240307", owned_by: "anthropic"},
      {name: "claude-2.1", owned_by: "anthropic"},
      {name: "claude-2.0", owned_by: "anthropic"},
      {name: "claude-instant-1.2", owned_by: "anthropic"},
    ]);

    this.addXaiModels();
  }

  private async addXaiModels() {
    try {
      const modelsResponse = await axios.get("https://api.x.ai/v1/models", {
        headers: {
          "Authorization": `Bearer ${process.env.XAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      });
      const models = modelsResponse.data.data;

      this.addModels(models.map((model: any) => ({id: uuidv4(), name: model.id, owned_by: model.owned_by})));
    } catch (error) {
      console.error("Error fetching models from XAI API:", error);
    }
  }  
}
