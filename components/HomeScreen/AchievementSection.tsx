import { Colors } from "@/constants/colors";
import { ProfileAchievement } from "@/services/achievement.service";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  achievements?: ProfileAchievement[];
};

function AchievementCard({ icon, title, unlockedAt }: ProfileAchievement) {
  const isUnlocked = !!unlockedAt;

  return (
    <View style={[styles.achievement, isUnlocked ? styles.achievementUnlocked : styles.achievementLocked]}>
      <View style={[styles.iconWrapper, isUnlocked ? styles.iconWrapperUnlocked : styles.iconWrapperLocked]}>
        <MaterialCommunityIcons
          name={(icon || "trophy") as any}
          size={26}
          color={isUnlocked ? Colors.primary : "#3A4550"}
        />
      </View>
      <Text
        style={[
          styles.achievementText,
          isUnlocked ? styles.achievementTextUnlocked : styles.achievementTextLocked,
        ]}
        numberOfLines={2}
      >
        {title}
      </Text>
      <View style={[styles.badge, isUnlocked ? styles.badgeUnlocked : styles.badgeLocked]}>
        <MaterialCommunityIcons
          name={isUnlocked ? "check-circle" : "lock"}
          size={10}
          color={isUnlocked ? Colors.primary : "#3A4550"}
        />
        <Text style={[styles.badgeText, isUnlocked ? styles.badgeTextUnlocked : styles.badgeTextLocked]}>
          {isUnlocked ? "Unlocked" : "Locked"}
        </Text>
      </View>
    </View>
  );
}

export default function AchievementSection({ achievements = [] }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Achievements</Text>
        <TouchableOpacity onPress={() => router.push("/(main)/achievements")}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
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
          {achievements.map((item) => (
            <AchievementCard
              key={item.achievementId}
              {...item}
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

  // Card base
  achievement: {
    width: 84,
    height: 100,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    padding: 8,
    gap: 4,
  },
  achievementUnlocked: {
    backgroundColor: "rgba(61,220,132,0.10)",
    borderColor: "rgba(61,220,132,0.40)",
  },
  achievementLocked: {
    backgroundColor: "#0F1419",
    borderColor: "#1E2830",
  },

  // Icon wrapper
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapperUnlocked: {
    backgroundColor: "rgba(61,220,132,0.15)",
  },
  iconWrapperLocked: {
    backgroundColor: "#171C22",
  },

  // Title
  achievementText: {
    fontSize: 8.5,
    textAlign: "center",
    fontWeight: "700",
    lineHeight: 12,
  },
  achievementTextUnlocked: {
    color: Colors.primary,
  },
  achievementTextLocked: {
    color: "#3A4550",
  },

  // Badge
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 20,
  },
  badgeUnlocked: {
    backgroundColor: "rgba(61,220,132,0.15)",
  },
  badgeLocked: {
    backgroundColor: "#171C22",
  },
  badgeText: {
    fontSize: 7,
    fontWeight: "700",
  },
  badgeTextUnlocked: {
    color: Colors.primary,
  },
  badgeTextLocked: {
    color: "#3A4550",
  },

  // Empty state
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