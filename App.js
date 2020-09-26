import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getCurrentLocation, calcDistance } from './locationFunctions';
import { getGasPrice } from './gasPriceAPI';
import { Picker } from '@react-native-community/picker';
import vehicleData from './vehicleData.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b132b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 80,
    color: '#6fffe9',
    marginBottom: 20
  },
  subtitleText: {
    fontSize: 20,
    color: '#5bc0be',
    marginBottom: 20
  },
  textField: {
    height: 40,
    width: 100,
    borderColor: '#dbc2cf',
    borderWidth: 1,
    color: '#dbc2cf',
    textAlign: 'center',
    marginBottom: 20
  }
});


const App = () => {
  //App State
  const [buttonText, setButtonText] = useState("Start");
  const [startLocation, setStartLocation] = useState(null);
  const [tripCost, setTripCost] = useState(null);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
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

  let price = null;
  if (tripCost !== null) {
    price = <Text>{tripCost}</Text>
  }

  //creates a list of Vehicle makes and uses the list to create a list of Picker.Item components
  let makeList = Object.keys(vehicleData);
  let makePickerList = makeList.map(make =>
    <Picker.Item label={make} value={make} key={make}></Picker.Item>
  )

  // creates a list of Picker.Items for the models of the supplied make
  let modelList;
  if (make !== '') {
    modelList = Object.keys(vehicleData[make]).map(model =>
      <Picker.Item label={model} value={model} key={model}></Picker.Item>
    );
  }

  //
  let yearList;
  if(model !== ''){
    console.log(vehicleData[make][model])
    yearList = vehicleData[make][model];
    yearList = yearList.map(dataPair =>
      dataPair['year']
    );
    console.log(yearList);
    yearList = yearList.map(year =>
      <Picker.Item label={year} value={year} key={year}></Picker.Item>
    )
    console.log(yearList);


  }

  //
  let yearList;
  if(model !== ''){
    console.log(vehicleData[make][model])
    yearList = vehicleData[make][model];
    yearList = yearList.map(dataPair =>
      dataPair['year']
    );
    console.log(yearList);
    yearList = yearList.map(year =>
      <Picker.Item label={year} value={year} key={year}></Picker.Item>
    )
    console.log(yearList);


  }

  return (
    <View style={styles.container}>
      <Text style ={styles.titleText}>GasBack</Text>
      <Text style={styles.subtitleText}>{price}</Text>

      {/* Make Picker */}
      <Picker
        selectedValue={make}
        style={{...styles.textField, height: 50, width: 300, color: '#dbc2cf'}}
        onValueChange={(itemValue) => {
          setMake(itemValue);
        }}
      >
        <Picker.Item label='Please Select a Make' value=''></Picker.Item>
        {makePickerList}
      </Picker>

        {/* model Picker */}
      <Picker
        selectedValue={model}
        style={{...styles.textField, height: 50, width: 300}}
        onValueChange={(itemValue) => {
          setModel(itemValue);
        }}
      >
        {modelList}
        </Picker>

        {/* Year Picker */}
        <Picker
        selectedValue={year}
        style={{...styles.textField, height: 50, width: 90}}
        onValueChange={(itemValue) => {
          setYear(itemValue);
        }}
        >
        {yearList}
        </Picker>


      <Button title={buttonText} onPress={onPressHandler} color='#b118c8' />
      <StatusBar style="auto" />
    </View>
  );
}

export default App;

function calculatePrice(gasPrice, distance, mpg){
  console.log(`Price - ${gasPrice}, distance - ${distance}, mpg - ${mpg}`);
  let ret = (distance / 1760) / mpg;
  console.log(`(distance / 1760) / mpg = ${ret}`);
  ret = ret * gasPrice;
  console.log(`ret * gasPrice = ${ret}`);
  return Math.round(ret * 100) / 100;
}
