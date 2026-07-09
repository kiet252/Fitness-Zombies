import React from "react";
import { StyleSheet, Text, View } from "react-native";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DistanceTrend() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>DISTANCE TREND</Text>

      <View style={styles.chart}>
        <View style={[styles.gridLine, { top: 22 }]} />
        <View style={[styles.gridLine, { top: 58 }]} />
        <View style={[styles.gridLine, { top: 94 }]} />

        <View style={[styles.line, styles.lineOne]} />
        <View style={[styles.line, styles.lineTwo]} />
        <View style={[styles.line, styles.lineThree]} />
        <View style={[styles.line, styles.lineFour]} />
        <View style={[styles.line, styles.lineFive]} />
        <View style={[styles.line, styles.lineSix]} />

        <View style={styles.days}>
          {days.map((day) => (
            <Text key={day} style={styles.day}>
              {day}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#171e24",
    borderRadius: 16,
    padding: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 14,
  },
  chart: {
    height: 110,
    position: "relative",
  },
  gridLine: {
    position: "absolute",
    left: 28,
    right: 0,
    borderTopWidth: 1,
    borderColor: "#26313a",
    borderStyle: "dashed",
  },
  line: {
    position: "absolute",
    height: 3,
    backgroundColor: "#34e083",
    borderRadius: 99,
  },
  lineOne: {
    width: 58,
    left: 32,
    top: 54,
    transform: [{ rotate: "-16deg" }],
  },
  lineTwo: {
    width: 64,
    left: 82,
    top: 72,
    transform: [{ rotate: "48deg" }],
  },
  lineThree: {
    width: 66,
    left: 135,
    top: 72,
    transform: [{ rotate: "-38deg" }],
  },
  lineFour: {
    width: 60,
    left: 194,
    top: 48,
    transform: [{ rotate: "-20deg" }],
  },
  lineFive: {
    width: 58,
    left: 246,
    top: 36,
    transform: [{ rotate: "-10deg" }],
  },
  lineSix: {
    width: 58,
    left: 292,
    top: 55,
    transform: [{ rotate: "42deg" }],
  },
  days: {
    position: "absolute",
    bottom: 0,
    left: 22,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  day: {
    color: "#d2d8df",
    fontSize: 10,
  },
});