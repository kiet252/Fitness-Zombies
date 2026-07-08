import HomeHeader from "@/components/HomeScreen/HomeHeader";
import ActivityCard from "@/components/HomeScreen/ActivityCard";
import StartRunningSection from "@/components/HomeScreen/StartRunningSection";
import DistanceChart from "@/components/HomeScreen/DistanceChart";
import AchievementSection from "@/components/HomeScreen/AchievementSection";

import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HomeHeader />
      <ActivityCard />
      <StartRunningSection />
      <DistanceChart />
      <AchievementSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 17,
    paddingTop: 55,
    backgroundColor: "#080D11",
  },
});