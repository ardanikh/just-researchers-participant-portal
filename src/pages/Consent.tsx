import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Info, AlertTriangle, ShieldCheck } from "lucide-react";
import { studies } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Consent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isGuest } = useAuth();
  const [agreed, setAgreed] = useState(false);
  const study = studies.find((s) => s.id === id);

  if (!study) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Study not found.</p>
      </div>
    );
  }

  const handleJoin = () => {
    if (isGuest) {
      toast.error("Please create an account to join a study.");
      return;
    }
    toast.success("You've joined this study!");
    navigate("/dashboard");
  };

  return (
    <div className="px-4 pb-28 pt-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex h-11 items-center gap-1 text-sm text-muted-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="mb-1 text-xl font-bold text-foreground">Before you join</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Please review what data will be collected and how it will be used.
      </p>

      {/* Data collected */}
      <section className="mb-5">
        <h2 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-trust">
          <Info className="h-4 w-4" /> Data collected
        </h2>
        <ul className="space-y-2 pl-0.5">
          {study.dataCollected.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-trust" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Data usage */}
      <section className="mb-5">
        <h2 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-trust">
          <Info className="h-4 w-4" /> How your data will be used
        </h2>
        <ul className="space-y-2 pl-0.5">
          {study.dataUsage.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-trust" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Recording */}
      <section className="mb-5">
        <h2 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-destructive">
          <AlertTriangle className="h-4 w-4" /> Recording
        </h2>
        <p className="text-sm text-muted-foreground pl-0.5">{study.recordingInfo}</p>
      </section>

      {/* Withdrawal rights */}
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-border p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-trust" />
        <div>
          <p className="text-sm font-medium text-foreground mb-0.5">Your rights</p>
          <p className="text-sm text-muted-foreground">
            You can leave anytime. Your data will be deleted if you withdraw.
          </p>
        </div>
      </div>

      {/* Agreement */}
      <div className="mb-6 flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={agreed}
          onCheckedChange={(checked) => setAgreed(checked === true)}
          className="mt-0.5"
        />
        <label htmlFor="consent" className="text-sm text-foreground leading-snug cursor-pointer">
          I understand what data will be collected and how it will be used. I agree to participate.
        </label>
      </div>

      <Button
        onClick={handleJoin}
        className="h-12 w-full text-sm font-semibold"
        disabled={!agreed}
      >
        Confirm & Join Study
      </Button>
    </div>
  );
}
