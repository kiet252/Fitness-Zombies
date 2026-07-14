import { View, StyleSheet } from "react-native";

export default function LocationMarker() {
  return (
    <View style={styles.outer}>
      <View style={styles.middle}>
        <View style={styles.inner} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgba(61,220,132,0.18)",
  },

  middle: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: "rgba(61,220,132,0.55)",
  },

  inner: {
    width: 13,
    height: 13,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    borderRadius: 7,
    backgroundColor: "#3DDC84",
  },
});