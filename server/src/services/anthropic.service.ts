import Anthropic from "@anthropic-ai/sdk";


export class AnthropicService {
  anthropicInstance: Anthropic;

  constructor(apiKey: string, baseURL?: string) {
    this.anthropicInstance = new Anthropic({
      apiKey,
      baseURL
    })
  }

  promptForTextReply(content: string) {
    return this.anthropicInstance.messages.create({
      model: "grok-beta",
      max_tokens: 128,
      system: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
      messages: [
        {
          role: "user",
          content
        }
      ]
    })
  }
}