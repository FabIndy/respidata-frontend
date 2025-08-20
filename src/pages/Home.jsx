import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_respidata.png';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Appel simple pour tester la connexion au backend
    fetch(`${API_BASE}/generate_summary`)
      .then((res) => res.json())
      .then((data) => console.log("Réponse backend :", data))
      .catch((err) => console.error("Erreur de connexion au backend :", err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <img src={logo} alt="Logo RespiData" className="w-64 md:w-72 mb-6" />
      <p className="text-center text-gray-600 max-w-md mb-6 text-lg">
        Measure how your world shapes your well-being.
      </p>
      <button
        onClick={() => navigate('/ville')}
        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300"
      >
        Let's go !
      </button>
    </div>
  );
}
