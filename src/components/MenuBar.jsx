import React from 'react';
import styled from 'styled-components';

function MenuBar({StyledText}) {
  return (
    <Menu>
      <StyledText>메뉴</StyledText>
    </Menu>
  );
}

const Menu = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: burlywood;
`;

export default MenuBar;
