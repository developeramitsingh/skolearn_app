import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
        console.error(`error in saveToStorage`, err);
    } 
}

export const appendToSavedStorage = async (key, data) => {
    try {
        //getting existing data for key
        const existingData = await getFromStorage(key);

        const newData = {
            ...(existingData && existingData),
            ...data
        }

        saveToStorage(key, newData);
    } catch (err) {
        console.error(`error in appendStorage`, err);
    }
}

export const getFromStorage = async (key) => {
    let data;
    try {
        data = await AsyncStorage.getItem(key);

        data  = data != null ? JSON.parse(data) : null;
    } catch (err) {
        console.error(`error in getFromStorage`, err);
    } 

    return data;
}