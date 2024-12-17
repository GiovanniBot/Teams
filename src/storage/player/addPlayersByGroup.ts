import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { getPlayersByGroup } from "./getPlayersByGroup";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function addPlayersByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await getPlayersByGroup(group);

    const playerAlreadyExists = storedPlayers.find(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExists) {
      throw new AppError("Player already exists.");
    }

    const data = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, data);
  } catch (error) {
    throw error;
  }
}
