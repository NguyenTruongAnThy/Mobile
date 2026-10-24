import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { PHONES } from "../data/phones";
import { useFavorites } from "./FavoritesContext";
import { TabProps } from "./types";
import { ProductRow } from "./ProductsTab";

// TODO 8: lọc PHONES theo ids, rỗng thì hiện thông báo, bấm dòng cũng mở ProductDetails
export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const favPhones = PHONES.filter((p) => ids.includes(p.id));

  if (favPhones.length === 0) {
    return (
      <View style={s.center}><Text>Chưa có sản phẩm nào được lưu.</Text></View>
    );
  }

  return (
    <FlatList
      data={favPhones}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <ProductRow phone={item} onPress={() => navigation.navigate("ProductDetails", { id: item.id })} />
      )}
    />
  );
}

const s = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
});
