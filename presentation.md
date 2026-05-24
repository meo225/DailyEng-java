# KỊCH BẢN THUYẾT TRÌNH ĐỒ ÁN: DAILYENG
**Thời lượng thuyết trình dự kiến:** 20 phút | **Trọng tâm công nghệ:** Tích hợp AI trên nền Backend Java Spring Boot 3.4 và Java 21 kết hợp Frontend Next.js 15

---

## SLIDE 1: GIỚI THIỆU ĐỀ TÀI & BỐI CẢNH
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
> *"Kính chào các thầy cô trong Hội đồng chấm đồ án. Em xin phép được đại diện nhóm trình bày báo cáo về đề tài: **'Nghiên cứu và xây dựng DailyEng - Ứng dụng học tiếng Anh tích hợp Trí tuệ nhân tạo và Thuật toán lặp lại ngắt quãng'**. 
> 
> Trong quá trình tìm hiểu thực tiễn học ngoại ngữ, nhóm chúng em nhận thấy người học tại Việt Nam thường gặp khó khăn ở hai khía cạnh: thiếu môi trường thực hành phản xạ nói tự nhiên và chưa có phương pháp để ghi nhớ từ vựng dài hạn. 
> 
> Nhằm giải quyết các vấn đề trên, đồ án này hướng tới xây dựng một ứng dụng học tập hỗ trợ chu trình học khép kín. Trọng tâm của đề tài là thiết lập một hệ thống Backend bằng ngôn ngữ Java Spring Boot, đóng vai trò điều phối tài nguyên và trực tiếp gọi các dịch vụ Trí tuệ nhân tạo AI của Azure và Google để xử lý đánh giá giọng nói, hội thoại thông minh, đồng thời tự lập trình thuật toán ôn tập FSRS bằng Java để tự động hóa việc tính toán lịch học tập cá nhân hóa cho từng người học."*

---

## SLIDE 2: ĐẶT VẤN ĐỀ & KHẢO SÁT THỰC TIỄN
### 📌 Nội dung Slide (Bullet points):
* **Khó khăn thực tế của người học:**
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

## SLIDE 4: SƠ ĐỒ USE CASE TỔNG QUÁT HỆ THỐNG
### 📌 Nội dung Slide (Bullet points):
* **Phân quyền người dùng rõ ràng:**
  * **Khách:** Thực hiện đăng ký, đăng nhập tài khoản, làm bài kiểm tra trình độ đầu vào để nhận gợi ý lộ trình phù hợp.
  * **Người học:** Thực hiện đầy đủ các chức năng học từ vựng, ngữ pháp, luyện nói với AI, quản lý sổ tay cá nhân và theo dõi tiến độ.
* **Mối quan hệ hệ thống:**
  * Hành động *Luyện nói với AI* bao gồm việc *Đánh giá phát âm* và mở rộng sang các tính năng *Tạo kịch bản tùy chỉnh từ mô tả*, *Tạo kịch bản ngẫu nhiên* và *Phân tích sửa lỗi*.
  * Hành động *Dịch thuật* mở rộng sang *Dịch hình ảnh SmartLens* và *Dịch văn bản*.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Hình 3.1. Biểu đồ Use Case tổng quát của hệ thống DailyEng**  
> *(Hiển thị sơ đồ Use Case vẽ bằng Mermaid từ Chương 3 - Mục 3.2.1. Đảm bảo cấu trúc rõ ràng với 3 phân vùng subgraph màu sắc Pastel nhã nhặn: Phân hệ tài khoản, Phân hệ học tập và đánh giá, Phân hệ trợ lý và tiện ích).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Xin mời các thầy cô quan sát **Hình 3.1 - Sơ đồ Use Case tổng quát** mô tả các tác vụ tương tác trong DailyEng. Hệ thống được chia thành hai nhóm Actor chính là Khách và Người học. Khách chưa đăng nhập có thể thực hiện kiểm tra trình độ đầu vào để hệ thống gợi ý lộ trình học tương ứng. 
> 
> Đối với Người học, hệ thống mở khóa toàn bộ các chức năng chuyên sâu nằm trong ba phân vùng nghiệp vụ. 
> 
> Ở phân hệ học tập ở giữa, chức năng Luyện nói với AI bắt buộc phải đi kèm với việc Đánh giá phát âm qua Azure Speech SDK, đồng thời cung cấp các nhánh tính năng mở rộng cho phép người học tự tạo kịch bản học tùy biến từ mô tả cá nhân hoặc nhận báo cáo lỗi chi tiết sau buổi đàm thoại. Phân hệ hỗ trợ phía bên phải cung cấp các tính năng tiện ích bổ trợ như quản lý Sổ tay cá nhân, tương tác với trợ lý Dorara, Dịch hình ảnh SmartLens và hệ thống Gamification tính điểm XP và Streak để khuyến khích học tập hàng ngày."*

