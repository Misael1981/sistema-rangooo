import { MenuCategoryDTO } from "@/dtos/restaurant-full-data.dto";

type CardCategoriesProps = {
  data: MenuCategoryDTO | null;
};

const CardCategories = ({ data }: CardCategoriesProps) => {
  const additionalProducts = data?.additionalProducts;

  return (
    <div className="min-h-48 space-y-4 p-2 min-w-80 border border-primary/40 rounded-lg shadow-md shadow-orange-200">
      <h4 className="text-center mb-2 text-base font-semibold">{data?.name}</h4>
      <div>
        {additionalProducts && additionalProducts.length > 0 && (
          <>
            <h6 className="text-sm mb-0">Produtos Adicionais</h6>

            {additionalProducts.map((product, index) => (
              <span key={product.id} className="text-xs text-muted-foreground">
                {product.name}
                {index < additionalProducts.length - 1 && " - "}
              </span>
            ))}
          </>
        )}
      </div>
      <div>
        {data?.products && data?.products.length > 0 && (
          <>
            <h6 className="text-sm mb-1">Produtos</h6>
            <ul className="list-disc space-y-1 pl-4">
              {data?.products.map((product) => (
                <li key={product.id} className="text-xs text-muted-foreground">
                  {product.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default CardCategories;
