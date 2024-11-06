// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'; // Importar o Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAkP-I25nJEg6euMw70y09_7d6SpMQPBL0",
  authDomain: "puthype-server.firebaseapp.com",
  projectId: "puthype-server",
  storageBucket: "puthype-server.firebasestorage.app",
  messagingSenderId: "453444696907",
  appId: "1:453444696907:web:fb9b901e785c56cd97c6ce"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firebase Auth com persistência usando AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Inicializar Firestore
const db = getFirestore(app); // Inicializando o Firestore

export { app, auth, db }; // Exporte também o db
