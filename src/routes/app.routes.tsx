import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Groups } from "@views/Groups";
import { NewGroup } from "@views/NewGroup";
import { Players } from "@views/Players";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Groups" component={Groups} />
      <Screen name="NewGroup" component={NewGroup} />
      <Screen name="Players" component={Players} />
    </Navigator>
  );
}
