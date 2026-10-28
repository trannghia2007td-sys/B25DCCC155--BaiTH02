import type { TemperatureUnit } from '../types/weather'
import { getWeatherDescription } from '../utils/weatherCode'
import { formatTemperature } from '../utils/temperature'

interface Props {
  date: string
  code: number
  maxTemp: number
  minTemp: number
  unit: TemperatureUnit
}

export default function WeatherCard({
  date,
  code,
  maxTemp,
  minTemp,
  unit,
}: Props) {
  const condition = getWeatherDescription(code)

  const dateObject = new Date(`${date}T12:00:00`)

  const weekday = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'short',
  }).format(dateObject)

  const formattedDate = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
  }).format(dateObject)

  return (
    <article className="forecast-card">
      <p className="forecast-weekday">{weekday}</p>

      <p className="forecast-date">{formattedDate}</p>

      <span
        className="forecast-icon"
        role="img"
        aria-label={condition.description}
      >
        {condition.icon}
      </span>

      <p className="forecast-description">
        {condition.description}
      </p>

      <div className="forecast-temperatures">
        <strong>{formatTemperature(maxTemp, unit)}</strong>
        <span>{formatTemperature(minTemp, unit)}</span>
      </div>
    </article>
  )
}