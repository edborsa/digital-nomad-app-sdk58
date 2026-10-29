import { AuthUser } from "@/src/domain/auth/AuthUser";
import { dateUtils } from "@/src/utils/dateUtils";
import { router } from "expo-router";
import { View } from "react-native";
import { Button } from "../../primitives/Button";
import { Text } from "../../primitives/Text";

type ProfileHeaderProps = {
  authUser: AuthUser;
};

export function ProfileHeader({ authUser }: ProfileHeaderProps) {
  return (
    <View>
      <Text variant="heading" className="mb-10 self-center">
        Perfil
      </Text>

      <Text variant="heading" className="mb-4">
        Informações da Conta.
      </Text>

      <View className="gap-y-1">
        <LineItem
          testID="profile-fullname"
          label="Nome"
          value={authUser.fullname}
        />
        <LineItem label="E-mail" value={authUser.email} />
        <LineItem
          label="Membro desde"
          value={dateUtils.formatMonthAndYear(authUser.createdAt)}
        />
      </View>

      <View className="mt-4 flex-row gap-x-4">
        <Button
          testID="edit-profile-button"
          title="Editar perfil"
          variant="secondary"
          className="flex-1"
          onPress={() =>
            router.navigate({
              pathname: "/update-profile",
              params: {
                fullname: authUser.fullname,
                email: authUser.email,
              },
            })
          }
        />
        <Button
          title="Alterar senha"
          variant="secondary"
          className="flex-1"
          onPress={() => router.navigate("/update-password")}
        />
      </View>
    </View>
  );
}

function LineItem({
  label,
  value,
  testID,
}: {
  label: string;
  value: string;
  testID?: string;
}) {
  return (
    <View className="flex-row justify-between">
      <Text variant="body-sm" className="text-muted">
        {label}
      </Text>
      <Text testID={testID} variant="body-sm">
        {value}
      </Text>
    </View>
  );
}
