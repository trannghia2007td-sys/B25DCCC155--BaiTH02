import { Clock3, Droplets, Wind } from 'lucide-react'
import type { TemperatureUnit, WeatherData } from '../types/weather'
import { getWeatherDescription } from '../utils/weatherCode'
import { formatTemperature } from '../utils/temperature'

interface Props {
  weather: WeatherData
  cityName: string
  unit: TemperatureUnit
}

export default function CurrentWeather({
  weather,
  cityName,
  unit,
}: Props) {
  const current = weather.current

  const condition = getWeatherDescription(
    current.weather_code,
  )

  const updatedAt = new Date(current.time).toLocaleString(
    'vi-VN',
    {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  )

  return (
    <section className="current-weather">
      <div className="current-top">
        <div>
          <p className="eyebrow">THỜI TIẾT HIỆN TẠI</p>

          <h2>{cityName}</h2>

          <p className="weather-description">
            {condition.description}
          </p>
        </div>

        <span
          className="current-icon"
          role="img"
          aria-label={condition.description}
        >
          {condition.icon}
        </span>
      </div>

      <p className="temperature">
        {formatTemperature(current.temperature_2m, unit)}
      </p>

      <div className="weather-details">
        <div className="detail-item">
          <Droplets size={21} />

          <div>
            <p>Độ ẩm</p>
            <strong>{current.relative_humidity_2m}%</strong>
          </div>
        </div>

        <div className="detail-item">
          <Wind size={21} />

          <div>
            <p>Tốc độ gió</p>
            <strong>{current.wind_speed_10m} km/h</strong>
          </div>
        </div>
      </div>

      <p className="updated-time">
        <Clock3 size={15} />
        <span>Cập nhật: {updatedAt}</span>
      </p>
    </section>
  )
}