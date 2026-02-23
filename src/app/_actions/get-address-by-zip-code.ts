"use server";

export const getAddressByZipCode = async (zipCode: string) => {
  const cleanZip = zipCode.replace(/\D/g, "");

  const response = await fetch(`https://viacep.com.br/ws/${cleanZip}/json/`);

  if (!response.ok) return null;

  return await response.json();
};

// const handleZipCodeChange = async (zipCode: string) => {
//   const address = await getAddressByZipCode(zipCode);
//   if (address && !address.erro) {
//     // Preencha o formulário com o RHF
//     form.setValue("street", address.logradouro);
//     form.setValue("neighborhood", address.bairro);
//     // ...
//   }
// };
