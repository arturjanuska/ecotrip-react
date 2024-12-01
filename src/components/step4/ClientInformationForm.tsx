/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import CustomTextarea from '../CustomTextarea';
import './step4.css';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { getError } from '../../utils/validation/getError';
import { findPostcode } from '../../utils/findPostcode';
import SearchBoxV2 from '../step1/newSearchBox/SearchBoxV2';
import { useTranslation } from 'react-i18next';

type Props = {
  client: 'sender' | 'recipient' | 'ransomPayee' | 'purchaseInformation';
  control: Control<FormType, any>;
  subName: string;
  formErrors: FieldErrors<FormType>;
  isShipmentWithAddressServiceSelected?: boolean;
  validationRules?: { [key: string]: { required: string } };
  service?: string;
  methods: UseFormReturn<FormType, any, undefined>;
  step?: number;
};

type FieldType = 'name' | 'surname' | 'phone' | 'email' | 'address' | 'zipcode';

const ClientInformationForm = ({
  client,
  control,
  subName,
  formErrors,
  isShipmentWithAddressServiceSelected,
  validationRules,
  methods,
  step,
}: Props) => {
  const { t } = useTranslation();

  const getAddressDescription = (client: Props['client']) => {
    switch (client) {
      case 'sender':
        return t('senderAddressDescription');

      case 'recipient':
        return t('recipientAddressDescription');

      case 'ransomPayee':
        return t('ransomPayeeAndPurchaseAddressDescription');

      case 'purchaseInformation':
        return t('ransomPayeeAndPurchaseAddressDescription');

      default:
        return t('senderAddressDescription');
    }
  };

  const onChange = (_name: keyof FormType, value: string) => {
    const correctedName = `${subName}.address`;
    const postCode: keyof FormType = findPostcode(value) as keyof FormType;
    // @ts-ignore
    methods.setValue(`${subName}.zipCode`, postCode);
    methods.setValue(correctedName as keyof FormType, value);
  };

  const isFieldsDisabled =
    isShipmentWithAddressServiceSelected && client === 'sender';

  const generateTranslationKey = (
    client: Props['client'],
    field: FieldType,
    fieldType: 'label' | 'placeholder'
  ) => {
    return `${client}${field.charAt(0).toUpperCase()}${field.slice(1)}${fieldType === 'label' ? 'Label' : 'Placeholder'}`;
  };

  const getTranslatedValue = (
    client: Props['client'],
    field: FieldType,
    fieldType: 'label' | 'placeholder'
  ) => {
    const translationKey = generateTranslationKey(client, field, fieldType);
    return t(translationKey);
  };

  return (
    <>
      <div className="client-form-container">
        <div className="client-form-row">
          <FieldContainer label={getTranslatedValue(client, 'name', 'label')}>
            <CustomInput
              placeholder={getTranslatedValue(client, 'name', 'placeholder')}
              control={control}
              name={`${subName}.firstName`}
              errorMessage={getError(`${subName}.firstName`, formErrors)}
              disabled={isFieldsDisabled}
              rules={validationRules?.firstName}
            />
          </FieldContainer>
          <FieldContainer
            label={getTranslatedValue(client, 'surname', 'label')}
          >
            <CustomInput
              placeholder={getTranslatedValue(client, 'surname', 'placeholder')}
              control={control}
              name={`${subName}.lastName`}
              errorMessage={getError(`${subName}.lastName`, formErrors)}
              disabled={isFieldsDisabled}
              rules={validationRules?.lastName}
            />
          </FieldContainer>
        </div>
        <div className="client-form-row">
          <FieldContainer label={getTranslatedValue(client, 'phone', 'label')}>
            <CustomInput
              placeholder={getTranslatedValue(client, 'phone', 'placeholder')}
              control={control}
              name={`${subName}.phoneNumber`}
              errorMessage={getError(`${subName}.phoneNumber`, formErrors)}
              disabled={isFieldsDisabled}
              rules={validationRules?.phoneNumber}
            />
          </FieldContainer>
          <FieldContainer
            label={getTranslatedValue(client, 'email', 'label')}
            description={t('emailFieldDescription')}
          >
            <CustomInput
              placeholder={getTranslatedValue(client, 'email', 'placeholder')}
              control={control}
              name={`${subName}.email`}
              errorMessage={getError(`${subName}.email`, formErrors)}
              disabled={isFieldsDisabled}
              rules={validationRules?.email}
            />
          </FieldContainer>
        </div>
        <div className="client-form-row">
          <FieldContainer
            label={getTranslatedValue(client, 'address', 'label')}
            description={getAddressDescription(client)}
          >
            <SearchBoxV2
              control={control}
              name={`${subName}.address` as keyof FormType}
              placeholder={t('enterStreetNumberCity')}
              errorMessage={getError(`${subName}.address`, formErrors)}
              methods={methods}
              onChange={onChange}
              disabled={isFieldsDisabled}
              country={
                isShipmentWithAddressServiceSelected ? ['lt'] : ['gb', 'lt']
              }
            />
          </FieldContainer>
          <FieldContainer
            label={getTranslatedValue(client, 'zipcode', 'label')}
            description={t('zipcodeFieldDescription')}
          >
            <CustomInput
              placeholder={t('zipcodeInputPlaceholder')}
              control={control}
              name={`${subName}.zipCode`}
              errorMessage={getError(`${subName}.zipCode`, formErrors)}
              disabled={isFieldsDisabled}
              rules={validationRules?.zipCode}
            />
          </FieldContainer>
        </div>
      </div>

      <CustomTextarea
        label={step === 5 ? t('textAreaStep5Label') : t('textAreaLabel')}
        name={`${subName}.additionInformation`}
        control={control}
        placeholder={t('textAreaPlaceholder')}
      />
    </>
  );
};

export default ClientInformationForm;
