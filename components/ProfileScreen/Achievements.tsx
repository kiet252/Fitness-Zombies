import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Achievements() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>ACHIEVEMENTS</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      <View style={styles.row}>
        <Achievement icon="🏃" label="First Run" />
        <Achievement icon="🔥" label="7-Day Streak" />
        <Achievement icon="🏆" label="10K Club" />
        <Achievement icon="ϟ" label="Speed Record" locked />
      </View>
    </View>
  );
}

function Achievement({
  icon,
  label,
  locked,
}: {
  icon: string;
  label: string;
  locked?: boolean;
}) {
  return (
    <View style={[styles.item, locked && styles.lockedItem]}>
      <Text style={[styles.icon, locked && styles.lockedIcon]}>{icon}</Text>
      <Text style={[styles.label, locked && styles.lockedLabel]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  title: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
  },
  viewAll: {
    color: "#36f58c",
    fontSize: 13,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    width: "23%",
    height: 66,
    backgroundColor: "#10231d",
    borderColor: "#1e6a48",
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  lockedItem: {
    backgroundColor: "#141a1f",
    borderColor: "#141a1f",
  },
  icon: {
    fontSize: 20,
    marginBottom: 6,
  },
  lockedIcon: {
    color: "#8a4a22",
  },
  label: {
    color: "#36f58c",
    fontSize: 10,
    fontWeight: "800",
  },
  lockedLabel: {
    color: "#69727c",
  },
});