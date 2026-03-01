```
const onSubmit = async (data: z.infer<typeof productSchema>) => {
  let imageUrl = product?.imageUrl || ""; // Começa com a imagem que já existia (se for edição)
  let imagePublicId = product?.imagePublicId || ""; // Ideal ter isso no seu schema/banco

  // 1. Pega o arquivo do input (ajuste o nome conforme seu schema do Zod, ex: data.imageFile)
  const imageFile = data.imageFile;

  // 2. Só valida e sobe se houver um arquivo novo selecionado
  if (imageFile instanceof File) {
    const isValid = validateImageFile(imageFile);
    if (!isValid) return; // O "Leão de Chácara" barrou

    setIsSubmitting(true);

    try {
      // 3. Faz a compressão e o upload
      const uploadResult = await uploadToCloudinaryClient(imageFile);
      imageUrl = uploadResult.url;
      imagePublicId = uploadResult.publicId; // Salve isso para poder deletar depois!
    } catch (err) {
      toast.error("Falha ao subir a imagem.");
      console.error(err);
      setIsSubmitting(false);
      return;
    }
  } else {
    // Se não mudou a imagem, mas clicou em salvar, garante que o loader apareça
    setIsSubmitting(true);
  }

  // 4. Envia para o Banco
  try {
    const payload = {
      id: product?.id,
      name: data.name,
      price: parseCurrencyBRL(data.price),
      description: data.description,
      imageUrl, // URL nova ou a antiga
      imagePublicId, // ID novo ou o antigo
      ingredients: data.ingredients
        ? data.ingredients.split(",").map((i) => i.trim()).filter(Boolean)
        : [],
      menuCategoryId: selectedCategoryId,
    };

    const result = await upsertProduct(payload, token, restaurantId);

    if (result.success) {
      toast.success(product ? "Produto atualizado!" : "Produto criado!");
      setDialogAddProductOpen(false);
      form.reset();
    } else {
      toast.error(result.error);
    }
  } catch (error) {
    toast.error("Ops, algo deu errado!");
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
};
```
