import usePlacesAutocomplete from 'use-places-autocomplete';
import { useGoogleMapsScript, Libraries } from 'use-google-maps-script';
import { OptionType } from '../../utils/types';
import StyledSelect from '../StyledSelect';
import { RegisterOptions } from 'react-hook-form';
import { FormType } from '../../utils/formTypes';

interface ISearchBoxProps {
	defaultValue: string;
	name: 'pickupAddress' | 'deliveryAddress';
	placeholder?: string;
	onChange: (name: 'pickupAddress' | 'deliveryAddress', value: string) => void;
	onClear: (name: 'pickupAddress' | 'deliveryAddress') => void;
	errorMessage?: string;
	rules?:
		| Omit<
				RegisterOptions<FormType, keyof FormType>,
				'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
		  >
		| undefined;
}

const libraries: Libraries = ['places'];

export const SearchBox = ({
	defaultValue,
	name,
	onChange,
	placeholder,
	onClear,
	errorMessage,
	rules,
}: ISearchBoxProps) => {
	const { isLoaded, loadError } = useGoogleMapsScript({
		googleMapsApiKey: 'AIzaSyCB42EkwaC9P-8-XV6zSqLiLWalfvqgHIA',
		libraries,
	});

	if (!isLoaded) return null;
	if (loadError) return <div>Error loading</div>;

	return (
		<ReadySearchBox
			defaultValue={defaultValue}
			name={name}
			onChange={onChange}
			placeholder={placeholder}
			onClear={onClear}
			errorMessage={errorMessage}
			rules={rules}
		/>
	);
};

const ReadySearchBox = ({
	defaultValue,
	name,
	onChange,
	placeholder,
	onClear,
	errorMessage,
	rules,
}: ISearchBoxProps) => {
	const {
		ready,
		value,
		setValue,
		suggestions: { data },
		clearSuggestions,
	} = usePlacesAutocomplete({
		debounce: 300,
		defaultValue,
		requestOptions: {
			componentRestrictions: { country: ['uk', 'lt'] },
		},
	});

	const handleChange = (value: string) => {
		setValue(value);
	};

	return (
		<div className='w-full'>
			<StyledSelect
				name={name}
				className='w-full placeholder-{#7a777680}'
				isDisabled={!ready}
				isClearable={true}
				onInputChange={(value) => {
					handleChange(value);
				}}
				onChange={(newValue, actionMeta) => {
					const val = newValue as unknown as OptionType;
					if (actionMeta.action === 'clear') {
						onClear(name);
					} else {
						if (newValue && val.label) {
							onChange(name, val.label);
							clearSuggestions();
						}
					}
				}}
				inputValue={value}
				options={
					data
						? data.map((place) => ({
								label: place.description as string,
								value: place.description as string,
						  }))
						: []
				}
				defaultInputValue=''
				placeholder={placeholder}
				errorMessage={errorMessage}
			/>
		</div>
	);
};
