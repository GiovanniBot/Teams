import { TouchableOpacityProps } from "react-native";
import { Container, Title, ButtonTypeProps } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  type?: ButtonTypeProps;
};

export function CallToActionButton({
  title,
  type = "primary",
  ...rest
}: Props) {
  return (
    <Container {...rest} onPress={rest.onPress} type={type}>
      <Title>{title}</Title>
    </Container>
  );
}
