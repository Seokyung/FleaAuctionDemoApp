import React from 'react';
import styled from 'styled-components';

function TabBar() {
  return (
    <Tab>
      <BtnBox>
        <StyledBtn title="🏠" />
        <StyledText>Home</StyledText>
      </BtnBox>
      <BtnBox>
        <StyledBtn title="👩‍⚖️" />
        <StyledText>Market</StyledText>
      </BtnBox>
      <BtnBox>
        <StyledBtn title="📰" />
        <StyledText>Article</StyledText>
      </BtnBox>
      <BtnBox>
        <StyledBtn title="👤" />
        <StyledText>My page</StyledText>
      </BtnBox>
    </Tab>
  );
}

const Tab = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px;
  border-color: #ddd;
  border-top-width: 1px;
`;

const BtnBox = styled.View`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const StyledBtn = styled.Button`
  color: #000;
  font-size: 24px;
  font-weight: 700;
`;

const StyledText = styled.Text`
  color: #000;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
`;

export default TabBar;
