// firebaseConfig.js
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkd5ilYHBXs6RooqgiR8nbSRTj8jhbOuo",
  authDomain: "test-desafio-emprendedor.firebaseapp.com",
  projectId: "test-desafio-emprendedor",
  storageBucket: "test-desafio-emprendedor.appspot.com",
  messagingSenderId: "978045811158",
  appId: "1:978045811158:web:b93ae0b338446beebf8c77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exporta 'app' como default
export default app;
