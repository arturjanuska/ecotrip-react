/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties } from 'react';
import { Controller } from 'react-hook-form';
import '../styles/checkbox.css';
import SimpleTextError from './SimpleTextError';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	children: React.ReactNode | Element;
	className?: string;
	style?: CSSProperties;
	name: string;
	control: any;
	errorMessage?: string;
};

const ControlledCheckboxWithLabel = ({
	children,
	className,
	style,
	name,
	control,
	errorMessage,
	...rest
}: Props) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				return (
					<>
						<div
							className={`form-control ${className ? className : ''}`}
							style={style}>
							<label className='label cursor-pointer'>
								<input
									{...field}
									{...rest}
									type='checkbox'
									className={`checkbox checkbox-primary ${errorMessage ? 'error' : ''
										}`}
									checked={field.value} // Ensure the checkbox is controlled by react-hook-form
								/>
								<div className='custom-label-text'>{children}</div>
							</label>
						</div>
						<SimpleTextError
							message={errorMessage}
							textAlign='right'
						/>
					</>
				);
			}}
		/>
	);
};

export default ControlledCheckboxWithLabel;
