import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getCurrentLocation, calcDistance } from './locationFunctions';
import { getGasPrice } from './gasPriceAPI';
import { Picker } from '@react-native-community/picker';
import vehicleData from './vehicleData.json';

const App = () => {
  //App State
  const [buttonText, setButtonText] = useState("Start");
  const [startLocation, setStartLocation] = useState(null);
  const [tripCost, setTripCost] = useState(null);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [mpg, setMpg] = useState('');

  const onPressHandler = async () => {
    if (buttonText === "Start") {
      setButtonText("Stop");
      setStartLocation(await getCurrentLocation());
    } else {
      setButtonText("Start");
      let end = await getCurrentLocation();
      const [distance, gasPrices] = await Promise.all([
        calcDistance(startLocation, end),
        getGasPrice(end)
      ]);
      
      setTripCost(calculatePrice(gasPrices.gasoline, distance.value, 30));
    }
  };

  let price;
  if(tripCost !== null){
    price = <Text>{tripCost}</Text>
  }else{
    price = null;
  }

  //creates a list of Vehicle makes and uses the list to create a list of Picker.Item components
  let makeList = Object.keys(vehicleData);
  let makePickerList = makeList.map(make => 
    <Picker.Item label={make} value={make} key={make}></Picker.Item>
  )
  
  // creates a list of Picker.Items for the models of the supplied make
  let modelList;
  if(make !== ''){
    modelList = Object.keys(vehicleData[make]).map(model =>
      <Picker.Item label={model} value={model} key={model}></Picker.Item>
      );
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {price}

      {/* Make Picker */}
      <Picker
        selectedValue={make}
        style={{height: 50, width: '90vw'}}
        onValueChange={(itemValue) => {
          setMake(itemValue);
        }}
        >
        {makePickerList}
        </Picker>

        {/* model Picker */}
      <Picker
        selectedValue={model}
        style={{height: 50, width: '90vw'}}
        onValueChange={(itemValue) => {
          setModel(itemValue);
        }}
        >
        {modelList}
        </Picker>
      <Button title={buttonText} onPress={onPressHandler}/>
      <StatusBar style="auto" />
    </View>
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

function calculatePrice(gasPrice, distance, mpg){
  console.log(`Price - ${gasPrice}, distance - ${distance}, mpg - ${mpg}`);
  let ret = (distance / 1760) / mpg;
  console.log(`(distance / 1760) / mpg = ${ret}`);
  ret = ret * gasPrice;
  console.log(`ret * gasPrice = ${ret}`);
  return Math.round(ret * 100) / 100;
}
