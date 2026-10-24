import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../theme";

export function Loading() {
  return (
    <View style={styles.root}>
      <ActivityIndicator size="large" color={colors.red} />
      <Text style={styles.text}>Đang tải...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  text: { marginTop: 12, color: colors.muted },
});
