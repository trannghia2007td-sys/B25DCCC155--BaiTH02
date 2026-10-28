import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react'

interface Props {
  type: 'empty' | 'loading' | 'error'
  cityName?: string
  message?: string
  onRetry?: () => void
}

export default function WeatherState({
  type,
  cityName,
  message,
  onRetry,
}: Props) {
  if (type === 'empty') {
    return (
      <div className="state-card">
        <div className="state-icon">
          <MapPin size={34} />
        </div>

        <h2>Chọn thành phố</h2>

        <p>
          Chọn một trong 8 thành phố để xem thời tiết
          hiện tại và dự báo 7 ngày.
        </p>
      </div>
    )
  }

  if (type === 'loading') {
    return (
      <div className="state-card" role="status">
        <div className="loading-icon">
          <RefreshCw size={32} />
        </div>

        <h2>Đang tải thời tiết...</h2>

        <p>Đang lấy dữ liệu cho {cityName}.</p>
      </div>
    )
  }

  return (
    <div className="state-card" role="alert">
      <div className="state-icon error-icon">
        <AlertTriangle size={34} />
      </div>

      <h2>Không tải được dữ liệu</h2>

      <p>{message || 'Đã xảy ra lỗi khi tải dữ liệu.'}</p>

      <button
        className="retry-button"
        type="button"
        onClick={onRetry}
      >
        <RefreshCw size={16} />
        Thử lại
      </button>
    </div>
  )
}