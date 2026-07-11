import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  fullName: string;
  level: number;
  currentXp: number;
  xpCap?: number;
};

export default function ProfileHeader({
  fullName,
  level,
  currentXp,
  xpCap = 3000,
}: Props) {
  const safeLevel = Math.max(1, level || 1);
  const safeXp = Math.max(0, currentXp || 0);
  const safeXpCap = Math.max(1, xpCap);

  const progressPercentage = Math.min(
    (safeXp / safeXpCap) * 100,
    100,
  );

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarIcon}>♙</Text>

        <View style={styles.settingsBubble}>
          <Text style={styles.settingsIcon}>⚙</Text>
        </View>
      </View>

      <Text style={styles.name}>{fullName}</Text>

      <Text style={styles.subtitle}>
        Fitness Enthusiast · Level {safeLevel}
      </Text>

      <View style={styles.levelRow}>
        <Text style={styles.levelText}>
          Level {safeLevel}
        </Text>

        <Text style={styles.levelText}>
          {safeXp.toLocaleString()} /{" "}
          {safeXpCap.toLocaleString()} XP
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progressPercentage}%`,
            },
          ]}
        />
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
    borderColor: "#34E887",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatarIcon: {
    color: "#34E887",
    fontSize: 46,
  },
  settingsBubble: {
    position: "absolute",
    right: -6,
    bottom: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#34E887",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: {
    color: "#062015",
    fontSize: 18,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
  subtitle: {
    color: "#B8C0CA",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 18,
  },
  levelRow: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  levelText: {
    color: "#C7D0D8",
    fontSize: 11,
  },
  progressBar: {
    width: "70%",
    height: 9,
    backgroundColor: "#10181D",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFB347",
    borderRadius: 999,
  },
});