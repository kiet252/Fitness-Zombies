import React, { useEffect, useMemo, useState } from "react";
import { DeviceEventEmitter } from "react-native";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { getAllRuns, RunResponse } from "@/services/run.service";

import DistanceTrend from "./DistanceTrend";
import PersonalRecords from "./PersonalRecords";
import ProgressHeader from "./ProgressHeader";
import ProgressTabs, { ProgressPeriod } from "./ProgressTabs";
import StatsGrid from "./StatsGrid";
import WeeklyGoal from "./WeeklyGoal";

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();

  const [runs, setRuns] = useState<RunResponse[]>([]);
  const [period, setPeriod] = useState<ProgressPeriod>("week");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRuns();

    const subscription = DeviceEventEmitter.addListener("run_finished", () => {
      loadRuns();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  async function loadRuns() {
    try {
      setLoading(true);
      setError(null);

      const data = await getAllRuns();
      setRuns(data);
    } catch (err) {
      console.error("Failed to load progress runs:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load progress data.",
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredRuns = useMemo(() => {
    return filterRunsByPeriod(runs, period);
  }, [runs, period]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color="#37E887" />
          <Text style={styles.statusText}>Loading progress...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.statusContainer}>
          <Text style={styles.errorText}>{error}</Text>

          <Text style={styles.retryText} onPress={loadRuns}>
            Try again
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: 10,
            paddingBottom: insets.bottom + 130,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ProgressHeader />

        <ProgressTabs
          period={period}
          onPeriodChange={setPeriod}
        />

        <StatsGrid
          runs={filteredRuns}
          period={period}
        />

        <DistanceTrend
          runs={filteredRuns}
          period={period}
        />

        <WeeklyGoal runs={runs} />

        <PersonalRecords runs={runs} />
      </ScrollView>
    </SafeAreaView>
  );
}

function filterRunsByPeriod(
  runs: RunResponse[],
  period: ProgressPeriod,
): RunResponse[] {
  const now = new Date();

  const start =
    period === "week"
      ? getStartOfCurrentWeek(now)
      : getStartOfCurrentMonth(now);

  const end =
    period === "week"
      ? getStartOfNextWeek(start)
      : getStartOfNextMonth(start);

  return runs.filter((run) => {
    const runDate = new Date(run.startTime);

    return (
      !Number.isNaN(runDate.getTime()) &&
      runDate >= start &&
      runDate < end
    );
  });
}

function getStartOfCurrentWeek(date: Date): Date {
  const start = new Date(date);
  const day = start.getDay();

  const daysSinceMonday = day === 0 ? 6 : day - 1;

  start.setDate(start.getDate() - daysSinceMonday);
  start.setHours(0, 0, 0, 0);

  return start;
}

function getStartOfNextWeek(startOfWeek: Date): Date {
  const end = new Date(startOfWeek);
  end.setDate(end.getDate() + 7);

  return end;
}

function getStartOfCurrentMonth(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
    0,
    0,
    0,
    0,
  );
}

function getStartOfNextMonth(startOfMonth: Date): Date {
  return new Date(
    startOfMonth.getFullYear(),
    startOfMonth.getMonth() + 1,
    1,
    0,
    0,
    0,
    0,
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0D1216",
  },
  container: {
    paddingHorizontal: 16,
  },
  statusContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  statusText: {
    color: "#D1D7DE",
    fontSize: 14,
    marginTop: 12,
  },
  errorText: {
    color: "#FF4D4F",
    fontSize: 14,
    textAlign: "center",
  },
  retryText: {
    color: "#37E887",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 14,
  },
});