import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Star, Navigation, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  latitude: number;
  longitude: number;
  specialty: string[];
  rating: number;
  emergency_services: boolean;
}

export const HospitalFinder = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLon, setUserLon] = useState<number | null>(null);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("hospitals")
      .select("*")
      .order("rating", { ascending: false });

    if (error) {
      console.error("Error fetching hospitals:", error);
    } else {
      setHospitals(data || []);
    }
    setLoading(false);
  };

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLat(position.coords.latitude);
          setUserLon(position.coords.longitude);
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const sortedHospitals = userLat && userLon
    ? [...hospitals].sort((a, b) => {
        const distA = calculateDistance(userLat, userLon, Number(a.latitude), Number(a.longitude));
        const distB = calculateDistance(userLat, userLon, Number(b.latitude), Number(b.longitude));
        return distA - distB;
      })
    : hospitals;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            Nearby Hospitals
          </CardTitle>
          <CardDescription>Find medical facilities near your location</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter location or city..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1"
            />
            <Button onClick={getUserLocation} variant="outline">
              <Navigation className="w-4 h-4 mr-2" />
              Use My Location
            </Button>
          </div>

          {userLat && userLon && (
            <Alert className="border-success/20 bg-success/10">
              <MapPin className="h-4 w-4 text-success" />
              <AlertDescription className="text-success">
                Showing hospitals sorted by distance from your location
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading hospitals...</div>
            ) : sortedHospitals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No hospitals found</div>
            ) : (
              sortedHospitals.map((hospital) => {
                const distance = userLat && userLon
                  ? calculateDistance(userLat, userLon, Number(hospital.latitude), Number(hospital.longitude))
                  : null;

                return (
                  <Card key={hospital.id} className="border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold">{hospital.name}</h3>
                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                              <MapPin className="w-4 h-4" />
                              {hospital.address}, {hospital.city}, {hospital.state}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-1 bg-warning/10 px-3 py-1 rounded-full">
                              <Star className="w-4 h-4 text-warning fill-warning" />
                              <span className="font-bold">{hospital.rating}</span>
                            </div>
                            {distance && (
                              <Badge variant="outline" className="text-xs">
                                {distance.toFixed(1)} km away
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-foreground">
                          <Phone className="w-4 h-4 text-primary" />
                          <a href={`tel:${hospital.phone}`} className="hover:underline">
                            {hospital.phone}
                          </a>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {hospital.emergency_services && (
                            <Badge className="bg-destructive text-destructive-foreground">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Emergency Services
                            </Badge>
                          )}
                          {hospital.specialty?.map((spec, index) => (
                            <Badge key={index} variant="secondary">
                              {spec}
                            </Badge>
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            window.open(
                              `https://www.google.com/maps/dir/?api=1&destination=${hospital.latitude},${hospital.longitude}`,
                              "_blank"
                            );
                          }}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
