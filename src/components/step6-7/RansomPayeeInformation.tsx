/* eslint-disable @typescript-eslint/no-explicit-any */
import Step from '../Step';
import ClientInformationForm from '../step4/ClientInformationForm';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { useCustomValidation } from '../../utils/validation/useCustomValidation';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import i18n from 'i18next';
import { OptionType } from '../../utils/types';
import FieldContainer from '../layout/FieldContainer';
import ControlledStyledSelect from '../form/select/ControlledStyledSelect';

type Props = {
  control: Control<FormType, any>;
  formErrors: FieldErrors<FormType>;
  selectedService: string;
  methods: UseFormReturn<FormType, any, undefined>;
};

const RansomPayeeInformation = ({
  control,
  formErrors,
  selectedService,
  methods,
}: Props) => {
  const { t } = useTranslation();

  const currentlLanguage = i18n.language;
  const validationRules = useCustomValidation({ service: selectedService });

  const ransomPayeeValidationRules =
    validationRules.ransomPayeeInformation as any;

  const options = [
    {
      label: 'sender',
      value: 'sender',
    },
    {
      label: 'otherPerson',
      value: 'otherPerson',
    },
  ];

  const ransomRecipientSelectValue = methods.watch(
    'ransomPayeeInformation.ransomRecipient.value'
  );

  useEffect(() => {
    const selectedOption = options.find(
      (option) => option.value === ransomRecipientSelectValue
    ) as OptionType;

    const translatedOption = {
      label: t(selectedOption.value),
      value: selectedOption.value,
    };

    methods.setValue(
      'ransomPayeeInformation.ransomRecipient',
      translatedOption
    );
  }, [currentlLanguage]);

  return (
    <Step step={6} title={t('step6Title')}>
      <>
        <div
          style={{
            marginBottom: '30px',
          }}
        >
          <FieldContainer
            label={t('ransomRecipientStepLabel')}
            description={t('ransomRecipientStepDescription')}
          >
            <ControlledStyledSelect
              name="ransomPayeeInformation.ransomRecipient"
              options={options}
              control={control}
              rules={
                ransomPayeeValidationRules
                  ? ransomPayeeValidationRules.ransomRecipient
                  : undefined
              }
            />
          </FieldContainer>
        </div>
        {ransomRecipientSelectValue === 'otherPerson' ? (
          <div>
            <ClientInformationForm
              client="ransomPayee"
              control={control}
              subName="ransomPayeeInformation"
              formErrors={formErrors}
              validationRules={
                ransomPayeeValidationRules
                  ? ransomPayeeValidationRules
                  : undefined
              }
              methods={methods}
            />
          </div>
        ) : null}
      </>
    </Step>
  );
};

export default RansomPayeeInformation;
