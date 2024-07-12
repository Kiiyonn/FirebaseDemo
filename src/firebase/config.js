import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB6KWoLGmmGMoNRF8fEynL4MKy5BKgXZwc",
  authDomain: "fir-act-f8be8.firebaseapp.com",
  projectId: "fir-act-f8be8",
  storageBucket: "fir-act-f8be8.appspot.com",
  messagingSenderId: "831549333667",
  appId: "1:831549333667:web:11ebc909855251f73a5f16",
  measurementId: "G-J3952WX1CT"
};

  initializeApp(firebaseConfig);

  const db = getFirestore();

  export {db}