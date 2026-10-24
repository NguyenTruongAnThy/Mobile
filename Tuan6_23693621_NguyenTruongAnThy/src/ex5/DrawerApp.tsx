import React, { createContext, useContext, useState, useMemo } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

// Context chung cho cả 3 màn
type SettingsCtx = {
  notify: boolean;
  dark: boolean;
  setNotify: (v: boolean) => void;
  setDark: (v: boolean) => void;
};
const SettingsContext = createContext<SettingsCtx | null>(null);

function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings phải dùng trong SettingsProvider");
  return ctx;
}

function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  const value = useMemo(() => ({ notify, dark, setNotify, setDark }), [notify, dark]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

function HomeScreen() {
  const { dark } = useSettings();
  return (
    <View style={[s.center, { backgroundColor: dark ? "#111827" : "#fff" }]}>
      <Text style={[s.big, { color: dark ? "#fff" : colors.text }]}>Xin chào 👋</Text>
    </View>
  );
}

function ProfileScreen() {
  const { dark } = useSettings();
  return (
    <View style={[s.center, { backgroundColor: dark ? "#111827" : "#fff" }]}>
      <View style={s.avatar}><Text style={s.avatarText}>NT</Text></View>
      <Text style={[s.big, { color: dark ? "#fff" : colors.text }]}>Nguyễn Trương An Thy</Text>
      <Text style={{ color: dark ? "#9CA3AF" : colors.muted, marginTop: 4 }}>nguyentruonganthy2501@gmail.com</Text>
    </View>
  );
}

function SettingsScreen() {
  const { notify, dark, setNotify, setDark } = useSettings();

  return (
    <View style={[s.settingsRoot, { backgroundColor: dark ? "#111827" : "#fff" }]}>
      <View style={s.row}>
        <Text style={{ color: dark ? "#fff" : colors.text }}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
      <View style={s.row}>
        <Text style={{ color: dark ? "#fff" : colors.text }}>Giao diện tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={{ marginTop: 16, color: dark ? "#9CA3AF" : colors.muted }}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

export function DrawerApp() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={({ route }) => ({
            drawerActiveTintColor: colors.red,
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name={route.name === "Home" ? "home-outline" : route.name === "Profile" ? "person-outline" : "settings-outline"}
                size={size}
                color={color}
              />
            ),
          })}
        >
          <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
          <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Cá nhân" }} />
          <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  big: { fontSize: 20, fontWeight: "bold" },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.blue, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  avatarText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  settingsRoot: { flex: 1, padding: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderColor: colors.line },
});
