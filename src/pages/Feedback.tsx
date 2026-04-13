import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/StarRating";
import { toast } from "sonner";

const categories = ["Transparency", "Fairness", "Communication"];

export default function Feedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const handleSubmit = () => {
    if (Object.keys(ratings).length < categories.length) {
      toast.error("Please rate all categories.");
      return;
    }
    toast.success("Thanks for your feedback!");
    navigate("/dashboard");
  };

  return (
    <div className="px-4 pb-24 pt-4">
      <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="mb-1 text-xl font-bold text-foreground">Rate this study</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Your feedback helps other participants.
      </p>

      <div className="space-y-5">
        {categories.map((cat) => (
          <div key={cat}>
            <p className="mb-2 text-sm font-medium text-foreground">{cat}</p>
            <StarRating
              rating={ratings[cat] || 0}
              interactive
              size={28}
              onChange={(val) => setRatings((prev) => ({ ...prev, [cat]: val }))}
            />
          </div>
        ))}
      </div>

      <Button onClick={handleSubmit} className="mt-8 w-full" size="lg">
        Submit feedback
      </Button>
    </div>
  );
}
