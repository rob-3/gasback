import * as Location from 'expo-location';

export function getGasPrice(location) {
    var url = `https://api.collectapi.com/gasPrice/fromCoordinates?lng=${location[1]}&lat=${location[0]}`;

    fetch(url , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'apikey 2igRbnlqeUukasbIbkPobx:1KJw98JISM3mwNBZvPQ8Nb'
        }
    }).then((response) => response.json())
        .then((json) => {
            //Returns a result containing prices for all gasoline types
            return json.result;
        })
        .catch((error) => {
            console.error(error);
        });

}
