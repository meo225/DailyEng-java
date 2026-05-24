# KỊCH BẢN THUYẾT TRÌNH ĐỒ ÁN: DAILYENG
**Thời lượng thuyết trình dự kiến:** 20 phút | **Trọng tâm công nghệ:** Tích hợp AI trên nền Backend Java Spring Boot 3.4 và Java 21 kết hợp Frontend Next.js 15

## SLIDE 1: GIỚI THIỆU ĐỀ TÀI & BỐI CẢNH
* **Phần:** 1. Tổng quan đề tài & Công nghệ sử dụng
* **Nội dung:** Giới thiệu đề tài & Bối cảnh thực tiễn
### 📌 Nội dung Slide (Bullet points):
* **Tên đề tài đồ án:** Nghiên cứu và xây dựng DailyEng - Ứng dụng học tiếng Anh tích hợp Trí tuệ nhân tạo AI và Thuật toán lặp lại ngắt quãng FSRS.
* **Bối cảnh thực tiễn:** 
  * Nhu cầu học tiếng Anh giao tiếp và tích lũy từ vựng ngày càng tăng.
  * Người học thường thiếu môi trường thực hành phản xạ đàm thoại trực tiếp và dễ quên từ vựng nếu không ôn tập đúng thời điểm.
* **Định hướng giải pháp:**
  * Xây dựng nền tảng học tập khép kín, sử dụng Backend Java Spring Boot 3.4 làm trung tâm điều phối.
  * Tích hợp trực tiếp các dịch vụ Trí tuệ nhân tạo AI như Azure Speech SDK và Google Generative AI SDK ngay tại tầng Backend để chấm điểm phát âm và hỗ trợ đàm thoại.
  * Triển khai thuật toán ôn tập ngắt quãng FSRS bằng ngôn ngữ Java để cá nhân hóa lịch ôn tập từ vựng của người dùng.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Kính chào các thầy cô trong Hội đồng chấm đồ án. Em xin phép được đại diện nhóm trình bày báo cáo về đề tài: **Nghiên cứu và xây dựng DailyEng - Ứng dụng học tiếng Anh tích hợp Trí tuệ nhân tạo AI và Thuật toán lặp lại ngắt quãng FSRS**.
> 
> Trong quá trình tìm hiểu thực tiễn học ngoại ngữ, nhóm chúng em nhận thấy người học tại Việt Nam thường gặp khó khăn ở hai khía cạnh: thiếu môi trường thực hành phản xạ nói tự nhiên và chưa có phương pháp để ghi nhớ từ vựng dài hạn. 
> 
> Nhằm giải quyết các vấn đề trên, đồ án này hướng tới xây dựng một ứng dụng học tập hỗ trợ chu trình học khép kín. Trọng tâm của đề tài là thiết lập một hệ thống Backend bằng ngôn ngữ Java Spring Boot, đóng vai trò điều phối tài nguyên và trực tiếp gọi các dịch vụ Trí tuệ nhân tạo AI của Azure và Google để xử lý đánh giá giọng nói, hội thoại thông minh, đồng thời tự lập trình thuật toán ôn tập FSRS bằng Java để tự động hóa việc tính toán lịch học tập cá nhân hóa cho từng người học."*

---

## SLIDE 1B: MỤC LỤC NỘI DUNG BÁO CÁO
* **Phần:** Mục lục nội dung báo cáo
* **Nội dung:** Mục lục báo cáo
### 📌 Nội dung Slide (Bullet points):
* **Phần 1: Tổng quan đề tài & Công nghệ sử dụng** (Slide 1 - 4)
* **Phần 2: Phân tích yêu cầu & Thiết kế hệ thống** (Slide 5 - 10)
* **Phần 3: Hiện thực hóa & Kiểm thử hệ thống** (Slide 11 - 15)
* **Phần 4: Triển khai & Demo sản phẩm** (Slide 16 - 17)
* **Phần 5: Kết luận & Định hướng phát triển** (Slide 18)

### 🎙️ Script thuyết trình (0.5 phút):
> *"Sau đây, em xin phép tóm tắt bố cục nội dung báo cáo ngày hôm nay gồm 5 phần chính: Phần đầu tiên giới thiệu về bối cảnh đề tài, thực trạng và giới thiệu sơ lược về hệ sinh thái công nghệ sử dụng; phần 2 đi sâu vào phân tích yêu cầu từ use case, sitemap giao diện Figma đến thiết kế cơ sở dữ liệu ERD và cấu trúc OOP trong Spring Boot; phần 3 là trọng tâm hiện thực hóa code backend Virtual Threads, tích hợp AI SDK, thuật toán FSRS và luồng bảo mật cùng kết quả kiểm thử tự động; phần 4 trình bày việc đóng gói container Docker, triển khai đám mây và live demo các tính năng; và cuối cùng phần 5 tổng kết ưu/nhược điểm và định hướng phát triển trong tương lai."*

---

## SLIDE 2: ĐẶT VẤN ĐỀ & KHẢO SÁT THỰC TIỄN
* **Phần:** 1. Tổng quan đề tài & Công nghệ sử dụng
* **Nội dung:** Đặt vấn đề, Khảo sát thực tế & Mục tiêu đề tài
### 📌 Nội dung Slide (Bullet points):
* **Khảo sát từ dữ liệu thống kê (Mục 1.3.1):**
  * *(Dữ liệu thống kê thực tế lấy ở Mục 1.3.1 trong báo cáo)*
* **Khảo sát các website học tiếng Anh hiện nay (Mục 1.3.2):**
  * **PrepTalk (luyện nói):** Tập trung luyện nói phản xạ tốt nhưng chi phí tương tác cao, chưa tích hợp thuật toán ôn tập ngắt quãng cho từ vựng.
  * **YouPass:** Tốt về học từ vựng nhưng thiếu tương tác luyện nói phản xạ 2 chiều thông minh.
  * **Luyennoi:** Công cụ luyện phát âm cơ bản, thiếu trợ lý ảo giải đáp ngữ pháp thời gian thực.
  * *(Nội dung phân tích so sánh chi tiết lấy ở Mục 1.3.2 trong báo cáo)*
* **Khảo sát người dùng (Mục 1.3.3):**
  * *(Số liệu khảo sát thực tế người học lấy ở Mục 1.3.3 trong báo cáo)*
