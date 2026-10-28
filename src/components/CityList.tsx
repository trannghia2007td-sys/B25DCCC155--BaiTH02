import { MapPin } from 'lucide-react'
import { cities, type City } from '../data/cities'

interface Props {
  selectedCityId: string | null
  onSelectCity: (city: City) => void
}

export default function CityList({
  selectedCityId,
  onSelectCity,
}: Props) {
  return (
    <aside className="city-panel">
      <div className="panel-heading">
        <MapPin size={19} />
        <h2>Thành phố</h2>
      </div>

      <p className="panel-description">
        Chọn thành phố để xem thời tiết
      </p>

      <div className="city-list">
        {cities.map((city) => (
          <button
            key={city.id}
            type="button"
            className={`city-button ${
              selectedCityId === city.id ? 'active' : ''
            }`}
            onClick={() => onSelectCity(city)}
          >
            <span>{city.name}</span>
            <span aria-hidden="true">›</span>
          </button>
        ))}
      </div>
    </aside>
  )
}