import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IB() {
  const navigate = useNavigate();
  const [ibScore, setIbScore] = useState(null);
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ville = localStorage.getItem("ville");
    const profil = localStorage.getItem("profil") || "Standard";
    const bruit = localStorage.getItem("noise") || 5;

    if (!ville) {
      alert("Ville non définie. Veuillez recommencer.");
      navigate('/ville');
      return;
    }

    const fetchCoordinatesAndIB = async () => {
      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?city=${ville}&format=json`);
        const geoData = await geoRes.json();
        if (!geoData.length) throw new Error("Ville introuvable");

        const lat = geoData[0].lat;
        const lon = geoData[0].lon;

        const response = await fetch(
          `http://localhost:8000/calculate_ib?lat=${lat}&lon=${lon}&noise_level=${bruit}&profile=${profil}`
        );

        if (!response.ok) throw new Error("Erreur lors de l'appel à l'API backend");

        const data = await response.json();
        console.log("✅ Données reçues :", data);
        setIbScore(data.IB);
        setScores(data.scores);
      } catch (err) {
        console.error("Erreur :", err);
        alert("Erreur pendant le calcul de l’Indice de Bien-être.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinatesAndIB();
  }, [navigate]);

  const getRingStyle = (score) => {
    const baseColor = "#14b8a6"; // bleu-vert RespiData
    const opacity = 0.3 + 0.007 * score; // de 0.3 à 1
    const shadow = score >= 80 ? "shadow-2xl" : score >= 50 ? "shadow-xl" : "shadow-md";
    return {
      borderColor: baseColor,
      color: baseColor,
      boxShadow: `0 0 0 8px rgba(20, 184, 166, ${opacity})`,
      transition: "all 0.4s ease",
    };
  };

  const handleNavigateSousScores = () => {
    if (scores && ibScore !== null) {
      navigate('/sous_score', { state: { scores, ibScore } });
    } else {
      alert("Scores non disponibles.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-white to-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 tracking-tight">
        Votre Indice de Bien-Être
      </h1>

      {loading ? (
        <p className="text-gray-500 mb-8">Calcul en cours...</p>
      ) : ibScore !== null ? (
        <div
          className={`w-48 h-48 flex items-center justify-center rounded-full transition-all duration-500 mb-8`}
          style={getRingStyle(ibScore)}
        >
          <span className="text-5xl font-extrabold">
            {ibScore}<span className="text-2xl align-top">%</span>
          </span>
        </div>
      ) : (
        <p className="text-red-500 mb-8">Impossible d’afficher l’indice. Veuillez réessayer.</p>
      )}

      <button
        onClick={handleNavigateSousScores}
        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 shadow"
      >
        Voir les sous-scores
      </button>
    </div>
  );
}
