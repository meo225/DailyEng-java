# KỊCH BẢN THUYẾT TRÌNH ĐỒ ÁN: DAILYENG
**Thời lượng thuyết trình dự kiến:** 12 - 15 phút | **Trọng tâm công nghệ:** Tích hợp AI trên nền Backend Java Spring Boot 3.4 và Java 21 kết hợp Frontend Next.js 15

## Mở đầu (~1 slide)

### Mục lục nội dung báo cáo
#### 📌 Nội dung Slide:
* **Phần 1: Tổng quan đề tài & Công nghệ sử dụng**
* **Phần 2: Phân tích yêu cầu & Thiết kế hệ thống**
* **Phần 3: Triển khai và kiểm thử hệ thống**
* **Phần 4: CI/CD & Demo sản phẩm**
* **Phần 5: Kết luận & Định hướng phát triển**

#### 🎙️ Script thuyết trình:
> *"Em xin chào thầy/cô và các bạn. Hôm nay, em xin phép đại diện nhóm báo cáo về đồ án cuối kỳ môn học của chúng em. Trước khi đi vào chi tiết, em xin tóm tắt bố cục bài thuyết trình hôm nay gồm 5 phần chính: Phần đầu tiên giới thiệu về bối cảnh đề tài, thực trạng và giới thiệu sơ lược về hệ sinh thái công nghệ sử dụng; phần 2 đi sâu vào phân tích yêu cầu từ use case, sitemap giao diện Figma đến thiết kế cơ sở dữ liệu ERD và cấu trúc OOP trong Spring Boot; phần 3 tập trung vào việc triển khai mã nguồn backend, tích hợp các thuật toán và kiểm thử hệ thống; phần 4 trình bày quy trình đóng gói, thiết lập CI/CD và live demo trực tiếp các tính năng; và cuối cùng phần 5 tổng kết ưu/nhược điểm và định hướng phát triển trong tương lai."*

---

## Phần 1: Tổng quan đề tài & Công nghệ sử dụng (~3 slides)

### Bối cảnh, Thực trạng & Mục tiêu đề tài
#### 📌 Nội dung Slide:
* **Bối cảnh thực tiễn:** 
  * Nhu cầu học tiếng Anh giao tiếp và tích lũy từ vựng ngày càng tăng.
  * Người học thường thiếu môi trường thực hành phản xạ đàm thoại trực tiếp và dễ quên từ vựng nhanh chóng (đường cong quên lãng).
* **Khảo sát & Thực trạng:** Các giải pháp hiện tại bị phân mảnh (PrepTalk, YouPass) — chỉ tập trung vào bài học tĩnh hoặc trắc nghiệm chuẩn hóa, thiếu tính năng tương tác nói phản xạ 2 chiều thông minh kết hợp ôn tập ngắt quãng động.
* **Định hướng giải pháp & Phân rã mục tiêu:**
  * **Mục tiêu sản phẩm:** Xây dựng ứng dụng DailyEng đồng bộ 6 phân hệ cốt lõi tạo chu trình học tập khép kín dạng Ứng dụng tích hợp AI (AI-Integrated Web App).
  * **Mục tiêu kiến thức:** Làm chủ Java 21 (Virtual Threads), Spring Boot 3.4, các AI SDK (Azure Speech, Gemini) và thuật toán FSRS chạy local.

#### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Đồ thị Đường cong quên lãng (Forgetting Curve) & Sơ đồ chu trình học khép kín:** Biểu diễn trực quan tỷ lệ suy giảm trí nhớ tự nhiên để dẫn dắt lý do cần thuật toán FSRS, kết hợp vòng tròn mô tả quá trình học tập khép kín kết hợp giữa học lý thuyết, thực hành phản xạ nói với AI để tạo ấn tượng tổng quan đầu tiên cho thầy/cô.

