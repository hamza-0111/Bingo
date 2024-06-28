import React from 'react';
import BingoBoard from './components/BingoBoard';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="App text-center bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 bg-gray-900 text-white">𝓑𝓲𝓷𝓰𝓸 𝓖𝓪𝓶𝓮</h1>
      <BingoBoard />
    </div>
  );
};

export default App;
