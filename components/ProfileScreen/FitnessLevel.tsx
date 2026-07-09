import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FitnessLevel() {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>FITNESS LEVEL</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Advanced</Text>
        </View>
      </View>

      <View style={styles.metrics}>
        <Metric label="Endurance" value="82%" width="82%" />
        <Metric label="Speed" value="68%" width="68%" />
        <Metric label="Consistency" value="91%" width="91%" />
      </View>
    </View>
  );
}

function Metric({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width: `${number}%`;
}) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>

      <View style={styles.bar}>
        <View style={[styles.fill, { width }]} />
      </View>

      <Text style={styles.percent}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#10231d",
    borderColor: "#1e6a48",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 22,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  title: {
    color: "#36f58c",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  badge: {
    backgroundColor: "#164b35",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeText: {
    color: "#36f58c",
    fontSize: 12,
  },
  metrics: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metric: {
    width: "30%",
  },
  metricLabel: {
    color: "#d7dee5",
    fontSize: 10,
    marginBottom: 8,
  },
  bar: {
    height: 6,
    backgroundColor: "#07100d",
    borderRadius: 999,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#36e88a",
    borderRadius: 999,
  },
  percent: {
    color: "#36f58c",
    fontSize: 11,
    fontWeight: "900",
    marginTop: 5,
  },
});