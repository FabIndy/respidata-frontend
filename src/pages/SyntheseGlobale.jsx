import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SyntheseGlobale() {
  const location = useLocation();
  const navigate = useNavigate();
  const scores = location.state?.scores;
  const ibScore = location.state?.ibScore;

  const [profil, setProfil] = useState("Standard");

  useEffect(() => {
    if (!scores || ibScore === undefined || ibScore === null) {
      alert("Données manquantes. Veuillez recommencer.");
      navigate('/');
    }
    const profilLS = localStorage.getItem("profil");
    if (profilLS) setProfil(profilLS);
  }, [scores, ibScore, navigate]);

  const randomChoice = (options) => options[Math.floor(Math.random() * options.length)];

  const getSynthese = () => {
    const pollution = scores.pollution * 100;
    const bruit = scores.bruit * 100;
    const sun = scores.sun * 100;
    const wind = scores.wind * 100;
    const uv = scores.uv * 100;

    let message = "";

    const introOptions = ibScore >= 80
      ? [
          "Votre environnement est très favorable aujourd’hui. ",
          "Journée idéale pour prendre soin de vous : l’air est bon et les conditions sont réunies. ",
          "Tout est aligné pour une belle journée : profitez-en pleinement. "
        ]
      : ibScore >= 60
      ? [
          "Votre environnement est globalement correct, avec quelques points à surveiller. ",
          "Quelques petits éléments à surveiller, mais globalement les conditions sont bonnes. ",
          "Ce n’est pas parfait, mais largement vivable avec quelques ajustements. "
        ]
      : [
          "Votre environnement est peu favorable actuellement. Prenez soin de vous. ",
          "Conditions peu optimales : adaptez votre rythme et écoutez votre corps. ",
          "Il va falloir composer avec un environnement contraignant. Priorisez votre bien-être. "
        ];

    message += randomChoice(introOptions);

    if (sun < 60) {
      message += profil.includes("Sportif")
        ? randomChoice([
            "Moins de lumière aujourd’hui : privilégie un entraînement en extérieur pour capter un peu de lumière naturelle. ",
            "Peu de soleil. Essaie de bouger à l’extérieur, même brièvement, pour stimuler ton énergie. "
          ])
        : randomChoice([
            "Essayez de vous exposer à la lumière naturelle, même brièvement. Cela soutient votre humeur. ",
            "Manque de lumière : une courte promenade pourrait vous faire beaucoup de bien. "
          ]);
    }

    if (uv > 90) {
      message += profil.includes("Asthmatique")
        ? randomChoice([
            "L’indice UV est très élevé. Préférez des sorties tôt le matin ou en fin de journée. Couvrez bien vos voies respiratoires. ",
            "Soleil intense. Évitez de sortir entre 12h et 16h, et utilisez une protection adaptée. "
          ])
        : randomChoice([
            "L’indice UV est très élevé : évitez l’exposition prolongée au soleil sans protection. ",
            "Pensez à vous protéger du soleil aujourd’hui. Les UV sont au plus haut. "
          ]);
    }

    if (bruit < 60) {
      message += profil.includes("Asthmatique")
        ? randomChoice([
            "Ambiance sonore élevée. Cela peut intensifier votre charge mentale. Prévoyez des temps calmes. ",
            "Le bruit ambiant pourrait vous fatiguer plus vite. Pensez à des pauses au calme. "
          ])
        : randomChoice([
            "Le bruit ambiant peut perturber votre concentration. Trouvez un moment de calme si possible. ",
            "Environnement sonore peu propice à la détente. Une bulle de silence peut faire la différence. "
          ]);
    }

    if (pollution < 60) {
      message += profil.includes("Asthmatique")
        ? randomChoice([
            "Air de qualité moyenne. Évitez les zones à fort trafic. Aérez votre intérieur si nécessaire. ",
            "Qualité de l’air moyenne. Restez prudent si vous ressentez une gêne. "
          ])
        : randomChoice([
            "Limitez l’exposition extérieure et aérez avec précaution. ",
            "Air un peu chargé aujourd’hui : évitez de trop vous exposer si vous êtes sensible. "
          ]);
    }

    if (wind < 40) {
      message += randomChoice([
        "Peu de vent : les polluants ont tendance à stagner. Soyez vigilant si vous êtes sensible. ",
        "L’air est peu brassé aujourd’hui. Attention si vous êtes sujet aux allergies ou à l’asthme. "
      ]);
    } else if (wind > 95) {
      message += randomChoice([
        "Vent optimal. L’environnement est bien ventilé, c’est favorable. ",
        "Bonne aération naturelle aujourd’hui. C’est un atout pour votre bien-être. "
      ]);
    }

    message += randomChoice([
      "Enfin, pensez à bouger un peu chaque jour, à socialiser hors écran, et à accorder quelques minutes à votre bien-être mental. Cela fait une vraie différence. ",
      "Un peu d’activité, un brin de contact humain réel et quelques respirations profondes peuvent transformer votre journée. ",
      "Faites-vous du bien : marchez, appelez un proche, coupez les écrans. Cela vous aidera plus que vous ne l’imaginez. "
    ]);

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
        onClick={() => navigate('/respibot')}
      >
        Interroger RespiBot
      </button>
    </div>
  );
}
