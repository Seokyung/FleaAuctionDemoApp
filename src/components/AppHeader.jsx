import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components';

function AppHeader({StyledText}) {
  return (
    <StyledHeader>
      <StyledText>마켓</StyledText>
      <Button title="Search" />
    </StyledHeader>
  );
}

const StyledHeader = styled.View`
  flex: 1.5;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: pink;
`;

export default AppHeader;
