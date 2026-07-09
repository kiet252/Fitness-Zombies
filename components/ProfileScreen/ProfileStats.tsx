import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileStats() {
  return (
    <View style={styles.row}>
      <Stat value="284 km" label="Total Distance" />
      <Stat value="127" label="Total Runs" />
      <Stat value="3’48”" label="Best Pace" />
    </View>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  card: {
    width: "31.5%",
    backgroundColor: "#171e24",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
  },
  value: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "900",
  },
  label: {
    color: "#c3ccd4",
    fontSize: 10,
    marginTop: 6,
  },
});