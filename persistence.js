import AsyncStorage from '@react-native-community/async-storage';

export async function storeData(data, id){
    try{
        await AsyncStorage.setItem(`${id}`, JSON.stringify(data));
    }catch(e){
        console.log('storeData - ' + e);
    }
}

export async function getData(id){
    try{
        const ret = await AsyncStorage.getItem(`${id}`);
        console.log(ret);
        return ret;
    }catch(e){
        console.log('getData - ' +e);
    }
}



