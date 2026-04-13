import { useNavigate } from "react-router-dom";
import { Calendar, Clock, DollarSign } from "lucide-react";
import { userStudies } from "@/data/mockData";

export default function Dashboard() {
  const navigate = useNavigate();
  const upcoming = userStudies.filter((s) => s.status === "upcoming");
  const completed = userStudies.filter((s) => s.status === "completed");

  return (
    <div className="px-4 pb-20 pt-6">
      <h1 className="mb-5 text-xl font-bold text-foreground">Your studies</h1>

      {upcoming.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Upcoming</h2>
          <div className="space-y-3">
            {upcoming.map((study) => (
              <button
                key={study.id}
                onClick={() => navigate(`/study/${study.id}`)}
                className="w-full rounded-lg border border-border p-4 text-left"
              >
                <h3 className="mb-1 text-base font-semibold text-foreground">{study.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{study.scheduledDate}</span>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-success" />
                  <span className="font-bold text-success">${study.incentive}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Completed</h2>
          <div className="space-y-3">
            {completed.map((study) => (
              <div
                key={study.id}
                className="w-full rounded-lg border border-border p-4"
              >
                <div className="flex items-start justify-between">
                  <h3 className="mb-1 text-base font-semibold text-foreground">{study.title}</h3>
                  {study.paymentStatus === "paid" ? (
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                      Paid
                    </span>
                  ) : (
                    <span className="rounded-full bg-pending/10 px-2 py-0.5 text-xs font-medium text-pending-foreground">
                      Pending
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{study.completedDate}</span>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-success" />
                  <span className="font-bold text-success">${study.incentive}</span>
                </div>
                {study.paymentStatus === "paid" && (
                  <button
                    onClick={() => navigate(`/feedback/${study.id}`)}
                    className="mt-2 text-sm font-medium text-trust hover:underline"
                  >
                    Leave feedback
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
