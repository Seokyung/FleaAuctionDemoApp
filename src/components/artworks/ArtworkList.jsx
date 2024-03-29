import React from 'react';
import Artwork from './Artwork';
import styled from 'styled-components';

function ArtworkList({list, onArtworkPress}) {
  return (
    <ListContainer>
      <ListScroll horizontal={true} contentInsetAdjustmentBehavior="automatic">
        {list.map(item => {
          return (
            <Artwork
              key={item.auctionId}
              item={item}
              onArtworkPress={onArtworkPress}
            />
          );
        })}
      </ListScroll>
    </ListContainer>
  );
}

const ListContainer = styled.View`
  flex: 1;
  margin: 10px 0;
  padding: 6px;
  border-radius: 10px;
  background-color: rgb(170, 170, 170);
`;

const ListScroll = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}))`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

export default ArtworkList;
