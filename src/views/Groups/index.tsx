import { useState, useCallback } from "react";
import { Alert, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Loading } from "@components/Loading";
import { getAllGroups } from "@storage/group/getAllGroups";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { CallToActionButton } from "@components/CallToActionButton";
import { ListEmpty } from "@components/ListEmpty";

import { Container } from "./styles";

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleGoToNewGroupView() {
    navigation.navigate("NewGroup");
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const groups = await getAllGroups();
      setGroups(groups);

      setIsLoading(false);
    } catch (error) {
      Alert.alert("Groups", "Error loading groups");
    }
  }

  function handleOpenGroup(groupName: string) {
    navigation.navigate("Players", { groupName });
  }

  useFocusEffect(
    useCallback(() => {
      console.log("useFocusEffect");

      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />

      <Highlight
        title="Discussion Groups"
        subTitle="create, join and manage groups"
      />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          ListEmptyComponent={<ListEmpty title="No groups found" />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            groups.length > 0 ? { paddingBottom: 90 } : { flex: 1 }
          }
        />
      )}

      <CallToActionButton
        title="Create new group"
        onPress={handleGoToNewGroupView}
      />
    </Container>
  );
}
