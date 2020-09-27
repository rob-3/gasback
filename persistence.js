import AsyncStorage from '@react-native-community/async-storage';

export async function storeMake(make){
    try{
        await AsyncStorage.setItem("@make", make);
    }catch(e){
        console.log(e);
    }
}

export async function getMake(make){
    try{
        const ret = await AsyncStorage.getItem("@make");
        return ret;
    }catch(e){
        console.log(e);
    }
}

