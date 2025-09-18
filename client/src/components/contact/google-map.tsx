import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Icône personnalisée chartreuse
const customIcon = L.divIcon({
  className: 'custom-marker',
  html: `
    <div style="
      background-color: #BAFF39;
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 3px 10px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        transform: rotate(45deg);
        color: #000;
        font-weight: bold;
        font-size: 14px;
      ">🏠</div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

export default function GoogleMap() {
  // Coordonnées de Saumur, Maine-et-Loire
  const saumurCoordinates: [number, number] = [47.2600, -0.0769];

  useEffect(() => {
    // Fix pour les icônes Leaflet après le chargement
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);
  
  if (typeof window === 'undefined') {
    return (
      <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-600 flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Chargement de la carte...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-600">
      <MapContainer
        center={saumurCoordinates}
        zoom={12}
        style={{ height: "384px", width: "100%" }}
        className="leaflet-map"
        scrollWheelZoom={true}
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={saumurCoordinates} icon={customIcon}>
          <Popup>
            <div className="text-center p-2">
              <div className="font-bold text-lg text-gray-800 mb-1">Hors-Série.immo</div>
              <div className="text-gray-600 text-sm">15 Rue des Tonneliers</div>
              <div className="text-gray-600 text-sm">49400 Saumur, France</div>
              <div className="text-green-600 font-semibold text-xs mt-2">
                📞 +33 2 41 50 XX XX
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
