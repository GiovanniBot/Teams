import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "../storageConfig";

import { getAllGroups } from "./getAllGroups";

export async function removeGroup(groupToDelete: string) {
  try {
    const storedGroups = await getAllGroups();
    const groups = storedGroups.filter((group) => group !== groupToDelete);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupToDelete}`);
  } catch (error) {
    throw error;
  }
}
