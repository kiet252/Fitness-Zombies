import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PersonalRecords() {
  return (
    <View>
      <Text style={styles.title}>PERSONAL RECORDS</Text>

      <View style={styles.grid}>
        <RecordCard icon="⌖" label="Longest Run" date="Jun 15" />
        <RecordCard icon="◴" label="Fastest Pace" date="Jul 4" />
      </View>
    </View>
  );
}

function RecordCard({
  icon,
  label,
  date,
}: {
  icon: string;
  label: string;
  date: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 90,
    backgroundColor: "#171e24",
    borderRadius: 14,
    padding: 16,
  },
  icon: {
    color: "#2df28c",
    fontSize: 18,
  },
  date: {
    color: "#68727c",
    fontSize: 11,
    position: "absolute",
    right: 16,
    top: 16,
  },
  label: {
    color: "#fff",
    fontWeight: "800",
    marginTop: 20,
  },
});