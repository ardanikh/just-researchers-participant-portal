import { studies } from "@/data/mockData";
import StudyCard from "@/components/StudyCard";

export default function Index() {
  return (
    <div className="px-4 pb-24 pt-6">
      <h1 className="mb-1 text-xl font-bold text-foreground">Find studies</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Browse trusted research opportunities
      </p>

      <div className="space-y-3">
        {studies.map((study) => (
          <StudyCard key={study.id} study={study} />
        ))}
      </div>
    </div>
  );
}
