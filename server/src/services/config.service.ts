import { Config } from "@LunaiTypes/config";

export class ConfigService {
  private config: Config;
  private static instance: ConfigService;

  constructor() {
    this.config = {
      max_tokens: 1000,
      temperature: 0.5,
      stream: true,
      system: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
      model: "grok-beta"
    }
  }

  static getInstance(): ConfigService {
    if(!this.instance) {
      this.instance = new ConfigService();
    }
    return this.instance;
  }

  setConfig(config: Partial<Config>): Config {
    this.config = { ...this.config, ...config };
    return this.config;
  }

  getConfig(): Config {
    return this.config;
  }

  getAvailableModels(): string[] {
    return ["grok-beta", "claude-3-opus-20240229", "claude-3-5-sonnet-20240620"];
  }
}