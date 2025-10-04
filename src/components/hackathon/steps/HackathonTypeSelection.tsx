import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Building2, Zap, ShoppingBag, Users, Eye } from "lucide-react";
import { HackathonType } from "../CreateHackathonDialog";

interface HackathonTypeSelectionProps {
  onSelect: (type: HackathonType) => void;
}

export function HackathonTypeSelection({ onSelect }: HackathonTypeSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Card className="p-8 space-y-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold">For Students</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <GraduationCap className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              Access to Devfolio + Premium features at no cost
            </p>
          </div>
          <div className="flex gap-3">
            <Zap className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              Partner with great companies for exciting bounties and sponsorships
            </p>
          </div>
          <div className="flex gap-3">
            <ShoppingBag className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              Cool Schwags for winners and organizers
            </p>
          </div>
          <div className="flex gap-3">
            <Users className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              Mentorship and Support from Devfolio
            </p>
          </div>
        </div>

        <Button
          className="w-full h-12 text-base font-semibold"
          onClick={() => onSelect("students")}
        >
          Start Hackathon Setup
        </Button>
      </Card>

      <Card className="p-8 space-y-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold">For Communities/Companies</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <Building2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              Access to Devfolio platform
            </p>
          </div>
          <div className="flex gap-3">
            <Eye className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              Get listed on the Hackathons Page for more reach
            </p>
          </div>
          <div className="flex gap-3">
            <Users className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              Support from the Devfolio team
            </p>
          </div>
        </div>

        <Button
          className="w-full h-12 text-base font-semibold"
          onClick={() => onSelect("communities")}
        >
          Start Hackathon Setup
        </Button>
      </Card>
    </div>
  );
}
