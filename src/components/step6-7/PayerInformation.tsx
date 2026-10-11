/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Step from '../Step';
import OrderPrice from './OrderPrice';
import './step6.css';
import Link from '../Link';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { useEffect } from 'react';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';
// import UncontrolledInput from '../UncontrolledInput';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CustomAlert from '../form/error/CustomAlert';
import { useTranslation } from 'react-i18next';
import getOrderPrice from '../../utils/getOrderPrice';
import useFeeSettings from '../../hooks/useFeeSettings';
import FieldContainer from '../layout/FieldContainer';
import ControlledStyledSelect from '../form/select/ControlledStyledSelect';
import ControlledCheckboxWithLabel from '../form/checkbox/ControlledCheckboxWithLabel';
import SecondaryButton from '../buttons/SecondaryButton';
import getTranslatedOptions from '../../utils/getTranslatedOptions';

type Props = {
  control: Control<FormType, any>;
  step: number;
  stepLabel: string;
  formErrors: FieldErrors<FormType>;
  methods: UseFormReturn<FormType, any, undefined>;
  currency: '€' | '£';
  errorMessages: Record<string, string>;
  submitErrorMessage: string | null;
  postcodeDetails: any;
  priceDescription: { title: string; price: string }[];
  setPriceDescription: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
        price: string;
      }[]
    >
  >;
  rate: number;
  isLoading: boolean;
};

const PayerInformation = ({
  control,
  step,
  stepLabel,
  formErrors,
  methods,
  currency,
  errorMessages,
  submitErrorMessage,
  postcodeDetails,
  setPriceDescription,
  priceDescription,
  rate,
  isLoading,
}: Props) => {
  // const [discountCode, setDiscountCode] = useState<string>('');
  const { t } = useTranslation();

  const payerOptions = getTranslatedOptions([
    {
      label: 'thePayerIsTheSender',
      value: 'thePayerIsTheSender',
    },
    {
      label: 'thePayerIsTheRecipient',
      value: 'thePayerIsTheRecipient',
    },
  ]);

  const paymentMethodOptions = getTranslatedOptions([
    {
      label: 'cash',
      value: 'cash',
    },
    {
      label: 'card',
      value: 'card',
    },
    {
      label: 'bankTransfer',
      value: 'bankTransfer',
    },
    // {
    //   label: 'paysera',
    //   value: 'paysera',
    // },
  ]);

  const shipments = methods.watch('shipments');

  const service = methods.watch('service');

  const payer = methods.watch('customerInformation.payerOfTheShipment.value');

  const validationRules = useCustomValidation({ service });

  const { fees } = useFeeSettings();

  useEffect(() => {
    getOrderPrice(
      shipments,
      postcodeDetails,
      fees,
      service,
      currency,
      rate,
      setPriceDescription,
      methods
    );
  }, [
    shipments,
    shipments.length,
    JSON.stringify(shipments),
    payer,
    service,
    JSON.stringify(postcodeDetails),
    fees,
  ]);

  const orderPrice = methods.watch('estimatedShipmentPrice');

  const isDisabled =
    Object.keys(errorMessages).length > 0 || shipments.length === 0;

  const errorMessagesArray = Object.keys(errorMessages) ?? [];

  return (
    <Step step={step} title={stepLabel}>
      <>
        <div className="payer-info-container">
          <FieldContainer
            label={t('shipmentCustomerMsg')}
            description={t('paymentResponsibilityMsg')}
          >
            <ControlledStyledSelect
              placeholder={t('shipmentCustomerMsg')}
              isDisabled={
                service === 'shipmentWithAddressService' ||
                service === 'productPurchaseService'
              }
              name="customerInformation.payerOfTheShipment"
              options={payerOptions}
              control={control}
              errorMessage={
                formErrors.customerInformation?.payerOfTheShipment?.message
              }
              rules={validationRules.customerInformation.payerOfTheShipment}
            />
          </FieldContainer>
          <FieldContainer
            label={t('paymentMethod')}
            description={t('paymentMethodDescription')}
          >
            <ControlledStyledSelect
              placeholder={t('paymentMethod')}
              name="customerInformation.paymentMethod"
              options={paymentMethodOptions}
              control={control}
              errorMessage={
                formErrors.customerInformation?.paymentMethod?.message
              }
              rules={validationRules.customerInformation.paymentMethod}
            />
          </FieldContainer>
        </div>
        {/* <div className='columns'>
					<div className='left-column empty'></div>
					<div className='right-column discount-section'>
						<UncontrolledInput
							placeholder='Įveskite nuolaidos kodą'
							isError={false}
							onChange={(e) => {
								setDiscountCode(e.target.value);
							}}
							value={discountCode}
						/>
						<SecondaryButton
							type='button'
							disabled={!discountCode}>
							<FontAwesomeIcon icon={faCheck} />
						</SecondaryButton>
					</div>
				</div> */}
        <div className="columns">
          <div className="left-column empty"></div>
          <div className="right-column">
            <OrderPrice
              sum={orderPrice}
              currency={currency}
              control={control}
              formErrors={formErrors}
              methods={methods}
              priceDescription={priceDescription}
              rate={rate}
            />
          </div>
        </div>
        <div className="checkboxes-container">
          <ControlledCheckboxWithLabel
            control={control}
            errorMessage={formErrors.packagingAndLabelingRules?.message}
            name="packagingAndLabelingRules"
            rules={validationRules.packagingAndLabelingRules}
          >
            <>
              <span>
                {t('agreeWithTermsMsg')}{' '}
                <Link
                  href="https://ecotrip.lt/siuntos-pakavimo-ir-zenklinimo-taisykles/"
                  text={t('ecoTripPackingLabelRulesMsg')}
                />
              </span>
            </>
          </ControlledCheckboxWithLabel>
          <ControlledCheckboxWithLabel
            control={control}
            errorMessage={formErrors.transportRules?.message}
            name="transportRules"
            rules={validationRules.transportRules}
          >
            <span>
              {t('agreeWithTermsMsg')}{' '}
              <Link
                href="https://ecotrip.lt/vezimo-taisykles/"
                text={t('ecoTripPackingLabelRulesMsg2')}
              />
            </span>
          </ControlledCheckboxWithLabel>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <CustomAlert
            messages={[
              ...(submitErrorMessage ? [submitErrorMessage] : []),
              ...errorMessagesArray,
            ]}
          />
          <SecondaryButton
            type={`${isDisabled ? 'button' : 'submit'}`}
            disabled={isDisabled || isLoading}
          >
            <span>{t('confirmOrderMsg')}</span>
          </SecondaryButton>
        </div>
      </>
    </Step>
  );
};

export default PayerInformation;
