type Props = {
	message?: string;
	textAlign?: 'left' | 'right';
};

const SimpleTextError = ({ message, textAlign }: Props) => {
	if (!message) {
		return null;
	}

	return (
		<div
			className='error'
			style={{
				width: '100%',
				textAlign: textAlign ? textAlign : 'left',
			}}>
			<span>{message}</span>
		</div>
	);
};

export default SimpleTextError;
