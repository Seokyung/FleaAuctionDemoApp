import React from 'react';
import styled from 'styled-components';

function TabBar({StyledText}) {
  return (
    <Menu>
      <StyledText>탭 바</StyledText>
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

export default TabBar;
