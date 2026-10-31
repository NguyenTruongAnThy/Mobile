# Trả lời câu hỏi bổ sung — Buổi 7 BookStore

## 1. Cấu trúc điều hướng

BookDetail đặt ở Stack vì nó là màn tạm thời, mở lên che toàn bộ tab bar và tự có nút quay lại, phù hợp với luồng xem xong rồi quay về. Nếu đặt trong Tab, nó sẽ thành một mục chính ngang hàng với Home, Danh mục, Giỏ, Tài khoản, tab bar vẫn hiện phía dưới và không có nút quay lại tự nhiên. Ngoài ra, tab thường không mang tham số bookId thay đổi liên tục như Stack, nên việc truyền sách nào đang xem sẽ rườm rà và dễ sai trạng thái hơn.

## 2. Redux

Redux Toolkit dùng Immer, nên code trong reducer sửa trên một bản nháp, sau đó Immer tự tạo ra state mới bất biến từ bản nháp đó, state gốc không bị sửa trực tiếp. Bỏ useMemo trong useCart thì tổng tiền và tổng số lượng vẫn hiển thị đúng, vì reduce vẫn chạy và cho cùng kết quả. Hậu quả duy nhất là mỗi lần component render lại thì tổng lại được tính lại, với giỏ lớn hoặc render thường xuyên thì sẽ tốn công vô ích, còn useMemo chỉ là tối ưu hiệu năng chứ không quyết định đúng sai.

## 3. Promise.all

Nếu getCategories lỗi thì Promise.all sẽ reject cả nhóm, Home rơi vào nhánh catch và chỉ hiện ErrorView, dù getBooks đã thành công và danh sách sách đã có trong tay. Dùng Promise.allSettled thì mỗi request trả về trạng thái fulfilled hoặc rejected riêng, nên mình vẫn set được danh sách sách và chỉ xử lý riêng phần danh mục bị lỗi. Đánh đổi là code dài hơn vì phải kiểm tra từng kết quả, giao diện rơi vào trạng thái nửa vời khi thiếu chip danh mục, và người dùng có thể không nhận ra một phần dữ liệu đã lỗi nếu mình không hiện thông báo riêng cho phần đó.

## 4. Debounce

Đặt setTimeout thẳng trong onChangeText thì mỗi phím gõ tạo ra một hẹn giờ riêng và không hẹn giờ nào bị hủy, nên mỗi phím vẫn gây ra một lần lọc, chỉ là lọc trễ đi chứ không gộp lại thành một lần sau khi ngừng gõ. Hàm dọn dẹp return () => clearTimeout trong useEffect sẽ hủy hẹn giờ cũ mỗi khi giá trị thay đổi, nhờ đó chỉ hẹn giờ của lần gõ cuối cùng được chạy. Nó còn tránh việc cập nhật state khi component đã bị gỡ khỏi màn hình, vì hẹn giờ cũ không còn cơ hội chạy sau khi unmount.

## 5. Thêm sắp xếp theo giá cho Home

Thêm một state sort và sửa đúng một chỗ là useMemo của visibleBooks:

```tsx
const [sort, setSort] = useState<"asc" | "desc" | null>(null);

const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
  if (sort === "asc") return [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "desc") return [...filtered].sort((a, b) => b.price - a.price);
  return filtered;
}, [books, debouncedKeyword, categoryId, priceRange, sort]);
