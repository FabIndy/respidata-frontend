import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function IB() {
  const [ibScore, setIbScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Appel à l'API avec valeurs fixes
    fetch("http://localhost:8000/calculate_ib?lat=39.95&lon=-86.26&noise_level=9&profile=Sportif%20asthmatique")
      .then((res) => res.json())
      .then((json) => {
        console.log("Réponse backend :", json);
        setIbScore(json.IB); // On récupère le score réel
      })
      .catch((err) => {
        console.error("Erreur d’appel à /calculate_ib :", err);
        setIbScore(null); // pour ne pas boucler indéfiniment
      });
  }, []);

  const getColor = (score) => {
    if (score >= 80) return "text-green-600 ring-green-300";
    if (score >= 60) return "text-yellow-500 ring-yellow-300";
    return "text-red-500 ring-red-300";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-white to-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 tracking-tight">
        Votre Indice de Bien-Être
      </h1>

      {ibScore !== null ? (
        <div
          className={`w-48 h-48 flex items-center justify-center rounded-full ring-8 ${getColor(
            ibScore
          )} shadow-xl transition-all duration-500 ease-out mb-8`}
        >
          <span className="text-5xl font-extrabold">{ibScore}<span className="text-2xl align-top">%</span></span>
        </div>
      ) : (
        <p className="text-gray-500 mb-8">Calcul en cours...</p>
      )}

      <button
        onClick={() => navigate('/sous_score')}
        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 shadow"
      >
        Voir les sous-scores
      </button>
    </div>
  );
}
