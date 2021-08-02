import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { GroupCard } from '../components';
import api from '../api';
import { FontAwesome } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';
type Group = {
  name: string;
  description: string;
  totalUsers: number;
  users: Array<any>;
  id: number;
};

const tags = ['anxiety', 'ocd', 'depression', 'ptsd'];

const GroupSearch = () => {
  const [groups, setGroups] = useState<Array<Group> | null>(null);
  const [search, setSearch] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const searchGroups = async (): Promise<void> => {
    let returnArr: any = [];
    if (tags.includes(search)) {
      returnArr = await api.groups().getByTags(search);
    }
    let groupNames = await api.groups().getByName(search);
    returnArr.concat(groupNames);
    setGroups(returnArr);
    setSearchTerm(search);
    setSearch('');
  };
  return (
    <View style={{ ...tailwind('bg-white'), height: '100%' }}>
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
