/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {onRequest} = require("firebase-functions/v2/https");

const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

const firebaseConfig = {
  apiKey: "AIzaSyBAWsN9T9fAvXrW_xc1u7-7-0oYS4YQMHA",
  authDomain: "week7xinyuli.firebaseapp.com",
  projectId: "week7xinyuli",
  storageBucket: "week7xinyuli.appspot.com",
  messagingSenderId: "220600255992",
  appId: "1:220600255992:web:698d05c75044ef1501020d",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const bookCollection = admin.firestore().collection("books");
      const snapshot = await bookCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.log("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.addBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
      }
      const {isbn, name} = req.body;
      if (!isbn || isNaN(isbn) || !name) {
        return res.status(400).send("Invalid input data");
      }
      const uppercaseName = name.toUpperCase();
      const bookRef = await db.collection("books").add({
        isbn: isbn,
        name: uppercaseName,
      });
      res.status(200).send(`Book added with ID: ${bookRef.id}`);
    } catch (error) {
      console.error("Error adding book:", error);
      res.status(500).send("Error adding book");
    }
  });
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
