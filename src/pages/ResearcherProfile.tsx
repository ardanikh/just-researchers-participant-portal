import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Star, User } from "lucide-react";
import { researchers } from "@/data/mockData";

export default function ResearcherProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const researcher = researchers.find((r) => r.id === id);

  if (!researcher) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Researcher not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex h-11 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <User className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">{researcher.name}</h1>
            {researcher.verified && (
              <ShieldCheck className="h-5 w-5 text-trust" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{researcher.organization}</p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Rating</p>
          <div className="mt-1 flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-pending text-pending" />
            <span className="text-lg font-bold text-foreground">{researcher.rating}</span>
          </div>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Studies</p>
          <p className="mt-1 text-lg font-bold text-foreground">{researcher.studyCount}</p>
        </div>
      </div>

      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Reviews</h2>
      <div className="space-y-3">
        {researcher.reviews.map((review, i) => (
          <div key={i} className="rounded-lg border border-border p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">{review.user}</p>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-pending text-pending" />
                <span className="text-xs font-medium text-foreground">{review.rating}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
