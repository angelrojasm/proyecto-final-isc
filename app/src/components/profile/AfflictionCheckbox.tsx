import { Text, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import tailwind from 'tailwind-rn';
import { AntDesign } from '@expo/vector-icons';

interface IAfflictionCheckbox {
  name: string;
  desc: string;
  onChange: (name: string) => void;
}

const checkedStyle = tailwind('bg-blue-500 border border-blue-400');

const baseStyle = tailwind('bg-gray-300 border border-gray-300');

const AfflictionCheckbox = ({ name, desc, onChange }: IAfflictionCheckbox) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Pressable
      style={{ ...tailwind('flex flex-row my-1.5'), minWidth: '100%' }}
      onPress={() => {
        setChecked(!checked);
        onChange(name);
      }}>
      <View
        style={
          checked
            ? tailwind('bg-green-400 border border-black rounded-md self-center mx-4 p-0.5')
            : tailwind('border border-black rounded-md self-center mx-4 p-0.5')
        }>
        <AntDesign
          name="check"
          size={15}
          style={
            checked
              ? tailwind('text-white font-bold')
              : tailwind('text-black font-bold self-center')
          }
        />
      </View>
      <View
        style={
          checked
            ? { ...tailwind('rounded-md py-2 px-8 w-5/6'), ...checkedStyle }
            : { ...tailwind('rounded-md py-2 px-8 w-5/6'), ...baseStyle }
        }>
        <Text style={checked ? tailwind('text-white font-bold') : tailwind('text-black font-bold')}>
          {name}
        </Text>
        <Text
          style={
            checked
              ? tailwind('text-white font-bold text-base')
              : tailwind('text-black font-bold text-base')
          }>
          {desc}
        </Text>
      </View>
    </Pressable>
  );
};

export default AfflictionCheckbox;
