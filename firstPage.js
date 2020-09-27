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


const FirstPage = ({ navigation }) => {
    //App State
    const [buttonText, setButtonText] = useState("Start");
    const [startLocation, setStartLocation] = useState(null);
    const [tripCost, setTripCost] = useState(null);
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [mpg, setMpg] = useState('');
    var milesTravel = 0;
    var gasPricy = 0;

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
            milesTravel = distance.value;
            gasPricy = gasPrices.gasoline;
            navigation.navigate('second', { miles: milesTravel, mpg: 30, gasPrice: gasPricy});
        }
    };

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
    else {

    }

    return (
        <View style={styles.container}>
            <Text style ={styles.titleText}>GasBack</Text>

            {/* Make Picker */}
            <Picker
                selectedValue={make}
                style={{...styles.textField}}
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
                style={{...styles.textField}}
                onValueChange={(itemValue) => {
                    setModel(itemValue);
                }}
            >
                {modelList}
            </Picker>
            <Button disabled={make == '' ? true : false} title={buttonText} onPress={onPressHandler} color='#b118c8' />
            <Button
                title="Go to Jane's profile"
                onPress={() =>
                    navigation.navigate('second', {miles: 100, mpg: 100, gasPrice: 100})
                }
            />
            <StatusBar style="auto" />
        </View>
    );
}

export default FirstPage;