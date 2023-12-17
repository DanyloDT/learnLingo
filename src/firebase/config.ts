import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpLpR72WDf9gcJuU0hzAXAJAo1Ztebh20",
  authDomain: "learnlingo-9b065.firebaseapp.com",
  projectId: "learnlingo-9b065",
  storageBucket: "learnlingo-9b065.appspot.com",
  messagingSenderId: "738095000262",
  appId: "1:738095000262:web:a2b1da97c922c3a17c45c7",
  databaseURL:
    "https://learnlingo-9b065-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth: Auth = getAuth(app);
