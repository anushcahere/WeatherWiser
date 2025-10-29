import { ForecastData } from "@/lib/weatherApi";
import { WeatherIcon } from "./WeatherIcon";
import { formatDay, getDailyForecast } from "@/lib/weatherUtils";

interface WeeklyForecastProps {
  forecast: ForecastData;
}

export const WeeklyForecast = ({ forecast }: WeeklyForecastProps) => {
  const dailyForecast = getDailyForecast(forecast.list);

  return (
    <div className="glass-card rounded-3xl p-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      
      <div className="space-y-3">
        {dailyForecast.map((day, index) => (
          <div
            key={day.dt}
            className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 hover:translate-x-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="font-medium w-16">
              {formatDay(day.dt)}
            </span>
            
            <div className="flex items-center gap-3 flex-1 justify-center">
              <WeatherIcon
                iconCode={day.weather.icon}
                className="h-6 w-6 text-primary"
              />
              <span className="text-sm text-muted-foreground capitalize">
                {day.weather.description}
              </span>
            </div>
            
            <div className="flex gap-3 w-24 justify-end">
              <span className="font-semibold">{day.tempMax}°</span>
              <span className="text-muted-foreground">{day.tempMin}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
