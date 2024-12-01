/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UseFormReturn } from 'react-hook-form';
import useTranslateParcelData from '../hooks/useTranslateParcelData';
import StyledSelect from './StyledSelect';
import { useTranslation } from 'react-i18next';
import { FormType } from '../utils/formTypes';
import useTranslateTransportationDate from '../hooks/useTranslateTransportationDate';

type Languages = 'lt' | 'en';

const LanguageSelect = ({
  methods,
}: {
  methods: UseFormReturn<FormType, any, undefined>;
}) => {
  const { i18n } = useTranslation();

  const options = [
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'lt',
      label: 'Lietuvių',
    },
  ];

  const onLanguageChange = (value: Languages) => {
    localStorage.setItem('lang', value);
    i18n.changeLanguage(value);
  };

  useTranslateParcelData({
    currentLanguage: i18n.language,
    methods,
  });

  useTranslateTransportationDate({
    currentLanguage: i18n.language,
    methods,
  });

  return (
    <div className="language-select-container">
      <StyledSelect
        options={options}
        defaultValue={options.find((option) => option.value === i18n.language)}
        // @ts-ignore
        onChange={(select: { value: string; label: string }) => {
          const value = select.value as Languages;
          onLanguageChange(value);
        }}
      />
    </div>
  );
};

export default LanguageSelect;
