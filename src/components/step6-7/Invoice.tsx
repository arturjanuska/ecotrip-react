/* eslint-disable @typescript-eslint/no-explicit-any */
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import { getError } from '../../utils/validation/getError';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import ControlledCheckboxWithLabel from '../ControlledCheckboxWithLabel';

type InvoiceProps = {
	control: Control<FormType, any>;
	formErrors: FieldErrors<FormType>;
	methods: UseFormReturn<FormType, any, undefined>

};

const Invoice = ({ control, formErrors, methods }: InvoiceProps) => {
	const needInvoice = methods.watch("invoiceRequired")

	return (
		<>
			<ControlledCheckboxWithLabel
				control={control}
				name='invoiceRequired'>
				<span>Reikalinga sąskaita faktūra</span>
			</ControlledCheckboxWithLabel>

			{needInvoice ? (
				<div className='invoice-form-container'>
					<FieldContainer label='Įmonės pavadinimas'>
						<CustomInput
							placeholder='Įveskite įmonės pavadinimą *'
							control={control}
							name='invoiceInformation.companyName'
							errorMessage={getError(
								'invoiceInformation.companyName',
								formErrors
							)}
						/>
					</FieldContainer>
					<FieldContainer label='Įmonės kodas'>
						<CustomInput
							placeholder='Įveskite įmonės kodą *'
							name='invoiceInformation.companyCode'
							control={control}
							errorMessage={getError(
								'invoiceInformation.companyCode',
								formErrors
							)}
						/>
					</FieldContainer>
					<FieldContainer label='PVM mokėtojo kodas'>
						<CustomInput
							placeholder='Įveskite PVM mokėtojo kodą *'
							name='invoiceInformation.pvmCode'
							control={control}
							errorMessage={getError('invoiceInformation.pvmCode', formErrors)}
						/>
					</FieldContainer>
					<FieldContainer label='Įmonės el. paštas'>
						<CustomInput
							placeholder='Įveskite įmonės el paštą *'
							control={control}
							name='invoiceInformation.companyEmail'
							errorMessage={getError(
								'invoiceInformation.companyEmail',
								formErrors
							)}
						/>
					</FieldContainer>
					<FieldContainer label='Įmonės adresas'>
						<CustomInput
							placeholder='Įveskite įmonės adresą *'
							control={control}
							name='invoiceInformation.companyAddress'
							errorMessage={getError(
								'invoiceInformation.companyAddress',
								formErrors
							)}
						/>
					</FieldContainer>
				</div>
			) : null}
		</>
	);
};

export default Invoice;
