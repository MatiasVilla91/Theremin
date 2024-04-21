// Importa React
import React from 'react';

import './App.css';
import Theremin from './theremin';


// Exporta el componente App
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Theremin React</h1>
      </header>
      <Theremin />
    </div>
  );
}

export default App;
