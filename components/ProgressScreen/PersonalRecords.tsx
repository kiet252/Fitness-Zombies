import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { RunResponse } from "@/services/run.service";

type Props = {
  runs: RunResponse[];
};

export default function PersonalRecords({
  runs,
}: Props) {
  const longestRun = useMemo(() => {
    if (runs.length === 0) {
      return null;
    }

    return runs.reduce<RunResponse | null>(
      (longest, run) => {
        if (
          !longest ||
          run.distanceMeters > longest.distanceMeters
        ) {
          return run;
        }

        return longest;
      },
      null,
    );
  }, [runs]);

  return (
    <View>
      <Text style={styles.title}>PERSONAL RECORDS</Text>

      <View style={styles.grid}>
        <RecordCard
          icon="⌖"
          value={
            longestRun
              ? formatDistance(longestRun.distanceMeters)
              : "--"
          }
          label="Longest Run"
          date={
            longestRun
              ? formatRecordDate(longestRun.startTime)
              : ""
          }
        />

        <RecordCard
          icon="◴"
          value="--"
          label="Fastest Pace"
          date=""
        />
      </View>
    </View>
  );
}

function RecordCard({
  icon,
  value,
  label,
  date,
}: {
  icon: string;
  value: string;
  label: string;
  date: string;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.icon}>{icon}</Text>

        {date.length > 0 && (
          <Text style={styles.date}>{date}</Text>
        )}
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

function formatDistance(distanceMeters: number): string {
  const kilometers = Math.max(distanceMeters, 0) / 1000;

  return `${kilometers.toFixed(1)} km`;
}

function formatRecordDate(dateString: string): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

const styles = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    minHeight: 112,
    backgroundColor: "#171E24",
    borderRadius: 14,
    padding: 16,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    color: "#2DF28C",
    fontSize: 18,
  },
  date: {
    color: "#68727C",
    fontSize: 11,
  },
  value: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 14,
  },
  label: {
    color: "#AEB7C0",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },
});