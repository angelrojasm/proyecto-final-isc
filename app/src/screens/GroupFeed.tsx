import React, { useState, useEffect, useContext } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import api from '../api';
import { SessionContext } from '../context';
import { FeedPost } from '../components';
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const GroupFeed = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<any[]>([]);
  const userContext = useContext(SessionContext);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await api.posts().getById(/*userContent?.currentGroup?.id*/ 1);
      setPosts(posts);
    };

    setNavigationHeader();
    getPosts();
  }, []);

  const refreshPosts = async () => {
    setPosts(await api.posts().getById(/*userContent?.currentGroup?.id*/ 1));
  };

  const setNavigationHeader = () => {
    navigation.setOptions({
      headerTitle: () => <Text>{/*userContext?.currentGroup.name*/}Group X</Text>,
    });
  };

  return posts.length > 0 ? (
    <>
      <TouchableOpacity
        style={{ alignSelf: 'flex-start', ...tailwind('absolute z-10 bottom-10 right-6') }}
        onPress={() => {
          navigation.navigate('PostCreate', { refreshPosts });
        }}>
        <Ionicons
          name="add"
          size={40}
          style={tailwind('rounded-full p-1 bg-blue-400 text-white ')}
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={tailwind('flex items-center')}>
        {posts.map((post, idx) => {
          return <FeedPost key={idx} post={post} refreshPosts={refreshPosts} />;
        })}
      </ScrollView>
    </>
  ) : null;
};

export default GroupFeed;
