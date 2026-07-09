import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

export default function RootLayout() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" backgroundColor="#080D11" />


        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#080D11",
            },
            animation: "none",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="(main)" />
        </Stack>

    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#080D11" },
});
