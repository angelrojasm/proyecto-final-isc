import React, { useRef, useContext } from 'react';
import { ScrollView, View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import { SessionContext } from '../../context';
import Message from './Message';
import dimensions from '../../constants/Layout';

type Message = {
  content?: string;
  sender?: string;
  date: string;
  newday?: boolean;
};

interface IMessages {
  messages: Message[];
}

const MessageList = ({ messages }: IMessages) => {
  const { width } = dimensions.window;
  const scrollViewRef = useRef<any>();
  const userContext = useContext(SessionContext);

  if (messages.length === 0) {
    return (
      <View
        style={{
          ...tailwind('px-2 rounded-xl flex items-center mb-2'),

          alignSelf: 'flex-start',
          width: '100%',
        }}>
        <View style={tailwind('px-2')}>
          <Text style={tailwind('text-gray-600 text-sm')}>No messages yet. Say hello!</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={tailwind('flex flex-col justify-start items-center')}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
      {messages.map((message: Message, idx: number) => {
        return message?.sender === userContext?.currentUser?.username ? (
          <View key={idx} style={{ ...tailwind('flex justify-start'), width: width }}>
            <Message ownMessage message={message} />
          </View>
        ) : message?.newday ? (
          <View key={idx} style={{ ...tailwind('flex justify-center'), width: width }}>
            <Message message={message} />
          </View>
        ) : (
          <View key={idx} style={{ ...tailwind('flex'), width: width }}>
            <Message message={message} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default MessageList;
