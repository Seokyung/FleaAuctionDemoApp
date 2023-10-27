import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import EventSource from 'react-native-sse';
import {API_URL} from '@env';
import {artworkList} from '../assets/artworkList';
import AppHeader from '../components/AppHeader';
import MenuBar from '../components/MenuBar';
import ArtworkList from '../components/artworks/ArtworkList';
import TabBar from '../components/TabBar';
import styled from 'styled-components';

function MarketScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);

  const [listening, setListening] = useState(false);
  const [viewedData, setViewedData] = useState({});
  const [data, setData] = useState([]);

  // 작품 리스트 랜덤 배열 - Fisher-Yates Shuffle 사용
  const fisherYatesShuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // 각 작품 리스트 순서 랜덤 정렬
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

  // 실시간으로 SSE 이벤트 스트림 수신
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

  // pull-to-refresh 시 작품 리스트 재정렬
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setLists();
      setRefreshing(false);
    }, 1500);
  }, []);

  // 조회수 증가할 때마다 각 작품 리스트의 해당 작품 조회수 변경 및 동기화
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

  // 작품 터치 시 조회수 증가
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
    <MarketContainer>
      <TopMargin />
      <Content>
        <AppHeader />
        <Body>
          <MenuBar />
          <ScrollContainer
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <ArtworkList list={list1} onArtworkPress={onArtworkPress} />
            <ArtworkList list={list2} onArtworkPress={onArtworkPress} />
          </ScrollContainer>
        </Body>
        <TabBar />
      </Content>
      <BottomMargin />
    </MarketContainer>
  );
}

const MarketContainer = styled.View`
  flex: 1;
`;

const TopMargin = styled.View`
  height: 2.5%;
`;
const BottomMargin = styled.View`
  height: 4%;
`;

const Content = styled.View`
  flex: 1;
  height: 90%;
`;

const Body = styled.View`
  flex: 8;
  padding: 12px;
`;

const ScrollContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flex: 9,
  },
}))`
  padding: 2px;
`;

export default MarketScreen;
