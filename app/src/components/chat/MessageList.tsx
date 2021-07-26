import React, { useRef, useContext } from 'react';
import { ScrollView, View } from 'react-native';
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
