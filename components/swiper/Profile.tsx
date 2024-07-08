import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

interface ProfileProps {
  profile: any;
  translateX: { value: number };
  translateY: { value: number };
}

const Profile = ({ profile, translateX, translateY }: ProfileProps) => {
  const style = useAnimatedStyle(() => ({
    transform: 
    [{ translateX: translateX.value }, { translateY: translateY.value }];
  }));

  return (
    <Animated.View style={style}>
      <Image />
      <View>
        <View>
          <View>
            <Text>Like</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
