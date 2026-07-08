import { Colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

function AchievementCard({ icon, title, locked = false }: any) {
  return (
    <View style={[styles.achievement, locked && styles.locked]}>
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={locked ? "#4C5561" : Colors.primary}
      />
      <Text style={[styles.achievementText, locked && styles.lockedText]}>
        {title}
      </Text>
    </View>
  );
}

export default function AchievementSection() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <AchievementCard icon="run-fast" title="First Run" />
        <AchievementCard icon="fire" title="7-Day Streak" />
        <AchievementCard icon="trophy" title="10K Club" />
        <AchievementCard icon="lightning-bolt" title="Speed Demon" locked />
        <AchievementCard icon="target" title="Goal Crusher" locked />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 90,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "900",
  },
  viewAll: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "700",
  },
  achievement: {
    width: 62,
    height: 76,
    borderRadius: 14,
    backgroundColor: "rgba(61,220,132,0.12)",
    borderWidth: 1,
    borderColor: "rgba(61,220,132,0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    padding: 6,
  },
  locked: {
    backgroundColor: "#12171C",
    borderColor: "#202830",
  },
  achievementText: {
    color: Colors.primary,
    fontSize: 9,
    textAlign: "center",
    marginTop: 6,
    fontWeight: "700",
  },
  lockedText: {
    color: "#4C5561",
  },
});