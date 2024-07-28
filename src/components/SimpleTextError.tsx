type Props = {
	message?: string;
};

const SimpleTextError = ({ message }: Props) => {
	if (!message) {
		return null;
	}

	return (
		// <div className='errors'>
		<div className='error'>
			<span>{message}</span>
		</div>
		// </div>
	);
};

export default SimpleTextError;
