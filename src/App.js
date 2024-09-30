import React from 'react';
import './styles/App.css';
import Title from './components/Title';
import AudioList from './components/AudioList';
import GlobalAudioProvider from './context/GlobalAudioContext'; // Importa el proveedor de contexto

// Componente principal de la aplicación
const App = () => {
  return (
    <GlobalAudioProvider>
      <Title />
      <AudioList />
    </GlobalAudioProvider>
  );
};

export default App;
