import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Recommandations() {
  const location = useLocation();
  const navigate = useNavigate();
  const [reponse, setReponse] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const { lat, lon, bruit, profile, scores } = location.state || {};

    if (!lat || !lon || !bruit || !profile || !scores) {
      setError("Paramètres manquants pour générer les recommandations");
      setLoading(false);
      return;
    }

    
    const payload = {
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      noise_level: parseFloat(bruit),
      profile: profile,
      scores: {
        score_t: scores?.score_t ?? 0,
        score_p: scores?.score_p ?? 0,
        score_b: scores?.score_b ?? 0,
        score_pr: scores?.score_pr ?? 0,
        score_h: scores?.score_h ?? 0,
        score_s: scores?.score_s ?? 0,
        score_w: scores?.score_w ?? 0,
        score_uv: scores?.score_uv ?? 0
        }
    };


    console.log("Payload envoyé à /generate_full_summary :", payload);
    fetch("http://127.0.0.1:8000/generate_full_summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        setReponse(data || {});
        setLoading(false);
      })
      .catch((err) => {
        setError("Erreur lors de la récupération des recommandations.");
        setLoading(false);
      });
  }, [location.state]);

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Recommandations personnalisées</h1>
      <div className="max-w-3xl w-full bg-gray-100 rounded-xl shadow-md p-6 text-gray-800 space-y-4 whitespace-pre-line">
        <div><strong>Résumé :</strong> {reponse.summary || "Résumé non disponible"}</div>
        <div><strong>Indice de bien-être (IB) :</strong> {reponse.IB ?? "Non précisé"}</div>
        <div><strong>Niveau :</strong> {reponse.niveau ?? "Non précisé"}</div>
        <div><strong>Message :</strong> {reponse.message ?? "Aucun message"}</div>
        {reponse.reflection && (
          <div className="italic text-gray-600 border-t pt-4">💡 {reponse.reflection}</div>
        )}
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300"
      >
        Retour à l'accueil
      </button>
    </div>
  );
}
