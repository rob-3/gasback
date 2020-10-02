//
//location is a coord pair
// TODO add error handling
export async function getGasPrice(location) {
  var url;
  return fetch(url , {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'apikey 6Qv60SIQtjRkxAPUd6sh1L:6P4ETvsBxsLOXwUmSqrwne'
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
