import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function getAllGroups() {
  try {
    const data = await AsyncStorage.getItem(GROUP_COLLECTION);
    const groups: string[] = data ? JSON.parse(data) : [];
    return groups;
  } catch (error) {
    throw new Error("Error getting groups");
  }
}
