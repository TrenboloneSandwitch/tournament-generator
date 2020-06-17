import firebase from "../config/firebase";
const db = firebase.firestore();

const get = async (collectionName) => {
  const data = await db.collection(collectionName).get();
  return data.docs;
};

const getById = async (collectionName, id) => {
  const doc = await db.collection(collectionName).doc(id).get();
  return doc.data();
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

const remove = async (collectionName, id) => {
  // Add a new document in collection "cities"
  db.collection(collectionName)
    .doc(id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error deleting document: ", error);
    });
};

export default { get, getById, post, remove };
