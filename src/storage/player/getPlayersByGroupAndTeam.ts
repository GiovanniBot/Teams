import { getPlayersByGroup } from "./getPlayersByGroup";

export async function getPlayersByGroupAndTeam(
  groupName: string,
  team: string
) {
  try {
    const data = await getPlayersByGroup(groupName);

    const players = data.filter((players) => players.team === team);
    return players;
  } catch (error) {
    throw error;
  }
}
