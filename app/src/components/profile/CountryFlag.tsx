import React from 'react';
import { View } from 'react-native';
import Flag from 'react-native-flags-typescript';

const CountryFlag = ({ region, style }: { region: string; style: any }) => {
  switch (region) {
    case 'NA':
      return <Flag style={style} code="US" size={24} />;
    case 'EU':
      return <Flag style={style} code="GB-ENG" size={24} />;
    case 'ME':
      return <Flag style={style} code="AE" size={24} />;
    case 'AF':
      return <Flag style={style} code="ZA" size={24} />;
    case 'AS':
      return <Flag style={style} code="JP" size={24} />;
    case 'SA':
      return <Flag style={style} code="CL" size={24} />;
    case 'AU':
      return <Flag style={style} code="AU" size={24} />;
  }

  return null;
};

export default CountryFlag;
