import { Awaitable } from '.';

/**
 * Represents the props for the title bar component.
 */
export interface TitleBarProps {
  showTitleBar?: boolean;
  /**
   * The header content to be displayed in the title bar.
   *
   * @example
   * ```tsx
   * const titleBar = () => (
   *  return <div className="title-bar">My Title</div>;
   * )
   * ```
   */
  header?: React.ReactNode;

  /**
   * The handler function to be called when the close button is clicked.
   * It should return a promise or be an async function.
   *
   * @example
   * ```ts
   * const closeButton = () => {
   *    console.log('Close button clicked');
   * }
   * ```
   */
  closeHandler?: Awaitable<void>;
  /**
   * The handler function to be called when the minimize button is clicked.
   * It should return a promise or be an async function.
   *
   * @example
   * ```ts
   * const minimizeButton = () => {
   *    console.log('Minimize button clicked');
   * }
   * ```
   */
  minimizeHandler?: Awaitable<void>;

  /**
   * The handler function to be called when the maximize button is clicked.
   * It should return a promise or be an async function.
   *
   * @example
   * ```ts
   * const maximizeButton = () => {
   *   console.log('Maximize button clicked');
   * }
   * ```
   */
  maximizeHandler?: Awaitable<void>;

  /**
   * Additional content to be displayed in the title bar.
   */
  extraContent?: React.ReactNode;
}
