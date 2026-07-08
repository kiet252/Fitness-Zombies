import { ScrollView, StyleSheet, Text, View } from "react-native";
import WeeklyDistanceCard from "./WeeklyDistanceCard";
import HistoryFilterTabs from "./HistoryFilterTabs";
import RunHistoryCard from "./RunHistoryCard";

export default function HistoryScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Run History</Text>
        <Text style={styles.weekTotal}>38.3 km this week</Text>
      </View>

      <WeeklyDistanceCard />

      <HistoryFilterTabs />

      <RunHistoryCard
        type="challenge"
        date="Jul 5, 2026"
        distance="10.2 km"
        duration="52:18"
        calories="820 kcal"
      />

      <RunHistoryCard
        type="normal"
        date="Jul 4, 2026"
        distance="6.8 km"
        duration="35:42"
        calories="560 kcal"
      />

      <RunHistoryCard
        type="normal"
        date="Jul 3, 2026"
        distance="5.1 km"
        duration="28:15"
        calories="420 kcal"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
});