import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SelectPhoneParamList } from "./SelectPhoneApp";
import { ColorKey, Phone } from "../types";
import { PHONE_COLORS, COLOR_ORDER } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Image source={PHONE_COLORS[picked ?? phone.defaultColor].image} style={styles.thumb} resizeMode="contain" />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>
          {/* TODO 3: chỉ khi đã chọn màu mới hiện thêm 3 dòng */}
          {picked && (
            <>
              <Text style={styles.small}>Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text></Text>
              <Text style={styles.small}>Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text></Text>
              <Text style={styles.smallBold}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[styles.swatch, { backgroundColor: PHONE_COLORS[key].hex }, picked === key && styles.swatchOn]}
            />
          ))}
        </View>
        {/* TODO 4: nút XONG */}
        <Pressable
          style={styles.doneBtn}
          onPress={() => navigation.navigate("Product", { color: picked }, { merge: true })}
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 16 },
  thumb: { width: 100, height: 100 },
  headerText: { flex: 1, marginLeft: 12 },
  small: { fontSize: 14, color: colors.text, marginBottom: 2 },
  smallBold: { fontSize: 14, color: colors.text, fontWeight: "bold" },
  bold: { fontWeight: "bold" },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16 },
  hint: { fontSize: 14, color: colors.text, marginBottom: 12 },
  swatches: { gap: 10 },
  swatch: { height: 48, borderRadius: 4 },
  swatchOn: { borderWidth: 3, borderColor: colors.text },
  doneBtn: { backgroundColor: colors.blue, borderRadius: 4, paddingVertical: 14, alignItems: "center", marginTop: 20 },
  doneText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
