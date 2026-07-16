import { Colors } from "@/constants/colors";
import { login } from "@/services/auth.service";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { saveAuth } from "@/services/token.service";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync("remembered_email").then((savedEmail) => {
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    });
  }, []);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing info", "Please enter email and password.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await login(email, password);

      await saveAuth({
        userId: result.userId,
        fullName: result.fullName,
        email: result.email,
        token: result.token,
      });

      if (rememberMe) {
        await SecureStore.setItemAsync("remembered_email", email);
      } else {
        await SecureStore.deleteItemAsync("remembered_email");
      }

      console.log("Login success:", result);

      Alert.alert("Success", "Logged in successfully.");

      router.replace("/home");

    } catch (error: any) {
      console.log("Login error:", error.response?.data || error.message);

      Alert.alert(
        "Login failed",
        error.response?.data?.message || "Could not login."
      );
    } finally {
      setIsLoading(false);
    }
  }

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
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={22} color={Colors.muted} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#657083"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <Ionicons name="eye-outline" size={22} color={Colors.muted} />
      </View>

      <View style={styles.row}>
        <TouchableOpacity 
          style={styles.rememberBtn}
          onPress={() => setRememberMe(!rememberMe)}
          activeOpacity={0.7}
        >
          <Text style={styles.remember}>{rememberMe ? "●" : "○"}  Remember me</Text>
        </TouchableOpacity>
        <Text style={styles.forgot}>Forgot password?</Text>
      </View>

      <TouchableOpacity
        style={[styles.signInButton, isLoading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#06110B" />
        ) : (
          <Text style={styles.signInText}>SIGN IN</Text>
        )}
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
    alignItems: "center",
    marginBottom: 20,
  },

  rememberBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingRight: 8,
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

  disabledButton: {
   opacity: 0.7,
  },
});