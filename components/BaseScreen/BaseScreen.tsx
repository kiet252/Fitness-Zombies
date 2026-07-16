import { Colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BaseScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons
            name="home-city-outline"
            size={48}
            color={Colors.primary}
          />
        </View>

        <Text style={styles.title}>Base Camp</Text>
        <Text style={styles.subtitle}>Coming Soon</Text>

        <View style={styles.divider} />

        <Text style={styles.description}>
          Survive Zombie Runs to collect resources and build your survival base.
          Upgrade defenses, unlock gear, and prepare for the apocalypse.
        </Text>

        <View style={styles.badge}>
          <MaterialCommunityIcons name="lock-outline" size={12} color={Colors.muted} />
          <Text style={styles.badgeText}>Unlocks in a future update</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0D1216",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  iconWrapper: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(61,220,132,0.10)",
    borderWidth: 1,
    borderColor: "rgba(61,220,132,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    color: Colors.text,
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  divider: {
    width: 40,
    height: 2,
    borderRadius: 1,
    backgroundColor: "rgba(61,220,132,0.25)",
    marginVertical: 20,
  },
  description: {
    color: Colors.muted,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 28,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#131B22",
    borderWidth: 1,
    borderColor: "#1E2A34",
  },
  badgeText: {
    color: Colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
});
