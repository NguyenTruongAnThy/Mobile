import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { PHONES } from "../data/phones";
import { Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { TabProps } from "./types";

export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return (
    <Pressable style={s.row} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <Text style={s.name}>{phone.name.split(" - ")[0]}</Text>
        <Text style={s.price}>{formatPrice(phone.price)}</Text>
      </View>
      <Text style={s.arrow}>{">"}</Text>
    </Pressable>
  );
}

// TODO 3: FlatList, bấm dòng thì navigate sang ProductDetails kèm id
export function ProductsTab({ navigation }: TabProps<"Products">) {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <ProductRow phone={item} onPress={() => navigation.navigate("ProductDetails", { id: item.id })} />
      )}
    />
  );
}

const s = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: colors.line },
  name: { fontSize: 15, color: colors.text, marginBottom: 4 },
  price: { fontWeight: "bold", color: colors.text },
  arrow: { fontSize: 16, color: colors.muted, marginLeft: 8 },
});
