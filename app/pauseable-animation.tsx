import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import ChatBubble from "@/components/chat/ChatBubble";
import { FontAwesome } from "@expo/vector-icons";
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { withPause } from "react-native-redash";

const easing = Easing.inOut(Easing.ease);

const PauseableAnimationScreen = () => {
  const [play, setPlay] = useState(false);
  const paused = useSharedValue(!play);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withPause(
      withRepeat(withTiming(1, { duration: 1000, easing }), -1, true),
      paused,
    );
  }, [paused, progress]);

  return (
    <ThemedView style={styles.container}>
      <ChatBubble progress={progress} />
      <View style={styles.buttonContainer}>
        {!play ? (
          <FontAwesome
            onPress={() => {
              setPlay(true);
              paused.value = false;
            }}
            name="play-circle-o"
            size={64}
            color="dodgerblue"
          />
        ) : (
          <FontAwesome
            onPress={() => {
              setPlay(false);
              paused.value = true;
            }}
            name="pause-circle-o"
            size={64}
            color="dodgerblue"
          />
        )}
      </View>
    </ThemedView>
  );
};

export default PauseableAnimationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "25%",
  },
});
