# SLIDE THUYẾT TRÌNH ĐỒ ÁN: DAILYENG
**Trọng tâm công nghệ:** Tích hợp AI trên nền Backend Java Spring Boot 3.4 và Java 21 kết hợp Frontend Next.js 15

## Mở đầu

### Mục lục nội dung báo cáo (1.5)
#### 📌 Nội dung Slide:
* **Phần 1: Tổng quan đề tài & Công nghệ sử dụng**
* **Phần 2: Phân tích yêu cầu & Thiết kế hệ thống**
* **Phần 3: Triển khai và kiểm thử hệ thống**
* **Phần 4: CI/CD & Demo sản phẩm**
* **Phần 5: Kết luận & Định hướng phát triển**

---

## Phần 1: Tổng quan đề tài & Công nghệ sử dụng

### Bối cảnh, Thực trạng & Mục tiêu đề tài (1.1, 1.2, 1.3, 1.4)
#### 📌 Nội dung Slide:
* **Bối cảnh thực tiễn:** 
  * Nhu cầu học tiếng Anh giao tiếp và tích lũy từ vựng ngày càng tăng.
  * Người học thường thiếu môi trường thực hành phản xạ đàm thoại trực tiếp và dễ quên từ vựng nhanh chóng (đường cong quên lãng).
* **Khảo sát & Thực trạng:** Các giải pháp hiện tại hoạt động độc lập và chưa đồng bộ (PrepTalk, YouPass) — tập trung chủ yếu vào bài học tĩnh hoặc trắc nghiệm tiêu chuẩn, thiếu tính năng tương tác nói phản xạ hai chiều kết hợp ôn tập ngắt quãng động.
* **Định hướng giải pháp & Chi tiết hóa mục tiêu:**
  * **Mục tiêu sản phẩm:** Xây dựng ứng dụng DailyEng tích hợp đồng bộ 6 phân hệ cốt lõi tạo chu trình học tập khép kín dạng Ứng dụng tích hợp AI (AI-Integrated Web App).
  * **Mục tiêu kiến thức:** Làm chủ Java 21 (Virtual Threads), Spring Boot 3.4, các AI SDK (Azure Speech, Gemini) và thuật toán FSRS chạy local.

#### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Đồ thị Đường cong quên lãng (Forgetting Curve) & Sơ đồ chu trình học khép kín:** Biểu diễn trực quan tỷ lệ suy giảm trí nhớ tự nhiên để dẫn dắt lý do cần thuật toán FSRS, kết hợp vòng tròn mô tả quá trình học tập khép kín kết hợp giữa học lý thuyết, thực hành phản xạ nói với AI để tạo ấn tượng tổng quan đầu tiên cho thầy/cô.

---

### Khảo sát thực trạng & So sánh giải pháp hiện nay (1.3.1, 1.3.2, 1.3.3)
#### 📌 Nội dung Slide:
* **Khảo sát từ dữ liệu thống kê (1.3.1):** Nhu cầu học tiếng Anh giao tiếp tăng vọt nhưng hầu hết người học thiếu môi trường thực hành phản xạ nói tự nhiên.
* **Khảo sát các website học tiếng Anh hiện nay (1.3.2):**
  * **PrepTalk luyện nói:** Chi phí cao, tập trung chủ yếu vào đàm thoại tĩnh hoặc trắc nghiệm tiêu chuẩn, thiếu tính cá nhân hóa.
  * **YouPass:** Chỉ tập trung vào học từ vựng tĩnh, không hỗ trợ nói phản xạ hai chiều.
  * **Luyennoi:** Nội dung đơn giản, không tích hợp thuật toán ôn tập ngắt quãng thông minh để tối ưu trí nhớ.
* **Khảo sát người dùng thực tế (1.3.3):** Đa số người học gặp khó khăn lớn trong việc ghi nhớ từ vựng dài hạn và phản xạ giao tiếp tự nhiên.
* **Sự vượt trội của DailyEng:** Tích hợp đồng bộ 6 phân hệ cốt lõi, kết hợp đàm thoại nói phản xạ AI thời gian thực và thuật toán ôn tập ngắt quãng FSRS chạy local để tạo chu trình học khép kín.

#### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Bảng so sánh tính năng (Competitor Analysis Table):** Bảng đối chiếu các tiêu chí (Đàm thoại phản xạ AI, Chấm điểm chi tiết, Lịch ôn tập SRS, Học từ vựng/Ngữ pháp tích hợp) giữa PrepTalk, YouPass, Luyennoi và DailyEng để làm nổi bật thế mạnh vượt trội của đề tài.

