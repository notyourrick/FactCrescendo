import {StyleSheet, View, ImageBackground} from 'react-native';
import React from 'react';
import image from '../assets/images/splash.png';

const Splash = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('TabNavigator');
  }, 1000);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.image}></ImageBackground>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