#### 🎙️ Script thuyết trình:
> *"Đầu tiên, em xin phép đi vào Phần 1: Tổng quan đề tài. Trong quá trình tìm hiểu thực tiễn học ngoại ngữ, nhóm em nhận thấy người học tại Việt Nam thường gặp khó khăn ở hai khía cạnh lớn: thiếu môi trường thực hành phản xạ nói tự nhiên và chưa có phương pháp để ghi nhớ từ vựng dài hạn. Qua khảo sát các website học tiếng Anh phổ biến hiện nay, nhóm em nhận thấy các giải pháp hiện tại đều khá phân mảnh: hoặc chỉ mạnh về đàm thoại nhưng chi phí cao, hoặc chỉ học từ vựng tĩnh mà thiếu đi tính tương tác đàm thoại phản xạ 2 chiều và chưa tối ưu lịch ôn tập tự động.
> 
> Nhằm giải quyết các vấn đề trên, đồ án DailyEng hướng tới xây dựng một ứng dụng học tập hỗ trợ chu trình học khép kín, lấy kỹ nghệ phần mềm và tối ưu hệ thống làm trọng tâm. Backend bằng Java Spring Boot sẽ đóng vai trò điều phối, tích hợp tối ưu các dịch vụ AI đám mây của Azure và Google để đảm bảo chất lượng phản hồi tốt nhất, đồng thời tự lập trình thuật toán ôn tập ngắt quãng FSRS trực tiếp bằng Java để cá nhân hóa lịch học từ vựng nội bộ."*

---

### Giải pháp & Phân hệ cốt lõi
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

#### 🎙️ Script thuyết trình:
> *"Hệ thống DailyEng được thiết kế để tạo nên một chu trình học tập khép kín từ lý thuyết đến thực hành phản xạ. 
> 
> Sáu phân hệ cốt lõi bao gồm: **Speaking Room** giúp luyện nói phản xạ và nhận chấm điểm chi tiết từ AI; **Vocabulary Hub** và **Grammar Hub** cung cấp kho kiến thức nền tảng có hệ thống. Khi học viên gặp từ mới hoặc cấu trúc ngữ pháp cần lưu ý, họ có thể lưu vào **Notebook** để ôn tập lại bằng thẻ Flashcard. Để tăng tính tương tác, nhóm em phát triển trợ lý ảo **Dorara** giao tiếp thời gian thực, và tính năng **SmartLens** giúp người học tải ảnh lên, nhận diện chữ viết bằng OCR và dịch thuật trực tiếp đè lên ảnh gốc.
> 
> Bên cạnh đó, hệ thống còn hỗ trợ làm bài **Kiểm tra đầu vào** để gợi ý **Kế hoạch học tập**, đồng thời duy trì động lực học bằng cơ chế **Gamification** tích lũy điểm XP, giữ chuỗi Streak học tập và đua bảng xếp hạng Leaderboard."*

---

### Giới thiệu công nghệ sử dụng (Tech Stack)
#### 📌 Nội dung Slide:
* **Kiến trúc phân tách Client - Server:**
  * **Frontend (Next.js 15 & React 19):** Sử dụng React Server Components (RSC) tối ưu hóa kết xuất trang, Zustand quản lý trạng thái, Next.js Server Actions đóng vai trò BFF (Backend-For-Frontend) che giấu API endpoint, kết hợp WebGL (Three.js) cho nhân vật 3D và Recharts để vẽ biểu đồ học tập.
  * **Backend (Spring Boot 3.4 & Java 21):** Trung tâm điều phối, xử lý logic nghiệp vụ và bảo mật. Sử dụng Java 21 Virtual Threads (Project Loom) tối ưu I/O nghẽn, Spring Data JPA & Hibernate ORM, Caffeine Cache, và Flyway quản lý phiên bản database.
* **Tích hợp dịch vụ AI tối ưu (SaaS Integration):**
  * Sử dụng API/SDK chính thức từ các nhà cung cấp đám mây lớn (Microsoft, Google) để đạt độ chính xác cao nhất mà không cần tốn tài nguyên huấn luyện mô hình (Speech Service, Translator, Vision OCR, Gemini 2.5).
  * Backend Java đóng vai trò tiền xử lý dữ liệu, bóc tách kết quả AI và đồng bộ hóa nghiệp vụ.
  * **Thuật toán ôn tập khoa học FSRS-4.5:** Thuật toán ôn tập ngắt quãng (Free Spaced Repetition Scheduler) được tự cài đặt bằng ngôn ngữ Java chạy local.

#### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Sơ đồ khối Tech Stack (Next.js - Spring Boot):** Mindmap các biểu tượng logo công nghệ kết nối với nhau, mô tả vai trò của từng thành phần (Zustand, Three.js, Spring Boot, Java 21, Supabase, Azure SDK, Gemini SDK, Docker) tạo cảm giác chuyên nghiệp.

