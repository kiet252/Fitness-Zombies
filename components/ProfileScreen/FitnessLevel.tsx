import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  level: number;
  endurance?: number;
  speed?: number;
  consistency?: number;
};

export default function FitnessLevel({
  level,
  endurance = 0,
  speed = 0,
  consistency = 0,
}: Props) {
  const fitnessLabel = getFitnessLabel(level);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>FITNESS LEVEL</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {fitnessLabel}
          </Text>
        </View>
      </View>

      <View style={styles.metrics}>
        <Metric
          label="Endurance"
          value={endurance}
        />

        <Metric
          label="Speed"
          value={speed}
        />

        <Metric
          label="Consistency"
          value={consistency}
        />
      </View>
    </View>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const safeValue = Math.min(
    Math.max(Math.round(value || 0), 0),
    100,
  );

  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>

      <View style={styles.bar}>
        <View
          style={[
            styles.fill,
            {
              width: `${safeValue}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.percent}>
        {safeValue}%
      </Text>
    </View>
  );
}

function getFitnessLabel(level: number): string {
  const safeLevel = Math.max(1, level || 1);

  if (safeLevel >= 20) {
    return "Elite";
  }

  if (safeLevel >= 10) {
    return "Advanced";
  }

  if (safeLevel >= 5) {
    return "Intermediate";
  }

  return "Beginner";
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#10231D",
    borderColor: "#1E6A48",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 22,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    color: "#36F58C",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  badge: {
    backgroundColor: "#164B35",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeText: {
    color: "#36F58C",
    fontSize: 12,
    fontWeight: "700",
  },
  metrics: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metric: {
    width: "30%",
  },
  metricLabel: {
    color: "#D7DEE5",
    fontSize: 10,
    marginBottom: 8,
  },
  bar: {
    height: 6,
    backgroundColor: "#07100D",
    borderRadius: 999,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#36E88A",
    borderRadius: 999,
  },
  percent: {
    color: "#36F58C",
    fontSize: 11,
    fontWeight: "900",
    marginTop: 5,
  },
});