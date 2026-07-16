"use client";

import { Button } from "../ui/button";

const ButtonSuccessOnboarding = ({ slug }: { slug: string }) => {
  const handleRedirect = () => {
    window.location.href = `https://admin-estabelecimentos-rangooo.vercel.app/${slug}`;
  };

  return (
    <Button
      onClick={handleRedirect}
      className="bg-orange-500 hover:bg-orange-600"
    >
      Ir para o meu Painel Administrativo
    </Button>
  );
};

export default ButtonSuccessOnboarding;
