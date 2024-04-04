import { useRouter } from 'next/router';

import type { NextSeoProps } from 'next-seo';
import { type DocsThemeConfig, useConfig } from 'nextra-theme-docs';
import { GitHubIcon } from 'nextra/icons';
import { Logo } from '~/components';
import { env } from '~/env';

const config: DocsThemeConfig = {
  docsRepositoryBase:
    'https://github.com/Envoy-VC/react-terminal/tree/main/apps/docs',
  head: (
    <>
      <meta charSet='utf-8' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />
      <link rel='manifest' href='/site.webmanifest' />
    </>
  ),
  useNextSeoProps: (): NextSeoProps => {
    const { asPath } = useRouter();
    const config: {
      frontMatter: {
        title: string;
        description: string;
        defaultTitle: string | undefined;
      };
    } = useConfig();

    const {
      frontMatter: { title, defaultTitle },
    } = config;

    const pageTitle =
      asPath === '/' ? 'React Terminal' : defaultTitle ?? '%s | React Terminal';

    const description =
      'React Terminal is a simple, customizable terminal component for your React applications.';

    return {
      titleTemplate: pageTitle,
      description: description,
      openGraph: {
        url: `${env.NEXT_PUBLIC_HOST_URL}${asPath}`,
        title: `${title ?? defaultTitle ?? 'React Terminal'}`,
        description: description,
        images: [
          {
            url: `${env.NEXT_PUBLIC_HOST_URL}/api/og${title ? `?title=${title}` : ''}`,
            width: 1200,
            height: 630,
            alt: `${title ?? defaultTitle ?? 'React Terminal'} | OG Image`,
            type: 'image/png',
          },
        ],
        siteName: 'React Terminal',
      },
    };
  },
  logo: <Logo />,
  primaryHue: 227,
  primarySaturation: 53,
  project: {
    link: 'https://github.com/Envoy-VC/react-terminal',
    icon: <GitHubIcon />,
  },
  search: {
    placeholder: 'Search...',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: true,
  },
  nextThemes: {
    storageKey: 'theme',
    defaultTheme: 'dark',
  },
};

export default config;
