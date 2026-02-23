import { Button } from "@/components/ui/button";
import { List } from "lucide-react";

type CategorySummary = {
  id: string;
  name: string;
  productsCount: number;
};

type SelectedTableNameProps = {
  selectedCategoryId: string;
  categories: CategorySummary[];
};

const SelectedTableName = ({
  selectedCategoryId,
  categories,
}: SelectedTableNameProps) => {
  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId,
  );
  if (!selectedCategory) {
    return null;
  }

  return (
    <section className="flex items-center justify-center">
      <div className="flex items-center gap-12 pb-1 border-b-2 border-primary/50">
        <h3 className="text-xl font-bold">{selectedCategory.name}</h3>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <List size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SelectedTableName;
