/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '../styles/input.css';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
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
	rules?:
		| Omit<
				RegisterOptions<FormType, keyof FormType>,
				'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
		  >
		| undefined;
};

const CustomInput = ({
	name,
	control,
	errorMessage,
	isError = false,
	...props
}: InputProps) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				alignItems: 'flex-start',
			}}>
			<>
				<Controller
					name={name as keyof FormType}
					control={control}
					rules={props.rules}
					render={({ field: { value, onChange, ref, name, onBlur } }) => {
						return (
							<div
								className={`input-container ${
									errorMessage || isError ? 'error-input' : ''
								}`}>
								<input
									{...props}
									ref={ref}
									value={value as any}
									name={name}
									onChange={(e) => {
										onChange(e);
										props.onChange?.(e);
									}}
									onBlur={(e) => {
										onBlur();
										props.onBlur?.(e);
									}}
								/>
							</div>
						);
					}}
				/>
			</>
			<SimpleTextError message={errorMessage} />
		</div>
	);
};

export default CustomInput;
