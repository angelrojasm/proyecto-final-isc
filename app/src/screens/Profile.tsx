import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    height: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#1742eb',
    borderRadius: 50,
    justifyContent: 'center',
    marginTop: 60
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  thankYou:{
    fontWeight: 'bold',
    color: '#1742eb',
    fontSize: 18,
    marginBottom: 20
  },
  tell:{
    fontSize: 14,
    marginBottom: 20
  },
  register:{
    fontWeight:'bold',
  },
  interest:{
    marginTop: 20
  },
  buttonText:{
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
},
regionText:{
  fontWeight: 'bold'
}
});

export default Profile;
