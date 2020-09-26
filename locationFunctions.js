import * as Location from 'expo-location';

// This is where our environment vars are stored, including the API keys
import {GOOGLE_API_KEY} from './App.config';

const distanceMatrixApi = `https://maps.googleapis.com/maps/api/distancematrix/json?units=`;

// Uses the Google Distance Matrix API to calculate the distance between the 2 suplied location parameters
// Both parameters are coord pairs
// returns distanceData which hold text and value fields
export async function calcDistance(currentLocation, destination){
  const distanceJson = await fetchDistanceData(currentLocation, destination, 'imperial');

  //distanceData hold both a text property and a value property
  const distanceData = distanceJson.rows[0].elements[0].distance;
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

async function fetchDistanceData(currentLocation, destination, units){
  const responce = await fetch(`${distanceMatrixApi}${units}&origins=${currentLocation[0]},${currentLocation[1]}` + 
    `&destinations=${destination[0]},${destination[1]}&key=${GOOGLE_API_KEY}`)
    .then(r => r.json())
    .catch(err => console.log(err));

    return responce;
}
