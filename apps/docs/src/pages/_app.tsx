import { type AppType } from 'next/app';

import { TerminalProvider } from '@envoy1084/react-terminal';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from '~/providers';
import '~/styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
        <TerminalProvider>
          <Component {...pageProps} />
        </TerminalProvider>
      </ThemeProvider>
    </main>
  );
};

export default MyApp;
