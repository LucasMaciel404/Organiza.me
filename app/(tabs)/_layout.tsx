import { Tabs } from "expo-router";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeContext } from "@/src/ThemeContext";
import { StyleSheet } from "react-native";

export default function Layout() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Foundation name="list" size={25} color={color} style={styles.icon}/>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              size={25}
              style={styles.icon}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    transform: [{ scale: 1.5 }],
    alignSelf: "center",
    paddingTop: 5,
  },
});
