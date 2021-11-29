import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  View,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import api from '../api';
import { SessionContext } from '../context';
import { FeedPost } from '../components';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import FilePost from '../components/file/FilePost';
import tailwind from 'tailwind-rn';

const optionTextStyle = {
  ...tailwind('font-medium text-base py-4 ml-6 '),
};
const selectedTextStyle = {
  ...tailwind('border-b-4 border-indigo-600'),
};

const GroupFeed = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<any[] | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [initialState, setInitialState] = useState(true);
  const userContext = useContext(SessionContext);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('posts');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const hideModal = () => setVisible(false);

  const getFiles = async () => {
    const files = await api.files().getByGroup(userContext?.currentGroup?.id);
    setFiles(files);
  };
  const getUsers = async () => {
    const users = await api.users().getAll();
    setUsers(users);
  };
  useEffect(() => {
    const getPosts = async () => {
      const posts = await api.posts().getById(userContext?.currentGroup?.id);
      setPosts(posts);
    };
    getUsers();
    setNavigationHeader();
    if (initialState) {
      getPosts();
      getFiles();
      setInitialState(false);
    }
    if (refreshing) {
      getPosts();
      getFiles();
      setRefreshing(false);
    }
  }, [refreshing]);

  const refreshPosts = async () => {
    setPosts(await api.posts().getById(userContext?.currentGroup?.id));
  };

  const uploadFile = async () => {
    const local: any = await DocumentPicker.getDocumentAsync();
    setVisible(true);
    const base64 = await FileSystem.readAsStringAsync(local.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const buffer: any = Buffer.from(base64, 'base64');

    const file = {
      name: `${userContext?.currentGroup?.id}/${local.name}`,
      buffer,
    };
    const response = await api
      .files()
      .upload(userContext?.currentGroup?.id, userContext?.currentUser?.id, file);
    if (!response.error) {
      await getFiles();
    }
    hideModal();
  };

  const setNavigationHeader = () => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={tailwind('text-base text-white font-bold w-4/5 text-center')}>
          {userContext?.currentGroup?.name}
        </Text>
      ),
      headerLeft: () => (
        <AntDesign
          name="arrowleft"
          size={25}
          style={tailwind('ml-4 self-center text-white')}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Root' }],
            });
          }}
        />
      ),
      headerRight: () => (
        <Ionicons
          name="information-circle-outline"
          size={23}
          style={tailwind('mr-5 self-center text-white')}
          onPress={() => {
            navigation.navigate('GroupInfoEdit');
          }}
        />
      ),
    });
  };

  if (!posts) {
    return (
      <View style={{ height: '100%' }}>
        <ActivityIndicator size="large" color="#0000ff" style={tailwind('p-8')} />
      </View>
    );
  }

  const Feed = () => (
    <>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-start',
          ...tailwind('absolute z-10 bottom-10 right-6'),
        }}
        onPress={() => {
          navigation.navigate('PostCreate', { refreshPosts });
        }}>
        <Ionicons
          name="add"
          size={40}
          style={tailwind('rounded-full p-1 bg-blue-400 text-white ')}
        />
      </TouchableOpacity>
      {posts.length > 0 ? (
        <ScrollView
          contentContainerStyle={tailwind('flex items-center flex-col-reverse')}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {posts.map((post, idx) => {
            return <FeedPost key={idx} post={post} refreshPosts={refreshPosts} />;
          })}
        </ScrollView>
      ) : (
        <Text style={tailwind('text-center mt-3 text-base')}>
          This group has no posts yet. Create a post!
        </Text>
      )}
    </>
  );

  const FileSection = () => (
    <>
      {files.length > 0 ? (
        <ScrollView
          contentContainerStyle={tailwind('')}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {files.map((file, idx) => {
            if (file.filename.split('/').length === 2) {
              return (
                <FilePost
                  key={idx}
                  name={file.filename}
                  date={file.date}
                  poster={users.filter((user) => user.id === file.uploadedBy)[0].username}
                />
              );
            }
            return null;
          })}
        </ScrollView>
      ) : (
        <Text style={tailwind('text-center mt-3 text-base')}>
          This group has no files yet. Be the first one to upload a file!
        </Text>
      )}
    </>
  );

  return (
    <>
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
      <View style={tailwind('bg-gray-200 flex flex-row items-center justify-between')}>
        <View style={tailwind('flex flex-row')}>
          <Text
            onPress={() => {
              setSelected('posts');
            }}
            style={
              selected === 'posts'
                ? { ...optionTextStyle, ...selectedTextStyle }
                : { ...optionTextStyle }
            }>
            Posts
          </Text>
          <Text
            onPress={() => {
              setSelected('files');
            }}
            style={
              selected === 'files'
                ? { ...optionTextStyle, ...selectedTextStyle }
                : { ...optionTextStyle }
            }>
            Files
          </Text>
        </View>
        {selected === 'files' && (
          <TouchableOpacity
            style={tailwind('flex flex-row items-center mr-4')}
            onPress={uploadFile}>
            <AntDesign name="upload" size={25} />
            <Text style={tailwind('text-xs self-center ml-2 mt-2')}>Upload</Text>
          </TouchableOpacity>
        )}
      </View>
      {selected === 'posts' ? <Feed /> : <FileSection />}
    </>
  );
};

export default GroupFeed;
