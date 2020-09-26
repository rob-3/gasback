import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { getCurrentLocation, calcDistance } from './locationFunctions';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function App() {
  const [buttonText, setButtonText] = useState("Start");
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const onPressHandler = async () => {
    if (buttonText === "Start") {
      setButtonText("Stop");
      setStartLocation(await getCurrentLocation());
    } else {
      setButtonText("Start");
      let end = await getCurrentLocation();
      setEndLocation(end);
      setDistance(calcDistance(startLocation, end));
    }
  };

const UselessTextInput = () => {
  const [value, onChangeText] = React.useState('...');
}

  return (
    <View style={styles.container}>

      <Text style ={styles.titleText}>GasBack</Text>

      <Text style={styles.subtitleText}>{distance}</Text>

      <Button title={buttonText} onPress={onPressHandler} color='#b118c8' />

      <Text style ={styles.subtitleText}>Begin Ride</Text>

      <TextInput
      style={styles.textField}
      placeholder = 'Enter Make'
      placeholderTextColor = '#dbc2cf'
      />
      <TextInput
      style={styles.textField}
      placeholder = 'Enter Model'
      placeholderTextColor = '#dbc2cf'
      />

      <DropDownPicker
      style={styles.ddp}
      items={[
        {label: 'USD', value: 'usd', icon: () => <Icon name="usd" size={18} color="#FFF" />},
        {label: 'EUR', value: 'eur', icon: () => <Icon name="eur" size={18} color="#FFF" />},
        {label: 'JPY', value: 'jpy', icon: () => <Icon name="jpy" size={18} color="#FFF" />},
        {label: 'GBP', value: 'gbp', icon: () => <Icon name="gbp" size={18} color="#FFF" />},
        {label: 'AUD', value: 'aud', icon: () => <Icon name="usd" size={18} color="#FFF" />},
        {label: 'CAD', value: 'cad', icon: () => <Icon name="usd" size={18} color="#FFF" />},
      ]}
      defaultValue={'usd'}
      containerStyle={{height: 40}}
      style={{backgroundColor: '#dbc2cf'}}
      itemStyle={{
        justifyContent: 'flex-start'
      }}
      dropDownStyle={{backgroundColor: '#dbc2cf'}}
      onChangeItem={item => this.setState({
        country: item.value
      })}
      />

      <DropDownPicker
      items={[
        {label: 'Metric', value: 'met', icon: () => <Icon name="thumbs-o-down" size={18} color="#FFF" />},
        {label: 'Emperial', value: 'emp', icon: () => <Icon name="thumbs-o-up" size={18} color="#FFF" />},
      ]}
      defaultValue={'met'}
      containerStyle={{height: 40}}
      style={{backgroundColor: '#dbc2cf'}}
      itemStyle={{
        justifyContent: 'flex-start'
      }}
      dropDownStyle={{backgroundColor: '#dbc2cf'}}
      onChangeItem={item => this.setState({
        country: item.value
      })}
      />

      <StatusBar style="auto" />
    </View>
  );
}

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
  },
  ddp: {
    marginBottom: 20
  }
});
