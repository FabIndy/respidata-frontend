import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Ville from './pages/Ville';
import Profil from './pages/Profil';
import NiveauSonore from './pages/NiveauSonore';
import IB from './pages/IB';
import SousScore from './pages/SousScore';
import Recommandations from './pages/Recommandations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ville" element={<Ville />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/niveau_sonore" element={<NiveauSonore />} />
        <Route path="/ib" element={<IB />} />
        <Route path="/sous_score" element={<SousScore />} />
        <Route path="/recommandations" element={<Recommandations />} />
      </Routes>
    </Router>
  );
}

export default App;
