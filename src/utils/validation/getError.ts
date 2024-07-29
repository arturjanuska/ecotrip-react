import { FieldErrors } from 'react-hook-form';
import { FormType } from '../formTypes';

export const getError = (name: string, errors: FieldErrors<FormType>) => {
	const result = name
		.split('.')
		.reduce((acc, part) => acc && acc[part], errors)?.message;

	return result ?? undefined;
};
