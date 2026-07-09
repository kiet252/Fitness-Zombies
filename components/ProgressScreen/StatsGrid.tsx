import React from "react";
import { StyleSheet, View } from "react-native";
import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <View style={styles.grid}>
      <StatCard
        icon="⌖"
        value="38.3 km"
        label="Weekly Distance"
        change="+12%"
        color="#2df28c"
      />
      <StatCard
        icon="♨"
        value="3,120 kcal"
        label="Calories Burned"
        change="+8%"
        color="#ff9f1c"
      />
      <StatCard
        icon="◷"
        value="3h 42m"
        label="Active Time"
        change="+15%"
      />
      <StatCard
        icon="⌁"
        value="5 runs"
        label="Total Runs"
        change="+2"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});