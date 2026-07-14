import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  type: "normal" | "challenge";
  date: string;
  distance: string;
  duration: string;
  calories: string;
  xpEarned: number;
};

export default function RunHistoryCard({
  type,
  date,
  distance,
  duration,
  calories,
  xpEarned,
}: Props) {
  const isChallenge = type === "challenge";

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.iconBox, isChallenge && styles.challengeIcon]}>
          <MaterialCommunityIcons
            name={isChallenge ? "lightning-bolt-outline" : "pulse"}
            size={24}
            color={isChallenge ? "#FF4D57" : "#39E58C"}
          />
        </View>

        <Text style={styles.date}>{date}</Text>

        <View style={[styles.badge, isChallenge && styles.challengeBadge]}>
          <Text style={[styles.badgeText, isChallenge && styles.challengeText]}>
            {isChallenge ? "CHALLENGE" : "NORMAL"}
          </Text>
        </View>

        <View style={styles.spacer} />

        <Ionicons name="chevron-forward" size={18} color="#2E3844" />
      </View>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <View>
          <Text style={styles.value}>{distance}</Text>
          <Text style={styles.label}>Distance</Text>
        </View>

        <View>
          <Text style={styles.value}>{duration}</Text>
          <Text style={styles.label}>Duration</Text>
        </View>

        <View>
          <Text style={styles.value}>{calories}</Text>
          <Text style={styles.label}>Calories</Text>
        </View>

        <View>
          <Text style={styles.xpValue}>+{xpEarned}</Text>
          <Text style={styles.label}>XP</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#171C22",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "rgba(57,229,140,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  challengeIcon: {
    backgroundColor: "rgba(255,77,87,0.13)",
  },
  date: {
    color: "#F5F7FA",
    fontSize: 14,
    fontWeight: "900",
    marginRight: 10,
  },
  badge: {
    backgroundColor: "rgba(57,229,140,0.12)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  challengeBadge: {
    backgroundColor: "rgba(255,77,87,0.13)",
  },
  badgeText: {
    color: "#39E58C",
    fontSize: 9,
    fontWeight: "900",
  },
  challengeText: {
    color: "#FF4D57",
  },
  spacer: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#252D35",
    marginVertical: 14,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  value: {
    color: "#F5F7FA",
    fontSize: 14,
    fontWeight: "900",
  },
  label: {
    color: "#9AA4B2",
    fontSize: 10,
    marginTop: 3,
  },
    xpValue: {
    color: "#FFA940",
    fontSize: 14,
    fontWeight: "900",
  },
});