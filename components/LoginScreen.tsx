import { Colors } from "@/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function LoginScreen() {
  return (
    <LinearGradient
      colors={["#080D11", "#101418", "#07180F"]}
      style={styles.container}
    >
      <View style={styles.logoBox}>
        <MaterialCommunityIcons name="pulse" size={34} color={Colors.primary} />
      </View>

      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Sign in to continue your journey</Text>

      <View style={styles.inputBox}>
        <Ionicons name="mail-outline" size={22} color={Colors.muted} />
        <TextInput
          placeholder="Email address"
          placeholderTextColor="#657083"
          style={styles.input}
        />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={22} color={Colors.muted} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#657083"
          secureTextEntry
          style={styles.input}
        />
        <Ionicons name="eye-outline" size={22} color={Colors.muted} />
      </View>

      <View style={styles.row}>
        <Text style={styles.remember}>○  Remember me</Text>
        <Text style={styles.forgot}>Forgot password?</Text>
      </View>

      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText}>SIGN IN</Text>
      </TouchableOpacity>

      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.or}>or</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push("/register")}
        >
        <Text style={styles.createText}>CREATE ACCOUNT</Text>
       </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 21,
    justifyContent: "center",
  },

  logoBox: {
    width: 58,
    height: 58,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(61, 220, 132, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 70,
  },

  title: {
    color: Colors.text,
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 8,
  },

  subtitle: {
    color: Colors.muted,
    fontSize: 14,
    marginBottom: 28,
  },

  inputBox: {
    height: 50,
    borderRadius: 16,
    backgroundColor: "#1A1F24",
    borderWidth: 1,
    borderColor: "#2A323A",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 14,
    gap: 12,
  },

  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  remember: {
    color: Colors.text,
    fontSize: 12,
  },

  forgot: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "700",
  },

  signInButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },

  signInText: {
    color: "#06110B",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 2,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#222B32",
  },

  or: {
    color: "#66707A",
    fontSize: 12,
  },

  createButton: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(61, 220, 132, 0.45)",
    alignItems: "center",
    justifyContent: "center",
  },

  createText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 2,
  },
});