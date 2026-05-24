# KỊCH BẢN THUYẾT TRÌNH ĐỒ ÁN: DAILYENG
**Thời lượng thuyết trình dự kiến:** 15 - 20 phút | **Trọng tâm công nghệ:** Tích hợp AI trên nền Backend Java Spring Boot 3.4 và Java 21 kết hợp Frontend Next.js 15

## SLIDE 1: GIỚI THIỆU ĐỀ TÀI & BỐI CẢNH
* **Phần:** 1. Tổng quan đề tài & Công nghệ sử dụng
* **Nội dung:** Giới thiệu đề tài & Bối cảnh thực tiễn
### 📌 Nội dung Slide (Bullet points):
* **Tên đề tài đồ án:** Nghiên cứu và xây dựng DailyEng - Ứng dụng học tiếng Anh tích hợp Trí tuệ nhân tạo AI và Thuật toán lặp lại ngắt quãng FSRS.
* **Bối cảnh thực tiễn:** 
  * Nhu cầu học tiếng Anh giao tiếp và tích lũy từ vựng ngày càng tăng.
  * Người học thường thiếu môi trường thực hành phản xạ đàm thoại trực tiếp và dễ quên từ vựng nếu không ôn tập đúng thời điểm.
* **Định hướng giải pháp:**
  * Xây dựng nền tảng học tập khép kín dạng **Ứng dụng tích hợp AI (AI-Integrated Web Application)**, lấy Kỹ nghệ phần mềm và tối ưu hệ thống làm trọng tâm.
  * Tích hợp trực tiếp các dịch vụ AI đám mây (Azure Speech SDK, Gemini API) ở Backend để chấm điểm phát âm và đàm thoại chất lượng cao.
  * Tự lập trình thuật toán toán học FSRS bằng ngôn ngữ Java chạy local để cá nhân hóa lịch ôn tập từ vựng của người dùng.

### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Sơ đồ chu trình học ngoại ngữ khép kín:** Vòng tròn mô tả quá trình học tập khép kín kết hợp chặt chẽ giữa học lý thuyết, thực hành phản xạ nói với AI và tự động lập lịch ôn tập dài hạn qua FSRS để tạo ấn tượng tổng quan đầu tiên cho thầy/cô.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Em xin chào thầy/cô và các bạn. Em xin phép đại diện nhóm trình bày báo cáo về đề tài: **Nghiên cứu và xây dựng DailyEng - Ứng dụng học tiếng Anh tích hợp Trí tuệ nhân tạo AI và Thuật toán lặp lại ngắt quãng FSRS**.
> 
> Trong quá trình tìm hiểu thực tiễn học ngoại ngữ, nhóm em nhận thấy người học tại Việt Nam thường gặp khó khăn ở hai khía cạnh: thiếu môi trường thực hành phản xạ nói tự nhiên và chưa có phương pháp để ghi nhớ từ vựng dài hạn. 
> 
> Nhằm giải quyết các vấn đề trên, đồ án này hướng tới xây dựng một ứng dụng học tập hỗ trợ chu trình học khép kín, lấy kỹ nghệ phần mềm và tối ưu hệ thống làm trọng tâm. Backend bằng Java Spring Boot sẽ đóng vai trò điều phối, tích hợp tối ưu các dịch vụ AI đám mây của Azure và Google để đảm bảo chất lượng phản hồi tốt nhất, đồng thời tự lập trình thuật toán ôn tập ngắt quãng FSRS trực tiếp bằng Java để cá nhân hóa lịch học từ vựng nội bộ."*

---

## SLIDE 1B: MỤC LỤC NỘI DUNG BÁO CÁO
* **Phần:** Mục lục nội dung báo cáo
* **Nội dung:** Mục lục báo cáo
### 📌 Nội dung Slide (Bullet points):
* **Phần 1: Tổng quan đề tài & Công nghệ sử dụng** (Slide 1 - 4)
* **Phần 2: Phân tích yêu cầu & Thiết kế hệ thống** (Slide 5 - 10)
* **Phần 3: Triển khai và kiểm thử hệ thống** (Slide 11 - 15)
* **Phần 4: CI/CD & Demo sản phẩm** (Slide 16 - 17)
* **Phần 5: Kết luận & Định hướng phát triển** (Slide 18)

### 🎙️ Script thuyết trình (0.5 phút):
> *"Sau đây, em xin phép tóm tắt bố cục nội dung báo cáo ngày hôm nay gồm 5 phần chính: Phần đầu tiên giới thiệu về bối cảnh đề tài, thực trạng và giới thiệu sơ lược về hệ sinh thái công nghệ sử dụng; phần 2 đi sâu vào phân tích yêu cầu từ use case, sitemap giao diện Figma đến thiết kế cơ sở dữ liệu ERD và cấu trúc OOP trong Spring Boot; phần 3 tập trung vào việc triển khai mã nguồn backend, tích hợp các thuật toán và kiểm thử hệ thống; phần 4 trình bày quy trình đóng gói, thiết lập CI/CD và live demo trực tiếp các tính năng; và cuối cùng phần 5 tổng kết ưu/nhược điểm và định hướng phát triển trong tương lai."*

---

## SLIDE 2: ĐẶT VẤN ĐỀ & KHẢO SÁT THỰC TIỄN
* **Phần:** 1. Tổng quan đề tài & Công nghệ sử dụng
* **Nội dung:** Đặt vấn đề, Khảo sát thực tế & Mục tiêu đề tài
### 📌 Nội dung Slide (Bullet points):
* **Thực trạng người học:** Thiếu môi trường giao tiếp phản xạ tự nhiên, chi phí học 1-1 cao và khả năng ghi nhớ từ vựng suy giảm nhanh (đường cong quên lãng).
* **Khảo sát thị trường (Mục 1.3.2):** Các giải pháp hiện tại (PrepTalk, YouPass, Luyennoi) bị phân mảnh — chỉ tập trung vào bài học tĩnh, trắc nghiệm chuẩn hóa hoặc chấm điểm phát âm đơn thuần, thiếu tính năng tương tác đàm thoại phản xạ 2 chiều thông minh kết hợp ôn tập ngắt quãng động cho từ vựng.
* **Phân rã mục tiêu đề tài (Mục 1.4):**
  * **Mục tiêu kiến thức (Mục 1.4.1):** Nghiên cứu Java 21 (Virtual Threads), Spring Boot 3.4, tích hợp các AI SDK và thuật toán FSRS.
  * **Mục tiêu sản phẩm (Mục 1.4.2):** Xây dựng ứng dụng DailyEng đồng bộ 6 phân hệ cốt lõi tạo chu trình học tập khép kín.
* *(Dữ liệu thống kê thực tế và số liệu khảo sát người dùng lấy ở Mục 1.3.1 & 1.3.3 trong báo cáo)*

### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Đồ thị Đường cong quên lãng (Forgetting Curve) của Ebbinghaus & Biểu đồ khảo sát người dùng:** Biểu diễn trực quan tỷ lệ suy giảm trí nhớ tự nhiên để dẫn dắt lý do cần thuật toán FSRS, kết hợp biểu đồ khảo sát khó khăn của người học (như thiếu môi trường luyện phản xạ nói) từ mục 1.3.3.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Dạ thưa thầy/cô và các bạn, qua khảo sát các website học tiếng Anh phổ biến hiện nay như PrepTalk, YouPass và Luyennoi, nhóm em nhận thấy các giải pháp hiện tại đều khá phân mảnh: hoặc chỉ mạnh về đàm thoại nhưng chi phí cao, hoặc chỉ học từ vựng tĩnh mà thiếu đi tính tương tác đàm thoại phản xạ và chưa tối ưu lịch ôn tập tự động. 
> 
> Từ thực trạng đó, đồ án DailyEng đặt ra hai mục tiêu rõ ràng: về mặt kiến thức là làm chủ công nghệ Java 21, Spring Boot 3.4 và thuật toán lặp lại ngắt quãng FSRS; còn về sản phẩm là xây dựng thành công một ứng dụng học tập khép kín, tiện lợi và tối ưu chi phí cho người dùng."*

