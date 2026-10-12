/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StylesConfig } from 'react-select';

// react-select takes styles as objects, so the EcoTrip tokens are repeated here
// as values; they match the --ecotrip-* custom properties in globals.css.
const INK = '#07110d';
const PAPER = '#f4f2e9';
const BRAND = '#a5c506';
const ACCENT = '#a5c506';
const ERROR = '#a43030';
const FIELD_BORDER = 'rgba(7, 17, 13, 0.35)';
const BODY_FONT = "'Manrope', ui-sans-serif, sans-serif";

type Options = {
  hasError?: boolean;
};

export const getSelectStyles = ({
  hasError = false,
}: Options = {}): StylesConfig<any, boolean> => {
  return {
    control: (provided, state) => {
      const borderColor = hasError
        ? ERROR
        : state.isFocused
          ? BRAND
          : FIELD_BORDER;
      return {
        ...provided,
        minHeight: '3.6rem',
        border: 0,
        borderBottom: `1px solid ${borderColor}`,
        borderStyle: state.isDisabled ? 'dashed' : 'solid',
        borderRadius: 0,
        background: 'transparent',
        boxShadow: state.isFocused
          ? `0 2px 0 ${hasError ? ERROR : BRAND}`
          : hasError
            ? `0 1px 0 ${ERROR}`
            : 'none',
        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
        transition: 'border-color 220ms ease, box-shadow 220ms ease',
        '&:hover': { borderColor: hasError ? ERROR : BRAND },
      };
    },
    valueContainer: (provided) => ({ ...provided, padding: '0' }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgba(7, 17, 13, 0.5)',
      font: `500 1.05rem/1.4 ${BODY_FONT}`,
      textAlign: 'left',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? 'rgba(7, 17, 13, 0.6)' : INK,
      font: `500 1.05rem/1.4 ${BODY_FONT}`,
      textAlign: 'left',
    }),
    input: (provided) => ({
      ...provided,
      color: INK,
      font: `500 1rem/1.4 ${BODY_FONT}`,
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      paddingRight: 0,
      color: state.isFocused ? INK : 'rgba(7, 17, 13, 0.5)',
      '&:hover': { color: INK },
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '0.4rem',
      overflow: 'hidden',
      border: '1px solid rgba(7, 17, 13, 0.18)',
      borderRadius: '0.8rem',
      background: PAPER,
      boxShadow: '0 1.2rem 2.4rem rgba(7, 17, 13, 0.12)',
      zIndex: 30,
    }),
    menuList: (provided) => ({ ...provided, padding: '0.35rem' }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: '0.5rem',
      color: state.isDisabled ? 'rgba(7, 17, 13, 0.4)' : INK,
      backgroundColor: state.isSelected
        ? ACCENT
        : state.isFocused
          ? 'rgba(165, 197, 6, 0.12)'
          : 'transparent',
      font: `${state.isSelected ? 700 : 500} 0.95rem/1.35 ${BODY_FONT}`,
      textAlign: 'left',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      '&:active': { backgroundColor: ACCENT },
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: 'rgba(7, 17, 13, 0.6)',
      font: `500 0.9rem/1.4 ${BODY_FONT}`,
    }),
  };
};
