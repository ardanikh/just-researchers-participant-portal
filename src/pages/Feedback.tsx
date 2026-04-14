import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { userStudies } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/StarRating";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { key: "transparency", label: "Transparency", desc: "Was the study clearly explained?" },
  { key: "fairness", label: "Fairness", desc: "Was the incentive fair for the effort?" },
  { key: "communication", label: "Communication", desc: "Was the researcher responsive and clear?" },
];

export default function Feedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const study = userStudies.find((s) => s.id === id);
  const [ratings, setRatings] = useState<Record<string, number>>({});

  if (!study) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Study not found.</p>
      </div>
    );
  }

  const handleSubmit = () => {
    toast({ title: "Thank you!", description: "Your feedback has been submitted." });
    navigate("/dashboard");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex h-11 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="mb-2 text-2xl font-bold text-foreground">Rate your experience</h1>
      <p className="mb-8 text-sm text-muted-foreground">"{study.title}"</p>

      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.key} className="rounded-lg border border-border p-5">
            <p className="text-sm font-medium text-foreground mb-1">{cat.label}</p>
            <p className="text-xs text-muted-foreground mb-3">{cat.desc}</p>
            <StarRating
              rating={ratings[cat.key] || 0}
              interactive
              onChange={(v) => setRatings((prev) => ({ ...prev, [cat.key]: v }))}
            />
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={Object.keys(ratings).length < categories.length}
        className="mt-8 h-12 w-full text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Submit Feedback
      </Button>
    </div>
  );
}
