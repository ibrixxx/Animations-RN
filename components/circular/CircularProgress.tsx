import { ColorValue, StyleSheet } from "react-native";
import React from "react";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { StyleGuide } from "../style/StyleGuide";

const { PI } = Math;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
  theta: {
    value: number;
  };
  r: number;
  strokeWidth: number;
  backgroundColor: {
    value: string;
  };
}

const CircularProgress = ({
  theta,
  r,
  strokeWidth,
  backgroundColor,
}: CircularProgressProps) => {
  const radius = r - strokeWidth / 2;
  const circumference = 2 * radius * PI;
  const props = useAnimatedProps(() => {
    return {
      stroke: backgroundColor.value as ColorValue,
      strokeDashOffset: theta.value * radius,
    };
  });

  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Circle
        cx={r}
        cy={r}
        fill={"transparent"}
        stroke={"white"}
        r={radius}
        {...{ strokeWidth }}
      />
      <AnimatedCircle
        animatedProps={props}
        cx={r}
        cy={r}
        fill={"transparent"}
        stroke={StyleGuide.palette.primary}
        strokeDasharray={`${circumference}, ${circumference}`}
        r={radius}
        {...{ strokeWidth }}
      />
    </Svg>
  );
};

export default CircularProgress;
