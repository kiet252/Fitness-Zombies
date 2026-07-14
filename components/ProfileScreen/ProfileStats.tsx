import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { RunResponse } from "@/services/run.service";

type Props = {
  runs: RunResponse[];
};

export default function ProfileStats({ runs }: Props) {
  const stats = useMemo(() => {
    return calculateProfileStats(runs);
  }, [runs]);

  return (
    <View style={styles.row}>
      <Stat
        value={`${stats.totalDistanceKilometers.toFixed(1)} km`}
        label="Total Distance"
      />

      <Stat
        value={stats.totalRuns.toString()}
        label="Total Runs"
      />

      <Stat
        value={
          stats.topSpeedKmh > 0
            ? `${stats.topSpeedKmh.toFixed(1)} km/h`
            : "--"
        }
        label="Top Speed"
      />
    </View>
  );
}

function calculateProfileStats(runs: RunResponse[]) {
  return runs.reduce(
    (result, run) => {
      result.totalDistanceKilometers +=
        Math.max(run.distanceMeters, 0) / 1000;

      result.totalRuns += 1;

      if (
        Number.isFinite(run.bestSpeedKmh) &&
        run.bestSpeedKmh > result.topSpeedKmh
      ) {
        result.topSpeedKmh = run.bestSpeedKmh;
      }

      return result;
    },
    {
      totalDistanceKilometers: 0,
      totalRuns: 0,
      topSpeedKmh: 0,
    },
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <View style={styles.card}>
      <Text
        style={styles.value}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
      >
        {value}
      </Text>

      <Text
        style={styles.label}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  card: {
    width: "31.5%",
    minHeight: 88,
    backgroundColor: "#171E24",
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
  },
  label: {
    width: "100%",
    color: "#C3CCD4",
    fontSize: 10,
    marginTop: 6,
    textAlign: "center",
  },
});