* **Phân rã mục tiêu đề tài (Mục 1.4):**
  * **Mục tiêu kiến thức (Mục 1.4.1):** *(Chi tiết lấy ở Mục 1.4.1 trong báo cáo)*
  * **Mục tiêu sản phẩm (Mục 1.4.2):** Hoàn thành ứng dụng DailyEng hỗ trợ chu trình học khép kín với các tính năng: Luyện nói AI, Học từ vựng FSRS, Ngữ pháp, Sổ tay thông minh, Kế hoạch học tập, Dịch hình ảnh (SmartLens), Trợ lý Dorara và Gamification.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Thưa các thầy cô, để có cái nhìn thực tiễn và khách quan nhất, chúng em đã thực hiện khảo sát các nguồn dữ liệu thống kê cũng như các website học tiếng Anh phổ biến hiện nay như PrepTalk, YouPass và Luyennoi. Kết quả cho thấy các ứng dụng hiện nay thường bị phân mảnh: PrepTalk mạnh về luyện phản xạ nhưng chi phí cao và thiếu ôn tập từ vựng ngắt quãng; YouPass tốt về từ vựng nhưng thiếu đàm thoại 2 chiều; còn Luyennoi chỉ dừng lại ở chấm điểm phát âm đơn thuần. 
> 
> Qua khảo sát người dùng thực tế với các số liệu chi tiết trong báo cáo, nhóm nhận thấy nhu cầu về một ứng dụng tích hợp, tối ưu chi phí và cá nhân hóa lộ trình là vô cùng cấp thiết. Từ đó, đồ án phân rã rõ ràng thành hai mục tiêu: Mục tiêu kiến thức giúp nghiên cứu sâu về các công nghệ Java mới nhất và thuật toán FSRS; và Mục tiêu sản phẩm nhằm hiện thực hóa một ứng dụng học tập khép kín, tiện lợi và thông minh cho người học."*

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
* **Hệ thống hỗ trợ:** Kế hoạch học tập (Study Plan), Kiểm tra trình độ đầu vào (Placement Test), Thông báo (Notification) và Gamification (Nhiệm vụ, XP, Streak, Leaderboard).

### 🎙️ Script thuyết trình (1.5 phút):
> *"Hệ thống DailyEng được thiết kế để tạo nên một chu trình học tập khép kín từ lý thuyết đến thực hành phản xạ. 
> 
> Sáu phân hệ cốt lõi bao gồm: **Speaking Room** giúp luyện nói phản xạ và nhận chấm điểm chi tiết từ AI; **Vocabulary Hub** và **Grammar Hub** cung cấp kho kiến thức nền tảng có hệ thống. Khi học viên gặp từ mới hoặc cấu trúc ngữ pháp cần lưu ý, họ có thể lưu vào **Notebook** để ôn tập lại bằng thẻ Flashcard. Để tăng tính tương tác, chúng em phát triển trợ lý ảo **Dorara** giao tiếp thời gian thực, và tính năng **SmartLens** giúp người học tải ảnh lên, nhận diện chữ viết bằng OCR và dịch thuật trực tiếp đè lên ảnh gốc.
> 
> Bên cạnh đó, hệ thống còn hỗ trợ làm bài **Kiểm tra đầu vào** để gợi ý **Kế hoạch học tập**, đồng thời duy trì động lực học bằng cơ chế **Gamification** tính điểm XP, giữ chuỗi Streak học tập và đua bảng xếp hạng Leaderboard."*

---

## SLIDE 4: CÔNG NGHỆ SỬ DỤNG (TECH STACK)
* **Phần:** 1. Tổng quan đề tài & Công nghệ sử dụng
* **Nội dung:** Giới thiệu công nghệ sử dụng
### 📌 Nội dung Slide (Bullet points):
* **Kiến trúc phân tách Client - Server:**
  * **Frontend (Next.js 15 & React 19):** Sử dụng React Server Components (RSC) tối ưu hóa kết xuất trang, Zustand quản lý trạng thái, Next.js Server Actions đóng vai trò BFF (Backend-For-Frontend) che giấu API endpoint, kết hợp WebGL (Three.js) cho nhân vật 3D và Recharts để vẽ biểu đồ học tập.
  * **Backend (Spring Boot 3.4 & Java 21):** Trung tâm điều phối, xử lý logic nghiệp vụ và bảo mật. Sử dụng Java 21 Virtual Threads (Project Loom) tối ưu I/O nghẽn, Spring Data JPA & Hibernate ORM, Caffeine Cache, và Flyway quản lý phiên bản database.
* **Tích hợp các dịch vụ Trí tuệ nhân tạo (AI) & Bên thứ ba:**
  * **Azure Speech Service:** Speech-to-Text (STT) và chấm điểm phát âm (Pronunciation Assessment) chi tiết cấp độ âm vị.
  * **Azure AI Translator:** Dịch thuật văn bản song ngữ chất lượng cao.
  * **Azure AI Vision (OCR):** Nhận diện chữ viết từ hình ảnh phục vụ tính năng SmartLens.
  * **Google Gemini 2.5 Flash:** Robot trợ lý ảo đàm thoại phản xạ 2 chiều thông minh và sửa lỗi ngữ pháp.
  * **Hỗ trợ khác:** Auth.js (BFF authentication), Cloudinary (lưu trữ hình ảnh avatar), Sentry (giám sát lỗi), Resilience4j (ngắt mạch Circuit Breaker).
* **Thuật toán ôn tập khoa học FSRS-4.5:**
  * Thuật toán ôn tập ngắt quãng (Free Spaced Repetition Scheduler) được tự cài đặt bằng ngôn ngữ Java.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để hiện thực hóa DailyEng, chúng em đã lựa chọn một hệ sinh thái công nghệ bổ trợ lẫn nhau một cách tối ưu. 
> 
> Phía Client sử dụng **Next.js 15** và **React 19** để tận dụng lợi thế về tốc độ kết xuất của React Server Components. Next.js đóng vai trò BFF giúp quản lý xác thực qua Auth.js và ẩn đi các endpoint Backend. Chúng em cũng tích hợp công nghệ WebGL Three.js để dựng mô hình trợ lý ảo 3D sinh động và Recharts để trực quan hóa dữ liệu học tập.
> 
> Trọng tâm là Backend xây dựng trên **Java 21** và **Spring Boot 3.4**. Nhờ Virtual Threads, Backend duy trì hiệu năng vượt trội khi xử lý các cuộc gọi API AI nghẽn. Cơ sở dữ liệu PostgreSQL được quản lý phiên bản chuyên nghiệp qua Flyway.
> 
> Hệ thống tích hợp trực tiếp **Azure Speech SDK** để chấm điểm phát âm, **Azure AI Translator** để dịch thuật, **Azure AI Vision** để OCR hình ảnh, và **Google Gemini API** làm bộ não đàm thoại. Cuối cùng, chúng em tự cài đặt thuật toán ngắt quãng **FSRS** bằng Java để cá nhân hóa lịch học từ vựng cho từng học viên."*

---

