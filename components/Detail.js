import React, {useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  Image,
  Linking,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import HTML from 'react-native-renders-html';
import {IGNORED_TAGS} from 'react-native-renders-html/src/HTMLUtils';
import colors from '../assets/colors/colors';

const Detail = ({route, navigation}) => {
  const {width} = useWindowDimensions();
  const {title, content, img} = route.params;
  return (
    <View>
      <Text>Detail</Text>
    </View>
  );
};

export default Detail;
