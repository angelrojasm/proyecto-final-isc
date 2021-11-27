import { Text, View } from 'react-native';
import React from 'react';
import tailwind from 'tailwind-rn';

const tagColors: any = {
  depression: 'blue',
  ptsd: 'purple',
  anxiety: 'green',
};

const AfflictionTags = ({ afflictions }: { afflictions: string[] }) => {
  return (
    <View style={tailwind('flex flex-row mr-1')}>
      <Text style={tailwind('text-sm font-bold')}>Relevant Topics: </Text>
      {afflictions.map((affl: string, idx: number) => {
        if (idx < 3) {
          return (
            <Text key={idx} style={tailwind('italic')}>
              {affl}
              {idx === afflictions.length - 1 ? '' : idx === 2 ? ', ....' : ', '}
            </Text>
          );
        } else return null;
      })}
    </View>
  );
};

export default AfflictionTags;
