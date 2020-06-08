import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAgcLr0IINjJJvIq_q7nzUqlsOM1EdsgBE",
  authDomain: "tournament-generator-8754c.firebaseapp.com",
  databaseURL: "https://tournament-generator-8754c.firebaseio.com",
  projectId: "tournament-generator-8754c",
  storageBucket: "tournament-generator-8754c.appspot.com",
  messagingSenderId: "164177123481",
  appId: "1:164177123481:web:125f1289a908815e95c008",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