#### 🎙️ Script thuyết trình:
> *"Để hiện thực hóa DailyEng, nhóm em đã lựa chọn một hệ sinh thái công nghệ bổ trợ lẫn nhau một cách tối ưu theo hướng **Ứng dụng tích hợp AI (AI-Integrated Web Application)**.
> 
> Phía Client sử dụng **Next.js 15** và **React 19** với React Server Components giúp tối ưu giao diện và tốc độ tải. Next.js Server Actions đóng vai trò BFF bảo mật, tích hợp Auth.js để xác thực và ẩn endpoint Backend. Ngoài ra, nhóm em còn dùng WebGL Three.js dựng trợ lý ảo 3D sinh động và Recharts trực quan hóa dữ liệu học tập.
> 
> Trọng tâm là **Backend Java Spring Boot 3.4** chạy trên **Java 21**. Nhờ Virtual Threads, Backend duy trì hiệu năng cao khi nhiều người dùng gọi AI đồng thời. Cơ sở dữ liệu PostgreSQL được quản lý phiên bản chuyên nghiệp qua Flyway và truy vấn được tối ưu bằng Caffeine Cache.
> 
> Về AI, thay vì tự huấn luyện mô hình tốn kém tài nguyên tính toán, nhóm em áp dụng chiến lược **tích hợp dịch vụ (SaaS Integration)**: sử dụng các SDK chính thức của Microsoft Azure và Google để đạt độ chính xác và chất lượng cao nhất. Backend Java sẽ **điều phối luồng dữ liệu, tiền xử lý và bóc tách kết quả AI** để xử lý nghiệp vụ học tập. Đặc biệt, nhóm em tự lập trình **thuật toán FSRS** bằng Java chạy hoàn toàn local để cá nhân hóa lịch học từ vựng."*

---

## Phần 2: Phân tích yêu cầu & Thiết kế hệ thống (~4 slides)

### Yêu cầu hệ thống: Sơ đồ Use Case & Sitemap Figma
#### 📌 Nội dung Slide:
* **Sơ đồ trang web (Sitemap) & Wireframe Figma:**
  * Tổ chức cấu trúc và điều hướng hệ thống xoay quanh Dashboard trung tâm dẫn đến các phân hệ chính giúp định hình trải nghiệm người dùng (UX) tối ưu trước khi lập trình.
  * Phác thảo cấu trúc giao diện thô (Wireframe) trên Figma cho Homepage, Speaking Room (luồng trò chuyện và màn hình phản hồi), Vocabulary Hub, và Notebook.
* **Phân quyền người dùng rõ ràng:**
  * **Khách:** Đăng ký, đăng nhập tài khoản, làm bài kiểm tra trình độ đầu vào (Placement Test).
  * **Người học:** Thực hiện đầy đủ các chức năng học từ vựng, ngữ pháp, luyện nói với AI, quản lý sổ tay cá nhân, theo dõi tiến độ và tham gia gamification.
* **Bốn Use Case cốt lõi thiết kế chi tiết (Mục 3.2.2):**
  * **Use Case 1 (Đăng ký tài khoản):** Xác thực an toàn qua form hoặc OAuth2, đồng bộ dữ liệu.
  * **Use Case 2 (Luyện nói với AI):** Đàm thoại phản xạ 2 chiều qua microphone, chấm điểm phát âm chi tiết.
  * **Use Case 3 (Học từ vựng với Flashcards):** Đánh giá thẻ học, gọi thuật toán FSRS để tự động cập nhật lịch ôn tập.
  * **Use Case 4 (Chat với Dorara AI):** Giao tiếp thời gian thực, stream văn bản giải đáp kiến thức học tập.

#### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Biểu đồ Use Case tổng quát (nằm ở mục 3.2.1) & Sitemap Figma (nằm ở mục 3.8.1.1)**  
> *(Hiển thị sơ đồ Use Case vẽ bằng Mermaid từ Chương 3 - Mục 3.2.1 kết hợp sơ đồ sitemap điều hướng để thầy/cô đánh giá tính chuẩn hóa trong quy trình thiết kế phần mềm).*

