import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BackHandler } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function RootLayout() {
  const { loading, isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    if (!isAuthenticated) {
      // Not authenticated: redirect to auth if not already there
      if (!inAuthGroup) {
        router.replace("/(auth)");
      }
    } else {
      // Authenticated: redirect to tabs if not already there
      if (!inTabsGroup) {
        router.replace("/(tabs)");
      }
    }
  }, [loading, isAuthenticated]);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Stack screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_right'
        }}>
          <Stack.Screen name="index" />
          {/* Auth group */}
          <Stack.Screen name="(auth)" />
          {/* App/tabs group */}
          <Stack.Screen name="(tabs)" />
          {/* Post routes */}
          <Stack.Screen
            name="post/[id]"
            options={{
              presentation: "card",
              gestureEnabled: true,
              animation: 'slide_from_right',
              headerShown: true
            }}
          />
          {/* Existing modal route */}
          {/* <Stack.Screen
            name="add-post"
            options={{
              presentation: "modal",
              gestureEnabled: true,
              animation: 'slide_from_bottom'
            }}
          /> */}
          <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ErrorBoundary>
  );
}