import { StyleSheet } from "react-native";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { canvas2Polar, clamp, polar2Canvas } from "react-native-redash";

const THRESHOLD = 0.001;

interface CursorProps {
  r: number;
  strokeWidth: number;
  theta: { value: number };
  backgroundColor: { value: string };
}

const Cursor = ({ r, strokeWidth, theta, backgroundColor }: CursorProps) => {
  const center = { x: r, y: r };
  const contextOffset = useSharedValue(center);

  const pan = Gesture.Pan()
    .onStart(() => {
      contextOffset.value = polar2Canvas(
        {
          theta: theta.value,
          radius: r,
        },
        center,
      );
    })
    .onUpdate((event) => {
      const x = contextOffset.value.x + event.translationX;
      const y1 = contextOffset.value.y + event.translationY;
      let y: number;
      if (x < r) {
        y = y1;
      } else if (theta.value < Math.PI) {
        y = clamp(y1, 0, r - THRESHOLD);
      } else {
        y = clamp(y1, r, 2 * r);
      }
      const value = canvas2Polar({ x, y }, center).theta;
      theta.value = value > 0 ? value : 2 * Math.PI + value;
    });

  const style = useAnimatedStyle(() => {
    const translation = polar2Canvas(
      {
        theta: theta.value,
        radius: r,
      },
      center,
    );

    return {
      backgroundColor: backgroundColor.value,
      transform: [
        {
          translateX: translation.x,
        },
        {
          translateY: translation.y,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          {
            width: strokeWidth,
            height: strokeWidth,
            borderRadius: strokeWidth / 2,
            borderColor: "white",
            borderWidth: 5,
          },
          style,
          StyleSheet.absoluteFill,
        ]}
      />
    </GestureDetector>
  );
};

export default Cursor;
