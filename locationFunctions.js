import * as Location from 'expo-location';

// This is where our environment vars are stored, including the API keys
const dotenv = require('dotenv').config(`./config.env`);
const distanceMatrixApi = `http://maps.googleapis.com/maps/api/distancematrix/json?units=`;
export function getGeocode(destination){


}

// Uses the Google Distance Matrix API to calculate the distance between the 2 suplied location parameters
// Both parameters are coord pairs
export async function calcDistance(currentLocation, destination, units = `metric`){
  const distanceJson = await fetchDistanceData(currentLocation, destination, units);
  
  //distanceData hold both a text property and a value property
  distanceData = distanceJson.rows.elements.distance
  return distanceData;
}

export async function getCurrentLocation(){

    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission to access location was denied');
        //Display Location Permission Error
        return null;
    }

    let location = await Location.getCurrentPositionAsync({});
    
    return [location.coords.latitude, location.coords.longitude];

}

async function fetchDistanceData(currentLocation, destination, units = `metric`){
  const responce = await fetch(`${distanceMatrixApi}${units}&origins=${currentLocation[0]},${currentLocation[1]}` + 
    `&destinations=${destination[0]},${destination[1]}&key=${process.env.GOOGLE_API_KEY}`)
    .then(r => r.json());

    return responce;
}