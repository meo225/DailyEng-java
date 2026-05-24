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
> *"Kính chào các thầy cô trong Hội đồng chấm đồ án. Em xin phép được đại diện nhóm trình bày báo cáo về đề tài: **'... (lấy trong file docs)'**. 
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
* **Nội dung:** Đặt vấn đề & Khảo sát thực tiễn
### 📌 Nội dung Slide (Bullet points):
* **Khó khăn thực tế của người học: (lấy ở file docs sẽ chính xác và cụ thể hơn, nội dung dưới đây đọc mùi AI)**
  * **Tâm lý e ngại:** Người học thường lo lắng khi luyện nói trực tiếp do sợ phát âm sai hoặc chưa vững ngữ pháp.
  * **Hạn chế tài chính:** Chi phí để học luyện nói 1-1 với giáo viên bản xứ tương đối cao đối với phần lớn học sinh và sinh viên.
  * **Độ bền trí nhớ giảm nhanh:** Theo lý thuyết đường cong quên lãng, nếu từ vựng mới không được nhắc lại kịp thời, khả năng ghi nhớ sẽ suy giảm nhanh chóng theo thời gian.
* **Hiện trạng các giải pháp công nghệ:**
  * Các ứng dụng hiện nay thường tập trung vào các bài học tĩnh, trắc nghiệm chuẩn hóa hoặc flashcard đơn thuần.
  * Thiếu cơ chế kết hợp giữa lý thuyết và môi trường tương tác nói tự do, hoặc chưa có sự tích hợp giữa thuật toán ghi nhớ động và các công cụ hỗ trợ thông minh.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Thưa các thầy cô, qua khảo sát nhóm đối tượng sinh viên, chúng em nhận thấy đa số người học có tâm lý e ngại khi giao tiếp bằng tiếng Anh vì lo sợ phát âm không chuẩn hoặc dùng sai ngữ pháp. Thêm vào đó, việc tiếp cận các lớp học tương tác 1-1 với giáo viên nước ngoài đòi hỏi chi phí tài chính lâu dài tương đối cao đối với sinh viên. 
> 
> Mặt khác, việc học từ vựng theo phương pháp truyền thống thường ghi nhớ không bền vững do người học không ôn tập đúng thời điểm bộ não sắp quên. 
> 
> Các ứng dụng hiện tại trên thị trường dù rất đa dạng nhưng thường tách biệt các tính năng học từ vựng, ngữ pháp và đàm thoại phản xạ. Vì vậy, nhóm chúng em hướng tới xây dựng DailyEng để mang đến giải pháp học tiếng Anh toàn diện, khép kín và cá nhân hóa tối đa cho người dùng."*

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
  4. **Notebook:** Sổ tay lưu giữ từ vựng và quy tắc ngữ pháp mà người học đã đánh dấu hoặc tự tạo, giúp người học dễ dàng quản lý, tra cứu và chủ động ôn tập.
  5. **Dorara AI Companion:** Trợ lý ảo hỗ trợ giải thích ngữ pháp và từ vựng thời gian thực.
  6. **Translate & SmartLens:** Dịch thuật văn bản và quét trích xuất chữ từ hình ảnh để dịch trực tiếp.

### 🎙️ Script thuyết trình (2 phút):
> *"Hệ thống DailyEng được thiết kế để tạo nên một chu trình học tập khép kín từ lý thuyết đến thực hành phản xạ. 
> 
> Phân hệ cốt lõi là **Speaking Room**, nơi học viên hội thoại trực tiếp với AI thông qua việc tích hợp Azure Speech SDK và Gemini API ở Backend để nhận phản hồi chấm điểm phát âm ngay sau khi nói. 
> 
> Phân hệ **Vocabulary Hub** và **Grammar Hub** cung cấp kho kiến thức nền tảng có hệ thống. Khi học viên gặp từ mới hoặc cấu trúc ngữ pháp cần lưu ý, họ có thể lưu vào **Notebook**. Tại đây, người học có thể lưu trữ cá nhân, dễ dàng quản lý nghĩa tiếng Việt, từ loại cùng mức độ thông thạo hiện tại của từng từ, đồng thời ôn tập lại thông qua tính năng học thẻ Flashcard thuận tiện.
> 
> Để tăng tính tương tác trực quan, chúng em phát triển trợ lý ảo **Dorara** giao tiếp thời gian thực, và tính năng **SmartLens** giúp người học tải ảnh lên, nhận diện chữ viết bằng công nghệ OCR của Azure AI Vision và dịch thuật trực tiếp đè lên ảnh gốc."*

---

## SLIDE 4: CÔNG NGHỆ SỬ DỤNG (TECH STACK)
* **Phần:** 1. Tổng quan đề tài & Công nghệ sử dụng
* **Nội dung:** Giới thiệu công nghệ sử dụng
### 📌 Nội dung Slide (Bullet points):
* **Kiến trúc phân tách Client - Server:**
  * **Frontend (Next.js 15):** Sử dụng React Server Components (RSC) tối ưu hóa kết xuất trang, Zustand quản lý trạng thái client tinh gọn, kết hợp Next.js Server Actions đóng vai trò BFF (Backend-For-Frontend) che giấu API endpoint, tăng tính bảo mật.
  * **Backend (Spring Boot 3.4 & Java 21):** Trung tâm điều phối, xử lý logic nghiệp vụ và bảo mật. Java 21 Virtual Threads (Project Loom) giúp xử lý đồng thời hiệu năng cao với chi phí tài nguyên tối thiểu.
* **Tích hợp các dịch vụ Trí tuệ nhân tạo (AI):**
  * **Azure Speech Service (Microsoft):** Đảm nhiệm Speech-to-Text (STT) và chấm điểm phát âm (Pronunciation Assessment) chi tiết đến cấp độ âm vị.
  * **Gemini 2.5 Flash (Google):** Trợ lý ảo phản xạ 2 chiều thông minh, hỗ trợ đàm thoại tự do và sửa lỗi ngữ pháp.
* **Thuật toán ôn tập khoa học FSRS-4.5:**
  * Thuật toán lặp lại ngắt quãng (Free Spaced Repetition Scheduler) được tự cài đặt bằng ngôn ngữ Java nhằm cá nhân hóa lịch ôn từ vựng theo đường quên lãng của người học.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để hiện thực hóa DailyEng, chúng em đã lựa chọn một hệ sinh thái công nghệ bổ trợ lẫn nhau một cách tối ưu. 
