import { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import app from '../firebase/firebaseConfig';

const useFirebaseAudio = () => {
    const [audioFiles, setAudioFiles] = useState([]);
    const storage = getStorage(app);

    useEffect(() => {
        const fetchAudioFiles = async () => {
            const audioListRef = ref(storage, 'audios/');
            try {
                const res = await listAll(audioListRef);
                const audioPromises = res.items.map(async (item) => {
                    const url = await getDownloadURL(item);
                    return { name: item.name, url }; // Retorna el nombre y la URL
                });
                const audioFiles = await Promise.all(audioPromises);
                setAudioFiles(audioFiles);
            } catch (error) {
                console.error('Error fetching audio files:', error);
            }
        };

        fetchAudioFiles(); // Llama a la función para obtener los archivos
    }, [storage]);

    return audioFiles; // Devuelve la lista de archivos de audio
};

export default useFirebaseAudio;
