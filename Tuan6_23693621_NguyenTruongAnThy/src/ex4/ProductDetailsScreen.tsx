import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";
import { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  // TODO 4: lấy id rồi tìm phone trong PHONES
  const { id } = route.params;
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  // TODO 5: không tìm thấy
  if (!phone) {
    return (
      <View style={s.center}><Text>Không tìm thấy sản phẩm #{id}</Text></View>
    );
  }

  // TODO 6 + 7: hiển thị chi tiết + nút yêu thích
  return (
    <View style={s.root}>
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={s.image} resizeMode="contain" />
      <Text style={s.name}>{phone.name}</Text>
      <View style={s.row}>
        <Stars value={phone.rating} />
        <Text style={s.review}>(Xem {phone.reviewCount} đánh giá)</Text>
      </View>
      <Text style={s.price}>{formatPrice(phone.price)}</Text>
      <Text style={s.supplier}>Cung cấp bởi {phone.supplier}</Text>
      <Pressable style={[s.favBtn, has(phone.id) && s.favBtnOn]} onPress={() => toggle(phone.id)}>
        <Text style={s.favText}>{has(phone.id) ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  image: { width: "100%", height: 260, marginBottom: 16 },
  name: { fontSize: 16, color: colors.text, marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  review: { marginLeft: 6, color: colors.muted },
  price: { fontSize: 20, fontWeight: "bold", color: colors.text, marginBottom: 8 },
  supplier: { color: colors.muted, marginBottom: 16 },
  favBtn: { backgroundColor: colors.blue, borderRadius: 6, paddingVertical: 12, alignItems: "center" },
  favBtnOn: { backgroundColor: colors.red },
  favText: { color: "#fff", fontWeight: "bold" },
});
