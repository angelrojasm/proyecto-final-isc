import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { GroupBottomTabParamList } from '../navigation/types.navigation';
import { SessionContext } from '../context';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';
import firebase from '../firebase/config';
import { unsubscribe, addData } from '../firebase/database';
import { MessageList } from '../components';
import moment from 'moment';
import api from '../api';
import { useNavigation } from '@react-navigation/native';

type Message = {
  sender?: string;
  content?: string;
  date: string;
  newday?: boolean;
};

const GroupRoom = () => {
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [messageList, setMessageList] = useState<Message[] | null>(null);
  const [message, setMessage] = useState<string>('');
  const userContext = useContext(SessionContext);
  const navigation = useNavigation();

  useEffect(() => {
    const addOnlineUser = async () => {
      firebase
        .database()
        .ref(`group_messages/${userContext?.currentGroup?.name}/online_users`)
        .orderByChild('name')
        .equalTo(userContext?.currentUser.username)
        .once('value', async (snapshot) => {
          if (!snapshot.hasChildren()) {
            await addData(`group_messages/${userContext?.currentGroup?.name}/online_users`, {
              name: userContext?.currentUser?.username,
            });
          }
        });
    };

    addOnlineUser();
    firebase
      .database()
      .ref(`group_messages/${userContext?.currentGroup?.name}/online_users`)
      .on('value', (snapshot) => {
        let messages: any[] = [];
        snapshot.forEach((elem) => {
          messages.push(elem.val());
        });
        setOnlineUsers(messages);
        setNavigationHeader(messages.length);
      });
    firebase
      .database()
      .ref(`group_messages/${userContext?.currentGroup?.name}/messages`)
      .on('value', (snapshot) => {
        let messages: any[] = [];
        snapshot.forEach((elem) => {
          messages.push(elem.val());
        });
        setMessageList(messages);
      });

    return () => {
      firebase
        .database()
        .ref(`group_messages/${userContext?.currentGroup?.name}/online_users`)
        .orderByChild('name')
        .equalTo(userContext?.currentUser.username)
        .once('value', (snapshot) => {
          //snapshot.ref.remove();
          const jsonRef: any = snapshot.toJSON();
          const refEntry = Object.keys(jsonRef)[0];
          snapshot.ref.child(refEntry).remove();
        });
      unsubscribe(`group_messages/${userContext?.currentGroup?.name}/online_users`);
      unsubscribe(`group_messages/${userContext?.currentGroup?.name}/messages`);
    };
  }, []);

  const sendMessage = async () => {
    let obj = {
      sender: userContext?.currentUser?.username,
      content: message,
      date: new Date().toString(),
    };
    let formattedDate = moment(Date.parse(obj.date)).format('L');
    //addData(`group_messages/${userContext?.currentGroup?.name}/messages`, obj)
    const ref = firebase.database().ref(`group_messages/${userContext?.currentGroup?.name}/dates`);
    ref
      .orderByChild('date')
      .equalTo(formattedDate)
      .once('value', (snapshot) => {
        if (!snapshot.val()) {
          addData(`group_messages/${userContext?.currentGroup?.name}/dates`, {
            date: formattedDate,
          });
          addData(`group_messages/${userContext?.currentGroup?.name}/messages`, {
            date: formattedDate,
            newday: true,
          });
        }
        addData(`group_messages/${userContext?.currentGroup?.name}/messages`, obj);
        setMessage('');
      });

    let prediction = await api.models().predict(obj.content);
    await api.predictions().create('group', userContext?.currentGroup?.id, prediction);
    await api.predictions().create('user', userContext?.currentUser?.id, prediction);
  };
  const setNavigationHeader = (num: number) => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={tailwind('text-center font-bold text-base text-white')}>
          {userContext?.currentGroup?.name} Room Chat
        </Text>
      ),
      headerRight: () => (
        <FontAwesome5
          name="users"
          size={23}
          style={tailwind('mr-5 self-center text-white')}
          onPress={() => {
            navigation.navigate('UserList');
          }}
        />
      ),
    });
  };

  if (!messageList) {
    return (
      <View style={{ height: '100%' }}>
        <ActivityIndicator size="large" color="#0000ff" style={tailwind('p-8')} />
      </View>
    );
  }

  return (
    <View style={{ ...tailwind('flex flex-col-reverse bg-white'), height: '100%' }}>
      <View style={tailwind('flex flex-row ml-6 ')}>
        <TextInput
          placeholder="Say hello!"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={sendMessage}
          style={tailwind('my-4 border border-black w-5/6 pl-1 mr-3 h-10 text-base rounded')}
        />
        <TouchableOpacity style={tailwind('self-center')} onPress={sendMessage}>
          <Ionicons on name="ios-send-sharp" size={25} />
        </TouchableOpacity>
      </View>
      <View style={tailwind('h-5/6 flex items-center ')}>
        <MessageList messages={messageList} />
      </View>
    </View>
  );
};

export default GroupRoom;
