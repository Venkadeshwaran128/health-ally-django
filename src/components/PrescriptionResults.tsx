import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, CheckCircle, Pill, Heart, Activity } from "lucide-react";

interface PrescriptionResultsProps {
  data: {
    age: number;
    height: number;
    weight: number;
    symptoms: string;
  };
  prescription: {
    severity: "low" | "moderate" | "high";
    condition: string;
    advice: string[];
    medications: string[];
    urgency: boolean;
    lifestyle: string[];
  };
}

export const PrescriptionResults = ({ data, prescription }: PrescriptionResultsProps) => {
  const bmi = (data.weight / ((data.height / 100) ** 2)).toFixed(1);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-success/10 text-success border-success/20";
      case "moderate":
        return "bg-warning/10 text-warning border-warning/20";
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return <CheckCircle className="w-5 h-5" />;
      case "moderate":
        return <AlertCircle className="w-5 h-5" />;
      case "high":
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Alert className="border-info/20 bg-info/10">
        <AlertCircle className="h-5 w-5 text-info" />
        <AlertDescription className="text-base font-medium text-info">
          <strong>Medical Disclaimer:</strong> This assessment is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
        </AlertDescription>
      </Alert>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Health Assessment</CardTitle>
            <Badge className={getSeverityColor(prescription.severity)} variant="outline">
              <span className="flex items-center gap-2">
                {getSeverityIcon(prescription.severity)}
                {prescription.severity.toUpperCase()} SEVERITY
              </span>
            </Badge>
          </div>
          <CardDescription>Based on your provided information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-accent rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Age</div>
              <div className="text-2xl font-bold">{data.age} years</div>
            </div>
            <div className="bg-accent rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">BMI</div>
              <div className="text-2xl font-bold">{bmi}</div>
            </div>
            <div className="bg-accent rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Weight</div>
              <div className="text-2xl font-bold">{data.weight} kg</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-primary" />
                Possible Condition
              </h3>
              <p className="text-foreground bg-muted p-4 rounded-lg">{prescription.condition}</p>
            </div>

            {prescription.urgency && (
              <Alert variant="destructive">
                <AlertTriangle className="h-5 w-5" />
                <AlertDescription className="text-base font-medium">
                  Based on your symptoms, we recommend consulting a healthcare professional as soon as possible.
                </AlertDescription>
              </Alert>
            )}

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Pill className="w-5 h-5 text-primary" />
                General Recommendations
              </h3>
              <ul className="space-y-2">
                {prescription.advice.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 bg-card border rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {prescription.medications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <Pill className="w-5 h-5 text-primary" />
                  Suggested Over-the-Counter Medications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {prescription.medications.map((med, index) => (
                    <div key={index} className="bg-accent border rounded-lg p-3">
                      {med}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-primary" />
                Lifestyle & Home Care Suggestions
              </h3>
              <ul className="space-y-2">
                {prescription.lifestyle.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 bg-card border rounded-lg p-3">
                    <Heart className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
