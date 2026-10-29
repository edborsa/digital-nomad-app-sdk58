import { useAuthSignIn } from "@/src/domain/auth/operations/useAuthSignIn";
import { Screen } from "@/src/ui/components/Screen";
import { TextInput } from "@/src/ui/components/TextInput";
import { Logo } from "@/src/ui/containers/Logo";
import { TextLink } from "@/src/ui/containers/TextLink";
import { Button } from "@/src/ui/primitives/Button";
import { Text } from "@/src/ui/primitives/Text";
import { Link } from "expo-router";
import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signIn, isPending } = useAuthSignIn();

  function handleSignIn() {
    signIn({ email, password });
  }
  return (
    <Screen scrollable>
      <SafeAreaView>
        <Logo />
        <Text variant="title" className="mb-4 self-center">
          Bem-vindo
        </Text>
        <TextInput
          testID="email-input"
          label="E-mail"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="seu email"
        />
        <TextInput
          testID="password-input"
          label="Senha"
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="digite sua senha"
        />
        <Link href="/reset-password" asChild>
          <Text variant="body-sm" className="mb-4 self-end text-primary">
            Esqueceu sua senha
          </Text>
        </Link>
        <Button
          testID="sign-in-button"
          title="Entrar"
          loading={isPending}
          onPress={handleSignIn}
        />

        <TextLink
          testID="sign-up-link"
          href="/sign-up"
          text="Ainda não tem uma conta?"
          ctaText="Criar"
        />
      </SafeAreaView>
    </Screen>
  );
}