## SLIDE 5: SƠ ĐỒ USE CASE TỔNG QUÁT HỆ THỐNG
* **Phần:** 2. Phân tích yêu cầu & Thiết kế hệ thống
* **Nội dung:** Sơ đồ Use Case tổng quát & Đặc tả 4 Use Case trọng tâm
### 📌 Nội dung Slide (Bullet points):
* **Phân quyền người dùng rõ ràng:**
  * **Khách:** Đăng ký, đăng nhập tài khoản, làm bài kiểm tra trình độ đầu vào (Placement Test).
  * **Người học:** Thực hiện đầy đủ các chức năng học từ vựng, ngữ pháp, luyện nói với AI, quản lý sổ tay cá nhân, theo dõi tiến độ và tham gia gamification.
* **Đặc tả 4 Use Case trọng tâm (Mục 3.2.2):**
  * **Use Case 1 (Đăng ký tài khoản):** Người dùng đăng ký tài khoản mới qua form hoặc OAuth2, hệ thống khởi tạo ProfileStats và kế hoạch học tập mặc định.
  * **Use Case 2 (Luyện nói với AI):** Người học chọn kịch bản, nói qua microphone. Hệ thống ghi nhận âm thanh, gọi Azure Speech SDK để chấm điểm phát âm và Gemini để phản hồi đàm thoại.
  * **Use Case 3 (Học từ vựng với Flashcards):** Hiển thị thẻ học, người dùng đánh giá mức độ nhớ (Again, Hard, Good, Easy), hệ thống gọi thuật toán FSRS lập lịch ôn tập tiếp theo.
  * **Use Case 4 (Chat với Dorara AI):** Người học gửi câu hỏi, trợ lý ảo Dorara stream câu trả lời dạng văn bản thời gian thực.
  * *(Đặc tả chi tiết luồng chính và luồng ngoại lệ lấy ở Mục 3.2.2 trong báo cáo)*

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **hình: Biểu đồ Use Case tổng quát của hệ thống DailyEng (nằm ở mục 3.2.1)**  
> *(Hiển thị sơ đồ Use Case vẽ bằng Mermaid từ Chương 3 - Mục 3.2.1. Đảm bảo cấu trúc rõ ràng với 3 phân vùng subgraph màu sắc Pastel nhã nhặn: Phân hệ tài khoản, Phân hệ học tập và đánh giá, Phân hệ trợ lý và tiện ích).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Xin mời các thầy cô quan sát **hình: Biểu đồ Use Case tổng quát của hệ thống DailyEng**. Hệ thống được chia thành hai nhóm Actor chính là Khách và Người học. Khách chưa đăng nhập có thể thực hiện kiểm tra trình độ đầu vào để hệ thống gợi ý lộ trình học tương ứng. 
> 
> Đối với Người học, hệ thống mở khóa toàn bộ các chức năng chuyên sâu nằm trong ba phân vùng nghiệp vụ. 
> 
> Báo cáo của chúng em đặc tả chi tiết 4 Use Case trọng tâm của hệ thống bao gồm: Đăng ký tài khoản; Luyện nói với AI; Học từ vựng với Flashcard; và Chat với trợ lý ảo Dorara. Ở mỗi Use Case, chúng em đều phân tích kỹ lưỡng luồng sự kiện chính (Basic Flow), các luồng phụ (Alternative Flows) và các kịch bản xử lý lỗi ngoại lệ (Exception Flows) ở Mục 3.2.2 trong báo cáo nhằm đảm bảo tính toàn vẹn và logic của hệ thống khi vận hành thực tế."*

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
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **hình: Sơ đồ kiến trúc phân tầng logic (Full-Stack) và luồng giao tiếp (nằm ở mục 3.4)**  
> *(Vẽ lại sơ đồ kiến trúc ở Chương 3 - Mục 3.4 mô tả 4 tầng chính: Client Layer, BFF Layer, Server Layer, và Database Layer).*

### 🎙️ Script thuyết trình (2 phút):
> *"Để đảm bảo tính độc lập, dễ mở rộng và bảo mật, hệ thống được thiết kế theo cấu trúc phân tầng Full-Stack như mô tả trong **hình: Sơ đồ kiến trúc phân tầng logic (Full-Stack)**. 
> 
> Tại phía Client, chúng em phát triển giao diện bằng Next.js 15 để tối ưu hóa thời gian hiển thị ban đầu, sử dụng Zustand quản lý trạng thái client gọn nhẹ, kết hợp Three.js cho trợ lý 3D và Recharts để vẽ biểu đồ.
> 
> Lớp trung gian BFF sử dụng Next.js Server Actions tích hợp Auth.js giúp giải quyết vấn đề CORS, hoạt động như một lớp bảo vệ che giấu các địa chỉ endpoint Backend và tự động đính kèm mã JWT Token từ Cookie HttpOnly an toàn. 
> 
> Trọng tâm của đồ án là tầng Backend API được xây dựng bằng **Java Spring Boot 3.4** và chạy trên nền **Java 21**. Hệ thống mã nguồn Java được phân chia theo kiến trúc module khoa học. Để tối ưu hóa hiệu năng, chúng em sử dụng connection pool **HikariCP** kết hợp với bộ nhớ đệm in-memory **Caffeine** tại tầng Service, giúp giảm số lượng truy vấn trực tiếp vào cơ sở dữ liệu PostgreSQL phía dưới khi người dùng yêu cầu các dữ liệu tĩnh như chủ đề hay bài học."*

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
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **hình: Sơ đồ thực thể kết hợp ERD chi tiết của hệ thống DailyEng (nằm ở mục 3.3.1)**  
> *(Hiển thị sơ đồ ERD chi tiết từ mục 3.3.1 biểu diễn mối quan hệ giữa User, UserVocabProgress, VocabItem, SpeakingSession, và NotebookItem).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Em xin phép trình bày về cấu trúc dữ liệu được quản lý ở Backend. Toàn bộ 35 bảng trong cơ sở dữ liệu PostgreSQL được ánh xạ sang các thực thể Java thông qua **Spring Data JPA** như mô tả trên **hình: Sơ đồ thực thể kết hợp ERD chi tiết của hệ thống DailyEng**. 
> 
> Trong cấu trúc cơ sở dữ liệu này, thực thể User đóng vai trò trung tâm liên kết với thông tin học tập ProfileStats, kế hoạch StudyPlan, các phiên luyện nói SpeakingSession, và tiến trình từ vựng UserVocabProgress. 
> 
> Để quản lý định danh và đồng bộ hóa các trường thông tin kiểm toán hệ thống, tất cả các Entity con đều kế thừa lớp `BaseEntity` và tự động sở hữu cơ chế sinh khóa chính sử dụng chuỗi **CUID2**. CUID2 có tính chất k-sortable giúp PostgreSQL tối ưu hóa hiệu năng chèn bản ghi mới mà không cần sắp xếp lại toàn bộ cây chỉ mục B-Tree, đồng thời ngăn chặn các lỗ hổng rò rỉ dữ liệu. 
> 
> Đặc biệt, để quản lý thay đổi cấu trúc cơ sở dữ liệu một cách an toàn và nhất quán, chúng em tích hợp **Flyway Migration**. Mọi thay đổi về cấu trúc bảng đều được ghi nhận dạng code SQL đánh số phiên bản, tự động chạy khi khởi động server, giúp đồng bộ cấu trúc DB tức thời giữa local và cloud Supabase mà không gặp xung đột."*

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
  * **Facade Pattern (Next.js Server Actions) (Mục 3.5.2.5):** Gom các yêu cầu API phức tạp từ client thành các Server Actions xử lý ở phía server của Next.js, giúp component client gọi hàm đơn giản.
  * **Provider Pattern (React Context & Zustand) (Mục 3.5.2.6):** Đồng bộ hóa trạng thái toàn cục của ứng dụng (session người dùng, cấu hình giao diện).
  * **Custom Hook Pattern (Mục 3.5.2.7):** Tách biệt mã xử lý logic gọi API ra khỏi mã kết xuất giao diện UI (ví dụ: `useSpeakingRoom.ts`).

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN CÁC SƠ ĐỒ TRÊN SLIDE:**  
> 1. **hình: Sơ đồ quan hệ kế thừa các thực thể trong phân hệ luyện nói (Speaking Module) (nằm ở mục 3.6)** *(Biểu diễn cấu trúc ClassDiagram thể hiện tính Kế thừa từ BaseEntity cha).*  
> 2. **hình: Luồng ánh xạ và chuyển đổi dữ liệu giữa Entity và DTO (nằm ở mục 3.5)** *(Mô tả quá trình ánh xạ Entity sang DTO tại tầng Service trước khi gửi phản hồi).*

