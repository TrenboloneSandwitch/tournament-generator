import firebase from "../config/firebase";
const db = firebase.firestore();

const get = async (collectionName) => {
  const data = await db.collection(collectionName).get();
  return data.docs;
};

const post = async (collectionName, payload) => {
  // Add a new document in collection "cities"
  db.collection(collectionName)
    .doc()
    .set(payload)
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
};

export default { get, post };
