import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList, TabParamList } from "./types";
import { FavoritesProvider } from "./FavoritesContext";
import { ProductsTab } from "./ProductsTab";
import { FavoritesTab } from "./FavoritesTab";
import { ProductDetailsScreen } from "./ProductDetailsScreen";
import { colors } from "../theme";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// TODO 1: HomeTabs là Tab Navigator với 2 tab
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={route.name === "Products" ? (focused ? "list" : "list-outline") : (focused ? "heart" : "heart-outline")}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Products" component={ProductsTab} options={{ title: "Sản phẩm" }} />
      <Tab.Screen name="Favorites" component={FavoritesTab} options={{ title: "Yêu thích" }} />
    </Tab.Navigator>
  );
}

// TODO 2: StackTabApp, FavoritesProvider phải bọc ngoài NavigationContainer
export function StackTabApp() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeTabs} options={{ title: "Cửa hàng" }} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: "Chi tiết sản phẩm" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
