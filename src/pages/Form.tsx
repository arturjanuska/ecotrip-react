/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AddressForm from '../components/step1/AddressForm';
import Breadcrumds from '../components/Breadcrumds';
import SenderInformation from '../components/step4/SenderInformation';
import TransportationDates from '../components/step3/TransportationDates';
import Shipments from '../components/step2/Shipments';
import RecipientInformation from '../components/step5/RecipientInformation';
import RansomPayeeInformation from '../components/step6-7/RansomPayeeInformation';
import PayerInformation from '../components/step6-7/PayerInformation';
import { FormType, ShipmentProps } from '../utils/formTypes';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ProductPurchaseServiceInformation from '../components/step6-7/ProductPurchaseServiceInformation';
import {
  TransformedFormData,
  transformFormDataToEndpoint,
} from '../utils/transformFormDataToEndpoint';
import useCurrencyConverter from '../hooks/useCurrencyConverter';
import { fetchWrapper } from '../components/api/fetchWrapper';
import { useMutation } from '@tanstack/react-query';
import useLocaleStorageLanguage from '../hooks/useLocaleStorageLanguage';
import { useTranslation } from 'react-i18next';
import usePostcodeDetails from '../hooks/usePostcodeDetails';
import usePriceCatalog from '../hooks/usePriceCatalog';
import useFeeSettings from '../hooks/useFeeSettings';
import useDateOverrides from '../hooks/useDateOverrides';
import { useGoogleMapsScript } from 'use-google-maps-script';
import { GOOGLE_MAPS_SCRIPT_OPTIONS } from '../utils/googleMapsScript';
import Loader from '../components/Loader';
import LanguageSelect from '../components/form/select/LanguageSelect';
import Divider from '../components/layout/Divider';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    gtag: any;
  }
}

