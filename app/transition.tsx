import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { useSpring } from "react-native-redash";
import { StyleSheet } from "react-native";
import { cards } from "@/components/Card";
import AnimatedTransitionCard from "@/components/AnimatedTransitionCard";
// import {
//   useDerivedValue,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";

const TransitionAnimationScreen = () => {
  const [toggled, setToggled] = useState(false);
  const transition = useSpring(toggled);

  //   const toggled = useSharedValue(0);
  //   const transition = useDerivedValue(() => {
  //     return withTiming(toggled.value);
  //   });

  return (
    <ThemedView style={styles.container}>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedTransitionCard
          key={card}
          card={card}
          index={index}
          transition={transition}
          onPress={() => setToggled((prev) => !prev)}
          //   onPress={() => (toggled.value = toggled.value ? 0 : 1)}
        />
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default TransitionAnimationScreen;
