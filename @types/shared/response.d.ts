import { Chat } from "./chat";
import { Message, TextContentBlock } from "./message";

type StreamType = "message" | "reasoning";

type StreamStatus = "done" | "complete" | "in_progress" | "error";

type RestResponseBody = Message | Message[] | Chat | Chat[];

interface ChatResponseBody {
  chatId: string;
  messageId?: string;
  content?: TextContentBlock[];
  message?: Message;
}

/**
 * Lunai Response
 * 
 * @description This is the response from the Lunai API.
 * success: Whether the request was successful.
 * statusCode: The status code of the response.
 * data: The data of the response.
 * error: The error of the response.
 */
export interface LunaiResponse {
  success: boolean;
  statusCode: number;
  data: RestResponseBody | ChatStreamOnResponseBody | ChatStreamDoneResponseBody | ChatStreamCompleteResponseBody;
  errors?: unknown;
}


/**
 * Base Stream Response
 * 
 * @description This is the base response for the stream response.
 * streamType: The type of the stream.
 * streamStatus: The status of the stream.
 */
interface StreamResponse {
  streamType: StreamType;
  streamStatus: StreamStatus;
}


/**
 * StreamOn Response Body
 * 
 * @description This is the body of the response for the stream on response.
 * chatId: The id of the chat.
 * messageId: The id of the message.
 * content: The content of the chunk message.
 */
interface ChatStreamOnResponseBody extends StreamResponse, ChatResponseBody {}

/**
 * Stream Response Complete Body
 * 
 * @description This is the body of the response for the stream complete response.
 * chatId: The id of the chat.
 * content: The content of the final message.
 * message: The final message.
 */
interface ChatStreamDoneResponseBody extends StreamResponse, ChatResponseBody {}

interface ChatStreamCompleteResponseBody extends StreamResponse, ChatResponseBody {}
