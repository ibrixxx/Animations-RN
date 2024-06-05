import { StyleSheet } from "react-native";
import React from "react";
import { StyleGuide } from "@/components/style/StyleGuide";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface BubbleProps {
  progress: { value: number };
  start: number;
  end: number;
}

const Bubble = ({ progress, start, end }: BubbleProps) => {
  const style = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [start, end],
      [0.5, 1],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      progress.value,
      [start, end],
      [1, 1.5],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return <Animated.View style={[style, styles.bubble]} />;
};

export default Bubble;

const SIZE = 32;
const styles = StyleSheet.create({
  bubble: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: StyleGuide.palette.primary,
  },
});
