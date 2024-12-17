import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { getPlayersByGroup } from "./getPlayersByGroup";

export async function removePlayerByGroup(
  playerName: string,
  groupName: string
) {
  try {
    const data = await getPlayersByGroup(groupName);

    const filteredData = data.filter((player) => player.name !== playerName);

    const players = JSON.stringify(filteredData);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${groupName}`, players);
  } catch (error) {
    throw error;
  }
}
