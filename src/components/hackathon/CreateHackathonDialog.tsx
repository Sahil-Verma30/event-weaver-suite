import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HackathonTypeSelection } from "./steps/HackathonTypeSelection";
import { HackathonModeSelection } from "./steps/HackathonModeSelection";
import { HackathonBasicInfo } from "./steps/HackathonBasicInfo";
import { HackathonDetailsForm } from "./steps/HackathonDetailsForm";

interface CreateHackathonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type HackathonType = "students" | "communities" | null;
export type HackathonMode = "offline" | "online" | "online-review" | null;

export function CreateHackathonDialog({
  open,
  onOpenChange,
}: CreateHackathonDialogProps) {
  const [step, setStep] = useState(1);
  const [hackathonType, setHackathonType] = useState<HackathonType>(null);
  const [hackathonMode, setHackathonMode] = useState<HackathonMode>(null);
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    university: "",
    hasFee: "no",
  });

  const handleTypeSelect = (type: HackathonType) => {
    setHackathonType(type);
    setStep(2);
  };

  const handleModeSelect = (mode: HackathonMode) => {
    setHackathonMode(mode);
    setStep(3);
  };

  const handleBasicInfoSubmit = (info: typeof basicInfo) => {
    setBasicInfo(info);
    setStep(4);
  };

  const handleClose = () => {
    setStep(1);
    setHackathonType(null);
    setHackathonMode(null);
    setBasicInfo({ name: "", university: "", hasFee: "no" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Great decision!</DialogTitle>
              <p className="text-3xl font-bold mt-2">
                Choose the type of hackathon to proceed
              </p>
            </DialogHeader>
            <HackathonTypeSelection onSelect={handleTypeSelect} />
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">
                Select hackathon mode
              </DialogTitle>
              <p className="text-muted-foreground">
                You'll not be able to change the hackathon mode later.
              </p>
            </DialogHeader>
            <HackathonModeSelection onSelect={handleModeSelect} />
          </>
        )}

        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">
                Let's get you started
              </DialogTitle>
            </DialogHeader>
            <HackathonBasicInfo onSubmit={handleBasicInfoSubmit} />
          </>
        )}

        {step === 4 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Hackathon Details
              </DialogTitle>
              <p className="text-muted-foreground">
                Fill in all the details about your hackathon
              </p>
            </DialogHeader>
            <HackathonDetailsForm
              initialData={basicInfo}
              onComplete={handleClose}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
