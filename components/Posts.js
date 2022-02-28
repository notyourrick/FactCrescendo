import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  useWindowDimensions,
  Image,
  ScrollView,
} from 'react-native';
import HTML from 'react-native-renders-html';

const Posts = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {width} = useWindowDimensions();
  const apiUrl = 'https://www.factcrescendo.com/wp-json/wp/v2/posts';

  useEffect(() => {
    let mount = true;

    if (mount) {
      getPosts();
    }

    return () => {
      mount = false;
    };
  }, []);

  const getPosts = () => {
    setLoading(true);
    fetch(apiUrl)
      .then(res => res.json())
      .then(json => setPosts(json))
      .catch(err => console.log(err));
    setLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1, paddingTop: 15, padding: 10}}>
      {posts.length > 0 ? (
        <FlatList
          onRefresh={getPosts}
          refreshing={loading}
          keyExtractor={item => item.id.toString()}
          data={posts}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                elevation: 20,
                padding: 20,
                marginBottom: 20,
              }}
              onPress={() =>
                navigation.navigate('Post', {
                  title: item.title.rendered,
                  content: item.content.rendered,
                  img: item.yoast_head_json.og_image[0].url,
                })
              }>
              <View>
                <Image
                  source={{uri: item.yoast_head_json.og_image[0].url}}
                  resizeMode="cover"
                  style={{
                    width: '100%',
                    height: 200,
                    marginBottom: 20,
                  }}
                />
                <Text style={{color: 'black'}}>{item.title.rendered}</Text>

                <HTML html={item.excerpt.rendered} />
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Posts;