#### 🎙️ Script thuyết trình:
> *"Xin mời thầy/cô và các bạn quan sát **Sơ đồ Use Case tổng quát và cấu trúc Sitemap của DailyEng**. Hệ thống được nhóm em thiết kế dựa trên trải nghiệm UX tối ưu phác thảo từ Figma với cấu trúc sitemap xoay quanh Dashboard trung tâm, chia làm hai nhóm đối tượng là Khách và Người học. 
> 
> Trong đó, nhóm em đặc tả chi tiết 4 Use Case cốt lõi bao gồm: Đăng ký tài khoản, Luyện nói với AI, Học từ vựng với Flashcard, và Chat với trợ lý ảo Dorara. Ở mỗi Use Case, nhóm em đều phân tích kỹ lưỡng luồng sự kiện chính (Basic Flow), các luồng phụ (Alternative Flows) và các kịch bản xử lý lỗi ngoại lệ (Exception Flows) ở Mục 3.2.2 trong báo cáo nhằm đảm bảo tính toàn vẹn và logic khi vận hành thực tế."*

---

### Kiến trúc hệ thống tổng quan & Vai trò của Java Backend
#### 📌 Nội dung Slide:
* **Kiến trúc phân tầng chuẩn hóa:**
  * **Client Layer:** Next.js 15 kết hợp React 19, sử dụng Zustand quản lý trạng thái toàn cục tinh gọn. Tích hợp thư viện WebGL Three.js cho nhân vật 3D và Recharts để hiển thị biểu đồ học tập trực quan.
  * **BFF Layer (Next.js Server Actions):** Đóng vai trò cổng Facade trung gian, phối hợp với Auth.js để quản lý session và đính kèm JWT Token từ Cookie HttpOnly bảo mật, tránh lộ API endpoint Backend trực tiếp và chống tấn công XSS.
  * **Server Layer (Spring Boot 3.4 & Java 21):** Trung tâm xử lý logic nghiệp vụ và bảo mật. Phân chia package module hóa rõ ràng: `auth`, `vocabulary`, `grammar`, `speaking`, `srs`, `xp`. Tích hợp Caffeine Cache tại tầng Service để giảm tải cho database.
  * **Data Layer:** PostgreSQL 16 triển khai trên Supabase Cloud, quản lý kết nối qua Connection Pooling HikariCP được cấu hình tối ưu.

#### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Sơ đồ kiến trúc phân tầng logic (Full-Stack) và luồng giao tiếp (nằm ở mục 3.4)**  
> *(Vẽ lại sơ đồ kiến trúc ở Chương 3 - Mục 3.4 mô tả 4 tầng chính: Client Layer, BFF Layer, Server Layer, và Database Layer).*

#### 🎙️ Script thuyết trình:
> *"Để đảm bảo tính độc lập, dễ mở rộng và bảo mật, hệ thống được thiết kế theo cấu trúc phân tầng Full-Stack như mô tả trên sơ đồ. 
> 
> Ở phía Client, nhóm em phát triển giao diện bằng Next.js 15 để tối ưu hóa tốc độ tải trang, sử dụng Zustand quản lý trạng thái client gọn nhẹ, kết hợp Three.js cho trợ lý 3D và Recharts để vẽ biểu đồ tiến độ học tập.
> 
> Lớp trung gian BFF sử dụng Next.js Server Actions tích hợp Auth.js giúp giải quyết vấn đề CORS, hoạt động như một lớp bảo vệ che giấu các địa chỉ endpoint Backend và tự động đính kèm mã JWT Token từ Cookie HttpOnly bảo mật. 
> 
> Trọng tâm của đồ án là tầng Backend API được xây dựng bằng **Java Spring Boot 3.4** chạy trên nền **Java 21**. Hệ thống mã nguồn Java được phân chia theo kiến trúc module khoa học. Để tối ưu hóa hiệu năng, nhóm em sử dụng connection pool **HikariCP** kết hợp với bộ nhớ đệm in-memory **Caffeine** tại tầng Service, giúp giảm số lượng truy vấn trực tiếp vào cơ sở dữ liệu PostgreSQL phía dưới khi người dùng yêu cầu các dữ liệu tĩnh như chủ đề hay bài học."*

---

### Thiết kế cơ sở dữ liệu, Định danh CUID2 & Flyway Migration
#### 📌 Nội dung Slide:
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

#### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Sơ đồ thực thể kết hợp ERD chi tiết của hệ thống DailyEng (nằm ở mục 3.3.1)**  
> *(Hiển thị sơ đồ ERD chi tiết từ mục 3.3.1 biểu diễn mối quan hệ giữa User, UserVocabProgress, VocabItem, SpeakingSession, và NotebookItem. Có thể chèn thêm hình ảnh chụp migrations của Flyway để minh chứng).*

#### 🎙️ Script thuyết trình:
> *"Tiếp theo, em xin trình bày về cấu trúc dữ liệu ở Backend. Toàn bộ 35 bảng trong database PostgreSQL được ánh xạ sang các thực thể Java thông qua **Spring Data JPA** như sơ đồ ERD trên slide. 
> 
> Trong cấu trúc này, bảng User đóng vai trò trung tâm, liên kết với thông tin học tập ProfileStats, kế hoạch StudyPlan, các phiên luyện nói SpeakingSession và tiến trình từ vựng UserVocabProgress. 
> 
> Để quản lý định danh an toàn, tất cả các thực thể đều kế thừa lớp `BaseEntity` và tự động sở hữu cơ chế sinh khóa chính sử dụng chuỗi **CUID2**. CUID2 giúp PostgreSQL tối ưu hóa hiệu năng khi chèn dữ liệu mới, đồng thời giúp bảo vệ an toàn cho đường dẫn URL, ngăn ngừa các lỗ hổng rò rỉ thông tin. 
> 
> Đặc biệt, để quản lý thay đổi cấu trúc cơ sở dữ liệu một cách nhất quán, nhóm em tích hợp **Flyway Migration**. Mọi thay đổi cấu trúc bảng đều được ghi nhận dưới dạng file SQL có đánh số phiên bản, tự động chạy khi start server, giúp đồng bộ DB tức thời giữa local và đám mây Supabase mà không gặp xung đột."*

---

### Cấu trúc OOP, Design Patterns & Thiết kế RESTful API/SSE
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
> *(Biểu diễn Sequence Diagram mô tả luồng xác thực JWT kết hợp Class Diagram thể hiện quan hệ DTO/Entity).*

#### 🎙️ Script thuyết trình:
> *"Để mã nguồn dự án Java có cấu trúc tốt, dễ bảo trì và mở rộng, nhóm em đã áp dụng các nguyên lý hướng đối tượng OOP và các Design Patterns tiêu chuẩn. Mọi logic nghiệp vụ từ điều phối bài học đến tính điểm đều nằm tại tầng Service. Nhóm em áp dụng **DTO Pattern** bằng cấu trúc **Java Records** mới của Java 21 giúp lọc bỏ các trường nhạy cảm trước khi gửi về client.
> 
> Về bảo mật, nhóm em cấu hình kiến trúc xác thực không trạng thái sử dụng **Spring Security** kết hợp **JWT** lưu trong Cookie HttpOnly. Toàn bộ API Backend được thiết kế chuẩn RESTful và xử lý lỗi tập trung qua `@ControllerAdvice`.
> 
> Đặc biệt, để xử lý đàm thoại thời gian thực với AI, nhóm em áp dụng giao thức **Server-Sent Events (SSE)**. Thay vì bắt người học chờ vài giây để nhận toàn bộ câu trả lời từ trợ lý ảo Dorara, SSE cho phép server đẩy từng từ ngay khi AI sinh ra, tạo hiệu ứng chữ chạy thời gian thực cực kỳ mượt mà, tối ưu hóa trải nghiệm."*

---

## Phần 3: Triển khai và kiểm thử hệ thống (~3 slides)

### Tích hợp AI SDKs & Tối ưu hiệu năng bằng Java 21 Virtual Threads
#### 📌 Nội dung Slide:
* **Đặc thù I/O mạng của các cuộc gọi API AI:**
  * Quá trình Backend Java gọi Azure Speech (chấm điểm phát âm) và Google Gemini (giáo viên AI phản xạ đàm thoại) mất từ 1.5 đến 4 giây do phải chờ xử lý âm thanh hoặc sinh văn bản từ đám mây.
  * Mô hình Platform Thread OS truyền thống dễ gây cạn kiệt luồng và nghẽn hệ thống khi có nhiều người dùng đồng thời.
* **Giải pháp Java 21 Virtual Threads (Project Loom):**
  * Luồng ảo siêu nhẹ do JVM quản lý. Khi luồng ảo gặp tắc nghẽn I/O mạng khi chờ API AI, JVM tự động tháo luồng ảo đó ra khỏi luồng vật lý OS và nhường luồng vật lý OS cho yêu cầu xử lý khác.
