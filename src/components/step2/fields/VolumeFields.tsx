/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import FieldContainer from '../../FieldContainer';
import { Control } from 'react-hook-form';
import { FormType } from '../../../utils/formTypes';
import CustomInput from '../../CustomInput';
import { CustomValidationReturn } from '../../../utils/validation/useCustomValidation';
import ExtentField from './ExtentField';

type Props = {
	shipmentNumber: number;
	description?: string;
	index: number;
	control: Control<FormType>;
	validationRules: CustomValidationReturn;
	onChange: {
		length: (e: any) => void;
		width: (e: any) => void;
		height: (e: any) => void;
		extent?: (e: any) => void;
		orderedShipmentNumber?: (e: any) => void;
		shipmentPrice?: (e: any) => void;
		purchasePriceOfTheItem?: (e: any) => void;
	};
	onFocus: {
		length: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
		width: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
		height: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
		extent?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
		shipmentPrice?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
		purchasePriceOfTheItem?: (
			e: React.FocusEvent<HTMLInputElement, Element>
		) => void;
	};
	errorMessages: {
		length?: string;
		width?: string;
		height?: string;
		extent?: string;
		orderedShipmentNumber?: string;
		orderedShipmentNumberErrorMessage?: string;
		shipmentPrice?: string;
		shipmentPriceErrorMessage?: string;
		purchasePriceOfTheItem?: string;
		purchasePriceOfTheItemErrorMessage?: string;
	};
	volumeErrorMessages: string[];
	showExtentField?: boolean;
	showOrderedShipmentNumber?: boolean;
	showShipmentPriceField?: boolean;
	showPurchasePriceOfItemField?: boolean;
};

const VolumeFields = ({
	shipmentNumber,
	description,
	index,
	control,
	validationRules,
	onChange,
	onFocus,
	errorMessages,
	volumeErrorMessages,
	showExtentField = false,
	showOrderedShipmentNumber = false,
	showShipmentPriceField = false,
	showPurchasePriceOfItemField = false,
}: Props) => {
	return (
		<>
			<FieldContainer
				label={`Nr. ${shipmentNumber} siuntos išmatavimai metrais`}
				description={description}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '8px',
					}}>
					<div className='volume-fields-container'>
						<CustomInput
							name={`shipments.${index}.length`}
							control={control}
							placeholder='Ilgis'
							defaultValue={0}
							min={0}
							type='number'
							onFocus={onFocus.length}
							onChange={onChange.length}
							rules={validationRules.shipments.length}
							errorMessage={errorMessages.length}
							isError={!!errorMessages.length}
						/>
						<CustomInput
							name={`shipments.${index}.width`}
							control={control}
							placeholder='Plotis'
							defaultValue={0}
							min={0}
							type='number'
							onFocus={onFocus.width}
							onChange={onChange.width}
							rules={validationRules.shipments.width}
							errorMessage={errorMessages.width}
							isError={!!errorMessages.width}
						/>
						<CustomInput
							name={`shipments.${index}.height`}
							control={control}
							placeholder='Aukštis'
							defaultValue={0}
							min={0}
							type='number'
							onFocus={onFocus.height}
							onChange={onChange.height}
							rules={validationRules.shipments.height}
							errorMessage={errorMessages.height}
							isError={!!errorMessages.height}
						/>
					</div>
					<div className='errors'>
						{volumeErrorMessages.length !== 0 &&
							volumeErrorMessages
								.filter((mes) => mes !== undefined)
								.map((err, index) => {
									return (
										<div
											className='error'
											key={index}>
											<span>Šių parametrų siuntos neaptarnaujame. </span> {err}
										</div>
									);
								})}
					</div>
				</div>
			</FieldContainer>
			{showExtentField && (
				<ExtentField
					shipmentNumber={shipmentNumber}
					index={index}
					control={control}
					validationRules={validationRules}
					onChange={(e) => {
						onChange.extent?.(e);
					}}
					onFocus={(e) => {
						onFocus.extent?.(e);
					}}
					errorMessage={errorMessages.extent}
				/>
			)}
			{showOrderedShipmentNumber && (
				<FieldContainer
					label='Užsakytos siuntos numeris (Amazon UK, eBay ir kt.) *'
					description=''>
					<>
						<CustomInput
							name={`shipments.${index}.orderedShipmentNumber`}
							control={control}
							placeholder='Siuntos numeris'
							onChange={onChange.orderedShipmentNumber}
							rules={validationRules.shipments.orderedShipmentNumber}
							errorMessage={errorMessages.orderedShipmentNumber}
						/>
						{errorMessages.orderedShipmentNumberErrorMessage && (
							<div className='errors'>
								<div className='error'>
									<span>Neįvestas siuntos numeris. </span>{' '}
									{errorMessages.orderedShipmentNumberErrorMessage}
								</div>
							</div>
						)}
					</>
				</FieldContainer>
			)}
			{showShipmentPriceField && (
				<FieldContainer
					label='Prekės nupirkimo suma'
					description=''>
					<>
						<CustomInput
							name={`shipments.${index}.shipmentPrice`}
							control={control}
							placeholder='Įveskite prekės sumą'
							type='number'
							onFocus={onFocus.shipmentPrice}
							onChange={onChange.shipmentPrice}
							rules={validationRules.shipments.shipmentPrice}
							errorMessage={errorMessages.shipmentPrice}
						/>
						{errorMessages.shipmentPriceErrorMessage && (
							<div className='errors'>
								<div className='error'>
									{errorMessages.shipmentPriceErrorMessage}
								</div>
							</div>
						)}
					</>
				</FieldContainer>
			)}
			{showPurchasePriceOfItemField && (
				<FieldContainer
					label='Siuntos/prekės išpirkos kaina'
					description=''>
					<>
						<CustomInput
							name={`shipments.${index}.purchasePriceOfTheItem`}
							control={control}
							placeholder='Įveskite siuntos/prekės kainą'
							type='number'
							onFocus={onFocus.purchasePriceOfTheItem}
							onChange={onChange.purchasePriceOfTheItem}
							rules={validationRules.shipments.purchasePriceOfTheItem}
							errorMessage={errorMessages.purchasePriceOfTheItem}
						/>
						{errorMessages.purchasePriceOfTheItemErrorMessage && (
							<div className='errors'>
								<div className='error'>
									<span>Neįvesta siuntos/prekės kaina. </span>{' '}
									{errorMessages.purchasePriceOfTheItemErrorMessage}
								</div>
							</div>
						)}
					</>
				</FieldContainer>
			)}
		</>
	);
};

export default VolumeFields;
