/**
 * Represents the props for the HTMLRenderer component.
 */
export interface HTMLRendererProps {
  htmlString: string;
}

/**
 * Represents a function that renders HTML content as a JSX element.
 *
 * @remarks
 * The `HTMLRenderer` function takes an object with an `htmlString` property,
 * which is a string containing the HTML content to be rendered. It returns a
 * JSX element representing the rendered HTML.
 *
 * @example
 * ```tsx
 * const renderHTML: HTMLRenderer = ({ htmlString }) => {
 *   return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
 * };
 * ```
 *
 * @param options - The options for rendering HTML content.
 * @param options.htmlString - The HTML content to be rendered.
 * @returns A JSX element representing the rendered HTML.
 *
 * @see {@link JSX.Element}
 */
export type HTMLRenderer = (props: HTMLRendererProps) => JSX.Element;
