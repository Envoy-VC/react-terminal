/**
 * Represents the props for the input box component.
 */
export interface InputBoxProps {
  /**
   * The prompt to be displayed before the user input.
   */
  prompt?: React.ReactNode;

  /**
   * The cursor style to be used in the input box.
   * It can be one of the following:
   * - 'underscore': A horizontal line cursor.
   * - 'block': A solid block cursor.
   * - 'bar': A vertical bar cursor.
   * - React.ReactNode: A custom cursor component.
   */
  cursor?: 'underscore' | 'block' | 'bar' | React.ReactNode;
}

export interface TextareaProps {
  cursor?: 'underscore' | 'block' | 'bar' | React.ReactNode;
}
