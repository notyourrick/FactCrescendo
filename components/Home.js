import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
  RefreshControl,
} from 'react-native';

const Home = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUrl = 'https://www.factcrescendo.com/wp-json/wp/v2';

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
    fetch(`${apiUrl}/posts`)
      .then(res => res.json())
      .then(json => setPosts(json))
      .catch(err => console.log(err));
    setLoading(false);
  };

  let date = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
      scrollEventThrottle={16}>
      {posts.length > 0 ? (
        <>
          <View style={styles.discoverWrapper}>
            <Text style={styles.dateText}>
              {date + '-' + month + '-' + year}
            </Text>

            <Text style={styles.discover}>Discover</Text>
            <Text style={styles.heading}>Latest Fact Checks</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {posts.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Detail', {
                      title: item.title.rendered,
                      content: item.content.rendered,
                      img: item.yoast_head_json.og_image[0].url,
                    })
                  }>
                  <View style={styles.sliderWrapper}>
                    <ImageBackground
                      source={{uri: item.yoast_head_json.og_image[0].url}}
                      imageStyle={styles.sliderimg}>
                      <Text style={styles.slidertext}>
                        {item.title.rendered}
                      </Text>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.topPickView}>
            <Text style={styles.topPickText}>Top Picks</Text>
          </View>

          <View>
            {/* feed */}
            {posts.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.feedWrapper}
                  onPress={() =>
                    navigation.navigate('Detail', {
                      title: item.title.rendered,
                      content: item.content.rendered,
                      img: item.yoast_head_json.og_image[0].url,
                    })
                  }>
                  <View style={styles.feedFlex}>
                    <View>
                      <Text style={styles.feedText}>{item.title.rendered}</Text>
                      <Text style={styles.authorText}>Author name</Text>
                    </View>
                    <Image
                      source={{uri: item.yoast_head_json.og_image[0].url}}
                      resizeMode="cover"
                      style={styles.feedImg}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.loadingStyle}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dateText: {
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  discoverWrapper: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  discover: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 26,
    marginBottom: -30,
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 30,
    marginTop: 30,
  },
  sliderWrapper: {
    flex: 1,
    height: 300,
    width: 350,
    paddingHorizontal: 10,
  },
  sliderimg: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  slidertext: {
    fontFamily: 'Poppins-ExtraBold',
    color: 'white',
    width: 300,
    padding: 10,
    top: 110,
  },
  topPickView: {
    padding: 20,
    marginTop: -55,
  },
  topPickText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 19,
    color: 'black',
  },
  feedWrapper: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
  },
  feedFlex: {
    flex: 1,
    flexDirection: 'row',
  },
  feedText: {
    width: 250,
    height: 85,
    marginRight: 20,
    fontFamily: 'Poppins-Bold',
    color: '#524f4a',
  },
  authorText: {
    fontFamily: 'Poppins-Bold',
    marginTop: -10,
    color: 'grey',
  },
  feedImg: {
    width: 90,
    height: 100,
    borderRadius: 9,
    resizeMode: 'cover',
  },
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
