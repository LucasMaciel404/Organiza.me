import { ThemeProvider } from "@/src/context/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "./../src/context/AuthContext";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import { StorageProvider } from "@/src/context/StorangeContext";
import { SettingsProvider } from "@/src/context/SettingsContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}

function RootLayout() {
  const { user } = useAuth();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "SpaceMono-Regular": require("./../assets/fonts/SpaceMono-Regular.ttf"),
    "Caveat-Regular": require("./../assets/fonts/Caveat-Regular.ttf"),
  });

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  return (
    <SettingsProvider>
      <StorageProvider>
        <ThemeProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ title: "Cadastrar" }} />
            <Stack.Screen
              name="forgot-password"
              options={{ title: "Recuperar Senha" }}
            />
          </Stack>
        </ThemeProvider>
      </StorageProvider>
    </SettingsProvider>
  );
}
