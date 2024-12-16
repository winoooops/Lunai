import { ConfigService } from "@/services/config.service";
import { Config } from "@LunaiTypes/config";

export const configResolvers = {
  Query: {
    config: (): Config => {
      const configService = ConfigService.getInstance();
      return configService.getConfig();
    },
    availableModels: (): string[] => {
      const configService = ConfigService.getInstance();
      return configService.getAvailableModels();
    }
  }, 
  Mutation: {
    setConfig: (_: any, { config }: { config: Partial<Config> }): Config => {
      const configService = ConfigService.getInstance();
      return configService.setConfig(config);
    }
  }
}