/**
 * Represents the props for the Textarea component.
 */
export interface TextareaProps {
  /**
   * Specifies the type of cursor to be displayed in the textarea.
   * It can be one of the following values:
   * - 'underscore': Displays an underscore cursor.
   * - 'block': Displays a block cursor.
   * - 'bar': Displays a vertical bar cursor.
   * - React.ReactNode: Displays a custom cursor provided as a React node.
   */
  cursor?: 'underscore' | 'block' | 'bar' | React.ReactNode;
}

/**
 * Represents the props for the Prompt component.
 */
export interface PromptProps {
  /**
   * The prompt message to be displayed.
   */
  prompt?: React.ReactNode;
}
