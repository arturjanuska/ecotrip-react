import React from 'react';
import '../styles/step.css';

type Props = {
	id?: string;
	title: string;
	step: number;
	children: React.ReactNode;
	className?: string;
};

const Step = ({ title, step, children, className, id }: Props) => {
	const stepTitle = `${step}. ${title}`;

	return (
		<div
			className={`step-columns ${className ? className : ''}`}
			id={id}>
			<div className='title-column'>
				<span>{stepTitle}</span>
			</div>
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'flex-end',
				}}>
				<div className='content-column'>{children}</div>
			</div>
		</div>
	);
};

export default Step;