---

## SLIDE 3: GIẢI PHÁP & CÁC PHÂN HỆ CỐT LÕI CỦA DAILYENG
* **Phần:** 1. Tổng quan đề tài & Công nghệ sử dụng
* **Nội dung:** Giải pháp & Phân hệ cốt lõi
### 📌 Nội dung Slide (Bullet points):
* **Giải pháp tổng thể:** Xây dựng nền tảng học tiếng Anh tích hợp AI hỗ trợ học viên từ lý thuyết, lưu trữ đến thực hành phản xạ.
* **Sáu phân hệ cốt lõi:**
  1. **Speaking Room:** Luyện nói phản xạ tự do và chấm điểm phát âm chi tiết bằng AI.
  2. **Vocabulary Hub:** Học từ vựng theo chủ đề qua thẻ Flashcard trực quan.
  3. **Grammar Hub:** Hệ thống lý thuyết ngữ pháp và bài tập trắc nghiệm củng cố kiến thức.
  4. **Notebook:** Sổ tay lưu giữ từ vựng và quy tắc ngữ pháp đã đánh dấu hoặc tự tạo.
  5. **Dorara AI Companion:** Trợ lý ảo hỗ trợ giải thích ngữ pháp và từ vựng thời gian thực.
  6. **Translate & SmartLens:** Dịch thuật văn bản và quét trích xuất chữ từ hình ảnh để dịch trực tiếp.
* **Hệ thống hỗ trợ:** Kế hoạch học tập (Study Plan), Kiểm tra trình độ đầu vào (Placement Test) và Gamification (Nhiệm vụ, Streak, Leaderboard).

### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Collage Mockup giao diện của 6 phân hệ:** Hình ảnh ghép phối cảnh đẹp mắt giao diện thực tế của Speaking Room, Vocabulary Hub, Grammar Hub, Notebook, Dorara và SmartLens để thầy/cô hình dung ngay quy mô và tính đa dạng của sản phẩm.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Hệ thống DailyEng được thiết kế để tạo nên một chu trình học tập khép kín từ lý thuyết đến thực hành phản xạ. 
> 
> Sáu phân hệ cốt lõi bao gồm: **Speaking Room** giúp luyện nói phản xạ và nhận chấm điểm chi tiết từ AI; **Vocabulary Hub** và **Grammar Hub** cung cấp kho kiến thức nền tảng có hệ thống. Khi học viên gặp từ mới hoặc cấu trúc ngữ pháp cần lưu ý, họ có thể lưu vào **Notebook** để ôn tập lại bằng thẻ Flashcard. Để tăng tính tương tác, nhóm em phát triển trợ lý ảo **Dorara** giao tiếp thời gian thực, và tính năng **SmartLens** giúp người học tải ảnh lên, nhận diện chữ viết bằng OCR và dịch thuật trực tiếp đè lên ảnh gốc.
> 
> Bên cạnh đó, hệ thống còn hỗ trợ làm bài **Kiểm tra đầu vào** để gợi ý **Kế hoạch học tập**, đồng thời duy trì động lực học bằng cơ chế **Gamification** tích lũy điểm XP, giữ chuỗi Streak học tập và đua bảng xếp hạng Leaderboard."*

---

## SLIDE 4: CÔNG NGHỆ SỬ DỤNG (TECH STACK)
* **Phần:** 1. Tổng quan đề tài & Công nghệ sử dụng
* **Nội dung:** Giới thiệu công nghệ sử dụng
### 📌 Nội dung Slide (Bullet points):
* **Kiến trúc phân tách Client - Server:**
  * **Frontend (Next.js 15 & React 19):** Sử dụng React Server Components (RSC) tối ưu hóa kết xuất trang, Zustand quản lý trạng thái, Next.js Server Actions đóng vai trò BFF (Backend-For-Frontend) che giấu API endpoint, kết hợp WebGL (Three.js) cho nhân vật 3D và Recharts để vẽ biểu đồ học tập.
  * **Backend (Spring Boot 3.4 & Java 21):** Trung tâm điều phối, xử lý logic nghiệp vụ và bảo mật. Sử dụng Java 21 Virtual Threads (Project Loom) tối ưu I/O nghẽn, Spring Data JPA & Hibernate ORM, Caffeine Cache, và Flyway quản lý phiên bản database.
* **Tích hợp dịch vụ AI tối ưu (SaaS Integration):**
  * Sử dụng API/SDK chính thức từ các nhà cung cấp đám mây lớn (Microsoft, Google) để đạt độ chính xác cao nhất mà không cần tốn tài nguyên huấn luyện mô hình (Speech Service, Translator, Vision OCR, Gemini 2.5).
  * Backend Java đóng vai trò tiền xử lý dữ liệu, bóc tách kết quả AI và đồng bộ hóa nghiệp vụ.
  * **Hỗ trợ khác:** Auth.js (BFF authentication), Cloudinary (lưu trữ hình ảnh avatar), Sentry (giám sát lỗi), Resilience4j (ngắt mạch Circuit Breaker).
* **Thuật toán ôn tập khoa học FSRS-4.5:**
  * Thuật toán ôn tập ngắt quãng (Free Spaced Repetition Scheduler) được tự cài đặt bằng ngôn ngữ Java chạy local.

### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Sơ đồ khối Tech Stack (Next.js - Spring Boot):** Mindmap các biểu tượng logo công nghệ kết nối với nhau, mô tả vai trò của từng thành phần (Zustand, Three.js, Spring Boot, Java 21, Supabase, Azure SDK, Gemini SDK, Docker) tạo cảm giác chuyên nghiệp.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để hiện thực hóa DailyEng, nhóm em đã lựa chọn một hệ sinh thái công nghệ bổ trợ lẫn nhau một cách tối ưu theo hướng **Ứng dụng tích hợp AI (AI-Integrated Web Application)**.
> 
> Phía Client sử dụng **Next.js 15** và **React 19** với React Server Components giúp tối ưu giao diện và tốc độ tải. Next.js Server Actions đóng vai trò BFF bảo mật, tích hợp Auth.js để xác thực và ẩn endpoint Backend. Ngoài ra, nhóm em còn dùng WebGL Three.js dựng trợ lý ảo 3D sinh động và Recharts trực quan hóa dữ liệu học tập.
> 
> Trọng tâm là **Backend Java Spring Boot 3.4** chạy trên **Java 21**. Nhờ Virtual Threads, Backend duy trì hiệu năng cao khi nhiều người dùng gọi AI đồng thời. Cơ sở dữ liệu PostgreSQL được quản lý phiên bản chuyên nghiệp qua Flyway và truy vấn được tối ưu bằng Caffeine Cache.
> 
> Về AI, thay vì tự huấn luyện mô hình tốn kém tài nguyên tính toán, nhóm em áp dụng chiến lược **tích hợp dịch vụ (SaaS Integration)**: sử dụng các SDK chính thức của Microsoft Azure và Google để đạt độ chính xác và chất lượng cao nhất. Backend Java sẽ **điều phối luồng dữ liệu, tiền xử lý và bóc tách kết quả AI** để xử lý nghiệp vụ học tập. Đặc biệt, nhóm em tự lập trình **thuật toán FSRS** bằng Java chạy hoàn toàn local để cá nhân hóa lịch học từ vựng."*

---

