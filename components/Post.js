import React, {useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import HTML from 'react-native-renders-html';
import {IGNORED_TAGS} from 'react-native-renders-html/src/HTMLUtils';

const Post = ({route, navigation}) => {
  const {width} = useWindowDimensions();
  const {title, content, img} = route.params;
  const regex = /[!@#$%^&*<>0-9;]/g;

  return (
    <ScrollView style={{flex: 1, paddingTop: 15, padding: 20}}>
      <View key="id">
        <Image
          source={{uri: img}}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 200,
            borderRadius: 15,
            marginBottom: 10,
          }}
        />
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 22,
            color: 'black',
            marginTop: 20,
            marginBottom: 20,
          }}>
          {title.replace(regex, '')}
        </Text>

        <HTML
          html={content}
          contentWidth={width}
          imagesMaxWidth={width}
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
            iframe: {
              marginTop: 20,
              marginBottom: 20,
            },
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Post;
