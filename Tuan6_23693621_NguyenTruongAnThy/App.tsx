// import React from "react";
// import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
// import { PHONES } from "./src/data/phones";
// import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
// import { BottomTabApp } from "./src/ex3/BottomTabApp";
// import { StackTabApp } from "./src/ex4/StackTabApp";
// import { DrawerApp } from "./src/ex5/DrawerApp";


// export default function App() {
//   // return <SelectPhoneApp phone={PHONES[0]} />;
//   // return <SelectPhoneApi />;
//   // return <BottomTabApp />;
//   // return <StackTabApp />;
//   return <DrawerApp />;
// }

import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";
import { PHONES } from "./src/data/phones";
import { colors } from "./src/theme";

type ScreenKey = "menu" | "ex1" | "ex2" | "ex3" | "ex4" | "ex5";

const TITLES: Record<Exclude<ScreenKey, "menu">, string> = {
  ex1: "Bài 1: Select Phone",
  ex2: "Bài 2: Select Phone + API",
  ex3: "Bài 3: Bottom Tab",
  ex4: "Bài 4: Stack + Tab",
  ex5: "Bài 5: Drawer",
};

const ITEMS: { key: Exclude<ScreenKey, "menu">; label: string; desc: string }[] = [
  { key: "ex1", label: "Bài 1: Select Phone", desc: "Stack, chọn màu, truyền params" },
  { key: "ex2", label: "Bài 2: Select Phone + API", desc: "mockapi.io, loading / lỗi / thử lại" },
  { key: "ex3", label: "Bài 3: Bottom Tab", desc: "Home / Search / Profile" },
  { key: "ex4", label: "Bài 4: Stack + Tab", desc: "Products / Favorites, chi tiết theo id" },
  { key: "ex5", label: "Bài 5: Drawer", desc: "Home / Profile / Settings, chế độ tối" },
];

export default function App() {
  const [selected, setSelected] = useState<ScreenKey>("menu");

  return (
    <SafeAreaProvider>
      {selected === "menu" ? (
        <SafeAreaView style={s.menuRoot}>
          <Text style={s.menuTitle}>Lab 06 - Navigation</Text>
          <Text style={s.menuSub}>Chọn 1 bài để chạy</Text>
          {ITEMS.map((item) => (
            <Pressable key={item.key} style={s.menuBtn} onPress={() => setSelected(item.key)}>
              <Text style={s.menuBtnText}>{item.label}</Text>
              <Text style={s.menuBtnDesc}>{item.desc}</Text>
            </Pressable>
          ))}
        </SafeAreaView>
      ) : (
        // Chỗ sửa chính là đây: SafeAreaView chỉ lấy cạnh top, để thanh quay lại nằm dưới tai thỏ
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top"]}>
          <View style={s.backBar}>
            <Pressable onPress={() => setSelected("menu")}>
              <Text style={s.backText}>← Menu</Text>
            </Pressable>
            <Text style={s.backTitle}>{TITLES[selected]}</Text>
          </View>
          <View style={{ flex: 1 }}>
            {selected === "ex1" && <SelectPhoneApp phone={PHONES[0]} />}
            {selected === "ex2" && <SelectPhoneApi />}
            {selected === "ex3" && <BottomTabApp />}
            {selected === "ex4" && <StackTabApp />}
            {selected === "ex5" && <DrawerApp />}
          </View>
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  menuRoot: { flex: 1, backgroundColor: "#fff", padding: 16 },
  menuTitle: { fontSize: 22, fontWeight: "bold", color: colors.text, marginBottom: 4 },
  menuSub: { color: colors.muted, marginBottom: 16 },
  menuBtn: { backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.line, borderRadius: 8, padding: 14, marginBottom: 10 },
  menuBtnText: { fontWeight: "bold", color: colors.text, marginBottom: 2 },
  menuBtnDesc: { color: colors.muted },
  backBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderColor: colors.line },
  backText: { color: colors.blue, fontWeight: "bold", marginRight: 12 },
  backTitle: { fontWeight: "bold", color: colors.text },
});
