import { ForecastData } from "@/lib/weatherApi";
import { WeatherIcon } from "./WeatherIcon";
import { formatTime } from "@/lib/weatherUtils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface HourlyForecastProps {
  forecast: ForecastData;
}

export const HourlyForecast = ({ forecast }: HourlyForecastProps) => {
  const hourlyData = forecast.list.slice(0, 8);

  return (
    <div className="glass-card rounded-3xl p-6 animate-in fade-in slide-in-from-bottom-8 duration-900">
      <h3 className="text-xl font-semibold mb-4">Hourly Forecast</h3>
      
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {hourlyData.map((hour, index) => (
            <div
              key={hour.dt}
              className="flex-shrink-0 w-24 text-center p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <p className="text-sm text-muted-foreground mb-2">
                {formatTime(hour.dt)}
              </p>
              <WeatherIcon
                iconCode={hour.weather[0].icon}
                className="h-8 w-8 mx-auto mb-2 text-primary"
              />
              <p className="text-lg font-semibold">
                {Math.round(hour.main.temp)}°
              </p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
