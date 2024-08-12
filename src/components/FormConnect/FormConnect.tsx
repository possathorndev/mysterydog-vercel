import { useFormContext, UseFormReturn } from 'react-hook-form';

interface ConnectFormProps {
  children: (methods: UseFormReturn) => React.ReactNode;
}

const ConnectForm: React.FC<ConnectFormProps> = ({ children }) => {
  const methods = useFormContext();

  return children({ ...methods });
};

export default ConnectForm;
