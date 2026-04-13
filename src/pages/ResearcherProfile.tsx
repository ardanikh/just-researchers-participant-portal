import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, User } from "lucide-react";
import { researchers } from "@/data/mockData";
import StarRating from "@/components/StarRating";

export default function ResearcherProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const researcher = researchers.find((r) => r.id === id);

  if (!researcher) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Researcher not found.</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-24 pt-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex h-11 items-center gap-1 text-sm text-muted-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <User className="h-7 w-7 text-muted-foreground" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-foreground">{researcher.name}</h1>
            {researcher.verified && (
              <ShieldCheck className="h-4 w-4 text-trust" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{researcher.organization}</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{researcher.rating}</p>
          <div className="mt-1 flex justify-center">
            <StarRating rating={researcher.rating} size={14} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Rating</p>
        </div>
        <div className="rounded-lg border border-border p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{researcher.studyCount}</p>
          <p className="mt-2 text-xs text-muted-foreground">Studies</p>
        </div>
      </div>

      <h2 className="mb-3 text-sm font-semibold text-foreground">Reviews</h2>
      <div className="space-y-3">
        {researcher.reviews.map((review, i) => (
          <div key={i} className="rounded-lg border border-border p-4">
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">{review.user}</p>
              <StarRating rating={review.rating} size={13} />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
