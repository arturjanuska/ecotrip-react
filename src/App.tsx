/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
import { useEffect, useState } from 'react';
import './globals.css';
import Form from './pages/Form';
import ModalPage from './pages/ModalPage';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import ReactPixel from 'react-facebook-pixel';

declare global {
  interface Window {
    fbq: any;
  }
}

const queryClient = new QueryClient();

function App() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    ReactPixel.init('123755041741966');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Helmet>
          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=AW-792301087'
          ></script>
          <script>
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-792301087');
          `}
          </script>
        </Helmet>

        <>
          {!orderId ? (
            <Form setOrderId={(id: string) => setOrderId(id)} />
          ) : (
            <ModalPage
              setOrderId={() => setOrderId(null)}
              orderId={orderId}
            />
          )}
          <noscript>
            <img
              height='1'
              width='1'
              style={{ display: 'none' }}
              src='https://www.facebook.com/tr?id=123755041741966&ev=PageView&noscript=1'
              alt='fb pixel'
            />
          </noscript>
        </>
      </>
    </QueryClientProvider>
  );
}

export default App;
