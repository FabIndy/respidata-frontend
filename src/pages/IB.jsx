import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const API_BASE = import.meta.env.VITE_API_BASE_URL;



export default function IB() {
  const navigate = useNavigate();
  const [ibScore, setIbScore] = useState(null);
  const [scores, setScores] = useState(null);
  const [rawValues, setRawValues] = useState(null);
  const [units, setUnits] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ville = localStorage.getItem("ville");
    const profil = localStorage.getItem("profil") || "standard";
    const bruit = localStorage.getItem("noise") || 5;

    if (!ville) {
      alert("No city selected. Please try again.");
      navigate('/ville');
      return;
    }

    const fetchCoordinatesAndIB = async () => {
      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?city=${ville}&format=json`);
        const geoData = await geoRes.json();
        if (!geoData.length) throw new Error("City not found");

        const lat = geoData[0].lat;
        const lon = geoData[0].lon;

        localStorage.setItem("lat", lat);
        localStorage.setItem("lon", lon);
        localStorage.setItem("bruit", bruit);
        localStorage.setItem("profile", profil);


        const response = await fetch(
          `${API_BASE}/calculate_ib?lat=${lat}&lon=${lon}&noise_level=${bruit}&profile=${profil}`
        );

        if (!response.ok) throw new Error("Erreur lors de l'appel à l'API backend");

        const data = await response.json();
        console.log("✅ Données reçues :", data);
        setIbScore(data.IB);
        setScores(data.scores);
        setRawValues(data.raw_values);
        setUnits(data.units);
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
    const baseColor = "#14b8a6";
    const opacity = 0.3 + 0.007 * score;
    return {
      borderColor: baseColor,
      color: baseColor,
      boxShadow: `0 0 0 8px rgba(20, 184, 166, ${opacity})`,
      transition: "all 0.4s ease",
    };
  };

  const handleNavigateSousScores = () => {
    if (scores && ibScore !== null && rawValues && units) {
      navigate('/sous_score', {
        state: {
          scores,
          ibScore,
          rawValues,
          units
        }
      });
    } else {
      alert("Scores non disponibles.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-white to-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 tracking-tight">
        Your Well-Being Score
      </h1>

      {loading ? (
        <p className="text-gray-500 mb-8">Processing...</p>
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
        <p className="text-red-500 mb-8">Index unavailable. Please try again.</p>
      )}

      <button
        onClick={handleNavigateSousScores}
        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 shadow"
      >
        View detailed scores
      </button>
    </div>
  );
}
