import React, {useState, useEffect} from 'react';
import EventSource from 'react-native-sse';
import {API_URL} from '@env';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Artwork from '../components/Artwork';

function MarketScreen() {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState({});

  const getData = parsedData => {
    // console.log(parsedData);
    const filteredData = data.filter(
      el => el.auctionId === parsedData.auctionId,
    );
    console.log(filteredData);
    if (filteredData.length === 0) {
      // console.log('조회수 그대로');
      setData(prev => [...prev, parsedData]);
    } else {
      // console.log('조회수 UP');
    }
    console.log(data);
  };

  useEffect(() => {
    console.log('reload');
    if (!listening) {
      setListening(true);
      const eventSource = new EventSource(API_URL);

      eventSource.addEventListener('open', event => {
        console.log('Server Connected!');
      });

      eventSource.addEventListener('sse.auction_viewed', event => {
        const parsedData = JSON.parse(event.data);
        // [...prev, parsedData]
        setData2(parsedData);
        setData(prev => [...prev, parsedData]);

        // const filteredData = data.filter(
        //   el => el.auctionId === parsedData.auctionId,
        // );
        // if (filteredData.length > 0) {
        //   console.log('filter', filteredData);
        // }
        // setData2(parsedData);
        // getData(parsedData);
        // const newData = data.map(item => {
        //   return {
        //     auctionId: item.auctionId,
        //     viewCount:
        //       item.auctionId === parsedData.auctionId
        //         ? parsedData.viewCount
        //         : item.viewCount,
        //   };
        // });
        // setData(newData);
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

  useEffect(() => {
    const filteredData = data.filter(el => el.auctionId === data2.auctionId);
    if (filteredData.length > 1) {
      console.log(filteredData);
      const idx = data.findIndex(el => el.auctionId === data2.auctionId);
      console.log(data.splice(idx, 1, data2));
      // setData(data.splice(idx, 1, data2));
    }
  }, [data, setData, data2, setData2]);

  return (
    <View style={marketScreenStyles.marketContainer}>
      <Text style={marketScreenStyles.marketContainer.marketTitle}>
        Flea:Auction Demo App
      </Text>
      <Text style={marketScreenStyles.marketContainer.marketStatus}>
        마켓 - 진행중
      </Text>
      <ScrollView style={marketScreenStyles.cardContainer}>
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
      </ScrollView>
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
