import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function WeeklyGoal() {
  return (
    <View style={styles.card}>
      <Text style={styles.header}>◎ WEEKLY GOAL</Text>

      <View style={styles.row}>
        <Text style={styles.title}>Run 50 km this week</Text>
        <Text style={styles.percent}>77%</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      <Text style={styles.subText}>38.3 / 50 km · 11.7 km remaining</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#171e24",
    borderColor: "#60451f",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  header: {
    color: "#ffa726",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
  },
  percent: {
    color: "#36f58c",
    fontSize: 16,
    fontWeight: "900",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#080d10",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    width: "77%",
    height: "100%",
    backgroundColor: "#ffae42",
    borderRadius: 999,
  },
  subText: {
    color: "#aeb7c0",
    fontSize: 12,
    marginTop: 10,
  },
});