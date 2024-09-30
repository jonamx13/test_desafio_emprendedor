import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import app from '../firebase/firebaseConfig';
import AudioPlayer from './AudioPlayer';
import '../styles/AudioList.css';

const AudioList = () => {
    const [audioFiles, setAudioFiles] = useState([]);
    const storage = getStorage(app); // Usa 'app' aquí

    useEffect(() => {
        const fetchAudioFiles = async () => {
            const audioListRef = ref(storage, 'audios/');
            try {
                const res = await listAll(audioListRef); // Lista todos los archivos en la carpeta
                const audioPromises = res.items.map(async (item) => {
                    const url = await getDownloadURL(item); // Obtiene la URL de descarga del archivo
                    return { name: item.name, url }; // Retorna el nombre y la URL
                });
                const audioFiles = await Promise.all(audioPromises); // Espera a que todas las promesas se resuelvan
                
                // Ordenar los archivos
                const sortedAudioFiles = audioFiles.sort((a, b) => {
                    // Asegúrate de que "Despedida" esté al final
                    if (a.name.includes("Despedida")) return 1;
                    if (b.name.includes("Despedida")) return -1;

                    // Asegúrate de que "Introducción" esté antes de "Módulo"
                    if (a.name.includes("Introducción") && b.name.includes("Módulo")) return -1;
                    if (a.name.includes("Módulo") && b.name.includes("Introducción")) return 1;

                    // Orden alfabético por defecto
                    return a.name.localeCompare(b.name);
                });

                // Reemplazar "-" por ":" en los nombres de los archivos que contienen "Módulo"
                const finalAudioFiles = sortedAudioFiles.map(audio => {
                    return {
                        ...audio,
                        name: audio.name.replace(/Modulo\s*(\d+)-/, 'Módulo $1:')
                    };
                });

                setAudioFiles(finalAudioFiles); // Establece los archivos de audio en el estado
            } catch (error) {
                console.error('Error fetching audio files:', error);
            }
        };

        fetchAudioFiles(); // Llama a la función para obtener los archivos
    }, [storage]);

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
