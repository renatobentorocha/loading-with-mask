import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LoadingText } from './LoadingText';

export default function App() {
  return (
    <View style={styles.container}>
      <LoadingText />
      <View style={styles.mask} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mask: {
    position: 'absolute',
    bottom: 415,
    width: '100%',
    backgroundColor: '#ff0000',
    paddingVertical: 20,
  },
});