* **Chiến lược tích hợp dịch vụ đám mây tối ưu (SaaS Integration):**
  * Tích hợp Azure Speech, Translator (dịch thuật), Vision OCR (SmartLens) và Gemini 2.5 flash qua các SDK chính thức để đảm bảo độ chính xác thương mại.
  * Backend Java làm nhiệm vụ điều phối luồng dữ liệu, tiền xử lý và bóc tách kết quả AI, giúp giải phóng tài nguyên CPU/RAM cục bộ cho server.

#### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Sơ đồ cơ chế Virtual Threads (nằm ở mục 4.3.2.2) & Luồng tuần tự tương tác gọi API AI (nằm ở mục 3.6)**  
> *(So sánh trực quan cơ chế Platform Threads nghẽn I/O và Virtual Threads tháo lắp linh hoạt, kết hợp luồng tuần tự tương tác giữa Next.js -> Spring Boot -> Azure/Gemini SDKs).*

#### 🎙️ Script thuyết trình:
> *"Một điểm nhấn công nghệ rất quan trọng ở Backend là việc ứng dụng tính năng **Virtual Threads của Java 21** kết hợp với **Chiến lược tích hợp AI đám mây**. 
> 
> Dạ thưa thầy/cô, các chức năng đàm thoại và chấm điểm giọng nói đòi hỏi Backend phải gọi API đến Azure và Google. Các tác vụ này tiêu tốn thời gian chờ phản hồi mạng từ 1.5 đến 4 giây. Ở mô hình platform thread truyền thống, mỗi request chiếm dụng hoàn toàn một luồng OS, dễ gây nghẽn khi có nhiều người dùng đồng thời. 
> 
> Bằng cách cấu hình Spring Boot 3.4 chạy trên **Virtual Threads**, JVM sẽ tự động giải phóng luồng vật lý OS đang chờ phản hồi AI để xử lý request khác. Cơ chế này giúp Backend duy trì hiệu suất xử lý ổn định, phục vụ đồng thời số lượng lớn phiên đàm thoại AI đám mây chất lượng cao mà tốn cực kỳ ít tài nguyên RAM và CPU máy chủ. Về AI, nhóm em sử dụng các SDK chính thức thay vì tự huấn luyện mô hình tốn kém tài nguyên, để Backend Java tập trung tiền xử lý, bóc tách dữ liệu và chạy thuật toán FSRS."*

---

### Hiện thực hóa thuật toán ôn tập ngắt quãng FSRS
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

#### 🎙️ Script thuyết trình:
> *"Sau đây, em xin trình bày về điểm nổi bật khoa học của đồ án – thuật toán ôn tập ngắt quãng **FSRS-4.5** được nhóm em tự lập trình trên Backend Java. 
> 
> Về mặt toán học, FSRS dự đoán khả năng nhớ lại R của một từ vựng dựa trên hai thông số là Độ bền S và Độ khó D. Mục tiêu của FSRS là tự động lên lịch ôn tập đúng vào thời điểm khả năng nhớ lại giảm xuống sát ngưỡng 90%. Đây chính là thời điểm vàng để bộ não ôn tập lại, giúp khắc sâu từ vựng vào trí nhớ dài hạn hiệu quả nhất. 
> 
> Nhóm em đã lập trình lớp `FsrsAlgorithm.java` trực tiếp bằng Java. Khi người học đánh giá từ vựng theo các mức độ Again, Hard, Good hay Easy tại Vocabulary Hub, backend sẽ tự động áp dụng công thức toán học FSRS để tính độ bền mới, cập nhật độ khó, tính số ngày ôn tập tiếp theo và lưu vào database. Nhờ vậy, tiến trình học từ vựng được cá nhân hóa hoàn toàn tự động cho từng người học."*

---

### Phân hệ Gamification, Caffeine Caching & Kiểm thử QA
#### 📌 Nội dung Slide:
* **Thiết kế Backend cho Gamification (Mục 4.2.5):**
  * **Nhiệm vụ hàng ngày (`DailyMission`):** Spring Boot tự động đồng bộ tiến độ qua bảng trung gian `UserDailyMission` khi người học hoàn thành bài học từ vựng, ngữ pháp hoặc luyện nói.
  * **Hệ thống XP và Streak:** Cộng điểm XP và cập nhật chuỗi ngày học liên tục (Streak) lưu trữ tập trung tại bảng `ProfileStats`.
