import React from 'react';
import styled from 'styled-components';

function MenuBar() {
  return (
    <MenuContainer>
      <Menu status="current">
        <MenuText status="current">진행중</MenuText>
      </Menu>
      <Menu>
        <MenuText>오픈예정</MenuText>
      </Menu>
      <Menu>
        <MenuText>옥션종료</MenuText>
      </Menu>
    </MenuContainer>
  );
}

const MenuContainer = styled.View`
  display: flex;
  gap: 16px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 4px 0;
`;

const Menu = styled.View`
  margin: 4px;
  padding: 4px 2px;
  border-bottom-width: 2px;
  border-color: ${({status}) => (status === 'current' ? '#000' : '#fff')};
`;

const MenuText = styled.Text`
  margin-bottom: 4px;
  color: ${({status}) => (status === 'current' ? '#000' : '#999')};
  font-size: 20px;
  font-weight: 700;
`;

export default MenuBar;
