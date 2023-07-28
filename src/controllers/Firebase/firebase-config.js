// import firebase from 'firebase/app';
// import 'firebase/storage';
const firebase = require('firebase/app');
require('firebase/storage');

const firebaseConfig = {
    apiKey: "AIzaSyCPd3qt3EylwJ_GPlgH9Q64SKtcGTtWSyo",
    authDomain: "save-portfolio.firebaseapp.com",
    projectId: "save-portfolio",
    storageBucket: "save-portfolio.appspot.com",
    messagingSenderId: "975939713852",
    appId: "1:975939713852:web:1f9aeb01877427c3ebbc39",
    measurementId: "G-R1V75LW0XM"
};

firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();

// export { storage, firebase as default };

module.exports = { firebase };