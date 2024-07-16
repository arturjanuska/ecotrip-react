/* eslint-disable react/display-name */
// import merge from 'lodash-es/merge';
import Select, { Props } from 'react-select';
import React, { forwardRef } from 'react';
// import { styleProps } from './ReactSelectStyleProps';
// import SimpleTextError from '../../errors/SimpleTextError';

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
	singleValue: (provided, state) => ({
		...provided,
		color: '#7a7776',
		fontSize: '14px',
		fontWeight: '400',
		lineHeight: '16.1px',
		textAlign: 'left',
	}),
	// @ts-ignore
	valueContainer: (provided, state) => ({
		...provided,
	}),
	// @ts-ignore
	control: (provided, state) => ({
		...provided,
		border: '1px solid #0000001A',
		'&:hover': {
			border: state.isFocused ? '1px solid #9aa61e' : '1px solid #0000001A',
		},
		'&:focus-within': {
			border: '1px solid #9aa61e',
			boxShadow: 'none',
		},
	}),
};

export default forwardRef(
	(
		props: Props & {
			label?: string;
			testId?: string;
			errorMessage?: string;
		},
		// Type is RefCallBack from react-hook-form
		// Type does not work with spread syntax.
		ref: any
	) => {
		// styleProps must come first so that they could be overwritten by props
		// the first argument must be an empty object, otherwise the merge will mutate the styleProps object
		// causing all react-selects to share properties.
		// const mergedProps = merge({}, styleProps, props);
		return (
			<div className='w-100'>
				<Select
					styles={customStyles}
					ref={ref}
					placeholder={false}
					{...props}
					aria-label={`${props.name}`}
				/>
				{/* <SimpleTextError message={props.errorMessage} /> */}
			</div>
		);
	}
);
