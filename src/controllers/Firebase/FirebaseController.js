// const { firebase } = require('./firebase-config');
const { v4: uuidv4 } = require('uuid');
const firebase = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');

require('firebase/storage');
const dotenv = require('dotenv');
dotenv.config();

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

const storage = getStorage();

const FirebaseController = {
    uploadMultipleImages: async (req, res) => {
        try {
            const storageRef = ref(storage, `/portfolio/${req.files[0].originalname}`)

            await uploadBytes(storageRef, req.files[0].buffer);
            let downloadURL = await getDownloadURL(storageRef);

            return res.status(200).json({
                status: true,
                downloadURL
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        }
    },
}

module.exports = FirebaseController;
