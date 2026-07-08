import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export default function DistanceChart() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Distance</Text>

        <View style={styles.toggle}>
          <Text style={styles.active}>Week</Text>
          <Text style={styles.inactive}>Month</Text>
        </View>
      </View>

      <View style={styles.chartPlaceholder}>
        <Text style={styles.chartText}>Chart placeholder</Text>
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
  chartPlaceholder: {
    height: 120,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#263037",
    alignItems: "center",
    justifyContent: "center",
  },
  chartText: {
    color: Colors.muted,
  },
});