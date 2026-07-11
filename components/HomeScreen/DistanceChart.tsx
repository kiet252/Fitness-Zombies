import { Colors } from "@/constants/colors";
import { useMemo, useState } from "react";
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

type Props = {
  weeklyDistance?: number[];
};

const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CHART_HEIGHT = 110;
const LEFT_PADDING = 28;
const RIGHT_PADDING = 4;
const TOP_PADDING = 8;
const BOTTOM_PADDING = 24;

export default function DistanceChart({
  weeklyDistance = [],
}: Props) {
  const [chartWidth, setChartWidth] = useState(0);

  const data =
    weeklyDistance.length === 7
      ? weeklyDistance
      : normalizeData(weeklyDistance, 7);

  const chart = useMemo(() => {
    if (chartWidth <= 0 || data.length === 0) {
      return null;
    }

    return createChartData(data, chartWidth);
  }, [chartWidth, data]);

  function handleLayout(event: LayoutChangeEvent) {
    setChartWidth(event.nativeEvent.layout.width);
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Distance</Text>
      </View>

      <View style={styles.chartContainer} onLayout={handleLayout}>
        {chart && (
          <Svg width={chartWidth} height={CHART_HEIGHT}>
            <Defs>
              <LinearGradient
                id="distanceAreaGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <Stop
                  offset="0"
                  stopColor={Colors.primary}
                  stopOpacity={0.25}
                />

                <Stop
                  offset="1"
                  stopColor={Colors.primary}
                  stopOpacity={0}
                />
              </LinearGradient>
            </Defs>

            {chart.yTicks.map((tick) => (
              <Line
                key={`horizontal-${tick.value}`}
                x1={LEFT_PADDING}
                y1={tick.y}
                x2={chartWidth - RIGHT_PADDING}
                y2={tick.y}
                stroke="#263037"
                strokeWidth={1}
                strokeDasharray="3 4"
              />
            ))}

            {chart.xPoints.map((point, index) => (
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
              fill="url(#distanceAreaGradient)"
            />

            <Path
              d={chart.linePath}
              fill="none"
              stroke={Colors.primary}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {chart.yTicks.map((tick) => (
              <SvgText
                key={`label-${tick.value}`}
                x={0}
                y={tick.y + 3}
                fill={Colors.muted}
                fontSize={9}
              >
                {tick.value}
              </SvgText>
            ))}

            {chart.xPoints.map((point, index) => (
              <SvgText
                key={`day-${index}`}
                x={point.x}
                y={CHART_HEIGHT - 4}
                fill={Colors.muted}
                fontSize={9}
                textAnchor="middle"
              >
                {weekLabels[index]}
              </SvgText>
            ))}
          </Svg>
        )}
      </View>
    </View>
  );
}

function createChartData(data: number[], width: number) {
  const graphWidth = width - LEFT_PADDING - RIGHT_PADDING;
  const graphHeight =
    CHART_HEIGHT - TOP_PADDING - BOTTOM_PADDING;

  const rawMax = Math.max(...data, 1);
  const yMax = getRoundedMaximum(rawMax);

  const xPoints = data.map((value, index) => {
    const x =
      data.length === 1
        ? LEFT_PADDING + graphWidth / 2
        : LEFT_PADDING +
          (index / (data.length - 1)) * graphWidth;

    const y =
      TOP_PADDING +
      graphHeight -
      (Math.max(value, 0) / yMax) * graphHeight;

    return {
      x,
      y,
      value,
    };
  });

  const linePath = createSmoothPath(xPoints);

  const bottomY = CHART_HEIGHT - BOTTOM_PADDING;

  const areaPath = [
    linePath,
    `L ${xPoints[xPoints.length - 1].x} ${bottomY}`,
    `L ${xPoints[0].x} ${bottomY}`,
    "Z",
  ].join(" ");

  const yTicks = [0, yMax / 2, yMax].map((value) => ({
    value: Number.isInteger(value)
      ? value
      : Number(value.toFixed(1)),
    y:
      TOP_PADDING +
      graphHeight -
      (value / yMax) * graphHeight,
  }));

  return {
    xPoints,
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

    const controlPointX = (current.x + next.x) / 2;

    path +=
      ` C ${controlPointX} ${current.y},` +
      ` ${controlPointX} ${next.y},` +
      ` ${next.x} ${next.y}`;
  }

  return path;
}

function getRoundedMaximum(value: number): number {
  if (value <= 5) return 5;
  if (value <= 10) return 10;
  if (value <= 15) return 15;
  if (value <= 20) return 20;

  return Math.ceil(value / 10) * 10;
}

function normalizeData(
  data: number[],
  expectedLength: number,
): number[] {
  return Array.from(
    { length: expectedLength },
    (_, index) => {
      const value = data[index];

      return typeof value === "number" ? value : 0;
    },
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#171C22",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "900",
  },
  chartContainer: {
    width: "100%",
    height: CHART_HEIGHT,
  },
});