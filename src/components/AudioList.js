import React from 'react';
import useFirebaseAudio from '../hooks/useFirebaseAudio';
import AudioPlayer from './AudioPlayer';
import '../styles/AudioList.css';

const AudioList = () => {
    const audioFiles = useFirebaseAudio(); // Usa el hook para obtener los archivos de audio

    return (
        <div className="audio-list">
            {audioFiles.length > 0 ? (
                audioFiles.map((audio) => (
                    <AudioPlayer key={audio.name} audio={audio} />
                ))
            ) : (
                <p>No audio files found.</p>
            )}
        </div>
    );
};

export default AudioList;