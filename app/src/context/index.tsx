import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
export const SessionContext = React.createContext<IContext | null>(null);

export const Provider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [currentGroup, setCurrentGroup] = useState<IGroup | null>(null);

  const logIn = async (userUID: string): Promise<void> => {
    let user = await api.users().getById(userUID);
    if (user) {
      setCurrentUser(user[0]);
    } else {
      console.log('No user found');
    }
  };

  const joinGroup = async (groupId: number): Promise<void> => {
    let group = await api.groups().getById(groupId);
    setCurrentGroup(group);
  };

  const logOut = (): void => {
    setCurrentUser(null);
    setCurrentGroup(null);
    AsyncStorage.removeItem('uid');
  };

  return (
    <SessionContext.Provider value={{ currentUser, currentGroup, logIn, logOut, joinGroup }}>
      {children}
    </SessionContext.Provider>
  );
};
