import React from 'react';
import './styles/App.css';
import Title from './components/Title';
import AudioList from './components/AudioList';
import GlobalAudioProvider from './context/GlobalAudioContext';
import BackgroundBokeh from './components/BackgroundBokeh';

const App = () => {
    return (
        <GlobalAudioProvider>
            <Title />
            <AudioList />
            <BackgroundBokeh />
        </GlobalAudioProvider>
    );
};

export default App;