---

### Giải pháp & Phân hệ cốt lõi (3.1.1)
#### 📌 Nội dung Slide:
* **Giải pháp tổng thể:** Xây dựng nền tảng học tiếng Anh tích hợp AI hỗ trợ học viên từ lý thuyết, lưu trữ đến thực hành phản xạ.
* **Sáu phân hệ cốt lõi:**
  1. **Speaking Room:** Luyện nói phản xạ tự do và chấm điểm phát âm chi tiết bằng AI.
  2. **Vocabulary Hub:** Học từ vựng theo chủ đề qua thẻ Flashcard trực quan.
  3. **Grammar Hub:** Hệ thống lý thuyết ngữ pháp và bài tập trắc nghiệm củng cố kiến thức.
  4. **Notebook:** Sổ tay lưu giữ từ vựng và quy tắc ngữ pháp đã đánh dấu hoặc tự tạo.
  5. **Dorara AI Companion:** Trợ lý ảo hỗ trợ giải thích ngữ pháp và từ vựng thời gian thực.
  6. **Translate & SmartLens:** Dịch thuật văn bản và quét trích xuất chữ từ hình ảnh để dịch trực tiếp.
* **Hệ thống hỗ trợ:** Kế hoạch học tập (Study Plan), Kiểm tra trình độ đầu vào (Placement Test) và Gamification (Nhiệm vụ, Streak, Leaderboard).

#### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Collage Mockup giao diện của 6 phân hệ:** Hình ảnh ghép phối cảnh đẹp mắt giao diện thực tế của Speaking Room, Vocabulary Hub, Grammar Hub, Notebook, Dorara và SmartLens để thầy/cô hình dung ngay quy mô và tính đa dạng của sản phẩm.

---

### Giới thiệu công nghệ sử dụng (Tech Stack) (Chương 2)
#### 📌 Nội dung Slide:
* **Kiến trúc tách biệt Client - Server:**
  * **Frontend (Next.js 15 & React 19):** Sử dụng React Server Components (RSC) cải thiện hiệu năng kết xuất trang, Zustand quản lý trạng thái, Next.js Server Actions đóng vai trò BFF (Backend-For-Frontend) che giấu API endpoint, kết hợp WebGL (Three.js) cho nhân vật 3D và Recharts để vẽ biểu đồ học tập.
  * **Backend (Spring Boot 3.4 & Java 21):** Trung tâm điều phối, xử lý logic nghiệp vụ và bảo mật. Sử dụng Java 21 Virtual Threads (Project Loom) giải quyết nghẽn I/O, Spring Data JPA & Hibernate ORM, Caffeine Cache, và Flyway quản lý phiên bản database.
* **Tích hợp dịch vụ AI (SaaS Integration):**
  * Sử dụng API/SDK chính thức từ các nhà cung cấp đám mây lớn (Microsoft, Google) để đạt độ chính xác cao nhất mà không cần tốn tài nguyên huấn luyện mô hình (Speech Service, Translator, Vision OCR, Gemini 2.5).
  * Backend Java đóng vai trò tiền xử lý dữ liệu, trích xuất thông tin từ kết quả AI và đồng bộ hóa nghiệp vụ.
  * **Thuật toán ôn tập khoa học FSRS-4.5:** Thuật toán ôn tập ngắt quãng (Free Spaced Repetition Scheduler) được tự cài đặt bằng ngôn ngữ Java chạy local.

#### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Sơ đồ khối Tech Stack (Next.js - Spring Boot):** Mindmap các biểu tượng logo công nghệ kết nối với nhau, mô tả vai trò của từng thành phần (Zustand, Three.js, Spring Boot, Java 21, Supabase, Azure SDK, Gemini SDK, Docker) tạo cảm giác chuyên nghiệp.

---

## Phần 2: Phân tích yêu cầu & Thiết kế hệ thống

### Yêu cầu hệ thống: Sơ đồ Use Case & Sitemap Figma (3.2.1, 3.2.2, 3.8.1)
#### 📌 Nội dung Slide:
* **Sơ đồ trang web (Sitemap) & Wireframe Figma:**
  * Tổ chức cấu trúc và điều hướng hệ thống xoay quanh Dashboard trung tâm dẫn đến các phân hệ chính giúp định hình trải nghiệm người dùng (UX) phù hợp trước khi lập trình.
  * Phác thảo cấu trúc giao diện thô (Wireframe) trên Figma cho Homepage, Speaking Room (luồng trò chuyện và màn hình phản hồi), Vocabulary Hub, và Notebook.
