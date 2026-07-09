import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  weeklyDistance?: number[];
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DistanceChart({ weeklyDistance = [] }: Props) {
  const data = weeklyDistance.length ? weeklyDistance : [0, 0, 0, 0, 0, 0, 0];
  const max = Math.max(...data, 1);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Distance</Text>

        <View style={styles.toggle}>
          <Text style={styles.active}>Week</Text>
          <Text style={styles.inactive}>Month</Text>
        </View>
      </View>

      <View style={styles.chart}>
        {data.map((km, index) => {
          const height = Math.max((km / max) * 90, 4);

          return (
            <View key={index} style={styles.barItem}>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { height }]} />
              </View>
              <Text style={styles.day}>{days[index]}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#171C22",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  title: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "900",
  },
  toggle: {
    flexDirection: "row",
    backgroundColor: "#090D10",
    borderRadius: 18,
    padding: 3,
  },
  active: {
    backgroundColor: Colors.primary,
    color: "#07110C",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 14,
    fontSize: 12,
    fontWeight: "900",
  },
  inactive: {
    color: Colors.muted,
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: "700",
  },
  chart: {
    height: 130,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  barItem: {
    alignItems: "center",
    flex: 1,
  },
  barTrack: {
    height: 95,
    width: 12,
    borderRadius: 999,
    backgroundColor: "#263037",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },
  day: {
    color: Colors.muted,
    fontSize: 10,
    marginTop: 8,
  },
});