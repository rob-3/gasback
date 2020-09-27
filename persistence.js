import AsyncStorage from '@react-native-community/async-storage';

export async function storeData(data, id){
    try{
        await AsyncStorage.setItem(`${id}`, make);
    }catch(e){
        console.log(e);
    }
}

export async function getData(id){
    try{
        const ret = await AsyncStorage.getItem(`${id}`);
        return ret;
    }catch(e){
        console.log(e);
    }
}



