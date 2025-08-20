import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Ville() {
  const [ville, setVille] = useState('');
  const [autoDetecting, setAutoDetecting] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Tentative de détection automatique de la ville
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            const data = await res.json();
            const city = data.address.city || data.address.town || data.address.village || '';

            if (city) {
              console.log("📍 Ville détectée :", city);
              setVille(city);
            }
          } catch (error) {
            console.warn("Erreur lors du géocodage inverse :", error);
          } finally {
            setAutoDetecting(false);
          }
        },
        (error) => {
          console.warn("Géolocalisation refusée :", error);
          setAutoDetecting(false);
        }
      );
    } else {
      console.warn("Géolocalisation non disponible.");
      setAutoDetecting(false);
    }
  }, []);

  const handleSubmit = () => {
    console.log("Ville choisie :", ville);
    localStorage.setItem("ville", ville);
    navigate('/profil');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Enter your city</h1>
      <p className="text-gray-500 mb-6">
        By default, your current location will be used as the city.
      </p>
      {autoDetecting && (
        <p className="text-sm text-gray-400 italic mb-2">Detecting location…</p>
      )}
      <input
        type="text"
        value={ville}
        onChange={(e) => setVille(e.target.value)}
        placeholder="Lyon"
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-64 text-center"
      />
      <button
        onClick={handleSubmit}
        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full transition"
        disabled={!ville}
      >
        Confirm
      </button>
    </div>
  );
}
