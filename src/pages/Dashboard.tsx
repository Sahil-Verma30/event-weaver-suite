import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateHackathonDialog } from "@/components/hackathon/CreateHackathonDialog";

const Dashboard = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 space-y-6">
            <h1 className="text-5xl font-bold text-foreground leading-tight">
              Organize a hackathon!
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The only thing that can match the thrill of attending a hackathon is
              the exhilaration of organizing one yourself! Join 100s of other
              hackathons on Devfolio and manage your applications, submissions,
              comms, reimbursements, and judging, all on our platform.
            </p>
            
            <Button
              size="lg"
              className="mt-8 h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="mr-2 h-5 w-5" />
              Organize your hackathon on Devfolio
            </Button>
          </div>

          {/* Stats or Recent Hackathons could go here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-3xl font-bold text-primary">0</h3>
              <p className="text-muted-foreground mt-1">Active Hackathons</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-3xl font-bold text-primary">0</h3>
              <p className="text-muted-foreground mt-1">Total Participants</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-3xl font-bold text-primary">0</h3>
              <p className="text-muted-foreground mt-1">Total Submissions</p>
            </div>
          </div>
        </div>
      </div>

      <CreateHackathonDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};

export default Dashboard;
