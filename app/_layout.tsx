import { ThemeProvider } from "@/src/ThemeContext";
import { Stack, useRouter } from "expo-router";

import { AuthProvider, useAuth } from "./../src/context/AuthContext";
import { useEffect } from "react";

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

  //  useEffect(() => {
  //    if (!user) {
  //      router.replace("/login");
  //    }
  //  }, [user]);

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
      </Stack>
    </ThemeProvider>
  );
}