* **Tối ưu hóa hiệu năng Database & Caching:**
  * **Leaderboard Entry Caching:** Dữ liệu xếp hạng bảng xếp hạng thi đua thời gian thực được lưu sẵn trong thực thể `LeaderboardEntry` kết hợp sử dụng bộ nhớ đệm **Caffeine Cache** tại tầng Service giúp giảm tối đa I/O nghẽn và tải PostgreSQL.
* **Chiến lược kiểm thử tự động (Unit Testing):**
  * Lập trình bộ **55 kiểm thử tự động** sử dụng **JUnit 5** và **Mockito** trên Java Backend để kiểm chứng logic nghiệp vụ lõi (`AuthServiceTest`, `FsrsAlgorithmTest`). Vitest được áp dụng trên Frontend.
  * Toàn bộ 55 test cases đạt tỷ lệ vượt qua tuyệt đối **100%**, đảm bảo tính ổn định tối đa của mã nguồn.
* **Đảm bảo chất lượng tích hợp:** Giám sát lỗi runtime thời gian thực bằng **Sentry SDK** và kiểm soát cấu hình sức khỏe qua cổng **Spring Boot Actuator**.

#### 🖼️ Gợi ý hình ảnh trình bày trên Slide:
> [!TIP]
> **Giao diện Leaderboard & Bảng kết quả kiểm thử tự động (nằm ở mục 4.4.2.4):** Chèn hình ảnh trực quan của bảng xếp hạng thi đua và ô lưới Heatmap thực tế từ UI, kết hợp bảng thống kê chi tiết số lượng test cases hoàn thành thành công 100% để slide thêm sinh động và chân thực.

#### 🎙️ Script thuyết trình:
> *"Để duy trì động lực học tập cho người học, nhóm em đã xây dựng hệ thống **Gamification** tự động theo dõi nhiệm vụ hàng ngày, tích lũy điểm XP và duy trì chuỗi Streak. Để tối ưu hiệu năng khi có nhiều người học cùng lúc, dữ liệu bảng xếp hạng Leaderboard được lưu sẵn và tăng tốc truy vấn bằng bộ đệm in-memory **Caffeine Cache** ở tầng Service, giúp giảm thiểu tối đa các truy vấn nặng vào database PostgreSQL phía dưới.
> 
> Bên cạnh đó, để đảm bảo hệ thống luôn vận hành ổn định và không gặp lỗi logic khi cập nhật code, nhóm em đã tiến hành viết kiểm thử tự động. Backend Java đã xây dựng bộ **55 kịch bản kiểm thử tự động (Unit Test)** sử dụng JUnit 5 và Mockito, bao phủ các logic cốt lõi từ Xác thực, Từ vựng cho đến thuật toán FSRS và đạt tỷ lệ chạy thành công tuyệt đối 100%. Ngoài ra, nhóm em còn tích hợp Sentry để phát hiện lỗi runtime tức thời và dùng Spring Boot Actuator để kiểm soát sức khỏe hệ thống."*

---

## Phần 4: CI/CD & Demo sản phẩm (~2 slides)

### Đóng gói Container Docker Multi-stage & Quy trình CI/CD
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

#### 🎙️ Script thuyết trình:
> *"Để triển khai ứng dụng lên internet, nhóm em đã container hóa bằng Docker và thiết lập quy trình CI/CD tự động. Nhóm em áp dụng chiến lược đóng gói **Docker Multi-stage Build**. Giai đoạn đầu sẽ compile code Java ra file JAR, sau đó giai đoạn hai chỉ copy duy nhất file JAR này sang một runtime JRE cực kỳ tinh gọn dựa trên Alpine để khởi chạy. Cách làm này giúp giảm dung lượng Docker image từ 820MB xuống chỉ còn 180MB, loại bỏ hoàn toàn mã nguồn thô và tăng tính bảo mật cho hệ thống. 
> 
> Quy trình **CI/CD** được tự động hóa qua GitHub Actions. Mỗi khi push code mới lên GitHub, hệ thống CI sẽ tự động kiểm tra cú pháp và chạy toàn bộ unit test. Nếu tất cả đều xanh, code Frontend được tự động deploy lên Vercel, còn Backend được đóng gói Docker deploy lên Render, kết nối an toàn với database Supabase. Nhóm em cũng tích hợp cơ chế ngắt mạch **Resilience4j Circuit Breaker** giúp bảo vệ máy chủ Backend khỏi bị treo nếu các dịch vụ AI bên ngoài gặp sự cố hoặc phản hồi chậm."*

