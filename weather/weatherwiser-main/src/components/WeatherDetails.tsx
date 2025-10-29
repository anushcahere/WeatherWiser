import { WeatherData } from "@/lib/weatherApi";
import { Wind, Droplets, Gauge, Eye } from "lucide-react";

interface WeatherDetailsProps {
  weather: WeatherData;
}

export const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
  const details = [
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${Math.round(weather.wind.speed * 3.6)} km/h`,
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weather.main.humidity}%`,
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${weather.main.pressure} hPa`,
    },
    {
      icon: Eye,
      label: "Visibility",
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {details.map((detail, index) => (
        <div
          key={detail.label}
          className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-3 mb-2">
            <detail.icon className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">{detail.label}</span>
          </div>
          <p className="text-2xl font-semibold">{detail.value}</p>
        </div>
      ))}
    </div>
  );
};
