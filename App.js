import React, { useState } from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import FirstPage from './firstPage';
import SecondPage from "./secondPage";

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={FirstPage}
        />
        <Stack.Screen name="second" component={SecondPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
