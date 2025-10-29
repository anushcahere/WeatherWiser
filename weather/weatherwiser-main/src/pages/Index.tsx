import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { SearchBar } from "@/components/SearchBar";
import { CurrentWeather } from "@/components/CurrentWeather";
import { WeatherDetails } from "@/components/WeatherDetails";
import { HourlyForecast } from "@/components/HourlyForecast";
import { WeeklyForecast } from "@/components/WeeklyForecast";
import { getCurrentWeather, getForecast, WeatherData, ForecastData } from "@/lib/weatherApi";
import { getWeatherGradient } from "@/lib/weatherUtils";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [bgGradient, setBgGradient] = useState("gradient-cloudy");

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(lat, lon),
        getForecast(lat, lon),
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      
      const isNight = weatherData.weather[0].icon.endsWith('n');
      const gradient = getWeatherGradient(weatherData.weather[0].main, isNight);
      setBgGradient(gradient);
      
      toast.success(`Weather loaded for ${weatherData.name}`);
    } catch (error) {
      console.error("Error fetching weather:", error);
      toast.error("Failed to load weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error("Unable to get your location");
          // Default to London if geolocation fails
          fetchWeatherData(51.5074, -0.1278);
        }
      );
    } else {
      toast.error("Geolocation not supported");
      fetchWeatherData(51.5074, -0.1278);
    }
  };

  useEffect(() => {
    handleCurrentLocation();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className={`min-h-screen ${bgGradient} transition-all duration-1000`}>
        <div className="min-h-screen backdrop-blur-3xl">
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">WeatherWiser</h1>
         
            </header>

            {/* Search Bar */}
            <div className="flex justify-center mb-8">
              <SearchBar
                onLocationSelect={(lat, lon, cityName) => {
                  fetchWeatherData(lat, lon);
                }}
                onCurrentLocation={handleCurrentLocation}
              />
            </div>

            {loading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : weather && forecast ? (
              <div className="space-y-6">
                {/* Current Weather */}
                <CurrentWeather weather={weather} />

                {/* Weather Details */}
                <WeatherDetails weather={weather} />

                {/* Hourly Forecast */}
                <HourlyForecast forecast={forecast} />

                {/* Weekly Forecast */}
                <WeeklyForecast forecast={forecast} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
