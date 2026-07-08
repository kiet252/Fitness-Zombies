import { Colors } from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function RunModeCard({ title, subtitle, icon, danger = false }: any) {
  return (
    <TouchableOpacity style={[styles.modeCard, danger && styles.dangerCard]}>
      <View style={[styles.iconBox, danger && styles.dangerIcon]}>
        <MaterialCommunityIcons
          name={icon}
          size={27}
          color={danger ? "#FF4D57" : Colors.primary}
        />
      </View>
      <Text style={styles.modeTitle}>{title}</Text>
      <Text style={styles.modeSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

export default function StartRunningSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>START RUNNING</Text>

      <View style={styles.row}>
        <RunModeCard
          title="Normal Run"
          subtitle="Free pace tracking"
          icon="pulse"
        />

        <RunModeCard
          title="Zombie Challenge"
          subtitle="Interval training"
          icon="lightning-bolt-outline"
          danger
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  modeCard: {
    flex: 1,
    height: 126,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(61,220,132,0.3)",
    backgroundColor: "#171C22",
    padding: 16,
    justifyContent: "center",
  },
  dangerCard: {
    borderColor: "rgba(255,77,87,0.35)",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "rgba(61,220,132,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  dangerIcon: {
    backgroundColor: "rgba(255,77,87,0.15)",
  },
  modeTitle: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "900",
  },
  modeSubtitle: {
    color: Colors.muted,
    fontSize: 11,
    marginTop: 4,
  },
});