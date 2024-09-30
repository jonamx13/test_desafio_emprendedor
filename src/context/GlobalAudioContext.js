import React, { createContext, useState } from 'react';

// Crear el contexto
export const GlobalAudioContext = createContext();

// Componente proveedor del contexto
const GlobalAudioProvider = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null); // Guarda el audio actualmente en reproducción

  return (
    <GlobalAudioContext.Provider value={{ currentAudio, setCurrentAudio }}>
      {children}
    </GlobalAudioContext.Provider>
  );
};

export default GlobalAudioProvider;