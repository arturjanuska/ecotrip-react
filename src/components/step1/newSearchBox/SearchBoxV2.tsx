/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Autocomplete } from '@react-google-maps/api';
import { useRef } from 'react';
import { useGoogleMapsScript } from 'use-google-maps-script';
import { Control, UseFormReturn } from 'react-hook-form';
import { FormType } from '../../../utils/formTypes';
import UncontrolledInput from '../../UncontrolledInput';

type Props = {
	name: 'pickupAddress' | 'deliveryAddress';
	placeholder?: string;
	control: Control<FormType, any>;
	errorMessage?: string;
	methods: UseFormReturn<FormType, any, undefined>;
	onChange: (name: 'pickupAddress' | 'deliveryAddress', value: string) => void;
	onClear: (name: 'pickupAddress' | 'deliveryAddress') => void;
};

function SearchBoxV2({
	name,
	placeholder,
	errorMessage,
	onChange,
	onClear,
	methods,
}: Props) {
	const inputRef = useRef<null | google.maps.places.Autocomplete>(null);

	const { isLoaded } = useGoogleMapsScript({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyCB42EkwaC9P-8-XV6zSqLiLWalfvqgHIA',
		libraries: ['places'],
	});

	const handleOnPlacesChanged = () => {
		const address = inputRef.current?.getPlace();
		onChange(name, address?.formatted_address || '');
	};

	return (
		<>
			{isLoaded && (
				<Autocomplete
					onLoad={(ref) => (inputRef.current = ref)}
					onPlaceChanged={handleOnPlacesChanged}
					options={{
						componentRestrictions: { country: ['gb', 'lt'] },
					}}>
					<UncontrolledInput
						id='autocomplete-input'
						name={name}
						placeholder={placeholder}
						type='text'
						errorMessage={errorMessage}
						isError={!!errorMessage}
						onChange={(e) => {
							if (!e.target.value) {
								methods.setValue(name, '');
								onClear(name);
							}
						}}
					/>
				</Autocomplete>
			)}
		</>
	);
}

export default SearchBoxV2;
