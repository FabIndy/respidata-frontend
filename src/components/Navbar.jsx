import { Link } from 'react-router-dom';
import logo from '../assets/logo_respidata.png';

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow px-4 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Logo RespiData" className="w-8 h-8" />
        <span className="font-bold text-lg text-gray-800">RespiData</span>
      </Link>
      <div className="flex space-x-4 text-sm text-teal-600 font-semibold">
        <Link to="/ville" className="hover:underline">Ville</Link>
        <Link to="/profil" className="hover:underline">Profil</Link>
        <Link to="/niveau_sonore" className="hover:underline">Niveau sonore</Link>
        <Link to="/ib" className="hover:underline">Calcul de l’IB</Link>
        <Link to="/sous_score" className="hover:underline">Sous-scores</Link>
        <Link to="/recommandations" className="hover:underline">Recommandations</Link>
      </div>
    </nav>
  );
}
