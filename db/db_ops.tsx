import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckinButtonData } from "../model/checkinButtonData";

/**
 *
 * @param item an object with a unique id
 * @param app_name app_name to be stored, may be redundant
 */
export const saveItemsToStorage = async (item: any, app_name: string) => {
  try {
    await AsyncStorage.setItem(
      `app-${app_name}-${item["id"]}`,
      JSON.stringify(item)
    );
    console.log("save items to storage: ", item);
  } catch (error) {
    console.log("Error saving items:", error);
  }
};

export const removeFromAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing from storage for key ", key, error);
  }
};

export async function fetchAllItemsStartingWith<T>(startsWith: string): Promise<T[]> {
    try {
        const filteredKeys = (await AsyncStorage.getAllKeys()).filter((item) => item.startsWith(startsWith)
        );
        const storedItems = await AsyncStorage.multiGet(filteredKeys);
        
        return storedItems.map(([k, v]) => JSON.parse(v) as T);
    } catch (error) {
        console.log("Error retrieving checklist items:", error);
    }
}