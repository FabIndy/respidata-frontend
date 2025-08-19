import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profil() {
  const [profil, setProfil] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Profil sélectionné :", profil);
    if (profil) {
      navigate('/niveau_sonore');
    }
  };

  const profils = [
    "Standard",
    "Standard asthmatique",
    "Sportif",
    "Sportif asthmatique"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Quel est votre profil ?</h1>
      <div className="flex flex-col space-y-3 mb-6 w-72">
        {profils.map((p) => (
          <button
            key={p}
            onClick={() => setProfil(p)}
            className={`border px-4 py-2 rounded-full text-center ${
              profil === p
                ? 'bg-teal-600 text-white font-bold'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className={`${
          profil ? 'bg-gray-800 hover:bg-gray-900' : 'bg-gray-400 cursor-not-allowed'
        } text-white px-6 py-2 rounded-full transition`}
        disabled={!profil}
      >
        Je valide
      </button>
    </div>
  );
}
