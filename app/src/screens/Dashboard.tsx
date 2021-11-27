import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Text, ScrollView, View, RefreshControl } from 'react-native';
import { GroupCard } from '../components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import api from '../api';
import { SessionContext } from '../context';
import tailwind from 'tailwind-rn';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const regionCoordinates: any = {
  NA: [42.41536, -102.4569],
  EU: [49.71739, 21.29309],
  ME: [34.00715, 54.33996],
  AF: [7.87428, 20.2384],
  AS: [37.84885, 96.70324],
  SA: [-11.01667, -58.68737],
  AU: [-21.29959, 132.56262],
};

const Dashboard = () => {
  const [initialState, setInitialState] = useState(true);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [qod, setQod] = useState({ quote: '', author: '' });
  const [refreshing, setRefreshing] = useState(false);
  const userContext = useContext(SessionContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refKey, setRefKey] = useState<number>(1);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const getData = async () => {
    const groups = await api.groups().getAll();
    const recommended: any[] = [];
    const userRegion = userContext?.currentUser?.country;
    //get recommended groups for New User with no groups
    if (userContext?.currentUser?.groups.length === 0) {
      groups.forEach((group: { tags: any; users: any[]; distance: number; region: string }) => {
        let afflictions = userContext?.currentUser?.afflictions;
        if (afflictions) {
          for (const affl of afflictions) {
            if (
              group.tags.includes(affl) &&
              !group.users?.includes(userContext?.currentUser?.id.toString())
            ) {
              if (group.distance) group.distance = getDistance(group.region, userRegion);
              recommended.push(group);
              break;
            }
          }
        }
      });
      const sorted = recommended.sort((a, b) => a.distance - b.distance);
      setRecommended(sorted);
    } else {
      if (userContext?.currentGroup?.groups) {
        //Get recommended based on existing correlations
        const userGroups: any[] = [];
        userContext?.currentUser?.groups.forEach((group: any) => userGroups.push(group.id));
        try {
          const response = await api
            .recommendations()
            .getUserRecommendations(userContext?.currentUser?.id);
          const recommended = [];
          for (let i = 0; i < response.groups.length; i++) {
            if (!userGroups.includes(Number(response.groups[i]))) {
              const groupInfo = await api.groups().getById(Number(response.groups[i]));
              groupInfo.match = Number(response.correlations[i]);
              recommended.push(groupInfo);
            }
          }
          setRecommended(recommended);
        } catch (err) {}
      }
    }
    //Get quote of the day
    setQod(await api.utils().getQuoteOfTheDay());
    setRefKey(Math.random());
  };

  useEffect(() => {
    if (isFocused && !initialState) {
      getData();
    }
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={tailwind('p-3 pl-4 text-base')}>
          Hello, <Text style={tailwind('font-bold')}>{userContext?.currentUser?.username}!</Text>
        </Text>
      ),
      headerRight: () => (
        <MaterialCommunityIcons
          name="message-processing"
          style={tailwind('text-gray-500 mr-5')}
          size={30}
          onPress={() => {
            navigation.navigate('PrivateMessaging');
          }}
        />
      ),
    });
    if (initialState) {
      getData();
      setInitialState(false);
    }
    if (refreshing) {
      getData();
      setRefreshing(false);
    }
  }, [refreshing]);

  const getDistance = (from: string, to: string) => {
    const fromCoordinates = regionCoordinates[from];
    const toCoordinates = regionCoordinates[to];
    const [lat1, lon1] = fromCoordinates;
    const [lat2, lon2] = toCoordinates;

    const R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1); // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;

    function deg2rad(deg: number) {
      return deg * (Math.PI / 180);
    }
  };

  return qod.quote ? (
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
      {recommended.length > 0 && (
        <View style={tailwind('my-2')}>
          <Text style={tailwind('text-center mb-2 font-medium text-base')}>
            {userContext?.currentUser?.groups.length === 0
              ? 'You are not in any groups yet! Here are some groups you might like:'
              : 'Here are some groups we think you might like:'}
          </Text>
          <View style={tailwind('flex items-center ')}>
            {recommended.map((group, idx) => {
              if (idx < 2) {
                return <GroupCard refKey={refKey} key={idx} group={group} />;
              }
              return null;
            })}
            {recommended.length > 2 && (
              <Text
                style={tailwind('underline text-blue-600 font-bold text-center')}
                onPress={() => {
                  navigation.navigate('RecommendedList', { recommended });
                }}>
                Check out all of the groups
              </Text>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  ) : null;
};

export default Dashboard;
