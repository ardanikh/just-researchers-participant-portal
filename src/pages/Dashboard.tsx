import { useNavigate } from "react-router-dom";
import { userStudies } from "@/data/mockData";

export default function Dashboard() {
  const navigate = useNavigate();
  const upcoming = userStudies.filter((s) => s.status === "upcoming");
  const completed = userStudies.filter((s) => s.status === "completed");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <h1 className="mb-1 text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mb-8 text-sm text-muted-foreground">Track your research participation</p>

      <section className="mb-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">No upcoming studies.</p>
        ) : (
          <div className="space-y-3">
            {upcoming.map((study) => (
              <div
                key={study.id}
                onClick={() => navigate(`/study/${study.id}`)}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{study.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{study.scheduledDate}</p>
                </div>
                <span className="text-sm font-bold text-success">${study.incentive}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Completed</h2>
        {completed.length === 0 ? (
          <p className="text-sm text-muted-foreground">No completed studies yet.</p>
        ) : (
          <div className="space-y-3">
            {completed.map((study) => (
              <div
                key={study.id}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted"
                onClick={() => navigate(`/feedback/${study.id}`)}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{study.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{study.completedDate}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    study.paymentStatus === "paid"
                      ? "bg-success/10 text-success"
                      : "bg-pending/10 text-foreground"
                  }`}
                >
                  {study.paymentStatus === "paid" ? "Paid" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