---

## SLIDE 5: KIẾN TRÚC HỆ THỐNG TỔNG QUAN & VAI TRÒ CỦA JAVA BACKEND
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
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Hình 3.4. Sơ đồ kiến trúc phân tầng logic (Full-Stack) và luồng giao tiếp**  
> *(Vẽ lại sơ đồ kiến trúc ở Chương 3 - Mục 3.4 mô tả 4 tầng chính: Client Layer, BFF Layer, Server Layer, và Database Layer).*

### 🎙️ Script thuyết trình (2 phút):
> *"Để đảm bảo tính độc lập, dễ mở rộng và bảo mật, hệ thống được thiết kế theo cấu trúc phân tầng Full-Stack như mô tả trong **Hình 3.4**. 
> 
> Tại phía Client, chúng em phát triển giao diện bằng Next.js 15 để tối ưu hóa thời gian hiển thị ban đầu, sử dụng thư viện Zustand quản lý trạng thái client gọn nhẹ. 
> 
> Lớp trung gian BFF sử dụng Next.js Server Actions giúp giải quyết vấn đề CORS, đồng thời hoạt động như một lớp bảo vệ che giấu các địa chỉ endpoint Backend và tự động đính kèm mã JWT Token từ Cookie HttpOnly an toàn. 
> 
> Trọng tâm của đồ án là tầng Backend API được xây dựng bằng **Java Spring Boot 3.4**. Hệ thống mã nguồn Java được phân chia theo kiến trúc module khoa học. Để tối ưu hóa hiệu năng và tốc độ phản hồi, chúng em sử dụng connection pool **HikariCP** kết hợp với bộ nhớ đệm in-memory **Caffeine** tại tầng Service, giúp giảm số lượng truy vấn trực tiếp vào cơ sở dữ liệu PostgreSQL phía dưới khi người dùng yêu cầu các dữ liệu tĩnh như chủ đề hay bài học."*

---

## SLIDE 6: JAVA 21 VIRTUAL THREADS - TỐI ƯU CHO CÁC LUỒNG XỬ LÝ AI
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
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Hình 4.2. Sơ đồ cơ chế hoạt động của Virtual Threads khi xử lý các cuộc gọi API AI nghẽn I/O**  
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

## SLIDE 7: THIẾT KẾ CƠ SỞ DỮ LIỆU & ĐỊNH DANH CUID2
### 📌 Nội dung Slide (Bullet points):
* **Thiết kế thực thể JPA và Cấu trúc cơ sở dữ liệu:**
  * Cơ sở dữ liệu PostgreSQL gồm 35 bảng, được ánh xạ chặt chẽ thông qua Spring Data JPA.
  * Định nghĩa lớp cha trừu tượng BaseEntity để tự động hóa các trường auditing như ngày tạo và ngày cập nhật.
* **Định danh CUID2 thay thế cho UUID:**
  * CUID2 dài 25 ký tự, được tạo tự động tại sự kiện prePersist bằng thư viện CUID cho Java.
  * **Đặc tính khoa học:** Đảm bảo tính duy nhất toàn cầu và có khả năng sắp xếp theo thời gian.
  * **Hiệu suất chỉ mục:** Giúp duy trì thứ tự sắp xếp vật lý khi chèn bản ghi mới, tối ưu hiệu suất cây chỉ mục B-Tree trong cơ sở dữ liệu PostgreSQL.
  * **Bảo mật hệ thống:** Ngăn chặn các lỗ hổng rò rỉ dữ liệu thông qua việc dò đoán ID tài nguyên.

