import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Linking,
  Dimensions,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import HTML from 'react-native-renders-html';
import {IGNORED_TAGS} from 'react-native-renders-html/src/HTMLUtils';
import colors from '../assets/colors/colors';

import Entypo from 'react-native-vector-icons/Entypo';

const height = Dimensions.get('window').height;

const Detail = ({navigation, route}) => {
  const {title, content, img} = route.params;
  const {width} = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={32} color={colors.gray} />
        </TouchableOpacity>
      </View>

      <View style={styles.imgView}>
        <Image source={{uri: img}} resizeMode="cover" style={styles.img} />
      </View>

      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <View style={styles.subHead}>
        <Text style={styles.authorText}>Rashi Jain</Text>
        <Text style={styles.dateText}>Sat, Mar 5</Text>
      </View>

      <View style={styles.contentView}>
        <HTML
          html={content}
          contentWidth={width}
          // imagesMaxWidth={width}
          onLinkPress={(evt, href) => {
            Linking.openURL(href);
          }}
          ignoredTags={[...IGNORED_TAGS, 'svg', 'iframe']}
          ignoredStyles={[
            'display',
            'width',
            'height',
            'fontFamily',
            'padding',
            'video',
          ]}
          tagsStyles={{
            a: {
              color: 'red',
            },
            p: {
              fontFamily: 'Poppins-Regular',
              lineHeight: 30,
              fontSize: 16,
              color: 'gray',
              marginBottom: 15,
            },
            img: {
              marginBottom: 30,
              marginTop: 20,
            },
            figure: {
              marginLeft: -18,
              paddingVertical: 10,
            },
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topbar: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
  backIcon: {
    padding: 4,
    borderColor: colors.gray,
    borderWidth: 2,
    borderRadius: 100 / 2,
    alignItems: 'center',
  },
  imgView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  img: {
    width: '90%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  titleWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
  },
  titleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'black',
  },
  subHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  authorText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: 'gray',
  },
  dateText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: 'gray',
  },
  contentView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