* **Phân quyền người dùng rõ ràng:**
  * **Khách:** Đăng ký, đăng nhập tài khoản, làm bài kiểm tra trình độ đầu vào (Placement Test).
  * **Người học:** Thực hiện đầy đủ các chức năng học từ vựng, ngữ pháp, luyện nói với AI, quản lý sổ tay cá nhân, theo dõi tiến độ và tham gia gamification.
* **Nêu tượng trưng một số Use Case tiêu biểu (Mục 3.2.2):** Để mô tả luồng vận hành mẫu, kịch bản nghiệp vụ của hệ thống được minh họa tượng trưng qua một số Use Case tiêu biểu như: Đăng ký tài khoản, Luyện nói phản xạ với AI, Học từ vựng Flashcard (FSRS) và Chat trợ lý ảo.

#### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Biểu đồ Use Case tổng quát (nằm ở mục 3.2.1) & Sitemap Figma (nằm ở mục 3.8.1.1)**  
> *(Hiển thị sơ đồ Use Case vẽ bằng Mermaid từ Chương 3 - Mục 3.2.1 kết hợp sơ đồ sitemap điều hướng để thầy/cô đánh giá tính chuẩn hóa trong quy trình thiết kế phần mềm).*

---

### Yêu cầu phi chức năng: Hiệu năng, Bảo mật & Khả năng bảo trì (3.1.2)
#### 📌 Nội dung Slide:
* **Hiệu năng (Performance) (3.1.2.1):**
  * Đảm bảo thời gian phản hồi thấp nhờ tích hợp bộ nhớ đệm Caffeine Cache ở tầng Service.
  * Tinh chỉnh Connection Pool HikariCP trong `application.yml` duy trì kết nối ổn định dưới tải cao.
  * Xử lý song song hiệu quả, không nghẽn I/O nhờ cấu hình Spring Boot chạy trên Java 21 Virtual Threads.
* **Bảo mật (Security) (3.1.2.2):**
  * Cơ chế xác thực không trạng thái (Stateless Authentication) qua JWT (Access Token 24h, Refresh Token 7 ngày).
  * Lưu trữ JWT an toàn trong Cookie HttpOnly để vô hiệu hóa nguy cơ tấn công XSS đánh cắp phiên.
  * Phân quyền dựa trên vai trò (RBAC) chặt chẽ bằng cách nhúng role (`ROLE_USER`, `ROLE_ADMIN`) vào JWT payload và kiểm soát bảo mật phương thức thông qua chú thích `@PreAuthorize`.
  * Sử dụng định danh CUID2 k-sortable để bảo vệ tài nguyên trên URL, ngăn chặn rò rỉ dữ liệu qua việc dò đoán ID tuần tự.
* **Khả năng bảo trì (Maintainability) (3.1.2.3):**
  * Phân tách module rõ ràng, phân lớp logic cụ thể: Controller, Service, Repository, DTO & Entity.
  * Áp dụng các OOP Design Patterns (DTO, Repository, Facade BFF) để mã nguồn lỏng, dễ tái cấu trúc.

#### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]
> **Sơ đồ kiến trúc luồng bảo mật & phân quyền:** Mô tả trực quan luồng Client gửi request -> Filter JwtAuthenticationFilter giải mã Cookie HttpOnly -> Spring Security Context thiết lập Granted Authorities -> Method Security `@PreAuthorize` cấp quyền -> Database PostgreSQL.

---

### Kiến trúc hệ thống tổng quan & Vai trò của Java Backend (3.4)
#### 📌 Nội dung Slide:
* **Kiến trúc phân tầng chuẩn hóa:**
  * **Client Layer:** Next.js 15 kết hợp React 19, sử dụng Zustand quản lý trạng thái toàn cục tinh gọn. Tích hợp thư viện WebGL Three.js cho nhân vật 3D và Recharts để hiển thị biểu đồ học tập trực quan.
  * **BFF Layer (Next.js Server Actions):** Đóng vai trò cổng Facade trung gian, phối hợp với Auth.js để quản lý session và đính kèm JWT Token từ Cookie HttpOnly bảo mật, tránh lộ API endpoint Backend trực tiếp và chống tấn công XSS.
  * **Server Layer (Spring Boot 3.4 & Java 21):** Trung tâm xử lý logic nghiệp vụ và bảo mật. Phân chia package module hóa rõ ràng: `auth`, `vocabulary`, `grammar`, `speaking`, `srs`, `xp`. Tích hợp Caffeine Cache tại tầng Service để giảm tải cho database.
  * **Data Layer:** PostgreSQL 16 triển khai trên Supabase Cloud, quản lý kết nối qua Connection Pooling HikariCP được cấu hình hiệu quả.

#### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Sơ đồ kiến trúc phân tầng logic (Full-Stack) và luồng giao tiếp (nằm ở mục 3.4)**  
> *(Vẽ lại sơ đồ kiến trúc ở Chương 3 - Mục 3.4 mô tả 4 tầng chính: Client Layer, BFF Layer, Server Layer, và Database Layer).*

---

### Thiết kế cơ sở dữ liệu, Định danh CUID2 & Flyway Migration (2.1.3.3, 2.3.2, 3.3)
#### 📌 Nội dung Slide:
* **Thiết kế thực thể JPA và Cấu trúc cơ sở dữ liệu:**
  * Cơ sở dữ liệu PostgreSQL gồm 35 bảng, được ánh xạ chặt chẽ thông qua Spring Data JPA.
  * Các bảng chính: `User` (trung tâm), `Topic`, `VocabItem`, `SpeakingSession`, `UserVocabProgress`.
  * Thiết kế lớp cha trừu tượng `BaseEntity` để tự động hóa các trường auditing như ngày tạo và ngày cập nhật.
* **Định danh CUID2 thay thế cho UUID:**
  * CUID2 dài 25 ký tự, được tạo tự động tại sự kiện `@PrePersist` bằng thư viện CUID cho Java.
  * **Hiệu suất chỉ mục:** Có tính chất k-sortable giúp duy trì thứ tự sắp xếp vật lý khi chèn bản ghi mới, nâng cao hiệu suất hoạt động của cây chỉ mục B-Tree trong PostgreSQL.
  * **Bảo mật hệ thống:** Ngăn chặn các lỗ hổng rò rỉ dữ liệu thông qua việc dò đoán ID tài nguyên trên đường dẫn URL.
* **Quản lý phiên bản Database với Flyway (Mục 2.3.2):**
  * Quản lý sự thay đổi cấu trúc DB thông qua các file migration SQL có đánh số phiên bản (`V1__init.sql`, `V2__add_index.sql`).
  * Tự động hóa quá trình đồng bộ hóa cơ sở dữ liệu giữa các môi trường phát triển (Local) và triển khai (Supabase Cloud).

#### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Sơ đồ thực thể kết hợp ERD chi tiết của hệ thống DailyEng (nằm ở mục 3.3.1)**  
> *(Hiển thị sơ đồ ERD chi tiết từ mục 3.3.1 biểu diễn mối quan hệ giữa User, UserVocabProgress, VocabItem, SpeakingSession, và NotebookItem. Có thể chèn thêm hình ảnh chụp migrations của Flyway để minh chứng).*

---

### Cấu trúc OOP, Design Patterns & Thiết kế RESTful API/SSE (2.2, 3.5, 3.6)
#### 📌 Nội dung Slide:
* **Tính chất OOP trong cấu trúc mã nguồn Java:**
  * **Đóng gói & Kế thừa:** Các thuộc tính thực thể được bảo vệ bằng phạm vi truy cập `private`, sử dụng **Java Records** của Java 21 để định nghĩa các DTO bất biến, kế thừa qua thực thể cha `BaseEntity`.
  * **Đa hình:** Định nghĩa Repository interface kế thừa đa hình từ `JpaRepository` cho các bộ lọc dynamic query.
* **Các mẫu thiết kế (Design Patterns) áp dụng:** Tách biệt logic DB khỏi nghiệp vụ bằng Service Layer & Repository Pattern. Phía client sử dụng Server Actions làm cổng BFF (Facade) che giấu API Backend.
* **Xác thực bảo mật JWT & RESTful API:** 
  * Spring Security kiểm soát bộ lọc `JwtAuthenticationFilter` sử dụng JWT Token trong HttpOnly Cookie; phân quyền bằng `@PreAuthorize`.
  * API chuẩn RESTful trả về JSON đồng nhất, xử lý lỗi tập trung qua `@ControllerAdvice` và `@ExceptionHandler`.
