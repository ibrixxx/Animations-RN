import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { Defs, LinearGradient, Path, Stop, Svg } from "react-native-svg";
import Label from "@/components/graph/Label";
import Cursor from "@/components/graph/Cursor";
import {
  Extrapolation,
  interpolate,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { getPointAtLength, parsePath } from "@/helpers/AnimatedHelpers";
import * as shape from "d3-shape";
import { useTheme } from "@/hooks/useTheme";
import { Colors } from "@/constants/Colors";
const { width } = Dimensions.get("window");
const height = width;
const data: [number, number][] = [
  { x: new Date(2020, 5, 1), y: 4371 },
  { x: new Date(2020, 5, 2), y: 6198 },
  { x: new Date(2020, 5, 3), y: 5310 },
  { x: new Date(2020, 5, 4), y: 7188 },
  { x: new Date(2020, 5, 5), y: 8677 },
  { x: new Date(2020, 5, 6), y: 5012 },
].map((p) => [p.x.getTime(), p.y]);

const domain = {
  x: [Math.min(...data.map(([x]) => x)), Math.max(...data.map(([x]) => x))],
  y: [Math.min(...data.map(([, y]) => y)), Math.max(...data.map(([, y]) => y))],
};

const range = {
  x: [0, width],
  y: [height, 0],
};

const scale = (v: number, d: number[], r: number[]) => {
  "worklet";
  return interpolate(v, d, r, Extrapolation.CLAMP);
};

const scaleInvert = (y: number, d: number[], r: number[]) => {
  "worklet";
  return interpolate(y, r, d, Extrapolation.CLAMP);
};

const d = shape
  .line()
  .x(([x]) => scale(x, domain.x, range.x))
  .y(([, y]) => scale(y, domain.y, range.y))
  .curve(shape.curveBasis)(data) as string;
const path = parsePath(d);

const GraphScreen = () => {
  const { theme } = useTheme();
  const length = useSharedValue(0);
  const point = useDerivedValue(() => {
    const p = getPointAtLength(path, length.value);
    return {
      coord: {
        x: p.x,
        y: p.y,
      },
      data: {
        x: scaleInvert(p.x, domain.x, range.x),
        y: scaleInvert(p.y, domain.y, range.y),
      },
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Label {...{ data, point }} />
      <View>
        <Svg {...{ width, height }}>
          <Defs>
            <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
              <Stop
                stopColor={theme === "dark" ? "#040533" : "#CDE3F8"}
                offset="0%"
              />
              <Stop
                stopColor={theme === "dark" ? "#023040" : "#eef6fd"}
                offset="80%"
              />
              <Stop
                stopColor={
                  theme === "dark"
                    ? Colors[theme ?? "light"].background
                    : "#FEFFFF"
                }
                offset="100%"
              />
            </LinearGradient>
          </Defs>
          <Path
            fill="transparent"
            stroke={theme === "dark" ? "lightgray" : "#367be2"}
            strokeWidth={5}
            {...{ d }}
          />
          <Path
            d={`${d}  L ${width} ${height} L 0 ${height}`}
            fill="url(#gradient)"
          />
        </Svg>
        <Cursor {...{ path, length, point }} />
      </View>
    </ThemedView>
  );
};

export default GraphScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
