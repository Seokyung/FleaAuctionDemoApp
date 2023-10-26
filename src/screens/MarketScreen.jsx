import React, {useState, useEffect} from 'react';
import EventSource from 'react-native-sse';
import {API_URL} from '@env';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Artwork from '../components/Artwork';

function MarketScreen({isDarkMode}) {
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

  return (
    <View style={marketScreenStyles.marketContainer}>
      <Text style={marketScreenStyles.marketContainer.marketTitle}>
        Flea:Auction Demo App
      </Text>
      <Text style={marketScreenStyles.marketContainer.marketStatus}>
        마켓 - 진행중
      </Text>
      <View style={marketScreenStyles.cardContainer}>
        {data.map((item, idx) => {
          return (
            <View key={idx} style={marketScreenStyles.card}>
              <Artwork item={item} />
              {/* <Text style={marketScreenStyles.card.cardText}>
                Auction Id: {item.auctionId}
              </Text>
              <Text style={marketScreenStyles.card.cardText}>
                View Count: {item.viewCount}
              </Text> */}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const marketScreenStyles = StyleSheet.create({
  marketContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: '#333',
    marketTitle: {
      margin: 6,
      color: '#fff',
      fontSize: 24,
      fontWeight: 700,
    },
    marketStatus: {
      margin: 6,
      color: '#fff',
      fontSize: 20,
      fontWeight: 500,
    },
  },
  cardContainer: {
    flex: 1,
    margin: 4,
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

export default MarketScreen;
