import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NormalRun from "./NormalRun";
import ZombieRun from "./ZombieRun";

export default function RunScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Choose Mode</Text>
        </View>

        <NormalRun />

        <ZombieRun />

        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>☆</Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoHighlight}>Zombie Challenge</Text> awards 2× XP and builds interval
            fitness faster.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0d1216",
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#182028",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  backText: {
    color: "#d9e1e8",
    fontSize: 34,
    marginTop: -4,
  },
  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#0d241d",
    borderColor: "#164934",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  infoIcon: {
    color: "#23f28c",
    fontSize: 18,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    color: "#cdd6de",
    fontSize: 13,
    lineHeight: 19,
  },
  infoHighlight: {
    color: "#23f28c",
    fontWeight: "800",
  },
});