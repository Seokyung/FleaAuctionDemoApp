import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';

function Layout() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sampleText}>헤더</Text>
      </View>
      <View style={styles.svOuter}>
        <View style={styles.sv1}>
          <ScrollView horizontal={true}>
            <View style={styles.horizontalView}>
              <View style={styles.globalView}>
                <Text style={styles.sampleText}>1</Text>
              </View>
              <View style={styles.globalView}>
                <Text style={styles.sampleText}>2</Text>
              </View>
              <View style={styles.globalView}>
                <Text style={styles.sampleText}>3</Text>
              </View>
              <View style={styles.globalView}>
                <Text style={styles.sampleText}>4</Text>
              </View>
              <View style={styles.globalView}>
                <Text style={styles.sampleText}>5</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.sv2}>
          <ScrollView>
            <View style={styles.verticalView}>
              <View style={styles.globalView}>
                <Text style={styles.sampleText}>1</Text>
              </View>
              <View style={styles.globalView}>
                <Text style={styles.sampleText}>2</Text>
              </View>
              <View style={styles.globalView}>
                <Text style={styles.sampleText}>3</Text>
              </View>
              <View style={styles.globalView}>
                <Text style={styles.sampleText}>4</Text>
              </View>
              <View style={styles.globalView}>
                <Text style={styles.sampleText}>5</Text>
              </View>
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
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'pink',
  },
  tapBar: {
    flex: 1,
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
    fontSize: 30,
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
