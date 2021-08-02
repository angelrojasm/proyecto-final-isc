import React, { useContext, useState, useEffect } from 'react';
import { Text, ScrollView, View, RefreshControl } from 'react-native';
import { GroupCard } from '../components';
import { useNavigation } from '@react-navigation/native';
import api from '../api';
import { SessionContext } from '../context';
import tailwind from 'tailwind-rn';

const Dashboard = () => {
  const [initialState, setInitialState] = useState(true);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [qod, setQod] = useState({ quote: '', author: '' });
  const [refreshing, setRefreshing] = React.useState(false);
  const userContext = useContext(SessionContext);
  const navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Text style={tailwind('p-3 pl-4 text-base')}>
            Hello, <Text style={tailwind('font-bold')}>{userContext?.currentUser?.username}!</Text>
          </Text>
        );
      },
    });
    const getData = async () => {
      const groups = await api.groups().getAll();

      const recommended: any[] = [];
      //get recommended groups
      groups.forEach((group: { tags: any }) => {
        let afflictions = userContext?.currentUser?.afflictions;
        for (const affl of afflictions) {
          if (group.tags.includes(affl)) {
            recommended.push(group);
            break;
          }
        }
      });

      setRecommended(recommended);
      //Get quote of the day
      setQod(await api.utils().getQuoteOfTheDay());
    };
    if (initialState) {
      getData();
      setInitialState(false);
    }
    if (refreshing) {
      getData();
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: 'white', minHeight: '100%' }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {/* Quote of The Day Section */}
      <View style={tailwind('flex items-center py-4')}>
        <Text style={tailwind('text-base font-medium')}>Here's the Quote of The Day:</Text>
        <View style={tailwind('mt-4 w-5/6 flex items-center')}>
          <Text style={tailwind('italic text-base font-semibold tracking-normal text-justify')}>
            "{qod.quote}"
          </Text>
          <Text style={tailwind('mt-2 font-bold')}>- {qod.author}</Text>
        </View>
      </View>

      {/* Recommended Groups Section */}
      <View style={tailwind('my-2')}>
        <Text style={tailwind('text-center mb-2 font-medium text-base')}>
          Here are some groups we think you might like:
        </Text>
        <View style={tailwind('flex items-center ')}>
          {recommended.map((group, idx) => {
            if (idx < 2) {
              return <GroupCard key={idx} group={group} />;
            }
            return null;
          })}
          <Text
            style={tailwind('underline text-blue-600 font-bold text-center')}
            onPress={() => {
              navigation.navigate('RecommendedList', { recommended });
            }}>
            Check out all of the groups
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
