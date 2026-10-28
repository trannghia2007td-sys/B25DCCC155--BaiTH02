import type { TemperatureUnit } from '../types/weather'

export function formatTemperature(
  value: number,
  unit: TemperatureUnit,
): string {
  const converted =
    unit === 'C' ? value : (value * 9) / 5 + 32

  return `${Math.round(converted)}°${unit}`
}