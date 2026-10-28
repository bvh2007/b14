# Sorry Bloom — website xin lỗi để chính bạn tự viết nội dung

## 1. Nguyên tắc
Toàn bộ nội dung cá nhân trong `backend/config/content.js` để trống. Website chỉ hiện `[Bạn chưa viết nội dung phần này]` cho đến khi bạn tự điền. Không có lời xin lỗi hoặc lời hứa nào được viết thay bạn.

## 2. Cài đặt
1. Cài Node.js LTS (https://nodejs.org/) và Git (https://git-scm.com/).
2. Giải nén ZIP, mở **thư mục `sorry-bloom-personal`** bằng VS Code.
3. Mở Terminal ngay tại thư mục có `package.json`, chạy `npm install`.
4. Sao chép `.env.example` thành `.env`.
5. Chạy `npm run dev` rồi mở `http://localhost:3000`.
6. Kiểm tra `http://localhost:3000/api/health` và `http://localhost:3000/api/message`.

## 3. Tự viết lời xin lỗi
Mở `backend/config/content.js`. Chỉ sửa các chuỗi bên phải dấu `:` hoặc trong `letterParagraphs`. Dùng dấu nháy đơn hoặc backtick, không xóa dấu phẩy. Nếu lời nhắn chứa dấu nháy đơn, dùng backtick:
```js
welcomeTitle: `Có một điều mình muốn tự nói với cậu`,
```
Bạn tự quyết định toàn bộ nội dung. Sau khi lưu file, server ở chế độ dev sẽ tự khởi động lại.

## 4. Phản hồi
POST `/api/replies` nhận JSON `{ "message": "..." }`, tối đa 1200 ký tự, giới hạn 5 lần/15 phút mỗi IP. Nội dung không công khai. Không có tracking hoặc analytics. **Form chỉ lưu được khi có PostgreSQL và `DATABASE_URL`.** Nếu chưa có, trả HTTP 503 và hiển thị lỗi rõ ràng. Không sử dụng SQLite trên filesystem tạm của Render để tránh mất lời nhắn.

Để xem phản hồi, dùng bảng `replies` trong giao diện quản trị PostgreSQL của bạn. Không có API đọc phản hồi công khai.

## 5. Đẩy lên GitHub — tránh lỗi chỉ đẩy backend
Tạo repository GitHub **trống**. Trong VS Code, mở terminal ở thư mục gốc có `backend`, `frontend`, `package.json` (không mở riêng `backend`).
```bash
git init
git add .
git status
git commit -m "feat: create personal apology website"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```
Nếu `origin already exists`, dùng `git remote -v`, sau đó `git remote set-url origin URL` nếu cần. Nếu repo có lịch sử khác, đồng bộ trước, không dùng `--force` tùy tiện. Trước khi push, kiểm tra GitHub sẽ có **cả** `frontend/`, `backend/`, `package.json`.

## 6. Render
1. Render Dashboard → New → Web Service → kết nối repo GitHub.
2. Branch: `main`; Root Directory: **để trống** (nếu `package.json` ở gốc repo).
3. Build Command: `npm install`; Start Command: `npm start`.
4. Tạo PostgreSQL trên Render hoặc nhà cung cấp phù hợp, lấy connection string và đặt Environment Variable `DATABASE_URL` cho Web Service. Không commit `.env`.
5. Deploy. Mở URL HTTPS và thử `/api/health`, `/api/message`, rồi thử gửi phản hồi.
6. Bật Auto Deploy cho `main`. Khi sửa nội dung, chạy `git add .`, `git commit -m "update: my personal message"`, `git push`.

**Quyền riêng tư:** Nếu nội dung cá nhân không muốn công khai trên GitHub, hãy dùng repository Private. Website deploy công khai vẫn cho người có link xem nội dung; không dùng nó cho bí mật nhạy cảm.

## 7. Lỗi phổ biến
- `ENOENT package.json`: đang mở sai thư mục / Root Directory Render sai.
- `Cannot find module backend/server.js`: thiếu backend trên GitHub hoặc Git lồng trong backend.
- `origin already exists`: dùng `git remote -v` rồi `git remote set-url`.
- `503` khi gửi lời nhắn: chưa cấu hình `DATABASE_URL` hoặc DB chưa kết nối.
- `EADDRINUSE`: port 3000 đang được chương trình khác dùng.
- `npm not recognized`: cài Node.js LTS, mở lại terminal.

## 8. Các file chính
- `backend/config/content.js`: **duy nhất nơi bạn viết lời xin lỗi**.
- `frontend/css/style.css`: màu sắc, typography, hiệu ứng.
- `frontend/js/main.js`: tương tác phong thư, form, chuyển động.
- `backend/app.js`: Express static và REST API.
- `backend/controllers/replyController.js`: lưu phản hồi vào PostgreSQL.
