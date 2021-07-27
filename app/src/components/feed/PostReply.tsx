import React from 'react';
import tailwind from 'tailwind-rn';
import { Text, View } from 'react-native';
import moment from 'moment';
type Comment = {
  content: string;
  date: string;
  leftBy: string;
};

interface IPostReplyProps {
  comment: Comment;
}

const PostReply = ({ comment }: IPostReplyProps) => {
  return (
    <View
      style={{
        ...tailwind('bg-white flex w-11/12 my-4'),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      <View style={tailwind('flex flex-row items-center')}>
        <Text style={tailwind('text-sm font-bold text-black my-1 ml-2')}>{comment.leftBy}</Text>
        <Text style={tailwind('text-sm font-light text-blue-400 ml-4')}>
          {moment(Date.parse(comment.date)).format('lll')}
        </Text>
      </View>
      <Text style={tailwind('text-sm font-light text-black ml-2 my-3')}>{comment.content}</Text>
    </View>
  );
};

export default PostReply;
