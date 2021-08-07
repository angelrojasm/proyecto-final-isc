import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tailwind from 'tailwind-rn';
import { logOut } from '../firebase/Auth';
import { SessionContext } from '../context';
import { RootStackParamList } from '../navigation/types.navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { GroupEntry } from '../components';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import CountryFlag from '../components/profile/CountryFlag';
import { useNavigation } from '@react-navigation/native';
const regionNames: any = {
  NA: 'North America',
  SA: 'South America and the Caribbean',
  AS: 'Asia',
  AF: 'Africa',
  AU: 'Australia',
  EU: 'European Union',
  ME: 'Middle East',
};

const Profile = () => {
  const userContext = useContext(SessionContext);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logOut();
    userContext?.logOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };
  return userContext?.currentUser ? (
    <View style={tailwind('')}>
      <View style={tailwind('flex flex-row justify-between my-8 ml-4')}>
        <View style={tailwind('flex flex-row w-5/6')}>
          <FontAwesome5
            name="user-alt"
            size={35}
            style={tailwind(
              'text-white text-center self-center bg-black rounded-full h-16 w-16 pt-2 mx-2'
            )}
          />
          <View style={tailwind('flex items-start')}>
            {/* User Info*/}
            <Text style={tailwind('font-bold text-base my-1 ')}>
              {userContext?.currentUser?.username}
            </Text>
            <View style={tailwind('flex flex-row')}>
              <CountryFlag
                style={tailwind('mr-2 self-center')}
                region={userContext?.currentUser?.country}
              />
              <Text style={tailwind('text-sm font-bold')}>
                {regionNames[userContext?.currentUser?.country]}
              </Text>
            </View>
          </View>
        </View>
        <MaterialIcons
          name="edit"
          size={24}
          style={tailwind('self-center p-2 border border-blue-400 text-blue-500 rounded-lg mr-8')}
        />
      </View>
      {/* Group Section */}
      <View style={tailwind('ml-8')}>
        <Text style={tailwind('font-bold text-3xl tracking-wide mb-4')}>Your Groups</Text>
        {userContext?.currentUser?.groups.map((group: any, idx: number) => {
          return <GroupEntry key={idx} groupName={group.name} groupId={group.id} />;
        })}
      </View>
      {userContext?.currentUser?.groups.length === 0 && (
        <View style={tailwind('flex items-center')}>
          <Text style={tailwind('font-bold text-gray-700 text-lg text-center w-10/12')}>
            You are not currently in any groups. Please join a group!
          </Text>
        </View>
      )}
      {/*Log out Button */}
      <TouchableOpacity
        style={tailwind(
          'bg-transparent border border-blue-400 bg-blue-600 rounded-md flex items-center my-16 px-8 py-2 w-3/4 self-center'
        )}
        onPress={handleLogout}>
        <Text style={tailwind('text-white font-bold')}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

export default Profile;
