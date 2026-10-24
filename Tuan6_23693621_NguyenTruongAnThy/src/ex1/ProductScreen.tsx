import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SelectPhoneParamList } from "./SelectPhoneApp";
import { Phone } from "../types";
import { PHONE_COLORS, } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & { phone: Phone };

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image source={PHONE_COLORS[shown].image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.qMark}><Text style={styles.qText}>?</Text></View>
        </View>
        {/* TODO 1: nút chọn màu */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseText}>
            4 MÀU-CHỌN <Text style={styles.chooseTextBold}>{picked ? "LOẠI" : "MÀU"}</Text>
          </Text>
          <Text style={styles.arrow}>{">"}</Text>
        </Pressable>
      </View>
      {/* TODO 2: nút CHỌN MUA, đặt ngoài khối info để nằm sát đáy */}
      <Pressable style={styles.buyBtn} onPress={() => {}}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  imageWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 280, height: 280 },
  info: { paddingBottom: 12 },
  name: { fontSize: 16, color: colors.text, marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  review: { marginLeft: 6, color: colors.muted, fontSize: 13 },
  price: { fontSize: 20, fontWeight: "bold", color: colors.text },
  oldPrice: { marginLeft: 10, color: colors.muted, fontSize: 16, textDecorationLine: "line-through" },
  badge: { fontSize: 13, color: colors.text },
  qMark: { marginLeft: 6, width: 18, height: 18, borderRadius: 9, borderWidth: 1, borderColor: colors.muted, justifyContent: "center", alignItems: "center" },
  qText: { fontSize: 12, color: colors.muted },
  chooseBtn: { borderWidth: 1, borderColor: colors.line, borderRadius: 6, paddingVertical: 12, alignItems: "center", marginTop: 8 },
  chooseText: { fontSize: 14, color: colors.text },
  chooseTextBold: { fontWeight: "bold" },
  arrow: { position: "absolute", right: 12, fontSize: 16, color: colors.text },
  buyBtn: { backgroundColor: colors.red, borderRadius: 6, paddingVertical: 14, alignItems: "center", marginTop: 12, marginBottom: 16 },
  buyText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
