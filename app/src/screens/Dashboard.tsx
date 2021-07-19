import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { Text } from 'react-native';
import { RootStackParamList } from '../navigation/types.navigation';
import api from '../api';
import { SessionContext } from '../context';
const Dashboard = ({ navigation }: StackScreenProps<RootStackParamList, 'Root'>) => {
  const [text, setText] = useState<string>('');
  const [predictionResult, setPredictionResult] = useState<string>('');
  const userContext = useContext(SessionContext);
  return (
    <View>
      <Text>Dashboard</Text>
      <Button
        title="TO AUTH"
        onPress={() => {
          userContext?.logOut();
          navigation.replace('Auth');
        }}
      />
      <TextInput
        value={text}
        placeholder="INPUT YOUR PREDICTION TEXT"
        onChangeText={setText}></TextInput>
      <Button
        title="PREDICT"
        onPress={async () => {
          setPredictionResult(await api.models().predict(text));
        }}
      />
      <Text>Prediction: {predictionResult}</Text>
    </View>
  );
};

export default Dashboard;