## SLIDE 5: SƠ ĐỒ USE CASE TỔNG QUÁT HỆ THỐNG
* **Phần:** 2. Phân tích yêu cầu & Thiết kế hệ thống
* **Nội dung:** Sơ đồ Use Case tổng quát & Đặc tả Use Case cốt lõi
### 📌 Nội dung Slide (Bullet points):
* **Phân quyền người dùng rõ ràng:**
  * **Khách:** Đăng ký, đăng nhập tài khoản, làm bài kiểm tra trình độ đầu vào (Placement Test).
  * **Người học:** Thực hiện đầy đủ các chức năng học từ vựng, ngữ pháp, luyện nói với AI, quản lý sổ tay cá nhân, theo dõi tiến độ và tham gia gamification.
* **Bốn Use Case cốt lõi thiết kế chi tiết (Mục 3.2.2):**
  * **Use Case 1 (Đăng ký tài khoản):** Xác thực an toàn qua form hoặc OAuth2, đồng bộ dữ liệu người dùng.
  * **Use Case 2 (Luyện nói với AI):** Đàm thoại phản xạ 2 chiều qua microphone, chấm điểm phát âm chi tiết cấp độ âm vị.
  * **Use Case 3 (Học từ vựng với Flashcards):** Đánh giá thẻ học, gọi thuật toán FSRS để tự động cập nhật lịch ôn tập.
  * **Use Case 4 (Chat với Dorara AI):** Giao tiếp thời gian thực, stream văn bản giải đáp kiến thức học tập.
* *(Đặc tả chi tiết các bước thực hiện và kịch bản lỗi lấy ở Mục 3.2.2 trong báo cáo)*

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Biểu đồ Use Case tổng quát của hệ thống DailyEng (nằm ở mục 3.2.1)**  
> *(Hiển thị sơ đồ Use Case vẽ bằng Mermaid từ Chương 3 - Mục 3.2.1. Đảm bảo cấu trúc rõ ràng với 3 phân vùng subgraph màu sắc Pastel nhã nhặn: Phân hệ tài khoản, Phân hệ học tập và đánh giá, Phân hệ trợ lý và tiện ích).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Xin mời thầy/cô và các bạn quan sát **Biểu đồ Use Case tổng quát của hệ thống DailyEng**. Hệ thống được chia thành hai nhóm đối tượng chính là Khách và Người học. Khách chưa đăng nhập có thể thực hiện kiểm tra trình độ đầu vào để hệ thống gợi ý lộ trình học phù hợp. 
> 
> Đối với Người học, hệ thống sẽ mở khóa toàn bộ các chức năng học tập chuyên sâu. 
> 
> Trong báo cáo, nhóm em đặc tả chi tiết 4 Use Case cốt lõi bao gồm: Đăng ký tài khoản, Luyện nói với AI, Học từ vựng với Flashcard, và Chat với trợ lý ảo Dorara. Ở mỗi Use Case, nhóm em đều phân tích kỹ lưỡng luồng sự kiện chính (Basic Flow), các luồng phụ (Alternative Flows) và các kịch bản xử lý lỗi ngoại lệ (Exception Flows) ở Mục 3.2.2 trong báo cáo nhằm đảm bảo tính toàn vẹn và logic khi vận hành thực tế."*

---

## SLIDE 6: SƠ ĐỒ KIẾN TRÚC PHẦN TẦNG LOGIC (FULL-STACK)
* **Phần:** 2. Phân tích yêu cầu & Thiết kế hệ thống
* **Nội dung:** Kiến trúc hệ thống tổng quan & Vai trò của Java Backend
### 📌 Nội dung Slide (Bullet points):
* **Kiến trúc phân tầng chuẩn hóa:**
  * **Client Layer:** Next.js 15 kết hợp React 19, sử dụng Zustand quản lý trạng thái toàn cục tinh gọn. Tích hợp thư viện WebGL Three.js cho nhân vật 3D và Recharts để hiển thị biểu đồ học tập trực quan.
  * **BFF Layer (Next.js Server Actions):** Đóng vai trò cổng Facade trung gian, phối hợp với Auth.js để quản lý session và đính kèm JWT Token từ Cookie HttpOnly bảo mật, tránh lộ API endpoint Backend trực tiếp và chống tấn công XSS.
  * **Server Layer (Spring Boot 3.4 & Java 21):** Trung tâm xử lý logic nghiệp vụ và bảo mật. Phân chia package module hóa rõ ràng: `auth`, `vocabulary`, `grammar`, `speaking`, `srs`, `xp`. Tích hợp Caffeine Cache tại tầng Service để giảm tải cho database.
  * **Data Layer:** PostgreSQL 16 triển khai trên Supabase Cloud, quản lý kết nối qua Connection Pooling HikariCP được cấu hình tối ưu.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Sơ đồ kiến trúc phân tầng logic (Full-Stack) và luồng giao tiếp (nằm ở mục 3.4)**  
> *(Vẽ lại sơ đồ kiến trúc ở Chương 3 - Mục 3.4 mô tả 4 tầng chính: Client Layer, BFF Layer, Server Layer, và Database Layer).*

### 🎙️ Script thuyết trình (2 phút):
> *"Để đảm bảo tính độc lập, dễ mở rộng và bảo mật, hệ thống được thiết kế theo cấu trúc phân tầng Full-Stack như mô tả trên sơ đồ. 
> 
> Ở phía Client, nhóm em phát triển giao diện bằng Next.js 15 để tối ưu hóa tốc độ tải trang, sử dụng Zustand quản lý trạng thái client gọn nhẹ, kết hợp Three.js cho trợ lý 3D và Recharts để vẽ biểu đồ tiến độ học tập.
> 
> Lớp trung gian BFF sử dụng Next.js Server Actions tích hợp Auth.js giúp giải quyết vấn đề CORS, hoạt động như một lớp bảo vệ che giấu các địa chỉ endpoint Backend và tự động đính kèm mã JWT Token từ Cookie HttpOnly bảo mật. 
> 
> Trọng tâm của đồ án là tầng Backend API được xây dựng bằng **Java Spring Boot 3.4** chạy trên nền **Java 21**. Hệ thống mã nguồn Java được phân chia theo kiến trúc module khoa học. Để tối ưu hóa hiệu năng, nhóm em sử dụng connection pool **HikariCP** kết hợp với bộ nhớ đệm in-memory **Caffeine** tại tầng Service, giúp giảm số lượng truy vấn trực tiếp vào cơ sở dữ liệu PostgreSQL phía dưới khi người dùng yêu cầu các dữ liệu tĩnh như chủ đề hay bài học."*

---

## SLIDE 7: THIẾT KẾ CƠ SỞ DỮ LIỆU & QUẢN LÝ PHIÊN BẢN FLYWAY
* **Phần:** 2. Phân tích yêu cầu & Thiết kế hệ thống
* **Nội dung:** Thiết kế cơ sở dữ liệu, Định danh CUID2 & Flyway Migration
### 📌 Nội dung Slide (Bullet points):
* **Thiết kế thực thể JPA và Cấu trúc cơ sở dữ liệu:**
  * Cơ sở dữ liệu PostgreSQL gồm 35 bảng, được ánh xạ chặt chẽ thông qua Spring Data JPA.
  * Các bảng chính: `User` (trung tâm), `Topic`, `VocabItem`, `SpeakingSession`, `UserVocabProgress`.
  * Thiết kế lớp cha trừu tượng `BaseEntity` để tự động hóa các trường auditing như ngày tạo và ngày cập nhật.
* **Định danh CUID2 thay thế cho UUID:**
  * CUID2 dài 25 ký tự, được tạo tự động tại sự kiện `@PrePersist` bằng thư viện CUID cho Java.
  * **Hiệu suất chỉ mục:** Có tính chất k-sortable giúp duy trì thứ tự sắp xếp vật lý khi chèn bản ghi mới, tối ưu hiệu suất cây chỉ mục B-Tree trong PostgreSQL.
  * **Bảo mật hệ thống:** Ngăn chặn các lỗ hổng rò rỉ dữ liệu thông qua việc dò đoán ID tài nguyên trên đường dẫn URL.
