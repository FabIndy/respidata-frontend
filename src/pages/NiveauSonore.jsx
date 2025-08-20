import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




export default function NiveauSonore() {
  const [niveau, setNiveau] = useState(5);
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem("noise", niveau);
    navigate('/ib');
  };

  const getNoiseMessage = (n) => {
    if (n <= 2) return "Very quiet environment, ideal for rest.";
    if (n <= 6) return "Moderate noise, generally acceptable environment.";
    return "High noise level, be cautious with prolonged exposure.";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        How noisy is your environment ?
      </h1>

      <div className="w-full max-w-md flex flex-col items-center gap-y-6">
        <div className="w-full">
          <input
            type="range"
            min="0"
            max="10"
            value={niveau}
            onChange={(e) => setNiveau(Number(e.target.value))}
            className="w-full appearance-none h-3 rounded-full bg-gray-200"
            style={{
              background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${(niveau) * 10}%, #e5e7eb ${(niveau) * 10}%, #e5e7eb 100%)`,
              accentColor: '#14b8a6'
            }}
          />
        </div>

        <div className="text-sm text-gray-600 text-center px-4">
          {getNoiseMessage(niveau)}
        </div>

        <div className="text-sm text-gray-700">
          Selected level : <strong>{niveau}</strong>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full transition mt-4"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
