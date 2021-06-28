import firebase from '../config';

const getUser = () => {
  const currentUser = firebase.auth().currentUser;
  return currentUser ? { uid: currentUser.uid, email: currentUser.email } : currentUser;
};
const signUp = async (userEmail, password) => {
  try {
    const currentUser = await firebase.auth().createUserWithEmailAndPassword(userEmail, password);

    return {
      uid: currentUser.user.uid,
      email: currentUser.user.email,
    };
  } catch (err) {
    return err;
  }
};

const logIn = async (email, password) => {
  try {
    const currentUser = await firebase.auth().signInWithEmailAndPassword(email, password);
    return {
      uid: currentUser.user.uid,
      email: currentUser.user.email,
    };
  } catch (err) {
    return err;
  }
};

const logOut = async () => {
  try {
    return await firebase.auth().signOut();
  } catch (err) {
    return err;
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    return await firebase.auth().sendPasswordResetEmail(email);
  } catch (err) {
    return err;
  }
};

const confirmPasswordReset = async (code, password) => {
  try {
    return await firebase.auth().confirmPasswordReset(code, password);
  } catch (err) {
    return err;
  }
};
export { getUser, signUp, logOut, logIn, sendPasswordResetEmail, confirmPasswordReset };