* **Quản lý phiên bản Database với Flyway (Mục 2.3.2):**
  * Quản lý sự thay đổi cấu trúc DB thông qua các file migration SQL có đánh số phiên bản (`V1__init.sql`, `V2__add_index.sql`).
  * Tự động hóa quá trình đồng bộ hóa cơ sở dữ liệu giữa các môi trường phát triển (Local) và triển khai (Supabase Cloud).
  * Tránh xung đột cấu trúc dữ liệu khi làm việc nhóm và bảo vệ tính toàn vẹn của dữ liệu trong sản xuất.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Sơ đồ thực thể kết hợp ERD chi tiết của hệ thống DailyEng (nằm ở mục 3.3.1)**  
> *(Hiển thị sơ đồ ERD chi tiết từ mục 3.3.1 biểu diễn mối quan hệ giữa User, UserVocabProgress, VocabItem, SpeakingSession, và NotebookItem).*
> [!TIP]
> **Hình ảnh bổ trợ:** Có thể chèn thêm hình ảnh chụp thực tế cấu trúc thư mục migrations của Flyway (các tệp tin `.sql` được đánh số thứ tự như `V1__init.sql`, `V2__...sql`) nhằm chứng minh tính chuyên nghiệp trong quản trị DB ở mục 2.3.2.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Tiếp theo, em xin trình bày về cấu trúc dữ liệu ở Backend. Toàn bộ 35 bảng trong database PostgreSQL được ánh xạ sang các thực thể Java thông qua **Spring Data JPA** như sơ đồ ERD trên slide. 
> 
> Trong cấu trúc này, bảng User đóng vai trò trung tâm, liên kết với thông tin học tập ProfileStats, kế hoạch StudyPlan, các phiên luyện nói SpeakingSession và tiến trình từ vựng UserVocabProgress. 
> 
> Để quản lý định danh an toàn, tất cả các thực thể đều kế thừa lớp `BaseEntity` và tự động sở hữu cơ chế sinh khóa chính sử dụng chuỗi **CUID2**. CUID2 giúp PostgreSQL tối ưu hóa hiệu năng khi chèn dữ liệu mới, đồng thời giúp bảo vệ an toàn cho đường dẫn URL, ngăn ngừa các lỗ hổng rò rỉ thông tin. 
> 
> Đặc biệt, để quản lý thay đổi cấu trúc cơ sở dữ liệu một cách nhất quán, nhóm em tích hợp **Flyway Migration**. Mọi thay đổi cấu trúc bảng đều được ghi nhận dưới dạng file SQL có đánh số phiên bản, tự động chạy khi start server, giúp đồng bộ DB tức thời giữa local và đám mây Supabase mà không gặp xung đột."*

---

## SLIDE 8: THIẾT KẾ HƯỚNG ĐỐI TƯỢNG & DESIGN PATTERNS TRONG CODE JAVA
* **Phần:** 2. Phân tích yêu cầu & Thiết kế hệ thống
* **Nội dung:** Thiết kế hướng đối tượng & Design Patterns (Backend & Frontend)
### 📌 Nội dung Slide (Bullet points):
* **Tính chất OOP trong cấu trúc mã nguồn Java:**
  * **Đóng gói:** Các thuộc tính Entity và DTO được bảo vệ bằng phạm vi truy cập `private`, chỉ truy xuất qua các phương thức Getter/Setter hoặc sử dụng **Java Records** của Java 21 để định nghĩa các DTO bất biến.
  * **Kế thừa:** Sử dụng kế thừa để tổ chức các tầng xử lý và thực thể dùng chung như `BaseEntity`, `BaseService`.
  * **Đa hình:** Định nghĩa các Repository interface kế thừa đa hình từ `JpaRepository` để thực hiện các bộ lọc tìm kiếm động.
* **Các mẫu thiết kế (Design Patterns) áp dụng:**
  * **MVC, Repository và Service Layer Pattern:** Tách biệt logic truy xuất cơ sở dữ liệu vật lý khỏi logic xử lý nghiệp vụ tại tầng Service và trình diễn tại Controller.
  * **DTO Pattern:** Chuyển đổi Entity gốc sang DTO Record trước khi gửi về Client nhằm loại bỏ các trường thông tin nhạy cảm.
  * **Frontend Architecture:** Next.js Server Actions làm cổng BFF (Facade) che giấu API Backend; Zustand & Context Provider quản lý trạng thái client.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN CÁC SƠ ĐỒ TRÊN SLIDE:**  
> 1. **Sơ đồ quan hệ kế thừa các thực thể trong phân hệ luyện nói (Speaking Module) (nằm ở mục 3.5.1.2)** *(Biểu diễn cấu trúc ClassDiagram thể hiện tính Kế thừa từ BaseEntity cha).*  
> 2. **Luồng ánh xạ và chuyển đổi dữ liệu giữa Entity và DTO (nằm ở mục 3.4.2.5)** *(Mô tả quá trình ánh xạ Entity sang DTO tại tầng Service trước khi gửi phản hồi).*

### 🎙️ Script thuyết trình (2 phút):
> *"Để mã nguồn dự án Java có cấu trúc tốt, dễ bảo trì và mở rộng, nhóm em đã áp dụng các nguyên lý hướng đối tượng OOP và các Design Patterns tiêu chuẩn. 
> 
> Trên slide là sơ đồ thể hiện tính kế thừa trong phân hệ luyện nói và luồng chuyển đổi dữ liệu. Tại Backend Java, nhóm em triển khai mẫu thiết kế **Service Layer** và **Repository Pattern** để đảm bảo tính độc lập. Mọi logic nghiệp vụ từ điều phối bài học đến tính điểm đều nằm tại tầng Service. 
> 
> Ngoài ra, nhóm em áp dụng **DTO Pattern** bằng cách sử dụng tính năng **Java Records** mới của Java 21. Java Records đóng vai trò là những cấu trúc dữ liệu bất biến, giúp lọc bỏ các trường dư thừa hoặc nhạy cảm trước khi gửi về client. 
> 
> Phía Frontend Next.js cũng dùng Server Actions làm BFF đóng vai trò Facade che giấu các API Backend, kết hợp với Zustand quản lý trạng thái client tinh gọn, tạo nên một kiến trúc đồng bộ."*

---

## SLIDE 9: THIẾT KẾ RESTFUL API, BẢO MẬT & GIAO THỨC TRUYỀN DỮ LIỆU
* **Phần:** 2. Phân tích yêu cầu & Thiết kế hệ thống
* **Nội dung:** Thiết kế RESTful API chuẩn hóa, Xác thực bảo mật JWT & Giao thức SSE
### 📌 Nội dung Slide (Bullet points):
* **Xác thực không trạng thái (Stateless Authentication) & RBAC:**
  * Spring Security kiểm soát các yêu cầu qua bộ lọc `JwtAuthenticationFilter` để giải mã và kiểm tra chữ ký số của JWT Token.
  * Phân quyền truy cập an toàn dựa trên vai trò sử dụng chú thích `@PreAuthorize` trên tầng Controller của Java.
* **Hệ thống API chuẩn RESTful thiết kế mạch lạc:**
  * Backend Java module hóa đường dẫn rõ ràng theo chuẩn: `/api/auth`, `/api/speaking`, `/api/vocab`, `/api/grammar`, `/api/srs`, `/api/notebooks`.
  * Trả về định dạng JSON đồng nhất và sử dụng các mã trạng thái HTTP tiêu chuẩn.
* **Giao thức Server-Sent Events (SSE) (Mục 3.6.4):**
  * Cho phép thiết lập kết nối một chiều thời gian thực để Server push dữ liệu văn bản dạng stream về Client.
  * Áp dụng trực tiếp cho tính năng đàm thoại của trợ lý ảo Dorara AI, giúp hiển thị phản hồi chữ chạy mượt mà tức thời, giảm độ trễ trải nghiệm người dùng.
