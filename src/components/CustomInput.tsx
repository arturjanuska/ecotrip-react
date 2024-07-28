import React from 'react';
import '../styles/input.css';
import { Control, Controller } from 'react-hook-form';
import { FormType } from '../utils/formTypes';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	control: Control<FormType, any>;
	isError?: boolean;
	onChange?: (value: any) => void;
	isNumberInput?: boolean;
};

const CustomInput = ({
	name,
	control,
	isError,
	isNumberInput = false,
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
						<div className={`input-container ${isError ? 'error-input' : ''}`}>
							<input
								{...field}
								{...props}
								onChange={handleChange}
							/>
						</div>
					);
				}}
			/>
		</>
	);
};

export default CustomInput;
