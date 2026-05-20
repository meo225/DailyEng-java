---
marp: true
theme: default
paginate: true
---

# BẢO VỆ ĐỒ ÁN TỐT NGHIỆP
## DailyEng - Nền tảng Học Tiếng Anh Tương tác Tích hợp Trợ lý Ảo AI
**Sinh viên thực hiện:** [Tên của bạn]
**Giảng viên hướng dẫn:** [Tên GVHD]

---

# Cấu trúc bài báo cáo (Agenda)
1. **Giới thiệu đề tài:** Đặt vấn đề và giải pháp
2. **Công nghệ sử dụng:** Kiến trúc hệ thống và Tech Stack
3. **Phân tích thiết kế:** Use Case, Database & Luồng nghiệp vụ
4. **Triển khai hệ thống:** Môi trường & CI/CD
5. **Demo sản phẩm:** Trải nghiệm thực tế (Live Demo)
6. **Tổng kết:** Kết quả đạt được và Hướng phát triển

---

<!-- PHẦN 1: GIỚI THIỆU -->
# 1. Giới thiệu đề tài: Đặt vấn đề
- **Rào cản giao tiếp:** Người học thiếu môi trường luyện tập giao tiếp tiếng Anh thực tế, dẫn đến tâm lý e ngại.
- **Chi phí cao:** Các khóa học 1-kèm-1 với người bản xứ tốn kém và không linh hoạt về thời gian.
- **Hạn chế của ứng dụng hiện tại:** Đa số app chỉ tập trung vào ngữ pháp/từ vựng (quiz, trắc nghiệm), thiếu tính năng phản hồi giọng nói (Speech-to-Text) chuyên sâu.

---

# 1. Giới thiệu đề tài: Giải pháp DailyEng
**Mục tiêu:** Xây dựng một không gian học tập toàn diện, cá nhân hóa.
**Giải pháp cốt lõi:**
- Ứng dụng **AI (Trợ lý ảo Dorara)** đóng vai trò như một người bạn bản xứ để luyện hội thoại 24/7.
- Tích hợp công nghệ **Đánh giá phát âm (Pronunciation Assessment)** tới từng âm vị.
- Tự động hóa quá trình học với **Flashcard (Lặp lại ngắt quãng - SRS)** và **Mindmap**.

---

<!-- PHẦN 2: CƠ SỞ LÝ THUYẾT & CÔNG NGHỆ -->
# 2. Kiến trúc hệ thống tổng thể
- Áp dụng mô hình **Client-Server / Microservices Architecture**.
- Phân tách hoàn toàn độc lập giữa Frontend (Máy khách) và Backend (Máy chủ).
- Giao tiếp thông qua **RESTful API** với định dạng JSON.
- Ưu điểm: Khả năng mở rộng tốt (Scalability), dễ dàng bảo trì và triển khai độc lập.

---

# 2. Công nghệ Backend (Máy chủ)
- **Framework:** **Java Spring Boot 3** - Xử lý nghiệp vụ lõi mạnh mẽ, kiến trúc đa tầng (Controller-Service-Repository).
- **Bảo mật:** **Spring Security** kết hợp **JWT (Stateless)** và **HttpOnly Cookies** chống tấn công XSS/CSRF.
- **Cơ sở dữ liệu:** **PostgreSQL** (Lưu trữ quan hệ bền vững).
- **Tối ưu hiệu năng:** 
  - **Caffeine Cache** (Giảm tải truy vấn DB).
  - **Resilience4j** (Cơ chế Circuit Breaker chống sập hệ thống).

---

# 2. Công nghệ Cloud & AI (Bên thứ ba)
Tận dụng hệ sinh thái đám mây để xử lý các tác vụ phức tạp:
- **Azure AI Speech:** Cốt lõi của tính năng Luyện nói. Nhận diện giọng nói và chấm điểm phát âm chính xác.
- **Azure AI Translator & Vision (OCR):** Hỗ trợ dịch thuật văn bản đa ngôn ngữ và dịch nội dung trực tiếp từ hình ảnh (SmartLens).
- **Google Gemini AI:** Đóng vai trò là "bộ não" cho trợ lý ảo Dorara, xử lý ngôn ngữ tự nhiên và phân tích lỗi sai ngữ pháp.

---

# 2. Công nghệ Frontend (Giao diện)
- **Framework nền tảng:** **Next.js** kết hợp **React** (Hỗ trợ SSR/CSR giúp tối ưu SEO và tốc độ tải).
- **Quản lý trạng thái:** **Zustand** (Kiến trúc tinh gọn, không gây render thừa).
- **Thiết kế UI/UX:** 
  - **Tailwind CSS** & **Radix UI** (Đảm bảo trợ năng và chuẩn nhận diện thương hiệu).
- **Trải nghiệm thị giác:**
  - **WebGL (Three.js):** Kết xuất nhân vật trợ lý 3D sinh động.
  - **Framer Motion:** Tạo vi chuyển động mượt mà.

---

<!-- PHẦN 3: PHÂN TÍCH & THIẾT KẾ -->
# 3. Phân tích: Biểu đồ Use Case tổng quát
*(Chèn hình ảnh sơ đồ Use Case Mermaid màu pastel từ report)*
- **Tác nhân:** Khách & Người học (Đã đăng nhập).
- **3 Phân hệ chính:**
  1. Quản lý Tài khoản (Auth, Profile).
  2. Học tập Cốt lõi (Từ vựng, Ngữ pháp, Luyện nói AI).
  3. Trợ lý & Tiện ích (Sổ tay SRS, Thống kê, Dịch thuật SmartLens).

