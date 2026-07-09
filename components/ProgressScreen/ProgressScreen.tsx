import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import ProgressHeader from "./ProgressHeader";
import ProgressTabs from "./ProgressTabs";
import StatsGrid from "./StatsGrid";
import DistanceTrend from "./DistanceTrend";
import WeeklyGoal from "./WeeklyGoal";
import PersonalRecords from "./PersonalRecords";

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + 10 },
        ]}
      >
        <ProgressHeader />
        <ProgressTabs />
        <StatsGrid />
        <DistanceTrend />
        <WeeklyGoal />
        <PersonalRecords />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0d1216",
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});