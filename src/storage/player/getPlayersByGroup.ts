import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function getPlayersByGroup(groupName: string) {
  try {
    const data = await AsyncStorage.getItem(
      `${PLAYER_COLLECTION}-${groupName}`
    );

    const players: PlayerStorageDTO[] = data ? JSON.parse(data) : [];

    return players;
  } catch (error) {
    throw error;
  }
}
