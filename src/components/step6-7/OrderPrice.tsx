/* eslint-disable @typescript-eslint/no-explicit-any */
import Invoice from './Invoice';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { CurrencyType, FormType } from '../../utils/formTypes';
import { convertValue } from '../../utils/convertCurrency';
import { useTranslation } from 'react-i18next';

type Props = {
  sum: string;
  control: Control<FormType, any>;
  formErrors: FieldErrors<FormType>;
  currency: CurrencyType;
  methods: UseFormReturn<FormType, any, undefined>;
  priceDescription: { title: string; price: string }[];
  rate: number;
};

const OrderPrice = ({
  sum,
  control,
  formErrors,
  currency,
  methods,
  priceDescription,
  rate,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="order-price-container">
      {priceDescription.length !== 0 ? (
        <div className="price-description-container">
          {priceDescription.map((item, index) => {
            return (
              <p
                className="price-description-row"
                key={`${item.title}-${index}`}
              >
                <span>{item.title}</span> <strong>{item.price}</strong>
              </p>
            );
          })}
        </div>
      ) : null}
      <p className="order-price">
        {t('orderPrice')}{' '}
        <strong>
          {currency}
          {sum
            ? `${sum} - ${convertValue(currency, Number(sum) ?? 0, rate)}`
            : '0.00'}
        </strong>
      </p>
      <Invoice control={control} formErrors={formErrors} methods={methods} />
    </div>
  );
};

export default OrderPrice;
