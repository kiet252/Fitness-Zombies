import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NormalRun() {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.card}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>⌁</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Normal Run</Text>
        <Text style={styles.description}>
          Track your distance and pace at your own rhythm.
        </Text>

        <View style={styles.tags}>
          <Tag label="GPS Tracking" />
          <Tag label="Pace Monitor" />
          <Tag label="Route Map" />
        </View>
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
    flexDirection: "row",
    backgroundColor: "#171e24",
    borderColor: "#1f7c55",
    borderWidth: 1,
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#123729",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  icon: {
    color: "#45f58c",
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
    backgroundColor: "#0d2e22",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },
  tagText: {
    color: "#36f58c",
    fontSize: 11,
    fontWeight: "700",
  },
});