import { useLocation, useNavigate } from 'react-router-dom';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from 'recharts';

export default function SousScore() {
  const navigate = useNavigate();
  const location = useLocation();
  const scores = location.state?.scores;

  if (!scores) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white text-center">
        <p className="text-red-500 text-xl">Aucun sous-score reçu. Veuillez revenir à l'accueil.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full transition"
        >
          Retour à l’accueil
        </button>
      </div>
    );
  }

  const scoreLabels = {
    pollution: "Pollution",
    temp: "Température",
    pressure: "Pression",
    humidity: "Humidité",
    bruit: "Bruit",
    sun: "Ensoleillement"
  };

  const getColor = (value) => {
    if (value >= 0.8) return 'bg-green-500';
    if (value >= 0.6) return 'bg-yellow-400';
    if (value >= 0.4) return 'bg-orange-400';
    return 'bg-orange-500';
  };

  const getMessage = (key, value) => {
    if (key === "humidity") {
      if (value >= 0.8) return "Humidité idéale";
      if (value <= 0.4) return "Humidité excessive";
      return "Humidité modérée";
    }
    if (key === "temp") {
      if (value >= 0.8) return "Température idéale";
      if (value <= 0.4) return "Trop froid ou trop chaud";
      return "Température acceptable";
    }
    if (key === "pollution") {
      if (value >= 0.8) return "Air pur";
      if (value <= 0.4) return "Pollution élevée";
      return "Air modérément pollué";
    }
    if (key === "bruit") {
      if (value >= 0.8) return "Calme appréciable";
      if (value <= 0.4) return "Environnement bruyant";
      return "Bruit modéré";
    }
    if (key === "pressure") {
      if (value >= 0.8) return "Pression atmosphérique idéale";
      return "Pression hors zone de confort";
    }
    if (key === "sun") {
      if (value >= 0.8) return "Ensoleillement optimal";
      if (value <= 0.4) return "Ciel très couvert";
      return "Lumière naturelle modérée";
    }
    return "";
  };

  const radarData = Object.entries(scores).map(([key, value]) => ({
    subject: scoreLabels[key] || key,
    score: Math.round(value * 100)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Détails des sous-scores</h1>

      <div className="max-w-2xl mx-auto mb-10" style={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Sous-scores" dataKey="score" stroke="#0f766e" fill="#14b8a6" fillOpacity={0.5} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="max-w-xl mx-auto space-y-6 mb-10">
        {Object.entries(scores).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <span className="text-gray-700 font-medium">{scoreLabels[key] || key}</span>
              <span className="text-gray-600 font-semibold">{Math.round(value * 100)}%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-1">
              <div
                className={`h-full ${getColor(value)} transition-all duration-300`}
                style={{ width: `${value * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 italic">{getMessage(key, value)}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate('/')}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-full transition shadow"
        >
          Revenir à l’accueil
        </button>
      </div>
    </div>
  );
}
