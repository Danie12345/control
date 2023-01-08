import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Nav from './components/nav/Nav';
import Container from './components/container/Container';
import Board from './components/board/Board';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Container><Board hideSourceOnDrag /></Container>} />
          <Route path="/components" element={<Container><>Components go here</></Container>} />
          <Route path="/settings" element={<Container><>Settings go here</></Container>} />
        </Routes>
      </div>
    </DndProvider>
  );
}

export default App;
