import './globals.css';
import Form from './pages/Form';
import SuccessModalPage from './pages/SuccessModalPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorModalPage from './pages/ErrorModalPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/success" element={<SuccessModalPage />} />
          <Route path="/failed" element={<ErrorModalPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
