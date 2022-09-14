
import React, { useEffect, useState } from 'react';
import { SButton } from './src/globalStyles';
import { StyleSheet, View, Button, Text, SafeAreaView, ToastAndroid } from 'react-native';

const App = () => {
  const showToast = () => {
    ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'All Your Base Are Belong To Us',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'A wild toast appeared!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      100,
      50
    );
  };
  return (
    <SafeAreaView>
    <View>
      <SButton/>
      <Button title='Fetch person' onPress={showToast} />
      {/* Your other components here ....*/}
    </View>
  </SafeAreaView>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
