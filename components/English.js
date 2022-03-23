import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import colors from '../assets/colors/colors';

const English = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiUrl = 'https://english.factcrescendo.com/wp-json/wp/v2';

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getPosts = () => {
    setLoading(true);
    fetch(`${apiUrl}/posts?per_page=25`)
      .then(res => res.json())
      .then(json => setPosts(json))
      .catch(err => console.log(err));
    setLoading(false);
  };

  useEffect(() => {
    let mount = true;

    if (mount) {
      getPosts();
    }

    return () => {
      mount = false;
    };
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {posts.length > 0 ? (
        <>
          <View style={styles.titleView}>
            <Text style={styles.title}>Fact Crescendo (English)</Text>
            <Text style={styles.subTitle}>Read Fact checks in English</Text>
          </View>
          {posts.map(item => (
            <View key={item.id}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Detail', {
                    title: item.title.rendered,
                    content: item.content.rendered,
                    img: item.yoast_head_json.og_image[0].url,
                    date: item.date,
                  })
                }
                style={styles.card}>
                <Image
                  source={{uri: item.yoast_head_json.og_image[0].url}}
                  resizeMode="cover"
                  style={styles.cardimg}
                />
                <Text style={{fontFamily: 'Poppins-Regular', color: 'black'}}>
                  {item.title.rendered}
                </Text>
                <Text
                  style={{fontFamily: 'Poppins-Bold', color: colors.primary}}>
                  Read More
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      ) : (
        <View style={styles.loadingStyle}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </ScrollView>
  );
};

export default English;

const styles = StyleSheet.create({
  titleView: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
    color: '#000',
  },
  subTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: 'gray',
  },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  cardimg: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 9,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  loadingStyle: {
    marginVertical: 350,
    alignItems: 'center',
  },
});
