import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getAllRuns, RunResponse } from "@/services/run.service";

import HistoryFilterTabs from "./HistoryFilterTabs";
import RunHistoryCard from "./RunHistoryCard";
import WeeklyDistanceCard from "./WeeklyDistanceCard";

export default function HistoryScreen() {
  const [runs, setRuns] = useState<RunResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRuns();
  }, []);

  async function loadRuns() {
    try {
      setLoading(true);
      setError(null);

      const data = await getAllRuns();
      setRuns(data);
    } catch (err) {
      console.error("Failed to load runs:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load your run history.",
      );
    } finally {
      setLoading(false);
    }
  }

  const weeklyDistance = useMemo(() => {
    return buildWeeklyDistance(runs);
  }, [runs]);

  const weeklyDistanceKilometers = weeklyDistance.reduce(
    (total, distance) => total + distance,
    0,
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Run History</Text>

        <Text style={styles.weekTotal}>
          {weeklyDistanceKilometers.toFixed(1)} km this week
        </Text>
      </View>

      <WeeklyDistanceCard weeklyDistance={weeklyDistance} />

      <HistoryFilterTabs />

      {loading && (
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color="#39E58C" />
          <Text style={styles.statusText}>Loading your runs...</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.statusContainer}>
          <Text style={styles.errorText}>{error}</Text>

          <Text style={styles.retryText} onPress={loadRuns}>
            Try again
          </Text>
        </View>
      )}

      {!loading && !error && runs.length === 0 && (
        <View style={styles.statusContainer}>
          <Text style={styles.emptyTitle}>No runs yet</Text>

          <Text style={styles.statusText}>
            Complete your first run and it will appear here.
          </Text>
        </View>
      )}

      {!loading &&
        !error &&
        runs.map((run) => (
          <RunHistoryCard
            key={run.id}
            type={run.type === "zombie" ? "challenge" : "normal"}
            date={formatRunDate(run.startTime)}
            distance={formatDistance(run.distanceMeters)}
            duration={formatDuration(run.durationSeconds)}
            calories={`${Math.round(run.caloriesBurned)} kcal`}
          />
        ))}
    </ScrollView>
  );
}

function buildWeeklyDistance(runs: RunResponse[]): number[] {
  const weeklyDistance = [0, 0, 0, 0, 0, 0, 0];

  const now = new Date();

  const startOfWeek = new Date(now);
  const currentDay = startOfWeek.getDay();

  const daysSinceMonday = currentDay === 0 ? 6 : currentDay - 1;

  startOfWeek.setDate(startOfWeek.getDate() - daysSinceMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  runs.forEach((run) => {
    const runDate = new Date(run.startTime);

    if (runDate < startOfWeek || runDate >= endOfWeek) {
      return;
    }

    const javascriptDay = runDate.getDay();

    // JavaScript:
    // Sunday = 0
    // Monday = 1
    //
    // Chart:
    // Monday = 0
    // Sunday = 6
    const dayIndex = javascriptDay === 0 ? 6 : javascriptDay - 1;

    weeklyDistance[dayIndex] += run.distanceMeters / 1000;
  });

  return weeklyDistance;
}

function formatRunDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDistance(distanceMeters: number): string {
  return `${(distanceMeters / 1000).toFixed(1)} km`;
}

function formatDuration(durationSeconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(durationSeconds));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedMinutes}:${formattedSeconds}`;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#080D11",
  },
  container: {
    flexGrow: 1,
    padding: 17,
    paddingTop: 54,
    paddingBottom: 110,
    backgroundColor: "#080D11",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: "#F5F7FA",
    fontSize: 22,
    fontWeight: "900",
  },
  weekTotal: {
    color: "#39E58C",
    fontSize: 12,
    fontWeight: "700",
  },
  statusContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  statusText: {
    color: "#B0B7C3",
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
  },
  errorText: {
    color: "#FF4D4F",
    fontSize: 14,
    textAlign: "center",
  },
  retryText: {
    color: "#39E58C",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 14,
  },
  emptyTitle: {
    color: "#F5F7FA",
    fontSize: 18,
    fontWeight: "800",
  },
});