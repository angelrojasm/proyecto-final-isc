import firebase from '../config';

const addData = async (route, dataObj) => {
  try {
    await firebase
      .database()
      .ref(`${route}/`)
      .push({
        ...dataObj,
      });
    return { error: false };
  } catch (err) {
    return err;
  }
};

// const readData = async func => {
// 	try {
// 		await firebase
// 			.database()
// 			.ref('test/')
// 			.on('value', snapshot => {
// 				const data = snapshot.val();
// 				func(data.counter);
// 			});
// 	} catch (err) {
// 		return err;
// 	}
// };

const unsubscribe = (route) => {
  try {
    firebase.database().ref(`${route}/`).off('value');
    return { error: false };
  } catch (err) {
    return err;
  }
};
export { addData, unsubscribe };
