import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Globe, FileCheck } from "lucide-react";
import { HackathonMode } from "../CreateHackathonDialog";

interface HackathonModeSelectionProps {
  onSelect: (mode: HackathonMode) => void;
}

export function HackathonModeSelection({ onSelect }: HackathonModeSelectionProps) {
  return (
    <div className="space-y-4 mt-6">
      <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect("offline")}>
        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Offline</h3>
            <p className="text-muted-foreground">
              For regular on-site hackathons
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect("online")}>
        <div className="flex items-start gap-4">
          <Globe className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Online</h3>
            <p className="text-muted-foreground">
              For Beginner-friendly hackathons where anyone can apply and make
              their submission during the hackathon duration directly
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect("online-review")}>
        <div className="flex items-start gap-4">
          <FileCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Online + Application review</h3>
            <p className="text-muted-foreground">
              For Online Hackathons where organizers have control over the quality
              of hackers by screening their applications
            </p>
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-6">
        <span className="h-4 w-4 rounded-full border-2 border-primary flex items-center justify-center">
          <span className="text-xs">i</span>
        </span>
        <span>Learn more about each mode <a href="#" className="text-primary hover:underline">here</a>.</span>
      </div>
    </div>
  );
}
