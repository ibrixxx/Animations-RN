import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { DataPoint } from "./Label";
import { Path } from "@/helpers/AnimatedHelpers";

interface CursorProps {
  path: Path;
  length: Animated.SharedValue<number>;
  point: { value: DataPoint };
}

const { width } = Dimensions.get("window");
const CURSOR = 100;

const Cursor = ({ path, length, point }: CursorProps) => {
  const ctx = useSharedValue({ offsetX: 0, offsetY: 0 });
  const pan = Gesture.Pan()
    .onStart(() => {
      ctx.value.offsetX = interpolate(
        length.value,
        [0, path.length],
        [0, width],
        Extrapolation.CLAMP,
      );
    })
    .onUpdate((event) => {
      length.value = interpolate(
        ctx.value.offsetX + event.translationX,
        [0, width],
        [0, path.length],
        Extrapolation.CLAMP,
      );
    })
    .onEnd(({ velocityX }) => {
      length.value = withDecay({
        velocity: velocityX,
        clamp: [0, path.length],
      });
    });

  const style = useAnimatedStyle(() => {
    const { coord } = point.value;
    const translateX = coord.x - CURSOR / 2;
    const translateY = coord.y - CURSOR / 2;
    return {
      transform: [{ translateX }, { translateY }],
    };
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.cursorContainer, style]}>
          <View style={styles.cursor} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Cursor;

const styles = StyleSheet.create({
  cursorContainer: {
    width: CURSOR,
    height: CURSOR,
    justifyContent: "center",
    alignItems: "center",
  },
  cursor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#367be2",
    borderWidth: 4,
    backgroundColor: "white",
  },
});