* **Giao thức Server-Sent Events (SSE) (Mục 3.6.4):** Kết nối một chiều thời gian thực push text stream từ Server về Client để hiển thị phản hồi chữ chạy mượt mà của trợ lý Dorara AI.

#### 🖼️ Sơ đồ & Bảng biểu trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ & BẢNG BIỂU TRÊN SLIDE:**  
> **Sơ đồ quan hệ kế thừa và chuyển đổi Entity - DTO (nằm ở mục 3.4.2.5 & 3.5.1.2) & Sơ đồ tuần tự xác thực JWT (nằm ở mục 3.8.1.2)**  
> *(Biễu diễn Sequence Diagram mô tả luồng xác thực JWT kết hợp Class Diagram thể hiện quan hệ DTO/Entity).*

---

## Phần 3: Triển khai và kiểm thử hệ thống

### Tích hợp AI SDKs & Tăng cường hiệu năng bằng Java 21 Virtual Threads (2.1.1.1, 2.4, 3.7.2)
#### 📌 Nội dung Slide:
* **Đặc thù I/O mạng của các cuộc gọi API AI:**
  * Quá trình Backend Java gọi Azure Speech (chấm điểm phát âm) và Google Gemini (giáo viên AI phản xạ đàm thoại) mất từ 1.5 đến 4 giây do phải chờ xử lý âm thanh hoặc sinh văn bản từ đám mây.
  * Mô hình Platform Thread OS truyền thống dễ gây cạn kiệt luồng và nghẽn hệ thống khi có nhiều người dùng đồng thời.
* **Giải pháp Java 21 Virtual Threads (Project Loom):**
  * Luồng ảo siêu nhẹ do JVM quản lý. Khi luồng ảo gặp tắc nghẽn I/O mạng khi chờ API AI, JVM tự động chuyển luồng ảo sang trạng thái chờ, giải phóng luồng vật lý OS cho các yêu cầu xử lý khác.
* **Phương án tích hợp dịch vụ đám mây (SaaS Integration):**
  * Tích hợp Azure Speech, Translator (dịch thuật), Vision OCR (SmartLens) và Gemini 2.5 flash qua các SDK chính thức để đảm bảo độ chính xác thương mại.
  * Backend Java làm nhiệm vụ điều phối luồng dữ liệu, tiền xử lý và trích xuất thông tin từ kết quả AI, giúp giải phóng tài nguyên CPU/RAM cục bộ cho server.

#### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Sơ đồ cơ chế Virtual Threads (nằm ở mục 4.3.2.2) & Luồng tuần tự tương tác gọi API AI (nằm ở mục 3.6)**  
> *(So sánh trực quan cơ chế Platform Threads nghẽn I/O và Virtual Threads chuyển đổi trạng thái linh hoạt, kết hợp luồng tuần tự tương tác giữa Next.js -> Spring Boot -> Azure/Gemini SDKs).*

---

### Module luyện phát âm AI: Phân tích cao độ & Đánh giá phát âm chuyên sâu (4.2.2)
#### 📌 Nội dung Slide:
* **Phân tích cao độ thời gian thực (4.2.2.1):**
  * Sử dụng **Web Audio API** tích hợp ở Client chạy trên trình duyệt để thu nhận và xử lý tín hiệu âm thanh trực tiếp.
  * Áp dụng thuật toán **Tự tương quan (Autocorrelation)** trên lớp `PitchAnalyzer` để trích xuất tần số cơ bản F0 của giọng nói trong dải tần số chuẩn từ 85 Hz đến 500 Hz.
  * Xác định độ biến thiên cao độ để so sánh trực quan với ngữ điệu chuẩn bản xứ qua biểu đồ Pitch Intonation.
* **Đánh giá phát âm chuyên sâu (4.2.2.2):**
  * Sử dụng **Azure Speech SDK** để chấm điểm chi tiết giọng nói theo 3 tiêu chí: Accuracy (Độ chính xác từ/âm vị), Fluency (Độ trôi chảy), Prosody (Ngữ điệu và biến thiên cao độ).
  * Tích hợp **Google Gemini API** đóng vai trò giáo viên chấm lỗi ngữ pháp, lựa chọn từ vựng và đề xuất câu diễn đạt tự nhiên hơn dựa trên ngữ cảnh.
* **Cơ chế độ khó thích ứng (Adaptive Difficulty):**
  * Tự động nâng độ khó kịch bản đối thoại lên 1 bậc nếu điểm trung bình 5 phiên gần nhất >= 85.
  * Tự động hạ trình độ xuống nếu điểm trung bình 3 phiên liên tiếp dưới 45.
