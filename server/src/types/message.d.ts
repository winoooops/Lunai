export interface TextContentBlock {
  type: string;
  text: string;
}

export interface Message {
  content: TextContentBlock[];
  role: string;
  timestamp: string;
  id: string;
  model?: string;
}
