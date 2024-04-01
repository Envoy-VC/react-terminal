import type { NextSeoProps } from 'next-seo';
import { useRouter } from 'next/router';
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
      frontMatter: { title, defaultTitle, description },
    } = config;

    return {
      titleTemplate: defaultTitle ?? '%s | React Terminal',
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
  primaryHue: 215,
  primarySaturation: 75,
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
    forcedTheme: 'dark',
    defaultTheme: 'dark',
  },
};

export default config;
