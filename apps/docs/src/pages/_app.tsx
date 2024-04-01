import { TerminalProvider } from '@envoy1084/react-terminal';
import { type AppType } from 'next/app';
import { Inter } from 'next/font/google';
import '~/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <TerminalProvider>
        <Component {...pageProps} />
      </TerminalProvider>
    </main>
  );
};

export default MyApp;
