import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Utensils, QrCode, Plus, Search, Check, X } from "lucide-react";
import { toast } from "sonner";

interface Participant {
  id: string;
  name: string;
  email: string;
  team: string;
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    snacks: boolean;
  };
}

const FoodDistribution = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMealType, setSelectedMealType] = useState<string>("all");
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      team: "Team Alpha",
      meals: { breakfast: true, lunch: false, dinner: false, snacks: true },
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      team: "Team Beta",
      meals: { breakfast: false, lunch: false, dinner: false, snacks: false },
    },
  ]);

  const toggleMeal = (participantId: string, mealType: keyof Participant["meals"]) => {
    setParticipants(participants.map(p => 
      p.id === participantId
        ? { ...p, meals: { ...p.meals, [mealType]: !p.meals[mealType] } }
        : p
    ));
    toast.success("Meal status updated");
  };

  const filteredParticipants = participants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMealStats = () => {
    const stats = {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snacks: 0,
    };
    
    participants.forEach(p => {
      if (p.meals.breakfast) stats.breakfast++;
      if (p.meals.lunch) stats.lunch++;
      if (p.meals.dinner) stats.dinner++;
      if (p.meals.snacks) stats.snacks++;
    });
    
    return stats;
  };

  const stats = getMealStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Utensils className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Food Distribution</h1>
          </div>
          <p className="text-muted-foreground">
            Track and manage meal distribution for all participants
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Breakfast</p>
                <p className="text-2xl font-bold text-primary">{stats.breakfast}</p>
              </div>
              <Utensils className="h-8 w-8 text-orange-500" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lunch</p>
                <p className="text-2xl font-bold text-primary">{stats.lunch}</p>
              </div>
              <Utensils className="h-8 w-8 text-green-500" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dinner</p>
                <p className="text-2xl font-bold text-primary">{stats.dinner}</p>
              </div>
              <Utensils className="h-8 w-8 text-purple-500" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Snacks</p>
                <p className="text-2xl font-bold text-primary">{stats.snacks}</p>
              </div>
              <Utensils className="h-8 w-8 text-pink-500" />
            </div>
          </Card>
        </div>

        {/* QR Code Scanner Section */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <QrCode className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Quick Distribution Mode</h3>
              <p className="text-sm text-muted-foreground">
                Scan participant QR codes for instant meal distribution tracking
              </p>
            </div>
            <Button className="gap-2">
              <QrCode className="h-4 w-4" />
              Start Scanner
            </Button>
          </div>
        </Card>

        {/* Filters and Search */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by meal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Meals</SelectItem>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snacks">Snacks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Participants Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-center">Breakfast</TableHead>
                <TableHead className="text-center">Lunch</TableHead>
                <TableHead className="text-center">Dinner</TableHead>
                <TableHead className="text-center">Snacks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParticipants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No participants found
                  </TableCell>
                </TableRow>
              ) : (
                filteredParticipants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell className="font-medium">{participant.name}</TableCell>
                    <TableCell className="text-muted-foreground">{participant.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{participant.team}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant={participant.meals.breakfast ? "default" : "outline"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleMeal(participant.id, "breakfast")}
                      >
                        {participant.meals.breakfast ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant={participant.meals.lunch ? "default" : "outline"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleMeal(participant.id, "lunch")}
                      >
                        {participant.meals.lunch ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant={participant.meals.dinner ? "default" : "outline"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleMeal(participant.id, "dinner")}
                      >
                        {participant.meals.dinner ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant={participant.meals.snacks ? "default" : "outline"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleMeal(participant.id, "snacks")}
                      >
                        {participant.meals.snacks ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Distribution Tips */}
        <Card className="p-6 mt-6 bg-accent/10 border-accent">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Utensils className="h-5 w-5 text-accent-foreground" />
            Distribution Tips
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent-foreground">•</span>
              <span>Use QR code scanner for quick check-ins during meal times</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-foreground">•</span>
              <span>Monitor real-time stats to ensure adequate food supply</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-foreground">•</span>
              <span>Mark meals as distributed to prevent duplicate servings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-foreground">•</span>
              <span>Export data at the end of the day for inventory management</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default FoodDistribution;
