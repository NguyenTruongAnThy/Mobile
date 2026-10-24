import React, { useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES } from "../data/phones";
import { colors } from "../theme";

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

// tên icon: [khi chọn, khi không chọn]
const ICONS: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function HomeTab() {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <View style={s.card}><Text>{item.name.split(" - ")[0]}</Text></View>
      )}
    />
  );
}

// TODO 1: SearchTab
function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const filtered = PHONES.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa"
        style={s.input}
      />
      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <View style={s.card}><Text>{item.name.split(" - ")[0]}</Text></View>
        )}
        ListEmptyComponent={
          <Text style={s.empty}>Không có kết quả cho “{keyword}”</Text>
        }
      />
    </View>
  );
}

// TODO 2: ProfileTab
function ProfileTab() {
  return (
    <View style={s.center}>
      <View style={s.avatar}><Text style={s.avatarText}>N</Text></View>
      <Text style={s.name}>Nguyễn Trương An Thy</Text>
      <Text style={s.email}>nguyentruonganthy2501@gmail.com</Text>
    </View>
  );
}

// TODO 3: BottomTabApp
export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.red,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} options={{ title: "Trang chủ" }} />
        <Tab.Screen name="Search" component={SearchTab} options={{ title: "Tìm kiếm" }} />
        <Tab.Screen name="Profile" component={ProfileTab} options={{ title: "Cá nhân" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: colors.line },
  input: { borderWidth: 1, borderColor: colors.line, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: "#fff", marginBottom: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.blue, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  name: { fontSize: 20, fontWeight: "bold", color: colors.text, marginBottom: 4 },
  email: { color: colors.muted },
  empty: { textAlign: "center", color: colors.muted, marginTop: 20 },
});