> 
> Phía Client sử dụng **Next.js 15** để tận dụng lợi thế về tốc độ kết xuất và SEO vượt trội của React Server Components. Next.js đóng vai trò BFF giúp quản lý xác thực và ẩn đi các endpoint Backend. 
> 
> Trọng tâm là Backend xây dựng trên **Java Spring Boot 3.4** và chạy trên nền **Java 21**. Spring Boot đóng vai trò cốt lõi trong việc quản lý cơ sở dữ liệu, phân quyền bảo mật và thực hiện các logic nghiệp vụ nặng. Nhờ Virtual Threads của Java 21, Backend có hiệu năng vượt trội khi xử lý các cuộc gọi API AI nghẽn. 
> 
> Hệ thống tích hợp trực tiếp **Azure Speech SDK** để chấm điểm phát âm chi tiết ở mức độ âm vị và **Google Gemini API** để đàm thoại phản xạ thông minh. Cuối cùng, chúng em tự cài đặt thuật toán ngắt quãng **FSRS** bằng Java để cá nhân hóa lịch học từ vựng cho từng học viên."*

---

## SLIDE 5: SƠ ĐỒ USE CASE TỔNG QUÁT HỆ THỐNG
* **Phần:** 2. Phân tích yêu cầu & Thiết kế hệ thống
* **Nội dung:** Sơ đồ Use Case tổng quát
### 📌 Nội dung Slide (Bullet points):
* **Phân quyền người dùng rõ ràng:**
  * **Khách:** Thực hiện đăng ký, đăng nhập tài khoản, làm bài kiểm tra trình độ đầu vào để nhận gợi ý lộ trình phù hợp.
  * **Người học:** Thực hiện đầy đủ các chức năng học từ vựng, ngữ pháp, luyện nói với AI, quản lý sổ tay cá nhân và theo dõi tiến độ.
* **Mối quan hệ hệ thống:**
  * Hành động *Luyện nói với AI* bao gồm việc *Đánh giá phát âm* và mở rộng sang các tính năng *Tạo kịch bản tùy chỉnh từ mô tả*, *Tạo kịch bản ngẫu nhiên* và *Phân tích sửa lỗi*.
  * Hành động *Dịch thuật* mở rộng sang *Dịch hình ảnh SmartLens* và *Dịch văn bản*.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **hình: Biểu đồ Use Case tổng quát của hệ thống DailyEng (nằm ở mục 3.2.1)**  
> *(Hiển thị sơ đồ Use Case vẽ bằng Mermaid từ Chương 3 - Mục 3.2.1. Đảm bảo cấu trúc rõ ràng với 3 phân vùng subgraph màu sắc Pastel nhã nhặn: Phân hệ tài khoản, Phân hệ học tập và đánh giá, Phân hệ trợ lý và tiện ích).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Xin mời các thầy cô quan sát **hình: Biểu đồ Use Case tổng quát của hệ thống DailyEng (nằm ở mục 3.2.1)** mô tả các tác vụ tương tác trong DailyEng. Hệ thống được chia thành hai nhóm Actor chính là Khách và Người học. Khách chưa đăng nhập có thể thực hiện kiểm tra trình độ đầu vào để hệ thống gợi ý lộ trình học tương ứng. 
> 
> Đối với Người học, hệ thống mở khóa toàn bộ các chức năng chuyên sâu nằm trong ba phân vùng nghiệp vụ. 
> 
> Ở phân hệ học tập ở giữa, chức năng Luyện nói với AI bắt buộc phải đi kèm với việc Đánh giá phát âm qua Azure Speech SDK, đồng thời cung cấp các nhánh tính năng mở rộng cho phép người học tự tạo kịch bản học tùy biến từ mô tả cá nhân hoặc nhận báo cáo lỗi chi tiết sau buổi đàm thoại. Phân hệ hỗ trợ phía bên phải cung cấp các tính năng tiện ích bổ trợ như quản lý Sổ tay cá nhân, tương tác với trợ lý Dorara, Dịch hình ảnh SmartLens và hệ thống Gamification tính điểm XP và Streak để khuyến khích học tập hàng ngày."*

---

## SLIDE 6: SƠ ĐỒ KIẾN TRÚC PHẦN TẦNG LOGIC (FULL-STACK)
* **Phần:** 2. Phân tích yêu cầu & Thiết kế hệ thống
* **Nội dung:** Kiến trúc hệ thống tổng quan & Vai trò của Java Backend
### 📌 Nội dung Slide (Bullet points):
* **Kiến trúc phân tầng chuẩn hóa:**
  * **Client Layer:** Next.js 15 kết hợp React 19, sử dụng Zustand quản lý trạng thái toàn cục tinh gọn.
  * **BFF Layer:** Next.js Server Actions đóng vai trò làm cổng Facade trung gian, tự động trích xuất và đính kèm JWT Token từ Cookie HttpOnly bảo mật, tránh lộ endpoint API Backend trực tiếp.
  * **Server Layer - Trọng tâm hệ thống:**
    * Được xây dựng trên **Java 21**, phân tách thành các package rõ ràng: `auth`, `vocabulary`, `grammar`, `speaking`, `srs`, `xp`.
    * Tích hợp **Caffeine Cache** tại tầng Service để lưu trữ danh mục học tập ít biến động, giảm tải cho cơ sở dữ liệu.
  * **Data Layer:** PostgreSQL 16 triển khai trên Supabase Cloud, quản lý kết nối qua Connection Pooling HikariCP được tinh chỉnh tham số.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **hình: Sơ đồ kiến trúc phân tầng logic (Full-Stack) và luồng giao tiếp (nằm ở mục 3.4)**  
> *(Vẽ lại sơ đồ kiến trúc ở Chương 3 - Mục 3.4 mô tả 4 tầng chính: Client Layer, BFF Layer, Server Layer, và Database Layer).*

### 🎙️ Script thuyết trình (2 phút):
> *"Để đảm bảo tính độc lập, dễ mở rộng và bảo mật, hệ thống được thiết kế theo cấu trúc phân tầng Full-Stack như mô tả trong **hình: Sơ đồ kiến trúc phân tầng logic (Full-Stack) và luồng giao tiếp (nằm ở mục 3.4)**. 
> 
> Tại phía Client, chúng em phát triển giao diện bằng Next.js 15 để tối ưu hóa thời gian hiển thị ban đầu, sử dụng thư viện Zustand quản lý trạng thái client gọn nhẹ. 
> 
> Lớp trung gian BFF sử dụng Next.js Server Actions giúp giải quyết vấn đề CORS, đồng thời hoạt động như một lớp bảo vệ che giấu các địa chỉ endpoint Backend và tự động đính kèm mã JWT Token từ Cookie HttpOnly an toàn. 
> 
> Trọng tâm của đồ án là tầng Backend API được xây dựng bằng **Java Spring Boot 3.4**. Hệ thống mã nguồn Java được phân chia theo kiến trúc module khoa học. Để tối ưu hóa hiệu năng và tốc độ phản hồi, chúng em sử dụng connection pool **HikariCP** kết hợp với bộ nhớ đệm in-memory **Caffeine** tại tầng Service, giúp giảm số lượng truy vấn trực tiếp vào cơ sở dữ liệu PostgreSQL phía dưới khi người dùng yêu cầu các dữ liệu tĩnh như chủ đề hay bài học."*