---

### Live Demo các chức năng chính của hệ thống
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

#### 🎙️ Script thuyết trình:
> *"Sau đây, em xin phép trình bày về kết quả thực nghiệm và giao diện thực tế của ứng dụng. Giao diện của DailyEng được thiết kế theo phong cách hiện đại và responsive mượt mà trên cả máy tính lẫn điện thoại. 
> 
> Ở màn hình luyện nói **Speaking Room**, người học sẽ trò chuyện trực tiếp bằng giọng nói với AI. Khi nói xong, hệ thống sẽ trả về bảng điểm chi tiết từng từ và chỉ rõ lỗi sai phát âm, đồng thời Gemini AI sẽ đưa ra phản hồi và sửa lỗi ngữ pháp đi kèm biểu đồ so sánh cao độ giọng nói trực quan. 
> 
> Tại phân hệ **Vocabulary Hub**, thẻ Flashcard hai mặt hiển thị rõ ràng tiến độ ghi nhớ từ vựng do thuật toán FSRS tính toán. Tiện ích **SmartLens** cho phép tải ảnh lên, quét chữ bằng OCR và dịch trực tiếp đè khít lên nền ảnh. Cuối cùng là trợ lý ảo **Dorara** tương tác thời gian thực với mô hình 3D sinh động, phản hồi chữ dạng stream chạy chữ mượt mà nhờ giao thức SSE, mang lại trải nghiệm rất tốt cho người dùng."*

---

## Phần 5: Kết luận & Định hướng phát triển (~1 slide)

### Tổng kết & Hướng phát triển
#### 📌 Nội dung Slide:
* **Mức độ hoàn thiện đề tài (Mục 5.2):** Đồ án đã hoàn thành toàn bộ các mục tiêu đề ra: Xây dựng thành công các phân hệ chức năng cốt lõi và hỗ trợ trên nền tảng Backend Java Spring Boot vững chắc kết hợp Frontend Next.js bảo mật.
* **Ưu điểm thực tế (Mục 5.3.1):** 
  * Tiếp cận theo hướng tích hợp AI (AI Integration) tối ưu, ứng dụng công nghệ đám mây thương mại hiệu quả.
  * Tự làm chủ và hiện thực hóa thuật toán toán học ôn tập FSRS bằng Java chạy local không phụ thuộc API ngoài.
  * Kiến trúc phân tầng Full-Stack bảo mật an toàn, tối ưu tải tốt (Virtual Threads) và CD đám mây tự động.
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

#### 🎙️ Script thuyết trình:
> *"Tổng kết lại, đồ án DailyEng đã hoàn thành đầy đủ các mục tiêu đề ra: xây dựng thành công ứng dụng học tiếng Anh tích hợp AI chạy trên Backend Java Spring Boot vững chắc kết hợp Frontend Next.js. 
> 
> Bên cạnh các điểm sáng về luyện nói phản xạ với AI và tự lập trình thuật toán ôn tập ngắt quãng FSRS, hệ thống vẫn còn một số điểm cần cải thiện như hiện tượng khởi động nguội do Backend chạy trên server Render gói free, và việc phụ thuộc hoàn toàn vào kết nối mạng để gọi API AI. 
> 
> Hướng phát triển tiếp theo của nhóm em là nghiên cứu chạy các mô hình AI mã nguồn mở gọn nhẹ như Gemma hoặc Llama trực tiếp trên máy chủ Backend để giảm chi phí API và nâng cao tính độc lập của app, đồng thời làm thêm chế độ Offline để ôn tập Flashcard ngay cả khi không có mạng. 
> 
> Chúng em xin chân thành cảm ơn thầy/cô và các bạn đã lắng nghe bài thuyết trình ngày hôm nay. Nhóm em rất mong nhận được những nhận xét, ý kiến đóng góp quý báu từ thầy/cô và các bạn để hoàn thiện đề tài hơn nữa. Em xin cảm ơn ạ!"*
