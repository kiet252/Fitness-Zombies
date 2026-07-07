import { Colors } from "@/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

const LOADING_TIME = 4500; // change this, example: 3000 = 3 seconds

export default function SplashScreen() {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const listener = progressAnim.addListener(({ value }) => {
      setProgress(Math.round(value));
    });

    Animated.timing(progressAnim, {
     toValue: 100,
     duration: LOADING_TIME,
     easing: Easing.out(Easing.ease),
     useNativeDriver: false,
     }).start(({ finished }) => {
     if (finished) {
         router.replace("/login");
     }
    });

    return () => {
      progressAnim.removeListener(listener);
    };
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <LinearGradient
      colors={["#080D11", "#101418", "#07180F"]}
      style={styles.container}
    >
      <View style={styles.logoBox}>
        <MaterialCommunityIcons
          name="pulse"
          size={58}
          color={Colors.primary}
        />

        <View style={styles.boltBadge}>
          <Ionicons name="flash" size={20} color="#fff" />
        </View>
      </View>

      <View style={styles.titleWrapper}>
        <Text style={styles.titleGreen}>ZOMBIE</Text>
        <Text style={styles.titleWhite}>RUNNER</Text>
      </View>

      <View style={styles.subtitleRow}>
        <View style={styles.line} />
        <Text style={styles.subtitle}>RUN TO SURVIVE</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.loadingArea}>
        <View style={styles.loadingTextRow}>
          <Text style={styles.loadingText}>Initializing GPS...</Text>
          <Text style={styles.loadingPercent}>{progress}%</Text>
        </View>

        <View style={styles.progressTrack}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressWidth,
              },
            ]}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  logoBox: {
    width: 112,
    height: 112,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(61, 220, 132, 0.55)",
    backgroundColor: "rgba(18, 31, 25, 0.75)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
    marginBottom: 28,
  },

  boltBadge: {
    position: "absolute",
    right: -8,
    bottom: 10,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.danger,
    alignItems: "center",
    justifyContent: "center",
  },

  titleWrapper: {
    alignItems: "center",
  },

  titleGreen: {
    fontSize: 40,
    fontWeight: "900",
    color: Colors.primary,
    letterSpacing: 1,
    textShadowColor: "rgba(61, 220, 132, 0.75)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },

  titleWhite: {
    fontSize: 40,
    fontWeight: "900",
    color: Colors.text,
    letterSpacing: 1,
    marginTop: 2,
  },

  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 26,
    gap: 14,
  },

  subtitle: {
    color: Colors.text,
    fontSize: 11,
    letterSpacing: 6,
  },

  line: {
    width: 50,
    height: 1,
    backgroundColor: "rgba(61, 220, 132, 0.5)",
  },

  loadingArea: {
    position: "absolute",
    left: 40,
    right: 40,
    bottom: 58,
  },

  loadingTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  loadingText: {
    color: Colors.text,
    fontSize: 12,
  },

  loadingPercent: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "700",
  },

  progressTrack: {
    width: "100%",
    height: 6,
    borderRadius: 999,
    backgroundColor: "#1D2630",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },
});