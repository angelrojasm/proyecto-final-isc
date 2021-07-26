import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import moment from 'moment';
type AppProps = {
  message: {
    sender?: string;
    content?: string;
    date: string;
    newday?: any;
  };
  ownMessage?: boolean;
};

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};
const ChatMessage = ({ message, ownMessage }: AppProps): JSX.Element => {
  return ownMessage ? (
    <View
      style={{
        ...tailwind('py-4 px-2 bg-green-300 rounded-xl flex items-center border my-2 mr-2'),
        ...shadow,
        alignSelf: 'flex-end',
        minWidth: '30%',
        maxWidth: '70%',
      }}>
      <View style={tailwind('px-2')}>
        <Text style={tailwind('text-xs font-medium text-black')}>{message.content}</Text>
        <Text style={tailwind('text-gray-500 text-xs')}>
          {moment(Date.parse(message.date)).format('LT')}
        </Text>
      </View>
    </View>
  ) : message.newday ? (
    <View
      style={{
        ...tailwind('px-2 rounded-xl flex items-center mb-2'),

        alignSelf: 'flex-start',
        width: '100%',
      }}>
      <View style={tailwind('px-2')}>
        <Text style={tailwind('text-gray-500 text-xs')}>{message.date}</Text>
      </View>
    </View>
  ) : (
    <View
      style={{
        ...tailwind('py-3 px-2 bg-gray-200 rounded-xl flex border my-2 ml-2 '),
        ...shadow,
        alignSelf: 'flex-start',
        minWidth: '30%',
        maxWidth: '70%',
      }}>
      <View style={tailwind('px-2 ')}>
        <Text style={tailwind('text-gray-500 text-xs')}>{message.sender}</Text>
        <Text style={tailwind('text-xs font-medium text-black')}>{message.content}</Text>
        <Text style={tailwind('text-gray-500 text-xs')}>
          {moment(Date.parse(message.date)).format('LT')}
        </Text>
      </View>
    </View>
  );
};

export default ChatMessage;
