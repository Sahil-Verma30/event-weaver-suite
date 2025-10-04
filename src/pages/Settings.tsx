import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Bell, Shield, Mail } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your hackathon organizer preferences
          </p>
        </div>

        {/* Profile Settings */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Profile Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input id="organization" placeholder="Your University or Company" />
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Notification Preferences</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email updates about your hackathons
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Applications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when new participants apply
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Submission Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Alerts when teams submit their projects
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Food Distribution Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications about meal distribution status
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Email Templates */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Email Templates</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="welcomeEmail">Welcome Email Template</Label>
              <Input
                id="welcomeEmail"
                placeholder="Subject line for welcome email"
                defaultValue="Welcome to [Hackathon Name]!"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="acceptanceEmail">Acceptance Email Template</Label>
              <Input
                id="acceptanceEmail"
                placeholder="Subject line for acceptance email"
                defaultValue="Congratulations! You've been accepted"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reminderEmail">Reminder Email Template</Label>
              <Input
                id="reminderEmail"
                placeholder="Subject line for reminder email"
                defaultValue="Don't forget - [Hackathon Name] starts soon!"
              />
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
