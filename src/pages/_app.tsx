import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/lib/i18n';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import { queryClient } from '@/lib/query-client';
import { AuthProvider } from '@/provider/auth-provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Trygg Admin</title>
        <meta name="description" content="Trygg Admin Dashboard" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#fff',
                color: '#333',
              },
            }}
          />
        </AuthProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
