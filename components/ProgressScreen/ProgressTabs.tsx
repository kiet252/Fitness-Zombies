import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export type ProgressPeriod = "week" | "month";

type Props = {
  period: ProgressPeriod;
  onPeriodChange: (period: ProgressPeriod) => void;
};

export default function ProgressTabs({
  period,
  onPeriodChange,
}: Props) {
  return (
    <View style={styles.tabs}>
      <Pressable
        onPress={() => onPeriodChange("week")}
        style={[
          styles.tab,
          period === "week" && styles.activeTab,
        ]}
      >
        <Text
          style={[
            styles.tabText,
            period === "week" && styles.activeTabText,
          ]}
        >
          This Week
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onPeriodChange("month")}
        style={[
          styles.tab,
          period === "month" && styles.activeTab,
        ]}
      >
        <Text
          style={[
            styles.tabText,
            period === "month" && styles.activeTabText,
          ]}
        >
          This Month
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    marginBottom: 18,
    gap: 8,
  },
  tab: {
    backgroundColor: "#171E24",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  activeTab: {
    backgroundColor: "#37E887",
  },
  tabText: {
    color: "#D1D7DE",
    fontWeight: "800",
    fontSize: 13,
  },
  activeTabText: {
    color: "#06120C",
    fontWeight: "900",
  },
});