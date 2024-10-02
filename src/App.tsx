/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
import { useEffect, useState } from 'react';
import './globals.css';
import Form from './pages/Form';
import ModalPage from './pages/ModalPage';

declare global {
	interface Window {
		fbq: any;
	}
}

function App() {
	const [orderId, setOrderId] = useState<string | null>(null);

	useEffect(() => {
		const loadFacebookPixel = () => {
			try {
				// Check if fbq is already defined to avoid redefining
				if (!window.fbq) {
					(function (
						f: any,
						b: any,
						e: any,
						v: any,
						n?: any,
						t?: any,
						s?: any
					) {
						if (f.fbq) return;
						n = f.fbq = function () {
							(n.callMethod ? n.callMethod : n.queue.push).apply(n, arguments);
						};
						if (!f._fbq) f._fbq = n;
						n.push = n;
						n.loaded = true;
						n.version = '2.0';
						n.queue = [];
						t = b.createElement(e);
						t.async = true;
						t.src = v;
						s = b.getElementsByTagName(e)[0];
						s.parentNode.insertBefore(t, s);
					})(
						window,
						document,
						'script',
						'https://connect.facebook.net/en_US/fbevents.js'
					);

					// Initialize and track PageView
					window.fbq('init', '123755041741966');
					window.fbq('track', 'PageView');
				}
			} catch (error) {
				console.error('Error loading Facebook Pixel:', error);
			}
		};

		// Run the function to load Facebook Pixel
		loadFacebookPixel();
	}, []);

	return (
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
	);
}

export default App;
