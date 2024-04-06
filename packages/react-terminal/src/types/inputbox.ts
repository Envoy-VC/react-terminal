export interface TextareaProps {
  cursor?: 'underscore' | 'block' | 'bar' | React.ReactNode;
}

export interface PromptProps {
  /**
   * The prompt to be displayed before the user input.
   */
  prompt?: React.ReactNode;
}
