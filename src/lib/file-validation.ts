import { toast } from "sonner";

export const validateImageFile = (file: File) => {
  const MAX_SIZE_MB = 15;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  if (!file.type.startsWith("image/")) {
    toast.error("Mano, isso aí não é uma imagem! Manda um JPG ou PNG.");
    return false;
  }

  if (file.size > MAX_SIZE_BYTES) {
    toast.error(
      `Arquivo muito grande! O limite é ${MAX_SIZE_MB}MB. Tenta tirar outra foto com menos resolução.`,
    );
    return false;
  }

  return true;
};
