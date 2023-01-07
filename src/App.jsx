import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/nav/Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<>Build here</>} />
        <Route path="/components" element={<>Components go here</>} />
        <Route path="/settings" element={<>Settings go here</>} />
      </Routes>
    </div>
  );
}

export default App;
