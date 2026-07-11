import { StyleSheet, Text, View } from "react-native";

type Props = {
  weeklyDistance?: number[];
};

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CHART_HEIGHT = 72;

export default function WeeklyDistanceCard({
  weeklyDistance = [],
}: Props) {
  const data = normalizeWeeklyDistance(weeklyDistance);

  const rawMax = Math.max(...data, 1);
  const yMax = getRoundedMaximum(rawMax);
  const middleValue = yMax / 2;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>WEEKLY DISTANCE</Text>

      <View style={styles.chartRow}>
        <View style={styles.yLabels}>
          <Text style={styles.yText}>{formatYAxisValue(yMax)}</Text>

          <Text style={styles.yText}>
            {formatYAxisValue(middleValue)}
          </Text>

          <Text style={styles.yText}>0</Text>
        </View>

        <View style={styles.bars}>
          {data.map((distanceKm, index) => {
            const barHeight =
              distanceKm <= 0
                ? 0
                : Math.max((distanceKm / yMax) * CHART_HEIGHT, 4);

            return (
              <View key={dayLabels[index]} style={styles.barItem}>
                <View style={styles.barArea}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                      },
                    ]}
                  />
                </View>

                <Text style={styles.day}>{dayLabels[index]}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function normalizeWeeklyDistance(data: number[]): number[] {
  return Array.from({ length: 7 }, (_, index) => {
    const value = data[index];

    return typeof value === "number" && Number.isFinite(value)
      ? Math.max(value, 0)
      : 0;
  });
}

function getRoundedMaximum(value: number): number {
  if (value <= 5) return 5;
  if (value <= 10) return 10;
  if (value <= 15) return 15;
  if (value <= 20) return 20;

  return Math.ceil(value / 10) * 10;
}

function formatYAxisValue(value: number): string {
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#171C22",
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  title: {
    color: "#F5F7FA",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginBottom: 16,
  },
  chartRow: {
    flexDirection: "row",
    height: 110,
  },
  yLabels: {
    width: 28,
    height: CHART_HEIGHT,
    justifyContent: "space-between",
  },
  yText: {
    color: "#9AA4B2",
    fontSize: 10,
  },
  bars: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  barItem: {
    flex: 1,
    alignItems: "center",
  },
  barArea: {
    height: CHART_HEIGHT,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bar: {
    width: 26,
    borderRadius: 5,
    backgroundColor: "#39E58C",
  },
  day: {
    color: "#C7CED8",
    fontSize: 10,
    marginTop: 8,
  },
});