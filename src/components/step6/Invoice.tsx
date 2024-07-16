import React, { useState } from 'react';
import CheckboxWithLabel from '../CheckboxWithLabel';
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';

type InvoiceProps = {};

const Invoice = (props: InvoiceProps) => {
	const [needInvoice, setNeedInvoice] = useState(false);

	return (
		<>
			<CheckboxWithLabel
				style={{
					marginBottom: needInvoice ? '30px' : '8px',
				}}
				onChange={(e) => {
					setNeedInvoice(e.target.checked);
				}}>
				<span>Reikalinga sąskaita faktūra</span>
			</CheckboxWithLabel>
			{needInvoice ? (
				<div className='invoice-form-container'>
					<FieldContainer label='Įmonės pavadinimas'>
						<CustomInput placeholder='Įveskite įmonės pavadinimą' />
					</FieldContainer>
					<FieldContainer label='Įmonės kodas'>
						<CustomInput placeholder='Įveskite įmonės kodą' />
					</FieldContainer>
					<FieldContainer label='Įmonės el. paštas'>
						<CustomInput placeholder='Įveskite įmonės el paštą' />
					</FieldContainer>
					<FieldContainer label='Įmonės adresas'>
						<CustomInput placeholder='Įveskite įmonės adresą' />
					</FieldContainer>
				</div>
			) : null}
		</>
	);
};

export default Invoice;
