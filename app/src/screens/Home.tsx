import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList} from '../navigation/types.navigation';

const image = { uri: "https://s3-alpha-sig.figma.com/img/7097/0fd2/d966e5b8be303a79ccbbbd7449f4e0c6?Expires=1627257600&Signature=Kx9Ry1bTNyyv8jG~pikaATy~C9WLbfrf0lrC3wF8YvgLij6vMKcHkp7ayznvEbgi3elUGlQ3XPVhS2catIggOQvVgRMTVH7LCeI2VcVjC2r1UGUf-fcQBWJgpfYv~oCKYgiESZqetS4dD5Am8~NsXOE7AdZFn6cHpxiazcdTxsdpriDKlbhGE42M9CC-XBWPVKfhgl0pxuiKkrIY3yLA~yGiqwVuavfuxFn-pAPTsFGCcRh1IT9SM-3-rIUSwTDGKi7abxVEsEvPfLZBuqOe0CQGgo6O~Q-2pXs-T1foaglgrzs7Fkm6-HWhVaouLfl28veN~6qEwbpHJcDRYkcssw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" };

const Home = ({ navigation }: StackScreenProps<AuthStackParamList, 'home'>) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <LinearGradient colors={['#2544B3', 'transparent']} style={styles.gradient1} />
        <LinearGradient colors={['transparent', '#0A94B7']} style={styles.gradient2} />
        <View style={styles.header}>
          <Text style={styles.text1}>App Name</Text>
          <Text style={styles.text2}>Help us help you help yourself</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('logIn')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('register')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View> 
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    marginTop: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '60%',
  },
  gradient2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 400,
    height: '60%',
  },
  button:{
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#bd3e6d',
    borderWidth: 3,
    borderRadius: 50
  },
  buttonText:{
    color: 'white',
    padding: 15,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text1:{
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold'
  },
  text2:{
    fontSize: 20,
    color: 'white',
    fontStyle: 'italic'
  },
  header:{
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Home;
