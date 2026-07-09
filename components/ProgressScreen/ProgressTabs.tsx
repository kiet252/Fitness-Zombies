import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProgressTabs() {
  return (
    <View style={styles.tabs}>
      <View style={styles.activeTab}>
        <Text style={styles.activeTabText}>This Week</Text>
      </View>

      <View style={styles.tab}>
        <Text style={styles.tabText}>This Month</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    marginBottom: 18,
  },
  activeTab: {
    backgroundColor: "#37e887",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 999,
    marginRight: 8,
  },
  activeTabText: {
    color: "#06120c",
    fontWeight: "900",
    fontSize: 13,
  },
  tab: {
    backgroundColor: "#171e24",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  tabText: {
    color: "#d1d7de",
    fontWeight: "800",
    fontSize: 13,
  },
});