import React, { useState, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tailwind from 'tailwind-rn';
import api from '../api';
import { SessionContext } from '../context';

const FeedPostCreate = ({ route }: any) => {
  const [message, setMessage] = useState<string>('');
  const userContext = useContext(SessionContext);
  const navigation = useNavigation();
  const { refreshPosts } = route.params;
  const addPost = async () => {
    await api.posts().create(userContext?.currentUser?.id, userContext?.currentGroup?.id, message);
    await refreshPosts();
    navigation.goBack();
  };
  return (
    <View style={tailwind('flex items-center')}>
      <Text style={tailwind('text-black text-lg font-bold')}>Post Something to the Group!</Text>

      <TextInput
        placeholder="Say something in the group feed!"
        value={message}
        onChangeText={setMessage}
        multiline={true}
        numberOfLines={5}
        style={{
          ...tailwind(
            'my-4 border bg-white border-black w-5/6 pl-1  h-32 pt-2 text-base rounded-sm'
          ),
          textAlignVertical: 'top',
        }}
      />
      <TouchableOpacity
        onPress={addPost}
        style={tailwind('px-4 py-1 bg-blue-700 flex items-center rounded-sm')}>
        <Text style={tailwind('font-bold text-white text-lg ')}>Add Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedPostCreate;
