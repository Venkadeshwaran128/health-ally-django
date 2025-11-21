-- Create hospitals table
CREATE TABLE public.hospitals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  phone TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  specialty TEXT[],
  rating DECIMAL(2, 1) DEFAULT 4.0,
  emergency_services BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (hospitals are public information)
CREATE POLICY "Hospitals are publicly readable" 
ON public.hospitals 
FOR SELECT 
USING (true);

-- Insert sample hospital data
INSERT INTO public.hospitals (name, address, city, state, phone, latitude, longitude, specialty, rating, emergency_services) VALUES
('City General Hospital', '123 Main Street', 'New York', 'NY', '(212) 555-0100', 40.7128, -74.0060, ARRAY['Emergency', 'General Medicine', 'Surgery'], 4.5, true),
('St. Mary Medical Center', '456 Oak Avenue', 'Los Angeles', 'CA', '(310) 555-0200', 34.0522, -118.2437, ARRAY['Cardiology', 'Pediatrics', 'Oncology'], 4.7, true),
('Memorial Hospital', '789 Park Lane', 'Chicago', 'IL', '(312) 555-0300', 41.8781, -87.6298, ARRAY['Orthopedics', 'Neurology', 'General Medicine'], 4.3, true),
('University Medical Center', '321 College Road', 'Houston', 'TX', '(713) 555-0400', 29.7604, -95.3698, ARRAY['Emergency', 'Trauma', 'Surgery'], 4.6, true),
('Riverside Hospital', '654 River Drive', 'Phoenix', 'AZ', '(602) 555-0500', 33.4484, -112.0740, ARRAY['General Medicine', 'Maternity', 'Pediatrics'], 4.4, true),
('Central Care Hospital', '987 Center Street', 'Philadelphia', 'PA', '(215) 555-0600', 39.9526, -75.1652, ARRAY['Emergency', 'Cardiology', 'Surgery'], 4.5, true),
('Lakeside Medical', '147 Lake View', 'San Antonio', 'TX', '(210) 555-0700', 29.4241, -98.4936, ARRAY['General Medicine', 'Orthopedics'], 4.2, true),
('Valley Hospital', '258 Valley Road', 'San Diego', 'CA', '(619) 555-0800', 32.7157, -117.1611, ARRAY['Emergency', 'Neurology', 'Oncology'], 4.8, true);