* **Cơ chế xử lý lỗi tập trung Exception Handling (Mục 3.6.6):**
  * Sử dụng bộ xử lý lỗi tập trung `@ControllerAdvice` kết hợp với `@ExceptionHandler`.
  * Tự động bắt toàn bộ các ngoại lệ (Exception) xảy ra trong luồng chạy của ứng dụng, chuyển đổi chúng thành cấu trúc JSON chuẩn hóa trả về Client kèm thông báo lỗi thân thiện.

### 🖼️ Sơ đồ & Bảng biểu trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ & BẢNG BIỂU TRÊN SLIDE:**  
> 1. **Sơ đồ tuần tự luồng xác thực JWT và lấy danh sách kịch bản trong DailyEng (nằm ở mục 3.8.1.2)** *(Sequence Diagram mô tả luồng xác thực và kiểm soát JWT của bộ lọc Spring Security).*  
> 2. **Bảng tổng hợp các API Endpoints hệ thống tiêu biểu (nằm ở mục 3.7.1)** *(Liệt kê các API chính dạng Server Actions như `/auth/login`, `/speaking/scenarios`, `/srs/review`, `/dorara/chat` để thầy/cô đánh giá).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để bảo mật hệ thống, nhóm em cấu hình kiến trúc xác thực không trạng thái sử dụng **Spring Security** kết hợp **JWT**. Mọi yêu cầu từ Client gửi lên đều đi qua bộ lọc `JwtAuthenticationFilter` để check token trong Cookie HttpOnly. Quyền hạn của người dùng cũng được kiểm soát chặt chẽ bằng `@PreAuthorize`.
> 
> Toàn bộ API Backend được thiết kế chuẩn RESTful trả về định dạng JSON đồng nhất. 
> 
> Đặc biệt, để xử lý đàm thoại thời gian thực với AI, nhóm em áp dụng giao thức **Server-Sent Events (SSE)**. Thay vì bắt người học chờ vài giây để nhận toàn bộ câu trả lời từ trợ lý ảo Dorara, SSE cho phép server đẩy từng từ ngay khi AI sinh ra, tạo hiệu ứng chữ chạy thời gian thực cực kỳ mượt mà. 
> 
> Đồng thời, nhóm em cũng triển khai cơ chế xử lý lỗi tập trung qua **`@ControllerAdvice`** để bắt toàn bộ lỗi runtime phát sinh và trả về thông báo lỗi thân thiện dưới dạng JSON chuẩn hóa, đảm bảo hệ thống luôn hoạt động ổn định và an toàn."*

---

## SLIDE 10: THIẾT KẾ GIAO DIỆN FIGMA & SƠ ĐỒ TRANG WEB (SITEMAP)
* **Phần:** 2. Phân tích yêu cầu & Thiết kế hệ thống
* **Nội dung:** Thiết kế Wireframe, Sitemap Figma & Luồng vận hành các Hub
### 📌 Nội dung Slide (Bullet points):
* **Sơ đồ trang web (Sitemap) & Wireframe Figma:**
  * Tổ chức cấu trúc và điều hướng hệ thống xoay quanh Dashboard trung tâm dẫn đến 7 phân hệ chính: Vocabulary Hub, Grammar Hub, Speaking Room, Notebook, Translate/SmartLens, Study Plan, và Profile cá nhân.
  * Phác thảo cấu trúc giao diện thô (Wireframe) trên Figma cho Homepage, Speaking Room (luồng trò chuyện và màn hình phản hồi), Vocabulary Hub, và Notebook nhằm định hình trải nghiệm người dùng (UX) tối ưu trước khi lập trình.
* **Quy trình vận hành các Hub học tập:**
  * Sơ đồ hóa luồng học tập khép kín: Học lý thuyết trực quan -> Thực hành làm bài tập củng cố -> Tự động cập nhật tiến độ học tập về PostgreSQL để thuật toán FSRS lập lịch ôn tập đúng thời điểm bộ não sắp quên.
  * *(Các bản vẽ wireframe chi tiết và sơ đồ sitemap lấy ở Mục 3.8 trong báo cáo)*

### 🖼️ Sơ đồ & Bảng biểu trình bày trên Slide:
> [!NOTE]  
> **TÊN CÁC SƠ ĐỒ TRÊN SLIDE:**  
> 1. **Sơ đồ các giao diện trang chính Sitemap của ứng dụng DailyEng (nằm ở mục 3.8.1.1)**  
> 2. **Quy trình vận hành các Hub (nằm ở mục 3.8.1)** *(Gồm các sơ đồ luồng chi tiết của Speaking Room, Vocabulary Hub, Grammar Hub, Notebook và Translate từ mục 3.8.1.2 đến 3.8.1.6).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để thiết kế ứng dụng tối ưu nhất, nhóm em đã xây dựng kiến trúc thông tin thông qua sơ đồ Sitemap và phác thảo giao diện thô (Wireframe) trên Figma cho các màn hình chính như Homepage, phòng đàm thoại Speaking Room, Vocabulary Hub và Notebook. 
> 
> Đồng thời, các luồng học tập trong hệ thống được vận hành rất khép kín và nhất quán. Quy trình này giúp người học tiếp nhận kiến thức từ lý thuyết, làm bài tập vận dụng và tự động lưu tiến độ vào cơ sở dữ liệu để thuật toán FSRS lập lịch ôn tập đúng thời điểm."*

---

## SLIDE 11: JAVA 21 VIRTUAL THREADS - TỐI ƯU CHO CÁC LUỒNG XỬ LÝ AI
* **Phần:** 3. Triển khai và kiểm thử hệ thống
* **Nội dung:** Java 21 Virtual Threads tối ưu xử lý I/O mạng
### 📌 Nội dung Slide (Bullet points):
* **Đặc thù của các tác vụ gọi dịch vụ AI:**
  * Quá trình Backend Java gọi các API trí tuệ nhân tạo như Azure Speech và Google Gemini thường mất từ 1.5 đến 4 giây để nhận phản hồi do phải chờ xử lý âm thanh hoặc sinh văn bản từ đám mây.
  * Mô hình Thread-per-request truyền thống của Spring Boot sử dụng platform threads của hệ điều hành dễ gây cạn kiệt luồng và nghẽn hệ thống khi có nhiều người dùng đồng thời thực hiện đàm thoại.
* **Giải pháp ứng dụng Java 21 Virtual Threads (Project Loom):**
  * Virtual Threads là các luồng siêu nhẹ do máy ảo JVM quản lý trực tiếp, không ánh xạ 1-1 với luồng của hệ điều hành.
  * Khi một luồng ảo chờ phản hồi API AI từ mạng (I/O Blocked), JVM tự động tháo luồng ảo đó ra khỏi luồng vật lý OS và nhường tài nguyên luồng vật lý đó cho yêu cầu xử lý khác.
  * **Hiệu quả thực nghiệm:** Giúp Spring Boot Backend duy trì hiệu suất xử lý ổn định, tiết kiệm bộ nhớ máy chủ tối đa khi xử lý đồng thời hàng ngàn phiên luyện nói và chat AI.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Sơ đồ cơ chế hoạt động của Virtual Threads khi xử lý các cuộc gọi API AI nghẽn I/O (nằm ở mục 2.1.1.1 hoặc 4.3.2.2)**  
> *(Vẽ sơ đồ mô tả JVM điều phối Virtual Threads: So sánh trực quan mô hình Thread-per-request truyền thống Platform Thread bị nghẽn và Virtual Threads của Java 21 tháo lắp luồng ảo linh hoạt, nhường Platform Thread xử lý tác vụ khác).*

