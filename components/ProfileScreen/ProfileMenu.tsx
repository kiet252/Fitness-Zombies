import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { removeAuth } from "@/services/token.service";

export default function ProfileMenu() {
  async function handleSignOut() {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Sign Out", 
        style: "destructive",
        onPress: async () => {
          await removeAuth();
          router.replace("/login");
        }
      }
    ]);
  }

  return (
    <View>
      <MenuItem icon="◎" title="Goals" subtitle="Set weekly targets" />
      <MenuItem icon="⌁" title="Health Connect" subtitle="Sync with health apps" />
      <MenuItem icon="⚙" title="Settings" subtitle="App preferences" />
      <MenuItem icon="♢" title="Privacy & Data" subtitle="Manage your data" />
      <MenuItem icon="↪" title="Sign Out" danger onPress={handleSignOut} />
    </View>
  );
}

function MenuItem({
  icon,
  title,
  subtitle,
  danger,
  onPress,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  danger?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity 
      style={[styles.item, danger && styles.dangerItem]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={[styles.iconBox, danger && styles.dangerIconBox]}>
        <Text style={[styles.icon, danger && styles.dangerIcon]}>{icon}</Text>
      </View>

      <View style={styles.textBox}>
        <Text style={[styles.title, danger && styles.dangerText]}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {!danger && <Text style={styles.chevron}>›</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    minHeight: 68,
    backgroundColor: "#171e24",
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#252d35",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  icon: {
    color: "#c9d2dc",
    fontSize: 19,
  },
  textBox: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
  },
  subtitle: {
    color: "#c0c8d0",
    fontSize: 12,
    marginTop: 4,
  },
  chevron: {
    color: "#2d3a45",
    fontSize: 28,
  },
  dangerItem: {
    backgroundColor: "#1d1115",
    borderColor: "#6b2429",
    borderWidth: 1,
    marginTop: 8,
  },
  dangerIconBox: {
    backgroundColor: "#311419",
  },
  dangerIcon: {
    color: "#ff4d57",
  },
  dangerText: {
    color: "#ff4d57",
  },
});