import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import api from '../api';
import { SessionContext } from '../context';
import { FeedPost } from '../components';
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const GroupFeed = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<any[]>([]);
  const [initialState, setInitialState] = useState(true);
  const userContext = useContext(SessionContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    console.log(userContext?.currentGroup);
    const getPosts = async () => {
      const posts = await api.posts().getById(userContext?.currentGroup?.id);
      setPosts(posts);
    };
    setNavigationHeader();
    if (initialState) {
      getPosts();
      setInitialState(false);
    }
    if (refreshing) {
      getPosts();
      setRefreshing(false);
    }
  }, [refreshing]);

  const refreshPosts = async () => {
    setPosts(await api.posts().getById(userContext?.currentGroup?.id));
  };

  const setNavigationHeader = () => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={tailwind('text-base font-bold')}>{userContext?.currentGroup?.name}</Text>
      ),
      headerLeft: () => (
        <AntDesign
          name="arrowleft"
          size={25}
          style={tailwind('ml-4 self-center')}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Root' }],
            });
          }}
        />
      ),
    });
  };
  return (
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
      {posts.length > 0 && (
        <ScrollView
          contentContainerStyle={tailwind('flex items-center')}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {posts.map((post, idx) => {
            return <FeedPost key={idx} post={post} refreshPosts={refreshPosts} />;
          })}
        </ScrollView>
      )}
    </>
  );
};

export default GroupFeed;
