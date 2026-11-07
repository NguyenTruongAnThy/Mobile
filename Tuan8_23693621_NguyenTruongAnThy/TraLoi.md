# Trả lời câu hỏi bổ sung — Buổi 8 BookStore

## 1. Cờ ready trong useAutoPersist

Nếu bỏ điều kiện `ready`, lần render đầu tiên giỏ hàng trong store vẫn còn rỗng
(`[]`), effect trong `useAutoPersist` chạy ngay và ghi mảng rỗng này vào
AsyncStorage, đè lên giỏ hàng đã lưu từ lần mở app trước — trước khi hàm đọc
`loadJSON` kịp trả về. Khi đọc xong thì dữ liệu cũ đã mất nên `hydrateCart`
không còn gì để nạp, giỏ hàng luôn trống sau mỗi lần mở lại app. Cờ `ready`
chỉ bật sau khi đọc xong và nạp xong, nên chặn được lần ghi sớm này.

## 2. Token giả

Thứ nhất, mật khẩu nằm sẵn dạng chữ thường trong `db.json` và được so sánh ở
phía app, nên ai đọc được API `/users` cũng thấy mật khẩu của mọi tài khoản.
Thứ hai, token do app tự tạo dạng `token-{id}-{Date.now()}` nên không có chữ
ký và không có hạn dùng, ai cũng làm giả được một token hợp lệ. Hệ thống thật
phải để server kiểm tra mật khẩu (đã băm) và cấp token có chữ ký, có thời hạn;
app lưu token bằng SecureStore (Keychain trên iOS, Keystore trên Android),
không lưu dạng thô trong AsyncStorage.

## 3. Hai effect trong CartItemRow

Nếu xóa effect đồng bộ `setQty(item.quantity)`, số hiển thị sẽ lệch khỏi store
khi store đổi từ nơi khác mà không qua nút −/+ của dòng đó, ví dụ mở lại app
và giỏ được nạp từ AsyncStorage (store có 5 cuốn nhưng `qty` cục bộ vẫn giữ
giá trị 1 của lần render đầu), hoặc xóa rồi thêm lại cùng một cuốn. Lúc đó
nút −/+ vẫn bấm được từ số cũ sai, còn tổng tiền thì tính theo số đúng trong
store nên hai bên không khớp nhau.

## 4. Một nguồn state cho nút tim

Nếu mỗi `HeartButton` giữ `useState` riêng thì hai tim là hai trạng thái độc
lập: bấm tim ở lưới, vào trang chi tiết tim vẫn trắng, và ngược lại; màn Yêu
thích cũng không biết cuốn nào vừa được thả tim. Store giải quyết bằng cách
giữ một nguồn duy nhất là mảng `ids` trong Redux: mọi `HeartButton` đều đọc
chung qua `useWishlist()`, bấm tim chỉ dispatch một action `toggleWishlist`,
mọi nơi đang hiển thị cuốn đó đều render lại với cùng một giá trị nên luôn
khớp nhau.

## 5. Code bổ sung: nút 👁 hiện/ẩn mật khẩu ở màn Đăng nhập

Thêm state `showPassword` trong `LoginScreen.tsx`, truyền
`secureTextEntry={!showPassword}` cho ô Mật khẩu và đặt một `Pressable` 👁
cạnh ô đó để đổi state:

```tsx
const [showPassword, setShowPassword] = useState(false);

// trong giao diện, thay FormField Mật khẩu bằng:
<View>
  <FormField
    label="Mật khẩu"
    value={password}
    onChangeText={setPassword}
    error={errors.password}
    secureTextEntry={!showPassword}
    style={{ paddingRight: 40 }}
  />
  <Pressable
    onPress={() => setShowPassword((v) => !v)}
    accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
    style={{ position: "absolute", right: 12, top: 34 }}
  >
    <Text>{showPassword ? "🙈" : "👁"}</Text>
  </Pressable>
</View>
