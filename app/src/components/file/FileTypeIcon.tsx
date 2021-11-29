import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';

const SIZE = 21;
export default function FileTypeIcon({ type }: { type: string }) {
  switch (type.toLowerCase()) {
    case 'txt':
      return <AntDesign name="filetext1" size={SIZE} />;
    case 'pdf':
      return <AntDesign name="pdffile1" size={SIZE} />;
    case 'md':
      return <AntDesign name="file-markdown" size={SIZE} />;
    case 'csv':
      return <FontAwesome5 name="file-csv" size={SIZE} />;
    case 'zip':
      return <FontAwesome name="file-zip-o" size={SIZE} />;
    case '.xls':
    case 'xlsx':
      return <MaterialCommunityIcons name="microsoft-excel" size={SIZE} />;
    case 'doc':
    case 'docx':
      return <MaterialCommunityIcons name="microsoft-word" size={SIZE} />;
    case 'ppt':
    case 'pptx':
      return <MaterialCommunityIcons name="microsoft-powerpoint" size={SIZE} />;
    case 'mp3':
    case 'mp4':
      return <FontAwesome5 name="file-audio" size={SIZE} />;
    case 'jpg':
    case 'jpeg':
    case 'png':
      return <FontAwesome5 name="file-image" size={SIZE} />;
    default:
      return <AntDesign name="file1" size={SIZE} />;
  }
}
