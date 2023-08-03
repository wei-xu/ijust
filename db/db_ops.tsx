import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckinButtonData } from "../model/checkinButtonData";
import { APP_NAME } from "../config/setup";

/**
 *
 * @param item an object with a unique id
 * @param app_name app_name to be stored, may be redundant
 */
export async function saveItemsToStorage(
  item: any,
  prefix: string,
  itemAppender?
): Promise<Boolean> {
  try {
    const key = `${prefix}-${item["id"]}`;

    if ((await AsyncStorage.getItem(key)) == null) {
      await AsyncStorage.setItem(key, JSON.stringify(item));
      console.log("save items to storage: ", item);
      itemAppender((prev) => [...prev, item]);
      return true;
    } else {
      console.log("key found in storage, skipping...");
      return false;
    }
  } catch (error) {
    console.log("Error saving items:", error);
    return false;
  }
}

export const removeFromAsyncStorage = async (key, setter) => {
  try {
    await AsyncStorage.removeItem(`app-${APP_NAME}-${key}`);

    setter((prev) => {
      return prev.filter((item) => item.id != key);
    });
  } catch (error) {
    console.log("Error removing from storage for key ", key, error);
  }
};

export const removeAllFromAsyncStorage = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(allKeys);
    console.log("Deleted all keys from AsyncStorage");
  } catch (error) {
    console.log("Error remove all keys from storage");
  }
};

export async function fetchAllItemsStartingWith<T>(
  startsWith: string = `app-${APP_NAME}`,
  setter
): Promise<T[]> {
  try {
    const filteredKeys = (await AsyncStorage.getAllKeys()).filter((item) =>
      item.startsWith(startsWith)
    );
    const storedItems = await AsyncStorage.multiGet(filteredKeys);

    const itemList = storedItems.map(([k, v]) => JSON.parse(v) as T);

    if (setter) {
      setter(itemList);
    }
    return itemList;
  } catch (error) {
    console.log("Error retrieving checklist items:", error);
  }
}
