import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getCurrentLocation, calcDistance } from './locationFunctions';
import { getGasPrice } from './gasPriceAPI';

export default function App() {
  //App State
  const [buttonText, setButtonText] = useState("Start");
  const [startLocation, setStartLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [gasPrices, setGasPrices] = useState(null);
  const [tripCost, setTripCost] = useState(null);
  

  const onPressHandler = async () => {
    if (buttonText === "Start") {
      setButtonText("Stop");
      setStartLocation(await getCurrentLocation());
    } else {
      setButtonText("Start");
      let end = await getCurrentLocation();
      setDistance(await calcDistance(startLocation, end));
      //get Gas Prices based on ending location
      let tempGasPrices = await getGasPrice(end); 
      setGasPrices(tempGasPrices);
      setTripCost(calculatePrice(tempGasPrices.gasoline, 528000, 30));
    }
  };


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{JSON.stringify(distance)}</Text>
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

function calculatePrice(gasPrice, distance, mpg){
  console.log(`Price - ${gasPrice}, distance - ${distance}, mpg - ${mpg}`);
  let ret = (distance / 1760) / mpg;
  console.log(`(distance / 1760) / mpg = ${ret}`);
  ret = ret * gasPrice;
  console.log(`ret * gasPrice = ${ret}`);
  return Math.round(ret * 100) / 100;
}