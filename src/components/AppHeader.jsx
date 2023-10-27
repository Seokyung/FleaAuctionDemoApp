import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components';

function AppHeader({StyledText}) {
  return (
    <StyledHeader>
      <StyledText>마켓</StyledText>
      <Button title="🔍" />
    </StyledHeader>
  );
}

const StyledHeader = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: pink;
`;

export default AppHeader;
