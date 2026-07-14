import React from "react";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function ZombieRun() {
  return (
    <TouchableOpacity 
    activeOpacity={0.85} 
    style={styles.card}
    onPress={() => router.push("/zombie-run")}>
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>ϟ</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Zombie Challenge</Text>
          <Text style={styles.description}>
            High-intensity interval training with pace targets.
          </Text>

          <View style={styles.tags}>
            <Tag label="Interval Training" />
            <Tag label="Pace Targets" />
            <Tag label="Sprint Alerts" />
          </View>
        </View>
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningIcon}>⚠</Text>
        <Text style={styles.warningText}>
          Recommended: 6+ km/h running pace for best results
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#171e24",
    borderColor: "#823036",
    borderWidth: 1,
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
  },
  topRow: {
    flexDirection: "row",
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#392329",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  icon: {
    color: "#ff4b5f",
    fontSize: 42,
    fontWeight: "900",
  },
  content: {
    flex: 1,
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 6,
  },
  description: {
    color: "#cbd4dc",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#2d2024",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },
  tagText: {
    color: "#ff4b5f",
    fontSize: 11,
    fontWeight: "700",
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a241e",
    borderColor: "#69512a",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginTop: 18,
  },
  warningIcon: {
    color: "#ffb020",
    marginRight: 10,
    fontSize: 14,
  },
  warningText: {
    flex: 1,
    color: "#ffb020",
    fontSize: 12,
    lineHeight: 18,
  },
});