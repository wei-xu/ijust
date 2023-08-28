import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveItemsToStorageWithKey(
  item: any,
  key?: string,
  itemAppender?
): Promise<Boolean> {
  try {
    if ((await AsyncStorage.getItem(key)) == null) {
      await AsyncStorage.setItem(key, JSON.stringify(item));
      // console.log("save items to storage: ", item);

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
    await AsyncStorage.removeItem(key);

    if (setter) {
      setter((prev) => {
        return prev.filter((item) => item.id != key);
      });
    }
  } catch (error) {
    console.log("Error removing from storage for key ", key, error);
  }
};

// remove one item from storage
export const removeItemFromAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("removed item from storage for key ", key);
  } catch (error) {
    console.log("Error removing from storage for key ", key, error);
  }
};

// remove all keys with prefix from storage
export const removeAllFromAsyncStorageWithPrefix = async (prefix: string) => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const filteredKeys = allKeys.filter((item) => item.startsWith(prefix));
    await AsyncStorage.multiRemove(filteredKeys);
  } catch (error) {
    console.log(`Error remove all keys with prefix ${prefix} from storage`);
  }
};

export const removeAllFromAsyncStorage = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(allKeys);
  } catch (error) {
    console.log("Error remove all keys from storage");
  }
};

export async function fetchAllItemsStartingWith<T>(
  startsWith: string,
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