const Form = () => {
  const { t } = useTranslation();

  const nav = useNavigate();

  const methods = useForm<FormType>({
    defaultValues: {
      dates: {
        from: {
          day: null,
          month: null,
          year: null,
        },
        to: {
          day: null,
          month: null,
          year: null,
        },
      },
      invoiceRequired: false,
      packagingAndLabelingRules: false,
      transportRules: false,
      currency: '€',
      customerInformation: {
        paymentMethod: {
          label: t('cash'),
          value: 'cash',
        },
      },
    },
    shouldUnregister: true,
  });

  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {}
  );

  const [priceDescription, setPriceDescription] = useState<
    { title: string; price: string }[]
  >([]);

  const [submitErrorMessage, setShowSubmitError] = useState<string | null>(
    null
  );
  const currency = methods.watch('currency') ?? '€';
  const rate = useCurrencyConverter({ currency });

  const service = methods.watch('service');

  const direction = methods.watch('direction');

  const formErrors = methods.formState.errors;

  const selectedService = methods.watch('service');
  const pickupAddressZipCode = methods.watch('pickupAddressZipCode');
  const deliveryAddressZipCode = methods.watch('deliveryAddressZipCode');

  // @ts-ignore
  const formData = methods.watch();

  // @ts-ignore
  const orderPrice = methods.watch('estimatedShipmentPrice');

  const shipments = methods.watch('shipments');

  const sumOfPurchasePrice = (items: ShipmentProps[]) => {
    let price = 0;
    for (const element of items) {
      const priceOfTheItem = Number(element.shipmentPrice)
        ? Number(element.shipmentPrice)
        : 0;

      price += priceOfTheItem;
    }
    return price;
  };

  // const pricesOfItems = sumOfPurchasePrice(shipments ?? []);

  const triggerGoogleConversion = () => {
    window.gtag('event', 'conversion', {
      send_to: 'AW-792301087',
      value: 'Triggered send button',
    });
  };

  useEffect(() => {
    if (service !== 'shipmentWithAddressService') {
      methods.setValue('service', '');
    }
  }, [pickupAddressZipCode, deliveryAddressZipCode]);

  const postData = async (
    transformedData: TransformedFormData
  ): Promise<{
    message: string;
    orderId: string;
    url?: string;
  }> => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData),
    };

    const response = await fetchWrapper(
      'https://api.uzsakymas.ecotrip.lt/api/orders',
      {
        httpOptions: options,
      }
    );

    return response.json();
  };

  const createTaskMutation = useMutation({
    mutationKey: ['new-task'],
    mutationFn: (data: TransformedFormData) => {
      return postData(data);
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      nav(`/success?orderId=${data.orderId}`);
      setShowSubmitError(null);
      methods.reset();
    },
    onError: (error) => {
      console.log(error);
      setShowSubmitError(t('submitError'));
    },
  });

  const onSubmit = async (data: FormType) => {
    triggerGoogleConversion();
    const transformedData = transformFormDataToEndpoint(data);
    await createTaskMutation.mutateAsync(transformedData);
  };

  const isLoading = createTaskMutation.isPending ?? false;

  const showPurchaseInformation =
    selectedService === 'productPurchaseService' &&
    sumOfPurchasePrice(shipments) > 249;

  const selectedPickupAddressPostcode = methods.watch('pickupAddressZipCode');

  const selectedDeliveryAddressPostcode = methods.watch(
    'deliveryAddressZipCode'
  );

  useEffect(() => {
    if (direction && direction !== 'LT-LT') {
      methods.setValue('dates.from.day', null);
      methods.setValue('dates.from.month', null);
      methods.setValue('dates.from.year', null);

      const value = direction === 'LT-UK' ? '€' : '£';
      methods.setValue('currency', value);
    }
  }, [direction]);

  useLocaleStorageLanguage();

  // The form is shown once prices, fees, dates set in the CMS and the address
  // autocomplete are ready.
  const { isReady: isPriceCatalogReady } = usePriceCatalog();
  const { isReady: isFeeSettingsReady } = useFeeSettings();
  const { overrides: dateOverrides, isReady: isDateOverridesReady } =
    useDateOverrides();
  const { isLoaded: isGoogleMapsLoaded } = useGoogleMapsScript(
    GOOGLE_MAPS_SCRIPT_OPTIONS
  );
  const isFormReady =
    isPriceCatalogReady &&
    isFeeSettingsReady &&
    isDateOverridesReady &&
    isGoogleMapsLoaded;

  const {
    isParcelForce,
    postcodeDetails,
    isReady: isPostcodeReady,
  } = usePostcodeDetails(
    direction
      ? [selectedPickupAddressPostcode, selectedDeliveryAddressPostcode]
      : []
  );

  return (
    <form
      className="main"
      onSubmit={methods.handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <div
        style={{
          marginBottom: '70px',
        }}
      >
        <Breadcrumds />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: '20px',
          }}
        >
          <LanguageSelect methods={methods} />
        </div>
        <Divider />
        {!isFormReady && <Loader />}
        {/* Hidden, not unmounted, while loading: the page column takes its
            width from the form, so it does not jump when the form appears. */}
        <div
          className={isFormReady ? undefined : 'form-pending'}
          aria-hidden={!isFormReady}
        >
          <AddressForm
            isPostcodeReady={isPostcodeReady}
            selectedService={selectedService}
            methods={methods}
            direction={direction}
            currency={currency}
            formErrors={formErrors}
            rate={rate}
            isParcelForce={isParcelForce}
          />
        </div>
        {isFormReady && (
          <>
            <Divider />
            {!isPostcodeReady ? null : direction === 'LT-LT' ? (
              <div className="direction-message">
                <p>{t('wrongDirectionMessage1')}</p>
                <p>Info@ecotrip.lt</p>
              </div>
            ) : (
              <>
                {!!selectedService && (
                  <>
                    <Shipments
                      control={methods.control}
                      selectedService={selectedService}
                      methods={methods}
                      currency={currency}
                      formErrors={formErrors}
                      errorMessages={errorMessages}
                      setErrorMessages={setErrorMessages}
                      rate={rate}
                    />
                    <Divider />
                    <TransportationDates
                      methods={methods}
                      formErrors={formErrors}
                      direction={direction}
                      postcodeDetails={postcodeDetails}
                      dateOverrides={dateOverrides}
                    />
                    {showPurchaseInformation && (
                      <>
                        <Divider />
                        <ProductPurchaseServiceInformation
                          control={methods.control}
                          formErrors={formErrors}
                          selectedService={service}
                          methods={methods}
                        />
                      </>
                    )}
                    <Divider />
                    <SenderInformation
                      control={methods.control}
                      stepLabel={
                        selectedService === 'productSalesService' ||
                        selectedService === 'productPurchaseService'
                          ? t('pickupInfoMsg')
                          : selectedService === 'shipmentWithAddressService'
                            ? t('warehouseDetailsMsg')
                            : t('senderInfoMsg')
                      }
                      formErrors={formErrors}
                      setValue={methods.setValue}
                      selectedService={service}
                      methods={methods}
                      step={showPurchaseInformation ? 5 : 4}
                    />
                    <Divider />
                    <RecipientInformation
                      control={methods.control}
                      formErrors={formErrors}
                      methods={methods}
                      stepLabel={
                        selectedService === 'productSalesService'
                          ? t('recipientInfoMsg')
                          : t('deliveryInfoMsg')
                      }
                      step={showPurchaseInformation ? 6 : 5}
                    />
                    {selectedService === 'productSalesService' && (
                      <>
                        <Divider />
                        <RansomPayeeInformation
                          control={methods.control}
                          formErrors={formErrors}
                          selectedService={service}
                          methods={methods}
                        />
                      </>
                    )}
                    <Divider />
                    <PayerInformation
                      control={methods.control}
                      step={
                        selectedService === 'productSalesService'
                          ? 7
                          : showPurchaseInformation
                            ? 7
                            : 6
                      }
                      stepLabel={t('customerInfoMsg')}
                      formErrors={formErrors}
                      methods={methods}
                      currency={currency}
                      errorMessages={errorMessages}
                      submitErrorMessage={submitErrorMessage}
                      postcodeDetails={postcodeDetails}
                      setPriceDescription={setPriceDescription}
                      priceDescription={priceDescription}
                      rate={rate}
                      isLoading={isLoading}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </form>
  );
};

export default Form;
