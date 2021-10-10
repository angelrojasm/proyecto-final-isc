import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import firebase from '../firebase/config';
import tailwind from 'tailwind-rn';
import { SessionContext } from '../context';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { unsubscribe } from '../firebase/database';

const UserList = () => {
  const userContext = useContext(SessionContext);
  const [users, setUsers] = useState<any[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    firebase
      .database()
      .ref(`group_messages/${userContext?.currentGroup?.name}/online_users`)
      .on('value', (snapshot) => {
        let messages: any[] = [];
        snapshot.forEach((elem) => {
          messages.push(elem.val());
        });
        navigation.setOptions({
          headerTitle: () => (
            <Text style={tailwind('text-base font-bold ')}>
              {messages.length} {messages.length === 1 ? 'User' : 'Users'} Online
            </Text>
          ),
        });

        setUsers(messages);
      });
    return () => {
      unsubscribe(`group_messages/${userContext?.currentGroup?.name}/online_users`);
    };
  }, []);
  return (
    <View style={{ ...tailwind('bg-white flex items-center'), height: '100%' }}>
      {users.map((user: any, idx: number) => (
        <View
          key={idx}
          style={tailwind('w-11/12 border-b border-gray-200 flex flex-row justify-between')}>
          <Text style={tailwind('mx-2 my-4 text-base font-bold')}>{user.name}</Text>
          {userContext?.currentUser?.username !== user.name && (
            <View style={tailwind('flex flex-row')}>
              {userContext?.currentGroup.users[1] == userContext?.currentUser?.id && (
                <TouchableOpacity
                  style={tailwind('self-center mr-4 ')}
                  onPress={() => {
                    Alert.alert(
                      'Ban User',
                      'Are you sure you want to ban this user from the group?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                      ]
                    );
                  }}>
                  <FontAwesome style={tailwind('text-red-600')} name="ban" size={35} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={tailwind('self-center mr-3')}
                onPress={() => {
                  let users = [user.name, userContext?.currentUser?.username].sort();
                  let convName = `${users[0]}---${users[1]}`;
                  navigation.navigate('MessageChat', { convName });
                }}>
                <MaterialCommunityIcons name="send-circle-outline" size={37.5} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default UserList;