### 🖼️ Sơ đồ trình bày trên Slide:
> [!NOTE]  
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Hình 3.2. Sơ đồ thực thể kết hợp ERD chi tiết của hệ thống DailyEng**  
> *(Hiển thị sơ đồ ERD chi tiết từ mục 3.3.1 biểu diễn mối quan hệ giữa User, UserVocabProgress, VocabItem, SpeakingSession, và NotebookItem).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Em xin phép trình bày về cấu trúc dữ liệu được quản lý ở Backend. Toàn bộ 35 bảng trong cơ sở dữ liệu PostgreSQL được ánh xạ sang các thực thể Java thông qua **Spring Data JPA**. 
> 
> Để quản lý định danh và đồng bộ hóa các trường thông tin kiểm toán hệ thống, chúng em thiết kế lớp cha trừu tượng BaseEntity. Tất cả các Entity con đều kế thừa lớp này và tự động sở hữu cơ chế sinh khóa chính sử dụng chuỗi **CUID2** thay vì số nguyên tự tăng hay UUID truyền thống. 
> 
> CUID2 là một giải pháp định danh ổn định. Về khía cạnh bảo mật, do mang tính ngẫu nhiên cao, nó giúp ngăn chặn việc người dùng dò tìm ID trên đường dẫn API để xem thông tin của người khác. Về khía cạnh hiệu năng, CUID2 có tính chất sắp xếp được theo thời gian sinh. Khi chèn các bản ghi tiến độ học tập mới liên tục, cơ sở dữ liệu PostgreSQL không phải sắp xếp lại toàn bộ cây chỉ mục B-Tree như khi dùng UUID v4 thông thường, giúp đảm bảo tốc độ ghi dữ liệu ở mức ổn định."*

---

## SLIDE 8: THIẾT KẾ HƯỚNG ĐỐI TƯỢNG & DESIGN PATTERNS TRONG CODE JAVA
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
> 1. **Hình 3.6. Sơ đồ quan hệ kế thừa các thực thể trong phân hệ luyện nói (Speaking Module):** *(Biểu diễn cấu trúc ClassDiagram thể hiện tính Kế thừa từ BaseEntity cha).*  
> 2. **Hình 3.5. Luồng ánh xạ và chuyển đổi dữ liệu giữa Entity và DTO:** *(Mô tả quá trình ánh xạ Entity sang DTO tại tầng Service trước khi gửi phản hồi).*  
> 3. **Hình 3.7. Sơ đồ tổng hợp các Design Pattern được áp dụng trong hệ thống DailyEng.**

### 🎙️ Script thuyết trình (2 phút):
> *"Để mã nguồn dự án Java có tính cấu trúc tốt, dễ bảo trì và mở rộng, chúng em đã áp dụng các nguyên lý lập trình hướng đối tượng OOP và các Design Patterns tiêu chuẩn. 
> 
> Trên slide là **Hình 3.6 - Sơ đồ kế thừa của các thực thể Speaking Module**, thể hiện cách chúng em thiết kế tầng dữ liệu hướng đối tượng một cách nhất quán. 
> 
> Tại Backend Java, chúng em triển khai mẫu thiết kế **Service Layer** và **Repository Pattern** để đảm bảo tính liên kết linh hoạt. Mọi logic nghiệp vụ từ việc điều phối bài học đến tính điểm đều nằm tại tầng Service, giúp tầng Controller trở nên tinh gọn. 
> 
> Ngoài ra, chúng em áp dụng **DTO Pattern** bằng cách sử dụng tính năng **Java Records** của Java 21. Java Records đóng vai trò là những cấu trúc dữ liệu bất biến. Như mô tả ở **Hình 3.5**, khi Client yêu cầu thông tin bài học, tầng Service sẽ truy xuất Entity gốc từ database, lọc bỏ các trường dư thừa hoặc nhạy cảm như ngày khởi tạo hay cấu hình backend, và ánh xạ sang DTO Record tương ứng. Quá trình này giúp bảo mật cấu trúc cơ sở dữ liệu và hạn chế kích thước dữ liệu truyền tải qua mạng."*

