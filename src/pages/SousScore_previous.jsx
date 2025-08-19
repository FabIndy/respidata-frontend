import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SousScore() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};

  // Lecture via state ou localStorage
  const scores = state.scores || JSON.parse(localStorage.getItem("scores") || "{}");
  const rawValues = state.rawValues || JSON.parse(localStorage.getItem("raw_values") || "{}");
  const ibScore = state.ibScore || localStorage.getItem("IB");
  const profil = state.profile || localStorage.getItem("profile");

  const lat = state.lat || localStorage.getItem("lat");
  const lon = state.lon || localStorage.getItem("lon");
  const bruit = state.bruit || localStorage.getItem("bruit");

  // Mapping pour affichage lisible
  const labels = {
    temp: "Température",
    pollution: "Pollution",
    pressure: "Pression",
    humidity: "Humidité",
    bruit: "Bruit",
    sun: "Lumière",
    wind: "Vent",
    uv: "UV"
  };

  const units = {
    temp: "°C",
    pollution: "AQI",
    pressure: "hPa",
    humidity: "%",
    bruit: "dB",
    sun: "%",
    wind: "km/h",
    uv: ""
  };

  const format = (value, key) => {
    if (value === undefined || value === null) return "—";
    const suffix = units[key] || "";
    return `${value} ${suffix}`.trim();
  };

  const rows = [
    "temp", "pollution", "pressure", "humidity",
    "bruit", "sun", "wind", "uv"
  ];

  return (
    <div className="min-h-screen bg-white px-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Détail des scores</h1>
      <div className="bg-gray-100 rounded-xl p-6 shadow-md max-w-2xl w-full mb-8">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th className="text-left pb-2">Mesure</th>
              <th className="text-right pb-2">Valeur</th>
              <th className="text-right pb-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((key) => (
              <tr key={key} className="border-t">
                <td className="py-2">{labels[key]}</td>
                <td className="text-right py-2">{format(rawValues[key], key)}</td>
                <td className="text-right py-2">{scores[key] !== undefined ? scores[key].toFixed(2) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 text-right font-semibold">
          IB Global : {ibScore ? parseFloat(ibScore).toFixed(3) : "—"}
        </div>
      </div>
      <button
        onClick={() => navigate("/recommandations", {
          state: { lat, lon, bruit, profile: profil, scores }
        })}
        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300"
      >
        Voir les recommandations
      </button>
    </div>
  );
}