import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function SyntheseGlobale() {
  const location = useLocation();
  const navigate = useNavigate();
  const scores = location.state?.scores;
  const ibScore = location.state?.ibScore;

  useEffect(() => {
    if (!scores || ibScore === undefined || ibScore === null) {
      alert("Données manquantes. Veuillez recommencer.");
      navigate('/');
    }
  }, [scores, ibScore, navigate]);

  const getSynthese = () => {
    const pollution = scores.pollution * 100;
    const bruit = scores.bruit * 100;
    const sun = scores.sun * 100;
    const wind = scores.wind * 100;
    const uv = scores.uv * 100;

    let message = "";

    if (ibScore >= 80) {
      message += "Votre environnement est très favorable aujourd’hui. ";
    } else if (ibScore >= 60) {
      message += "Votre environnement est globalement correct, avec quelques points à surveiller. ";
    } else {
      message += "Votre environnement est peu favorable actuellement. Prenez soin de vous. ";
    }

    if (sun < 60) {
      message += "Essayez de vous exposer à la lumière naturelle, même brièvement. ";
    }

    if (uv > 90) {
      message += "L’indice UV est très élevé : évitez l’exposition prolongée au soleil sans protection. ";
    }

    if (bruit < 60) {
      message += "Le bruit ambiant peut perturber votre concentration. Trouvez un moment de calme si possible. ";
    }

    if (pollution < 60) {
      message += "Limitez l’exposition extérieure et aérez avec précaution. ";
    }

    if (wind < 40) {
      message += "L’absence de vent peut favoriser l’accumulation de polluants. Aérez avec prudence. ";
    } else if (wind > 95) {
      message += "Vent optimal. L’environnement est bien ventilé, c’est favorable. ";
    }

    message += "Dans tous les cas, bouger un peu chaque jour, parler avec quelqu’un, et éviter les écrans pendant quelques instants peut significativement améliorer votre humeur et votre bien-être mental.";

    return message;
  };

  return (
    <div className="min-h-screen bg-white px-6 py-4 flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Synthèse Bien-Être</h1>

      <div className="bg-[#f0fdfa] border-l-4 border-[#14b8a6] text-gray-800 p-4 mb-6 rounded-md shadow-sm max-w-2xl">
        <p className="text-md font-medium mb-2">Résumé personnalisé</p>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{getSynthese()}</p>
      </div>

      <button
        className="bg-[#14b8a6] text-white px-6 py-2 rounded-full hover:bg-teal-700 transition"
        onClick={() => navigate(-1)}
      >
        Retour aux recommandations
      </button>
    </div>
  );
}
