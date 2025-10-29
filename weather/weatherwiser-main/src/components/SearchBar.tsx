import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchCities, CitySearchResult } from "@/lib/weatherApi";
import { toast } from "sonner";

interface SearchBarProps {
  onLocationSelect: (lat: number, lon: number, cityName: string) => void;
  onCurrentLocation: () => void;
}

export const SearchBar = ({ onLocationSelect, onCurrentLocation }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        try {
          const results = await searchCities(query);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [query]);

  const handleSelectCity = (city: CitySearchResult) => {
    const cityName = city.state
      ? `${city.name}, ${city.state}, ${city.country}`
      : `${city.name}, ${city.country}`;
    onLocationSelect(city.lat, city.lon, cityName);
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            className="pl-10 glass-card border-border/50"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
        <Button
          onClick={onCurrentLocation}
          size="icon"
          variant="secondary"
          className="glass-card hover:scale-105 transition-transform"
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full glass-card rounded-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {suggestions.map((city, index) => (
            <button
              key={`${city.name}-${city.country}-${index}`}
              onClick={() => handleSelectCity(city)}
              className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors flex items-center gap-2 group"
            >
              <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm">
                {city.name}, {city.state && `${city.state}, `}
                {city.country}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
