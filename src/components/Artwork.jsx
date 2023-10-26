import React from 'react';
import {Text, View} from 'react-native';

function Artwork({item}) {
  return (
    <View>
      <Text>Auction Id: {item.auctionId} </Text>
      <Text>View Count: {item.viewCount}</Text>
    </View>
  );
}

export default Artwork;
