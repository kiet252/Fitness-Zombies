import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { RunResponse } from "@/services/run.service";

type Props = {
  runs: RunResponse[];
  goalKilometers?: number;
};

export default function WeeklyGoal({
  runs,
  goalKilometers = 50,
}: Props) {
  const currentDistanceKilometers = useMemo(() => {
    return calculateCurrentWeekDistance(runs);
  }, [runs]);

  const safeGoal = Math.max(goalKilometers, 1);

  const percentage = Math.min(
    (currentDistanceKilometers / safeGoal) * 100,
    100,
  );

  const remainingKilometers = Math.max(
    safeGoal - currentDistanceKilometers,
    0,
  );

  const goalCompleted =
    currentDistanceKilometers >= safeGoal;

  return (
    <View style={styles.card}>
      <Text style={styles.header}>◎ WEEKLY GOAL</Text>

      <View style={styles.row}>
        <Text style={styles.title}>
          Run {formatDistance(safeGoal)} km this week
        </Text>

        <Text style={styles.percent}>
          {Math.round(percentage)}%
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percentage}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.subText}>
        {formatDistance(currentDistanceKilometers)} /{" "}
        {formatDistance(safeGoal)} km
        {" · "}
        {goalCompleted
          ? "Goal completed!"
          : `${formatDistance(
              remainingKilometers,
            )} km remaining`}
      </Text>
    </View>
  );
}

function calculateCurrentWeekDistance(
  runs: RunResponse[],
): number {
  const now = new Date();
  const startOfWeek = getStartOfCurrentWeek(now);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  return runs.reduce((total, run) => {
    const runDate = new Date(run.startTime);

    if (
      Number.isNaN(runDate.getTime()) ||
      runDate < startOfWeek ||
      runDate >= endOfWeek
    ) {
      return total;
    }

    return total + Math.max(run.distanceMeters, 0) / 1000;
  }, 0);
}

function getStartOfCurrentWeek(date: Date): Date {
  const start = new Date(date);
  const currentDay = start.getDay();

  const daysSinceMonday =
    currentDay === 0 ? 6 : currentDay - 1;

  start.setDate(start.getDate() - daysSinceMonday);
  start.setHours(0, 0, 0, 0);

  return start;
}

function formatDistance(value: number): string {
  if (Number.isInteger(value)) {
    return value.toString();
  }

  return value.toFixed(1);
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#171E24",
    borderColor: "#60451F",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  header: {
    color: "#FFA726",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    marginRight: 12,
  },
  percent: {
    color: "#36F58C",
    fontSize: 16,
    fontWeight: "900",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#080D10",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFAE42",
    borderRadius: 999,
  },
  subText: {
    color: "#AEB7C0",
    fontSize: 12,
    marginTop: 10,
  },
});