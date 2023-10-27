import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components';

function AppHeader() {
  return (
    <StyledHeader>
      <HeaderText>마켓</HeaderText>
      <Button title="🔍" />
    </StyledHeader>
  );
}

const StyledHeader = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 2px 16px;
`;

const HeaderText = styled.Text`
  color: #000;
  font-size: 24px;
  font-weight: 700;
`;

export default AppHeader;
