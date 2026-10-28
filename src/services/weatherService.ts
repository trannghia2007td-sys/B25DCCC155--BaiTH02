import type { City } from '../data/cities'
import type { WeatherData } from '../types/weather'

const API_URL = 'https://api.open-meteo.com/v1/forecast'

export async function getWeather(
  city: City,
  signal?: AbortSignal,
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current:
      'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'Asia/Ho_Chi_Minh',
    forecast_days: '7',
  })

  let response: Response

  try {
    response = await fetch(`${API_URL}?${params}`, {
      signal,
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error
    }

    throw new Error(
      'Không thể kết nối đến máy chủ thời tiết. Em hãy kiểm tra Internet và thử lại.',
    )
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(
        'Có quá nhiều yêu cầu thời tiết. Em hãy chờ một lúc rồi thử lại.',
      )
    }

    if (response.status >= 500) {
      throw new Error(
        'Máy chủ thời tiết đang gặp sự cố. Em hãy thử lại sau.',
      )
    }

    throw new Error(
      `Không tải được dữ liệu thời tiết (HTTP ${response.status}).`,
    )
  }

  let data: unknown

  try {
    data = await response.json()
  } catch {
    throw new Error(
      'Máy chủ trả về dữ liệu không đọc được. Em hãy thử lại.',
    )
  }

  if (!isWeatherData(data)) {
    throw new Error(
      'Dữ liệu thời tiết không hợp lệ hoặc chưa đầy đủ.',
    )
  }

  return data
}

function isWeatherData(
  value: unknown,
): value is WeatherData {
  if (!value || typeof value !== 'object') {
    return false
  }

  const data = value as Partial<WeatherData>
  const current = data.current
  const daily = data.daily

  if (!current || !daily) {
    return false
  }

  if (
    typeof current.time !== 'string' ||
    typeof current.temperature_2m !== 'number' ||
    typeof current.relative_humidity_2m !== 'number' ||
    typeof current.weather_code !== 'number' ||
    typeof current.wind_speed_10m !== 'number'
  ) {
    return false
  }

  if (
    !Array.isArray(daily.time) ||
    !Array.isArray(daily.weather_code) ||
    !Array.isArray(daily.temperature_2m_max) ||
    !Array.isArray(daily.temperature_2m_min)
  ) {
    return false
  }

  if (
    daily.time.length < 7 ||
    daily.weather_code.length < 7 ||
    daily.temperature_2m_max.length < 7 ||
    daily.temperature_2m_min.length < 7
  ) {
    return false
  }

  const validNumbers = [
    ...daily.weather_code,
    ...daily.temperature_2m_max,
    ...daily.temperature_2m_min,
  ].every(
    (item) => typeof item === 'number' && Number.isFinite(item),
  )

  return (
    validNumbers &&
    daily.time.every((item) => typeof item === 'string') &&
    Number.isFinite(current.temperature_2m) &&
    Number.isFinite(current.relative_humidity_2m) &&
    Number.isFinite(current.weather_code) &&
    Number.isFinite(current.wind_speed_10m)
  )
}