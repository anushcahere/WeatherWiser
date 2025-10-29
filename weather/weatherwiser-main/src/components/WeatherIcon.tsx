import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudSunRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Cloudy,
  Snowflake,
} from "lucide-react";
import { getWeatherIcon } from "@/lib/weatherUtils";

interface WeatherIconProps {
  iconCode: string;
  className?: string;
}

export const WeatherIcon = ({ iconCode, className = "" }: WeatherIconProps) => {
  const iconName = getWeatherIcon(iconCode);

  const iconMap: Record<string, any> = {
    sun: Sun,
    moon: Moon,
    cloud: Cloud,
    "cloud-sun": CloudSun,
    "cloud-moon": CloudMoon,
    "cloud-rain": CloudRain,
    "cloud-sun-rain": CloudSunRain,
    "cloud-drizzle": CloudDrizzle,
    "cloud-lightning": CloudLightning,
    "cloud-snow": CloudSnow,
    "cloud-fog": CloudFog,
    cloudy: Cloudy,
    snowflake: Snowflake,
  };

  const Icon = iconMap[iconName] || Cloud;

  return <Icon className={`${className} transition-transform duration-300`} />;
};
