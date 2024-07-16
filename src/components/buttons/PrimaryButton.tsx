import React, { ReactNode } from 'react';

export type PrimaryButtonProps = {
	children: ReactNode;
	isDisabled: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton({
	isDisabled = false,
	children,
	...props
}: PrimaryButtonProps) {
	const { ...rest } = { ...props };
	return (
		<button
			type='submit'
			className={`primary-button ${isDisabled ? 'disabled' : ''}`}
			disabled={isDisabled}
			{...rest}>
			{children}
		</button>
	);
}
