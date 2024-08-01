/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Select, { Props } from 'react-select';
import { forwardRef } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { FormType } from '../utils/formTypes';
import SimpleTextError from './SimpleTextError';

const customStyles = {
	// @ts-ignore
	placeholder: (provided, state) => ({
		...provided,
		color: '#7a777680',
		fontFamily: 'Arial',
		fontSize: '14px',
		fontWeight: '400',
		lineHeight: '16.1px',
		textAlign: 'left',
	}),
	// @ts-ignore
	option: (provided, state) => ({
		...provided,
		color: '#7a7776',
		fontSize: '14px',
		fontWeight: '400',
		lineHeight: '16.1px',
		textAlign: 'left',
	}),
	// @ts-ignore
	singleValue: (provided, state) => {
		return {
			...provided,
			color: '#7a7776',
			fontSize: '14px',
			fontWeight: '400',
			lineHeight: '16.1px',
			textAlign: 'left',
		};
	},
	// @ts-ignore
	valueContainer: (provided, state) => {
		return {
			...provided,
		};
	},
	// @ts-ignore
	control: (provided, state) => {
		return {
			...provided,
			border: '1px solid #0000001A',
			'&:hover': {
				border: state.isFocused ? '1px solid #9aa61e' : '1px solid #0000001A',
			},
			'&:focus-within': {
				border: '1px solid #9aa61e',
				boxShadow: 'none',
			},
		};
	},
};

const ControlledStyledSelect = forwardRef(
	(
		props: Props & {
			label?: string;
			errorMessage?: string;
			name: string;
			control: Control<FormType>;
			onChange?: (value: any) => void;
			needMargin?: boolean;
			rules?:
				| Omit<
						RegisterOptions<FormType, keyof FormType>,
						'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
				  >
				| undefined;
		},
		ref: any
	) => {
		return (
			<>
				<Controller
					name={props.name as keyof FormType}
					control={props.control}
					rules={props.rules}
					render={({ field }) => {
						const handleChange = (value: any) => {
							field.onChange(value);
							if (props.onChange) {
								props.onChange(value);
							}
						};
						return (
							<div
								className='w-100'
								style={
									props.needMargin
										? {
												marginBottom: '10px',
										  }
										: {}
								}>
								<Select
									{...field}
									{...props}
									styles={{
										// @ts-ignore
										placeholder: (provided, state) => ({
											...provided,
											color: '#7a777680',
											fontFamily: 'Arial',
											fontSize: '14px',
											fontWeight: '400',
											lineHeight: '16.1px',
											textAlign: 'left',
										}),
										// @ts-ignore
										option: (provided, state) => ({
											...provided,
											color: '#7a7776',
											fontSize: '14px',
											fontWeight: '400',
											lineHeight: '16.1px',
											textAlign: 'left',
										}),
										// @ts-ignore
										singleValue: (provided, state) => {
											return {
												...provided,
												color: '#7a7776',
												fontSize: '14px',
												fontWeight: '400',
												lineHeight: '16.1px',
												textAlign: 'left',
											};
										},
										// @ts-ignore
										valueContainer: (provided, state) => {
											return {
												...provided,
											};
										},
										// @ts-ignore
										control: (provided, state) => {
											return {
												...provided,
												border: props.errorMessage
													? '1px solid #ff0000'
													: '1px solid #0000001A',
												'&:hover': {
													border: state.isFocused
														? '1px solid #9aa61e'
														: '1px solid #0000001A',
												},
												'&:focus-within': {
													border: '1px solid #9aa61e',
													boxShadow: 'none',
												},
											};
										},
									}}
									ref={ref}
									placeholder={props.placeholder}
									aria-label={`${props.name}`}
									onChange={handleChange}
								/>
							</div>
						);
					}}
				/>
				<SimpleTextError message={props.errorMessage} />
			</>
		);
	}
);

export default ControlledStyledSelect;
