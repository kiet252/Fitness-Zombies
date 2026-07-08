import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HistoryFilterTabs() {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={[styles.tab, styles.active]}>
        <Text style={styles.activeText}>Week</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <Text style={styles.text}>Month</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <Text style={styles.text}>All</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: "#171C22",
  },
  active: {
    backgroundColor: "#39E58C",
  },
  text: {
    color: "#9AA4B2",
    fontSize: 12,
    fontWeight: "800",
  },
  activeText: {
    color: "#06110B",
    fontSize: 12,
    fontWeight: "900",
  },
});