### 🎙️ Script thuyết trình (2 phút):
> *"Một điểm nhấn công nghệ rất quan trọng ở Backend là việc ứng dụng tính năng **Virtual Threads** của Java 21. 
> 
> Dạ thưa thầy/cô, các chức năng như luyện đàm thoại hay chấm điểm giọng nói đòi hỏi Backend phải gọi API đến Azure và Google. Các tác vụ này tiêu tốn khá nhiều thời gian chờ phản hồi mạng, thường mất từ 1.5 đến 4 giây. 
> 
> Ở mô hình truyền thống, mỗi request sẽ chiếm dụng hoàn toàn một luồng vật lý của OS. Nếu nhiều người cùng đàm thoại một lúc, server sẽ rất dễ bị quá tải luồng và nghẽn hệ thống. 
> 
> Bằng cách cấu hình Spring Boot 3.4 chạy trên **Virtual Threads**, JVM sẽ tự động giải phóng luồng vật lý đang chờ phản hồi AI để phục vụ request khác. Khi có data trả về, luồng ảo sẽ được kích hoạt trở lại. Cơ chế này giúp Backend xử lý đồng thời số lượng lớn phiên hội thoại AI mà tốn cực kỳ ít tài nguyên RAM và CPU của server."*

---

## SLIDE 12: CƠ CHẾ JAVA TÍCH HỢP SPEECH ENGINE & DỊCH VỤ BÊN THỨ BA
* **Phần:** 3. Triển khai và kiểm thử hệ thống
* **Nội dung:** Tích hợp các SDK AI & Dịch vụ bên thứ ba ở Backend Java
### 📌 Nội dung Slide (Bullet points):
* **Tích hợp Azure Speech, Translator & Vision (OCR):**
  * **Azure Speech SDK:** Chấm điểm phát âm chi tiết cấp độ âm vị và ngữ điệu (Pitch).
  * **Azure AI Translator & Vision (OCR):** Dịch thuật song ngữ và trích xuất chữ viết từ ảnh (SmartLens) kèm tọa độ hiển thị.
* **Tích hợp Google Generative AI (Gemini):**
  * Tích hợp `gemini-2.5-flash` làm giáo viên AI phản xạ đàm thoại 2 chiều và sửa lỗi ngữ pháp.
* **Bảo mật và Lưu trữ bên thứ ba:**
  * **Auth.js:** Xác thực an toàn ở BFF. **Cloudinary:** Lưu trữ hình ảnh avatar người học.
* **Định hướng tích hợp tối ưu (AI-Integrated Web App):**
  * Tích hợp các API/SDK chính thức thay vì tự train mô hình giúp đảm bảo độ chính xác thương mại, giải phóng tài nguyên CPU/RAM cục bộ cho Backend xử lý nghiệp vụ và chạy thuật toán FSRS.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Sơ đồ tuần tự tương tác gọi API AI thông qua Java Backend (nằm ở mục 3.6 hoặc 4.2.2)**  
> *(Sequence Diagram mô tả luồng tích hợp SaaS tối ưu: Client gửi Audio -> Java Controller -> Java Service -> Azure AI Speech SDK -> Nhận kết quả đánh giá -> Java Service gửi lịch sử hội thoại -> Google Gemini Java SDK -> Nhận phản hồi sửa lỗi -> Trả về kết quả tổng hợp cho Client).*

### 🎙️ Script thuyết trình (2 phút):
> *"Mục tiêu cốt lõi của đồ án là tích hợp AI vào hệ thống, và nhóm em đã hiện thực hóa bằng việc tích hợp các SDK AI chính thức tại tầng Backend. 
> 
> Việc sử dụng các dịch vụ AI đám mây của Azure và Google giúp ứng dụng đạt độ chính xác cao nhất mà không tốn tài nguyên tự train mô hình. Backend Java đóng vai trò tiền xử lý dữ liệu (âm thanh, hình ảnh), gọi API, và lưu trữ kết quả đồng bộ. Giải pháp này giúp giải phóng tài nguyên CPU/RAM cho server để xử lý thuật toán FSRS local.
> 
> Cụ thể, khi kết thúc nói, lớp nghiệp vụ Java sẽ gửi audio qua Azure Speech SDK để chấm điểm phát âm chi tiết, sau đó gửi lịch sử hội thoại cho Gemini để nhận phản hồi đàm thoại và sửa lỗi ngữ pháp, cuối cùng tổng hợp kết quả trả về cho client."*

---

## SLIDE 13: THUẬT TOÁN ÔN TẬP NGẮT QUÃNG FSRS CÀI ĐẶT BẰNG JAVA
* **Phần:** 3. Triển khai và kiểm thử hệ thống
* **Nội dung:** Hiện thực hóa thuật toán ôn tập ngắt quãng FSRS
### 📌 Nội dung Slide (Bullet points):
* **Lý thuyết Thuật toán FSRS-4.5:**
  * Mô hình toán học giúp lên lịch ôn tập dựa trên mức độ suy giảm trí nhớ của người học.
  * Dự đoán 3 thông số trí nhớ: **Stability** (Độ bền), **Difficulty** (Độ khó), và **Retrievability** (Khả năng nhớ lại).
  * Công thức tính khả năng nhớ lại tại thời điểm $t$ ngày trôi qua:
    $$R(t, S) = \left(1 + \frac{t}{9 \cdot S}\right)^{-1}$$
* **Hiện thực hóa thuật toán trực tiếp bằng Java:**
  * Lớp `FsrsAlgorithm.java` được lập trình trực tiếp bằng Java để tính toán khoảng cách ngày ôn tập tiếp theo đối với các từ vựng hệ thống tại Vocabulary Hub khi người dùng đánh giá thẻ học theo các mức độ Again, Hard, Good hoặc Easy.
  * Khi người học chọn phản hồi, Java Backend sẽ tính toán các thông số trí nhớ mới và lên lịch ngày ôn tập tiếp theo trong bảng `UserVocabProgress` và ghi lịch sử ôn tập vào bảng `ReviewLog` để phục vụ lộ trình học tập cá nhân hóa.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Luồng ánh xạ dữ liệu và cập nhật thông số FSRS trong Database (nằm ở mục 4.2.3 hoặc 3.3.3)**  
> *(Biểu diễn luồng tương tác: Người dùng học Vocabulary Hub -> đánh giá Flashcard -> Next.js gọi Server Action -> Spring Boot nhận yêu cầu -> gọi Class FsrsAlgorithm xử lý -> cập nhật UserVocabProgress và ghi lịch sử vào ReviewLog).*
> [!TIP]
> **Đồ thị bổ trợ:** Nên vẽ đồ thị biểu diễn các đường cong suy giảm khả năng nhớ (Retrievability) và cách FSRS điều chỉnh khoảng cách ngày ôn tập tiếp theo tương ứng 4 phản hồi (Again, Hard, Good, Easy) dựa trên công thức toán học FSRS-4.5.

### 🎙️ Script thuyết trình (2 phút):
> *"Sau đây, em xin trình bày về điểm nổi bật khoa học của đồ án – thuật toán ôn tập ngắt quãng **FSRS-4.5** được nhóm em tự lập trình trên Backend Java. 
> 
> Về mặt toán học, FSRS dự đoán khả năng nhớ lại R của một từ vựng dựa trên hai thông số là Độ bền S và Độ khó D. Mục tiêu của FSRS là tự động lên lịch ôn tập đúng vào thời điểm khả năng nhớ lại giảm xuống sát ngưỡng 90%. Đây chính là thời điểm vàng để bộ não ôn tập lại, giúp khắc sâu từ vựng vào trí nhớ dài hạn hiệu quả nhất. 
> 
> Nhóm em đã lập trình lớp `FsrsAlgorithm.java` trực tiếp bằng Java. Khi người học đánh giá từ vựng theo các mức độ Again, Hard, Good hay Easy tại Vocabulary Hub, backend sẽ tự động áp dụng công thức toán học FSRS để tính độ bền mới, cập nhật độ khó, tính số ngày ôn tập tiếp theo và lưu vào database. Nhờ vậy, tiến trình học từ vựng được cá nhân hóa hoàn toàn tự động cho từng người học."*

