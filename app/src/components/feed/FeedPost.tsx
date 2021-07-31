import React from 'react';
import tailwind from 'tailwind-rn';
import { Text, View, Pressable } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

type Comment = {
  content: string;
  date: string;
  leftBy: string;
};

interface IFeedPostProps {
  post: {
    content: string;
    postedBy: string;
    date: string;
    comments: Comment[];
  };
  refreshPosts: () => Promise<void>;
}

const FeedPost = ({ post, refreshPosts }: IFeedPostProps) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        ...tailwind('bg-white flex w-11/12 my-2'),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
      onPress={() => {
        navigation.navigate('Replies', { post, refreshPosts });
      }}>
      <View style={tailwind('flex flex-row items-center')}>
        <Text style={tailwind('text-sm font-bold text-black my-1 ml-2')}>{post.postedBy}</Text>
        <Text style={tailwind('text-sm font-light text-blue-400 ml-4')}>
          {moment(Date.parse(post.date)).format('lll')}
        </Text>
      </View>
      <Text style={tailwind('text-sm font-light text-black ml-2 my-2')}>{post.content}</Text>
      <Text style={tailwind('text-xs text-black font-bold ml-6 my-2')}>
        {post.comments.length === 0 ? 'No' : post.comments.length}
        {post.comments.length === 1 ? ' Reply' : ' Replies'}
      </Text>
    </Pressable>
  );
};

export default FeedPost;