### 🎙️ Script thuyết trình (2 phút):
> *"Để mã nguồn dự án Java và Next.js có tính cấu trúc tốt, dễ bảo trì và mở rộng, chúng em đã áp dụng các nguyên lý lập trình hướng đối tượng OOP và các Design Patterns tiêu chuẩn. 
> 
> Trên slide là sơ đồ quan hệ kế thừa thể hiện tính kế thừa trong phân hệ luyện nói và luồng chuyển đổi dữ liệu. Tại Backend Java, chúng em triển khai mẫu thiết kế **Service Layer** và **Repository Pattern** để đảm bảo tính liên kết linh hoạt. Mọi logic nghiệp vụ từ việc điều phối bài học đến tính điểm đều nằm tại tầng Service. 
> 
> Ngoài ra, chúng em áp dụng **DTO Pattern** bằng cách sử dụng tính năng **Java Records** của Java 21. Java Records đóng vai trò là những cấu trúc dữ liệu bất biến, giúp lọc bỏ các trường dư thừa hoặc nhạy cảm của Entity trước khi gửi về Frontend Next.js.
> 
> Bên cạnh đó, ở phía Frontend Next.js, chúng em cũng áp dụng các pattern hiện đại như **Facade Pattern** thông qua Server Actions để đóng gói các API gọi Backend, dùng **Provider Pattern** để quản lý trạng thái toàn cục với Zustand, và viết các **Custom Hooks** để tách biệt logic gọi API khỏi UI components, giúp mã nguồn frontend trở nên cực kỳ gọn gàng và dễ bảo trì."*

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
> 1. **sơ đồ: Tuần tự Luồng xác thực JWT và lấy danh sách kịch bản trong DailyEng (nằm ở mục 3.8)** *(Sequence Diagram mô tả luồng xác thực và kiểm soát JWT của bộ lọc Spring Security).*  
> 2. **bảng: Bảng tổng hợp các API Endpoints hệ thống tiêu biểu (nằm ở mục 3.7)** *(Liệt kê các API chính như `/auth/login`, `/speaking/scenarios`, `/srs/review`, `/dorara/chat` để Hội đồng đánh giá).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để bảo vệ tài nguyên hệ thống, chúng em cấu hình kiến trúc bảo mật không trạng thái sử dụng **Spring Security** kết hợp **JWT**. Mọi yêu cầu từ Client gửi lên đều đi qua bộ lọc `JwtAuthenticationFilter` để xác thực token nằm trong HttpOnly Cookie. Quyền hạn của người dùng được kiểm soát chặt chẽ ở cấp độ phương thức nhờ chú thích `@PreAuthorize`.
> 
> Toàn bộ hệ thống API Backend được thiết kế tuân thủ nghiêm ngặt chuẩn RESTful với các module Auth, Speaking, Vocab, SRS trả về định dạng JSON đồng nhất. 
> 
> Đặc biệt, để xử lý tương tác thời gian thực với mô hình Generative AI, chúng em đã áp dụng giao thức **Server-Sent Events (SSE)** ở Mục 3.6.4 trong báo cáo. Thay vì bắt người dùng đợi vài giây để nhận toàn bộ văn bản phản hồi của trợ lý ảo Dorara, SSE cho phép server đẩy từng từ ngay khi AI sinh ra, tạo hiệu ứng chữ chạy thời gian thực mượt mà. 
> 
> Đồng thời, để nâng cao tính ổn định, chúng em triển khai cơ chế xử lý lỗi tập trung qua **`@ControllerAdvice`**, đảm bảo mọi lỗi runtime phát sinh đều được bắt và đóng gói thành định dạng JSON chuẩn hóa gửi về client, giúp hệ thống không bao giờ bị sập hoặc lộ log code ra ngoài."*

---

## SLIDE 10: THIẾT KẾ GIAO DIỆN FIGMA & HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM)
* **Phần:** 2. Phân tích yêu cầu & Thiết kế hệ thống
* **Nội dung:** Thiết kế Wireframe, Sitemap, Design System & Luồng vận hành các Hub
### 📌 Nội dung Slide (Bullet points):
* **Sơ đồ trang web (Sitemap) & Wireframe Figma:**
  * Tổ chức cấu trúc và điều hướng hệ thống xoay quanh Dashboard trung tâm dẫn đến 7 phân hệ chính: Vocabulary Hub, Grammar Hub, Speaking Room, Notebook, Translate/SmartLens, Study Plan, và Profile cá nhân.
  * Phác thảo cấu trúc giao diện thô (Wireframe) trên Figma cho Homepage, Speaking Room (luồng trò chuyện và màn hình phản hồi), Vocabulary Hub, và Notebook nhằm định hình trải nghiệm người dùng (UX) tối ưu.
