import { useState, useEffect, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { AppError } from "@utils/AppError";

import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { addPlayersByGroup } from "@storage/player/addPlayersByGroup";
import { getPlayersByGroupAndTeam } from "@storage/player/getPlayersByGroupAndTeam";
import { removePlayerByGroup } from "@storage/player/removePlayerByGroup";
import { removeGroup } from "@storage/group/removeGroup";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { CallToActionButton } from "@components/CallToActionButton";

import { Container, Form, HeaderList, PlayerQuantity } from "./styles";
import { Loading } from "@components/Loading";

type RouteParams = {
  groupName: string;
};

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Team A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const newPlayerInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const route = useRoute();

  const { groupName } = route.params as RouteParams;

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("New Player", "Please insert a player name");
    }

    const newPlayer = { name: newPlayerName, team };

    try {
      await addPlayersByGroup(newPlayer, groupName);

      newPlayerInputRef.current?.blur();

      fetchPlayersByTeam();
      setNewPlayerName("");
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("New Player", error.message);
      } else {
        Alert.alert("New Player", "Unknown error");
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await getPlayersByGroupAndTeam(groupName, team);
      setPlayers(playersByTeam);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error", "Error loading players");
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await removePlayerByGroup(playerName, groupName);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert("Error", "Error removing player");
    }
  }

  async function completeRemoveGroup() {
    try {
      await removeGroup(groupName);
      navigation.navigate("Groups");
    } catch (error) {
      Alert.alert("Error", "Error removing group");
    }
  }

  async function handleRemoveGroup() {
    try {
      Alert.alert(
        "Remove group",
        "Are you sure you want to remove this group?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Remove", onPress: () => completeRemoveGroup() },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Error removing group");
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={groupName}
        subTitle="add your crew and organize the matchup"
      />
      <Form>
        <Input
          inputRef={newPlayerInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Participant name"
          autoCorrect={false}
        />

        <ButtonIcon icon="add" type="primary" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Team A", "Team B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <PlayerQuantity>{players.length}</PlayerQuantity>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => {
                handleRemovePlayer(item.name);
              }}
            />
          )}
          ListEmptyComponent={<ListEmpty title="No players" />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            players.length > 0 ? { paddingBottom: 90 } : { flex: 1 }
          }
        />
      )}

      <CallToActionButton
        title="Remove group"
        type="secondary"
        onPress={() => {
          handleRemoveGroup();
        }}
      />
    </Container>
  );
}
