import React, { useMemo, useState } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, {
  Defs,
  Line,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from "react-native-svg";

import { RunResponse } from "@/services/run.service";
import { ProgressPeriod } from "./ProgressTabs";

type Props = {
  runs: RunResponse[];
  period: ProgressPeriod;
};

const CHART_HEIGHT = 135;
const LEFT_PADDING = 28;
const RIGHT_PADDING = 6;
const TOP_PADDING = 8;
const BOTTOM_PADDING = 26;

const weekLabels = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export default function DistanceTrend({
  runs,
  period,
}: Props) {
  const [chartWidth, setChartWidth] = useState(0);

  const chartData = useMemo(() => {
    if (period === "week") {
      return {
        values: buildWeeklyDistance(runs),
        labels: weekLabels,
      };
    }

    return {
      values: buildMonthlyDistance(runs),
      labels: ["W1", "W2", "W3", "W4", "W5"],
    };
  }, [runs, period]);

  const chart = useMemo(() => {
    if (chartWidth <= 0) {
      return null;
    }

    return createChartData(chartData.values, chartWidth);
  }, [chartData.values, chartWidth]);

  function handleLayout(event: LayoutChangeEvent) {
    setChartWidth(event.nativeEvent.layout.width);
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>DISTANCE TREND</Text>

      <View
        style={styles.chartContainer}
        onLayout={handleLayout}
      >
        {chart && (
          <Svg width={chartWidth} height={CHART_HEIGHT}>
            <Defs>
              <LinearGradient
                id="progressDistanceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <Stop
                  offset="0"
                  stopColor="#34E083"
                  stopOpacity={0.25}
                />

                <Stop
                  offset="1"
                  stopColor="#34E083"
                  stopOpacity={0}
                />
              </LinearGradient>
            </Defs>

            {chart.yTicks.map((tick) => (
              <React.Fragment key={`y-${tick.value}`}>
                <Line
                  x1={LEFT_PADDING}
                  y1={tick.y}
                  x2={chartWidth - RIGHT_PADDING}
                  y2={tick.y}
                  stroke="#26313A"
                  strokeWidth={1}
                  strokeDasharray="3 4"
                />

                <SvgText
                  x={0}
                  y={tick.y + 3}
                  fill="#9AA4B2"
                  fontSize={9}
                >
                  {formatChartValue(tick.value)}
                </SvgText>
              </React.Fragment>
            ))}

            {chart.points.map((point, index) => (
              <Line
                key={`vertical-${index}`}
                x1={point.x}
                y1={TOP_PADDING}
                x2={point.x}
                y2={CHART_HEIGHT - BOTTOM_PADDING}
                stroke="#20282E"
                strokeWidth={1}
                strokeDasharray="3 5"
              />
            ))}

            <Path
              d={chart.areaPath}
              fill="url(#progressDistanceGradient)"
            />

            <Path
              d={chart.linePath}
              fill="none"
              stroke="#34E083"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {chart.points.map((point, index) => (
              <SvgText
                key={`label-${index}`}
                x={point.x}
                y={CHART_HEIGHT - 5}
                fill="#D2D8DF"
                fontSize={9}
                textAnchor="middle"
              >
                {chartData.labels[index]}
              </SvgText>
            ))}
          </Svg>
        )}
      </View>
    </View>
  );
}

function buildWeeklyDistance(runs: RunResponse[]): number[] {
  const values = [0, 0, 0, 0, 0, 0, 0];

  runs.forEach((run) => {
    const runDate = new Date(run.startTime);

    if (Number.isNaN(runDate.getTime())) {
      return;
    }

    const javascriptDay = runDate.getDay();
    const mondayBasedIndex =
      javascriptDay === 0 ? 6 : javascriptDay - 1;

    values[mondayBasedIndex] +=
      Math.max(run.distanceMeters, 0) / 1000;
  });

  return values;
}

function buildMonthlyDistance(runs: RunResponse[]): number[] {
  const values = [0, 0, 0, 0, 0];

  runs.forEach((run) => {
    const runDate = new Date(run.startTime);

    if (Number.isNaN(runDate.getTime())) {
      return;
    }

    const dayOfMonth = runDate.getDate();

    // Days 1–7 = W1, 8–14 = W2, and so on.
    const weekIndex = Math.min(
      Math.floor((dayOfMonth - 1) / 7),
      4,
    );

    values[weekIndex] +=
      Math.max(run.distanceMeters, 0) / 1000;
  });

  return values;
}

function createChartData(
  values: number[],
  width: number,
) {
  const graphWidth =
    width - LEFT_PADDING - RIGHT_PADDING;

  const graphHeight =
    CHART_HEIGHT - TOP_PADDING - BOTTOM_PADDING;

  const rawMaximum = Math.max(...values, 1);
  const yMaximum = getRoundedMaximum(rawMaximum);

  const points = values.map((value, index) => {
    const x =
      values.length === 1
        ? LEFT_PADDING + graphWidth / 2
        : LEFT_PADDING +
          (index / (values.length - 1)) * graphWidth;

    const y =
      TOP_PADDING +
      graphHeight -
      (Math.max(value, 0) / yMaximum) *
        graphHeight;

    return {
      x,
      y,
      value,
    };
  });

  const linePath = createSmoothPath(points);
  const bottomY = CHART_HEIGHT - BOTTOM_PADDING;

  const areaPath = [
    linePath,
    `L ${points[points.length - 1].x} ${bottomY}`,
    `L ${points[0].x} ${bottomY}`,
    "Z",
  ].join(" ");

  const yTicks = [0, yMaximum / 2, yMaximum].map(
    (value) => ({
      value,
      y:
        TOP_PADDING +
        graphHeight -
        (value / yMaximum) * graphHeight,
    }),
  );

  return {
    points,
    linePath,
    areaPath,
    yTicks,
  };
}

function createSmoothPath(
  points: Array<{ x: number; y: number }>,
): string {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (
    let index = 0;
    index < points.length - 1;
    index++
  ) {
    const current = points[index];
    const next = points[index + 1];
    const controlX = (current.x + next.x) / 2;

    path +=
      ` C ${controlX} ${current.y},` +
      ` ${controlX} ${next.y},` +
      ` ${next.x} ${next.y}`;
  }

  return path;
}

function getRoundedMaximum(value: number): number {
  if (value <= 5) return 5;
  if (value <= 10) return 10;
  if (value <= 15) return 15;
  if (value <= 20) return 20;
  if (value <= 50) return Math.ceil(value / 10) * 10;

  return Math.ceil(value / 25) * 25;
}

function formatChartValue(value: number): string {
  return Number.isInteger(value)
    ? value.toString()
    : value.toFixed(1);
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#171E24",
    borderRadius: 16,
    padding: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 14,
  },
  chartContainer: {
    width: "100%",
    height: CHART_HEIGHT,
  },
});