---

## SLIDE 14: HIỆN THỰC HÓA MODULE HỌC TẬP & HỆ THỐNG GAMIFICATION
* **Phần:** 3. Triển khai và kiểm thử hệ thống
* **Nội dung:** Hiện thực hóa Gamification & Quản lý hiệu năng cơ sở dữ liệu
### 📌 Nội dung Slide (Bullet points):
* **Thiết kế Backend cho Gamification (Mục 4.2.5):**
  * **Nhiệm vụ hàng ngày (`DailyMission`):** Spring Boot tự động đồng bộ tiến độ qua bảng trung gian `UserDailyMission` mỗi khi người học hoàn thành bài học từ vựng, ngữ pháp hoặc luyện nói.
  * **Hệ thống XP và Streak:** Cộng điểm XP và cập nhật chuỗi ngày học liên tục (Streak) lưu trữ tập trung tại bảng `ProfileStats` của người học.
* **Tối ưu hóa hiệu năng Database & Caching:**
  * **Leaderboard Entry Caching:** Để tránh nghẽn I/O khi truy vấn bảng xếp hạng thi đua thời gian thực, dữ liệu xếp hạng được lưu sẵn trong thực thể `LeaderboardEntry` kết hợp sử dụng bộ nhớ đệm **Caffeine Cache** tại tầng Service.
  * **Nhật ký hoạt động (`UserActivity`):** Ghi nhận hoạt động học tập gọn nhẹ, tối ưu hóa truy vấn để vẽ biểu đồ Heatmap học tập phía Client qua Recharts.

### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Giao diện thực tế Leaderboard & Activity Heatmap:** Chèn hình ảnh trực quan của bảng xếp hạng thi đua tuần/tháng thực tế từ UI (mục 4.5.9) và ô lưới Heatmap (giống Github) hiển thị tiến độ đóng góp học tập hàng ngày để slide thêm sinh động và chân thực.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để tạo thêm động lực học tập, nhóm em đã xây dựng hệ thống **Gamification** (Game hóa). 
> 
> Hệ thống tự động theo dõi tiến độ hoàn thành các nhiệm vụ hàng ngày của người học. Khi hoàn thành nhiệm vụ, người học sẽ được cộng điểm XP và tăng chuỗi ngày học liên tục (Streak). 
> 
> Điểm XP này cũng được dùng để xếp hạng thi đua trên bảng xếp hạng. Để tối ưu hiệu năng khi có nhiều người học cùng lúc, nhóm em lưu sẵn dữ liệu xếp hạng trong bảng Leaderboard và sử dụng bộ đệm in-memory **Caffeine Cache** ở Backend, giúp giảm thiểu tối đa các truy vấn nặng vào database. 
> 
> Đồng thời, các hoạt động học tập cũng được ghi nhận lại để hiển thị biểu đồ Heatmap (giống như GitHub) giúp người học dễ dàng theo dõi tiến độ của mình."*

---

## SLIDE 15: KIỂM THỬ TỰ ĐỘNG & ĐẢM BẢO CHẤT LƯỢNG HỆ THỐNG
* **Phần:** 3. Triển khai và kiểm thử hệ thống
* **Nội dung:** Kiểm thử tự động & Đảm bảo chất lượng hệ thống
### 📌 Nội dung Slide (Bullet points):
* **Chiến lược kiểm thử tự động (Unit Testing):**
  * **Backend Java:** Lập trình bộ **55 kiểm thử tự động** sử dụng **JUnit 5** và **Mockito** để kiểm chứng các logic nghiệp vụ lõi như xác thực (`AuthServiceTest`), từ vựng (`VocabServiceTest`), và thuật toán ngắt quãng (`FsrsAlgorithmTest`).
  * **Frontend Next.js:** Áp dụng **Vitest** để kiểm thử các thành phần giao diện và các helper chức năng.
  * **Kết quả thực nghiệm:** Toàn bộ 55 test cases đạt tỷ lệ vượt qua tuyệt đối **100%**, đảm bảo tính ổn định tối đa của mã nguồn khi tái cấu trúc.
* **Đảm bảo chất lượng tích hợp:**
  * Giám sát lỗi runtime thời gian thực với **Sentry SDK** trên cả Frontend và Backend.
  * Kiểm soát sức khỏe và cấu hình hệ thống thông qua cổng **Spring Boot Actuator**.

### 🖼️ Bảng biểu trình bày trên Slide:
> [!NOTE]  
> **TÊN BẢNG BIỂU TRÊN SLIDE:** **Bảng tổng hợp kết quả kiểm thử tự động (nằm ở mục 4.4.2.4)**  
> *(Bảng thống kê chi tiết số lượng Unit Test Cases hoàn thành thành công 100% của các phân hệ để chứng minh tính ổn định của mã nguồn).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để đảm bảo hệ thống hoạt động ổn định và không gặp lỗi logic khi cập nhật code, nhóm em đã tiến hành viết kiểm thử tự động. 
> 
> Ở Backend Java, nhóm em đã xây dựng bộ **55 kịch bản kiểm thử tự động (Unit Test)** sử dụng JUnit 5 và Mockito, bao phủ các logic cốt lõi từ Xác thực, Từ vựng cho đến thuật toán FSRS. Ở phía Frontend Next.js, các component cũng được kiểm thử bằng Vitest. 
> 
> Kết quả là toàn bộ 55 test cases đều chạy thành công 100%. Ngoài ra, nhóm em còn tích hợp Sentry để phát hiện lỗi runtime tức thời trên cả Next.js và Spring Boot, kết hợp Spring Boot Actuator để theo dõi sức khỏe hệ thống, giúp phát hiện và xử lý sự cố cực kỳ nhanh chóng."*

---

## SLIDE 16: ĐÓNG GÓI CONTAINER DOCKER & QUY TRÌNH CI/CD ĐÁM MÂY
* **Phần:** 4. CI/CD & Demo sản phẩm
* **Nội dung:** Đóng gói Container Docker Multi-stage & Quy trình CI/CD
### 📌 Nội dung Slide (Bullet points):
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
* **Khả năng tự phục hồi và Quản lý lỗi:**
  * Tích hợp cơ chế ngắt mạch **Resilience4j Circuit Breaker** để tự động ngắt kết nối tạm thời bảo vệ tài nguyên JVM khi các API AI ngoại vi gặp sự cố hoặc phản hồi quá chậm.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN CÁC SƠ ĐỒ TRÊN SLIDE:**  
> 1. **Sơ đồ quy trình đóng gói đa tầng Multi-stage Build và khởi chạy Docker Container (nằm ở mục 4.3.1)**  
> 2. **Sơ đồ kiến trúc triển khai vật lý hệ thống DailyEng trên hạ tầng đám mây (nằm ở mục 4.3.2.2)**  
> [!TIP]
> **Hình ảnh bổ trợ:** Chèn thêm hình ảnh log chạy thành công của GitHub Actions và infographic so sánh trực quan kích thước Docker Image (820MB vs 180MB) để khẳng định tính chuyên nghiệp của hệ thống CI/CD.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để triển khai ứng dụng lên internet, nhóm em đã container hóa bằng Docker và thiết lập quy trình CI/CD tự động. 
> 
> Nhóm em áp dụng chiến lược đóng gói **Docker Multi-stage Build**. Giai đoạn đầu sẽ compile code Java ra file JAR, sau đó giai đoạn hai chỉ copy duy nhất file JAR này sang một runtime JRE cực kỳ tinh gọn dựa trên Alpine để khởi chạy. Cách làm này giúp giảm dung lượng Docker image từ 820MB xuống chỉ còn 180MB, loại bỏ hoàn toàn mã nguồn thô và tăng tính bảo mật cho hệ thống. 
> 
> Quy trình **CI/CD** được tự động hóa qua GitHub Actions. Mỗi khi push code mới lên GitHub, hệ thống CI sẽ tự động kiểm tra cú pháp và chạy toàn bộ unit test. Nếu tất cả đều xanh, code Frontend sẽ tự động deploy lên Vercel, còn Backend được đóng gói Docker deploy lên Render, kết nối an toàn với database Supabase. Nhóm em cũng tích hợp cơ chế ngắt mạch **Resilience4j Circuit Breaker** giúp bảo vệ máy chủ Backend khỏi bị treo nếu các dịch vụ AI bên ngoài gặp sự cố hoặc phản hồi chậm."*

