import { useState } from "react";
import { SymptomForm } from "@/components/SymptomForm";
import { PrescriptionResults } from "@/components/PrescriptionResults";
import { HospitalFinder } from "@/components/HospitalFinder";
import { Button } from "@/components/ui/button";
import { generatePrescription } from "@/utils/prescriptionLogic";
import { Heart, ArrowLeft } from "lucide-react";

const Index = () => {
  const [step, setStep] = useState<"form" | "results">("form");
  const [formData, setFormData] = useState<any>(null);
  const [prescription, setPrescription] = useState<any>(null);

  const handleSubmit = (data: any) => {
    const generatedPrescription = generatePrescription(data);
    setFormData(data);
    setPrescription(generatedPrescription);
    setStep("results");
  };

  const handleBack = () => {
    setStep("form");
    setFormData(null);
    setPrescription(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-light via-background to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary p-2">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">HealthAssist</h1>
                <p className="text-sm text-muted-foreground">Your Medical Guidance Companion</p>
              </div>
            </div>
            {step === "results" && (
              <Button onClick={handleBack} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                New Assessment
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {step === "form" ? (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-4xl font-bold text-foreground">
                Get Personalized Health Guidance
              </h2>
              <p className="text-lg text-muted-foreground">
                Enter your health information and symptoms to receive preliminary medical advice
                and find nearby healthcare facilities.
              </p>
            </div>
            <SymptomForm onSubmit={handleSubmit} />
          </div>
        ) : (
          <div className="space-y-8">
            <PrescriptionResults data={formData} prescription={prescription} />
            <HospitalFinder />
          </div>
        )}
      </main>

      <footer className="border-t mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © 2024 HealthAssist. This platform provides general health information only and should
            not replace professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
