import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  fullName?: string;
};

export default function HomeHeader({ fullName = "Alex" }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.date}>MONDAY, JUL 6</Text>
        <Text style={styles.greeting}>Good Morning, {fullName} 👋</Text>
      </View>

      <TouchableOpacity style={styles.bell}>
        <Ionicons name="notifications-outline" size={22} color={Colors.text} />
        <View style={styles.dot} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  greeting: {
    color: Colors.text,
    fontSize: 23,
    fontWeight: "900",
  },
  bell: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1A1F24",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4D57",
  },
});