* **Logic tính điểm tổng hợp có trọng số:**
  * Trọng số được phân bổ linh hoạt theo trình độ CEFR của người học (ví dụ: Trình độ A1/A2 ưu tiên độ trôi chảy và ngữ pháp cơ bản; trình độ C1/C2 ưu tiên vốn từ vựng nâng cao và ngữ điệu tự nhiên).

#### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]
> **Sơ đồ cấu trúc Module Luyện nói AI:** Mô tả luồng đi từ Web Audio API (Client) -> Autocorrelation (Pitch) -> Azure Speech SDK (Pronunciation Score) -> Gemini API (Grammar & Vocabulary Feedback) -> Service Layer -> PostgreSQL Database.

---

### Hiện thực hóa thuật toán ôn tập ngắt quãng FSRS (4.2.3)
#### 📌 Nội dung Slide:
* **Lý thuyết Thuật toán FSRS-4.5:**
  * Mô hình toán học giúp lên lịch ôn tập dựa trên mức độ suy giảm trí nhớ của người học.
  * Dự đoán 3 thông số trí nhớ: **Stability** (Độ bền), **Difficulty** (Độ khó), và **Retrievability** (Khả năng nhớ lại).
  * Công thức tính khả năng nhớ lại tại thời điểm $t$ ngày trôi qua:
    $$R(t, S) = \left(1 + \frac{t}{9 \cdot S}\right)^{-1}$$
* **Hiện thực hóa thuật toán trực tiếp bằng Java:**
  * Lớp `FsrsAlgorithm.java` được lập trình trực tiếp bằng Java để tính toán khoảng cách ngày ôn tập tiếp theo đối với các từ vựng hệ thống tại Vocabulary Hub khi người dùng đánh giá thẻ học theo các mức độ Again, Hard, Good hoặc Easy.
  * Khi người học chọn phản hồi, Java Backend sẽ tính toán các thông số trí nhớ mới và lên lịch ngày ôn tập tiếp theo trong bảng `UserVocabProgress` và ghi lịch sử ôn tập vào bảng `ReviewLog` để phục vụ lộ trình học tập cá nhân hóa.

#### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Luồng ánh xạ dữ liệu và cập nhật thông số FSRS trong Database (nằm ở mục 4.2.3 hoặc 3.3.3)**  
> *(Biểu diễn luồng tương tác: Người học Vocabulary Hub -> Flashcard -> Spring Boot -> Class FsrsAlgorithm xử lý -> cập nhật UserVocabProgress. Nên vẽ đồ thị biểu diễn các đường cong suy giảm khả năng nhớ).*

---

### Phân hệ Gamification & Tối ưu hóa hiệu năng (2.4.6, 4.2.5)
#### 📌 Nội dung Slide:
* **Thiết kế Backend cho Gamification (Mục 4.2.5):**
  * **Nhiệm vụ hàng ngày (`DailyMission`):** Spring Boot tự động kiểm tra và đồng bộ tiến độ qua bảng trung gian `UserDailyMission` khi người học hoàn thành bài học từ vựng, ngữ pháp hoặc luyện nói.
  * **Hệ thống XP và Streak:** Cộng điểm XP và cập nhật chuỗi ngày học liên tục (Streak) được lưu trữ tập trung tại bảng `ProfileStats` để thúc đẩy động lực.
  * **Nhật ký hoạt động:** Ghi nhận hoạt động (`UserActivity`) để vẽ biểu đồ đóng góp (Heatmap) trên giao diện.
* **Tối ưu hóa hiệu năng & Caching:**
  * Sử dụng bộ nhớ đệm in-memory **Caffeine Cache** tại tầng Service.
  * Lưu trữ sẵn dữ liệu xếp hạng thi đua (`LeaderboardEntry`) giúp giảm thiểu số lượng truy vấn PostgreSQL nặng khi đua bảng xếp hạng thời gian thực.
  * Lưu trữ cache các dữ liệu tĩnh ít biến động: danh sách chủ đề (`Topic`), ghi chú ngữ pháp (`GrammarNote`), và các kịch bản luyện nói mẫu (`SpeakingScenario`).

#### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Giao diện Leaderboard & Heatmap đóng góp:** Chèn hình ảnh trực quan của bảng xếp hạng thi đua và ô lưới hoạt động học tập (Heatmap) thực tế từ UI để slide sinh động và thể hiện được tính năng Gamification hoàn chỉnh.

