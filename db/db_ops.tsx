import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveItemsToStorageWithKey(
  item: any,
  key: string,
  mode: "protect" | "overwrite" = "protect",
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
    } else if (mode == "protect") {
      console.log("key found in storage, skipping...");
      return false;
    } else if (mode == "overwrite") {
      await AsyncStorage.setItem(key, JSON.stringify(item));
      console.log("save items to storage: ", item);
      return true;
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

// fetch one item from storage

export async function fetchItemFromStorage<T>(key: string): Promise<T> {
  try {
    const item = await AsyncStorage.getItem(key);
    return JSON.parse(item) as T;
  } catch (error) {
    console.log("Error retrieving item from storage:", error);
  }
}

// fetch all items from storage given the keys in the parameter
export async function fetchAllItemsFromStorageWithKeys<T>(
  keys: string[]
): Promise<T[]> {
  try {
    const storedItems = await AsyncStorage.multiGet(keys);

    const itemList = storedItems.map(([k, v]) => JSON.parse(v) as T);

    return itemList;
  } catch (error) {
    console.log("Error retrieving checklist items:", error);
  }
}

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
