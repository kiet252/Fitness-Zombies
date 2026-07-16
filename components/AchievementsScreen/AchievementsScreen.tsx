import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  getProfileAchievements,
  ProfileAchievement,
  AchievementCategory,
} from "@/services/achievement.service";
import { Colors } from "@/constants/colors";

// ── Category config ───────────────────────────────────────────────────────────

const CATEGORY_ORDER: AchievementCategory[] = [
  "distance",
  "speed",
  "streak",
  "milestone",
  "event",
  "general",
  "running",
  "walking",
  "social",
];

const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  distance: "🏃 Distance",
  speed: "⚡ Speed",
  streak: "🔥 Streak",
  milestone: "🎯 Milestone",
  event: "🧟 Events",
  general: "⭐ General",
  running: "👟 Running",
  walking: "🚶 Walking",
  social: "👥 Social",
};

const CATEGORY_ICONS: Record<AchievementCategory, string> = {
  distance: "map-marker-distance",
  speed: "lightning-bolt",
  streak: "fire",
  milestone: "flag-checkered",
  event: "skull",
  general: "star",
  running: "run",
  walking: "walk",
  social: "account-group",
};

// ── Achievement card ──────────────────────────────────────────────────────────

function AchievementCard({ achievement }: { achievement: ProfileAchievement }) {
  const isUnlocked = !!achievement.unlockedAt;
  const iconName =
    achievement.icon && achievement.icon !== "none"
      ? achievement.icon
      : (CATEGORY_ICONS[achievement.category] ?? "trophy");

  return (
    <View
      style={[
        styles.card,
        isUnlocked ? styles.cardUnlocked : styles.cardLocked,
      ]}
    >
      <View
        style={[
          styles.iconCircle,
          isUnlocked ? styles.iconCircleUnlocked : styles.iconCircleLocked,
        ]}
      >
        <MaterialCommunityIcons
          name={iconName as any}
          size={22}
          color={isUnlocked ? Colors.primary : "#2E3A42"}
        />
      </View>

      <Text
        style={[
          styles.cardTitle,
          isUnlocked ? styles.cardTitleUnlocked : styles.cardTitleLocked,
        ]}
        numberOfLines={2}
      >
        {achievement.title}
      </Text>

      <Text
        style={[
          styles.cardDesc,
          isUnlocked ? styles.cardDescUnlocked : styles.cardDescLocked,
        ]}
        numberOfLines={3}
      >
        {achievement.description}
      </Text>

      <View
        style={[
          styles.statusBadge,
          isUnlocked ? styles.statusBadgeUnlocked : styles.statusBadgeLocked,
        ]}
      >
        <MaterialCommunityIcons
          name={isUnlocked ? "check-circle" : "lock"}
          size={10}
          color={isUnlocked ? Colors.primary : "#2E3A42"}
        />
        <Text
          style={[
            styles.statusText,
            isUnlocked ? styles.statusTextUnlocked : styles.statusTextLocked,
          ]}
        >
          {isUnlocked ? "Unlocked" : "Locked"}
        </Text>
      </View>
    </View>
  );
}

// ── Category row ──────────────────────────────────────────────────────────────

function CategoryRow({
  category,
  achievements,
}: {
  category: AchievementCategory;
  achievements: ProfileAchievement[];
}) {
  const unlockedCount = achievements.filter((a) => !!a.unlockedAt).length;

  return (
    <View style={styles.categorySection}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryLabel}>{CATEGORY_LABELS[category]}</Text>
        <Text style={styles.categoryCount}>
          {unlockedCount}/{achievements.length}
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardRow}
      >
        {achievements.map((a) => (
          <AchievementCard key={a.achievementId} achievement={a} />
        ))}
      </ScrollView>
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function AchievementsScreen() {
  const insets = useSafeAreaInsets();
  const [achievements, setAchievements] = useState<ProfileAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAchievements();
  }, []);

  async function loadAchievements() {
    try {
      setLoading(true);
      setError(null);
      const data = await getProfileAchievements();
      setAchievements(data);
    } catch (err) {
      setError("Could not load achievements. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading achievements...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <MaterialCommunityIcons name="alert-circle-outline" size={36} color="#FF4D4F" />
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.retryText} onPress={loadAchievements}>
            Try again
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Group by category
  const grouped = new Map<AchievementCategory, ProfileAchievement[]>();
  for (const a of achievements) {
    if (!grouped.has(a.category)) grouped.set(a.category, []);
    grouped.get(a.category)!.push(a);
  }

  const totalUnlocked = achievements.filter((a) => !!a.unlockedAt).length;
  const totalCount = achievements.length;
  const progressPercent = totalCount > 0 ? totalUnlocked / totalCount : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom + 130 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Achievements</Text>
            <Text style={styles.headerSubtitle}>
              {totalUnlocked} of {totalCount} unlocked
            </Text>
          </View>
          <View style={styles.trophyCircle}>
            <MaterialCommunityIcons
              name="trophy"
              size={28}
              color={Colors.primary}
            />
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBarTrack}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progressPercent * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressLabel}>
          {Math.round(progressPercent * 100)}% complete
        </Text>

        {/* Category groups */}
        {CATEGORY_ORDER.filter((cat) => grouped.has(cat)).map((cat) => (
          <CategoryRow
            key={cat}
            category={cat}
            achievements={grouped.get(cat)!}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0D1216",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: Colors.muted,
    fontSize: 13,
    marginTop: 2,
  },
  trophyCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(61,220,132,0.12)",
    borderWidth: 1,
    borderColor: "rgba(61,220,132,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },

  // Progress bar
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#1A2730",
    marginBottom: 6,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  progressLabel: {
    color: Colors.muted,
    fontSize: 11,
    marginBottom: 24,
  },

  // Category section
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryLabel: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "800",
  },
  categoryCount: {
    color: Colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
  cardRow: {
    paddingRight: 16,
    gap: 10,
  },

  // Card
  card: {
    width: 130,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    gap: 6,
  },
  cardUnlocked: {
    backgroundColor: "rgba(61,220,132,0.07)",
    borderColor: "rgba(61,220,132,0.35)",
  },
  cardLocked: {
    backgroundColor: "#0F1419",
    borderColor: "#1A2730",
  },

  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  iconCircleUnlocked: {
    backgroundColor: "rgba(61,220,132,0.15)",
  },
  iconCircleLocked: {
    backgroundColor: "#141C22",
  },

  cardTitle: {
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 16,
  },
  cardTitleUnlocked: {
    color: Colors.text,
  },
  cardTitleLocked: {
    color: "#3A4A54",
  },

  cardDesc: {
    fontSize: 10,
    lineHeight: 14,
  },
  cardDescUnlocked: {
    color: Colors.muted,
  },
  cardDescLocked: {
    color: "#243038",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 20,
    marginTop: 2,
  },
  statusBadgeUnlocked: {
    backgroundColor: "rgba(61,220,132,0.15)",
  },
  statusBadgeLocked: {
    backgroundColor: "#141C22",
  },
  statusText: {
    fontSize: 9,
    fontWeight: "700",
  },
  statusTextUnlocked: {
    color: Colors.primary,
  },
  statusTextLocked: {
    color: "#2E3A42",
  },

  // States
  loadingText: {
    color: Colors.muted,
    fontSize: 14,
    marginTop: 12,
  },
  errorText: {
    color: "#FF4D4F",
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
  },
  retryText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 14,
  },
});
