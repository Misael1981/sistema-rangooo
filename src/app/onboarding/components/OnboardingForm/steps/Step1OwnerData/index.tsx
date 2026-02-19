type Step1OwnerDataProps = {
  restaurantId?: string;
  data: {
    name: string;
    email: string;
    restaurantName: string;
    phone: string;
    onboardingStep?: number;
  };
  onSuccess: () => void;
};

const Step1OwnerData = ({
  restaurantId,
  data,
  onSuccess,
}: Step1OwnerDataProps) => {
  return (
    <>
      <h1>Passo 1</h1>
    </>
  );
};

export default Step1OwnerData;
