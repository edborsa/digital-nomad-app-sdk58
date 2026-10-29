import { Icon } from "@/src/ui/components/Icon";
import { Text } from "@/src/ui/primitives/Text";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: 10,
          height: 90,
          borderTopWidth: 0,
        },
        tabBarBackground: () => <View className="flex-1 bg-background" />,
        tabBarLabel: ({ children }) => (
          <Text variant="caption">{children}</Text>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarButtonTestID: "tab-home",
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name={focused ? "Home-fill" : "Home-outline"}
                className={focused ? "text-primary" : "text-muted"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explorar",
          tabBarButtonTestID: "tab-explore",
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name={"Explore"}
                className={focused ? "text-primary" : "text-muted"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarButtonTestID: "tab-profile",
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name={focused ? "Person-fill" : "Person-outline"}
                className={focused ? "text-primary" : "text-muted"}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
