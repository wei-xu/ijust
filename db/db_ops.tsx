import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_NAME } from "../config/setup";

/**
 *
 * @param item object to store
 * @param prefix prefix of key, will be appended by -item["id"]
 * @param itemAppender update a react state
 * @returns
 */
export async function saveItemsToStorageWithPrefix(
  item: any,
  prefix: string,
  itemAppender?
) {
  return saveItemsToStorageWithKey(
    item,
    `${prefix}-${item["id"]}`,
    itemAppender
  );
}

export async function saveItemsToStorageWithKey(
  item: any,
  key?: string,
  itemAppender?
): Promise<Boolean> {
  try {
    if ((await AsyncStorage.getItem(key)) == null) {
      await AsyncStorage.setItem(key, JSON.stringify(item));
      console.log("save items to storage: ", item);

      if (itemAppender) {
        itemAppender((prev) => [...prev, item]);
      } else {
        console.log("no item appender");
      }
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

export const removeFromAsyncStorage = async (key, setter?) => {
  try {
    await AsyncStorage.removeItem(`app-${APP_NAME}-${key}`);

    if (setter) {
      setter((prev) => {
        return prev.filter((item) => item.id != key);
      });
    }
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
  setter?
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
