import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';


import PathfindingVisualizer from './components/PathFinding/Page';

import SortingVisualiser from './components/SortingVisualiser/SortingVisualiser';

const App = () => {
  return (
    <Router>
      <div className='bg-zinc-800 h-screen w-full'>
      <div className="navbar">
        <nav className=' text-white text-xl flex justify-center gap-10 py-3 '>
          <NavLink  
            to="/sorting-visualizer" 
            className={({ isActive }) => isActive ? 'nav-link active text-yellow-500' : 'nav-link'}
          >
            Sorting Visualizer
          </NavLink>

          <NavLink 
            to="/pathfinder-visualizer" 
            className={({ isActive }) => isActive ? 'nav-link active text-yellow-500' : 'nav-link'}
          >
            Pathfinder Visualizer
          </NavLink>
        </nav>
      </div>

      <Routes>
      <Route path="/" element={<SortingVisualiser />} />
        <Route path="/sorting-visualizer" element={<SortingVisualiser />} />
        <Route path="/pathfinder-visualizer" element={<PathfindingVisualizer />} />
      </Routes>
      </div>
      
    </Router>
  );
};

export default App;

