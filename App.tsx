import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DrawingBoard from "./src";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as React from "react";
 
export default function App() {
  return (
      <SafeAreaProvider style={styles.container}>
        <GestureHandlerRootView style={{ flex: 1, height: "100%" }}>
          <DrawingBoard />
        </GestureHandlerRootView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
