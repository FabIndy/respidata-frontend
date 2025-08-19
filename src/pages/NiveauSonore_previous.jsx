import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NiveauSonore() {
  const [niveau, setNiveau] = useState(5);
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Niveau sonore sélectionné :", niveau);
    localStorage.setItem("noise", niveau);
    navigate('/ib');
  };

  const getNoiseEmoji = (n) => {
    if (n <= 2) return "🔇";
    if (n <= 6) return "🔉";
    return "🔊";
  };

  const getNoiseMessage = (n) => {
    if (n <= 2) return "Environnement très calme";
    if (n <= 6) return "Niveau sonore modéré";
    return "Attention : bruit élevé";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Quel est le niveau sonore autour de vous ?
      </h1>

      <div className="flex flex-col items-center gap-y-4 mb-6">
        <div className="text-4xl">{getNoiseEmoji(niveau)}</div>
        <div className="text-sm text-gray-600 italic">{getNoiseMessage(niveau)}</div>

        <div className="h-48 w-4 flex items-center justify-center transform rotate-[-90deg]">
          <input
            type="range"
            min="0"
            max="10"
            value={niveau}
            onChange={(e) => setNiveau(e.target.value)}
            className="w-64 h-6 bg-gray-200 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: '#0d9488' }}
          />
        </div>

        <p className="text-sm text-gray-600">
          Niveau sélectionné : <strong>{niveau}</strong>
        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full transition"
      >
        Je valide
      </button>
    </div>
  );
}
