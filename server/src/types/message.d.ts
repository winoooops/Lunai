export interface TextContentBlock {
  type: string;
  text: string;
}


export interface Message {
  id: string;
  content: TextContentBlock[];
  role: string;
}