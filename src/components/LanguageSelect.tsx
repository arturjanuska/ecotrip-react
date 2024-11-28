/* eslint-disable @typescript-eslint/ban-ts-comment */
import StyledSelect from './StyledSelect';
import { useTranslation } from 'react-i18next';

type Languages = 'lt' | 'en';

const LanguageSelect = () => {
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

	const localStorageLang = localStorage.getItem('lang') as Languages;

	return (
    <div className="language-select-container">
      <StyledSelect
        options={options}
        defaultValue={options.find(
          (option) => option.value === localStorageLang || "lt",
        )}
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
