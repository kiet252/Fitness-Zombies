import { StyleSheet, Text, View } from "react-native";

const days = [
  { day: "Mon", value: 4 },
  { day: "Tue", value: 7 },
  { day: "Wed", value: 0 },
  { day: "Thu", value: 5.5 },
  { day: "Fri", value: 8.5 },
  { day: "Sat", value: 10.5 },
  { day: "Sun", value: 3.5 },
];

export default function WeeklyDistanceCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>WEEKLY DISTANCE</Text>

      <View style={styles.chartRow}>
        <View style={styles.yLabels}>
          <Text style={styles.yText}>12</Text>
          <Text style={styles.yText}>6</Text>
          <Text style={styles.yText}>0</Text>
        </View>

        <View style={styles.bars}>
          {days.map((item) => (
            <View key={item.day} style={styles.barItem}>
              <View style={[styles.bar, { height: item.value * 6 }]} />
              <Text style={styles.day}>{item.day}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#171C22",
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  title: {
    color: "#F5F7FA",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginBottom: 16,
  },
  chartRow: {
    flexDirection: "row",
    height: 110,
  },
  yLabels: {
    width: 26,
    justifyContent: "space-between",
    paddingBottom: 24,
  },
  yText: {
    color: "#9AA4B2",
    fontSize: 10,
  },
  bars: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  barItem: {
    alignItems: "center",
    width: 32,
  },
  bar: {
    width: 32,
    borderRadius: 5,
    backgroundColor: "#39E58C",
    marginBottom: 8,
  },
  day: {
    color: "#C7CED8",
    fontSize: 10,
  },
});