export const getWeatherIcon = (iconCode: string) => {
  const code = iconCode.slice(0, 2);
  const isNight = iconCode.endsWith('n');
  
  const iconMap: Record<string, string> = {
    '01': isNight ? 'moon' : 'sun',
    '02': isNight ? 'cloud-moon' : 'cloud-sun',
    '03': 'cloud',
    '04': 'cloudy',
    '09': 'cloud-drizzle',
    '10': isNight ? 'cloud-rain' : 'cloud-sun-rain',
    '11': 'cloud-lightning',
    '13': 'snowflake',
    '50': 'cloud-fog',
  };
  
  return iconMap[code] || 'cloud';
};

export const getWeatherGradient = (weatherMain: string, isNight: boolean) => {
  if (isNight) return 'gradient-night';
  
  const gradientMap: Record<string, string> = {
    'Clear': 'gradient-sunny',
    'Clouds': 'gradient-cloudy',
    'Rain': 'gradient-rainy',
    'Drizzle': 'gradient-rainy',
    'Thunderstorm': 'gradient-rainy',
    'Snow': 'gradient-cloudy',
    'Mist': 'gradient-cloudy',
    'Fog': 'gradient-cloudy',
  };
  
  return gradientMap[weatherMain] || 'gradient-cloudy';
};

export const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });
};

export const formatDay = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
  });
};

export const getDailyForecast = (forecastList: any[]) => {
  const dailyData: Record<string, any> = {};
  
  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyData[date]) {
      dailyData[date] = {
        dt: item.dt,
        temps: [item.main.temp],
        weather: item.weather[0],
      };
    } else {
      dailyData[date].temps.push(item.main.temp);
    }
  });
  
  return Object.values(dailyData).slice(0, 5).map((day: any) => ({
    dt: day.dt,
    tempMax: Math.round(Math.max(...day.temps)),
    tempMin: Math.round(Math.min(...day.temps)),
    weather: day.weather,
  }));
};
