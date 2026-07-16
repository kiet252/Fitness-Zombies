import { useEffect, useState } from "react";
import { DeviceEventEmitter, ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

import HomeHeader from "@/components/HomeScreen/HomeHeader";
import ActivityCard from "@/components/HomeScreen/ActivityCard";
import StartRunningSection from "@/components/HomeScreen/StartRunningSection";
import DistanceChart from "@/components/HomeScreen/DistanceChart";
import AchievementSection from "@/components/HomeScreen/AchievementSection";

import { getHome } from "@/services/home.service";
import { getProfileAchievements, ProfileAchievement } from "@/services/achievement.service";

export default function HomeScreen() {
  const [home, setHome] = useState<any>(null);
  const [achievements, setAchievements] = useState<ProfileAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadHome() {
      try {
        const data = await getHome();
        setHome(data);
      } catch (error: any) {
        console.log("Failed to load home status:", error.response?.status);
        console.log("Failed to load home data:", error.response?.data);
        console.log("Failed to load home message:", error.message);
      } finally {
        setIsLoading(false);
      }

      try {
        const achievementsData = await getProfileAchievements();
        setAchievements(achievementsData);
      } catch (error: any) {
        console.log("Failed to load achievements:", error.response?.status);
      }
    }

    loadHome();

    const subscription = DeviceEventEmitter.addListener("run_finished", () => {
      loadHome();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#3DDC84" />
        <Text style={styles.loadingText}>Loading home...</Text>
      </View>
    );
  }

  if (!home) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Could not load home data.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HomeHeader fullName={home.profile.fullName} />

      <ActivityCard
        profile={{
          stepGoal: home.profile.dailyStepGoal || 10000,
        }}
        stats={{
          steps: home.today.steps,
          distanceMeters: home.today.distanceMeters,
          caloriesBurned: home.today.caloriesBurned,
          activeSeconds: home.today.activeSeconds,
        }}
      />

      <StartRunningSection />

      <DistanceChart weeklyDistance={home.weeklyDistance} />

      <AchievementSection achievements={achievements} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 17,
    paddingTop: 55,
    backgroundColor: "#080D11",
  },
  loading: {
    flex: 1,
    backgroundColor: "#080D11",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "white",
    marginTop: 12,
  },
});