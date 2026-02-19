type Step2EstablishmentDataProps = {
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

const Step2EstablishmentData = ({
  restaurantId,
  data,
  onSuccess,
  onBack,
}: Step2EstablishmentDataProps) => {
  return (
    <>
      <h1>Passo 2</h1>
    </>
  );
};

export default Step2EstablishmentData;
