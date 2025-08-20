import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function SousScore() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};
  const scores = state.scores || JSON.parse(localStorage.getItem("scores") || "{}");
  const rawValues = state.rawValues || JSON.parse(localStorage.getItem("raw_values") || "{}");
  const ibScore = state.ibScore || localStorage.getItem("IB");
  const profil = state.profile || localStorage.getItem("profile");

  const lat = state.lat || localStorage.getItem("lat");
  const lon = state.lon || localStorage.getItem("lon");
  const bruit = state.bruit || localStorage.getItem("bruit");

  const labels = {
    temp: "Temperature",
    pollution: "Pollution",
    pressure: "Pressure",
    humidity: "Humidity",
    bruit: "Noise",
    sun: "Sun",
    wind: "Wind",
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

    let displayedValue = value;

    if (typeof value === 'number') {
      displayedValue = Number.isInteger(value)
        ? value
        : value.toFixed(2).replace(/\.?0+$/, ''); // max 2 décimales, pas de ".00"
    }

    return `${displayedValue} ${suffix}`.trim();
  };


  const formatScore = (value) => {
    if (value === undefined || value === null) return "—";
    return `${Math.round(value * 100)} %`;
  };

  const rows = [
    "temp", "pollution", "pressure", "humidity",
    "bruit", "sun", "wind", "uv"
  ];

  const radarData = rows.map(key => ({
    subject: labels[key],
    score: scores[key] !== undefined ? Math.round(scores[key] * 100) : 0
  }));

  return (
    <div className="min-h-screen bg-white px-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Détail des scores</h1>
      <div className="bg-gray-100 rounded-xl p-6 shadow-md max-w-2xl w-full mb-6">
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
                <td className="text-right py-2">{formatScore(scores[key])}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 text-right font-semibold">
          IB Global : {ibScore ? `${Math.round(parseFloat(ibScore))} %` : "—"}
        </div>
      </div>
      <div className="w-full max-w-2xl h-72 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Score" dataKey="score" stroke="#0f766e" fill="#0f766e" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <button
        onClick={() => navigate("/recommandations", {
          state: { lat, lon, bruit, profile: profil, scores }
        })}
        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300"
      >
        View recommendations
      </button>
    </div>
  );
}