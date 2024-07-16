import React from 'react';
import '../styles/field-container.css';

type Props = {
	label?: string;
	children: React.ReactNode;
	description?: string;
	className?: string;
	width?: 'full' | 'half';
};

const FieldContainer = ({
	label,
	children,
	description,
	className,
	width = 'half',
}: Props) => {
	return (
		<div
			className={`field-container ${className ? className : ''} ${
				width === 'half' ? 'w-360' : 'w-full'
			}`}>
			{label ? <label htmlFor=''>{label}</label> : null}
			{children}
			{description ? <p>{description}</p> : null}
		</div>
	);
};

export default FieldContainer;
