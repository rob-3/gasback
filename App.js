import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getCurrentLocation, calcDistance } from './locationFunctions';

// This is where our environment vars are stored, including the API keys
import {GOOGLE_API_KEY} from './App.config';

export default function App() {
  //App State
  const [buttonText, setButtonText] = useState("Start");
  const [startLocation, setStartLocation] = useState(null);
  const [distance, setDistance] = useState(null);


  const onPressHandler = async () => {
    if (buttonText === "Start") {
      setButtonText("Stop");
      setStartLocation(await getCurrentLocation());
    } else {
      setButtonText("Start");
      let end = await getCurrentLocation();
      setDistance(await calcDistance(startLocation, end));
    }
  };


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{distance}</Text>
      <Button title={buttonText} onPress={onPressHandler}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
