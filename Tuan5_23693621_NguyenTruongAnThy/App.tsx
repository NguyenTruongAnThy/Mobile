import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Button,
  Alert,
  Switch,
  RefreshControl,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "./components/MovieCard";
import type { Movie } from "./components/MovieCard";

export const API_URL = "https://6aca2ce53115bcc958208960.mockapi.io/movies";

export async function fetchMovies() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Gọi API thất bại: " + res.status);
  }
  return res.json();
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // Câu 6

  const [posterMode, setPosterMode] = useState(false);
  const [onlyUnwatched, setOnlyUnwatched] = useState(false);

  // Tải lần đầu và nút "Thử lại": hiện vòng quay toàn màn hình
  const loadMovies = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchMovies();
      setMovies(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  // Câu 6: kéo xuống để tải lại. KHÔNG đụng tới posterMode / onlyUnwatched
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await fetchMovies();
      setMovies(data);
      setError(false);
    } catch (e) {
      setError(true);
    } finally {
      setRefreshing(false); // luôn tắt vòng xoay, kể cả khi lỗi
    }
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      const movie = movies.find((m) => m.id === id);
      if (movie) {
        Alert.alert(movie.title, `Đạo diễn: ${movie.director}`);
      }
    },
    [movies]
  );

  const filteredMovies = useMemo(
    () => (onlyUnwatched ? movies.filter((m) => !m.watched) : movies),
    [movies, onlyUnwatched]
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          Movie Watchlist
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 8 }}>Dạng poster</Text>
            <Switch value={posterMode} onValueChange={setPosterMode} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 8 }}>Chưa xem</Text>
            <Switch value={onlyUnwatched} onValueChange={setOnlyUnwatched} />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 40 }} />
        ) : error ? (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text style={{ color: "red", fontSize: 16, marginBottom: 12 }}>
              Không tải được danh sách phim.
            </Text>
            <Button title="Thử lại" onPress={loadMovies} />
          </View>
        ) : (
          <FlatList
            key={posterMode ? "poster" : "row"}
            data={filteredMovies}
            keyExtractor={(item: Movie) => item.id}
            numColumns={posterMode ? 2 : 1}
            contentContainerStyle={{ padding: posterMode ? 6 : 0 }}
            renderItem={({ item }: { item: Movie }) => (
              <MovieCard
                movie={item}
                onSelect={handleSelect}
                layout={posterMode ? "poster" : "row"}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 40, color: "#666" }}>
                Không có phim nào để hiển thị.
              </Text>
            }
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}