import AddressForm from '../components/step1/AddressForm';
import Breadcrumds from '../components/Breadcrumds';
import Divider from '../components/Divider';
import SenderInformation from '../components/step4/SenderInformation';
import TransportationDates from '../components/step3/TransportationDates';
import Shipments from '../components/step2/Shipments';
import RecipientInformation from '../components/step5/RecipientInformation';
import RansomPayeeInformation from '../components/step6-7/RansomPayeeInformation';
import PayerInformation from '../components/step6-7/PayerInformation';
import { FormType } from '../utils/formTypes';
import { useForm } from 'react-hook-form';

const Form = () => {
  const methods = useForm<FormType>({
    // shouldUnregister: true,
    defaultValues: {
      service: 'standartShipment',
    },
  });

  const selectedService = methods.watch('service');

  const formData = methods.watch();

  return (
    <form className='main'>
      <div
        style={{
          marginBottom: '70px',
        }}
      >
        <Breadcrumds />
        <Divider />
        <AddressForm
          setValue={methods.setValue}
          control={methods.control}
          selectedService={selectedService}
          formData={formData}
        />
        <Divider />
        <Shipments
          control={methods.control}
          formData={formData}
          selectedService={selectedService}
        />
        <Divider />
        <TransportationDates methods={methods} />
        <Divider />
        <SenderInformation
          control={methods.control}
          stepLabel={
            selectedService === 'productSalesService'
              ? 'Siuntos paėmimo / pardavėjo informacija'
              : 'Siuntos paėmimo / siuntėjo informacija'
          }
        />
        <Divider />
        <RecipientInformation control={methods.control} />
        {selectedService === 'productSalesService' && (
          <>
            <Divider />
            <RansomPayeeInformation control={methods.control} />
          </>
        )}

        <Divider />
        <PayerInformation
          control={methods.control}
          step={selectedService === 'productSalesService' ? 7 : 6}
          stepLabel={'Užsakovo informacija'}
        />
      </div>
    </form>
  );
};

export default Form;
