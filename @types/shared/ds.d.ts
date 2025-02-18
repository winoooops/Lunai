export interface DeepSeekCompletionChoice {
  /**
   * The message that was generated for the completion.
   */
  message: {
    /**
     * The role of the message.
     */
    role: string;
    /**
     * The content of the message.
     */
    content: string;
    /**
     * The reasoning content of the message.
     */
    reasoning_content: string;
  }
  finish_reason: string;
}

export interface DeepSeekCompletionResponse {
  /**
   * The unique identifier for the completion.
   */
  id: string; 
  /**
   * The choices that were generated for the completion.
   */
  choices: DeepSeekCompletionChoice[];
  /**
   * The usage information for the completion.
   */
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  }
  /**
   * The timestamp when the completion was created.
   */
  created: number;
  /**
   * The model that was used to generate the completion.
   */
  model: string;
  /**
   * The object type for the completion.
   */
  object: string;
}

export interface DeepSeekStreamChoice {
  delta: {
    content: string;
    reasoning_content: string;
    role: string;
  };
  index: number;
}

export interface DeepSeekStreamResponse {
  id: string;
  choices: DeepSeekStreamChoice[];
  created: number;
  model: string;
  object: string;
}