---

## SLIDE 17: KẾT QUẢ THỰC NGHIỆM - LIVE DEMO CÁC PHÂN HỆ CỐT LÕI
* **Phần:** 4. CI/CD & Demo sản phẩm
* **Nội dung:** Live Demo các chức năng chính của hệ thống
### 📌 Nội dung Slide (Bullet points):
* **Môi trường Live Demo các chức năng chính:**
  * **Speaking Room (Luyện nói với AI):** Chọn kịch bản -> Mở mic thu âm -> Nhận chấm điểm phát âm chi tiết (tính điểm trôi chảy, ngữ điệu, hiển thị biểu đồ cao độ Pitch Intonation) từ Azure Speech SDK -> Gemini AI phản hồi đàm thoại và sửa lỗi ngữ pháp.
  * **Vocabulary Hub & Flashcards:** Trải nghiệm học từ vựng trực quan, lật thẻ Flashcard hai mặt và tự động lên lịch ôn tập ngắt quãng thông qua thuật toán FSRS.
  * **SmartLens (Dịch ảnh OCR):** Upload ảnh -> Hệ thống quét văn bản bằng OCR của Azure Vision -> Hiển thị bản dịch đè khít lên vị trí chữ gốc.
  * **Dorara AI Companion:** Trợ lý ảo hỗ trợ học tập, trả lời dạng văn bản streaming thông qua Server-Sent Events (SSE) hiển thị cùng mô hình avatar 3D chuyển động mượt mà.
  * **Study Plan & User Dashboard:** Quản lý kế hoạch học tập cá nhân hóa và hiển thị biểu đồ thống kê học tập Recharts.

### 🖼️ Hình ảnh trình bày trên Slide:
> [!NOTE]  
> **TÊN CÁC HÌNH ẢNH TRÊN FIGMA/SLIDE:**  
> 1. **Giao diện trang chủ Landing page của hệ thống DailyEng (nằm ở mục 4.5.1)**.  
> 2. **Giao diện phòng luyện nói và chấm điểm phát âm AI (nằm ở mục 4.5.3)** *(Hiển thị biểu đồ so sánh cao độ Pitch Intonation).*

### 🎙️ Script thuyết trình (2 phút):
> *"Sau đây, em xin phép trình bày về kết quả thực nghiệm và giao diện thực tế của ứng dụng. Giao diện của DailyEng được thiết kế theo phong cách hiện đại và responsive mượt mà trên cả máy tính lẫn điện thoại. 
> 
> Ở màn hình luyện nói **Speaking Room**, người học sẽ trò chuyện trực tiếp bằng giọng nói với AI. Khi nói xong, hệ thống sẽ trả về bảng điểm chi tiết từng từ và chỉ rõ lỗi sai phát âm, đồng thời Gemini AI sẽ đưa ra phản hồi và sửa lỗi ngữ pháp đi kèm biểu đồ so sánh cao độ giọng nói trực quan. 
> 
> Tại phân hệ **Vocabulary Hub**, thẻ Flashcard hai mặt hiển thị rõ ràng tiến độ ghi nhớ từ vựng do thuật toán FSRS tính toán. 
> 
> Tiện ích **SmartLens** cho phép tải ảnh lên, quét chữ bằng OCR và dịch trực tiếp đè khít lên nền ảnh. 
> 
> Cuối cùng là trợ lý ảo **Dorara** tương tác thời gian thực với mô hình 3D sinh động, phản hồi chữ dạng stream chạy chữ mượt mà nhờ giao thức SSE, mang lại trải nghiệm rất tốt cho người dùng."*

---

## SLIDE 18: TỔNG KẾT & HƯỚNG PHÁT TRIỂN
* **Phần:** 5. Kết luận & Định hướng phát triển
* **Nội dung:** Tổng kết & Hướng phát triển
### 📌 Nội dung Slide (Bullet points):
* **Mức độ hoàn thiện đề tài (Mục 5.2):**
  * Đồ án đã hoàn thành toàn bộ các mục tiêu đề ra: Xây dựng thành công các phân hệ chức năng cốt lõi và các phân hệ hỗ trợ trên nền tảng Backend Java Spring Boot vững chắc kết hợp Frontend Next.js bảo mật.
* **Ưu điểm thực tế (Mục 5.3.1):** 
  * Tiếp cận theo hướng tích hợp AI (AI Integration) tối ưu, ứng dụng công nghệ đám mây thương mại hiệu quả vào thực tiễn.
  * Tự làm chủ và hiện thực hóa thuật toán toán học ôn tập FSRS bằng Java chạy local không phụ thuộc API ngoài.
  * Kiến trúc phân tầng Full-Stack bảo mật an toàn, tối ưu tải tốt (Virtual Threads) và CD đám mây.
* **Hạn chế hiện tại (Mục 5.3.2):**
  * Hiện tượng khởi động nguội khi khởi chạy container do Backend sử dụng gói máy chủ Render miễn phí.
  * Phụ thuộc vào kết nối Internet liên tục và tính sẵn sàng của các nhà cung cấp đám mây API.
* **Hướng phát triển tiếp theo (Mục 5.4):**
  * Nghiên cứu tích hợp các mô hình ngôn ngữ lớn gọn nhẹ chạy cục bộ như Gemma 2B, Llama 3B để giảm chi phí API và nâng cao tính độc lập của Backend.
  * Xây dựng chế độ học ngoại tuyến cho Flashcard SRS.
  * Mở rộng thêm nhiều ngôn ngữ rèn luyện khác như tiếng Nhật, tiếng Trung, và tiếng Hàn.

### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Sơ đồ Lộ trình nâng cấp (Roadmap):** Infographic biểu diễn hướng phát triển tiếp theo ở mục 5.4, đặc biệt là bước tích hợp mô hình ngôn ngữ lớn cục bộ (Local LLM - Gemma/Llama) và chế độ học ngoại tuyến (Offline Mode) để kết thúc bài thuyết trình thật ấn tượng.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Tổng kết lại, đồ án DailyEng đã hoàn thành đầy đủ các mục tiêu đề ra: xây dựng thành công ứng dụng học tiếng Anh tích hợp AI chạy trên Backend Java Spring Boot vững chắc kết hợp Frontend Next.js. 
> 
> Bên cạnh các điểm sáng về luyện nói phản xạ với AI và tự lập trình thuật toán ôn tập ngắt quãng FSRS, hệ thống vẫn còn một số điểm cần cải thiện như hiện tượng khởi động nguội do Backend chạy trên server Render gói free, và việc phụ thuộc hoàn toàn vào kết nối mạng để gọi API AI. 
> 
> Hướng phát triển tiếp theo của nhóm em là nghiên cứu chạy các mô hình AI mã nguồn mở gọn nhẹ như Gemma hoặc Llama trực tiếp trên máy chủ Backend để giảm chi phí API và nâng cao tính độc lập của app, đồng thời làm thêm chế độ Offline để ôn tập Flashcard ngay cả khi không có mạng. 
> 
> Chúng em xin chân thành cảm ơn thầy/cô và các bạn đã lắng nghe bài thuyết trình ngày hôm nay. Nhóm em rất mong nhận được những nhận xét, ý kiến đóng góp quý báu từ thầy/cô và các bạn để hoàn thiện đề tài hơn nữa. Em xin cảm ơn ạ!"*
