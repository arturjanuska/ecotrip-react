/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Autocomplete } from '@react-google-maps/api';
import { useRef } from 'react';
import { useGoogleMapsScript } from 'use-google-maps-script';
import { Control, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../../utils/formTypes';
import CustomInput from '../../CustomInput';

type Props = {
	name: keyof FormType;
	placeholder?: string;
	control: Control<FormType, any>;
	errorMessage?: string;
	methods: UseFormReturn<FormType, any, undefined>;
	onChange: (name: keyof FormType, value: string) => void;
	onClear?: (name: keyof FormType) => void;
	disabled?: boolean;
	country?: string[];
};

const libraries: 'places'[] = ['places'];

function SearchBoxV2({
	name,
	placeholder,
	errorMessage,
	onChange,
	onClear,
	methods,
	disabled = false,
	control,
	country = ['gb', 'lt'],
}: Props) {
	const inputRef = useRef<null | google.maps.places.Autocomplete>(null);

	const { isLoaded } = useGoogleMapsScript({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyCB42EkwaC9P-8-XV6zSqLiLWalfvqgHIA',
		libraries,
	});

	const handleOnPlacesChanged = () => {
		const address = inputRef.current?.getPlace();
		onChange(name, address?.formatted_address || '');
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	};

	return (
		<>
			{isLoaded && (
				<Autocomplete
					onLoad={(ref) => (inputRef.current = ref)}
					onPlaceChanged={handleOnPlacesChanged}
					options={{
						componentRestrictions: { country: country },
					}}>
					<CustomInput
						id={`autocomplete-input-${name}`}
						control={control}
						name={name}
						placeholder={placeholder}
						type='text'
						errorMessage={errorMessage}
						isError={!!errorMessage}
						onChange={(e) => {
							if (!e.target.value) {
								methods.setValue(name, '');
								onClear?.(name);
							}
						}}
						onKeyDown={handleKeyPress}
						disabled={disabled}
					/>
				</Autocomplete>
			)}
		</>
	);
}

export default SearchBoxV2;
