import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarIcon}>♙</Text>

        <View style={styles.settingsBubble}>
          <Text style={styles.settingsIcon}>⚙</Text>
        </View>
      </View>

      <Text style={styles.name}>Alex Runner</Text>
      <Text style={styles.subtitle}>Fitness Enthusiast · Level 12</Text>

      <View style={styles.levelRow}>
        <Text style={styles.levelText}>Level 12</Text>
        <Text style={styles.levelText}>2,840 / 3,000 XP</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 22,
  },
  avatar: {
    width: 102,
    height: 102,
    borderRadius: 51,
    borderWidth: 4,
    borderColor: "#34e887",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatarIcon: {
    color: "#34e887",
    fontSize: 46,
  },
  settingsBubble: {
    position: "absolute",
    right: -6,
    bottom: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#34e887",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: {
    color: "#062015",
    fontSize: 18,
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
  },
  subtitle: {
    color: "#b8c0ca",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 18,
  },
  levelRow: {
    width: "58%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  levelText: {
    color: "#c7d0d8",
    fontSize: 11,
  },
  progressBar: {
    width: "58%",
    height: 9,
    backgroundColor: "#10181d",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    width: "94%",
    height: "100%",
    backgroundColor: "#ffb347",
    borderRadius: 999,
  },
});