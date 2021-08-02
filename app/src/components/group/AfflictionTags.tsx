import { Text, View } from 'react-native';
import React from 'react';
import tailwind from 'tailwind-rn';

const tagColors: any = {
  ptsd: 'blue',
  anxiety: 'purple',
  stress: 'green',
};

const AfflictionTags = ({ afflictions }: { afflictions: string[] }) => {
  return (
    <View style={tailwind('flex flex-row')}>
      {afflictions.map((affl: string, idx: number) => {
        return (
          <View
            key={idx}
            style={{
              ...tailwind('rounded-2xl mx-1 flex items-center'),
              backgroundColor: tagColors[affl],
            }}>
            <Text style={tailwind('font-bold text-white text-sm p-1 px-2')}>{affl}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default AfflictionTags;
