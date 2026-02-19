type Step4ConfirmationProps = {
  restaurantId?: string;
  data: {
    name: string;
    email: string;
    restaurantName: string;
    phone: string;
    onboardingStep?: number;
  };
  onSuccess: () => void;
  onBack: () => void;
};

const Step4Confirmation = ({
  restaurantId,
  data,
  onSuccess,
  onBack,
}: Step4ConfirmationProps) => {
  return (
    <>
      <h1>Passo 4</h1>
    </>
  );
};

export default Step4Confirmation;
