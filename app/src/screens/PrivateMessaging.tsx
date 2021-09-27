import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import firebase from '../firebase/config';
import tailwind from 'tailwind-rn';
import { SessionContext } from '../context';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { unsubscribe } from '../firebase/database';

const PrivateMessaging = () => {
  const userContext = useContext(SessionContext);
  const [conversations, setConversations] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    let convs: any[] = [];
    firebase
      .database()
      .ref(`private_messages`)
      .on('value', async (snapshot) => {
        snapshot.forEach((elem) => {
          if (elem.key?.includes(userContext?.currentUser?.username)) {
            let endUser = elem.key
              .split('---')
              .filter((elem) => elem !== userContext?.currentUser?.username)[0];
            let convMessages = Object.values(elem.val().messages);
            let lastMessage: any = convMessages[convMessages.length - 1];
            convs.push({
              endUser,
              lastMessage: lastMessage.content,
            });
          }
        });
        setConversations(convs);
      });

    return () => {
      //unsubscribe(`group_messages/${userContext?.currentGroup?.name}/online_users`);
    };
  }, []);

  return (
    <View style={{ ...tailwind('bg-white flex items-center'), height: '100%' }}>
      {conversations.map((conversation: any, idx: number) => (
        <TouchableHighlight
          key={idx}
          style={{ ...tailwind('border-b border-gray-200 flex items-center '), width: '100%' }}
          activeOpacity={0.3}
          underlayColor="#eee"
          onPress={() =>
            navigation.navigate('MessageChat', {
              convName: `${userContext?.currentUser?.username}---${conversation.endUser}`,
            })
          }>
          <View style={tailwind('w-11/12 flex flex-row justify-between')}>
            <View style={tailwind('flex flex-row')}>
              <FontAwesome
                name="user-circle"
                size={50}
                style={tailwind('self-center text-gray-400 mr-2')}
              />
              <View>
                <Text style={tailwind('mx-2 mt-2 text-lg font-bold')}>{conversation.endUser}</Text>
                <Text style={tailwind('mx-2 mb-3 text-sm font-medium text-gray-500')}>
                  {conversation.lastMessage}
                </Text>
              </View>
            </View>
            <AntDesign name="right" size={30} style={tailwind('self-center')} />
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
};

export default PrivateMessaging;
