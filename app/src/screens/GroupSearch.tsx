import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { GroupCard } from '../components';
import api from '../api';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';

type Group = {
  name: string;
  description: string;
  totalUsers: number;
  users: Array<any>;
  tags: string[];
  id: number;
};

const tags = ['anxiety', 'ocd', 'depression', 'ptsd'];

const GroupSearch = () => {
  const [groups, setGroups] = useState<Array<Group> | null>(null);
  const [search, setSearch] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigation = useNavigation();

  const searchGroups = async (): Promise<void> => {
    if (search === '') {
      setGroups(await api.groups().getAll());
      setSearchTerm('All Groups');
    } else {
      let returnArr: any = [];
      if (tags.includes(search.toLowerCase())) {
        returnArr = await api.groups().getByTags(search.toLowerCase());
      }
      let groupNames = await api.groups().getByName(search.toLowerCase());
      console.log(groupNames);
      let newArr = returnArr.concat(groupNames);

      const filteredArr = newArr.filter(
        (element: any, index: number, array: any) =>
          array.findIndex((obj: any) => JSON.stringify(obj) === JSON.stringify(element)) === index
      );
      setGroups(filteredArr);
      setSearchTerm(search);
      setSearch('');
    }
  };

  return (
    <View style={{ ...tailwind('bg-white'), height: '100%' }}>
      <TouchableOpacity
        style={{ alignSelf: 'flex-start', ...tailwind('absolute z-10 bottom-10 right-6') }}
        onPress={() => {
          navigation.navigate('GroupCreate');
        }}>
        <Ionicons
          name="add"
          size={40}
          style={tailwind('rounded-full p-1 bg-blue-400 text-white ')}
        />
      </TouchableOpacity>
      <View style={tailwind('flex flex-row ml-6')}>
        <TextInput
          placeholder="Search for groups here..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={searchGroups}
          style={tailwind('my-4 border border-black w-5/6 pl-1 mr-3 h-10 text-base rounded')}
        />
        <TouchableOpacity style={tailwind('self-center')} onPress={searchGroups}>
          <FontAwesome on name="search" size={25} />
        </TouchableOpacity>
      </View>
      {groups && (
        <ScrollView contentContainerStyle={tailwind('flex items-center')}>
          <Text style={tailwind('text-xl mr-16 font-bold')}>Showing Results for: {searchTerm}</Text>
          {groups?.map((group, idx) => {
            return <GroupCard key={idx} group={group} />;
          })}
          {groups.length === 0 && (
            <Text style={tailwind('text-lg font-bold flex items-center text-black my-32')}>
              No Available Groups...
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default GroupSearch;
