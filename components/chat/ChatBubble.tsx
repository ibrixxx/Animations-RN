import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import Bubble from "./Bubble";

const WIDTH = Dimensions.get("window").width * 0.8;

interface ChatBubbleProps {
  progress: { value: number };
}

const ChatBubble = ({ progress }: ChatBubbleProps) => {
  const bubbles = [0, 1, 2];
  const delta = 1 / bubbles.length;

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {bubbles.map((i) => {
          const start = i * delta;
          const end = start + delta;
          return <Bubble key={i} start={start} end={end} progress={progress} />;
        })}
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: WIDTH,
    width: WIDTH,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopRightRadius: WIDTH / 2,
    borderTopLeftRadius: WIDTH / 2,
    borderBottomLeftRadius: WIDTH / 2,
    backgroundColor: "lightgray",
  },
});
