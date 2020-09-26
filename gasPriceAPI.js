import * as Location from 'expo-location';

export function getGasPrice(stateCode, city) {
    var url = 'https://api.collectapi.com/gasPrice/stateUsaPrice?state=' + stateCode;
    // let location = await Location.getCurrentPositionAsync({});
    // need either google map api to change geo location to get city to do the search for then;
    fetch(url , {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'apikey 2igRbnlqeUukasbIbkPobx:1KJw98JISM3mwNBZvPQ8Nb'
        }
    }).then((response) => response.json())
        .then((json) => {
            let temp;
            for (let i = 0; i < json.cities.length; i++) {
                temp = json.cities[i];
                if (city.localeCompare(temp.name) === 0) {
                    return temp.regular;
                }
            }
        })
        .catch((error) => {
            console.error(error);
        });

}