* **Quy định hệ thống màu sắc (Design System):**
  * Xây dựng bảng mã màu hệ thống đạt chuẩn tương phản thị giác: Primary (Sky 600 - #0284c7), Secondary (Sky 500 - #0ea5e9), Accent (Amber 500 - #f59e0b), Semantic (Emerald 500 - #10b981), và Grayscale (text - #1e293b).
  * Lựa chọn phông chữ Nunito bo tròn hiện đại làm phông chữ thương hiệu để giảm căng thẳng mắt khi học viên sử dụng ứng dụng trong thời gian dài.
* **Thiết kế Đồ họa 3D, Hoạt ảnh & Trực quan hóa dữ liệu (Mục 2.5.3 - 2.5.4):**
  * Mô hình hóa nhân vật trợ lý ảo Dorara 3D trên nền trình duyệt sử dụng WebGL (Three.js & React Three Fiber), kết hợp với Framer Motion tạo chuyển động vi mô mượt mà.
  * Thiết kế các thành phần biểu đồ dữ liệu tiến trình học tập, phân tích cao độ intonation thông qua thư viện Recharts.
* **Quy trình vận hành các Hub học tập:**
  * Sơ đồ hóa luồng học tập khép kín: Học lý thuyết trực quan -> Thực hành củng cố -> Tự động cập nhật tiến độ về PostgreSQL để thuật toán FSRS lập lịch ôn tập.

### 🖼️ Sơ đồ & Bảng biểu trình bày trên Slide:
> [!NOTE]  
> **TÊN CÁC SƠ ĐỒ & BẢNG BIỂU TRÊN SLIDE:**  
> 1. **hình: Sơ đồ các giao diện trang chính Sitemap của ứng dụng DailyEng (nằm ở mục 3.8.1.1)**  
> 2. **bảng: Bảng quy định hệ thống màu sắc (Design System) (nằm ở mục 3.8.3.1)**  
> 3. **hình: Quy trình vận hành các Hub (nằm ở mục 3.8.1)**

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để hiện thực hóa ứng dụng một cách tối ưu nhất, chúng em thiết kế kiến trúc thông tin thông qua **hình: Sơ đồ các giao diện trang chính Sitemap**. Để trực quan hóa bố cục và tối ưu trải nghiệm học tập (UX), nhóm đã tiến hành phác thảo cấu trúc giao diện thô (Wireframe) trên Figma cho các màn hình chính.
> 
> Giao diện người dùng được đồng bộ hóa dựa trên một hệ thống **Design System** nhất quán được biểu diễn ở bảng quy định màu sắc. Chúng em lựa chọn bảng màu với tông xanh Sky làm chủ đạo, kết hợp phông chữ Nunito bo tròn tạo cảm giác thân thiện. 
> 
> Ngoài ra, để giao diện sinh động và hiện đại hơn, chúng em thiết kế tích hợp mô hình **3D WebGL** cho trợ lý Dorara và sử dụng các biểu đồ **Recharts** trực quan hóa dữ liệu học tập. Các luồng học tập được vận hành khép kín và nhất quán, người học tiếp thu kiến thức từ lý thuyết, làm bài tập vận dụng ngay và tự động hóa lưu tiến độ học tập vào database để FSRS tính toán lịch ôn tập."*

---

## SLIDE 11: JAVA 21 VIRTUAL THREADS - TỐI ƯU CHO CÁC LUỒNG XỬ LÝ AI
* **Phần:** 3. Hiện thực hóa & Kiểm thử hệ thống
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
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **sơ đồ: Cơ chế hoạt động của Virtual Threads khi xử lý các cuộc gọi API AI nghẽn I/O (nằm ở mục 4.2)**  
> *(Vẽ sơ đồ mô tả JVM điều phối Virtual Threads: Khi gặp tác vụ chờ API từ Azure/Gemini, Virtual Thread chuyển sang trạng thái Blocked, JVM giải phóng Platform Thread vật lý để xử lý các Task khác, khi có dữ liệu phản hồi, Virtual Thread được kết nối trở lại để chạy tiếp).*

### 🎙️ Script thuyết trình (2 phút):
> *"Một trong những điểm nhấn kỹ thuật quan trọng trong phần Backend Java của đồ án này là việc ứng dụng tính năng **Virtual Threads** mới của Java 21. 
> 
> Thưa các thầy cô, các chức năng tương tác như luyện đàm thoại hay chấm điểm giọng nói đòi hỏi Backend Java phải thực hiện các cuộc gọi API đến dịch vụ đám mây của Azure và Google. Các tác vụ này có đặc thù là tiêu tốn nhiều thời gian chờ đợi phản hồi từ mạng, thường dao động từ 1.5 đến 4 giây. 
> 
> Trong mô hình Spring Boot truyền thống, mỗi yêu cầu của người dùng sẽ chiếm dụng hoàn toàn một luồng vật lý của hệ điều hành. Nếu có nhiều người dùng cùng đàm thoại AI một lúc, hệ thống sẽ nhanh chóng cạn kiệt luồng và dẫn đến nghẽn mạng. 
> 
> Bằng cách cấu hình Spring Boot 3.4 chạy trên nền **Java 21 Virtual Threads**, JVM sẽ tự động giải phóng luồng vật lý đang chờ phản hồi AI để phục vụ các yêu cầu khác. Khi có tín hiệu dữ liệu trả về từ Azure hoặc Google, luồng ảo được kích hoạt trở lại để tiếp tục xử lý. Cơ chế này giúp Backend xử lý đồng thời số lượng lớn phiên hội thoại AI với mức tiêu hao tài nguyên máy chủ thấp."*

---

## SLIDE 12: CƠ CHẾ JAVA TÍCH HỢP SPEECH ENGINE & DỊCH VỤ BÊN THỨ BA
* **Phần:** 3. Hiện thực hóa & Kiểm thử hệ thống
* **Nội dung:** Tích hợp các SDK AI & Dịch vụ bên thứ ba ở Backend Java
### 📌 Nội dung Slide (Bullet points):
* **Tích hợp Azure Speech SDK tại Backend Java:**
  * Nạp thư viện client-sdk của Microsoft trong tệp Maven `pom.xml`.
  * Khởi tạo `PronunciationAssessmentConfig` để thiết lập chấm điểm 100 điểm, chi tiết ở mức độ âm vị để đánh giá ngữ điệu và phát âm chi tiết.
  * Thu nhận luồng âm thanh dạng byte array từ Client, gửi trực tiếp qua SDK và bóc tách kết quả chấm điểm từng âm tiết để lưu vào database.
* **Tích hợp Azure AI Translator & Azure AI Vision (OCR):**
  * **Azure AI Translator:** API v3.0 hỗ trợ dịch thuật song ngữ văn bản nhanh chóng.
  * **Azure AI Vision (OCR):** Trích xuất văn bản từ hình ảnh của tính năng SmartLens, bóc tách chuỗi text kèm tọa độ vùng chữ trên ảnh để hiển thị đè bản dịch lên ảnh gốc ở Client.
* **Tích hợp Google Generative AI SDK cho Java:**
  * Sử dụng thư viện google-genai chính thức để kết nối mô hình `gemini-2.5-flash` đóng vai giáo viên chỉnh sửa ngữ pháp kiên nhẫn.
  * Phân tích và sửa lỗi: Java Service thu thập toàn bộ lịch sử đàm thoại của phiên học, gửi yêu cầu phân tích lỗi và cách diễn đạt tốt hơn, sau đó lưu kết quả đánh giá vào thực thể SpeakingSession.
* **Tích hợp Auth.js & Cloudinary (Mục 3.7.2):**
  * Tích hợp Auth.js ở lớp BFF Next.js giúp quản lý phiên đăng nhập OAuth2 và đồng bộ thông tin người dùng xuống Backend.
  * Kết nối SDK Cloudinary hỗ trợ upload và lưu trữ hình ảnh avatar người dùng an toàn.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **sơ đồ: Sơ đồ tuần tự tương tác gọi API AI thông qua Java Backend (nằm ở mục 3.8)**  
> *(Sequence Diagram mô tả luồng: Client gửi Audio -> Java Controller -> Java Service -> Azure AI Speech SDK -> Nhận kết quả đánh giá -> Java Service gửi lịch sử hội thoại -> Google Gemini Java SDK -> Nhận phản hồi sửa lỗi -> Trả về kết quả tổng hợp cho Client).*

### 🎙️ Script thuyết trình (2 phút):
> *"Mục tiêu cốt lõi của đồ án là tích hợp AI vào hệ thống lập trình Java, và chúng em đã thực hiện điều này bằng việc kết hợp trực tiếp các SDK AI chính thức tại tầng Backend. 
> 
> Đối với tính năng luyện nói, tệp cấu hình Maven `pom.xml` nạp thư viện `client-sdk` của Microsoft Azure Speech. Lớp `SpeakingSessionService` bằng Java sẽ thiết lập đối tượng cấu hình `PronunciationAssessmentConfig` để chấm điểm chi tiết ở mức độ âm vị và cao độ giọng nói. Kết quả chấm điểm sẽ được Java bóc tách từ đối tượng SDK trả về và lưu vào database. 
> 
> Chúng em cũng tích hợp **Azure AI Translator** để dịch thuật văn bản và **Azure AI Vision** để nhận diện ký tự quang học OCR kèm tọa độ vùng chữ cho chức năng SmartLens. 
> 
> Bên cạnh đó, chúng em tích hợp **Google Generative AI SDK** cho Java để làm bộ não đàm thoại. Bằng cách sử dụng các đoạn mã Java thiết lập thuộc tính System Instruction, chúng em định hình phong cách phản hồi của AI luôn là một giáo viên bản xứ. Khi kết thúc cuộc đàm thoại, Java Service sẽ thu thập toàn bộ các lượt thoại đã lưu, đóng gói thành một prompt gửi đến Gemini API để nhận về kết quả sửa lỗi và các câu đề xuất thay thế tốt hơn.
> 
> Cuối cùng, hệ thống tích hợp **Auth.js** ở BFF để xác thực OAuth2 an toàn và **Cloudinary** để hỗ trợ người dùng upload ảnh đại diện mượt mà."*

---

## SLIDE 13: THUẬT TOÁN ÔN TẬP NGẮT QUÃNG FSRS CÀI ĐẶT BẰNG JAVA
* **Phần:** 3. Hiện thực hóa & Kiểm thử hệ thống
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
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **hình: Luồng ánh xạ dữ liệu và cập nhật thông số FSRS trong Database (nằm ở mục 3.5)**  
> *(Biểu diễn luồng tương tác: Người dùng học Vocabulary Hub -> đánh giá Flashcard -> Next.js gọi Server Action -> Spring Boot nhận yêu cầu -> gọi Class FsrsAlgorithm xử lý -> cập nhật UserVocabProgress và ghi lịch sử vào ReviewLog).*

### 🎙️ Script thuyết trình (2 phút):
> *"Em xin trình bày sâu hơn về khía cạnh khoa học của đồ án – thuật toán ôn tập ngắt quãng **FSRS-4.5** được chúng em tích hợp trực tiếp tại phân hệ **Vocabulary Hub**. 
> 
> Về mặt toán học, thuật toán FSRS dự đoán khả năng nhớ lại R của một từ vựng sau $t$ ngày dựa trên hai thông số là Độ bền trí nhớ S và Độ khó D của từ đó. Mục tiêu cốt lõi của FSRS là lên lịch ôn tập đúng vào ngày khả năng nhớ lại R giảm xuống sát ngưỡng 90%. Đây là thời điểm phù hợp để bộ não tiếp nhận lại thông tin, giúp củng cố độ bền S lên mức cao hơn mà không tốn nhiều công sức học lại từ đầu. 
> 
> Lớp nghiệp vụ `FsrsAlgorithm.java` được chúng em xây dựng trực tiếp trên Backend. Khi học viên học từ mới tại Vocabulary Hub và nhấn nút đánh giá từ vựng theo các mức độ Again, Hard, Good hay Easy, mã nguồn Java sẽ tự động áp dụng công thức toán học để tính toán lại độ bền trí nhớ S, cập nhật độ khó D thích ứng, sau đó tính ra số ngày ôn tập tiếp theo và lưu trực tiếp trường dữ liệu `nextReview` vào bảng `UserVocabProgress` trong cơ sở dữ liệu. Nhờ vậy, tiến trình ôn tập từ vựng của học viên tại Vocabulary Hub luôn được vận hành một cách tự động và cá nhân hóa."*

---

## SLIDE 14: HIỆN THỰC HÓA MODULE HỌC TẬP & HỆ THỐNG GAMIFICATION
* **Phần:** 3. Hiện thực hóa & Kiểm thử hệ thống
* **Nội dung:** Hiện thực hóa Gamification XP, Streak, Leaderboard & Tiến độ học tập
### 📌 Nội dung Slide (Bullet points):
* **Hiện thực hóa Module Gamification (Mục 4.2.5):**
  * **Hệ thống nhiệm vụ hàng ngày:** Khi người học hoàn thành các bài học từ vựng, ngữ pháp hay luyện nói, Spring Boot Backend sẽ cập nhật tiến trình trong bảng `UserDailyMission` tương ứng với định nghĩa trong bảng `DailyMission`.
  * **Cơ chế điểm thưởng XP & Streak:** Khi hoàn thành nhiệm vụ, hệ thống cộng điểm XP tích lũy và cập nhật chuỗi ngày học liên tục (Streak) lưu trong bảng `ProfileStats`.
  * **Bảng xếp hạng (Leaderboard):** Xếp hạng thi đua giữa những người học dựa trên tổng điểm XP tích lũy được lưu trữ tối ưu thông qua bảng `LeaderboardEntry` kết hợp với caching tầng Service để truy vấn nhanh chóng.
* **Theo dõi tiến độ học tập (Learning Progress Tracking):**
  * Quản lý trạng thái học tập chi tiết của người học trên từng chủ đề (`UserTopicProgress`) và từng bài học nhỏ (`UserLessonProgress`).
  * Ghi nhận nhật ký hoạt động học tập hàng ngày qua bảng `UserActivity` để kết xuất biểu đồ lịch sử học tập (Heatmap đóng vai trò củng cố động lực học tập) phía Client.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để khuyến khích người học duy trì thói quen học tập hàng ngày, chúng em đã hiện thực hóa hệ thống **Gamification** ở Mục 4.2.5 trong báo cáo. 
> 
> Hệ thống định nghĩa các Nhiệm vụ hàng ngày như học thêm 10 từ mới hay luyện nói 5 phút. Khi người dùng thực hiện hoạt động, Backend Java sẽ tự động cập nhật tiến trình vào bảng `UserDailyMission`. Khi nhiệm vụ hoàn thành, người học được cộng điểm XP và hệ thống tự động kiểm tra để duy trì hoặc tăng chuỗi ngày học Streak trong bảng `ProfileStats`. 
> 
> Điểm XP này cũng là căn cứ để xếp hạng thi đua trên Leaderboard. Để tối ưu hóa hiệu năng truy vấn bảng xếp hạng khi số lượng người dùng lớn, chúng em lưu trữ sẵn dữ liệu xếp hạng trong thực thể `LeaderboardEntry` và áp dụng bộ nhớ đệm Caffeine Cache ở Backend, giúp giảm tải tối đa cho PostgreSQL. 
> 
> Đồng thời, mọi hoạt động học tập đều được ghi nhận vào nhật ký `UserActivity` để hiển thị biểu đồ Heatmap hoạt động, giúp người học theo dõi tiến độ một cách trực quan nhất."*

---

## SLIDE 15: KIỂM THỬ TỰ ĐỘNG & ĐẢM BẢO CHẤT LƯỢNG HỆ THỐNG
* **Phần:** 3. Hiện thực hóa & Kiểm thử hệ thống
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
> **TÊN BẢNG BIỂU TRÊN SLIDE:** **bảng: Bảng tổng hợp kết quả kiểm thử tự động (nằm ở mục 4.4.2.4)**  
> *(Bảng thống kê chi tiết số lượng Unit Test Cases hoàn thành thành công 100% của các phân hệ để chứng minh tính ổn định của mã nguồn).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để đảm bảo tính bền vững, tin cậy và không xảy ra lỗi logic khi nâng cấp hệ thống, chúng em đã thực hiện kiểm thử tự động nghiêm ngặt trên toàn bộ mã nguồn. 
> 
> Tại Backend Java, chúng em xây dựng bộ **55 kiểm thử tự động (Unit Test)** sử dụng JUnit 5 và Mockito. Các module nghiệp vụ cốt lõi từ Xác thực, Từ vựng cho đến lớp tính toán thuật toán FSRS đều được kiểm thử kỹ lưỡng. Tại phía Frontend, các component cũng được test bằng Vitest. 
> 
> Như thống kê tại **bảng: Bảng tổng hợp kết quả kiểm thử tự động**, toàn bộ 55 test cases đều hoàn thành chính xác 100%. Bên cạnh đó, hệ thống cũng tích hợp Sentry để giám sát lỗi runtime thời gian thực trên cả Next.js và Spring Boot, kết hợp Spring Boot Actuator giúp theo dõi sức khỏe hệ thống khi vận hành, đảm bảo phát hiện sớm và xử lý nhanh chóng các sự cố phát sinh."*

---

## SLIDE 16: ĐÓNG GÓI CONTAINER DOCKER & QUY TRÌNH CI/CD ĐÁM MÂY
* **Phần:** 4. Triển khai & Demo sản phẩm
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
> 1. **sơ đồ: Quy trình đóng gói đa tầng Multi-stage Build và khởi chạy Docker Container (nằm ở mục 4.1)**  
> 2. **sơ đồ: Kiến trúc triển khai vật lý hệ thống DailyEng trên hạ tầng đám mây (nằm ở mục 4.2)**

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để triển khai ứng dụng lên môi trường internet một cách chuyên nghiệp, chúng em đã thiết lập quy trình CI/CD và container hóa hoàn toàn ứng dụng bằng Docker. 
> 
> Như mô tả ở sơ đồ quy trình đóng gói, nhóm áp dụng chiến lược đóng gói **Multi-stage Build**. Tại giai đoạn Build, hệ thống sử dụng môi trường Maven đầy đủ để biên dịch mã nguồn Java thành file JAR. Ngay sau đó, ở giai đoạn Run, chúng em chỉ sao chép file JAR này sang một môi trường chạy JRE tinh giản dựa trên Alpine. Phương pháp này giúp rút gọn dung lượng ảnh Docker từ 820MB xuống chỉ còn 180MB, loại bỏ các file thô và giảm thiểu tối đa các nguy cơ bảo mật hệ thống. 
> 
> Quy trình **CI/CD** được thiết lập tự động qua GitHub Actions. Mỗi khi có code mới push lên, hệ thống CI sẽ tự động kích hoạt, xây dựng môi trường chạy thử và thực thi toàn bộ unit test để đảm bảo chất lượng. Nếu vượt qua, quy trình CD sẽ tự động đẩy code Frontend lên Vercel và đóng gói Docker deploy Backend lên Render PaaS, kết nối an toàn với cơ sở dữ liệu Supabase. Để đảm bảo tính sẵn sàng cao khi gọi các API AI, chúng em tích hợp thư viện **Resilience4j Circuit Breaker** giúp tự động ngắt mạch bảo vệ tài nguyên JVM khi các API ngoại vi bị nghẽn mạng."*

---

## SLIDE 17: KẾT QUẢ THỰC NGHIỆM - LIVE DEMO CÁC PHÂN HỆ CỐT LÕI
* **Phần:** 4. Triển khai & Demo sản phẩm
* **Nội dung:** Live Demo các chức năng chính của hệ thống
### 📌 Nội dung Slide (Bullet points):
* **Môi trường Live Demo các chức năng chính:**
  * **Speaking Room (Luyện nói với AI):** Chọn kịch bản -> Mở mic thu âm -> Nhận đánh giá phát âm chi tiết (tính điểm trôi chảy, ngữ điệu, hiển thị biểu đồ cao độ Pitch Intonation) từ Azure Speech SDK -> Gemini AI phản hồi đàm thoại và sửa lỗi ngữ pháp.
  * **Vocabulary Hub & Flashcards:** Trải nghiệm học từ vựng trực quan, lật thẻ Flashcard hai mặt và tự động lên lịch ôn tập ngắt quãng thông qua thuật toán FSRS.
  * **SmartLens (Dịch ảnh OCR):** Upload ảnh -> Hệ thống quét văn bản bằng OCR của Azure Vision -> Hiển thị bản dịch đè khít lên vị trí chữ gốc.
  * **Dorara AI Companion:** Trợ lý ảo hỗ trợ học tập, trả lời dạng văn bản streaming thông qua Server-Sent Events (SSE) hiển thị cùng mô hình avatar 3D chuyển động mượt mà.
  * **Study Plan & User Dashboard:** Quản lý kế hoạch học tập cá nhân hóa và hiển thị biểu đồ thống kê học tập Recharts.

### 🖼️ Hình ảnh trình bày trên Slide:
> [!NOTE]  
> **TÊN CÁC HÌNH ẢNH TRÊN FIGMA/SLIDE:**  
> 1. **hình: Giao diện trang chủ Landing page của hệ thống DailyEng (nằm ở mục 4.5)**.  
> 2. **hình: Giao diện phòng luyện nói và chấm điểm phát âm AI (nằm ở mục 4.6)** *(Hiển thị biểu đồ so sánh cao độ Pitch Intonation).*

### 🎙️ Script thuyết trình (2 phút):
> *"Sau đây, em xin phép trình bày về kết quả thực nghiệm và giao diện thực tế của DailyEng qua các hình ảnh trực quan trên slide. Giao diện trang chủ và các phân hệ học tập được thiết kế hiện đại, tương thích hoàn toàn trên thiết bị di động. 
> 
> Tại phòng luyện nói **Speaking Room**, người học giao tiếp giọng nói tự nhiên với AI. Khi kết thúc nói, hệ thống phản hồi bảng chấm điểm phát âm chi tiết từng từ, chỉ rõ lỗi sai phát âm qua Azure SDK và đưa ra gợi ý sửa lỗi ngữ pháp từ Gemini AI kèm biểu đồ so sánh cao độ giọng nói trực quan. 
> 
> Tại phân hệ **Vocabulary Hub**, giao diện học thẻ Flashcard trực quan thể hiện rõ rệt tiến độ thông thạo từ vựng được tính toán bởi thuật toán FSRS. 
> 
> Tiện ích **SmartLens** giúp người học tải ảnh lên, nhận diện chữ viết bằng công nghệ OCR của Azure AI Vision và dịch thuật trực tiếp đè lên ảnh gốc. 
> 
> Cuối cùng, trợ lý ảo **Dorara** giao tiếp thời gian thực, hiển thị câu trả lời dạng text streaming qua Server-Sent Events (SSE) kết hợp mô hình nhân vật 3D tương tác sống động, giúp tối ưu hóa tối đa trải nghiệm người dùng."*

---

## SLIDE 18: TỔNG KẾT & HƯỚNG PHÁT TRIỂN
* **Phần:** 5. Kết luận & Định hướng phát triển
* **Nội dung:** Tổng kết & Hướng phát triển
### 📌 Nội dung Slide (Bullet points):
* **Mức độ hoàn thiện đề tài (Mục 5.2):**
  * Đồ án đã hoàn thành toàn bộ các mục tiêu đề ra: Xây dựng thành công các phân hệ chức năng cốt lõi và các phân hệ hỗ trợ trên nền tảng Backend Java Spring Boot vững chắc kết hợp Frontend Next.js bảo mật.
* **Ưu điểm thực tế (Mục 5.3.1):** 
  * Tích hợp AI thiết thực, hỗ trợ môi trường đàm thoại và sửa lỗi hữu ích cho người học.
  * Thuật toán FSRS cài đặt trực tiếp bằng Java giúp quản lý ôn tập khoa học.
  * Kiến trúc phân tầng bảo mật an toàn, vận hành Container Docker Multi-stage ổn định trên đám mây.
* **Hạn chế hiện tại (Mục 5.3.2):**
  * Hiện tượng khởi động nguội khi khởi chạy container do Backend sử dụng gói máy chủ Render miễn phí.
  * Phụ thuộc vào kết nối Internet liên tục và tính sẵn sàng của các nhà cung cấp đám mây API.
* **Hướng phát triển tiếp theo (Mục 5.4):**
  * Nghiên cứu tích hợp các mô hình ngôn ngữ lớn gọn nhẹ chạy cục bộ như Gemma 2B, Llama 3B để giảm chi phí API và nâng cao tính độc lập của Backend.
  * Xây dựng chế độ học ngoại tuyến cho Flashcard SRS.
  * Mở rộng thêm nhiều ngôn ngữ rèn luyện khác như tiếng Nhật, tiếng Trung, và tiếng Hàn.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Tổng kết lại, đồ án DailyEng đã hoàn thành đầy đủ các mục tiêu chức năng và phi chức năng đặt ra ban đầu ở Mục 5.2 trong báo cáo. Chúng em đã xây dựng thành công một ứng dụng học tập tích hợp AI thiết thực trên nền tảng Backend Java Spring Boot vững chắc và bảo mật. 
> 
> Bên cạnh những ưu điểm về tính năng tương tác nói tự nhiên và thuật toán FSRS lập lịch ôn tập thông minh bằng Java, hệ thống vẫn có những hạn chế nhất định như hiện tượng khởi động nguội do Backend đang triển khai trên máy chủ đám mây gói miễn phí của Render, và sự phụ thuộc hoàn toàn vào kết nối internet để gọi các API AI ngoại vi. 
> 
> Trong tương lai, để nâng cao tính bảo mật dữ liệu và giảm chi phí vận hành API, nhóm định hướng sẽ nghiên cứu tích hợp các mô hình ngôn ngữ lớn gọn nhẹ chạy cục bộ ngay trên máy chủ Backend Java như Gemma 2B hay Llama 3B, đồng thời phát triển chế độ Offline Mode để hỗ trợ ôn tập từ vựng ngay cả khi không có kết nối internet. 
> 
> Chúng em xin chân thành cảm ơn các thầy cô trong Hội đồng đã dành thời gian chú ý lắng nghe phần trình bày. Nhóm chúng em rất mong nhận được những câu hỏi chất vấn và ý kiến đóng góp từ các thầy cô để hoàn thiện đề tài hơn nữa. Em xin chân thành cảm ơn!"*
