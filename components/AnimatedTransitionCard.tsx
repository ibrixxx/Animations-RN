import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Card, Cards } from "./Card";
import { mix } from "react-native-redash";
import { Dimensions, StyleSheet } from "react-native";
import { StyleGuide } from "./style/StyleGuide";

const { width } = Dimensions.get("window");
const origin = -(width / 2 - StyleGuide.spacing * 2);

interface AnimatedCardProps {
  transition: {
    value: number;
  };
  index: number;
  card: Cards;
  onPress?: () => void;
}

const AnimatedTransitionCard = ({
  transition,
  index,
  card,
  onPress,
}: AnimatedCardProps) => {
  const style = useAnimatedStyle(() => {
    const rotate = (index - 1) * mix(transition.value, 0, Math.PI / 6);

    return {
      transform: [
        { translateX: origin },
        { rotate: `${rotate}rad` },
        { translateX: -origin },
      ],
    };
  });

  return (
    <Animated.View key={card} style={[style, styles.overlay]}>
      <Card onPress={onPress} card={card} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4,
  },
});

export default AnimatedTransitionCard;
