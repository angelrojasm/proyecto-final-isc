import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  Touchable,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tailwind from 'tailwind-rn';
import api from '../api';
import { Buffer } from 'buffer';
import { SessionContext } from '../context';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import FileTypeIcon from '../components/file/FileTypeIcon';

const FeedPostCreate = ({ route }: any) => {
  const [message, setMessage] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [attachments, setAttachments] = useState<any[]>([]);
  const userContext = useContext(SessionContext);
  const navigation = useNavigation();
  const { refreshPosts } = route.params;

  const addPost = async () => {
    if (message) {
      setVisible(true);
      await uploadFiles();
      await api
        .posts()
        .create(userContext?.currentUser?.id, userContext?.currentGroup?.id, message, attachments);
      let prediction = await api.models().predict(message);
      await api.predictions().create('group', userContext?.currentGroup?.id, prediction);
      api.predictions().create('user', userContext?.currentUser?.id, prediction);
      await refreshPosts();
      hideModal();
      navigation.goBack();
    }
  };
  const hideModal = () => setVisible(false);

  const getFileData = async () => {
    let isRepeated = false;
    const local: any = await DocumentPicker.getDocumentAsync();
    files.forEach((file: any) => {
      if (file.name === local.name) {
        isRepeated = true;
      }
    });
    if (!isRepeated) {
      setVisible(true);
      const base64 = await FileSystem.readAsStringAsync(local.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const buffer: any = Buffer.from(base64, 'base64');

      const file: any = {
        name: `${userContext?.currentGroup?.id}/${userContext?.currentUser?.id}/${local.name}`,
        buffer,
      };
      setFiles([...files, file]);
      setAttachments([...attachments, file.name]);
      hideModal();
    }
  };
  const uploadFiles = async () => {
    for (let i = 0; i < files.length; i++) {
      await api
        .files()
        .upload(userContext?.currentGroup?.id, userContext?.currentUser?.id, files[i]);
    }
  };

  return (
    <ScrollView contentContainerStyle={tailwind('flex items-center')}>
      <Modal
        isVisible={visible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}>
        <View style={tailwind('rounded-lg bg-white border border-gray-400 flex items-center')}>
          <Text style={tailwind('font-bold text-lg mt-4')}>Uploading ...</Text>
          <ActivityIndicator size="large" color="#0000ff" style={tailwind('p-8')} />
        </View>
      </Modal>
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
      <View
        style={{
          ...tailwind('bg-white rounded flex my-2'),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        {files.map((file: any, index: number) => {
          return index === files.length - 1 ? (
            <View
              key={index}
              style={{
                ...tailwind('flex items-center flex-row py-4 my-1 pl-2 '),
              }}>
              <FileTypeIcon type={file.name.split('.')[1]} />
              <Text style={{ ...tailwind('mx-2 text-sm text-black'), flexShrink: 1 }}>
                {file.name.split('/')[2]}
              </Text>
            </View>
          ) : (
            <View
              key={index}
              style={{
                ...tailwind('flex items-center flex-row py-4 my-1 pl-2 border-b border-gray-200'),
              }}>
              <FileTypeIcon type={file.name.split('.')[1]} />
              <Text style={{ ...tailwind('mx-2 text-sm text-black'), flexShrink: 1 }}>
                {file.name}
              </Text>
            </View>
          );
        })}
      </View>
      <View style={tailwind('flex flex-row justify-center mb-4 ')}>
        <TouchableOpacity
          onPress={addPost}
          style={tailwind('px-4 py-1 bg-blue-700 flex items-center rounded-sm mr-4')}>
          <Text style={tailwind('font-bold text-white text-lg ')}>Add Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tailwind('self-center')} onPress={getFileData}>
          <Feather name="paperclip" size={25} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FeedPostCreate;
