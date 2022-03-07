import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors';

const Splash = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('Home');
  }, 2000);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logoText}>Fact</Text>
        <Text style={styles.logoText}>Crescendo</Text>
      </View>
      <Text style={styles.subText}>Facts Behind Every Viral News</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 45,
    color: colors.primary,
    textAlign: 'left',
    marginLeft: -15,
  },
  subText: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 14,
    color: colors.dark,
    letterSpacing: 1.5,
  },
});
