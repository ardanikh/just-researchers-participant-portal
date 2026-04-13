import { useNavigate } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { userStudies } from "@/data/mockData";

export default function Dashboard() {
  const navigate = useNavigate();
  const upcoming = userStudies.filter((s) => s.status === "upcoming");
  const completed = userStudies.filter((s) => s.status === "completed");

  return (
    <div className="px-4 pb-24 pt-6">
      <h1 className="mb-6 text-xl font-bold text-foreground">Your studies</h1>

      {upcoming.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Upcoming
          </h2>
          <div className="space-y-3">
            {upcoming.map((study) => (
              <button
                key={study.id}
                onClick={() => navigate(`/study/${study.id}`)}
                className="w-full rounded-lg border border-border p-4 text-left active:bg-muted"
              >
                <h3 className="mb-2 text-[15px] font-semibold text-foreground">{study.title}</h3>
                <div className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{study.scheduledDate}</span>
                </div>
                <p className="text-lg font-bold text-success">${study.incentive}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h2 className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Completed
          </h2>
          <div className="space-y-3">
            {completed.map((study) => (
              <div
                key={study.id}
                className="rounded-lg border border-border p-4"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-foreground">{study.title}</h3>
                  {study.paymentStatus === "paid" ? (
                    <span className="shrink-0 rounded-full border border-success/20 bg-background px-2.5 py-0.5 text-xs font-medium text-success">
                      Paid
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full border border-pending/20 bg-background px-2.5 py-0.5 text-xs font-medium text-foreground">
                      Pending
                    </span>
                  )}
                </div>
                <div className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{study.completedDate}</span>
                </div>
                <p className="text-lg font-bold text-success">${study.incentive}</p>
                {study.paymentStatus === "paid" && (
                  <button
                    onClick={() => navigate(`/feedback/${study.id}`)}
                    className="mt-3 flex h-9 items-center text-sm font-medium text-trust"
                  >
                    Leave feedback →
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
