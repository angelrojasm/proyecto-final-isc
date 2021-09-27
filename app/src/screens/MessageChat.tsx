import moment from 'moment';
import React, { useState, useEffect, useContext } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import tailwind from 'tailwind-rn';
import api from '../api';
import { SessionContext } from '../context';
import firebase from '../firebase/config';
import { addData, unsubscribe } from '../firebase/database';
import { Ionicons } from '@expo/vector-icons';
import { MessageList } from '../components';
import { useNavigation } from '@react-navigation/native';

type Message = {
  sender?: string;
  content?: string;
  date: string;
  newday?: boolean;
};

const MessageChat = ({ route }: any) => {
  const [message, setMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<Message[]>([]);
  const { convName } = route.params;
  const navigation = useNavigation();
  const userContext = useContext(SessionContext);
  const endUser = convName
    .split('---')
    .filter((elem: string) => elem !== userContext?.currentUser?.username)[0];

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={tailwind('font-bold text-base')}>{endUser}</Text>,
    });
    firebase
      .database()
      .ref(`private_messages/${convName}/messages`)
      .on('value', (snapshot) => {
        let messages: any[] = [];
        snapshot.forEach((elem) => {
          messages.push(elem.val());
        });
        setMessageList(messages);
      });

    return () => {
      unsubscribe(`private_messages/${convName}/messages`);
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
    const ref = firebase.database().ref(`private_messages/${convName}/dates`);
    ref
      .orderByChild('date')
      .equalTo(formattedDate)
      .once('value', (snapshot) => {
        if (!snapshot.val()) {
          addData(`private_messages/${convName}/dates`, {
            date: formattedDate,
          });
          addData(`private_messages/${convName}/messages`, {
            date: formattedDate,
            newday: true,
          });
        }
        addData(`private_messages/${convName}/messages`, obj);
        setMessage('');
      });

    // let prediction = await api.models().predict(obj.content);
    // api.predictions().create(prediction, userContext?.currentGroup?.name);
  };

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

export default MessageChat;
