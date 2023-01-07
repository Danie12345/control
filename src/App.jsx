import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Container from './components/container/Container';
import Board from './components/board/Board';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Container><Board /></Container>} />
        <Route path="/components" element={<Container><>Components go here</></Container>} />
        <Route path="/settings" element={<Container><>Settings go here</></Container>} />
      </Routes>
    </div>
  );
}

export default App;
