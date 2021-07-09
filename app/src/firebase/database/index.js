import firebase from '../config';

const addData = async (dataObj) => {
  try {
    await firebase
      .database()
      .ref('test/')
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

const unsubscribe = async () => {
  try {
    await firebase.database().ref('test/').off('value');
    return { error: false };
  } catch (err) {
    return err;
  }
};
export { addData, unsubscribe };
