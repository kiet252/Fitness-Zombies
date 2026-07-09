import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import FitnessLevel from "./FitnessLevel";
import Achievements from "./Achievements";
import ProfileMenu from "./ProfileMenu";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + 10 },
        ]}
      >
        <Text style={styles.screenTitle}>Profile</Text>

        <ProfileHeader />
        <ProfileStats />
        <FitnessLevel />
        <Achievements />
        <ProfileMenu />
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
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  screenTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 18,
  },
});