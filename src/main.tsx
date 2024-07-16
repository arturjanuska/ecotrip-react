import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalLayout from './components/GlobalLayout.tsx';
import Footer from './components/footer/Footer.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<GlobalLayout>
			<App />
		</GlobalLayout>
		<Footer />
	</React.StrictMode>
);
