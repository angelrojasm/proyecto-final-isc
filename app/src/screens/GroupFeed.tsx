import React, { useState, useEffect, useContext } from 'react';
import { Text, ScrollView } from 'react-native';
import api from '../api';
import { SessionContext } from '../context';
import { FeedPost } from '../components';
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';

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

  const setNavigationHeader = () => {
    navigation.setOptions({
      headerTitle: () => <Text>{/*userContext?.currentGroup.name*/}Group X</Text>,
    });
  };

  return posts.length > 0 ? (
    <ScrollView contentContainerStyle={tailwind('flex items-center')}>
      {posts.map((post, idx) => {
        return <FeedPost key={idx} post={post} />;
      })}
    </ScrollView>
  ) : null;
};

export default GroupFeed;
