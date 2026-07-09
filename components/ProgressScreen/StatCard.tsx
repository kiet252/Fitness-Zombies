import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon: string;
  value: string;
  label: string;
  change: string;
  color?: string;
};

export default function StatCard({
  icon,
  value,
  label,
  change,
  color = "#aeb8c3",
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={[styles.icon, { color }]}>{icon}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{change}</Text>
        </View>
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#171e24",
    borderRadius: 14,
    padding: 16,
    marginBottom: 13,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  icon: {
    fontSize: 24,
  },
  badge: {
    backgroundColor: "#123527",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    color: "#2df28c",
    fontSize: 11,
    fontWeight: "800",
  },
  value: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
  },
  label: {
    color: "#b8c0ca",
    fontSize: 12,
    marginTop: 4,
  },
});