import { Control } from 'react-hook-form';
import Step from '../Step';
import ClientInformationForm from './ClientInformationForm';
import { FormType } from '../../utils/formTypes';

type SenderInformationProps = {
  control: Control<FormType, any>;
  stepLabel: string;
};

const SenderInformation = ({ control, stepLabel }: SenderInformationProps) => {
  return (
    <Step title={stepLabel} step={4}>
      <ClientInformationForm
        client='sender'
        control={control}
        subName='senderInformation'
      />
    </Step>
  );
};

export default SenderInformation;
