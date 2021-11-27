import React, { useEffect, useState } from 'react';
import tailwind from 'tailwind-rn';
import { Text, View, Pressable, Image } from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { SliderBox } from 'react-native-image-slider-box';
import window from '../../constants/Layout';
import FileTypeIcon from '../file/FileTypeIcon';
import * as Linking from 'expo-linking';

type Comment = {
  content: string;
  date: string;
  leftBy: string;
};

const BASE_URL = 'https://d293f2ppq9cj5.cloudfront.net/';
interface IFeedPostProps {
  post: {
    content: string;
    postedBy: string;
    date: string;
    comments: Comment[];
    hasAttachments: boolean;
    attachments: string[];
  };
  refreshPosts: () => Promise<void>;
}

const FeedPost = ({ post, refreshPosts }: IFeedPostProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [singleImage, setSingleImage] = useState({ height: 0, width: 0 });
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const { width } = window.window;

  useEffect(() => {
    if (post.hasAttachments) {
      let arr: string[] = [];
      let attachments: string[] = [];
      post.attachments.forEach((fileName) => {
        if (fileName.includes('.png') || fileName.includes('.jpg') || fileName.includes('.jpeg')) {
          arr.push(`${BASE_URL}${fileName}`);
        }
        attachments.push(`${BASE_URL}${fileName}`);
      });
      let att = attachments.filter((elem) => arr.indexOf(elem) === -1);
      setAttachments(att);
      setImages(arr);

      if (arr.length === 1) {
        Image.getSize(arr[0], (w, h) => {
          const postWidth = (width * 11) / 12;
          if (w > (postWidth * 11) / 12) {
            let resizeScale = postWidth / w;
            w *= resizeScale;
            h *= resizeScale;
          }
          setSingleImage({ width: w, height: h });
        });
      }
    }
  }, []);

  const hideModal = () => {
    setVisible(false);
    recalculateWidth((width * 11) / 12);
  };

  const recalculateWidth = (width: number) => {
    Image.getSize(images[0], (w, h) => {
      if (w > width) {
        let resizeScale = width / w;
        w *= resizeScale;
        h *= resizeScale;
      }
      setSingleImage({ width: w, height: h });
    });
  };

  const ImageDisplayer = () => {
    console.log(images);
    return (
      <>
        {images.length > 1 ? (
          <SliderBox
            images={images}
            parentWidth={visible ? width : (width * 11) / 12}
            onCurrentImagePressed={() => {
              setVisible(true);
            }}
          />
        ) : (
          <Pressable
            onPress={() => {
              setVisible(true);
              recalculateWidth(width);
            }}>
            <Image
              style={{ height: singleImage.height, width: singleImage.width }}
              source={{ uri: images[0] }}
            />
          </Pressable>
        )}
      </>
    );
  };
  return (
    <>
      {images.length > 0 && (
        <Modal
          isVisible={visible}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={hideModal}
          backdropOpacity={1}>
          <View style={tailwind('relative right-4')}>
            <ImageDisplayer />
          </View>
        </Modal>
      )}
      <Pressable
        style={{
          ...tailwind('bg-white flex w-11/12 my-2'),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
        onPress={() => {
          navigation.navigate('Replies', { post, refreshPosts });
        }}>
        <View style={tailwind('flex flex-row items-center')}>
          <Text style={tailwind('text-sm font-bold text-black my-1 ml-2')}>{post.postedBy}</Text>
          <Text style={tailwind('text-sm font-light text-blue-400 ml-4')}>
            {moment(Date.parse(post.date)).format('lll')}
          </Text>
        </View>
        <Text style={tailwind('text-sm font-light text-black ml-2 mt-2 mb-4')}>{post.content}</Text>
        {images.length > 0 && <ImageDisplayer />}
        {attachments.length > 0 &&
          attachments.map((att, index) => {
            let fileName = att.split('.net/')[1];
            let fileType = fileName.split('.')[1];
            return (
              <View
                key={index}
                style={{
                  ...tailwind('flex items-center flex-row py-4 my-1 pl-2 '),
                }}>
                <FileTypeIcon type={fileType} />
                <Pressable
                  onPress={() => {
                    Linking.openURL(att);
                  }}>
                  <Text
                    style={{ ...tailwind('mx-2 text-sm text-blue-400 underline'), flexShrink: 1 }}>
                    {fileName.split('/')[2]}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        <Text style={tailwind('text-xs text-black font-bold ml-6 my-2')}>
          {post.comments.length === 0 ? 'No' : post.comments.length}
          {post.comments.length === 1 ? ' Reply' : ' Replies'}
        </Text>
      </Pressable>
    </>
  );
};

export default FeedPost;
