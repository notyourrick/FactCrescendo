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
  StyleSheet,
} from 'react-native';
import HTML from 'react-native-renders-html';

const Home = ({navigation}) => {
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

  let date = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  return (
    <View style={styles.container}>
      <View style={{padding: 25}}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
          }}>
          {date + '-' + month + '-' + year}
        </Text>

        <Text style={styles.discover}>Discover</Text>
        <Text style={styles.heading}>Latest Fact Checks</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  discover: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontSize: 26,
    marginBottom: -30,
  },
  heading: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontSize: 30,
    marginTop: 30,
  },
});
