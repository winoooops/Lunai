export interface TextContentBlock {
  type: string;
  text: string;
}


export interface Message {
  id: string;
  content: TextContentBlock[];
  role: string;
}

export type LunaiTextContent = string;

export interface LunaiMessage {
  content: LunaiTextContent;
  role: "user" | "assistant";
}