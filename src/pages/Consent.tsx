import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Info, AlertTriangle } from "lucide-react";
import { studies } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Consent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const study = studies.find((s) => s.id === id);

  if (!study) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Study not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 lg:py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">Before you join</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Please review the following information about "{study.title}"
      </p>

      <section className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <Info className="h-4 w-4 text-trust" />
          <h2 className="text-sm font-semibold text-foreground">Data collected</h2>
        </div>
        <div className="rounded-xl border border-border">
          {study.dataCollected.map((item, i) => (
            <div key={i} className={`px-5 py-3 text-sm text-muted-foreground ${i < study.dataCollected.length - 1 ? "border-b border-border" : ""}`}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <Info className="h-4 w-4 text-trust" />
          <h2 className="text-sm font-semibold text-foreground">How your data will be used</h2>
        </div>
        <div className="rounded-xl border border-border">
          {study.dataUsage.map((item, i) => (
            <div key={i} className={`px-5 py-3 text-sm text-muted-foreground ${i < study.dataUsage.length - 1 ? "border-b border-border" : ""}`}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <h2 className="text-sm font-semibold text-foreground">Recording</h2>
        </div>
        <div className="rounded-xl border border-border px-5 py-3">
          <p className="text-sm text-muted-foreground">{study.recordingInfo}</p>
        </div>
      </section>

      <section className="mb-8 rounded-xl bg-muted/50 p-5">
        <p className="text-sm font-medium text-foreground mb-1">Your rights</p>
        <p className="text-sm text-muted-foreground">
          You can leave this study at any time, for any reason. Your data will be deleted upon request.
        </p>
      </section>

      <div className="mb-6 flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={agreed}
          onCheckedChange={(v) => setAgreed(v === true)}
          className="mt-0.5"
        />
        <Label htmlFor="consent" className="text-sm text-foreground leading-relaxed cursor-pointer">
          I have read and understand the information above, and I agree to participate in this study.
        </Label>
      </div>

      <Button
        disabled={!agreed}
        onClick={() => navigate("/dashboard")}
        className="h-12 w-full rounded-lg bg-trust text-base font-semibold text-trust-foreground hover:bg-trust/90"
      >
        Confirm & Join Study
      </Button>
    </div>
  );
}
