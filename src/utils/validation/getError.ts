/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FieldErrors } from 'react-hook-form';
import { FormType } from '../formTypes';

export const getError = (name: string, errors: FieldErrors<FormType>) => {
  const result = name
    .split('.')
    // @ts-ignore
    .reduce((acc, part) => acc && acc[part], errors)?.message;

  return result ?? undefined;
};
