import { Dimensions, PixelRatio, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import Animated, {
  interpolateColor,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import CircularProgress from "@/components/circular/CircularProgress";
import Cursor from "@/components/circular/Cursor";
import { canvas2Polar } from "react-native-redash";
import { StyleGuide } from "@/components/style/StyleGuide";

const { width } = Dimensions.get("window");
const size = width - 32;
const STROKE_WIDTH = 40;
const r = PixelRatio.roundToNearestPixel(size / 2);
const defaultTheta = canvas2Polar({ x: 0, y: 0 }, { x: r, y: r }).theta;

const CircularSliderScreen = () => {
  const theta = useSharedValue(defaultTheta);
  const backgroundColor = useDerivedValue(() => {
    return interpolateColor(
      theta.value,
      [0, Math.PI, Math.PI * 2],
      ["#ff3884", StyleGuide.palette.primary, "#38ffb3"],
    );
  });
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <CircularProgress
            backgroundColor={backgroundColor}
            strokeWidth={STROKE_WIDTH}
            {...{ r }}
            {...{ theta }}
          />
        </Animated.View>
        <Cursor
          strokeWidth={STROKE_WIDTH}
          r={r - STROKE_WIDTH / 2}
          backgroundColor={backgroundColor}
          {...{ theta }}
        />
      </ThemedView>
    </ThemedView>
  );
};

export default CircularSliderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: r * 2,
    height: r * 2,
  },
});
