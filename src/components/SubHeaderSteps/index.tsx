import { Badge } from "../ui/badge";

type SubHeaderStepsProps = {
  tittle: string;
  description?: string;
  badges?: number;
  subTittle?: string;
};

const SubHeaderSteps = ({
  tittle,
  description,
  badges,
  subTittle,
}: SubHeaderStepsProps) => {
  return (
    <div className="space-y-2 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg border-b-2 font-semibold border-orange-500 w-fit">
          {tittle}{" "}
          {subTittle && (
            <strong className="text-primary font-semibold">
              {" "}
              - {subTittle}
            </strong>
          )}
        </h3>
        {badges && (
          <Badge variant="outline" className="border-primary/20 bg-primary/10">
            {badges}
          </Badge>
        )}
      </div>
      <p className="text-muted-foreground text-sm">{description || ""}</p>
    </div>
  );
};

export default SubHeaderSteps;
