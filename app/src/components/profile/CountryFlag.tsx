import React from 'react';
import { View } from 'react-native';
import ReactCountryFlag from 'react-country-flag';

const CountryFlag = ({ region }: { region: string }) => {
  switch (region) {
    case 'NA':
      return <ReactCountryFlag countryCode="US" />;
    case 'EU':
      return <ReactCountryFlag countryCode="GB-ENG" />;
    case 'ME':
      return <ReactCountryFlag countryCode="AE" />;
    case 'AF':
      return <ReactCountryFlag countryCode="ZA" />;
    case 'AS':
      return <ReactCountryFlag countryCode="JP" />;
    case 'SA':
      return <ReactCountryFlag countryCode="CL" />;
    case 'AU':
      return <ReactCountryFlag countryCode="AU" />;
  }
};

export default CountryFlag;
