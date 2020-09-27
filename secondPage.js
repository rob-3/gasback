import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Slider from "@react-native-community/slider";

const SecondPage = ({ navigation }) => {

return(
    <View>
        <Text>
            <Text>Distance:</Text>
            <Text>second part</Text>
        </Text>
        <Text>
            <Text>Gas Price:</Text>
            <Text></Text>
        </Text>
        <Text>
            <Text>MPG:</Text>
            <Text></Text>
        </Text>
        <Slider style={{width: 200, height: 40}}
                   minimumValue={0}
                   maximumValue={100}
                   minimumTrackTintColor="#FFFFFF"
                   maximumTrackTintColor="#000000"/>
    </View>
);


}
export default SecondPage;
