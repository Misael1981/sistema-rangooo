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

O que está acontecendo por baixo dos panos:

Na Edição: O valor inicial vem do banco de dados como uma URL (string).

No Novo Upload: Quando o usuário clica no input e seleciona um arquivo, o valor muda para um objeto File.

Por isso o seu instanceof File é matador: ele separa o joio do trigo. Se for string, você não faz nada (já está no banco). Se for File, você comprime e sobe pro Cloudinary.

Ajuste Fino no seu onSubmit
Para o código não "quebrar" se o usuário não mexer na imagem, faça essa pequena conferência de tipos. Vou usar o exemplo do seu gallerySchema:

```
const onSubmit = async (data: z.infer<typeof gallerySchema>) => {
  setIsSubmitting(true);

  try {
    // 1. Tratando o Avatar
    let finalAvatarUrl = data.avatarImageUrl;
    if (data.avatarImageUrl instanceof File) {
      const isValid = validateImageFile(data.avatarImageUrl);
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }
      const res = await uploadToCloudinaryClient(data.avatarImageUrl);
      finalAvatarUrl = res.url;
    }

    // 2. Tratando a Capa
    let finalCoverUrl = data.coverImageUrl;
    if (data.coverImageUrl instanceof File) {
      const isValid = validateImageFile(data.coverImageUrl);
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }
      const res = await uploadToCloudinaryClient(data.coverImageUrl);
      finalCoverUrl = res.url;
    }

    // 3. Payload para o Banco
    const payload = {
      avatarImageUrl: finalAvatarUrl,
      coverImageUrl: finalCoverUrl,
      // ... outros campos
    };

    // await seuUpsert(payload)...

  } catch (error) {
    console.error(error);
    toast.error("Erro ao salvar galeria");
  } finally {
    setIsSubmitting(false);
  }
};
```

Dica de Ouro para o refine
No seu Zod, o .refine((val) => val, ...) está apenas checando se existe algo. Se você quiser ser mais rigoroso para evitar que o "arrombado" mande um PDF, você pode melhorar o refine assim:

```
.refine((val) => {
  if (val instanceof File) {
    return val.type.startsWith("image/");
  }
  return typeof val === "string"; // Se for string (URL), tá valendo
}, "Formato de arquivo inválido. Use apenas imagens.")
```
