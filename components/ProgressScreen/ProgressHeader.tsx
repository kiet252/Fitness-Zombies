import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProgressHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Your fitness journey</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
  },
  subtitle: {
    color: "#aab3bd",
    fontSize: 13,
    marginTop: 2,
  },
});