import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type ProfileAchievement = {
  id?: string;
  name: string;
  icon?: string;
  unlocked?: boolean;
};

type Props = {
  achievements?: ProfileAchievement[];
};

export default function Achievements({
  achievements = [],
}: Props) {
  const visibleAchievements = achievements.slice(0, 4);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>ACHIEVEMENTS</Text>

        {achievements.length > 4 && (
          <Text style={styles.viewAll}>View all</Text>
        )}
      </View>

      {visibleAchievements.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            No achievements yet
          </Text>

          <Text style={styles.emptyText}>
            Complete runs and challenges to unlock achievements.
          </Text>
        </View>
      ) : (
        <View style={styles.row}>
          {visibleAchievements.map(
            (achievement, index) => (
              <Achievement
                key={
                  achievement.id ??
                  `${achievement.name}-${index}`
                }
                icon={achievement.icon ?? "🏆"}
                label={achievement.name}
                locked={achievement.unlocked === false}
              />
            ),
          )}
        </View>
      )}
    </View>
  );
}

function Achievement({
  icon,
  label,
  locked,
}: {
  icon: string;
  label: string;
  locked?: boolean;
}) {
  return (
    <View
      style={[
        styles.item,
        locked && styles.lockedItem,
      ]}
    >
      <Text
        style={[
          styles.icon,
          locked && styles.lockedIcon,
        ]}
      >
        {icon}
      </Text>

      <Text
        numberOfLines={2}
        style={[
          styles.label,
          locked && styles.lockedLabel,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
  },
  viewAll: {
    color: "#36F58C",
    fontSize: 13,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    width: "23%",
    minHeight: 76,
    backgroundColor: "#10231D",
    borderColor: "#1E6A48",
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  lockedItem: {
    backgroundColor: "#141A1F",
    borderColor: "#141A1F",
  },
  icon: {
    fontSize: 20,
    marginBottom: 6,
  },
  lockedIcon: {
    opacity: 0.35,
  },
  label: {
    color: "#36F58C",
    fontSize: 10,
    fontWeight: "800",
    textAlign: "center",
  },
  lockedLabel: {
    color: "#69727C",
  },
  emptyCard: {
    backgroundColor: "#171E24",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  emptyText: {
    color: "#8F99A4",
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
  },
});