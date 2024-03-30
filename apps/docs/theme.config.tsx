import { useRouter } from 'next/router';

import { env } from '~/env';

import type { NextSeoProps } from 'next-seo';
import { type DocsThemeConfig, useConfig } from 'nextra-theme-docs';
import { GitHubIcon } from 'nextra/icons';

const config: DocsThemeConfig = {
  docsRepositoryBase: 'https://github.com/Envoy-VC/ao-by-example/tree/main/',
  head: (
    <>
      <meta charSet='utf-8' />
    </>
  ),
  navbar: {
    //extraContent: <ConnectButton />,
  },
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
      frontMatter: { title, defaultTitle, description },
    } = config;

    return {
      titleTemplate: defaultTitle ?? '%s | AO by Example',
      description: description,
      openGraph: {
        url: `${env.NEXT_PUBLIC_HOST_URL}${asPath}`,
        title: `${title ?? defaultTitle ?? 'AO by Example'}`,
        description: description,
        images: [
          {
            url: `${env.NEXT_PUBLIC_HOST_URL}/api/og${title ? `?title=${title}` : ''}`,
            width: 1200,
            height: 630,
            alt: `${title ?? defaultTitle ?? 'AO by Example'} | OG Image`,
            type: 'image/png',
          },
        ],
        siteName: 'AO by Example',
      },
    };
  },
  //logo: <Logo />,
  primaryHue: 215,
  primarySaturation: 75,
  project: {
    link: 'https://github.com/Envoy-VC/ao-by-example',
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
    defaultTheme: 'dark',
  },
};

export default config;