---

### Kiểm thử hệ thống: Unit Testing & Integration Testing (4.4.1, 4.4.2)
#### 📌 Nội dung Slide:
* **Kiểm thử tự động Unit Testing (4.4.1):**
  * **Backend:** Sử dụng **JUnit 5** làm nền tảng kết hợp **Mockito** giả lập (mock) dependencies (như Repositories, External Services) giúp tập trung test logic lớp Service độc lập mà không cần khởi tạo Database. Dùng **AssertJ** để viết assertions trực quan.
  * **Thuật toán lõi:** Kiểm thử thuật toán `FsrsAlgorithm` với các bộ dữ liệu toán học (Mathematical Test Cases) để đảm bảo các giá trị Stability và Retrievability hoạt động chính xác.
  * **Frontend:** Sử dụng **Vitest** (hỗ trợ TypeScript) cùng **jsdom** giả lập trình duyệt, **V8 Coverage** đo lường độ bao phủ mã nguồn. Tập trung kiểm thử logic lập lịch ôn tập SRS tại Client (`src/lib/srs.test.ts`).
* **Kiểm thử REST API và Tích hợp (4.4.2):**
  * **Module Xác thực (`AuthServiceTest`):** Kiểm thử luồng đăng ký trùng lặp email, cơ chế cấp phát Access/Refresh Token, mã hóa mật khẩu BCrypt, và cơ chế chống dò tìm email (anti-enumeration).
  * **Module Từ vựng (`VocabServiceTest`):** Kiểm thử phân trang, tìm kiếm chủ đề theo từ khóa và thuật toán hòa trộn tiến độ người dùng (`UserVocabProgress`).
  * **Bảng tổng hợp kết quả (Bảng 4.4.2.4):** Đạt tỷ lệ vượt qua **100%** trên tổng số **55 test cases** (Xác thực: 12, Từ vựng: 15, Thuật toán FSRS: 20, AI Speaking: 8).

#### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!NOTE]
> **Bảng kết quả kiểm thử tự động:** Hiển thị trực quan bảng tổng hợp kết quả kiểm thử 55 test cases của Backend để chứng minh độ ổn định và chất lượng kỹ nghệ phần mềm của hệ thống.

---

## Phần 4: CI/CD & Demo sản phẩm

### Đóng gói Container Docker Multi-stage & Quy trình CI/CD (4.3.1, 4.3.2, 4.3.4)
#### 📌 Nội dung Slide:
* **Chiến lược đóng gói Dockerfile Multi-stage Build:**
  * **Stage 1 (Build):** Dùng Maven image chạy lệnh `mvn clean package` để biên dịch và tạo file JAR.
  * **Stage 2 (Run):** Chỉ sao chép duy nhất file JAR sang JRE image tinh giản dựa trên Alpine để khởi chạy ứng dụng.
  * **Hiệu quả:** Thu gọn kích thước Docker Image từ 820 MB xuống còn 180 MB, loại bỏ toàn bộ mã nguồn thô và công cụ biên dịch thừa, hỗ trợ giảm thiểu bề mặt tấn công bảo mật.
* **Quy trình Tích hợp và Triển khai tự động CI/CD (Mục 4.3.2):**
  * **Continuous Integration (CI):** Khi mã nguồn được push lên GitHub, luồng GitHub Actions tự động chạy, dựng Docker container test, và thực thi bộ 55 Unit Tests để kiểm tra chất lượng code.
  * **Continuous Deployment (CD):**
    * *Frontend Next.js:* Tự động deploy lên Vercel Edge Network.
    * *Backend Java:* Tự động đóng gói Docker Container và deploy lên Render PaaS.
    * *Database:* PostgreSQL vận hành trên Supabase Cloud.
* **Khả năng tự phục hồi và Quản lý lỗi:** Tích hợp cơ chế ngắt mạch **Resilience4j Circuit Breaker** để tự động ngắt kết nối tạm thời bảo vệ tài nguyên JVM khi các API AI ngoại vi gặp sự cố hoặc phản hồi quá chậm.

#### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN CÁC SƠ ĐỒ TRÊN SLIDE:**  
> **Sơ đồ quy trình đóng gói đa tầng Multi-stage Build (mục 4.3.1) & Sơ đồ kiến trúc triển khai vật lý hệ thống trên hạ tầng đám mây (mục 4.3.2.2)**  
> *(Vẽ sơ đồ mô tả JVM triển khai Docker Container kết nối an toàn với Supabase, Vercel và Render, kèm logo GitHub Actions chạy thành công).*

