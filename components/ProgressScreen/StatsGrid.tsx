import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { RunResponse } from "@/services/run.service";

import { ProgressPeriod } from "./ProgressTabs";
import StatCard from "./StatCard";

type Props = {
  runs: RunResponse[];
  period: ProgressPeriod;
};

export default function StatsGrid({
  runs,
  period,
}: Props) {
  const stats = useMemo(() => {
    return calculateStats(runs);
  }, [runs]);

  const distanceLabel =
    period === "week"
      ? "Weekly Distance"
      : "Monthly Distance";

  return (
    <View style={styles.grid}>
      <StatCard
        icon="⌖"
        value={`${stats.distanceKilometers.toFixed(1)} km`}
        label={distanceLabel}
        change=""
        color="#2DF28C"
      />

      <StatCard
        icon="♨"
        value={`${Math.round(stats.caloriesBurned).toLocaleString()} kcal`}
        label="Calories Burned"
        change=""
        color="#FF9F1C"
      />

      <StatCard
        icon="◷"
        value={formatActiveTime(stats.durationSeconds)}
        label="Active Time"
        change=""
      />

      <StatCard
        icon="⌁"
        value={`${stats.totalRuns} ${
          stats.totalRuns === 1 ? "run" : "runs"
        }`}
        label="Total Runs"
        change=""
      />
    </View>
  );
}

function calculateStats(runs: RunResponse[]) {
  return runs.reduce(
    (stats, run) => {
      stats.distanceKilometers += run.distanceMeters / 1000;
      stats.caloriesBurned += run.caloriesBurned;
      stats.durationSeconds += run.durationSeconds;
      stats.totalRuns += 1;

      return stats;
    },
    {
      distanceKilometers: 0,
      caloriesBurned: 0,
      durationSeconds: 0,
      totalRuns: 0,
    },
  );
}

function formatActiveTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));

  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});