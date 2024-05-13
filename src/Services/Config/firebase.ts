import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAuWsBWY7JqCeLkIMSW7CQGwzCvQXmwcsE",
  authDomain: "crafto-b5151.firebaseapp.com",
  projectId: "crafto-b5151",
  storageBucket: "crafto-b5151.appspot.com",
  messagingSenderId: "467116354064",
  appId: "1:467116354064:web:e2f833626a3cf6004b7895"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);