import React, { useContext, useState } from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { PostReply } from '../components';
import tailwind from 'tailwind-rn';
import api from '../api';
import { Ionicons } from '@expo/vector-icons';
import dimensions from '../constants/Layout';
import { SessionContext } from '../context';
type Comment = {
  content: string;
  date: string;
  leftBy: string;
};

const FeedReplies = ({ route }: any) => {
  const [message, setMessage] = useState<string>('');
  const { post, refreshPosts } = route.params;
  const [comments, setComments] = useState(post.comments);
  const { width, height } = dimensions.window;
  const userContext = useContext(SessionContext);

  const sendReply = async (postId: number, content: string) => {
    await api.comments().create(userContext?.currentUser?.id, postId, content);
    setComments(await api.comments().getById(postId));
    setMessage('');
    refreshPosts();
  };

  return (
    <View style={{ height: '100%', width: '100%', ...tailwind('flex items-center') }}>
      <ScrollView
        contentContainerStyle={{
          ...tailwind('flex items-center'),
          width: width,
          minHeight: height * 0.71,
        }}>
        <PostReply comment={{ content: post.content, date: post.date, leftBy: post.postedBy }} />
        <Text style={tailwind('text-gray-400 text-base flex items-center')}>--- Replies ---</Text>
        {comments.map((comment: Comment, idx: number) => {
          return <PostReply key={idx} comment={comment} />;
        })}
      </ScrollView>
      <View style={tailwind('flex flex-row ml-6 ')}>
        <TextInput
          placeholder="Say hello!"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={() => {
            sendReply(post.id, message);
          }}
          style={tailwind(
            'my-4 border bg-white border-black w-5/6 pl-1 mr-3 h-10 text-base rounded'
          )}
        />
        <TouchableOpacity
          style={tailwind('self-center')}
          onPress={() => {
            sendReply(post.id, message);
          }}>
          <Ionicons name="ios-send-sharp" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedReplies;
