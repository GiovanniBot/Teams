import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { createGroup } from "@storage/group/createGroup";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { CallToActionButton } from "@components/CallToActionButton";

import { Container, Content, Icon } from "./styles";
import { Alert } from "react-native";
import { AppError } from "@utils/AppError";

export function NewGroup() {
  const [groupName, setGroupName] = useState("");

  const navigation = useNavigation();

  async function handleCreateGroup() {
    try {
      if (groupName.trim().length === 0) {
        return Alert.alert("New Group", "Please insert a group name");
      }

      await createGroup(groupName);
      navigation.navigate("Players", { groupName });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("New Group", error.message);
      } else {
        Alert.alert("New Group", "Unknown error");
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="New Group"
          subTitle="create a new group to add people"
        />

        <Input placeholder="Group Name" onChangeText={setGroupName} />

        <CallToActionButton title="Create" onPress={handleCreateGroup} />
      </Content>
    </Container>
  );
}
