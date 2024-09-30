// App.js
import React from 'react';
import './App.css';
import Title from './components/Title';
import AudioList from './components/AudioList'; // Asegúrate de que AudioList esté bien configurado

const App = () => {
    return (
        <div>
            <Title />
            <AudioList />
        </div>
    );
};

export default App;
