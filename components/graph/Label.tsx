import { StyleSheet, View } from "react-native";
import { useDerivedValue } from "react-native-reanimated";
import { round } from "react-native-redash";
import { ThemedText } from "../ThemedText";
import { StyleGuide } from "../style/StyleGuide";

export interface DataPoint {
  coord: {
    x: number;
    y: number;
  };
  data: {
    x: number;
    y: number;
  };
}

interface LabelProps {
  point: { value: DataPoint };
}

const Label = ({ point }: LabelProps) => {
  const date = useDerivedValue(() => {
    const d = new Date(point.value.data.x);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  const price = useDerivedValue(() => {
    const p = point.value.data.y;
    return `$ ${round(p, 2).toLocaleString("en-US", { currency: "USD" })}`;
  });

  return (
    <View>
      <ThemedText style={styles.date}>{date.value}</ThemedText>
      <ThemedText style={styles.price}>{price.value}</ThemedText>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  date: {
    ...StyleGuide.typography.title3,
    textAlign: "center",
  },
  price: {
    ...StyleGuide.typography.title2,
    textAlign: "center",
  },
});
