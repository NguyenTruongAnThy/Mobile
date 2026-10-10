import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  rating: number;
  poster: string;
  watched: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  onSelect: (id: string) => void;
  layout?: "row" | "poster"; // không truyền thì mặc định "row"
}

function MovieCard({ movie, onSelect, layout = "row" }: MovieCardProps) {
  const rating = movie.rating.toFixed(1);

  // ===== Dạng poster: xếp dọc =====
  if (layout === "poster") {
    return (
      <TouchableOpacity
        style={styles.posterCard}
        onPress={() => onSelect(movie.id)}
      >
        <View style={styles.posterWrap}>
          <Image source={{ uri: movie.poster }} style={styles.posterImg} />

          {/* Huy hiệu điểm: góc trên phải */}
          <View style={styles.ratingBadge}>
            <Text style={styles.badgeText}>⭐ {rating}</Text>
          </View>

          {/* Chip "Đã xem": góc dưới trái, chỉ hiện khi đã xem */}
          {movie.watched && (
            <View style={styles.watchedChip}>
              <Text style={styles.badgeText}>✓ Đã xem</Text>
            </View>
          )}
        </View>
        <Text style={styles.posterTitle} numberOfLines={2}>
          {movie.title}
        </Text>
      </TouchableOpacity>
    );
  }

  // ===== Dạng row: nằm ngang (giống Câu 3) =====
  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(movie.id)}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.sub}>
          {movie.director} · {movie.year}
        </Text>
        <Text style={styles.sub}>⭐ {rating}</Text>
        <Text style={styles.sub}>
          {movie.watched ? "✅ Đã xem" : "🎬 Chưa xem"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  // ---- row ----
  card: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  poster: { width: 70, height: 105, backgroundColor: "#ddd" },
  info: { flex: 1, marginLeft: 12, justifyContent: "center" },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  sub: { fontSize: 14, color: "#555", marginTop: 2 },

  // ---- poster ----
  // flex:1 + maxWidth "50%": 2 cột đều nhau, thẻ lẻ cuối KHÔNG bị kéo giãn
  posterCard: { flex: 1, maxWidth: "50%", padding: 6 },
  posterWrap: {
    width: "100%",
    aspectRatio: 2 / 3, // tỉ lệ 2:3, co giãn theo độ rộng thẻ
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
  posterImg: { width: "100%", height: "100%" },
  ratingBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  watchedChip: {
    position: "absolute",
    bottom: 6,
    left: 6,
    backgroundColor: "rgba(46,160,67,0.9)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  posterTitle: { marginTop: 6, fontSize: 14, fontWeight: "600" },
});