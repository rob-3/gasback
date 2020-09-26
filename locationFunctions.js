import * as Location from 'expo-location';


export function getGeocode(destination){


}


export function calcDistance(currentLocation, destination){
  return 5;
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
