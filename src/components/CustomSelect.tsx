import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import './select.css';
import Select from 'react-select';
import { OptionType } from '@/app/utils/types';

const CustomSelect = ({
	label,
	options,
	name,
	onChange,
}: {
	label: string;
	options: OptionType[];
	name: string;
	onChange: (value: OptionType) => void;
}) => {
	const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
	const [error, setError] = useState<string>('');

	const handleChange: ChangeEventHandler<HTMLSelectElement> = (
		e: ChangeEvent<HTMLSelectElement>
	) => {
		const foundOption = options.find(
			(option) => option.value === e.target.value
		);
		if (foundOption) {
			console.log('Selected Option', foundOption);

			setSelectedOption(foundOption);
		} else {
			setError('Option not found');
		}
	};
	const handleChanges = (e) => {
		console.log('TEST, ', e);
	};

	return (
		<div className='custom-select'>
			<label htmlFor='select'>{label}</label>
			{/* <ReactSelect
        name="select"
        id={`customSelect-${label}`}
        onChange={handleChange}
        value={selectedOption?.value || ""}
      >
        <option selected disabled>
          Select {name}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select> */}
			<Select
				className='basic-single'
				classNamePrefix='select'
				// defaultValue={colourOptions[0]}
				isDisabled={false}
				// isLoading={!!options.length}
				isClearable={true}
				// isRtl={isRtl}
				// isSearchable={isSearchable}
				name={name}
				options={options}
				onChange={handleChanges}
			/>
			{error ? <div>{error}</div> : null}
		</div>
	);
};

export default CustomSelect;
