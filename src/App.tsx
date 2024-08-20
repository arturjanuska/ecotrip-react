import { useState } from 'react';
import './globals.css';
import Form from './pages/Form';
import ModalPage from './pages/ModalPage';

function App() {
	const [orderId, setOrderId] = useState<string | null>(null);

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
		</>
	);
}

export default App;
