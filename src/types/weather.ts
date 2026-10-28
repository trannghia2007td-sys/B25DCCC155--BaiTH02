export type TemperatureUnit = 'C' | 'F'

export interface CurrentWeather {
  time: string
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  is_day: number
  precipitation: number
  weather_code: number
  wind_speed_10m: number
}

export interface DailyWeather {
  time: string[]
  weather_code: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
}

export interface WeatherData {
  current: CurrentWeather
  daily: DailyWeather
}

export interface WeatherDescription {
  description: string
  icon: string
}