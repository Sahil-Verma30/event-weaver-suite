import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HackathonBasicInfoProps {
  onSubmit: (data: { name: string; university: string; hasFee: string }) => void;
}

export function HackathonBasicInfo({ onSubmit }: HackathonBasicInfoProps) {
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    hasFee: "no",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">
          NAME (YOU CAN CHANGE THIS LATER)
        </Label>
        <Input
          id="name"
          placeholder="What are you calling your hackathon?"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="university" className="text-sm font-medium text-muted-foreground">
          UNIVERSITY YOU'RE REPRESENTING
        </Label>
        <Input
          id="university"
          placeholder="Start Typing!"
          value={formData.university}
          onChange={(e) => setFormData({ ...formData, university: e.target.value })}
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fee" className="text-sm font-medium text-muted-foreground">
          DOES YOUR HACKATHON HAVE A PARTICIPATION FEE?
        </Label>
        <Select
          value={formData.hasFee}
          onValueChange={(value) => setFormData({ ...formData, hasFee: value })}
        >
          <SelectTrigger className="h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no">No</SelectItem>
            <SelectItem value="yes">Yes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1 h-12 bg-accent/20 hover:bg-accent/30 border-0"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 h-12"
          disabled={!formData.name}
        >
          Begin
        </Button>
      </div>
    </form>
  );
}
