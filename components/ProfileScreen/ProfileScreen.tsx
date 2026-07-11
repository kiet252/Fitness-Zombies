import React, { useEffect, useState } from "react";
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

import { getHome } from "@/services/home.service";
import { getAllRuns, RunResponse } from "@/services/run.service";

import Achievements, {
  ProfileAchievement,
} from "./Achievements";
import FitnessLevel from "./FitnessLevel";
import ProfileHeader from "./ProfileHeader";
import ProfileMenu from "./ProfileMenu";
import ProfileStats from "./ProfileStats";

type ProfileData = {
  id: string;
  fullName: string;
  email: string;
  level: number;
  currentXp: number;
  dailyStepGoal: number;
};

type HomeResponse = {
  profile: ProfileData;
  recentAchievements?: ProfileAchievement[];
};

const XP_REQUIRED_FOR_NEXT_LEVEL = 3000;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const [home, setHome] = useState<HomeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [runs, setRuns] = useState<RunResponse[]>([]);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError(null);

      const [homeData, runsData] = await Promise.all([
        getHome(),
        getAllRuns(),
      ]);

      setHome(homeData);
      setRuns(runsData);
    } catch (err) {
      console.error("Failed to load profile:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load profile data.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color="#37E887" />

          <Text style={styles.statusText}>
            Loading profile...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !home) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.statusContainer}>
          <Text style={styles.errorText}>
            {error ?? "Could not load profile data."}
          </Text>

          <Text style={styles.retryText} onPress={loadProfile}>
            Try again
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const profile = home.profile;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: 10,
            paddingBottom: insets.bottom + 140,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Profile</Text>

        <ProfileHeader
          fullName={profile.fullName}
          level={profile.level}
          currentXp={profile.currentXp}
          xpCap={XP_REQUIRED_FOR_NEXT_LEVEL}
        />

        <ProfileStats runs={runs} />

        <FitnessLevel
          level={profile.level}
          endurance={82}
          speed={68}
          consistency={91}
        />

        <Achievements
          achievements={home.recentAchievements ?? []}
        />

        <ProfileMenu />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0D1216",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  screenTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 18,
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