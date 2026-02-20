type SubHeaderStepsProps = {
  tittle: string;
  description?: string;
};

const SubHeaderSteps = ({ tittle, description }: SubHeaderStepsProps) => {
  return (
    <div className="space-y-2 mb-6">
      <h3 className="text-lg border-b-2 font-semibold border-orange-500 w-fit">
        {tittle}
      </h3>
      <p className="text-muted-foreground text-sm">{description || ""}</p>
    </div>
  );
};

export default SubHeaderSteps;
