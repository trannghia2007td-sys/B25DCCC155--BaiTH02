import { useEffect, useRef, useState } from 'react'
import {
  CloudSun,
  RefreshCw,
  Thermometer,
  MapPin,
} from 'lucide-react'

import CityList from './components/CityList'
import CurrentWeather from './components/CurrentWeather'
import ForecastList from './components/ForecastList'

import { cities, type City } from './data/cities'
import { getWeather } from './services/weatherService'
import type { TemperatureUnit, WeatherData } from './types/weather'

import './App.css'

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [unit, setUnit] = useState<TemperatureUnit>('C')

  const requestId = useRef(0)
  const abortController = useRef<AbortController | null>(null)

  async function loadWeather(city: City) {
    // Đánh dấu yêu cầu mới.
    const currentRequestId = ++requestId.current

    // Hủy yêu cầu trước đó nếu vẫn đang chạy.
    abortController.current?.abort()

    const controller = new AbortController()
    abortController.current = controller

    setLoading(true)
    setError('')
    setWeather(null)

    try {
      const data = await getWeather(city, controller.signal)

      // Bỏ qua kết quả nếu đã có yêu cầu mới hơn.
      if (currentRequestId !== requestId.current) {
        return
      }

      setWeather(data)
    } catch (err: unknown) {
      // Không hiển thị lỗi của yêu cầu đã bị hủy.
      if (
        err instanceof Error &&
        err.name === 'AbortError'
      ) {
        return
      }

      // Chỉ xử lý lỗi của yêu cầu mới nhất.
      if (currentRequestId !== requestId.current) {
        return
      }

      setError(
        err instanceof Error
          ? err.message
          : 'Đã xảy ra lỗi không xác định.',
      )
    } finally {
      if (currentRequestId === requestId.current) {
        setLoading(false)
        abortController.current = null
      }
    }
  }

  function handleSelectCity(city: City) {
    setSelectedCity(city)
    void loadWeather(city)
  }

  function handleRetry() {
    if (selectedCity) {
      void loadWeather(selectedCity)
    }
  }

  useEffect(() => {
    document.title = 'Thời tiết Việt Nam'

    return () => {
      // Hủy yêu cầu khi component bị gỡ khỏi giao diện.
      requestId.current += 1
      abortController.current?.abort()
    }
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">
            <CloudSun size={30} />
          </div>

          <div>
            <h1>Thời tiết Việt Nam</h1>
            <p>Thông tin thời tiết 8 thành phố</p>
          </div>
        </div>

        <div className="header-right">
          <span className="api-status">
            <span className="status-dot" />
            Dữ liệu Open-Meteo
          </span>

          <div
            className="unit-switch"
            role="group"
            aria-label="Đơn vị nhiệt độ"
          >
            <button
              type="button"
              className={unit === 'C' ? 'selected' : ''}
              onClick={() => setUnit('C')}
              aria-pressed={unit === 'C'}
            >
              °C
            </button>

            <button
              type="button"
              className={unit === 'F' ? 'selected' : ''}
              onClick={() => setUnit('F')}
              aria-pressed={unit === 'F'}
            >
              °F
            </button>
          </div>
        </div>
      </header>

      <main className="page-content">
        <section className="welcome-section">
          <div>
            <p className="eyebrow">DỰ BÁO THỜI TIẾT</p>

            <h2>Thời tiết hôm nay thế nào?</h2>

            <p>
              Chọn một thành phố để xem tình hình thời tiết
              và dự báo 7 ngày.
            </p>
          </div>

          <div className="welcome-icon">
            <CloudSun size={58} strokeWidth={1.4} />
          </div>
        </section>

        <div className="main-layout">
          <CityList
            selectedCityId={selectedCity?.id ?? null}
            onSelectCity={handleSelectCity}
          />

          <section className="weather-content" aria-live="polite">
            {!selectedCity && (
              <div className="state-card">
                <div className="state-icon">
                  <MapPin size={36} />
                </div>

                <h2>Chọn thành phố</h2>

                <p>
                  Em hãy chọn một trong {cities.length} thành phố
                  trong danh sách để xem thời tiết.
                </p>
              </div>
            )}

            {selectedCity && loading && (
              <div className="state-card" role="status">
                <div className="loading-icon">
                  <RefreshCw size={34} />
                </div>

                <h2>Đang tải thời tiết...</h2>

                <p>
                  Đang lấy dữ liệu cho {selectedCity.name}.
                </p>
              </div>
            )}

            {selectedCity && !loading && error && (
              <div className="state-card error-card" role="alert">
                <div className="state-icon error-icon">
                  <Thermometer size={36} />
                </div>

                <h2>Không tải được dữ liệu</h2>

                <p>{error}</p>

                <button
                  type="button"
                  className="retry-button"
                  onClick={handleRetry}
                >
                  <RefreshCw size={17} />
                  Thử lại
                </button>
              </div>
            )}

            {selectedCity && !loading && !error && weather && (
              <>
                <CurrentWeather
                  weather={weather}
                  cityName={selectedCity.name}
                  unit={unit}
                />

                <ForecastList
                  weather={weather}
                  unit={unit}
                />
              </>
            )}
          </section>
        </div>

        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Thời tiết Việt Nam</p>

          <p>
            Dữ liệu thời tiết:{' '}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noreferrer"
            >
              Open-Meteo
            </a>
          </p>
        </footer>
      </main>
    </div>
  )
}

export default App