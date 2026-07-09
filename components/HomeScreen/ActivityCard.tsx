import { Colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type DailyStats = {
  steps?: number;
  distanceMeters?: number;
  caloriesBurned?: number;
  activeSeconds?: number;
};

type Profile = {
  stepGoal?: number;
};

type Props = {
  stats?: DailyStats;
  profile?: Profile;
};

function StatItem({ icon, value, label, color = Colors.primary }: any) {
  return (
    <View style={styles.stat}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default function ActivityCard({ stats, profile }: Props) {
  const stepGoal = profile?.stepGoal || 10000;
  const currentSteps = stats?.steps || 0;
  const distanceKm = ((stats?.distanceMeters || 0) / 1000).toFixed(1);
  const calories = stats?.caloriesBurned || 0;
  const activeMinutes = Math.floor((stats?.activeSeconds || 0) / 60);

  const progressPercentage = Math.min(
    (currentSteps / stepGoal) * 100,
    100
  ).toFixed(0);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>TODAY'S ACTIVITY</Text>
        <Text style={styles.streak}>7-day streak 🔥</Text>
      </View>

      <View style={styles.statsRow}>
        <StatItem icon="shoe-print" value={currentSteps.toLocaleString()} label="Steps" />
        <StatItem icon="map-marker-radius" value={`${distanceKm}km`} label="Distance" />
        <StatItem icon="fire" value={calories} label="Calories" color="#FFB020" />
        <StatItem icon="clock-outline" value={`${activeMinutes}m`} label="Active" color="#9AA4B2" />
      </View>

      <View style={styles.progressRow}>
        <Text style={styles.progressText}>
          Daily goal: {stepGoal.toLocaleString()} steps
        </Text>
        <Text style={styles.progressText}>{progressPercentage}%</Text>
      </View>

      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progressPercentage}%` as any }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111C18",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(61,220,132,0.25)",
    padding: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    color: Colors.primary,
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1.2,
  },
  streak: {
    color: Colors.primary,
    backgroundColor: "rgba(61,220,132,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 11,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  value: {
    color: Colors.text,
    fontWeight: "900",
    fontSize: 15,
  },
  label: {
    color: Colors.muted,
    fontSize: 10,
    marginTop: 4,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 8,
  },
  progressText: {
    color: Colors.muted,
    fontSize: 11,
  },
  progressBg: {
    height: 6,
    borderRadius: 8,
    backgroundColor: "#263037",
  },
  progressFill: {
    height: "100%",
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
});