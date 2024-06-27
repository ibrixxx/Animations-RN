import { Drawer } from "expo-router/drawer";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";

const Routing = () => {
  const { theme } = useTheme();
  return (
    <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: Colors[theme ?? "light"].background,
        },
      }}
    >
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
      <Drawer.Screen
        name="graph"
        options={{
          drawerLabel: "📈 Graph",
          title: "📈 Graph",
        }}
      />
    </Drawer>
  );
};

export default Routing;
