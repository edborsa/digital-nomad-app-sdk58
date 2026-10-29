import { useAuthGetUser } from "@/src/domain/auth/operations/useAuthGetUser";
import { useAuthSignOut } from "@/src/domain/auth/operations/useAuthSignOut";
import { Icon } from "@/src/ui/components/Icon";
import { Screen } from "@/src/ui/components/Screen";
import { FavoriteCityList } from "@/src/ui/containers/Profile/FavoriteCityList";
import { ProfileHeader } from "@/src/ui/containers/Profile/ProfileHeader";
import { Text } from "@/src/ui/primitives/Text";
import { Pressable } from "react-native";

export default function ProfileScreen() {
  const { mutate: signOut } = useAuthSignOut();
  const { data: authUser } = useAuthGetUser();

  return (
    <Screen>
      <FavoriteCityList
        ListHeaderComponent={authUser && <ProfileHeader authUser={authUser} />}
        ListFooterComponent={
          <Pressable
            testID="sign-out-button"
            accessibilityRole="button"
            onPress={signOut}
            className="mt-6 min-h-11 flex-row items-center self-center"
          >
            <Icon name="Logout" className="text-error" />
            <Text className="text-error">Sair</Text>
          </Pressable>
        }
      />
    </Screen>
  );
}
