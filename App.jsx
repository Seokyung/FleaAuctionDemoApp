import React from 'react';
import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Layout from './src/components/Layout';
import MarketScreen from './src/screens/MarketScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={appStyles.appContainer}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <MarketScreen /> */}
      <Layout />
    </View>
  );
}

const appStyles = StyleSheet.create({
  appContainer: {
    width: '100%',
    height: '100%',
  },
});

export default App;
