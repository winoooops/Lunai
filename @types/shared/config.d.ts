export interface Config {
  /**
   * The maximum number of tokens to generate before stopping. 
   */
  max_tokens: number;
  /**
   * temperature is a float that controls the randomness of the model's output. Ranging from 0 to 1.
   * with 0 being the most deterministic(used for analytical or multiple choice), and 1 being the most random(used for creative or generative tasks).
   */
  temperature: number;
  /**
   * stream is a boolean that determines whether the model should stream the response.
   */
  stream: boolean;
  /**
   * system prompt is a way of providing context and instructions to the model, such as specifying particular goal or role.
   */
  system: string;

  /**
   * model is the name of the model to use for the chat.
   */
  model: string;
}