import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

type Offset = {
  x: number;
  y: number;
};

interface SwiperProps {
  onSwipe: () => void;
  profile: any;
  onTop: boolean;
}

const snapPoints = [0];

const Swiper = ({ onSwipe, profile, onTop }: SwiperProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const contextTranslateX = useSharedValue(0);
  const contextTranslateY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      contextTranslateX.value = translateX.value;
      contextTranslateY.value = translateY.value;
    })
    .onChange(({ translationX, translationY }) => {
      translateX.value = contextTranslateX.value + translationX;
      translateY.value = contextTranslateY.value + translationY;
    })
    .onEnd(({ velocityX, velocityY }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(
        dest,
        { velocity: velocityX, restSpeedThreshold: dest === 0 ? 0.01 : 100 },
        () => {
          if (dest !== 0) {
            runOnJS(onSwipe)();
          }
        },
      );
      translateY.value = withSpring(0, { velocity: velocityY });
    });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View>
        <View />
      </Animated.View>
    </GestureDetector>
  );
};

export default Swiper;

const styles = StyleSheet.create({});
