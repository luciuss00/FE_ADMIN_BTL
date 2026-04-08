// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyD18SwfBwFoJceKu1Cy-xcyZs5g3ONL58w',
    authDomain: 'mini-mart-dev-b1c17.firebaseapp.com',
    projectId: 'mini-mart-dev-b1c17',
    storageBucket: 'mini-mart-dev-b1c17.firebasestorage.app',
    messagingSenderId: '339466118101',
    appId: '1:339466118101:web:06aa8ac31b011383c2535c',
    measurementId: 'G-H2V6XVFYZZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
