import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader className="items-center text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-trust/10">
            <ShieldCheck className="h-6 w-6 text-trust" />
          </div>
          <DialogTitle className="text-lg font-bold text-foreground">
            Please log in to join this study
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Create an account to participate and receive incentives.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-3">
          <Button
            onClick={() => {
              onOpenChange(false);
              navigate("/login");
            }}
            className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Login
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              navigate("/signup");
            }}
            className="h-11 w-full"
          >
            Sign up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
