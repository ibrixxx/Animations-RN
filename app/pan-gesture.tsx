import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { CARD_HEIGHT, CARD_WIDTH, Card, Cards } from "@/components/Card";
import { clamp, withBouncing } from "react-native-redash";
import { useHeaderHeight } from "@react-navigation/elements";

const PanGestureScreen = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  const headerHeight = useHeaderHeight();

  const boundX = Dimensions.get("screen").width - CARD_WIDTH;
  const boundY = Dimensions.get("screen").height - CARD_HEIGHT - headerHeight;

  const pan = Gesture.Pan()
    .onStart(() => {
      contextX.value = translateX.value;
      contextY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = clamp(contextX.value + event.translationX, 0, boundX);
      translateY.value = clamp(contextY.value + event.translationY, 0, boundY);
    })
    .onEnd((event) => {
      translateX.value = withBouncing(
        withDecay({ velocity: event.velocityX }),
        0,
        boundX,
      );
      translateY.value = withBouncing(
        withDecay({ velocity: event.velocityY }),
        0,
        boundY,
      );
    });

  return (
    <ThemedView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <Animated.View style={style}>
          <Card card={Cards.Card3} />
        </Animated.View>
      </GestureDetector>
    </ThemedView>
  );
};

export default PanGestureScreen;
