import { useEffect } from 'react';
import './globals.css';
import Form from './pages/Form';
import SuccessModalPage from './pages/SuccessModalPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import ReactPixel from 'react-facebook-pixel';
import ErrorModalPage from './pages/ErrorModalPage';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    ReactPixel.init('1060218774766985');
    ReactPixel.pageView();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Helmet>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-792301087"
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

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/success" element={<SuccessModalPage />} />
            <Route path="/failed" element={<ErrorModalPage />} />
          </Routes>
        </BrowserRouter>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1060218774766985&ev=PageView&noscript=1"
            alt="fb pixel"
          />
        </noscript>
      </>
    </QueryClientProvider>
  );
}

export default App;
