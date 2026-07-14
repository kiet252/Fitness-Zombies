import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type HistoryFilter =
  | "week"
  | "month"
  | "all";

type Props = {
  selectedFilter: HistoryFilter;
  onFilterChange: (
    filter: HistoryFilter,
  ) => void;
};

export default function HistoryFilterTabs({
  selectedFilter,
  onFilterChange,
}: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.tab,
          selectedFilter === "week" && styles.active,
        ]}
        onPress={() => onFilterChange("week")}
      >
        <Text
          style={
            selectedFilter === "week"
              ? styles.activeText
              : styles.text
          }
        >
          Week
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.tab,
          selectedFilter === "month" && styles.active,
        ]}
        onPress={() => onFilterChange("month")}
      >
        <Text
          style={
            selectedFilter === "month"
              ? styles.activeText
              : styles.text
          }
        >
          Month
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.tab,
          selectedFilter === "all" && styles.active,
        ]}
        onPress={() => onFilterChange("all")}
      >
        <Text
          style={
            selectedFilter === "all"
              ? styles.activeText
              : styles.text
          }
        >
          All
        </Text>
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