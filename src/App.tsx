/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
import { useEffect, useState } from 'react';
import './globals.css';
import Form from './pages/Form';
import ModalPage from './pages/ModalPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

declare global {
  interface Window {
    fbq: any;
  }
}

const queryClient = new QueryClient();

const initFacebookPixel = (pixelId: string) => {
  if (typeof window.fbq === 'undefined') {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  } else {
    console.warn('Facebook Pixel is blocked or already loaded.');
  }
};

function App() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    initFacebookPixel('123755041741966');
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
        {/* <Helmet>
          <script>
            {`
            !function(f,b,e,v,n,t,s) {
              if (f.fbq) return;
              const n = (f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
              });
              if (!f._fbq) f._fbq = n;
              n.push = n;
              n.loaded = !0;
              n.version = '2.0';
              n.queue = [];
              const t = b.createElement(e);
              t.async = !0;
              t.src = v;
              const s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s);
              (window, document, 'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            }
          `}
          </script>
        </Helmet> */}
        <>
          {!orderId ? (
            <Form setOrderId={(id: string) => setOrderId(id)} />
          ) : (
            <ModalPage setOrderId={() => setOrderId(null)} orderId={orderId} />
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
