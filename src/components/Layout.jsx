import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import MarketScreen from '../screens/MarketScreen';

const testData = [
  {auctionId: 1, viewCount: 26},
  {auctionId: 2, viewCount: 124},
  {auctionId: 3, viewCount: 982},
  {auctionId: 4, viewCount: 361},
  {auctionId: 5, viewCount: 7},
  {auctionId: 6, viewCount: 65},
  {auctionId: 7, viewCount: 50},
];

function Layout() {
  const shuffleData = arr => {
    arr.sort(() => Math.random() - 0.5);
    return arr;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sampleText}>헤더</Text>
      </View>
      <View style={styles.navBar}>
        <Text style={styles.sampleText}>메뉴</Text>
      </View>
      <View style={styles.svOuter}>
        <View style={styles.sv1}>
          {/* <MarketScreen /> */}
          <ScrollView horizontal={true}>
            <View style={styles.horizontalView}>
              {shuffleData(testData).map(item => {
                return (
                  <View key={item.auctionId} style={styles.globalView}>
                    <Text>작품ID ({item.auctionId})</Text>
                    <Text>조회수: {item.viewCount}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View style={styles.sv2}>
          <ScrollView horizontal={true}>
            <View style={styles.horizontalView}>
              {shuffleData(testData).map(item => {
                return (
                  <View key={item.auctionId} style={styles.globalView}>
                    <Text>작품ID ({item.auctionId})</Text>
                    <Text>조회수: {item.viewCount}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.tapBar}>
        <Text style={styles.sampleText}>탭바</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'pink',
  },
  navBar: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'burlywood',
  },
  tapBar: {
    flex: 1.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkseagreen',
  },
  svOuter: {
    flex: 8,
    padding: 16,
    backgroundColor: 'yellow',
  },
  sv1: {flex: 1, margin: 12, backgroundColor: 'red'},
  sv2: {flex: 1, margin: 12, backgroundColor: 'blue'},
  horizontalView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  verticalView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  globalView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  sampleText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 700,
  },
});

export default Layout;

{
  // 진짜 앱
  /* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <MarketScreen isDarkMode={isDarkMode} />
        </View>
      </ScrollView> */
}
