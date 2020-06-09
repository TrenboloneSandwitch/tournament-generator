import firebase from "../config/firebase";
const db = firebase.firestore();

const get = async (collectionName) => {
  const data = await db.collection(collectionName).get();
  return data.docs;
};

export default { get };
