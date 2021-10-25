import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import tailwind from 'tailwind-rn';
import FileTypeIcon from './FileTypeIcon';
import moment from 'moment';
import * as Linking from 'expo-linking';

const BASE_URL = 'https://d293f2ppq9cj5.cloudfront.net/';
interface IFilePostProps {
  name: string;
  date: Date;
  poster: string;
}
export default function FilePost({ name, date, poster }: IFilePostProps) {
  const openFileLink = () => {
    Linking.openURL(`${BASE_URL}${name}`);
  };

  return (
    <TouchableOpacity
      onPress={openFileLink}
      style={tailwind('flex flex-row ml-2 py-6 border-b border-gray-300')}>
      <View style={tailwind('flex items-center flex-row w-2/5')}>
        <FileTypeIcon type={name.split('.')[1]} />
        <Text style={{ ...tailwind('ml-2 text-sm text-blue-600 underline'), flexShrink: 1 }}>
          {name}
        </Text>
      </View>
      <Text style={tailwind('text-sm text-center self-center w-1/3')}>
        {new Date(date).getFullYear() !== new Date().getFullYear()
          ? moment().format('MMMM DD')
          : moment().format('MMMM DD, YYYY')}
      </Text>
      <Text style={tailwind('text-sm self-center text-center w-1/4')}>{poster}</Text>
    </TouchableOpacity>
  );
}
