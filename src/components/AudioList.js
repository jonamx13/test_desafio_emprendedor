import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import app from '../firebaseConfig'; // Cambia esto a la importación correcta
import AudioPlayer from './AudioPlayer'; // Asegúrate de que el componente AudioPlayer esté bien importado
import './AudioList.css'; // Asegúrate de importar el CSS

const AudioList = () => {
    const [audioFiles, setAudioFiles] = useState([]);
    const storage = getStorage(app); // Usa 'app' aquí

    useEffect(() => {
        const fetchAudioFiles = async () => {
            const audioListRef = ref(storage, 'audios/'); // Cambia 'audios/' al path correcto de tu carpeta
            try {
                const res = await listAll(audioListRef); // Lista todos los archivos en la carpeta
                const audioPromises = res.items.map(async (item) => {
                    const url = await getDownloadURL(item); // Obtiene la URL de descarga del archivo
                    return { name: item.name, url }; // Retorna el nombre y la URL
                });
                const audioFiles = await Promise.all(audioPromises); // Espera a que todas las promesas se resuelvan
                setAudioFiles(audioFiles); // Establece los archivos de audio en el estado
            } catch (error) {
                console.error('Error fetching audio files:', error);
            }
        };

        fetchAudioFiles(); // Llama a la función para obtener los archivos
    }, [storage]);

    return (
        <div className="audio-list"> {/* Aplica la clase aquí */}
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
