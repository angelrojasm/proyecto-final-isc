import React, { useState } from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { PostReply } from '../components';
import tailwind from 'tailwind-rn';
import api from '../api';
import { Ionicons } from '@expo/vector-icons';
import dimensions from '../constants/Layout';
type Comment = {
  content: string;
  date: string;
  leftBy: string;
};

const FeedReplies = ({ route }: any) => {
  const [message, setMessage] = useState<string>('');
  const { width } = dimensions.window;
  const { post } = route.params;
  const { comments = [] } = post;

  const sendReply = () => {};
  return (
    <View style={{ height: '100%', width: '100%', ...tailwind('flex items-center') }}>
      <ScrollView contentContainerStyle={{ ...tailwind('h-5/6 flex items-center'), width: width }}>
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
          onSubmitEditing={sendReply}
          style={tailwind(
            'my-4 border bg-white border-black w-5/6 pl-1 mr-3 h-10 text-base rounded'
          )}
        />
        <TouchableOpacity style={tailwind('self-center')} onPress={sendReply}>
          <Ionicons on name="ios-send-sharp" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedReplies;
