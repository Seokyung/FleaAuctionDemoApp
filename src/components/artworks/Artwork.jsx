import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import styled from 'styled-components';

function Artwork({item, onArtworkPress}) {
  return (
    <TouchableWithoutFeedback onPress={() => onArtworkPress(item.auctionId)}>
      <ArtworkContainer>
        <ImgContainer></ImgContainer>
        <Textbox>
          <ArtworkText>작품ID ({item.auctionId})</ArtworkText>
          <ArtworkText>조회수: {item.viewCount}</ArtworkText>
        </Textbox>
      </ArtworkContainer>
    </TouchableWithoutFeedback>
  );
}

const ArtworkContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 8px;
`;

const ImgContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  background-color: #fff;
`;

const Textbox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

const ArtworkText = styled.Text`
  color: #000;
  font-size: 14px;
  font-weight: 500;
`;

export default Artwork;
