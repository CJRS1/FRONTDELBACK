import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Usuario from '../src/components/TablaUsuarios'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Usuario />} />
      </Routes>
    </Router>
  );
}

export default App;
