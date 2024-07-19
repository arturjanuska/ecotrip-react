import React, { useState } from 'react';
import CheckboxWithLabel from '../CheckboxWithLabel';
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';

type InvoiceProps = {
  control: any;
};

const Invoice = ({ control }: InvoiceProps) => {
  const [needInvoice, setNeedInvoice] = useState(false);

  return (
    <>
      <CheckboxWithLabel
        style={{
          marginBottom: needInvoice ? '30px' : '8px',
        }}
        onChange={(e) => {
          setNeedInvoice(e.target.checked);
        }}
      >
        <span>Reikalinga sąskaita faktūra</span>
      </CheckboxWithLabel>
      {needInvoice ? (
        <div className='invoice-form-container'>
          <FieldContainer label='Įmonės pavadinimas'>
            <CustomInput
              placeholder='Įveskite įmonės pavadinimą'
              control={control}
              name='invoiceInformation.companyName'
            />
          </FieldContainer>
          <FieldContainer label='Įmonės kodas'>
            <CustomInput
              placeholder='Įveskite įmonės kodą'
              name='invoiceInformation.companyCode'
              control={control}
            />
          </FieldContainer>
          <FieldContainer label='PVM mokėtojo kodas'>
            <CustomInput
              placeholder='Įveskite PVM mokėtojo kodą'
              name='invoiceInformation.pvmCode'
              control={control}
            />
          </FieldContainer>
          <FieldContainer label='Įmonės el. paštas'>
            <CustomInput
              placeholder='Įveskite įmonės el paštą'
              control={control}
              name='invoiceInformation.companyEmail'
            />
          </FieldContainer>
          <FieldContainer label='Įmonės adresas'>
            <CustomInput
              placeholder='Įveskite įmonės adresą'
              control={control}
              name='invoiceInformation.companyAddress'
            />
          </FieldContainer>
        </div>
      ) : null}
    </>
  );
};

export default Invoice;
