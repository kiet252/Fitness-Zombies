import { Colors } from "@/constants/colors";
import { register } from "@/services/auth.service";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    if (
        !fullName.trim() ||
        !email.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
    ) {
        Alert.alert("Missing information", "Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        Alert.alert("Password mismatch", "Passwords do not match.");
        return;
    }

    try {
        setIsLoading(true);

        const result = await register({
        fullName,
        email,
        password,
        });

        console.log("Register success:", result);

        Alert.alert(
        "Success",
        "Account created successfully.",
        [
            {
            text: "OK",
            onPress: () => router.replace("/login"),
            },
        ]
        );
    } catch (error: any) {
        console.log(error);

        Alert.alert(
        "Registration Failed",
        error.response?.data?.message ||
            error.message ||
            "Could not create account."
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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join thousands of runners</Text>
        </View>
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="person-outline" size={20} color={Colors.muted} />
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#657083"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="mail-outline" size={20} color={Colors.muted} />
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#657083"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color={Colors.muted} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#657083"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <Ionicons name="eye-outline" size={20} color={Colors.muted} />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color={Colors.muted} />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#657083"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Ionicons name="eye-outline" size={20} color={Colors.muted} />
      </View>

      <TouchableOpacity
        style={[styles.createButton, isLoading && styles.disabledButton]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#06110B" />
        ) : (
          <Text style={styles.createText}>CREATE ACCOUNT</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already a runner? </Text>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 18,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1A1F24",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "900",
  },

  subtitle: {
    color: Colors.muted,
    fontSize: 12,
    marginTop: 2,
  },

  inputBox: {
    height: 50,
    borderRadius: 14,
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

  createButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: Colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },

  createText: {
    color: "#06110B",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  footer: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
  },

  footerText: {
    color: Colors.muted,
    fontSize: 13,
  },

  signInText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "800",
  },

  disabledButton: {
   opacity: 0.7,
  },
});