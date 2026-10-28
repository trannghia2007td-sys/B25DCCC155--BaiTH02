import type { WeatherDescription } from '../types/weather'

export function getWeatherDescription(
  code: number,
): WeatherDescription {
  if (code === 0) {
    return { description: 'Trời quang', icon: '☀️' }
  }

  if (code === 1) {
    return { description: 'Ít mây', icon: '🌤️' }
  }

  if (code === 2) {
    return { description: 'Mây rải rác', icon: '⛅' }
  }

  if (code === 3) {
    return { description: 'Nhiều mây', icon: '☁️' }
  }

  if (code === 45 || code === 48) {
    return { description: 'Sương mù', icon: '🌫️' }
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return { description: 'Mưa phùn', icon: '🌦️' }
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { description: 'Có mưa', icon: '🌧️' }
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { description: 'Có tuyết', icon: '❄️' }
  }

  if ([95, 96, 99].includes(code)) {
    return { description: 'Có dông', icon: '⛈️' }
  }

  return {
    description: 'Thời tiết thay đổi',
    icon: '🌡️',
  }
}