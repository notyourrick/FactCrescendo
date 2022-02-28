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

const Post = ({route, navigation}) => {
  const {width} = useWindowDimensions();
  const {title, content, img} = route.params;

  return (
    <ScrollView>
      <Image
        source={{uri: img}}
        resizeMode="cover"
        style={{
          width: '100%',
          height: 250,
        }}
      />
      <View key="id" style={{padding: 9}}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 22,
            color: 'black',
            marginTop: 20,
            marginBottom: 20,
          }}>
          {title}
        </Text>

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
            'font-family',
            'padding',
          ]}
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
            },
            img: {
              marginBottom: 30,
              marginTop: 20,
            },
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
