import { PubSub } from "graphql-subscriptions";
import { DeepSeekStreamResponse } from "@LunaiTypes/ds";

interface StreamEventConfig {
  triggerName: string;
  buildPayload: (data: any) => Record<string, any>;
}

interface StreamConfig {
  onMessage: StreamEventConfig;
  onMessageComplete: StreamEventConfig;
  onReasoningMessage: StreamEventConfig;
  onReasoningComplete: StreamEventConfig;
  onStreamError?: StreamEventConfig;
}

type StreamResponse = DeepSeekStreamResponse;


export class StreamHandler {
  private readonly streamData: any;
  private readonly pubsub: PubSub;
  private readonly config: StreamConfig;
  private readonly effect: (accumulatedContent: string, accumulatedReasoningContent: string) => void;
  private accumulatedContent: string = '';
  private accumulatedReasoningContent: string = '';

  constructor(streamData: any, pubsub: PubSub, effect: (accumulatedContent: string, accumulatedReasoningContent: string) => void, config: StreamConfig) {
    this.streamData = streamData;
    this.pubsub = pubsub;
    this.config = config;
    this.effect = effect;
  }

  public async handleStream() {
    for await (const chunk of this.streamData) {
      const lines = chunk.toString().split('\n').filter(Boolean);
      await this.handleStreamLines(lines);
    }
  }

  private async handleStreamLines(lines: string[]) {
    for(const line of lines) {
      if(line.startsWith('data: ')) {
        const data = line.slice(6);
        if(data === '[DONE]') {
          this.onReasoningComplete();
          this.onMessageComplete();

          this.effect(this.accumulatedContent, this.accumulatedReasoningContent);
          continue;
        }

        const parsedData = JSON.parse(data) as StreamResponse;
        if(parsedData.choices && parsedData.choices.length > 0) {
          const { content = '', reasoning_content = '' } = parsedData.choices[0].delta;

          if(reasoning_content) {
            this.accumulatedReasoningContent += reasoning_content;
            this.onReasoningMessage(reasoning_content);
          }

          if(content) {
            this.accumulatedContent += content;
            this.onMessage(content);
          }
        }
      }
    }
  }

  private onMessage(content: string): void {
    const { triggerName, buildPayload } = this.config.onMessage;
    const payload = buildPayload(content);

    this.pubsub.publish(triggerName, payload);
  } 

  private onMessageComplete(): void{
    const { triggerName, buildPayload } = this.config.onMessageComplete;
    const payload = buildPayload(this.accumulatedContent);

    this.pubsub.publish(triggerName, payload);
  }

  private onReasoningMessage(reasoning_content: string): void {
    const { triggerName, buildPayload } = this.config.onReasoningMessage;
    const payload = buildPayload(reasoning_content);

    this.pubsub.publish(triggerName, payload);
  }

  private onReasoningComplete(): void {
    const { triggerName, buildPayload } = this.config.onReasoningComplete;
    const payload = buildPayload(this.accumulatedReasoningContent);

    this.pubsub.publish(triggerName, payload);
  }
}
