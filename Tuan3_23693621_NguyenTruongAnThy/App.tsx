import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { BookGrid } from "./src/components/BookGrid";
import { CategoryChips } from "./src/components/CategoryChips";
import { FloatingCartButton } from "./src/components/FloatingCartButton";
import { Header } from "./src/components/Header";

import { BOOKS } from "./data";

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <View style={styles.screen}>
      {/* Header */}
      <Header />

      {/* Nội dung có thể cuộn */}
      <ScrollView contentContainerStyle={styles.content}>
        <CategoryChips />

        <BookGrid
          books={BOOKS}
          onPressBook={(id) => console.log("Mở sách", id)}
        />
      </ScrollView>

      {/* Nút giỏ hàng nổi */}
      <FloatingCartButton
        count={cartCount}
        onPress={() => setCartCount((n) => n + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },
});
