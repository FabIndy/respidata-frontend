import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profil() {
  const navigate = useNavigate();
  const profils = [
    "standard",
    "standard with asthma",
    "active",
    "active with asthma"
  ];

  const [profil, setProfil] = useState(localStorage.getItem("profil") || "");

  const handleSubmit = () => {
    if (profil) {
      const profilsValidés = [
        "standard",
        "standard with asthma",
        "active",
        "active with asthma"
      ];
      const profilFinal = profilsValidés.includes(profil) ? profil : "standard";
      localStorage.setItem("profil", profilFinal);
      navigate('/niveau_sonore');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-white to-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Quel est votre profil ?</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mb-8">
        {profils.map((p) => (
          <button
            key={p}
            onClick={() => setProfil(p)}
            className={`px-4 py-2 rounded-lg border transition-all duration-300 font-medium shadow-sm ${
              profil === p
                ? "bg-teal-600 text-white border-teal-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!profil}
        className={`px-6 py-2 rounded-full font-semibold shadow transition-all duration-300 ${
          profil
            ? "bg-teal-600 text-white hover:bg-teal-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Confirm
      </button>
    </div>
  );
}
