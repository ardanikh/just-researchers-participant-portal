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
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex h-11 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="mb-2 text-2xl font-bold text-foreground">Before you join</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Please review the following information about "{study.title}"
      </p>

      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-4 w-4 text-trust" />
          <h2 className="text-sm font-semibold text-foreground">Data collected</h2>
        </div>
        <ul className="space-y-1.5 pl-6">
          {study.dataCollected.map((item, i) => (
            <li key={i} className="text-sm text-muted-foreground list-disc">{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-4 w-4 text-trust" />
          <h2 className="text-sm font-semibold text-foreground">How your data will be used</h2>
        </div>
        <ul className="space-y-1.5 pl-6">
          {study.dataUsage.map((item, i) => (
            <li key={i} className="text-sm text-muted-foreground list-disc">{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <h2 className="text-sm font-semibold text-foreground">Recording</h2>
        </div>
        <p className="text-sm text-muted-foreground pl-6">{study.recordingInfo}</p>
      </section>

      <section className="mb-8 rounded-lg border border-border p-4">
        <p className="text-sm text-foreground font-medium mb-1">Your rights</p>
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
        className="h-12 w-full text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Confirm & Join Study
      </Button>
    </div>
  );
}