---

## SLIDE 7: THIẾT KẾ CƠ SỞ DỮ LIỆU & ĐỊNH DANH CUID2
* **Phần:** 2. Phân tích yêu cầu & Thiết kế hệ thống
* **Nội dung:** Thiết kế cơ sở dữ liệu & Định danh CUID2
### 📌 Nội dung Slide (Bullet points):
* **Thiết kế thực thể JPA và Cấu trúc cơ sở dữ liệu:**
  * Cơ sở dữ liệu PostgreSQL gồm 35 bảng, được ánh xạ chặt chẽ thông qua Spring Data JPA.
  * Chi tiết thuộc tính các thực thể chính như bảng User (id, name, email, level, v.v.), Topic, SpeakingSession, NotebookItem.
  * Mối quan hệ chặt chẽ giữa các thực thể: User kết nối 1-1 với ProfileStats và StudyPlan; quan hệ 1-N với các buổi luyện nói (SpeakingSession) và tiến trình ôn tập FSRS (UserVocabProgress).
  * Định nghĩa lớp cha trừu tượng BaseEntity để tự động hóa các trường auditing như ngày tạo và ngày cập nhật.
* **Định danh CUID2 thay thế cho UUID:**
  * CUID2 dài 25 ký tự, được tạo tự động tại sự kiện prePersist bằng thư viện CUID cho Java.
  * **Đặc tính khoa học:** Đảm bảo tính duy nhất toàn cầu và có khả năng sắp xếp theo thời gian.
  * **Hiệu suất chỉ mục:** Giúp duy trì thứ tự sắp xếp vật lý khi chèn bản ghi mới, tối ưu hiệu suất cây chỉ mục B-Tree trong cơ sở dữ liệu PostgreSQL.
  * **Bảo mật hệ thống:** Ngăn chặn các lỗ hổng rò rỉ dữ liệu thông qua việc dò đoán ID tài nguyên.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **hình: Sơ đồ thực thể kết hợp ERD chi tiết của hệ thống DailyEng (nằm ở mục 3.3.1)**  
> *(Hiển thị sơ đồ ERD chi tiết từ mục 3.3.1 biểu diễn mối quan hệ giữa User, UserVocabProgress, VocabItem, SpeakingSession, và NotebookItem).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Em xin phép trình bày về cấu trúc dữ liệu được quản lý ở Backend. Toàn bộ 35 bảng trong cơ sở dữ liệu PostgreSQL được ánh xạ sang các thực thể Java thông qua **Spring Data JPA** như mô tả trên **hình: Sơ đồ thực thể kết hợp ERD chi tiết của hệ thống DailyEng (nằm ở mục 3.3.1)**. 
> 
> Trong cấu trúc cơ sở dữ liệu này, thực thể User đóng vai trò trung tâm liên kết với thông tin học tập ProfileStats, kế hoạch StudyPlan, các phiên luyện nói SpeakingSession, và tiến trình từ vựng UserVocabProgress. 
> 
> Để quản lý định danh và đồng bộ hóa các trường thông tin kiểm toán hệ thống, chúng em thiết kế lớp cha trừu tượng BaseEntity chứa các trường dùng chung như ngày tạo, ngày cập nhật. Tất cả các Entity con đều kế thừa lớp này và tự động sở hữu cơ chế sinh khóa chính sử dụng chuỗi **CUID2** thay vì số nguyên tự tăng hay UUID truyền thống. CUID2 có tính chất k-sortable giúp PostgreSQL tối ưu hóa hiệu năng chèn bản ghi mới mà không cần sắp xếp lại toàn bộ cây chỉ mục B-Tree, đồng thời ngăn chặn các lỗ hổng rò rỉ dữ liệu qua đường dẫn API."*

---

## SLIDE 8: THIẾT KẾ HƯỚNG ĐỐI TƯỢNG & DESIGN PATTERNS TRONG CODE JAVA
* **Phần:** 2. Phân tích yêu cầu & Thiết kế hệ thống
* **Nội dung:** Thiết kế hướng đối tượng & Design Patterns
### 📌 Nội dung Slide (Bullet points):
* **Tính chất OOP trong cấu trúc mã nguồn Java:**
  * **Đóng gói:** Các thuộc tính Entity và DTO được bảo vệ bằng phạm vi truy cập `private`, chỉ truy xuất qua các phương thức Getter/Setter an toàn.
  * **Kế thừa:** Sử dụng kế thừa để tổ chức các tầng xử lý và thực thể dùng chung như BaseEntity, BaseController.
  * **Đa hình:** Định nghĩa các Repository interface kế thừa đa hình từ `JpaRepository` và `JpaSpecificationExecutor` để thực hiện các bộ lọc tìm kiếm động.
* **Các mẫu thiết kế áp dụng tại Backend Java:**
  * **MVC Pattern:** Phân tách giữa Entity, Controller nhận API và View ở Frontend.
  * **Repository và Service Layer Pattern:** Tách biệt logic truy xuất cơ sở dữ liệu vật lý khỏi logic xử lý nghiệp vụ tại tầng Service.
  * **DTO Pattern:** 
    * Ứng dụng cấu trúc **Java Records** mới của Java 21 để định nghĩa các DTO bất biến.
    * Giúp lọc bỏ các thông tin nhạy cảm của Entity trước khi trả về Frontend Next.js.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN CÁC SƠ ĐỒ TRÊN SLIDE:**  
> 1. **hình: Sơ đồ quan hệ kế thừa các thực thể trong phân hệ luyện nói (Speaking Module) (nằm ở mục 3.6)** *(Biểu diễn cấu trúc ClassDiagram thể hiện tính Kế thừa từ BaseEntity cha).*  
> 2. **hình: Luồng ánh xạ và chuyển đổi dữ liệu giữa Entity và DTO (nằm ở mục 3.5)** *(Mô tả quá trình ánh xạ Entity sang DTO tại tầng Service trước khi gửi phản hồi).*  
> 3. **hình: Sơ đồ tổng hợp các Design Pattern được áp dụng trong hệ thống DailyEng (nằm ở mục 3.7)**

