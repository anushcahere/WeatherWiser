import { WeatherData } from "@/lib/weatherApi";
import { WeatherIcon } from "./WeatherIcon";

interface CurrentWeatherProps {
  weather: WeatherData;
}

export const CurrentWeather = ({ weather }: CurrentWeatherProps) => {
  return (
    <div className="glass-card rounded-3xl p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-semibold mb-2">
        {weather.name}, {weather.sys.country}
      </h2>
      
      <div className="flex items-center justify-center my-6">
        <WeatherIcon
          iconCode={weather.weather[0].icon}
          className="h-24 w-24 text-primary"
        />
      </div>

      <div className="text-7xl font-bold mb-2">
        {Math.round(weather.main.temp)}°
      </div>

      <p className="text-xl text-muted-foreground capitalize mb-4">
        {weather.weather[0].description}
      </p>

      <div className="flex justify-center gap-8 text-sm">
        <div>
          <span className="text-muted-foreground">Feels like</span>
          <p className="text-lg font-semibold">{Math.round(weather.main.feels_like)}°</p>
        </div>
      </div>
    </div>
  );
};
