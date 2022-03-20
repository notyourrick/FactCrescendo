import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors';

const Splash = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('TabNavigator');
  }, 1000);

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
    backgroundColor: colors.primary,
  },
  logoText: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 45,
    color: '#fff',
    textAlign: 'left',
    marginLeft: -15,
  },
  subText: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 14,
    color: '#fff',
    letterSpacing: 1.5,
  },
});