### 🎙️ Script thuyết trình (2 phút):
> *"Để mã nguồn dự án Java có tính cấu trúc tốt, dễ bảo trì và mở rộng, chúng em đã áp dụng các nguyên lý lập trình hướng đối tượng OOP và các Design Patterns tiêu chuẩn. 
> 
> Trên slide là **hình: Sơ đồ quan hệ kế thừa các thực thể trong phân hệ luyện nói (Speaking Module) (nằm ở mục 3.6)**, thể hiện cách chúng em thiết kế tầng dữ liệu hướng đối tượng một cách nhất quán. 
> 
> Tại Backend Java, chúng em triển khai mẫu thiết kế **Service Layer** và **Repository Pattern** để đảm bảo tính liên kết linh hoạt. Mọi logic nghiệp vụ từ việc điều phối bài học đến tính điểm đều nằm tại tầng Service, giúp tầng Controller trở nên tinh gọn. 
> 
> Ngoài ra, chúng em áp dụng **DTO Pattern** bằng cách sử dụng tính năng **Java Records** của Java 21. Java Records đóng vai trò là những cấu trúc dữ liệu bất biến. Như mô tả ở **hình: Luồng ánh xạ và chuyển đổi dữ liệu giữa Entity và DTO (nằm ở mục 3.5)**, khi Client yêu cầu thông tin bài học, tầng Service sẽ truy xuất Entity gốc từ database, lọc bỏ các trường dư thừa hoặc nhạy cảm như ngày khởi tạo hay cấu hình backend, và ánh xạ sang DTO Record tương ứng. Quá trình này giúp bảo mật cấu trúc cơ sở dữ liệu và hạn chế kích thước dữ liệu truyền tải qua mạng."*

---

## SLIDE 9: THIẾT KẾ WIREFRAME TRÊN FIGMA & SƠ ĐỒ TRANG WEB (SITEMAP)
* **Phần:** 2. Phân tích yêu cầu & Thiết kế hệ thống
* **Nội dung:** Thiết kế Wireframe trên Figma & Sơ đồ trang web
### 📌 Nội dung Slide (Bullet points):
* **Lý thuyết Thuật toán FSRS-4.5:**
  * Mô hình toán học giúp lên lịch ôn tập dựa trên mức độ suy giảm trí nhớ của người học.
  * Dự đoán 3 thông số trí nhớ: **Stability** (Độ bền), **Difficulty** (Độ khó), và **Retrievability** (Khả năng nhớ lại).
  * Công thức tính khả năng nhớ lại tại thời điểm $t$ ngày trôi qua:
    $$R(t, S) = \left(1 + \frac{t}{9 \cdot S}\right)^{-1}$$
* **Hiện thực hóa thuật toán trực tiếp bằng Java:**
  * Lớp `FsrsAlgorithm.java` được lập trình trực tiếp bằng Java để tính toán khoảng cách ngày ôn tập tiếp theo đối với các từ vựng hệ thống tại Vocabulary Hub khi người dùng đánh giá thẻ học theo các mức độ Again, Hard, Good hoặc Easy.
  * Khi người học chọn phản hồi, Java Backend sẽ tính toán các thông số trí nhớ mới và lên lịch ngày ôn tập tiếp theo trong bảng UserVocabProgress để phục vụ trực tiếp cho lộ trình học từ mới tại Vocabulary Hub.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **hình: Luồng ánh xạ dữ liệu và cập nhật thông số FSRS trong Database (nằm ở mục 3.5)**  
> *(Biểu diễn luồng tương tác: Người dùng học Vocabulary Hub -> đánh giá Flashcard -> Next.js gọi Server Action -> Spring Boot nhận yêu cầu -> gọi Class FsrsAlgorithm xử lý -> cập nhật UserVocabProgress và ghi lịch sử vào ReviewLog).*

### 🎙️ Script thuyết trình (2 phút):
> *"Em xin trình bày sâu hơn về khía cạnh khoa học của đồ án – thuật toán ôn tập ngắt quãng **FSRS-4.5** được chúng em tích hợp trực tiếp tại phân hệ **Vocabulary Hub**. 
> 
> Về mặt toán học, thuật toán FSRS dự đoán khả năng nhớ lại R của một từ vựng sau $t$ ngày dựa trên hai thông số là Độ bền trí nhớ S và Độ khó D của từ đó. Mục tiêu cốt lõi của FSRS là lên lịch ôn tập đúng vào ngày khả năng nhớ lại R giảm xuống sát ngưỡng 90%. Đây là thời điểm phù hợp để bộ não tiếp nhận lại thông tin, giúp củng cố độ bền S lên mức cao hơn mà không tốn nhiều công sức học lại. 
> 
> Lớp nghiệp vụ `FsrsAlgorithm.java` được chúng em xây dựng trực tiếp trên Backend. Khi học viên học từ mới tại Vocabulary Hub và nhấn nút đánh giá từ vựng theo các mức độ Again, Hard, Good hay Easy, mã nguồn Java sẽ tự động áp dụng công thức toán học để tính toán lại độ bền trí nhớ S, cập nhật độ khó D thích ứng, sau đó tính ra số ngày ôn tập tiếp theo và lưu trực tiếp trường dữ liệu `nextReview` vào bảng `UserVocabProgress` trong cơ sở dữ liệu. Nhờ vậy, tiến trình ôn tập từ vựng của học viên tại Vocabulary Hub luôn được vận hành một cách tự động và cá nhân hóa."*

---

## SLIDE 10: QUY ĐỊNH HỆ THỐNG MÀU SẮC (DESIGN SYSTEM) & LUỒNG VẬN HÀNH CÁC HUB
* **Phần:** 2. Phân tích yêu cầu & Thiết kế hệ thống
* **Nội dung:** Hệ thống màu sắc (Design System) & Quy trình vận hành các Hub
### 📌 Nội dung Slide (Bullet points):
* **Xác thực không trạng thái:**
  * Spring Security kiểm soát các yêu cầu qua bộ lọc `JwtAuthenticationFilter` để giải mã và kiểm tra chữ ký số của JWT Token.
  * Phân quyền truy cập an toàn dựa trên vai trò sử dụng chú thích `@PreAuthorize` trên tầng Controller của Java.
