import { CalendarDays } from 'lucide-react'
import type { TemperatureUnit, WeatherData } from '../types/weather'
import WeatherCard from './WeatherCard'

interface Props {
  weather: WeatherData
  unit: TemperatureUnit
}

export default function ForecastList({
  weather,
  unit,
}: Props) {
  const { daily } = weather

  return (
    <section className="forecast-section">
      <div className="section-heading">
        <CalendarDays size={21} />

        <div>
          <h2>Dự báo 7 ngày</h2>
          <p>Nhiệt độ cao nhất và thấp nhất mỗi ngày</p>
        </div>
      </div>

      <div className="forecast-list">
        {daily.time.map((date, index) => (
          <WeatherCard
            key={date}
            date={date}
            code={daily.weather_code[index]}
            maxTemp={daily.temperature_2m_max[index]}
            minTemp={daily.temperature_2m_min[index]}
            unit={unit}
          />
        ))}
      </div>
    </section>
  )
}