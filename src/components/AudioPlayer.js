import React, { useState, useEffect, useRef, useContext } from 'react';
import '../styles/AudioPlayer.css';
import Icon from '@mdi/react';
import { mdiPlay, mdiPause, mdiStop } from '@mdi/js';
import { GlobalAudioContext } from '../context/GlobalAudioContext';

const AudioPlayer = ({ audio }) => {
  const { currentAudio, setCurrentAudio } = useContext(GlobalAudioContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio(audio.url));

  const togglePlayPause = () => {
    if (currentAudio && currentAudio !== audioRef.current) {
      currentAudio.pause();
      setCurrentAudio(null); // Resetea el audio actual si hay uno diferente reproduciéndose
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setCurrentAudio(audioRef.current); // Establece este audio como el actual
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    audioElement.addEventListener('loadedmetadata', () => {
      setDuration(audioElement.duration);
    });

    audioElement.addEventListener('timeupdate', () => {
      setCurrentTime(audioElement.currentTime);
    });

    return () => {
      audioElement.pause();
      audioElement.removeEventListener('loadedmetadata', () => {});
      audioElement.removeEventListener('timeupdate', () => {});
    };
  }, []);

  useEffect(() => {
    if (currentAudio !== audioRef.current) {
      stopAudio();
    }
  }, [currentAudio]);

  const handleProgress = () => {
    return (currentTime / duration) * 100;
  };

  const handleProgressClick = (e) => {
    const progressContainer = e.target.closest('.progress-bar');
    const clickPosition = e.clientX - progressContainer.getBoundingClientRect().left;
    const percentage = clickPosition / progressContainer.clientWidth;
    audioRef.current.currentTime = percentage * duration;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const progressContainer = e.target.closest('.progress-bar');

    const updateTime = (event) => {
      const clickPosition = event.clientX - progressContainer.getBoundingClientRect().left;
      const percentage = clickPosition / progressContainer.clientWidth;
      audioRef.current.currentTime = percentage * duration;
      setCurrentTime(audioRef.current.currentTime);
    };

    const mouseUpHandler = () => {
      window.removeEventListener('mousemove', updateTime);
      window.removeEventListener('mouseup', mouseUpHandler);
    };

    window.addEventListener('mousemove', updateTime);
    window.addEventListener('mouseup', mouseUpHandler);
  };

  const remainingTime = duration - currentTime;
  const formattedCurrentTime = `${Math.floor(currentTime / 60)}:${('0' + Math.floor(currentTime % 60)).slice(-2)}`;
  const formattedRemainingTime = `-${Math.floor(remainingTime / 60)}:${('0' + Math.floor(remainingTime % 60)).slice(-2)}`;

  return (
    <div className="audio-player-container">
      <span className="audio-title">{audio.name.replace('.mp3', '')}</span>
      <div className="audio-player">
        <button className="play-button" onClick={togglePlayPause}>
          {isPlaying ? <Icon path={mdiPause} /> : <Icon path={mdiPlay} />}
        </button>
        <button className="stop-button" onClick={stopAudio}>
          <Icon path={mdiStop} />
        </button>
        <div className="progress-container">
          <div className="time-labels">
            <span className="current-time">{formattedCurrentTime}</span>
            <span className="remaining-time">{formattedRemainingTime}</span>
          </div>
          <div className="progress-bar" onClick={handleProgressClick} onMouseDown={handleMouseDown}>
            <div className="progress" style={{ width: `${handleProgress()}%` }}></div>
            <div className="progress-circle" style={{ left: `${handleProgress()}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
