interface SymptomData {
  age: number;
  height: number;
  weight: number;
  symptoms: string;
}

interface Prescription {
  severity: "low" | "moderate" | "high";
  condition: string;
  advice: string[];
  medications: string[];
  urgency: boolean;
  lifestyle: string[];
}

export const generatePrescription = (data: SymptomData): Prescription => {
  const symptoms = data.symptoms.toLowerCase();
  const bmi = data.weight / ((data.height / 100) ** 2);

  // Default prescription
  let prescription: Prescription = {
    severity: "low",
    condition: "General Health Concern",
    advice: ["Rest and monitor symptoms", "Stay hydrated", "Maintain a balanced diet"],
    medications: [],
    urgency: false,
    lifestyle: ["Get adequate sleep (7-9 hours)", "Exercise regularly", "Manage stress levels"],
  };

  // Fever-related symptoms
  if (symptoms.includes("fever") || symptoms.includes("temperature")) {
    prescription.severity = "moderate";
    prescription.condition = "Fever / Viral Infection";
    prescription.advice = [
      "Monitor temperature regularly",
      "Rest in a cool, comfortable environment",
      "Drink plenty of fluids to prevent dehydration",
      "Seek medical attention if fever persists beyond 3 days or exceeds 103°F (39.4°C)",
    ];
    prescription.medications = ["Paracetamol (Acetaminophen) 500mg every 6 hours", "Ibuprofen 400mg every 8 hours"];
    prescription.urgency = data.age > 65 || data.age < 5;
    prescription.lifestyle = [
      "Take lukewarm baths to help reduce fever",
      "Avoid heavy physical activity",
      "Eat light, easily digestible foods",
    ];
  }

  // Cold and flu symptoms
  if (
    symptoms.includes("cold") ||
    symptoms.includes("cough") ||
    symptoms.includes("runny nose") ||
    symptoms.includes("congestion")
  ) {
    prescription.severity = "low";
    prescription.condition = "Common Cold / Upper Respiratory Infection";
    prescription.advice = [
      "Get plenty of rest to help your body fight the infection",
      "Stay hydrated with water, warm liquids, and herbal teas",
      "Use a humidifier to ease congestion",
      "Gargle with warm salt water for sore throat",
    ];
    prescription.medications = [
      "Antihistamines (e.g., Cetirizine 10mg once daily)",
      "Cough suppressants (e.g., Dextromethorphan)",
      "Decongestants (e.g., Pseudoephedrine)",
    ];
    prescription.lifestyle = [
      "Avoid smoking and secondhand smoke",
      "Wash hands frequently",
      "Use tissues when sneezing or coughing",
      "Consider taking Vitamin C supplements",
    ];
  }

  // Headache symptoms
  if (symptoms.includes("headache") || symptoms.includes("migraine")) {
    prescription.severity = symptoms.includes("severe") || symptoms.includes("migraine") ? "moderate" : "low";
    prescription.condition = symptoms.includes("migraine") ? "Migraine" : "Tension Headache";
    prescription.advice = [
      "Rest in a quiet, dark room",
      "Apply a cold or warm compress to your head or neck",
      "Stay hydrated throughout the day",
      "Avoid bright lights and loud noises",
    ];
    prescription.medications = [
      "Paracetamol 500-1000mg every 6 hours",
      "Ibuprofen 400mg every 8 hours",
      "Aspirin 325-650mg every 4 hours",
    ];
    prescription.urgency =
      symptoms.includes("severe") || symptoms.includes("sudden") || symptoms.includes("worst");
    prescription.lifestyle = [
      "Maintain regular sleep schedule",
      "Reduce screen time",
      "Practice relaxation techniques",
      "Stay hydrated",
      "Avoid caffeine and alcohol",
    ];
  }

  // Stomach issues
  if (
    symptoms.includes("stomach") ||
    symptoms.includes("nausea") ||
    symptoms.includes("vomit") ||
    symptoms.includes("diarrhea") ||
    symptoms.includes("abdominal")
  ) {
    prescription.severity = symptoms.includes("severe") || symptoms.includes("blood") ? "high" : "moderate";
    prescription.condition = "Gastrointestinal Distress";
    prescription.advice = [
      "Follow the BRAT diet (Bananas, Rice, Applesauce, Toast)",
      "Avoid dairy, fatty, and spicy foods",
      "Stay hydrated with oral rehydration solutions",
      "Eat small, frequent meals instead of large ones",
    ];
    prescription.medications = [
      "Antacids (e.g., Omeprazole 20mg once daily)",
      "Anti-nausea medication (e.g., Domperidone)",
      "Oral rehydration salts",
      "Loperamide for diarrhea (if needed)",
    ];
    prescription.urgency = symptoms.includes("blood") || symptoms.includes("severe pain");
    prescription.lifestyle = [
      "Avoid alcohol and caffeine",
      "Eat slowly and chew thoroughly",
      "Avoid lying down immediately after eating",
      "Manage stress levels",
    ];
  }

  // Pain-related symptoms
  if (
    symptoms.includes("pain") &&
    (symptoms.includes("chest") || symptoms.includes("severe") || symptoms.includes("sharp"))
  ) {
    prescription.severity = "high";
    prescription.condition = "Acute Pain - Requires Medical Evaluation";
    prescription.advice = [
      "Seek immediate medical attention",
      "Do not ignore persistent or severe pain",
      "Note the location, intensity, and duration of pain",
      "Avoid self-medicating with strong painkillers",
    ];
    prescription.medications = ["Consult a doctor before taking any medication"];
    prescription.urgency = true;
    prescription.lifestyle = ["Avoid strenuous activities", "Rest until medical evaluation"];
  }

  // Allergy symptoms
  if (symptoms.includes("allergy") || symptoms.includes("itching") || symptoms.includes("rash")) {
    prescription.severity = symptoms.includes("breathing") || symptoms.includes("swelling") ? "high" : "low";
    prescription.condition = "Allergic Reaction";
    prescription.advice = [
      "Identify and avoid the allergen if possible",
      "Take antihistamines as needed",
      "Apply cold compress to affected areas",
      "Monitor for signs of severe allergic reaction (anaphylaxis)",
    ];
    prescription.medications = [
      "Antihistamines (e.g., Cetirizine 10mg, Loratadine 10mg)",
      "Hydrocortisone cream 1% for skin irritation",
      "Calamine lotion for itching",
    ];
    prescription.urgency = symptoms.includes("breathing") || symptoms.includes("swelling");
    prescription.lifestyle = [
      "Keep antihistamines on hand",
      "Wear a medical alert bracelet if severe allergies",
      "Avoid known allergens",
      "Consider allergy testing",
    ];
  }

  // Back pain
  if (symptoms.includes("back") && symptoms.includes("pain")) {
    prescription.severity = "moderate";
    prescription.condition = "Back Pain / Muscle Strain";
    prescription.advice = [
      "Apply ice for first 48 hours, then heat",
      "Gentle stretching exercises",
      "Maintain proper posture",
      "Avoid heavy lifting",
    ];
    prescription.medications = [
      "Ibuprofen 400mg three times daily",
      "Paracetamol 500-1000mg every 6 hours",
      "Topical pain relief creams",
    ];
    prescription.lifestyle = [
      "Exercise regularly to strengthen back muscles",
      "Use ergonomic furniture",
      "Practice good posture",
      "Maintain healthy weight",
    ];
  }

  // BMI considerations
  if (bmi > 30) {
    prescription.lifestyle.push("Consider weight management program");
    prescription.lifestyle.push("Increase physical activity gradually");
    prescription.lifestyle.push("Consult a nutritionist for dietary guidance");
  }

  // Age-based considerations
  if (data.age > 65) {
    prescription.advice.push("Consider consulting with your primary care physician");
    prescription.lifestyle.push("Regular health checkups are important at your age");
  }

  return prescription;
};
