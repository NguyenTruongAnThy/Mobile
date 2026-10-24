import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme";

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Không tải được dữ liệu</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.btn} onPress={onRetry}>
        <Text style={styles.btnText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 16, fontWeight: "bold", color: colors.text },
  message: { marginVertical: 12, color: colors.muted, textAlign: "center" },
  btn: { backgroundColor: colors.blue, borderRadius: 4, paddingVertical: 12, paddingHorizontal: 24 },
  btnText: { color: "#fff", fontWeight: "bold" },
});