---

### Live Demo các chức năng chính của hệ thống (3.8.3, 4.5)
#### 📌 Nội dung Slide:
* **Môi trường Live Demo các chức năng chính:**
  * **Speaking Room (Luyện nói với AI):** Chọn kịch bản -> Mở mic thu âm -> Nhận chấm điểm phát âm chi tiết (tính điểm trôi chảy, ngữ điệu, hiển thị biểu đồ cao độ Pitch Intonation) từ Azure Speech SDK -> Gemini AI phản hồi đàm thoại và sửa lỗi ngữ pháp.
  * **Vocabulary Hub & Flashcards:** Trải nghiệm học từ vựng trực quan, lật thẻ Flashcard hai mặt và tự động lên lịch ôn tập ngắt quãng thông qua thuật toán FSRS.
  * **SmartLens (Dịch ảnh OCR):** Upload ảnh -> Hệ thống quét văn bản bằng OCR của Azure Vision -> Hiển thị bản dịch đè khít lên vị trí chữ gốc.
  * **Dorara AI Companion:** Trợ lý ảo hỗ trợ học tập, trả lời dạng văn bản streaming thông qua Server-Sent Events (SSE) hiển thị cùng mô hình avatar 3D chuyển động mượt mà.
  * **Study Plan & User Dashboard:** Quản lý kế hoạch học tập cá nhân hóa và hiển thị biểu đồ thống kê học tập Recharts.

#### 🖼️ Hình ảnh trình bày trên Slide:
> [!NOTE]  
> **TÊN CÁC HÌNH ẢNH TRÊN FIGMA/SLIDE:**  
> **Giao diện trang chủ Landing page (mục 4.5.1) & Giao diện phòng luyện nói chấm điểm phát âm AI (mục 4.5.3)**  
> *(Hiển thị giao diện thực tế của ứng dụng, đặc biệt là Speaking Room kèm biểu đồ Pitch Intonation để tăng tính thuyết phục).*

---

## Phần 5: Kết luận & Định hướng phát triển

### Tổng kết & Hướng phát triển (Chương 5)
#### 📌 Nội dung Slide:
* **Mức độ hoàn thiện đề tài (Mục 5.2):** Đồ án đã hoàn thành toàn bộ các mục tiêu đề ra: Xây dựng thành công các phân hệ chức năng cốt lõi và hỗ trợ trên nền tảng Backend Java Spring Boot vững chắc kết hợp Frontend Next.js bảo mật.
* **Ưu điểm thực tế (Mục 5.3.1):** 
  * Tiếp cận theo hướng tích hợp dịch vụ AI (AI Integration), khai thác các dịch vụ đám mây thương mại.
  * Tự làm chủ và hiện thực hóa thuật toán toán học ôn tập FSRS bằng Java chạy local không phụ thuộc API ngoài.
  * Kiến trúc phân tầng Full-Stack bảo mật, có khả năng chịu tải hiệu quả nhờ Virtual Threads và tự động hóa CD trên đám mây.
* **Hạn chế hiện tại (Mục 5.3.2):**
  * Hiện tượng khởi động nguội (Cold Start) khi khởi chạy container do Backend sử dụng gói máy chủ Render miễn phí.
  * Phụ thuộc vào kết nối Internet liên tục và tính sẵn sàng của các nhà cung cấp đám mây API.
* **Hướng phát triển tiếp theo (Mục 5.4):**
  * Nghiên cứu tích hợp các mô hình ngôn ngữ lớn gọn nhẹ chạy cục bộ (Local LLM - Gemma 2B, Llama 3B) để giảm chi phí API và nâng cao tính độc lập của Backend.
  * Xây dựng chế độ học ngoại tuyến (Offline Mode) cho Flashcard SRS.
  * Mở rộng thêm nhiều ngôn ngữ rèn luyện khác như tiếng Nhật, tiếng Trung, và tiếng Hàn.

#### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Sơ đồ Lộ trình nâng cấp (Roadmap):** Infographic biểu diễn hướng phát triển tiếp theo ở mục 5.4, đặc biệt là bước tích hợp mô hình ngôn ngữ lớn cục bộ (Local LLM - Gemma/Llama) và chế độ học ngoại tuyến (Offline Mode) để kết thúc bài thuyết trình thật ấn tượng.
