import { useEffect, useState } from 'react';
import FieldContainer from '../FieldContainer';
import CustomInput from '../CustomInput';
import {
  automotiveGoodsCategoryProductTypesOptions,
  bicyclesAndScootersCategoryProductTypesOptions,
  categoriesOptions,
  gardenEquipmentCategoryProductTypesOptions,
  getProductsOptionsWithRangeSizeFilteredByProductType,
  getSizeOptionsBySelectedProductType,
  getSpecificationOptionsBySelectedProduct,
  goodsForChildrenCategoryProductTypesOptions,
  householdAppliancesCategoryProductTypesOptions,
  motorcyclesAndAccessoriesCategoryProductTypesOptions,
} from '../../utils/products';
import ControlledStyledSelect from '../ControlledStyledSelect';
import {
  Control,
  FieldArrayWithId,
  UseFormReturn,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { FormType } from '../../utils/formTypes';
import { OptionType } from '../../utils/types';
import PrimaryButton from '../PrimaryButton';
import UncontrolledInput from '../UncontrolledInput';
import useCalculatePrice from './useCalculatePrice';

type Props = {
  shipmentNumber: number;
  control: Control<FormType>;
  field: FieldArrayWithId<FormType, 'shipments', 'id'>;
  index: number;
  removeShipment: (index: number) => void;
  selectedService: string;
  setValue: UseFormSetValue<FormType>;
  methods: UseFormReturn<FormType, any, undefined>;
};

const SingleShimpentForm = ({
  shipmentNumber,
  control,
  field,
  index,
  removeShipment,
  selectedService,
  setValue,
  methods,
}: Props) => {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');

  const [orderedShipmentNumber, setOrderedShipmentNumber] =
    useState<string>('');
  const [shipmentPrice, setShipmentPrice] = useState<string>('');
  const [purchasePriceOfTheItem, setPurchasePriceOfTheItem] =
    useState<string>('');

  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {}
  );

  const handleValidation = (field: string, value: string) => {
    const getErrorMessage = (field: string, value: string) => {
      switch (field) {
        case 'length':
          if (Number(value) > 420)
            return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne ilgesni kaip 420 cm kroviniai.';
          break;
        case 'width':
          if (Number(value) > 20)
            return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne platesni kaip 20 cm kroviniai.';
          break;
        case 'height':
          if (Number(value) > 120)
            return 'Apgailestaujame, tačiau į mūsų automobilius telpa ne aukstesni kaip 120 cm kroviniai.';
          break;
        case 'orderedShipmentNumber':
          if (!value)
            return 'Naudojatės EcoTrip adreso paslauga, nurodykite savo užsakytos siuntos numerį, kuri siunčiama per EcoTrip UK būstinę.';
          break;
        case 'shipmentPrice':
          if (!value)
            return 'Prekės kainai viršijus £300 GBP, reikalingas pinigų perdavimas EcoTrip kurjeriui iki prekės nupirkimo. Atvykstame nurodytu pinigus perduodačio asmens adresu.';
          break;
        case 'purchasePriceOfTheItem':
          if (!value)
            return 'Suveskite parduodamos prekės kainą, kurią EcoTrip kurjeriui perduos siuntos gavėjas.';
          break;
        default:
          return '';
      }
      return '';
    };

    setErrorMessages((prevErrors) => {
      const newErrors = { ...prevErrors };
      const errorMessage = getErrorMessage(field, value);

      if (errorMessage) {
        newErrors[field] = errorMessage;
      } else {
        delete newErrors[field];
      }

      return newErrors;
    });
  };

  const handleVolumneInputChange = (field: string, value: string) => {
    const regex = /^-?\d*\.?\d*$/;

    if (value && !regex.test(value)) {
      return;
    }

    handleValidation(field, value);

    if (field === 'length') {
      if (!value) {
        setLength('');
        return;
      }
      setLength(value);
    }
    if (field === 'width') {
      if (!value) {
        setWidth('');
        return;
      }
      setWidth(value);
    }
    if (field === 'height') {
      if (!value) {
        setHeight('');
        return;
      }
      setHeight(value);
    }
  };

  const handleShipmentNumberChange = (value: string) => {
    handleValidation('orderedShipmentNumber', value);

    setOrderedShipmentNumber(value);
  };

  const handleShipmentPriceChange = (value: string) => {
    handleValidation('shipmentPrice', value);

    setShipmentPrice(value);
  };

  const handlePurchasePriceChange = (value: string) => {
    handleValidation('purchasePriceOfTheItem', value);

    setPurchasePriceOfTheItem(value);
  };

  const selectedCategory = useWatch({
    control,
    name: `shipments.${index}.category`,
  });

  const selectedProductType = useWatch({
    control,
    name: `shipments.${index}.productType`,
  });

  const sizeOptions =
    getSizeOptionsBySelectedProductType(
      selectedCategory?.value,
      selectedProductType?.value
    ) ?? [];

  const specificationOptions = getSpecificationOptionsBySelectedProduct(
    selectedCategory?.value,
    selectedProductType?.value
  );

  const selectedSize = useWatch({
    control,
    name: `shipments.${index}.size`,
  });

  const amount = useWatch({
    control,
    name: `shipments.${index}.amount`,
  });

  useCalculatePrice({
    category: selectedCategory as OptionType,
    productType: selectedProductType as OptionType,
    // @ts-ignore
    size: selectedSize ?? null,
    amount,
    setValue,
    name: `shipments.${index}.estimatedPrice`,
  });

  const estimatedPrice =
    useWatch({
      control,
      name: `shipments.${index}.estimatedPrice`,
    }) ?? '0.00';

  console.log('estimatedPrice ===> ', estimatedPrice);

  const categoriesWithProductType = [
    'automotiveGoods',
    'householdAppliances',
    'bicyclesAndScooters',
    'motorcyclesAndAccessories',
    'goodsForChildren',
    'gardenEquipment',
  ];

  const getOptionsBySelectedCategory = (
    selectedCategory: OptionType | null
  ): OptionType[] => {
    if (
      !!selectedCategory &&
      categoriesWithProductType.includes(selectedCategory.value)
    ) {
      switch (selectedCategory.value) {
        case 'automotiveGoods':
          return automotiveGoodsCategoryProductTypesOptions;
        case 'householdAppliances':
          return householdAppliancesCategoryProductTypesOptions;
        case 'bicyclesAndScooters':
          return bicyclesAndScootersCategoryProductTypesOptions;
        case 'motorcyclesAndAccessories':
          return motorcyclesAndAccessoriesCategoryProductTypesOptions;
        case 'goodsForChildren':
          return goodsForChildrenCategoryProductTypesOptions;
        case 'gardenEquipment':
          return gardenEquipmentCategoryProductTypesOptions;
        default:
          return [];
      }
    } else {
      return [];
    }
  };

  const productTypeOptions = getOptionsBySelectedCategory(selectedCategory);

  const productTypesWithRequiredManagerCall = ['interior', 'carQuarter'];

  const volumeErrorMessages = [
    errorMessages.length,
    errorMessages.width,
    errorMessages.height,
  ];
  const orderedShipmentNumberErrorMessage = errorMessages.orderedShipmentNumber;
  const shipmentPriceErrorMessage = errorMessages.shipmentPrice;

  const purchasePriceOfTheItemErrorMessage =
    errorMessages.purchasePriceOfTheItem;

  return (
    <div className='single-shipment-container'>
      <div className='left-column'>
        <FieldContainer
          label={`Pasirinkite Nr. ${shipmentNumber} siuntos kategoriją`}
          description='Įveskite siuntos tipą. Pasirinkus siuntą pagal katalogą, automatiškai paskaičiuosime siuntimo kainą.'
          className='left-column-item'
        >
          <ControlledStyledSelect
            name={`shipments.${index}.category`}
            control={control}
            options={[...categoriesOptions]}
            defaultValue={{
              label: 'Siuntos kategorija',
              value: 'Siuntos kategorija',
            }}
            placeholder='Siuntos kategoriją'
            isDisabled={selectedService === 'parcelForceShipment'}
          />
        </FieldContainer>
        <p className='estimated-price'>
          Numatoma Nr. {shipmentNumber} siuntos kaina:{' '}
          <span>€{estimatedPrice}</span>{' '}
        </p>
      </div>
      <div className='right-column'>
        {selectedCategory?.value === 'shipments' ||
        selectedCategory?.value === 'removals' ? (
          <>
            {selectedCategory?.value !== 'removals' && (
              <FieldContainer
                label={`Nr. ${shipmentNumber} siuntos svoris (kg)`}
                description={
                  (field.size as unknown as number) > 100
                    ? 'Jūsų siuta/-os sunkesnė/-ės nei 35 kg. Kadangi mūsų kurjeriai dirba po vieną, jam gali prireikti pagalbos pakraunant ar iškraunant sunkias siuntas. Prašome užtikrinti, kad atvykus kurjeriui būtų kas padeda ją pakrauti ar iškrauti. Įveskite siuntos svorį apytiksliai. Kai atiduosite siuntą, ji bus pasverta dar kartą patikslinimui. '
                    : 'Įveskite siuntos svorį apytiksliai. Kai atiduosite siuntą, ji bus pasverta dar kartą patikslinimui. '
                }
              >
                <CustomInput
                  name={`shipments.${index}.size`}
                  control={control}
                  placeholder='Siuntos svoris'
                />
              </FieldContainer>
            )}
            <FieldContainer
              label={`Nr. ${shipmentNumber} siuntos išmatavimai ${
                selectedCategory?.value === 'removals'
                  ? 'metrais'
                  : 'centimetrais'
              }`}
              description={''}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div className='volume-fields-container'>
                  <UncontrolledInput
                    name={`length`}
                    placeholder='Ilgis'
                    onChange={(e) => {
                      handleVolumneInputChange('length', e.target.value);
                    }}
                    value={length}
                    isError={!!errorMessages.length}
                  />
                  <UncontrolledInput
                    name={`width`}
                    placeholder='Plotis'
                    onChange={(e) => {
                      handleVolumneInputChange('width', e.target.value);
                    }}
                    value={width}
                    isError={!!errorMessages.width}
                  />
                  <UncontrolledInput
                    name={`height`}
                    placeholder='Aukštis'
                    onChange={(e) => {
                      handleVolumneInputChange('height', e.target.value);
                    }}
                    value={height}
                    isError={!!errorMessages.height}
                  />
                </div>
                <div className='errors'>
                  {volumeErrorMessages.length !== 0 &&
                    volumeErrorMessages
                      .filter((mes) => mes !== undefined)
                      .map((err, index) => {
                        return (
                          <div className='error' key={index}>
                            <span>Šių parametrų siuntos neaptarnaujame. </span>{' '}
                            {err}
                          </div>
                        );
                      })}
                </div>
              </div>
            </FieldContainer>
            {selectedService === 'shipmentWithAddressService' && (
              <FieldContainer
                label='Užsakytos siuntos numeris (Amazon UK, eBay ir kt.) *'
                description=''
              >
                <>
                  <UncontrolledInput
                    name={`orderedShipmentNumber`}
                    isError={!!errorMessages.orderedShipmentNumber}
                    onChange={(e) => {
                      handleShipmentNumberChange(e.target.value);
                    }}
                    value={orderedShipmentNumber}
                  />
                  {orderedShipmentNumberErrorMessage && (
                    <div className='errors'>
                      <div className='error'>
                        <span>Neįvestas siuntos numeris. </span>{' '}
                        {orderedShipmentNumberErrorMessage}
                      </div>
                    </div>
                  )}
                </>
              </FieldContainer>
            )}
            {selectedService === 'productPurchaseService' && (
              <FieldContainer label='Prekės nupirkimo suma' description=''>
                <>
                  <UncontrolledInput
                    name={`shipmentPrice`}
                    isError={!!shipmentPriceErrorMessage}
                    onChange={(e) => {
                      handleShipmentPriceChange(e.target.value);
                    }}
                    value={shipmentPrice}
                  />
                  {shipmentPriceErrorMessage && (
                    <div className='errors'>
                      <div className='error'>
                        <span>Neįvesta prekės suma. </span>{' '}
                        {shipmentPriceErrorMessage}
                      </div>
                    </div>
                  )}
                </>
              </FieldContainer>
            )}
            {selectedService === 'productSalesService' && (
              <FieldContainer
                label='Siuntos/prekės išpirkos kaina'
                description=''
              >
                <>
                  <UncontrolledInput
                    name={`purchasePriceOfTheItem`}
                    isError={!!purchasePriceOfTheItemErrorMessage}
                    onChange={(e) => {
                      handlePurchasePriceChange(e.target.value);
                    }}
                    value={purchasePriceOfTheItem}
                  />
                  {purchasePriceOfTheItemErrorMessage && (
                    <div className='errors'>
                      <div className='error'>
                        <span>Neįvesta siuntos/prekės kaina. </span>{' '}
                        {purchasePriceOfTheItemErrorMessage}
                      </div>
                    </div>
                  )}
                </>
              </FieldContainer>
            )}
          </>
        ) : (
          <>
            <FieldContainer
              label={`Nr. ${shipmentNumber} siuntos tipas`}
              description={`${
                productTypesWithRequiredManagerCall.includes(
                  selectedProductType?.value ?? ''
                )
                  ? 'Susisiekite su vadybininku'
                  : ''
              }`}
            >
              <ControlledStyledSelect
                name={`shipments.${index}.productType`}
                control={control}
                options={productTypeOptions}
                placeholder='Siuntos tipas'
                // onChange={() => {
                //   setValue(`shipments.${index}.size`, null);
                //   setValue(`shipments.${index}.specification`, null);
                // }}
              />
            </FieldContainer>
            {!productTypesWithRequiredManagerCall.includes(
              selectedProductType?.value ?? ''
            ) ? (
              <>
                {selectedProductType?.value && sizeOptions.length > 0 ? (
                  <FieldContainer
                    label={`Nr. ${shipmentNumber} siuntos dydis`}
                    description=''
                  >
                    <ControlledStyledSelect
                      name={`shipments.${index}.size`}
                      control={control}
                      options={sizeOptions}
                      placeholder='Siuntos dydis'
                    />
                  </FieldContainer>
                ) : null}
                {!!selectedProductType?.value &&
                specificationOptions.length > 0 ? (
                  <FieldContainer
                    label={`Nr. ${shipmentNumber} siuntos specifikacija`}
                    description=''
                  >
                    <ControlledStyledSelect
                      name={`shipments.${index}.specification`}
                      control={control}
                      options={specificationOptions}
                      placeholder='Siuntos specifikacija'
                    />
                  </FieldContainer>
                ) : null}
                {!!selectedProductType?.value ? (
                  <FieldContainer
                    label={`Nr. ${shipmentNumber} siuntos kiekis`}
                    description=''
                  >
                    <CustomInput
                      name={`shipments.${index}.amount`}
                      control={control}
                      placeholder='Siuntos kiekis'
                      defaultValue={1}
                    />
                  </FieldContainer>
                ) : null}
              </>
            ) : null}
          </>
        )}

        <PrimaryButton type='button' onClick={() => removeShipment(index)}>
          Pašalinti siuntą {shipmentNumber}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SingleShimpentForm;
