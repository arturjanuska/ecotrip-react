import React from 'react';
import '../styles/input.css';
import { Control, Controller } from 'react-hook-form';
import { FormType } from '../utils/formTypes';
import SimpleTextError from './SimpleTextError';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	control: Control<FormType, any>;
	errorMessage?: string;
	onChange?: (value: any) => void;
	isNumberInput?: boolean;
	onBlur?: (e: Event) => void;
	isError?: boolean;
};

const CustomInput = ({
	name,
	control,
	errorMessage,
	isError = false,
	...props
}: InputProps) => {
	return (
		<>
			<Controller
				name={name as keyof FormType}
				control={control}
				render={({ field }) => {
					const handleChange = (e: any) => {
						if (props.onChange) {
							props.onChange(e);
						}
						field.onChange(e);
					};

					return (
						<div
							className={`input-container ${
								errorMessage || isError ? 'error-input' : ''
							}`}>
							<input
								{...field}
								{...props}
								onChange={handleChange}
							/>
						</div>
					);
				}}
			/>
			<SimpleTextError message={errorMessage} />
		</>
	);
};

export default CustomInput;
