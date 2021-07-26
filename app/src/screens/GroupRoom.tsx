import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { GroupBottomTabParamList } from '../navigation/types.navigation';
import { SessionContext } from '../context';
import { Ionicons } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';
import firebase from '../firebase/config';
import { unsubscribe, addData } from '../firebase/database';
import { MessageList } from '../components';
import moment from 'moment';

type Message = {
  sender?: string;
  content?: string;
  date: string;
  newday?: boolean;
};

const GroupRoom = ({ navigation }: StackScreenProps<GroupBottomTabParamList, 'Room'>) => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const userContext = useContext(SessionContext);

  useEffect(() => {
    setNavigationHeader();
    firebase
      .database()
      .ref('group_messages/grupo1/messages')
      .on('value', (snapshot) => {
        let messages: any[] = [];
        snapshot.forEach((elem) => {
          messages.push(elem.val());
        });
        setMessageList(messages);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const sendMessage = () => {
    let obj = {
      sender: userContext?.currentUser?.username,
      content: message,
      date: new Date().toString(),
    };
    let formattedDate = moment(Date.parse(obj.date)).format('L');
    //addData(`group_messages/${userContext?.currentGroup?.name}/messages`, obj)
    const ref = firebase.database().ref('group_messages/grupo1/dates');
    ref
      .orderByChild('date')
      .equalTo(formattedDate)
      .once('value', (snapshot) => {
        if (!snapshot.val()) {
          addData(`group_messages/grupo1/dates`, { date: formattedDate });
          addData(`group_messages/grupo1/messages`, { date: formattedDate, newday: true });
        }
        addData('group_messages/grupo1/messages', obj);
        setMessage('');
      });
  };
  const setNavigationHeader = () => {
    navigation.setOptions({
      headerTitle: (props) => (
        <Text>{/*userContext?.currentGroup.name*/}Room Chat - X People Online</Text>
      ),
    });
  };
  return (
    <View style={{ ...tailwind('flex flex-col-reverse bg-white'), height: '100%' }}>
      <View style={tailwind('flex flex-row ml-6 my-0')}>
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
      <View style={tailwind('h-5/6 flex items-center')}>
        <MessageList messages={messageList} />
      </View>
    </View>
  );
};

export default GroupRoom;
