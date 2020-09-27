import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Slider from "@react-native-community/slider";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0b132b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 35,
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
    }
});

const SecondPage = ({route, navigation }) => {

    const [TipAmount, setTipAmount] = useState(0);

return(
    <View style={styles.container}>
        <Text style={styles.titleText}>Amount Owed: $x.xx</Text>
        <Text style={styles.subtitleText}>  Distance: {JSON.stringify(route.params.miles)} </Text>
        <Text style={styles.subtitleText}>  Gas Price: $ {JSON.stringify(route.params.gasPrice)} </Text>
        <Text style={styles.subtitleText}>  MPG: {JSON.stringify(route.params.mpg)}</Text>

        <Text>
            <Text style={styles.subtitleText}>  Tip:</Text>
            <Slider style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="#6fffe9"
                    maximumTrackTintColor="#5bc0be"/>
            <Text style={styles.subtitleText}>$</Text>
        </Text>
        <Button
            title="Return"
            color='#b118c8'
            onPress={() =>
                navigation.navigate('Home')
            }
            />
    </View>
);


}
export default SecondPage;
