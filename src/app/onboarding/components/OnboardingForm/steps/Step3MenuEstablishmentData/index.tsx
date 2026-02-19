type Step3MenuEstablishmentDataProps = {
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

const Step3MenuEstablishmentData = ({
  restaurantId,
  data,
  onSuccess,
  onBack,
}: Step3MenuEstablishmentDataProps) => {
  return (
    <>
      <h1>Passo 3</h1>
    </>
  );
};

export default Step3MenuEstablishmentData;
