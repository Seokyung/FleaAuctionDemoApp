import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';

import EventSource from 'react-native-sse';
import {API_URL} from '@env';
import {artworkList} from '../assets/artworkList';

const testData = [
  {auctionId: 1, viewCount: 26},
  {auctionId: 2, viewCount: 124},
  {auctionId: 3, viewCount: 982},
  {auctionId: 4, viewCount: 361},
  {auctionId: 5, viewCount: 490},
  {auctionId: 6, viewCount: 65},
  {auctionId: 7, viewCount: 50},
];

function Layout() {
  const [refreshing, setRefreshing] = useState(false);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);

  const [listening, setListening] = useState(false);
  const [viewedData, setViewedData] = useState({});

  // 작품 리스트 랜덤 배열 - Fisher-Yates Shuffle 사용
  const fisherYatesShuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const setLists = () => {
    setList1(
      fisherYatesShuffle(
        artworkList.map(item => {
          return {...item};
        }),
      ),
    );
    setList2(
      fisherYatesShuffle(
        artworkList.map(item => {
          return {...item};
        }),
      ),
    );
  };

  useEffect(() => {
    if (!listening) {
      setListening(true);
      const eventSource = new EventSource(API_URL);

      eventSource.addEventListener('open', event => {
        console.log('Server Connected!');
      });

      eventSource.addEventListener('sse.auction_viewed', event => {
        const parsedData = JSON.parse(event.data);
        setViewedData(parsedData);
      });

      eventSource.addEventListener('error', event => {
        if (event.type === 'error') {
          console.error('Connection error:', event.message);
        } else if (event.type === 'exception') {
          console.error('Error:', event.message, event.error);
        }
      });

      return () => {
        eventSource.addEventListener('close', event => {
          console.log('Close Connection.');
        });
      };
    }
  }, [listening]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setLists();
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const newDataList = list1.map(item => {
      return {
        auctionId: item.auctionId,
        viewCount:
          item.auctionId === viewedData.auctionId
            ? viewedData.viewCount
            : item.viewCount,
      };
    });
    const newDataList2 = list2.map(item => {
      return {
        auctionId: item.auctionId,
        viewCount:
          item.auctionId === viewedData.auctionId
            ? viewedData.viewCount
            : item.viewCount,
      };
    });
    setList1(newDataList);
    setList2(newDataList2);
  }, [viewedData]);

  useEffect(() => {
    setLists();
  }, []);

  const onArtworkPress = id => {
    const newDataList = list1.map(item => {
      return {
        auctionId: item.auctionId,
        viewCount: item.auctionId === id ? ++item.viewCount : item.viewCount,
      };
    });
    const newDataList2 = list2.map(item => {
      return {
        auctionId: item.auctionId,
        viewCount: item.auctionId === id ? ++item.viewCount : item.viewCount,
      };
    });
    setList1(newDataList);
    setList2(newDataList2);
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
        <ScrollView
          contentContainerStyle={styles.svScroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.sv1}>
            <ScrollView horizontal={true}>
              <View style={styles.horizontalView}>
                {list1.map(item => {
                  return (
                    <TouchableHighlight
                      key={item.auctionId}
                      onPress={() => onArtworkPress(item.auctionId)}>
                      <View style={styles.globalView}>
                        <Text>작품ID ({item.auctionId})</Text>
                        <Text>조회수: {item.viewCount}</Text>
                      </View>
                    </TouchableHighlight>
                  );
                })}
              </View>
            </ScrollView>
          </View>
          <View style={styles.sv2}>
            <ScrollView horizontal={true}>
              <View style={styles.horizontalView}>
                {list2.map(item => {
                  return (
                    <TouchableHighlight
                      key={item.auctionId}
                      onPress={() => onArtworkPress(item.auctionId)}>
                      <View style={styles.globalView}>
                        <Text>작품ID ({item.auctionId})</Text>
                        <Text>조회수: {item.viewCount}</Text>
                      </View>
                    </TouchableHighlight>
                  );
                })}
              </View>
            </ScrollView>
          </View>
          {/* <View style={styles.sv3}>
            <ScrollView horizontal={true}>
              <View style={styles.horizontalView}>
                {data.map(item => {
                  return (
                    <TouchableHighlight
                      key={item.auctionId}
                      onPress={() => onArtworkPress(item.auctionId)}>
                      <View style={styles.globalView}>
                        <Text>작품ID ({item.auctionId})</Text>
                        <Text>조회수: {item.viewCount}</Text>
                      </View>
                    </TouchableHighlight>
                  );
                })}
              </View>
            </ScrollView>
          </View> */}
        </ScrollView>
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
  svScroll: {
    flex: 1,
    padding: 8,
    backgroundColor: 'green',
  },
  sv1: {flex: 1, margin: 12, backgroundColor: 'red'},
  sv2: {flex: 1, margin: 12, backgroundColor: 'blue'},
  sv3: {flex: 1, margin: 12, backgroundColor: '#333'},
  horizontalView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
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
