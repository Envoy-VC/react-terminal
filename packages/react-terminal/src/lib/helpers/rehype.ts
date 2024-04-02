import React from 'react';
import { renderToString } from 'react-dom/server';
import { JSX } from 'react/jsx-runtime';

import rehypeFormat from 'rehype-format';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

/**
 * Safely renders a JSX element to a string using React and rehype.
 *
 * @group Helpers
 *
 * @param {JSX.Element} Element - The JSX element to render.
 * @returns {string} The rendered HTML string.
 *
 * @example
 * ```ts
 * const jsxElement = <div>Hello, World!</div>;
 * const htmlString = safeRenderToString(jsxElement);
 * console.log(htmlString); // Output: "<div>Hello, World!</div>"
 * ```
 *
 * @remarks
 * This function uses React and rehype to safely render a JSX element to an HTML string.
 * It first converts the JSX element to a React component using `renderToString` from the `react-dom/server` package.
 * Then, it parses the resulting HTML string into an HTML AST (Abstract Syntax Tree) using `rehype-parse`.
 * Next, it converts the HTML AST back to a React component using `rehype-react`.
 * Finally, it converts the React component back to an HTML string using `rehype-stringify`.
 * The resulting HTML string is returned.
 * 
 * @public
 */
export const safeRenderToString = (Element: JSX.Element) => {
  const reactHtml = renderToString(Element);
  const htmlAst = unified()
    .use(rehypeParse, { fragment: true })
    .parse(reactHtml);

  const createElement = React.createElement.bind(React);

  const unifiedAst = unified()
    // @ts-expect-error err
    .use(rehypeReact, { createElement })
    .runSync(htmlAst);

  const finalHtml = unified()
    .use(rehypeStringify)

    .use(rehypeFormat)
    // @ts-expect-error err
    .stringify(unifiedAst);

  return finalHtml;
};
