import { TouchableOpacityProps } from "react-native";
import { Container, ButtonIconTypeProps, Icon } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeProps;
};

export function ButtonIcon({ icon, type = "primary", ...rest }: Props) {
  return (
    <Container {...rest} onPress={rest.onPress}>
      <Icon name={icon} type={type} />
    </Container>
  );
}
