import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Slider from "@react-native-community/slider";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0b132b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: vw(10),
        color: '#6fffe9',
        marginBottom: 20,
        justifyContent: 'center'
    },
    subtitleText: {
        fontSize: 20,
        color: '#5bc0be',
        marginBottom: 20,
        textAlign: 'left',
        alignSelf: 'stretch'
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
    tipPer: {
        fontSize: 20,
        color: '#5bc0be',
        marginBottom: 20,
        textAlign: 'right',
        alignSelf: 'stretch'
    }
});

function calculatePrice(gasPrice, distance, mpg){
    console.log(`Price - ${gasPrice}, distance - ${distance}, mpg - ${mpg}`);
    let ret = (distance / 1760) / mpg;
    console.log(`(distance / 1760) / mpg = ${ret}`);
    ret = ret * gasPrice;
    console.log(`ret * gasPrice = ${ret}`);
    return Math.round(ret * 100) / 100;
}

const SecondPage = ({route, navigation }) => {
  const [cost, setCost] = useState(0);
  const [TipAmount, setTipAmount] = useState(0);
  const [sliderValue, setSliderValue] = useState(15);
  const [total, setTotal] = useState(0);
  const calculateTip = (tip) => {
    setTipAmount(cost * (tip/ 100));
    setSliderValue(tip);
    setTotal(cost + TipAmount);
  }

  useEffect(() => {
    let temp = calculatePrice(route.params.gasPrice, route.params.miles, route.params.mpg);
    setCost(temp);
    setTipAmount(temp * 0.15);
    setTotal(temp + temp * 0.15);
  }, []);


return(
    <View style={styles.container}>
        <Text style={styles.titleText}>Amount Owed: ${total.toFixed(2)}</Text>
        <Text style={styles.subtitleText}>  Distance: {(route.params.miles / 1760).toFixed(2)} mi</Text>
        <Text style={styles.subtitleText}>  Gas Price: ${route.params.gasPrice} </Text>
        <Text style={styles.subtitleText}>  MPG: {route.params.mpg}</Text>
        <View style={styles.container}>
            <Slider style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={100}
                value={sliderValue}
                step={1}
                onValueChange={(sliderValue) => calculateTip(sliderValue)}
                minimumTrackTintColor="#6fffe9"
                maximumTrackTintColor="#5bc0be"/>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                    <Text style={styles.subtitleText}>Tip: ${TipAmount.toFixed(2)}     </Text>

                    <Text style={styles.tipPer}>     {sliderValue}%</Text>
            </View> 
            <Button style={{margin: 50, marginTop: 40}}
            title="Return"
            color='#b118c8'
            onPress={() =>
                navigation.navigate('Home')
            }
            />   
        </View>
    </View>
);


}
export default SecondPage;