---

## SLIDE 9: CƠ CHẾ JAVA TÍCH HỢP SPEECH ENGINE & GENERATIVE AI SDK
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
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Hình 3.8. Sơ đồ tuần tự tương tác gọi API AI thông qua Java Backend**  
> *(Sequence Diagram mô tả luồng: Client gửi Audio -> Java Controller -> Java Service -> Azure AI Speech SDK -> Nhận kết quả đánh giá -> Java Service gửi lịch sử hội thoại -> Google Gemini Java SDK -> Nhận phản hồi sửa lỗi -> Trả về kết quả tổng hợp cho Client).*

### 🎙️ Script thuyết trình (2 phút):
> *"Mục tiêu cốt lõi của môn học là tích hợp AI vào hệ thống lập trình Java, và chúng em đã thực hiện điều này bằng việc kết hợp trực tiếp các SDK AI chính thức tại tầng Backend. 
> 
> Trước tiên, đối với tính năng luyện nói, tệp cấu hình Maven `pom.xml` nạp thư viện `client-sdk` của Microsoft Azure Speech. Khi người học gửi dữ liệu âm thanh dạng byte array lên, lớp `SpeakingSessionService` bằng Java sẽ thiết lập đối tượng cấu hình `PronunciationAssessmentConfig` ở mức độ âm vị chi tiết. Dữ liệu âm thanh được gửi trực tiếp đến Azure Speech, và kết quả chấm điểm các tiêu chí phát âm sẽ được Java bóc tách từ đối tượng SDK trả về, sau đó lưu trực tiếp vào cơ sở dữ liệu PostgreSQL. 
> 
> Song song với đó, chúng em tích hợp **Google Generative AI SDK** cho Java để làm bộ não đàm thoại. Bằng cách sử dụng các đoạn mã Java thiết lập thuộc tính System Instruction, chúng em định hình phong cách phản hồi của AI luôn là một giáo viên bản xứ. Khi kết thúc cuộc đàm thoại, Java Service sẽ thu thập toàn bộ các lượt thoại đã lưu trong bảng `SpeakingTurn`, đóng gói thành một prompt gửi đến Gemini API để nhận về kết quả sửa lỗi và các câu đề xuất thay thế tốt hơn. Toàn bộ luồng kết nối logic này được đảm bảo tính toàn vẹn nhờ sự điều phối chặt chẽ của các lớp Service trong mã nguồn Java."*

---

## SLIDE 10: THUẬT TOÁN ÔN TẬP NGẮT QUÃNG FSRS CÀI ĐẶT BẰNG JAVA
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
> **TÊN SƠ ĐỒ TRÊN FIGMA/SLIDE:** **Hình 3.5. Luồng ánh xạ dữ liệu và cập nhật thông số FSRS trong Database**  
> *(Biểu diễn luồng tương tác: Người dùng học Vocabulary Hub -> đánh giá Flashcard -> Next.js gọi Server Action -> Spring Boot nhận yêu cầu -> gọi Class FsrsAlgorithm xử lý -> cập nhật UserVocabProgress và ghi lịch sử vào ReviewLog).*

### 🎙️ Script thuyết trình (2 phút):
> *"Em xin trình bày sâu hơn về khía cạnh khoa học của đồ án – thuật toán ôn tập ngắt quãng **FSRS-4.5** được chúng em tích hợp trực tiếp tại phân hệ **Vocabulary Hub**. 
> 
> Về mặt toán học, thuật toán FSRS dự đoán khả năng nhớ lại R của một từ vựng sau $t$ ngày dựa trên hai thông số là Độ bền trí nhớ S và Độ khó D của từ đó. Mục tiêu cốt lõi của FSRS là lên lịch ôn tập đúng vào ngày khả năng nhớ lại R giảm xuống sát ngưỡng 90%. Đây là thời điểm phù hợp để bộ não tiếp nhận lại thông tin, giúp củng cố độ bền S lên mức cao hơn mà không tốn nhiều công sức học lại. 
> 
> Lớp nghiệp vụ `FsrsAlgorithm.java` được chúng em xây dựng trực tiếp trên Backend. Khi học viên học từ mới tại Vocabulary Hub và nhấn nút đánh giá từ vựng theo các mức độ Again, Hard, Good hay Easy, mã nguồn Java sẽ tự động áp dụng công thức toán học để tính toán lại độ bền trí nhớ S, cập nhật độ khó D thích ứng, sau đó tính ra số ngày ôn tập tiếp theo và lưu trực tiếp trường dữ liệu `nextReview` vào bảng `UserVocabProgress` trong cơ sở dữ liệu. Nhờ vậy, tiến trình ôn tập từ vựng của học viên tại Vocabulary Hub luôn được vận hành một cách tự động và cá nhân hóa."*

