import { Message } from "@LunaiTypes/message";

export class MessageService {
  private static instance: MessageService;
  messages: Message[];

  private constructor() {
    this.messages = [];
  }

  static getInstance(): MessageService {
    if(!MessageService.instance){
      MessageService.instance = new MessageService();
    }

    return MessageService.instance;
  }

  getMesssages(): Message[] {
    return this.messages;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  addMessages(messages: Message[]): void {
    for(const element of messages) {
      this.addMessage(element);
    }
  }
}