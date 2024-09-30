// firebaseStorage.js
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseConfig"; // Asegúrate de que la ruta sea correcta

const storage = getStorage(app);

// Función para listar todos los archivos en un directorio
export const listAudioFiles = async (path) => {
  const listRef = ref(storage, path);
  const res = await listAll(listRef);
  const urls = await Promise.all(
    res.items.map(async (item) => {
      const url = await getDownloadURL(item);
      return { name: item.name, url };
    })
  );
  return urls;
};

// Función para subir archivos (si es necesario)
export const uploadAudioFile = async (file, path) => {
  const storageRef = ref(storage, `${path}/${file.name}`);
  await uploadBytes(storageRef, file);
};
