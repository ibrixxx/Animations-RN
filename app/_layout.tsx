import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerLabel: "🏠 Home",
              title: "🏠 Home",
            }}
          />
          <Drawer.Screen
            name="pan-gesture"
            options={{
              drawerLabel: "🍳 Pan Gesture",
              title: "🍳 Pan Gesture",
            }}
          />
          <Drawer.Screen
            name="transition"
            options={{
              drawerLabel: "🚅 Transition",
              title: "🚅 Transition",
            }}
          />
          <Drawer.Screen
            name="pauseable-animation"
            options={{
              drawerLabel: "⏯️ Pauseable",
              title: "⏯️ Pauseable",
            }}
          />
          <Drawer.Screen
            name="circular-slider"
            options={{
              drawerLabel: "🌀 Circular Slider",
              title: "🌀 Circular Slider",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
