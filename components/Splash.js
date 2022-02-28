import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';

const Splash = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('Posts');
  }, 2000);

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../assets/images/start.png')}></ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({});
