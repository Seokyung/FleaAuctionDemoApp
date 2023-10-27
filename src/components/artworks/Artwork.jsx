import React from 'react';
import {TouchableHighlight} from 'react-native';
import styled from 'styled-components';

function Artwork({item, onArtworkPress}) {
  return (
    <TouchableHighlight onPress={() => onArtworkPress(item.auctionId)}>
      <ArtworkContainer>
        <ArtworkText>작품ID ({item.auctionId})</ArtworkText>
        <ArtworkText>조회수: {item.viewCount}</ArtworkText>
      </ArtworkContainer>
    </TouchableHighlight>
  );
}

const ArtworkContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #000;
  background-color: #ddd;
`;

const ArtworkText = styled.Text`
  color: #000;
  font-size: 14px;
  font-weight: 500;
`;

export default Artwork;
