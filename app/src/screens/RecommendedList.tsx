import { Text, ScrollView } from 'react-native';
import tailwind from 'tailwind-rn';
import React from 'react';
import { GroupCard } from '../components';

const RecommendedList = ({ route }: any) => {
  const { recommended } = route.params;

  return (
    <ScrollView contentContainerStyle={tailwind('flex items-center')}>
      {recommended.map((group: any, idx: number) => {
        return <GroupCard key={idx} group={group} />;
      })}
    </ScrollView>
  );
};

export default RecommendedList;