---

# 3. Thiết kế: Sơ đồ Thực thể Liên kết (ERD)
*(Chèn hình ảnh ERD của Database)*
**Các thực thể trọng tâm:**
- `Users`: Quản lý thông tin xác thực và điểm kinh nghiệm (XP).
- `Topics` & `Vocabularies`: Quản lý kho bài học và từ vựng.
- `Speaking_Sessions`: Lưu trữ lịch sử hội thoại và điểm số đánh giá.
- `Flashcards` & `Notebooks`: Quản lý quá trình ôn tập cá nhân hóa.

---

# 3. Thiết kế: Luồng nghiệp vụ cốt lõi (Luyện nói)
*(Chèn Sequence Diagram cho chức năng Luyện nói AI)*
1. Người dùng chọn kịch bản -> Mở luồng thu âm.
2. Dữ liệu âm thanh gửi về Backend.
3. Backend gọi **Azure Speech SDK** để chấm điểm phát âm.
4. Lời thoại được gửi sang **Gemini AI** để sinh câu phản hồi.
5. Frontend nhận kết quả (Điểm số, Phản hồi, Sửa lỗi ngữ pháp) và hiển thị.

---

# 3. Thiết kế: Kiến trúc Dữ liệu & UI
- **Thiết kế API:** Tuân thủ RESTful, các API nhạy cảm yêu cầu `Authorization: Bearer <token>`.
- **Thiết kế UI System:** Áp dụng nguyên tắc Minimalist, lấy nội dung học làm trung tâm. Sử dụng Gamification (huy hiệu, bảng xếp hạng) để tạo động lực.

---

<!-- PHẦN 4: TRIỂN KHAI -->
# 4. Môi trường triển khai
- **Frontend Hosting:** Triển khai trên **Vercel** (Tận dụng Edge Network để phân phối tĩnh, độ trễ cực thấp).
- **Backend & Database:** Triển khai trên [Render / Railway / AWS] với cấu hình Docker container.
- **Lưu trữ tĩnh (Media):** Cloudinary (Lưu avatar, hình ảnh kịch bản).
- **Giám sát (Monitoring):** Tích hợp Sentry để bắt lỗi (exception tracking) theo thời gian thực.

---

<!-- PHẦN 5: DEMO SẢN PHẨM -->
# 5. Live Demo: Chức năng Khởi động
*(Dành 1 slide này làm màn hình chờ trước khi chuyển tab qua trình duyệt)*
**Kịch bản Demo dự kiến:**
1. Đăng ký & Đăng nhập (Mượt mà, không load trang).
2. Trang chủ & Dashboard (Thống kê Heatmap, Leaderboard).

---

# 5. Live Demo: Trải nghiệm Học tập
**Kịch bản Demo dự kiến:**
1. **Học từ vựng:** Xem danh sách từ, tra cứu bằng biểu đồ **Mindmap**.
2. **Ôn tập:** Tính năng lật mặt thẻ **Flashcard** và thuật toán nhắc lại (SRS).
3. **Tiện ích:** Test thử tính năng **SmartLens** (Dịch chữ từ hình ảnh hóa đơn/sách).

---

# 5. Live Demo: Luyện nói với AI (Tính năng "Đinh")
**Kịch bản Demo dự kiến:**
1. Mở một kịch bản giao tiếp (ví dụ: Đặt cafe).
2. Demo thu âm giọng nói trực tiếp qua Microphone.
3. Hiển thị nhân vật 3D phản hồi.
4. Show bảng **Đánh giá phát âm chi tiết** và **Feedback ngữ pháp** do AI trả về.

---

<!-- PHẦN 6: KẾT LUẬN -->
# 6. Tổng kết: Kết quả đạt được
- Xây dựng thành công ứng dụng với kiến trúc **Microservices chuẩn doanh nghiệp**.
- Tích hợp mượt mà các công nghệ lõi tiên tiến (Azure Speech, Gemini, Three.js).
- Giải quyết được bài toán tự luyện nói tiếng Anh với chi phí thấp thông qua AI.
- Hệ thống hoạt động ổn định, bảo mật cao, giao diện có tính thẩm mỹ và thân thiện (A11y).

---

# 6. Tổng kết: Hạn chế của hệ thống
- Khả năng xử lý real-time (thời gian thực) khi mạng yếu vẫn còn độ trễ do phụ thuộc vào API của bên thứ 3 (Azure, Google).
- Dữ liệu bài học (Topics/Vocab) vẫn cần nhập liệu thủ công (cần có tool crawl dữ liệu tự động).
- Chưa có ứng dụng Mobile Native (iOS/Android) để tận dụng tối đa phần cứng điện thoại.

---

# 6. Hướng phát triển tương lai
1. **Phát triển Mobile App:** Chuyển đổi mã nguồn Frontend sang **React Native** để đưa ứng dụng lên App Store / Google Play.
2. **Nâng cấp tính năng AI:** Xây dựng tính năng "Sinh lộ trình học cá nhân hóa hoàn toàn bằng AI" dựa trên kết quả bài Test đầu vào.
3. **Mở rộng chức năng:** Bổ sung tính năng Luyện thi chứng chỉ (IELTS Speaking, TOEIC) và tích hợp thanh toán (Payment Gateway) cho gói Premium.

---

# LỜI CẢM ƠN
Em xin chân thành cảm ơn Thầy/Cô đã lắng nghe và đóng góp ý kiến cho đồ án!
*(Q&A - Xin mời hội đồng đặt câu hỏi)*
