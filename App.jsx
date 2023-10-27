import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import MarketScreen from './src/screens/MarketScreen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <AppContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TopMargin />
      <MarketScreen />
      <BottomMargin />
    </AppContainer>
  );
}

const AppContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const TopMargin = styled.View`
  height: 6%;
`;

const BottomMargin = styled.View`
  height: 3%;
`;

export default App;