---

## SLIDE 11: LUỒNG XÁC THỰC BẢO MẬT & ĐƯỜNG DẪN RESTful API
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
> 1. **Hình 3.8. Sơ đồ tuần tự Luồng xác thực JWT và lấy danh sách kịch bản trong DailyEng** *(Sequence Diagram mô tả luồng xác thực và kiểm soát JWT của bộ lọc Spring Security).*  
> 2. **Bảng 3.7. Bảng tổng hợp các API Endpoints hệ thống tiêu biểu:** *(Liệt kê các API chính như `/auth/login`, `/speaking/scenarios`, `/srs/review`, `/dorara/chat` để Hội đồng đánh giá tính chuẩn hóa của thiết kế API RESTful).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để bảo vệ tài nguyên hệ thống, chúng em cấu hình kiến trúc bảo mật không trạng thái sử dụng **Spring Security**. 
> 
> Như mô tả ở **Hình 3.8**, mọi yêu cầu từ Client gửi lên đều được đi qua bộ lọc `JwtAuthenticationFilter` để giải mã và xác thực token JWT. Quyền hạn của người dùng như Role User hay Role Admin được nhúng trực tiếp vào token và được kiểm soát chặt chẽ ở cấp độ phương thức nhờ chú thích `@PreAuthorize` trên các Java API Controllers. Kỹ thuật này giúp phân tách hoàn toàn logic bảo mật và logic nghiệp vụ. 
> 
> Toàn bộ hệ thống API Backend được thiết kế tuân thủ nghiêm ngặt chuẩn RESTful như liệt kê ở Bảng 3.7. Các đường dẫn được đặt tên rõ ràng, phân loại theo các module Auth, Speaking, Vocab, SRS và trả về các mã trạng thái HTTP chuẩn hóa kết hợp với cấu trúc JSON đồng nhất từ DTO, giúp Frontend dễ dàng bắt lỗi và hiển thị giao diện phù hợp với trạng thái của hệ thống."*

---

## SLIDE 12: ĐÓNG GÓI CONTAINER DOCKER & TRIỂN KHAI VẬN HÀNH CD
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
> 1. **Hình 4.1. Sơ đồ quy trình đóng gói đa tầng Multi-stage Build và khởi chạy Docker Container:** *(Mô tả quá trình build Maven -> tạo JAR -> copy sang runtime JRE tinh giản -> deploy).*  
> 2. **Hình 4.2. Sơ đồ kiến trúc triển khai vật lý hệ thống DailyEng trên hạ tầng đám mây:** *(Mô tả luồng tương tác vật lý giữa Vercel, Render Container, Supabase DB và các API ngoại vi).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để triển khai ứng dụng lên môi trường internet một cách thuận tiện, chúng em đã container hóa hoàn toàn ứng dụng bằng Docker. 
> 
> Như mô tả ở **Hình 4.1**, nhóm áp dụng chiến lược đóng gói **Multi-stage Build**. Tại giai đoạn Build, hệ thống sử dụng môi trường Maven đầy đủ để biên dịch mã nguồn Java thành file JAR. Ngay sau đó, ở giai đoạn Run, chúng em chỉ sao chép file JAR này sang một môi trường chạy JRE tinh giản dựa trên hệ điều hành Alpine. Phương pháp này giúp rút gọn dung lượng ảnh Docker từ 820MB xuống chỉ còn 180MB, loại bỏ các file thô và giảm thiểu tối đa các nguy cơ bảo mật hệ thống. 
> 
> Về mặt triển khai vật lý ở **Hình 4.2**, Frontend được deploy lên Vercel, còn Backend Java được chạy trong Docker Container trên hạ tầng Render PaaS, kết nối trực tiếp đến PostgreSQL trên Supabase. Để đảm bảo hệ thống hoạt động ổn định khi tương tác với các dịch vụ AI bên ngoài, chúng em tích hợp thư viện **Resilience4j Circuit Breaker**. Nếu API của Azure hay Gemini gặp sự cố mạng hoặc phản hồi quá chậm, Circuit Breaker sẽ tự động ngắt kết nối tạm thời để bảo vệ tài nguyên luồng của JVM khỏi bị cạn kiệt."*