* **Hệ thống API chuẩn RESTful thiết kế mạch lạc:**
  * Backend Java module hóa đường dẫn rõ ràng theo chuẩn công nghiệp bao gồm các phần như auth, speaking, vocab, grammar, srs, notebooks, dorara.
  * Trả về định dạng JSON đồng nhất và sử dụng các mã trạng thái HTTP tiêu chuẩn để Client dễ phân tích xử lý.

### 🖼️ Sơ đồ & Bảng biểu trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ & BẢNG BIỂU TRÊN SLIDE:**  
> 1. **sơ đồ: Tuần tự Luồng xác thực JWT và lấy danh sách kịch bản trong DailyEng (nằm ở mục 3.8)** *(Sequence Diagram mô tả luồng xác thực và kiểm soát JWT của bộ lọc Spring Security).*  
> 2. **bảng: Bảng tổng hợp các API Endpoints hệ thống tiêu biểu (nằm ở mục 3.7)** *(Liệt kê các API chính như `/auth/login`, `/speaking/scenarios`, `/srs/review`, `/dorara/chat` để Hội đồng đánh giá tính chuẩn hóa của thiết kế API RESTful).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để bảo vệ tài nguyên hệ thống, chúng em cấu hình kiến trúc bảo mật không trạng thái sử dụng **Spring Security**. 
> 
> Như mô tả ở **sơ đồ: Tuần tự Luồng xác thực JWT và lấy danh sách kịch bản trong DailyEng (nằm ở mục 3.8)**, mọi yêu cầu từ Client gửi lên đều được đi qua bộ lọc `JwtAuthenticationFilter` để giải mã và xác thực token JWT. Quyền hạn của người dùng như Role User hay Role Admin được nhúng trực tiếp vào token và được kiểm soát chặt chẽ ở cấp độ phương thức nhờ chú thích `@PreAuthorize` trên các Java API Controllers. Kỹ thuật này giúp phân tách hoàn toàn logic bảo mật và logic nghiệp vụ. 
> 
> Toàn bộ hệ thống API Backend được thiết kế tuân thủ nghiêm ngặt chuẩn RESTful như liệt kê ở bảng: Bảng tổng hợp các API Endpoints hệ thống tiêu biểu (nằm ở mục 3.7). Các đường dẫn được đặt tên rõ ràng, phân loại theo các module Auth, Speaking, Vocab, SRS và trả về các mã trạng thái HTTP chuẩn hóa kết hợp với cấu trúc JSON đồng nhất từ DTO, giúp Frontend dễ dàng bắt lỗi và hiển thị giao diện phù hợp với trạng thái của hệ thống."*

---

## SLIDE 11: JAVA 21 VIRTUAL THREADS - TỐI ƯU CHO CÁC LUỒNG XỬ LÝ AI
* **Phần:** 3. Hiện thực hóa & Kiểm thử hệ thống
* **Nội dung:** Java 21 Virtual Threads tối ưu xử lý AI
### 📌 Nội dung Slide (Bullet points):
* **Sơ đồ trang web (Sitemap):**
  * Tổ chức cấu trúc và điều hướng hệ thống xoay quanh Dashboard trung tâm dẫn đến 7 phân hệ chính: Vocabulary Hub, Grammar Hub, Speaking Room, Notebook, Translate/SmartLens, Study Plan, và Profile cá nhân.
  * Phân nhánh màn hình phòng luyện nói (Speaking Room) trực quan gồm: Topic Selection, Custom Topic, Bookmarks, và History.
* **Thiết kế Wireframe phác thảo bằng Figma:**
  * Sử dụng Figma phác thảo cấu trúc giao diện thô (Wireframe) trước khi viết code để định hình trải nghiệm người dùng (UX) và tối ưu hóa bố cục.
  * Hiện thực hóa wireframe chi tiết cho Homepage, Speaking Room (luồng trò chuyện và màn hình phản hồi), Vocabulary Hub, và Notebook.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:**  
> 1. **hình: Sơ đồ các giao diện trang chính Sitemap của ứng dụng DailyEng (nằm ở mục 3.8.1.1)** *(Biểu diễn sơ đồ luồng điều hướng các trang web).*  
> 2. **hình: Bản vẽ Wireframe phác thảo cấu trúc giao diện hệ thống DailyEng trên Figma (nằm ở mục 3.8.2)** *(Hiển thị bản phác thảo wireframe trực quan từ mục 3.8.2).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để hiện thực hóa ứng dụng một cách tối ưu nhất, chúng em bắt đầu bằng việc thiết kế kiến trúc thông tin và phác thảo giao diện người dùng. Đầu tiên là **hình: Sơ đồ các giao diện trang chính Sitemap của ứng dụng DailyEng (nằm ở mục 3.8.1.1)** thể hiện cấu trúc 7 phân hệ giao diện lớn của hệ thống. 
> 
> Tiếp theo, để trực quan hóa cách bố trí các thành phần và tối ưu trải nghiệm học tập (UX), nhóm đã tiến hành xây dựng **hình: Bản vẽ Wireframe phác thảo cấu trúc giao diện hệ thống DailyEng trên Figma (nằm ở mục 3.8.2)**. Chúng em thiết kế phác thảo thô cho các màn hình Homepage, phòng đàm thoại Speaking Room, Vocabulary Hub và Notebook. Việc phác thảo wireframe chi tiết trên Figma giúp chúng em nhanh chóng kiểm thử và điều chỉnh bố cục hợp lý, tối ưu trải nghiệm trước khi tiến hành code giao diện thực tế."*

---

