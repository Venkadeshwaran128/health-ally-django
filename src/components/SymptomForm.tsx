import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";

interface SymptomFormProps {
  onSubmit: (data: {
    age: number;
    height: number;
    weight: number;
    symptoms: string;
  }) => void;
}

export const SymptomForm = ({ onSubmit }: SymptomFormProps) => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      age: parseInt(age),
      height: parseFloat(height),
      weight: parseFloat(weight),
      symptoms,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg animate-fade-in">
      <CardHeader className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <div className="rounded-full bg-primary/10 p-4">
            <Stethoscope className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold">Medical Assessment</CardTitle>
        <CardDescription className="text-base">
          Enter your information to receive personalized health guidance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="1"
                max="120"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="e.g., 170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                min="50"
                max="250"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="e.g., 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                min="10"
                max="300"
                step="0.1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms or Health Concerns</Label>
            <Textarea
              id="symptoms"
              placeholder="Please describe your symptoms, how long you've had them, and any other relevant details..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              required
              rows={6}
              className="resize-none"
            />
          </div>

          <Button type="submit" className="w-full text-lg py-6" size="lg">
            Get Health Assessment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
