import React from 'react';
import '../styles/input.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {};

const CustomInput = (props: InputProps) => {
	return (
		<div className='input-container'>
			<input {...props}></input>
		</div>
	);
};

export default CustomInput;