## SLIDE 12: CƠ CHẾ JAVA TÍCH HỢP SPEECH ENGINE & GENERATIVE AI SDK
* **Phần:** 3. Hiện thực hóa & Kiểm thử hệ thống
* **Nội dung:** Tích hợp các SDK AI ở Backend Java
### 📌 Nội dung Slide (Bullet points):
* **Quy định hệ thống màu sắc (Design System):**
  * Xây dựng bảng mã màu hệ thống nhất quán với 5 nhóm màu chủ đạo đạt chuẩn tương phản thị giác: Primary (Sky 600 - #0284c7), Secondary (Sky 500 - #0ea5e9), Accent (Amber 500 - #f59e0b), Semantic (Emerald 500 - #10b981), và Grayscale (text - #1e293b).
  * Lựa chọn phông chữ Nunito bo tròn hiện đại làm phông chữ thương hiệu để giảm căng thẳng mắt khi học viên sử dụng ứng dụng trong thời gian dài.
* **Quy trình vận hành khép kín của các Hub học tập:**
  * Sơ đồ hóa luồng trải nghiệm người học tại Vocabulary Hub, Grammar Hub và Notebook: tiếp thu lý thuyết song ngữ trực quan -> thực hành làm bài tập củng cố -> tự động đồng bộ hóa tiến độ về database để ôn tập ngắt quãng.

### 🖼️ Sơ đồ & Bảng biểu trình bày trên Slide:
> [!NOTE]  
> **TÊN CÁC SƠ ĐỒ & BẢNG BIỂU TRÊN SLIDE:**  
> 1. **bảng: Bảng quy định hệ thống màu sắc (Design System) (nằm ở mục 3.8.3.1)** *(Bảng mã màu Primary, Secondary, Accent, Semantic và Grayscale).*  
> 2. **hình: Quy trình vận hành các Hub (nằm ở mục 3.8.1)** *(Chèn sơ đồ luồng vận hành của Vocabulary Hub, Grammar Hub, Notebook và Translate).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Song song với kiến trúc trang, giao diện người dùng được đồng bộ hóa dựa trên một hệ thống **Design System** nhất quán được biểu diễn ở **bảng: Bảng quy định hệ thống màu sắc (Design System) (nằm ở mục 3.8.3.1)**. Chúng em lựa chọn bảng màu với tông màu xanh Sky làm chủ đạo, kết hợp phông chữ Nunito bo tròn hiện đại tạo cảm giác học tập thoải mái. 
> 
> Đồng thời, các luồng học tập trong hệ thống được vận hành khép kín và nhất quán thông qua **hình: Quy trình vận hành các Hub (nằm ở mục 3.8.1)**. Quy trình này giúp người học tự động hóa việc tiếp nhận kiến thức từ lý thuyết, làm bài tập vận dụng ngay và tự động hóa lưu tiến độ học tập vào PostgreSQL để thuật toán FSRS lập lịch ôn tập đúng thời điểm."*

---

## SLIDE 13: THUẬT TOÁN ÔN TẬP NGẮT QUÃNG FSRS CÀI ĐẶT BẰNG JAVA
* **Phần:** 3. Hiện thực hóa & Kiểm thử hệ thống
* **Nội dung:** Thuật toán ôn tập ngắt quãng FSRS cài đặt bằng Java
### 📌 Nội dung Slide (Bullet points):
* **Đặc thù của các tác vụ gọi dịch vụ AI:**
  * Quá trình Backend Java gọi các API trí tuệ nhân tạo như Azure Speech và Google Gemini thường mất từ 1.5 đến 4 giây để nhận phản hồi do phải chờ xử lý âm thanh hoặc sinh văn bản.
  * Mô hình Thread-per-request truyền thống của Spring Boot sử dụng platform threads của hệ điều hành dễ gây cạn kiệt luồng và nghẽn hệ thống khi có nhiều người dùng đồng thời.
* **Giải pháp ứng dụng Java 21 Virtual Threads:**
  * Virtual Threads là các luồng siêu nhẹ do máy ảo JVM quản lý trực tiếp, không ánh xạ 1-1 với luồng của hệ điều hành.
  * Khi luồng Java chờ phản hồi API AI từ Azure hay Gemini, JVM tự động giải phóng luồng vật lý OS để nhường tài nguyên cho yêu cầu khác.
  * **Hiệu quả thực nghiệm:** Giúp Spring Boot Backend duy trì hiệu suất xử lý ổn định, tiết kiệm bộ nhớ máy chủ khi xử lý đồng thời nhiều phiên luyện nói và chat AI.

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

## SLIDE 14: LUỒNG XÁC THỰC BẢO MẬT & ĐƯỜNG DẪN RESTful API
* **Phần:** 3. Hiện thực hóa & Kiểm thử hệ thống
* **Nội dung:** Luồng xác thực bảo mật & Đường dẫn RESTful API
### 📌 Nội dung Slide (Bullet points):
* **Tích hợp Azure Speech SDK tại Backend Java:**
  * Nạp thư viện client-sdk của Microsoft trong tệp Maven `pom.xml`.
  * Khởi tạo `PronunciationAssessmentConfig` để thiết lập chấm điểm 100 điểm, chi tiết ở mức độ âm vị để đánh giá ngữ điệu và phát âm chi tiết.
  * Backend Java tiếp nhận file ghi âm giọng nói từ Client, truyền dữ liệu byte array vào Azure SDK và nhận về đối tượng kết quả phân tích để lưu vào database.
* **Tích hợp Google Generative AI SDK cho Java:**
  * Sử dụng thư viện google-genai chính thức của Google để kết nối mô hình `gemini-3.1-flash-lite`.
  * Áp dụng System Instruction bằng Java code để chỉ định AI đóng vai giáo viên chỉnh sửa ngữ pháp kiên nhẫn.
  * Phân tích và sửa lỗi: Java Service thu thập toàn bộ lịch sử đàm thoại của phiên học, gửi yêu cầu phân tích lỗi và cách diễn đạt tốt hơn, sau đó lưu kết quả đánh giá vào thực thể SpeakingSession.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **sơ đồ: Sơ đồ tuần tự tương tác gọi API AI thông qua Java Backend (nằm ở mục 3.8)**  
> *(Sequence Diagram mô tả luồng: Client gửi Audio -> Java Controller -> Java Service -> Azure AI Speech SDK -> Nhận kết quả đánh giá -> Java Service gửi lịch sử hội thoại -> Google Gemini Java SDK -> Nhận phản hồi sửa lỗi -> Trả về kết quả tổng hợp cho Client).*

### 🎙️ Script thuyết trình (2 phút):
> *"Mục tiêu cốt lõi của môn học là tích hợp AI vào hệ thống lập trình Java, và chúng em đã thực hiện điều này bằng việc kết hợp trực tiếp các SDK AI chính thức tại tầng Backend. 
> 
> Trước tiên, đối với tính năng luyện nói, tệp cấu hình Maven `pom.xml` nạp thư viện `client-sdk` của Microsoft Azure Speech. Khi người học gửi dữ liệu âm thanh dạng byte array lên, lớp `SpeakingSessionService` bằng Java sẽ thiết lập đối tượng cấu hình `PronunciationAssessmentConfig` ở mức độ âm vị chi tiết. Dữ liệu âm thanh được gửi trực tiếp đến Azure Speech, và kết quả chấm điểm các tiêu chí phát âm sẽ được Java bóc tách từ đối tượng SDK trả về, sau đó lưu trực tiếp vào cơ sở dữ liệu PostgreSQL. 
> 
> Song song với đó, chúng em tích hợp **Google Generative AI SDK** cho Java để làm bộ não đàm thoại. Bằng cách sử dụng các đoạn mã Java thiết lập thuộc tính System Instruction, chúng em định hình phong cách phản hồi của AI luôn là một giáo viên bản xứ. Khi kết thúc cuộc đàm thoại, Java Service sẽ thu thập toàn bộ các lượt thoại đã lưu trong bảng `SpeakingTurn`, đóng gói thành một prompt gửi đến Gemini API để nhận về kết quả sửa lỗi và các câu đề xuất thay thế tốt hơn. Toàn bộ luồng kết nối logic này được đảm bảo tính toàn vẹn nhờ sự điều phối chặt chẽ của các lớp Service trong mã nguồn Java."*

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
  * Giám sát lỗi runtime thời gian thực với **Sentry SDK** và kiểm soát trạng thái hệ thống thông qua **Spring Boot Actuator**.

### 🖼️ Bảng biểu trình bày trên Slide:
> [!NOTE]  
> **TÊN BẢNG BIỂU TRÊN SLIDE:** **bảng: Bảng tổng hợp kết quả kiểm thử tự động (nằm ở mục 4.4.2.4)**  
> *(Bảng thống kê chi tiết số lượng Unit Test Cases hoàn thành thành công 100% của các phân hệ để chứng minh tính ổn định của mã nguồn).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để đảm bảo tính bền vững, tin cậy và không xảy ra lỗi logic khi nâng cấp hệ thống, chúng em đã thực hiện kiểm thử tự động nghiêm ngặt trên toàn bộ mã nguồn. 
> 
> Tại Backend Java, chúng em xây dựng bộ **55 kiểm thử tự động (Unit Test)** sử dụng JUnit 5 và Mockito. Các module nghiệp vụ cốt lõi từ Xác thực, Từ vựng cho đến lớp tính toán thuật toán FSRS đều được kiểm thử kỹ lưỡng. Tại phía Frontend, các component cũng được test bằng Vitest. 
> 
> Như thống kê tại **bảng: Bảng tổng hợp kết quả kiểm thử tự động (nằm ở mục 4.4.2.4)**, toàn bộ 55 test cases đều hoàn thành chính xác 100%. Bên cạnh đó, hệ thống cũng tích hợp Sentry để giám sát lỗi runtime thời gian thực và Spring Boot Actuator giúp theo dõi sức khỏe hệ thống khi vận hành."*

---

## SLIDE 16: ĐÓNG GÓI CONTAINER DOCKER & TRIỂN KHAI VẬN HÀNH CD
* **Phần:** 4. Triển khai & Demo sản phẩm
* **Nội dung:** Đóng gói Container Docker & Triển khai đám mây (CD)
### 📌 Nội dung Slide (Bullet points):
* **Chiến lược đóng gói Dockerfile Multi-stage Build:**
  * **Stage 1 (Build):** Dùng Maven image chạy lệnh `mvn clean package` để biên dịch và tạo file JAR.
  * **Stage 2 (Run):** Chỉ sao chép duy nhất file JAR sang JRE image tinh giản dựa trên Alpine để khởi chạy ứng dụng.
  * **Hiệu quả:** Thu gọn kích thước Docker Image từ 820 MB xuống còn 180 MB, loại bỏ toàn bộ mã nguồn thô và công cụ biên dịch thừa, hỗ trợ giảm thiểu bề mặt tấn công bảo mật.
* **Hạ tầng triển khai đám mây:**
  * **Frontend Next.js:** Triển khai tự động trên Vercel Cloud Edge Network.
  * **Backend Java Spring Boot:** Vận hành dạng Docker Container trên máy chủ Render Cloud PaaS, kết nối an toàn đến database PostgreSQL trên Supabase Cloud.
  * **Giám sát và Chịu lỗi:** Tích hợp Sentry SDK và cổng Spring Boot Actuator để quản lý lỗi chủ động. Áp dụng cơ chế Circuit Breaker của Resilience4j để tự động ngắt mạch bảo vệ hệ thống khi các API ngoại vi gặp sự cố.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN CÁC SƠ ĐỒ TRÊN SLIDE:**  
> 1. **sơ đồ: Quy trình đóng gói đa tầng Multi-stage Build và khởi chạy Docker Container (nằm ở mục 4.1)** *(Mô tả quá trình build Maven -> tạo JAR -> copy sang runtime JRE tinh giản -> deploy).*  
> 2. **sơ đồ: Kiến trúc triển khai vật lý hệ thống DailyEng trên hạ tầng đám mây (nằm ở mục 4.2)** *(Mô tả luồng tương tác vật lý giữa Vercel, Render Container, Supabase DB và các API ngoại vi).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để triển khai ứng dụng lên môi trường internet một cách thuận tiện, chúng em đã container hóa hoàn toàn ứng dụng bằng Docker. 
> 
> Như mô tả ở **sơ đồ: Quy trình đóng gói đa tầng Multi-stage Build và khởi chạy Docker Container (nằm ở mục 4.1)**, nhóm áp dụng chiến lược đóng gói **Multi-stage Build**. Tại giai đoạn Build, hệ thống sử dụng môi trường Maven đầy đủ để biên dịch mã nguồn Java thành file JAR. Ngay sau đó, ở giai đoạn Run, chúng em chỉ sao chép file JAR này sang một môi trường chạy JRE tinh giản dựa trên hệ điều hành Alpine. Phương pháp này giúp rút gọn dung lượng ảnh Docker từ 820MB xuống chỉ còn 180MB, loại bỏ các file thô và giảm thiểu tối đa các nguy cơ bảo mật hệ thống. 
> 
> Về mặt triển khai vật lý ở **sơ đồ: Kiến trúc triển khai vật lý hệ thống DailyEng trên hạ tầng đám mây (nằm ở mục 4.2)**, Frontend được deploy lên Vercel, còn Backend Java được chạy trong Docker Container trên hạ tầng Render PaaS, kết nối trực tiếp đến PostgreSQL trên Supabase. Để đảm bảo hệ thống hoạt động ổn định khi tương tác với các dịch vụ AI bên ngoài, chúng em tích hợp thư viện **Resilience4j Circuit Breaker**. Nếu API của Azure hay Gemini gặp sự cố mạng hoặc phản hồi quá chậm, Circuit Breaker sẽ tự động ngắt kết nối tạm thời để bảo vệ tài nguyên luồng của JVM khỏi bị cạn kiệt."*

---

## SLIDE 17: KẾT QUẢ THỰC NGHIỆM - LIVE DEMO CÁC PHÂN HỆ CỐT LÕI
* **Phần:** 4. Triển khai & Demo sản phẩm
* **Nội dung:** Live Demo các chức năng chính của hệ thống
### 📌 Nội dung Slide (Bullet points):
* **Môi trường Live Demo các chức năng chính:**
  * **Speaking Room (Luyện nói với AI):** Chọn kịch bản -> Mở mic thu âm -> Nhận đánh giá phát âm chi tiết (tính điểm trôi chảy, ngữ điệu) từ Azure Speech SDK -> Gemini AI phản hồi và sửa lỗi ngữ pháp.
  * **Vocabulary Hub & Flashcards:** Trải nghiệm học từ vựng trực quan, lật thẻ Flashcard hai mặt và tự động lên lịch ôn tập ngắt quãng thông qua thuật toán FSRS.
  * **SmartLens (Dịch ảnh OCR):** Upload ảnh trang sách hoặc hóa đơn tiếng Anh -> Hệ thống quét văn bản bằng OCR của Azure Vision -> Hiển thị bản dịch đè khít lên vị trí chữ gốc.
  * **Dorara AI Companion:** Trợ lý ảo giao tiếp thời gian thực, hiển thị câu trả lời dạng text streaming qua Server-Sent Events (SSE).

### 🖼️ Hình ảnh trình bày trên Slide:
> [!NOTE]  
> **TÊN CÁC HÌNH ẢNH TRÊN FIGMA/SLIDE:**  
> 1. **hình: Giao diện trang chủ Landing page của hệ thống DailyEng (nằm ở mục 4.5)**.  
> 2. **hình: Giao diện phòng luyện nói và chấm điểm phát âm AI (nằm ở mục 4.6)** *(Hiển thị biểu đồ so sánh cao độ Pitch Intonation).*

### 🎙️ Script thuyết trình (2 phút):
> *"Sau đây, em xin phép trình bày về kết quả thực nghiệm và giao diện thực tế của DailyEng qua **hình: Giao diện trang chủ Landing page của hệ thống DailyEng (nằm ở mục 4.5)** và **hình: Giao diện phòng luyện nói và chấm điểm phát âm AI (nằm ở mục 4.6)**. 
> 
> Giao diện trang chủ và các phân hệ học tập được thiết kế hiện đại, tương thích hoàn toàn trên thiết bị di động. 
> 
> Tại phòng luyện nói **Speaking Room**, người học giao tiếp giọng nói tự nhiên với AI. Khi kết thúc nói, hệ thống phản hồi bảng chấm điểm phát âm chi tiết từng từ, chỉ rõ lỗi sai phát âm qua Azure SDK và đưa ra gợi ý sửa lỗi ngữ pháp từ Gemini AI. 
> 
> Tại phân hệ **Vocabulary Hub**, giao diện học thẻ Flashcard trực quan thể hiện rõ rệt tiến độ thông thạo từ vựng được tính toán bởi thuật toán FSRS. Đồng thời, giao diện **Notebook** cung cấp danh sách từ vựng cá nhân được tổ chức khoa học dưới dạng bảng, giúp người học dễ dàng quản lý. 
> 
> Tiện ích **SmartLens** giúp người học tải ảnh lên, nhận diện chữ viết bằng công nghệ OCR của Azure AI Vision và dịch thuật trực tiếp đè lên ảnh gốc cực kỳ khớp."*

---

## SLIDE 18: TỔNG KẾT & HƯỚNG PHÁT TRIỂN
* **Phần:** 5. Kết luận & Định hướng phát triển
* **Nội dung:** Tổng kết & Hướng phát triển
### 📌 Nội dung Slide (Bullet points):
* **Kết luận đề tài:** Đồ án đã hoàn thành các phân hệ chức năng cốt lõi đề ra ban đầu, tích hợp thành công các dịch vụ AI chấm điểm phát âm và đàm thoại trên nền tảng Backend Java Spring Boot vững chắc.
* **Ưu điểm thực tế:** 
  * Tích hợp AI thiết thực, hỗ trợ môi trường đàm thoại và sửa lỗi hữu ích cho người học.
  * Thuật toán FSRS cài đặt trực tiếp bằng Java giúp quản lý ôn tập khoa học.
  * Kiến trúc phân tầng bảo mật an toàn, vận hành Container Docker Multi-stage ổn định trên đám mây.
* **Hạn chế hiện tại:**
  * Hiện tượng khởi động nguội khi khởi chạy container do Backend sử dụng gói máy chủ Render miễn phí.
  * Phụ thuộc vào kết nối Internet liên tục và tính sẵn sàng của các nhà cung cấp đám mây API.
* **Hướng phát triển tiếp theo:**
  * Nghiên cứu tích hợp các mô hình ngôn ngữ lớn gọn nhẹ chạy cục bộ như Gemma 2B, Llama 3B để giảm chi phí API và nâng cao tính độc lập của Backend.
  * Xây dựng chế độ học ngoại tuyến cho Flashcard SRS.
  * Mở rộng thêm nhiều ngôn ngữ rèn luyện khác như tiếng Nhật, tiếng Trung, và tiếng Hàn.

### 🎙️ Script thuyết trình (1.5 phút):
> *"Tổng kết lại, đồ án DailyEng đã hoàn thành đầy đủ các mục tiêu chức năng và phi chức năng đặt ra ban đầu. Chúng em đã xây dựng thành công một ứng dụng học tập tích hợp AI thiết thực trên nền tảng Backend Java Spring Boot vững chắc và bảo mật. 
> 
> Bên cạnh những ưu điểm về tính năng tương tác nói tự nhiên và thuật toán FSRS lập lịch ôn tập thông minh bằng Java, hệ thống vẫn có những hạn chế nhất định như hiện tượng khởi động nguội do Backend đang triển khai trên máy chủ đám mây gói miễn phí của Render, và sự phụ thuộc hoàn toàn vào kết nối internet để gọi các API AI ngoại vi. 
> 
> Trong tương lai, để nâng cao tính bảo mật dữ liệu và giảm chi phí vận hành API, nhóm định hướng sẽ nghiên cứu tích hợp các mô hình ngôn ngữ lớn gọn nhẹ chạy cục bộ ngay trên máy chủ Backend Java như Gemma 2B hay Llama 3B, đồng thời phát triển chế độ Offline Mode để hỗ trợ ôn tập từ vựng ngay cả khi không có kết nối internet. 
> 
> Chúng em xin chân thành cảm ơn các thầy cô trong Hội đồng đã dành thời gian chú ý lắng nghe phần trình bày. Nhóm chúng em rất mong nhận được những câu hỏi chất vấn và ý kiến đóng góp từ các thầy cô để hoàn thiện đề tài hơn nữa. Em xin chân thành cảm ơn!"*
