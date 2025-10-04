import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface HackathonDetailsFormProps {
  initialData: {
    name: string;
    university: string;
    hasFee: string;
  };
  onComplete: () => void;
}

interface Partner {
  id: string;
  name: string;
  logo: string;
}

interface Prize {
  id: string;
  title: string;
  amount: string;
  description: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export function HackathonDetailsForm({ initialData, onComplete }: HackathonDetailsFormProps) {
  const [formData, setFormData] = useState({
    name: initialData.name,
    tagline: "",
    about: "",
    theme: "",
    expectedParticipants: "",
    minTeamSize: "",
    maxTeamSize: "",
    venue: "",
    website: "",
    logo: "",
    favicon: "",
    applicationOpen: undefined as Date | undefined,
    applicationClose: undefined as Date | undefined,
    hackathonBegin: undefined as Date | undefined,
    submissionDeadline: undefined as Date | undefined,
  });

  const [requiredFields, setRequiredFields] = useState({
    firstName: true,
    lastName: true,
    gender: true,
    github: false,
    linkedin: false,
    phone: true,
    email: true,
  });

  const [partners, setPartners] = useState<Partner[]>([]);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [faqs, setFAQs] = useState<FAQ[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.tagline || !formData.about) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Hackathon created successfully!");
    onComplete();
  };

  const addPartner = () => {
    setPartners([...partners, { id: Date.now().toString(), name: "", logo: "" }]);
  };

  const removePartner = (id: string) => {
    setPartners(partners.filter(p => p.id !== id));
  };

  const addPrize = () => {
    setPrizes([...prizes, { id: Date.now().toString(), title: "", amount: "", description: "" }]);
  };

  const removePrize = (id: string) => {
    setPrizes(prizes.filter(p => p.id !== id));
  };

  const addFAQ = () => {
    setFAQs([...faqs, { id: Date.now().toString(), question: "", answer: "" }]);
  };

  const removeFAQ = (id: string) => {
    setFAQs(faqs.filter(f => f.id !== id));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 mt-6 pb-6">
      {/* Basic Information */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline *</Label>
            <Input
              id="tagline"
              placeholder="A short catchy tagline"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="about">About *</Label>
          <Textarea
            id="about"
            placeholder="Describe your hackathon..."
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            className="min-h-32"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Input
              id="theme"
              placeholder="e.g., AI, Blockchain, Web3"
              value={formData.theme}
              onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedParticipants">Expected Participants</Label>
            <Input
              id="expectedParticipants"
              type="number"
              placeholder="Approximate number"
              value={formData.expectedParticipants}
              onChange={(e) => setFormData({ ...formData, expectedParticipants: e.target.value })}
            />
          </div>
        </div>
      </section>

      {/* Team Size */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Team Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minTeamSize">Minimum Team Size</Label>
            <Input
              id="minTeamSize"
              type="number"
              min="1"
              value={formData.minTeamSize}
              onChange={(e) => setFormData({ ...formData, minTeamSize: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxTeamSize">Maximum Team Size</Label>
            <Input
              id="maxTeamSize"
              type="number"
              min="1"
              value={formData.maxTeamSize}
              onChange={(e) => setFormData({ ...formData, maxTeamSize: e.target.value })}
            />
          </div>
        </div>
      </section>

      {/* Venue & Links */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Venue & Online Presence</h3>
        
        <div className="space-y-2">
          <Label htmlFor="venue">Venue</Label>
          <Input
            id="venue"
            placeholder="Physical address or online platform"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="website">Hackathon Website Link</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Hackathon Logo URL</Label>
            <Input
              id="logo"
              type="url"
              placeholder="https://"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="favicon">Hackathon Favicon URL</Label>
          <Input
            id="favicon"
            type="url"
            placeholder="https://"
            value={formData.favicon}
            onChange={(e) => setFormData({ ...formData, favicon: e.target.value })}
          />
        </div>
      </section>

      {/* Important Dates */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Important Dates</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Application Open</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.applicationOpen && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.applicationOpen ? format(formData.applicationOpen, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.applicationOpen}
                  onSelect={(date) => setFormData({ ...formData, applicationOpen: date })}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Application Close</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.applicationClose && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.applicationClose ? format(formData.applicationClose, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.applicationClose}
                  onSelect={(date) => setFormData({ ...formData, applicationClose: date })}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Hackathon Begin</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.hackathonBegin && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.hackathonBegin ? format(formData.hackathonBegin, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.hackathonBegin}
                  onSelect={(date) => setFormData({ ...formData, hackathonBegin: date })}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Submission Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.submissionDeadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.submissionDeadline ? format(formData.submissionDeadline, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.submissionDeadline}
                  onSelect={(date) => setFormData({ ...formData, submissionDeadline: date })}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>

      {/* Required Participant Details */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Required Participant Details</h3>
        <p className="text-sm text-muted-foreground">Select which fields are required from participants</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries({
            firstName: "First Name",
            lastName: "Last Name",
            gender: "Gender",
            github: "GitHub",
            linkedin: "LinkedIn",
            phone: "Phone Number",
            email: "Email ID",
          }).map(([key, label]) => (
            <label key={key} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={requiredFields[key as keyof typeof requiredFields]}
                onChange={(e) => setRequiredFields({ ...requiredFields, [key]: e.target.checked })}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Partners</h3>
          <Button type="button" variant="outline" size="sm" onClick={addPartner}>
            <Plus className="h-4 w-4 mr-2" />
            Add Partner
          </Button>
        </div>

        {partners.map((partner, index) => (
          <div key={partner.id} className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label>Partner Name</Label>
              <Input
                value={partner.name}
                onChange={(e) => {
                  const updated = [...partners];
                  updated[index].name = e.target.value;
                  setPartners(updated);
                }}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label>Logo URL</Label>
              <Input
                value={partner.logo}
                onChange={(e) => {
                  const updated = [...partners];
                  updated[index].logo = e.target.value;
                  setPartners(updated);
                }}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removePartner(partner.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </section>

      {/* Prizes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Prizes</h3>
          <Button type="button" variant="outline" size="sm" onClick={addPrize}>
            <Plus className="h-4 w-4 mr-2" />
            Add Prize
          </Button>
        </div>

        {prizes.map((prize, index) => (
          <div key={prize.id} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prize Title</Label>
                  <Input
                    value={prize.title}
                    onChange={(e) => {
                      const updated = [...prizes];
                      updated[index].title = e.target.value;
                      setPrizes(updated);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    value={prize.amount}
                    onChange={(e) => {
                      const updated = [...prizes];
                      updated[index].amount = e.target.value;
                      setPrizes(updated);
                    }}
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removePrize(prize.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={prize.description}
                onChange={(e) => {
                  const updated = [...prizes];
                  updated[index].description = e.target.value;
                  setPrizes(updated);
                }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">FAQs</h3>
          <Button type="button" variant="outline" size="sm" onClick={addFAQ}>
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </Button>
        </div>

        {faqs.map((faq, index) => (
          <div key={faq.id} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label>Question</Label>
                  <Input
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[index].question = e.target.value;
                      setFAQs(updated);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Answer</Label>
                  <Textarea
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[index].answer = e.target.value;
                      setFAQs(updated);
                    }}
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFAQ(faq.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </section>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4 sticky bottom-0 bg-background py-4 border-t">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onComplete}
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Create Hackathon
        </Button>
      </div>
    </form>
  );
}
