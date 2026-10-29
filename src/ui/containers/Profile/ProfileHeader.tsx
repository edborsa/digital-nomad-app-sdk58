import { AuthUser } from "@/src/domain/auth/AuthUser";
import { dateUtils } from "@/src/utils/dateUtils";
import { router } from "expo-router";
import { Box } from "../../components/Box";
import { Button } from "../../primitives/Button";
import { Text } from "../../components/Text";

type ProfileHeaderProps = {
  authUser: AuthUser;
};

export function ProfileHeader({ authUser }: ProfileHeaderProps) {
  return (
    <Box>
      <Text variant="title16" alignSelf="center" mb="s40">
        Perfil
      </Text>

      <Text variant="title16" mb="s16">
        Informações da Conta.
      </Text>

      <Box rowGap="s4">
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
      </Box>

      <Box flexDirection="row" columnGap="s16" mt="s16">
        <Box flex={1}>
          <Button
            testID="edit-profile-button"
            title="Editar perfil"
            variant="secondary"
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
        </Box>
        <Box flex={1}>
          <Button
            title="Alterar senha"
            variant="secondary"
            onPress={() => router.navigate("/update-password")}
          />
        </Box>
      </Box>
    </Box>
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
    <Box flexDirection="row" justifyContent="space-between">
      <Text variant="text14" color="gray2">
        {label}
      </Text>
      <Text testID={testID} variant="text14" color="text">
        {value}
      </Text>
    </Box>
  );
}