---

## SLIDE 13: THIẾT KẾ LUỒNG GIAO DIỆN HỌC TẬP & DESIGN SYSTEM
### 📌 Nội dung Slide (Bullet points):
* **Thiết kế luồng trải nghiệm người dùng:**
  * Sắp xếp quy trình học tập logic qua sơ đồ luồng hoạt động của các phân hệ chính:
    * **Vocabulary Hub Workflow:** Chọn chủ đề -> Học Flashcard SRS ngắt quãng -> Luyện viết hoặc luyện nói phản xạ để ghi nhớ sâu.
    * **Grammar Hub Workflow:** Học lý thuyết ngữ pháp -> Làm bài tập Quiz trắc nghiệm -> Cập nhật tiến độ thông thạo.
    * **Notebook Workflow:** Lưu từ hoặc cấu trúc cá nhân -> Tra cứu, quản lý danh sách từ loại và định nghĩa -> Ôn tập củng cố và theo dõi thống kê học tập.
* **Hệ thống thiết kế giao diện:**
  * Đồng bộ mã màu Primary, Secondary, Accent, Semantic và Grayscale đạt chuẩn tương phản trực quan, kết hợp font chữ bo tròn Nunito mang lại cảm giác học tập hiện đại, thân thiện.

### 🖼️ Sơ đồ & Bảng biểu trình bày trên Slide:
> [!NOTE]  
> **TÊN CÁC SƠ ĐỒ & BẢNG BIỂU TRÊN SLIDE:**  
> 1. **Hình 3.11, 3.12, 3.13, 3.14. Quy trình vận hành các Hub:** *(Chèn 4 sơ đồ luồng Mermaid của Vocabulary Hub, Grammar Hub, Notebook và Translate từ báo cáo Mục 3.8.1 để thể hiện tư duy thiết kế luồng trải nghiệm UX).*  
> 2. **Bảng quy định hệ thống màu sắc (Design System):** *(Chèn bảng màu từ Mục 3.8.3.1 bao gồm các mã màu Primary #0284c7, Secondary #0ea5e9, Accent #f59e0b, Semantic #10b981, và Grayscale #1e293b để minh chứng tính nhất quán của giao diện).*

### 🎙️ Script thuyết trình (1.5 phút):
> *"Để học viên có thể tiếp thu kiến thức một cách tự nhiên và mạch lạc nhất, chúng em đã thiết kế các luồng trải nghiệm người học vô cùng chi tiết như mô tả trong **Hình 3.11 đến 3.14**. 
> 
> Các Hub học tập từ vựng, ngữ pháp hay sổ tay cá nhân đều được thiết kế theo quy trình thống nhất: tiếp thu lý thuyết song ngữ trực quan, làm bài tập vận dụng ngay lập tức và tự động đồng bộ tiến độ ghi nhớ về database. 
> 
> Song song với đó, giao diện người dùng được đồng bộ hóa dựa trên một **Design System** nhất quán. Chúng em quy định rõ ràng bảng mã màu hệ thống với tông xanh da trời làm chủ đạo nhằm tạo cảm giác thoải mái khi học tập, kết hợp cùng phông chữ Nunito bo tròn hiện đại giúp giảm bớt căng thẳng trực quan khi học viên tương tác lâu trên màn hình máy tính hoặc điện thoại."*

---

## SLIDE 14: KẾT QUẢ THỰC NGHIỆM - DEMO GIAO DIỆN & KẾT QUẢ KIỂM THỬ TỰ ĐỘNG
### 📌 Nội dung Slide (Bullet points):
* **Landing Page & Speaking Room Demo:** Giao diện trực quan, hỗ trợ đàm thoại phản xạ nói mượt mà. 
* **Biểu đồ Pitch Intonation thời gian thực:** Áp dụng thuật toán **Tự tương quan** trong PitchAnalyzer để trích xuất tần số cơ bản F0 giọng nói của người học, vẽ biểu đồ so sánh trực quan với ngữ điệu chuẩn giúp người học tự điều chỉnh giọng nói.
* **Dorara AI Companion:** Trợ lý ảo hỗ trợ tương tác sinh động, kết nối trực tiếp với Gemini API ở Backend Java để giải thích bài học.
* **Kiểm thử tự động:**
  * Lập trình bộ **55 kiểm thử tự động (Unit Test)** sử dụng JUnit 5, Mockito ở Backend Java và Vitest ở Frontend.
  * **Kết quả kiểm thử:** Toàn bộ 55 test cases đạt tỷ lệ vượt qua tuyệt đối **100%**, đảm bảo chất lượng logic nghiệp vụ vững vàng.

### 🖼️ Hình ảnh & Bảng biểu trình bày trên Slide:
> [!NOTE]  
> **TÊN HÌNH ẢNH & BẢNG BIỂU TRÊN SLIDE:**  
> 1. **Hình 4.5. Giao diện trang chủ Landing page của hệ thống DailyEng.**  
> 2. **Hình 4.6. Giao diện phòng luyện nói và chấm điểm phát âm AI** *(Hiển thị biểu đồ so sánh cao độ Pitch Intonation).*  
> 3. **Bảng 4.4.2.4. Bảng tổng hợp kết quả kiểm thử tự động:** *(Bảng thống kê 55 Unit test cases đã hoàn thành thành công 100% của các phân hệ để chứng minh tính ổn định của mã nguồn).*

### 🎙️ Script thuyết trình (2 phút):
> *"Sau đây, em xin phép trình bày về kết quả thực nghiệm và giao diện thực tế của DailyEng qua **Hình 4.5** và **Hình 4.6**. 
> 
> Giao diện trang chủ và các phân hệ học tập được thiết kế hiện đại, tương thích hoàn toàn trên thiết bị di động. 
> 
> Tại trang kết quả của **Speaking Room**, người học sẽ nhìn thấy một **Biểu đồ Pitch Intonation** độc đáo. Ở phía Client trình duyệt, chúng em viết lớp phân tích âm thanh PitchAnalyzer ứng dụng thuật toán **Tự tương quan Autocorrelation** để tìm ra tần số cơ bản F0 giọng nói người học trong dải tần chuẩn 85Hz - 500Hz. Biểu đồ sẽ so sánh trực quan cao độ giọng nói của người học với giọng nói bản xứ chuẩn để họ tự điều chỉnh ngữ điệu của mình. 
> 
> Tại phân hệ **Vocabulary Hub**, giao diện học thẻ Flashcard trực quan thể hiện rõ rệt tiến độ thông thạo từ vựng được tính toán bởi thuật toán FSRS. Đồng thời, giao diện **Notebook** cung cấp danh sách từ vựng cá nhân được tổ chức khoa học dưới dạng bảng, giúp người học dễ dàng quản lý và tra cứu từ loại, nghĩa tiếng Việt cùng các ghi chú cá nhân một cách tiện lợi. 
> 
> Để đảm bảo tính bền vững và tin cậy của ứng dụng, hệ thống Backend Java và Frontend được kiểm thử tự động nghiêm ngặt. Chúng em đã xây dựng thành công bộ **55 kiểm thử tự động (Unit Test)** sử dụng JUnit 5 và Mockito ở Backend Java, kết hợp Vitest ở Frontend Next.js. Như thống kê tại Bảng 4.4.2.4, toàn bộ 55 test cases đều hoàn thành chính xác 100%, giúp kiểm soát lỗi logic và bảo vệ mã nguồn khi tiến hành tái cấu trúc code."*

---

## SLIDE 15: TỔNG KẾT & HƯỚNG PHÁT TRIỂN
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
