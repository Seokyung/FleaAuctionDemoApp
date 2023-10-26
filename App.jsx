import React, {useEffect, useState} from 'react';
import EventSource from 'react-native-sse';
import {API_URL} from '@env';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App() {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!listening) {
      setListening(true);
      const eventSource = new EventSource(API_URL);

      eventSource.addEventListener('open', event => {
        console.log('Server Connected!');
      });

      eventSource.addEventListener('sse.auction_viewed', event => {
        const parsedData = JSON.parse(event.data);
        setData(prev => [...prev, parsedData]);
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

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>Flea:Auction Demo App</Text>
          <Text>마켓 - 진행중</Text>
          <View style={styles.cardContainer}>
            {data.map((item, idx) => {
              return (
                <View key={idx} style={styles.card}>
                  <Text style={styles.card.cardText}>
                    Auction Id: {item.auctionId}
                  </Text>
                  <Text style={styles.card.cardText}>
                    View Count: {item.viewCount}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  cardContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: 'aliceblue',
  },
  card: {
    margin: 8,
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#555',
    cardText: {
      fontSize: 16,
      color: '#fff',
    },
  },
});

export default App;
