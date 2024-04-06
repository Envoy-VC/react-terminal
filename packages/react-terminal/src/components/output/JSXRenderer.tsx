import { useEffect, useState } from 'react';
import * as prod from 'react/jsx-runtime';

import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { unified } from 'unified';

const production = {
  Fragment: prod.Fragment,
  jsx: prod.jsx,
  jsxs: prod.jsxs,
};

interface Props {
  htmlString: string;
}

const JSXRenderer = ({ htmlString }: Props) => {
  const [Content, setContent] = useState<JSX.Element | string | null>(null);

  const renderJSX = async () => {
    try {
      const context = await unified()
        .use(rehypeParse, { fragment: true })
        // @ts-expect-error err
        .use(rehypeReact, production)
        .process(htmlString);

      setContent(context.result);
    } catch (error) {
      setContent(htmlString);
    }
  };

  useEffect(() => {
    renderJSX();
  }, [htmlString]);

  return <div>{Content}</div>;
};

export default JSXRenderer;
