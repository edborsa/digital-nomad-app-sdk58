import { Pressable, PressableProps } from "react-native";
import { useAppTheme } from "../theme/useAppTheme";
import { Box } from "./Box";
import { Icon, IconName } from "./Icon";

type IconButtonProps = {
  iconName: IconName;
  onPress: PressableProps["onPress"];
  testID?: PressableProps["testID"];
};
export function IconButton({ iconName, onPress, testID }: IconButtonProps) {
  const { boxShadows } = useAppTheme();
  return (
    <Pressable testID={testID} onPress={onPress}>
      <Box
        backgroundColor="primary"
        width={50}
        height={50}
        justifyContent="center"
        alignItems="center"
        borderRadius="rounded"
        style={{ boxShadow: boxShadows.primary }}
      >
        <Icon name={iconName} color="pureWhite" />
      </Box>
    </Pressable>
  );
}
