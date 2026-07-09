import { Colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type Achievement = {
  title: string;
  icon?: string;
};

type Props = {
  achievements?: Achievement[];
};

function AchievementCard({ icon, title }: Achievement) {
  return (
    <View style={styles.achievement}>
      <MaterialCommunityIcons
        name={(icon || "trophy") as any}
        size={24}
        color={Colors.primary}
      />
      <Text style={styles.achievementText}>{title}</Text>
    </View>
  );
}

export default function AchievementSection({ achievements = [] }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      {achievements.length === 0 ? (
        <View style={styles.emptyBox}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={24}
            color={Colors.muted}
          />
          <Text style={styles.emptyText}>
            No achievements unlocked yet.
          </Text>
          <Text style={styles.emptySubText}>
            Finish your first run to unlock one.
          </Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {achievements.map((item, index) => (
            <AchievementCard
              key={`${item.title}-${index}`}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </ScrollView>
      )}
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
    width: 72,
    height: 82,
    borderRadius: 14,
    backgroundColor: "rgba(61,220,132,0.12)",
    borderWidth: 1,
    borderColor: "rgba(61,220,132,0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    padding: 6,
  },
  achievementText: {
    color: Colors.primary,
    fontSize: 9,
    textAlign: "center",
    marginTop: 6,
    fontWeight: "700",
  },
  emptyBox: {
    height: 96,
    borderRadius: 16,
    backgroundColor: "#171C22",
    borderWidth: 1,
    borderColor: "#263037",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 8,
  },
  emptySubText: {
    color: Colors.muted,
    fontSize: 11,
    marginTop: 4,
  },
});