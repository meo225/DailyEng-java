# Báo Cáo Đồ Án: Ứng Dụng Học Tiếng Anh DailyEng (Java Spring Boot + Next.js)

---

## CHƯƠNG 1: TỔNG QUAN

**1.1. Đặt vấn đề:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Nêu bối cảnh và lý do cấp thiết cần thực hiện đề tài (sự thiếu hụt môi trường giao tiếp thực tế).*

**1.2. Giới thiệu tổng quan đề tài:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Giới thiệu khái quát về giải pháp ứng dụng AI làm trợ lý ngôn ngữ cá nhân.*

**1.3. Khảo sát:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Trình bày số liệu thực tiễn minh chứng cho tiềm năng của sản phẩm.*
*   **1.3.1. Khảo sát từ dữ liệu thống kê**
*   **1.3.2. Khảo sát các website học tiếng anh hiện nay** 
    *   a) Trang web 1: PrepTalk luyện nói
    *   b) Trang web 2: YouPass
    *   c) Trang web 3: Luyennoi
*   **1.3.3. Khảo sát người dùng** 

**1.4. Mục tiêu:**
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Trình bày chi tiết mục tiêu kiến thức kỹ thuật và sản phẩm ứng dụng đạt được.*
*   **1.4.1. Mục tiêu kiến thức** 
*   **1.4.2. Mục tiêu sản phẩm:** Hệ thống DailyEng được thiết kế với đầy đủ các phân hệ chức năng nhằm phục vụ quy trình học tập khép kín từ khâu lập kế hoạch, học kiến thức mới, luyện tập thực hành đến ôn tập dài hạn. Cụ thể các trang và chức năng bao gồm:
    *   **Speaking Room:** Cho phép người dùng luyện giao tiếp đối kháng 1-1 với AI theo các chủ đề thực tế, đồng thời cung cấp phản hồi chấm điểm chi tiết về phát âm và ngữ pháp ngay lập tức.
    *   **Vocabulary Hub:** Cung cấp hệ thống học từ vựng phân theo chủ đề. Hỗ trợ người dùng ghi nhớ qua Thẻ thông minh (Flashcard) và các bài luyện tập đa kỹ năng (Practice) bao gồm dịch thuật viết (Writing) và luyện nói phản xạ (Speaking).
    *   **Grammar Hub:** Hệ thống bài giảng lý thuyết ngữ pháp phân cấp (A1-C2) kết hợp với các bài tập thực hành vận dụng và dịch câu.
    *   **Hệ thống Study Plan:** Hỗ trợ người dùng tự thiết lập kế hoạch học tập chi tiết, theo dõi tiến độ hoàn thành và đánh giá lộ trình phát triển.
    *   **Notebook & Spaced Repetition:** Sổ tay từ vựng thông minh tích hợp trực tiếp thuật toán lặp lại ngắt quãng (FSRS), tự động tính toán và điều chỉnh thời điểm ôn tập tối ưu để tối đa hóa khả năng ghi nhớ dài hạn.
    *   **Translate:** Cung cấp công cụ dịch thuật văn bản dựa trên mô hình ngôn ngữ AI, giúp phân tích ngữ cảnh của câu để đưa ra bản dịch tự nhiên nhất.
    *   **Smartlens:** Tính năng quét và nhận diện văn bản bằng hình ảnh (OCR), cho phép người dùng dịch nghĩa các đoạn văn bản từ hình ảnh một cách nhanh chóng mà không cần nhập liệu thủ công.
    *   **Trợ lý ảo học tập (Dorara):** Chatbot tích hợp trên toàn trang hỗ trợ giải đáp thắc mắc về kiến thức và hướng dẫn sử dụng nền tảng mọi lúc mọi nơi.

**1.5. Bố cục báo cáo đồ án:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Tóm tắt cấu trúc báo cáo 5 chương.*

---

## CHƯƠNG 2: CƠ SỞ LÝ THUYẾT VÀ CÔNG NGHỆ SỬ DỤNG

**2.1. Backend:**
> [!NOTE]
> *Trọng tâm: Trình bày các công nghệ cốt lõi xây dựng hệ thống Backend.*
*   **2.1.1. Nền tảng ngôn ngữ Java 21:** 
    > [!NOTE]
    > *Nguồn: report new.md | Trọng tâm: Giới thiệu tính năng mới của Java.*
    *   2.1.1.1. Virtual Threads (Project Loom)
    *   2.1.1.2. Java Records cho DTO
*   **2.1.2. Spring Boot 3.4 và quản lý phụ thuộc Maven:** 
    > [!NOTE]
    > *Nguồn: report new.md | Trọng tâm: Giới thiệu Framework lõi và cơ chế quản lý thư viện tập trung.*
    *   2.1.2.1. Spring Boot 3.4
    *   2.1.2.2. Quản lý phụ thuộc Maven
*   **2.1.3. Cấu hình ORM với Spring Data JPA & Hibernate:** 
    > [!NOTE]
    > *Nguồn: report new.md | Trọng tâm: Kỹ thuật ORM, ID Strategy và tối ưu hiệu năng DB.*
    *   **2.1.3.1. Tầng thao tác dữ liệu (Abstract Persistence Layer):** Hệ thống DailyEng sử dụng PostgreSQL làm hệ quản trị cơ sở dữ liệu quan hệ, kết hợp cùng Spring Data JPA để trừu tượng hóa quá trình tương tác dữ liệu. Spring Data JPA cho phép định nghĩa các giao diện (Interfaces) kế thừa từ `JpaRepository`, giúp hệ thống thực thi các thao tác CRUD mà không cần viết các câu lệnh SQL thuần túy, nâng cao tính bảo mật và giảm rủi ro SQL Injection:
        ```java
        public interface UserRepository extends JpaRepository<User, String> {
            Optional<User> findByEmail(String email);
        }
        ```
    *   **2.1.3.2. Hibernate và Tối ưu hóa hiệu năng:** Để đảm bảo tốc độ phản hồi và khả năng chịu tải của hệ thống, DailyEng áp dụng một số cơ chế tối ưu hóa cốt lõi của Hibernate và Spring Boot:
        *   **Dirty Checking:** Hệ thống tự động phát hiện các thay đổi trạng thái trên thực thể (Entity) và đồng bộ hóa với cơ sở dữ liệu PostgreSQL một cách tối ưu.
        *   **HikariCP:** Sử dụng Connection Pool mặc định của Spring Boot, được tinh chỉnh trong `application.yml` nhằm duy trì hiệu năng ổn định khi xử lý lượng kết nối đồng thời cao.
    *   **2.1.3.3. Cấu trúc thực thể và định danh (ID Strategy):** Một điểm đặc biệt trong thiết kế cơ sở dữ liệu của DailyEng là việc sử dụng định danh CUID (Collision-resistant Unique Identifier) thay vì các số nguyên tự tăng (Auto-increment) hay UUID truyền thống. CUID được thiết kế để tối ưu cho các hệ thống phân tán, đảm bảo tính duy nhất toàn cầu nhưng vẫn giữ được thứ tự sắp xếp theo thời gian (k-sortable), giúp tăng hiệu suất chỉ mục (index) trong B-tree. Tất cả các thực thể trong hệ thống đều kế thừa từ lớp `BaseEntity`, lớp này chịu trách nhiệm khởi tạo ID bằng thư viện CUID:
        ```java
        @MappedSuperclass
        @Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
        public abstract class BaseEntity {
            @Id
            @Column(length = 30)
            private String id;
        
            @PrePersist
            public void prePersist() {
                if (this.id == null) {
                    this.id = io.github.thibaultmeyer.cuid.CUID.randomCUID2(25).toString();
                }
            }
        }
        ```

**2.2. Kiến trúc bảo mật và xác thực:** 
> [!NOTE]
> *Trọng tâm: Dự án triển khai mô hình bảo mật tập trung sử dụng Spring Security. Hệ thống áp dụng cơ chế Stateless Authentication thông qua JWT (JSON Web Token), kết hợp với HttpOnly Cookies để ngăn chặn các cuộc tấn công XSS. Ngoài ra, việc phân quyền được quản lý chặt chẽ dựa trên vai trò người dùng (RBAC - Role-based Access Control).*
*   **2.2.1. Cơ chế xác thực không trạng thái (Stateless Authentication):** Thay vì sử dụng phiên làm việc (Session) truyền thống vốn tiêu tốn tài nguyên bộ nhớ máy chủ, hệ thống ứng dụng Spring Security kết hợp với JSON Web Token (JWT). Mỗi yêu cầu từ phía máy khách đều đính kèm một chuỗi mã hóa có chữ ký số (Digital Signature).
    *   **Access Token:** Có thời hạn hiệu lực ngắn (24 giờ), được sử dụng trực tiếp để chứng thực và cấp quyền truy cập tài nguyên.
    *   **Refresh Token:** Có thời hạn hiệu lực dài (7 ngày), đóng vai trò cấp phát lại Access Token mới khi thẻ cũ hết hạn, giúp duy trì trải nghiệm người dùng liền mạch mà không cần tái đăng nhập.
*   **2.2.2. Bảo mật bộ nhớ đệm (HttpOnly Cookies):** Nhằm chủ động phòng chống các cuộc tấn công đánh cắp phiên làm việc (Cross-Site Scripting - XSS), toàn bộ JWT được lưu trữ an toàn bên trong các HttpOnly Cookies. Cơ chế này hoàn toàn vô hiệu hóa khả năng đọc token từ các đoạn mã thông dịch JavaScript ở phía Client.
    
    *Thiết lập cấu hình bảo mật điển hình trong `application.yml`:*
    ```yaml
    app:
      cookie:
        secure: true # Chỉ gửi qua HTTPS trong Production
        same-site: Lax
        access-max-age: 86400
    ```
*   **2.2.3. Phân quyền (Role-based Access Control - RBAC):** Việc kiểm soát và phân quyền truy cập trong DailyEng được thiết kế theo mô hình RBAC. Quyền hạn của người dùng (như `ROLE_USER` hoặc `ROLE_ADMIN`) được hệ thống nhúng trực tiếp vào tải trọng (payload) của JWT tại thời điểm đăng nhập. Khi có yêu cầu gửi đến Server, bộ lọc của Spring Security Context sẽ tự động giải mã token và tái tạo lại tập hợp các quyền (Granted Authorities) cho phiên làm việc đó.
    
    Quá trình cấp phép được khai báo trực quan và bảo mật ngay trên tầng Trình diễn (Controller) thông qua các chú thích (Annotations) như `@PreAuthorize`. Kỹ thuật bảo mật ở cấp độ phương thức (Method Security) này giúp phân tách rành mạch logic nghiệp vụ và logic bảo mật, ngăn chặn tối đa nguy cơ leo thang đặc quyền.
    
    *Ví dụ về cấu hình Method Security được áp dụng trong hệ thống:*
    ```java
    @RestController
    @RequestMapping("/api/topics")
    public class TopicController {

        // Khóa API: Chỉ quản trị viên (ADMIN) mới có quyền tạo chủ đề học tập mới
        @PreAuthorize("hasRole('ADMIN')")
        @PostMapping
        public ResponseEntity<?> createTopic(@RequestBody TopicRequest request) {
            // ... (Chi tiết logic xử lý nghiệp vụ được trình bày ở Chương 4) ...
            return ResponseEntity.ok().build();
        }
    }
    ```

**2.3. Cơ sở dữ liệu và quản lý phiên bản (Database Migration):** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Quản lý cấu trúc dữ liệu bền vững qua các môi trường.*
*   **2.3.1. Hệ quản trị Cơ sở dữ liệu PostgreSQL 16:** Để đáp ứng yêu cầu lưu trữ linh hoạt và truy xuất dữ liệu tốc độ cao, hệ thống đã quyết định sử dụng PostgreSQL 16 làm cơ sở dữ liệu chính:
    *   **Đặc điểm và lý do l*   **2.4.1. Azure Speech SDK:** Dịch vụ Azure AI Speech từ Microsoft đóng vai trò cốt lõi trong tính năng luyện nói của hệ thống. DailyEng sử dụng dịch vụ này thông qua SDK chính thức để đạt được độ chính xác và tốc độ phản hồi cao nhất. Cụ thể, các tính năng chính được triển khai bao gồm:
    *   **Đánh giá phát âm:** Chức năng nâng cao này cho phép chấm điểm phát âm theo từng từ, đối chiếu chi tiết các tiêu chí cốt lõi như độ chính xác, độ lưu loát và ngữ điệu tự nhiên.
    *   **Chuyển đổi giọng nói thành văn bản:** Lời nói của người dùng được phân tích thành văn bản để làm dữ liệu đầu vào cho mô hình ngôn ngữ lớn.
    *   **Chuyển đổi văn bản thành giọng nói:** Phản hồi từ hệ thống được tổng hợp thành âm thanh tự nhiên, tạo môi trường thuận lợi để người dùng luyện kỹ năng nghe.
    
    *Cú pháp minh họa cấu hình đánh giá phát âm trong Azure SDK:*
    ```java
    public PronunciationAssessmentResult assessPronunciation(byte[] audioBytes, String referenceText) {
        // Cấu hình đánh giá chi tiết mức độ từ và âm vị
        var pronConfig = new PronunciationAssessmentConfig(
            referenceText, 
            PronunciationAssessmentGradingSystem.HundredMark,
            PronunciationAssessmentGranularity.Phoneme, 
            true
        );
        // ... thực hiện đánh giá qua Azure SDK
    }
    ```
*   **2.4.2. Azure AI Translator:** Để hỗ trợ người dùng trong việc hiểu nghĩa của các câu hay đoạn văn phức tạp, DailyEng tích hợp dịch vụ Azure AI Translator phiên bản REST API v3.0. Dịch vụ này được sử dụng chủ yếu trong tính năng dịch văn bản tức thời và hỗ trợ giải nghĩa từ vựng.
    *   **Tự động nhận diện ngôn ngữ:** Hệ thống có khả năng tự động nhận diện ngôn ngữ nguồn nếu người dùng không chỉ định.
    *   **Dịch thuật hàng loạt:** Cho phép dịch nhiều đoạn văn bản trong một yêu cầu duy nhất nhằm tối ưu hóa số lượng cuộc gọi API và giảm độ trễ.
    *   **Hỗ trợ đa ngôn ngữ:** Hỗ trợ dịch thuật linh hoạt giữa tiếng Anh, tiếng Việt và tiếng Nhật.
*   **2.4.3. Azure AI Vision (OCR):** DailyEng cung cấp tính năng SmartLens, cho phép người dùng trích xuất văn bản từ hình ảnh để tra cứu hoặc dịch thuật. Tính năng này được hiện thực hóa bằng dịch vụ Azure AI Vision phiên bản Image Analysis v4.0.
    *Cơ chế hoạt động trong AzureVisionService.java:*
    *   **Trích xuất văn bản:** Sử dụng thuật toán học sâu để nhận diện và trích xuất các dòng văn bản từ dữ liệu ảnh định dạng JPEG hay PNG.
    *   **Tọa độ vùng văn bản:** Hệ thống không chỉ trích xuất chữ mà còn lấy được tọa độ vị trí của từng dòng hay khối văn bản trên ảnh, giúp hiển thị kết quả dịch đè lên ảnh một cách chính xác.
    
    *Đoạn mã trích xuất văn bản:*
    ```java
    var url = endpoint + "/computervision/imageanalysis:analyze?api-version=2024-02-01&features=read";
    var request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Content-Type", "application/octet-stream")
            .POST(HttpRequest.BodyPublishers.ofByteArray(imageData))
            .build();
    ```
*   **2.4.4. Google Gemini API:** Google Gemini phiên bản gemini-3.1-flash-lite được sử dụng làm "bộ não" AI cho hệ thống. Thông qua Google Generative AI SDK cho Java, hệ thống thực hiện các tác vụ xử lý ngôn ngữ tự nhiên phức tạp:
    *   **Dorara AI Companion:** Robot trợ lý ảo hỗ trợ giải đáp thắc mắc về tiếng Anh, giải thích ngữ pháp và từ vựng. Đồng thời giúp củng cố kiến thức bài học bằng các câu trắc nghiệm ngắn.
    *   **Speaking AI Partner:** Đóng vai trò là đối tác giao tiếp trong các kịch bản luyện nói, có khả năng phản hồi linh hoạt dựa trên ngữ cảnh và trình độ theo khung tham chiếu châu Âu của người dùng.
    *   **Phân tích và sửa lỗi:** Sau mỗi buổi luyện tập, Gemini sẽ phân tích toàn bộ lịch sử hội thoại để chỉ ra các lỗi ngữ pháp, dùng từ và đề xuất cách diễn đạt tự nhiên hơn.
    
    Hệ thống sử dụng cơ chế System Instruction để định hình phong cách phản hồi của AI, đảm bảo AI luôn đóng vai một giáo viên tiếng Anh kiên nhẫn và chuyên nghiệp.
*   **2.4.5. Sentry:** DailyEng tích hợp Sentry để theo dõi lỗi và giám sát hiệu năng theo thời gian thực trên cả Frontend và Backend.
    *   **Frontend:** Bắt các lỗi chạy mã lệnh JavaScript, lỗi mạng và ghi lại hành trình người dùng trước khi lỗi xảy ra.
    *   **Backend:** Tự động bắt các ngoại lệ chưa được xử lý, ghi lại các truy vấn cơ sở dữ liệu chậm và theo dõi các giao dịch giữa các dịch vụ.
    Việc này giúp đội ngũ phát triển phát hiện và khắc phục sự cố ngay lập tức trước khi người dùng báo cáo, đồng thời cung cấp các báo cáo về độ ổn định của hệ thống.
*   **2.4.6. Resilience4j & Caffeine Cache:** Để đảm bảo hệ thống hoạt động ổn định và có khả năng chịu lỗi, DailyEng áp dụng các thư viện bổ trợ mạnh mẽ:
    *   **Resilience4j:** Được áp dụng tại lớp Service gọi đến các API bên thứ ba như Azure và Gemini. Khi một dịch vụ bên ngoài gặp sự cố hoặc phản hồi chậm, cơ chế ngắt mạch Circuit Breaker sẽ tạm thời ngắt kết nối để bảo vệ tài nguyên hệ thống, tránh tình trạng lỗi lan truyền. Đồng thời, cơ chế Retry giúp tự động thử lại các yêu cầu thất bại do sự cố mạng tạm thời.
        ```java
        @CircuitBreaker(name = "gemini", fallbackMethod = "generateSpeakingResponseFallback")
        @Retry(name = "gemini")
        public SpeakingResponseResult generateSpeakingResponse(ScenarioConfig scenario, ...) {
            // Logic gọi đến Google Gemini API
        }
        ```
    *   **Caffeine Cache:** DailyEng sử dụng Caffeine làm thư viện lưu trữ bộ nhớ đệm hiệu năng cao cho Java để lưu trữ các dữ liệu ít thay đổi nhưng thường xuyên được truy vấn như danh sách chủ đề, chi tiết bài học ngữ pháp và các kịch bản luyện nói mẫu.
        
        *Cấu hình trong `application.yml`:*
        ```yaml
        spring:
          cache:
            type: caffeine
            caffeine:
              spec: maximumSize=1000,expireAfterWrite=86400s # Cache trong 24 giờ
        ```
        Việc áp dụng Caffeine giúp giảm đáng kể số lượng truy vấn vào cơ sở dữ liệu PostgreSQL và giảm độ trễ cho các yêu cầu từ phía người dùng, từ đó cải thiện trải nghiệm tổng thể.

**2.5. Công nghệ phát triển Frontend:** 
> [!NOTE]
> *Trọng tâm: Phân tích các công nghệ nền tảng, công cụ xây dựng giao diện và hiệu ứng hiển thị được áp dụng ở phía máy khách.*
*   **2.5.1. Framework lõi và Quản lý trạng thái (State Management):**
    *   **Nền tảng Next.js và thư viện React:** Ứng dụng được xây dựng trên bộ khung Next.js kết hợp cùng React. Việc áp dụng kiến trúc định tuyến mới cho phép kết hợp linh hoạt giữa cơ chế kết xuất mã HTML tại máy chủ và kết xuất tại trình duyệt. Cơ chế này giúp tối ưu hóa khả năng được tìm kiếm của trang web và giảm thiểu thời gian tải trang ban đầu, mang lại trải nghiệm mượt mà ngay từ những giây đầu tiên.
    *   **Quản lý trạng thái (State Management) với Zustand:** Thay vì sử dụng các công cụ phức tạp, hệ thống lựa chọn thư viện Zustand để quản lý trạng thái toàn cục. Với kiến trúc luồng dữ liệu một chiều được thiết kế tối giản, giải pháp này giúp loại bỏ các đoạn mã dư thừa, đồng thời kiểm soát trạng thái ứng dụng một cách hiệu quả mà không gây ra hiện tượng tải lại giao diện không cần thiết.
*   **2.5.2. Công nghệ CSS và Hệ thống thiết kế (Design System):**
    *   **Bộ thư viện Tailwind CSS:** Giao diện được định kiểu bằng phương pháp sử dụng các lớp CSS tiện ích. Cách tiếp cận này giúp đóng gói phong cách giao diện một cách nhanh chóng, đồng thời kết hợp linh hoạt với các công cụ tiện ích nội suy để quản lý trạng thái hiển thị động dựa trên logic của ứng dụng.
    *   **Thành phần giao diện (UI Components) với Radix UI:** Hệ thống giao diện tận dụng bộ thư viện các thành phần không định dạng sẵn. Lựa chọn này giúp đảm bảo ứng dụng tuân thủ nghiêm ngặt các tiêu chuẩn hỗ trợ trợ năng cho người khuyết tật, đồng thời vẫn giữ được khả năng tùy biến thiết kế hiển thị tự do theo đúng bộ nhận diện thương hiệu của dự án.
    *   **Kiểm chứng dữ liệu (Data Validation) với React Hook Form và Zod:** Quá trình xử lý các biểu mẫu đầu vào được kiểm soát an toàn thông qua cơ chế xác thực dữ liệu chặt chẽ ngay tại trình duyệt. Điều này giúp ngăn chặn các luồng dữ liệu sai lệch trước khi gửi đến hệ thống máy chủ.
*   **2.5.3. Đồ họa 3D và Hiệu ứng hoạt ảnh (3D Graphics & Animations):**
    *   **Kết xuất đồ họa (Rendering) WebGL:** Hệ thống ứng dụng công nghệ WebGL thông qua các thư viện trung gian như Three.js và React Three Fiber để kết xuất các mô hình không gian ba chiều trực tiếp trên trình duyệt. Đột phá này được dùng để hiển thị nhân vật trợ lý ảo thông minh, mang lại một trải nghiệm học tập sinh động và vượt trội so với các thiết kế phẳng truyền thống.
    *   **Xử lý chuyển động (Animations) với Framer Motion:** Các vi chuyển động và hiệu ứng chuyển cảnh mượt mà được quản lý chặt chẽ thông qua thư viện Framer Motion. Việc gắn kết hiệu ứng vật lý vào vòng đời hoạt động của các thành phần giao diện giúp tăng tính tương tác và tạo cảm giác gắn kết cho người học.
*   **2.5.4. Trực quan hóa dữ liệu (Data Visualization):** Quá trình phân tích tiến độ học tập được thể hiện trực quan thông qua công cụ Recharts. Thư viện này hỗ trợ vẽ các biểu đồ véc-tơ tương tác theo thời gian thực dựa trên luồng dữ liệu hệ thống, giúp người dùng dễ dàng theo dõi thống kê học tập cá nhân.

---

## CHƯƠNG 3: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG

**3.1. Phân tích yêu cầu hệ thống:**
> [!NOTE]
> *Trọng tâm: Xác định các tính năng bắt buộc và các yêu cầu chất lượng của ứng dụng.*
*   **3.1.1. Yêu cầu chức năng** 
    *   3.1.1.1. Quản lý người dùng và xác thực
    *   3.1.1.2. Học từ vựng
    *   3.1.1.3. Luyện nói
    *   3.1.1.4. Học ngữ pháp
    *   3.1.1.5. Sổ tay cá nhân
    *   3.1.1.6. Kế hoạch học tập
    *   3.1.1.7. Hồ sơ cá nhân và thống kê học tập
    *   3.1.1.8. Trợ lý ảo
    *   3.1.1.9. Dịch thuật
    *   3.1.1.10. Kiểm tra đầu vào
    *   3.1.1.11. Thông báo
    *   3.1.1.12. Gamification
*   **3.1.2. Yêu cầu phi chức năng** 
    *   3.1.2.1. Hiệu năng (Performance)
    *   3.1.2.2. Bảo mật (Security)
    *   3.1.2.3. Khả năng bảo trì (Maintainability)

**3.2. Phân tích Use Case và Thiết kế Luồng nghiệp vụ:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Trình bày biểu đồ Use Case tổng quát và các kịch bản tương tác.*
*   **3.2.1. Biểu đồ Use Case tổng quát**

    Sơ đồ dưới đây mô tả tổng quát sự tương tác giữa các nhóm người dùng với các phân hệ chức năng cốt lõi của hệ thống DailyEng:

    ```mermaid
    flowchart LR
        %% Định nghĩa Actor
        G((Khách))
        U((Người học))

        %% Quản lý hệ thống và người dùng
        subgraph HT_TaiKhoan [Phân hệ tài khoản]
            direction TB
            UC1([" Đăng ký và đăng nhập "])
            UC2([" Quản lý hồ sơ cá nhân "])
            UC3([" Kiểm tra đầu vào "])
        end

        %% Nền tảng học tập cốt lõi
        subgraph HT_HocTap [Phân hệ học tập và đánh giá]
            direction TB
            UC4([" Học từ vựng "])
            UC5([" Luyện nói với AI "])
            UC6([" Học ngữ pháp "])
            
            %% Extends và Includes
            UC4_1([" Luyện flashcard SRS "])
            UC4_2([" Làm bài luyện tập "])
            UC5_1([" Đánh giá phát âm "])
            UC5_2([" Tạo chủ đề theo mô tả "])
            UC5_3([" Tạo chủ đề ngẫu nhiên "])
            UC5_4([" Phân tích & sửa lỗi "])
            UC6_1([" Làm bài tập thực hành "])
        end

        %% Hỗ trợ và cá nhân hóa
        subgraph HT_HoTro [Phân hệ trợ lý và tiện ích]
            direction TB
            UC7([" Quản lý sổ tay cá nhân "])
            UC8([" Kế hoạch và thống kê "])
            UC9([" Trợ lý ảo Dorara "])
            UC10([" Dịch thuật "])
            UC11([" Nhiệm vụ & Bảng xếp hạng "])
            UC12([" Quản lý thông báo "])
            
            %% Extends
            UC10_1([" Dịch hình ảnh (SmartLens) "])
            UC10_2([" Dịch văn bản "])
        end

        %% Phân quyền Khách
        G --> UC1
        G --> UC3

        %% Phân quyền Người học
        U --> UC1
        U --> UC2
        U --> UC4
        U --> UC5
        U --> UC6
        U --> UC7
        U --> UC8
        U --> UC9
        U --> UC10
        U --> UC11
        U --> UC12

        %% Mối quan hệ Include / Extend chuyên sâu
        UC4 -.->|«extend»| UC4_1
        UC4 -.->|«extend»| UC4_2
        UC5 -.->|«include»| UC5_1
        UC5 -.->|«extend»| UC5_2
        UC5 -.->|«extend»| UC5_3
        UC5 -.->|«extend»| UC5_4
        UC6 -.->|«extend»| UC6_1
        UC10 -.->|«extend»| UC10_1
        UC10 -.->|«extend»| UC10_2

        %% Tính thẩm mỹ: Màu Pastel phân loại theo từng hệ thống
        classDef actor fill:#ffe0b2,stroke:#ffb300,stroke-width:2px,color:#e65100;
        classDef ucAccount fill:#e3f2fd,stroke:#64b5f6,stroke-width:2px,color:#0d47a1;
        classDef ucLearning fill:#e8f5e9,stroke:#81c784,stroke-width:2px,color:#1b5e20;
        classDef ucSupport fill:#f3e5f5,stroke:#ba68c8,stroke-width:2px,color:#4a148c;

        class G,U actor;
        class UC1,UC2,UC3 ucAccount;
        class UC4,UC5,UC6,UC4_1,UC4_2,UC5_1,UC5_2,UC5_3,UC5_4,UC6_1 ucLearning;
        class UC7,UC8,UC9,UC10,UC11,UC12,UC10_1,UC10_2 ucSupport;

        %% Tùy chỉnh Subgraph: Nền cực nhạt, viền đứt nét cùng tone màu
        style HT_TaiKhoan fill:#f8fbff,stroke:#64b5f6,stroke-width:2px,stroke-dasharray: 5 5,color:#0d47a1
        style HT_HocTap fill:#f9fdf9,stroke:#81c784,stroke-width:2px,stroke-dasharray: 5 5,color:#1b5e20
        style HT_HoTro fill:#fcf8fd,stroke:#ba68c8,stroke-width:2px,stroke-dasharray: 5 5,color:#4a148c
    ```
*   **3.2.2. Đặc tả chi tiết các Use Case**
    *   Use Case 1: Đăng ký tài khoản
    *   Use Case 2: Luyện nói với AI (Speaking Practice)
    *   Use Case 3: Học từ vựng với Flashcards
    *   Use Case 4: Chat với Dorara AI Assistant

**3.3. Thiết kế cơ sở dữ liệu:**
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Trình bày mô hình ERD và cấu trúc dữ liệu chi tiết.*
*   **3.3.1. Sơ đồ thực thể kết hợp (ERD)** 

    Dưới đây là sơ đồ thực thể kết hợp (ERD) mô tả mối quan hệ giữa các thực thể dữ liệu chính trong hệ thống DailyEng bao gồm người dùng, tiến trình luyện nói, sổ tay ôn tập từ vựng ngắt quãng (SRS) và kế hoạch học tập:

    ```mermaid
    erDiagram
        User {
            string id PK
            string email
            string password
            string role
            string name
        }
        ProfileStats {
            string id PK
            string userId FK
            int xp
            int streak
        }
        StudyPlan {
            string id PK
            string userId FK
            datetime startDate
            datetime endDate
        }
        SpeakingScenario {
            string id PK
            string topicId FK
            string title
            string description
            string goal
            string difficulty
        }
        SpeakingSession {
            string id PK
            string userId FK
            string scenarioId FK
            float overallScore
        }
        SpeakingTurn {
            string id PK
            string sessionId FK
            string role
            string textContent
        }
        Notebook {
            string id PK
            string userId FK
            string name
            string type
            string language
        }
        NotebookItem {
            string id PK
            string notebookId FK
            string userId FK
            string word
            string pronunciation
            string meaning
            string partOfSpeech
            string level
            string note
            datetime nextReview
        }
        Topic {
            string id PK
            string title
        }
        VocabItem {
            string id PK
            string topicId FK
            string word
        }
        UserVocabProgress {
            string id PK
            string userId FK
            string vocabItemId FK
            float stability
            float difficulty
            int repetitions
            int lapses
            string srsState
            datetime nextReview
        }
        ReviewLog {
            string id PK
            string userId FK
            string vocabItemId FK
            int rating
            float elapsedDays
            float stability
            float difficulty
            string state
        }
        GrammarNote {
            string id PK
            string topicId FK
            string title
            string explanation
        }
        DailyMission {
            string id PK
            string title
            string type
            int requirement
            int points
        }
        UserDailyMission {
            string id PK
            string userId FK
            string missionId FK
            int progress
            boolean completed
        }

        User ||--|| ProfileStats : "has"
        User ||--|| StudyPlan : "follows"
        User ||--o{ SpeakingSession : "performs"
        User ||--o{ Notebook : "owns"
        User ||--o{ UserDailyMission : "participates"
        User ||--o{ UserVocabProgress : "has_progress"
        
        Topic ||--o{ SpeakingScenario : "categorizes"
        Topic ||--o{ VocabItem : "contains"
        Topic ||--o{ GrammarNote : "has"
        
        SpeakingScenario ||--o{ SpeakingSession : "instantiates"
        SpeakingSession ||--o{ SpeakingTurn : "contains"
        
        Notebook ||--o{ NotebookItem : "has"
        VocabItem ||--o{ UserVocabProgress : "tracks"
        UserVocabProgress ||--o{ ReviewLog : "records"
        
        DailyMission ||--o{ UserDailyMission : "defines"
    ```
    *Hình 3.2. Sơ đồ thực thể kết hợp (ERD) chi tiết của hệ thống DailyEng.*

    Sơ đồ ERD thể hiện cấu trúc dữ liệu cốt lõi của DailyEng. **User** là thực thể trung tâm, kết nối 1-1 với **ProfileStats** và **StudyPlan**. Phân hệ luyện nói gồm **SpeakingSession** liên kết với **SpeakingScenario** và chứa nhiều **SpeakingTurn**. Hệ thống quản lý từ vựng FSRS sử dụng bảng trung gian **UserVocabProgress** để theo dõi và cập nhật trực tiếp các thông số FSRS cho từng **VocabItem**. Lịch sử ôn tập được ghi lại tại **ReviewLog** để phục vụ huấn luyện và tối ưu hóa thuật toán. Phân hệ sổ tay cá nhân được tách biệt qua **Notebook** và **NotebookItem**.


*   **3.3.2. Chi tiết các thực thể chính** 

    #### 3.3.2.1. Bảng User
    *   **Mô tả:** Lưu trữ thông tin tài khoản và thông tin cá nhân của người học.
    *   **Mối quan hệ:**
        *   Quan hệ 1-1: `ProfileStats`, `StudyPlan`.
        *   Quan hệ 1-N: `SpeakingSession`, `Flashcard`, `Notebook`, `Notification`, `UserVocabProgress`.

    *Bảng 3.1. Chi tiết thuộc tính của thực thể User*

    | Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
    | :--- | :--- | :--- | :--- |
    | **id** | String (VARCHAR) | PRIMARY KEY, CUID | ID duy nhất định danh người học. |
    | **name** | String (VARCHAR) | NOT NULL | Họ và tên hiển thị của người dùng. |
    | **email** | String (VARCHAR) | UNIQUE, NOT NULL | Địa chỉ email đăng nhập hệ thống. |
    | **emailVerified** | DateTime (TIMESTAMP) | NULL | Thời gian xác thực email (dành cho OAuth Google/Github). |
    | **password** | String (VARCHAR) | NULL | Mật khẩu đã băm bcrypt (NULL nếu đăng nhập bằng OAuth). |
    | **image** | String (VARCHAR) | NULL | URL ảnh đại diện người dùng lưu trên Cloudinary. |
    | **phoneNumber** | String (VARCHAR) | NULL | Số điện thoại liên lạc. |
    | **dateOfBirth** | Date (DATE) | NULL | Ngày, tháng, năm sinh (LocalDate). |
    | **gender** | Enum (Gender) / String | NULL | Giới tính người dùng (`MALE`, `FEMALE`, `OTHER`). |
    | **address** | String (VARCHAR) | NULL | Địa chỉ thường trú. |
    | **level** | Enum (Level) / String | NULL | Trình độ ngoại ngữ hiện tại của người dùng (`A1` - `C2`). |
    | **createdAt** | DateTime (TIMESTAMP) | DEFAULT now() | Thời gian khởi tạo tài khoản. |
    | **updatedAt** | DateTime (TIMESTAMP) | AUTO UPDATE | Thời gian cập nhật thông tin tài khoản lần cuối. |

    #### 3.3.2.2. Bảng Topic
    *   **Mô tả:** Lưu trữ các chủ đề học tập chung cho cả Vocabulary Hub và Grammar Hub.
    *   **Mối quan hệ:**
        *   Quan hệ 1-N: `VocabItem`, `GrammarNote`, `QuizItem`, `ListeningTask`, `ReadingPassage`, `SpeakingScenario`, `Lesson`.
        *   Quan hệ N-1: `TopicGroup`.
        *   Quan hệ 1-N: `UserTopicProgress`, `VocabBookmark`, `GrammarBookmark`.

    *Bảng 3.2. Chi tiết thuộc tính của thực thể Topic*

    | Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
    | :--- | :--- | :--- | :--- |
    | **id** | String (VARCHAR) | PRIMARY KEY, CUID | ID duy nhất định danh chủ đề. |
    | **title** | String (VARCHAR) | NOT NULL | Tiêu đề của chủ đề học tập. |
    | **subtitle** | String (VARCHAR) | NULL | Phụ đề bổ sung cho chủ đề. |
    | **description** | String (VARCHAR) | NOT NULL | Nội dung mô tả chi tiết của chủ đề. |
    | **level** | Enum (Level) / String | NOT NULL | Trình độ yêu cầu đối với chủ đề (`A1` - `C2`). |
    | **wordCount** | Int | NOT NULL | Tổng số lượng từ vựng của chủ đề. |
    | **estimatedTime** | Int | NOT NULL | Thời gian ước tính hoàn thành chủ đề (phút). |
    | **thumbnail** | String (VARCHAR) | NULL | URL hình ảnh đại diện của chủ đề. |
    | **category** | String (VARCHAR) | NULL | Danh mục chính phân loại (Vocabulary/Grammar). |
    | **subcategory** | String (VARCHAR) | NULL | Danh mục phụ phân loại. |
    | **order** | Int | DEFAULT 0 | Thứ tự sắp xếp hiển thị trên giao diện. |
    | **topicGroupId** | String (VARCHAR) | FOREIGN KEY | Liên kết với nhóm chủ đề phân loại (`TopicGroup`). |

    #### 3.3.2.3. Bảng VocabItem
    *   **Mô tả:** Lưu trữ thông tin chi tiết của các từ vựng thuộc các chủ đề học tập.
    *   **Mối quan hệ:**
        *   Quan hệ N-1: `Topic` (CASCADE DELETE).
        *   Quan hệ 1-N: `UserVocabProgress`.

    *Bảng 3.3. Chi tiết thuộc tính của thực thể VocabItem*

    | Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
    | :--- | :--- | :--- | :--- |
    | **id** | String (VARCHAR) | PRIMARY KEY, CUID | ID từ vựng duy nhất. |
    | **topicId** | String (VARCHAR) | FOREIGN KEY, NOT NULL | Liên kết tới chủ đề chứa từ vựng. |
    | **word** | String (VARCHAR) | NOT NULL | Từ vựng tiếng Anh. |
    | **pronunciation** | String (VARCHAR) | NULL | Phát âm phiên âm IPA chung. |
    | **phonBr** | String (VARCHAR) | NULL | Phiên âm tiếng Anh giọng Anh (UK). |
    | **phonNAm** | String (VARCHAR) | NULL | Phiên âm tiếng Anh giọng Mỹ (US). |
    | **meaning** | String (VARCHAR) | NOT NULL | Định nghĩa nghĩa tiếng Anh. |
    | **vietnameseMeaning** | String (VARCHAR) | NOT NULL | Định nghĩa nghĩa tiếng Việt. |
    | **partOfSpeech** | Enum / String | NOT NULL | Từ loại (Danh từ, động từ, tính từ, v.v.). |
    | **collocations** | String[] (text[]) | DEFAULT '{}' | Các cụm từ thường đi kèm. |
    | **exampleSentence** | String (VARCHAR) | NOT NULL | Câu ví dụ minh họa bằng tiếng Anh. |
    | **exampleTranslation** | String (VARCHAR) | NOT NULL | Dịch nghĩa câu ví dụ sang tiếng Việt. |
    | **definitions** | JSONB | NULL | Cấu trúc JSON chi tiết định nghĩa và ngữ cảnh mở rộng. |
    | **synonyms** | String[] (text[]) | DEFAULT '{}' | Danh sách các từ đồng nghĩa. |
    | **antonyms** | String[] (text[]) | DEFAULT '{}' | Danh sách các từ trái nghĩa. |

    #### 3.3.2.4. Bảng SpeakingSession
    *   **Mô tả:** Lưu trữ kết quả các lượt hội thoại luyện nói với AI của người học.
    *   **Mối quan hệ:**
        *   Quan hệ N-1: `User` (CASCADE DELETE).
        *   Quan hệ N-1: `SpeakingScenario` (CASCADE DELETE).
        *   Quan hệ 1-N: `SpeakingTurn`.

    *Bảng 3.4. Chi tiết thuộc tính của thực thể SpeakingSession*

    | Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
    | :--- | :--- | :--- | :--- |
    | **id** | String (VARCHAR) | PRIMARY KEY, CUID | ID phiên luyện nói duy nhất. |
    | **userId** | String (VARCHAR) | FOREIGN KEY, NOT NULL | ID người học tham gia. |
    | **scenarioId** | String (VARCHAR) | FOREIGN KEY, NOT NULL | ID kịch bản hội thoại AI. |
    | **createdAt** | DateTime (TIMESTAMP) | DEFAULT now() | Thời gian bắt đầu phiên. |
    | **endedAt** | DateTime (TIMESTAMP) | NULL | Thời gian kết thúc phiên. |
    | **duration** | Int | NULL | Thời lượng luyện tập thực tế (giây). |
    | **overallScore** | Int | NULL | Điểm đánh giá tổng quan phiên luyện tập (0-100). |
    | **grammarScore** | Int | NULL | Điểm đánh giá độ chính xác ngữ pháp (0-100). |
    | **topicScore** | Int | NULL | Điểm đánh giá độ liên quan và nội dung (0-100). |
    | **fluencyScore** | Int | NULL | Điểm đánh giá độ trôi chảy khi hội thoại (0-100). |
    | **accuracyScore** | Int | NULL | Điểm đánh giá độ chính xác phát âm (0-100). |
    | **prosodyScore** | Int | NULL | Điểm đánh giá ngữ điệu và biểu cảm giọng nói (0-100). |
    | **vocabularyScore** | Int | NULL | Điểm đánh giá vốn từ vựng sử dụng (0-100). |
    | **feedbackTitle** | String (VARCHAR) | NULL | Tiêu đề tóm tắt nhận xét của AI. |
    | **feedbackSummary** | String (TEXT) | NULL | Nội dung nhận xét chi tiết từ AI. |
    | **feedbackRating** | String (VARCHAR) | NULL | Phân loại đánh giá (Excellent/Good/Average/Poor). |
    | **feedbackTip** | String (TEXT) | NULL | Lời khuyên cụ thể từ AI giúp cải tiến kỹ năng nói. |
    | **variationSeed** | Int | NULL | Hạt giống ngẫu nhiên để khởi tạo nội dung hội thoại AI. |

*   **3.3.3. Các bảng khác**
    Ngoài 4 bảng cốt lõi mô tả chi tiết ở trên, cơ sở dữ liệu hệ thống DailyEng còn có 31 bảng khác phân bố theo các mục đích nghiệp vụ:
    *   **Learning Content (6 bảng):**
        *   `TopicGroup`: Nhóm phân loại các chủ đề học tập.
        *   `GrammarNote`: Lưu chi tiết các ghi chú, bài học lý thuyết ngữ pháp.
        *   `QuizItem`: Câu hỏi trắc nghiệm thực hành theo chủ đề.
        *   `ListeningTask`: Các bài nghe phục vụ luyện nghe theo chủ đề.
        *   `ReadingPassage`: Các đoạn văn phục vụ luyện đọc hiểu.
        *   `Lesson`: Bài học nhỏ thuộc lộ trình học của chủ đề.
    *   **Progress Tracking (6 bảng):**
        *   `UserVocabProgress`: Lưu trữ các thông số FSRS (`stability`, `difficulty`, `repetitions`, `lapses`, `srsState`) phục vụ thuật toán ôn tập ngắt quãng từ vựng.
        *   `UserTopicProgress`: Lưu trữ tiến độ hoàn thành các chủ đề của người dùng.
        *   `UserLessonProgress`: Lưu trữ tiến trình học các bài học của người dùng.
        *   `Flashcard`: Thực thể lưu trữ các thẻ học từ vựng riêng biệt.
        *   `NotebookItem`: Lưu trữ thông tin chi tiết từ vựng mà người học tự thêm vào Sổ tay cá nhân.
        *   `ReviewLog`: Lưu lịch sử từng lần ôn tập từ vựng làm cơ sở huấn luyện và cập nhật trọng số FSRS.
    *   **Speaking Details (3 bảng):**
        *   `SpeakingScenario`: Định nghĩa kịch bản bối cảnh hội thoại AI.
        *   `SpeakingTurn`: Lưu trữ chi tiết văn bản và ghi âm từng lượt trao đổi.
        *   `SpeakingTurnError`: Lưu các lỗi phát âm cụ thể trong lượt nói để báo cáo và sửa lỗi.
    *   **Study Plan (2 bảng):**
        *   `StudyPlan`: Kế hoạch học tập 7 ngày cá nhân hóa của người học.
        *   `StudyTask`: Các nhiệm vụ cụ thể cấu thành nên kế hoạch học.
    *   **Bookmarks (3 bảng):**
        *   `SpeakingBookmark`: Đánh dấu lưu kịch bản luyện nói yêu thích.
        *   `VocabBookmark`: Đánh dấu lưu chủ đề từ vựng yêu thích.
        *   `GrammarBookmark`: Đánh dấu lưu chủ đề ngữ pháp yêu thích.
    *   **Gamification (4 bảng):**
        *   `DailyMission`: Định nghĩa danh sách các nhiệm vụ hàng ngày.
        *   `UserDailyMission`: Lưu tiến độ thực hiện nhiệm vụ hàng ngày của người học.
        *   `UserActivity`: Nhật ký hoạt động học của người học (phục vụ vẽ Heatmap).
        *   `LeaderboardEntry`: Lưu trữ thông tin xếp hạng thi đua tích lũy XP.
    *   **Authentication (3 bảng):**
        *   `Account`: Liên kết tài khoản mạng xã hội OAuth2 (Google/Github).
        *   `Session`: Quản lý các phiên đăng nhập của người dùng.
        *   `VerificationToken`: Lưu mã token phục vụ đăng ký/xác minh tài khoản.
    *   **Misc (4 bảng):**
        *   `Notebook`: Quản lý các cuốn sổ tay từ vựng của người học.
        *   `Notification`: Lưu thông báo từ hệ thống tới người dùng.
        *   `PlacementTestResult`: Lưu kết quả đánh giá năng lực kiểm tra đầu vào.
        *   `Feedback`: Đóng góp ý kiến và phản hồi lỗi từ người dùng.

**3.4. Mô hình kiến trúc hệ thống:**
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Trình bày mô hình hoạt động phân tán giữa Client và Backend Server.*

    Sơ đồ dưới đây mô tả tổng quát kiến trúc phân tầng logic (Full-Stack) và luồng giao tiếp giữa các thành phần của hệ thống DailyEng:

    ```mermaid
    flowchart TD
        subgraph ClientLayer ["Client Layer (Next.js BFF)"]
            direction TB
            ReactComp["React Components / shadcn UI"]
            AuthJS["Auth.js / Context Provider"]
            ServerActions["Server Actions / API Client"]
            
            ReactComp <--> ServerActions
            AuthJS <--> ServerActions
        end

        subgraph ServerLayer ["Server Layer (Spring Boot)"]
            direction TB
            Controllers["REST Controllers"]
            Service["Service Logic / Security"]
            Repo["JPA Repositories"]
            
            Controllers <--> Service
            Service --> Repo
        end

        subgraph DataExternal ["External & Data Layer"]
            direction LR
            Postgres[("PostgreSQL Database")]
            AIServices["AI Services: Gemini / Azure"]
            Cloudinary["Cloudinary Storage"]
        end

        %% Connections between layers
        ServerActions <-->|HTTP / REST| Controllers
        ServerActions -->|Upload API| Cloudinary
        Service -->|API Call| AIServices
        Repo <-->|JPA / JDBC| Postgres

        %% Styling
        classDef client fill:#e0f7fa,stroke:#00acc1,stroke-width:2px,color:#006064;
        classDef server fill:#e8f5e9,stroke:#4caf50,stroke-width:2px,color:#1b5e20;
        classDef ext fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#e65100;
        
        class ReactComp,AuthJS,ServerActions client;
        class Controllers,Service,Repo server;
        class Postgres,AIServices,Cloudinary ext;
        
        style ClientLayer fill:#f0fbfd,stroke:#00acc1,stroke-width:2px,stroke-dasharray: 5 5;
        style ServerLayer fill:#f4fbf5,stroke:#4caf50,stroke-width:2px,stroke-dasharray: 5 5;
        style DataExternal fill:#fffaf4,stroke:#ff9800,stroke-width:2px,stroke-dasharray: 5 5;
    ```
    *Hình 3.3. Sơ đồ kiến trúc Full-Stack DailyEng.*

*   **3.4.1. Kiến trúc tổng quan: Mô hình Client – Server** 
    Hệ thống DailyEng được thiết kế theo kiến trúc Client – Server, áp dụng mô hình 3 lớp (3-Tier Architecture) nhằm tách biệt rõ ràng giữa giao diện người dùng, logic nghiệp vụ và lưu trữ dữ liệu. Trong đó, phía Client được xây dựng bằng Next.js, đóng vai trò hiển thị giao diện, tiếp nhận thao tác và xử lý các tương tác trực tiếp với người dùng. Phía Server được xây dựng bằng Spring Boot, chịu trách nhiệm xử lý nghiệp vụ, xác thực người dùng, cung cấp API và làm việc với cơ sở dữ liệu cũng như các dịch vụ bên ngoài.

    Sự tách biệt giữa Next.js và Spring Boot giúp hệ thống có cấu trúc rõ ràng, linh hoạt và dễ bảo trì. Client tập trung vào trải nghiệm người dùng và khả năng phản hồi của giao diện, trong khi Server đảm bảo việc xử lý dữ liệu, bảo mật và vận hành các chức năng cốt lõi của hệ thống. Hai thành phần này giao tiếp với nhau thông qua các API RESTful trên giao thức HTTP/HTTPS, dữ liệu được trao đổi chủ yếu dưới định dạng JSON.

    *   **3.4.1.1. Phía Client (Frontend Layer)**
        Phía Client của hệ thống được xây dựng bằng Next.js, một framework dựa trên React. Thành phần này đóng vai trò là lớp giao diện, nơi người dùng trực tiếp thao tác với hệ thống DailyEng. Ở phía Client, hệ thống đảm nhận các nhiệm vụ chính sau:
        *   **Hiển thị (Presentation):** Sử dụng React Components kết hợp Tailwind CSS và thư viện shadcn/ui để tạo ra giao diện thẩm mỹ, nhất quán và phản hồi nhanh (Responsive).
        *   **Quản lý trạng thái (State Management):** Sử dụng React Context và Zustand để quản lý dữ liệu người dùng, trạng thái phiên học và thông tin xác thực.
        *   **Xử lý logic giao diện:** Thực hiện các tương tác thời gian thực như ghi âm luyện nói, tìm kiếm từ vựng và hoạt ảnh (animations).
        *   **Lớp trung gian BFF (Backend-for-Frontend):** Next.js không chỉ là Client thuần túy mà còn đóng vai trò là một lớp Server trung gian (thông qua Server Actions) để quản lý bảo mật và chuyển tiếp yêu cầu đến backend chính.

    *   **3.4.1.2. Phía Server (Application Server Layer)**
        Phía Server của hệ thống được xây dựng bằng Spring Boot 3.4, đóng vai trò là trung tâm xử lý chính của DailyEng. Đây là nơi tiếp nhận các yêu cầu từ Client, kiểm tra tính hợp lệ, xử lý nghiệp vụ và trả kết quả về cho phía giao diện. Server đảm nhiệm các chức năng quan trọng sau:
        *   **Logic Nghiệp vụ (Business Logic):** Xử lý các quy trình học tập phức tạp như tính toán tiến độ, thuật toán lặp lại ngắt quãng (SRS), và điều phối hội thoại AI.
        *   **Xác thực và Phân quyền (Authentication & Authorization):** Sử dụng Spring Security và JWT để bảo vệ các tài nguyên hệ thống, đảm bảo người dùng chỉ truy cập được dữ liệu của chính mình.
        *   **Cung cấp API RESTful:** Xây dựng hệ thống các endpoint chuẩn hóa để Client có thể truy xuất dữ liệu một cách nhất quán qua định dạng JSON.
        *   **Tích hợp dịch vụ AI:** Kết nối với các mô hình ngôn ngữ lớn (LLM - như Google Gemini) và dịch vụ xử lý tiếng nói (Azure Speech) để cung cấp tính năng học tập thông minh.

    *   **3.4.1.3. Lớp Dữ liệu (Data Tier)**
        Bên cạnh Client và Server, hệ thống DailyEng còn có lớp dữ liệu dùng để lưu trữ và quản lý các thông tin cần thiết trong quá trình vận hành. Lớp này không giao tiếp trực tiếp với người dùng mà chủ yếu được truy cập thông qua Server. Lớp dữ liệu của hệ thống bao gồm:
        *   **Cơ sở dữ liệu chính:** Sử dụng PostgreSQL, một hệ quản trị cơ sở dữ liệu quan hệ mạnh mẽ, để lưu trữ thông tin người dùng, nội dung bài học, kết quả luyện tập và lịch sử hội thoại.
        *   **Lưu trữ tệp tin (Object Storage):** Sử dụng Cloudinary để lưu trữ hình ảnh (avatar, ảnh chủ đề) và các tệp âm thanh ghi âm từ phía người dùng, giúp giảm tải cho server chính.

    *   **3.4.1.4. Cơ chế tương tác giữa Client và Server**
        Trong hệ thống DailyEng, Client và Server giao tiếp với nhau thông qua giao thức HTTP/HTTPS. Phía Client sử dụng Next.js để gửi các yêu cầu đến Backend, trong khi phía Server sử dụng Spring Boot để tiếp nhận, xử lý nghiệp vụ và trả dữ liệu phản hồi. Cơ chế này giúp tách biệt rõ ràng giữa giao diện người dùng và phần xử lý logic của hệ thống.
        *   **Yêu cầu (Request):** Client gửi yêu cầu kèm theo JWT Access Token trong tiêu đề (Header) Authorization.
        *   **Xử lý:** Server xác thực token, kiểm tra quyền hạn, sau đó thực thi logic nghiệp vụ và truy vấn cơ sở dữ liệu.
        *   **Phản hồi (Response):** Server trả về dữ liệu dưới dạng JSON kèm theo các mã trạng thái HTTP (200 OK, 401 Unauthorized, 400 Bad Request, v.v.).
        *   **Cập nhật:** Client nhận dữ liệu, cập nhật lại giao diện người dùng mà không cần tải lại toàn bộ trang (Single Page Experience).

*   **3.4.2. Kiến trúc phân tầng Backend (Layered Architecture)** 
    *   **3.4.2.1. Tổng quan về Kiến trúc phân tầng (Layered Architecture)**
        Hệ thống Backend của DailyEng được xây dựng trên nền tảng framework Spring Boot 3.4 với kiến trúc phân tầng chuẩn (standard N-tier architecture). Việc áp dụng kiến trúc phân tầng giúp đảm bảo nguyên lý Separation of Concerns (SoC), cho phép tách biệt các thành phần có trách nhiệm khác nhau, từ đó tăng khả năng bảo trì, mở rộng và kiểm thử cho hệ thống.

        Kiến trúc backend của hệ thống được chia thành 4 tầng chính:
        *   **Tầng Trình diễn (Presentation Layer / Controller Layer):** Tiếp nhận các yêu cầu HTTP từ phía client, điều phối logic và trả về phản hồi tương ứng.
        *   **Tầng Nghiệp vụ (Business Logic Layer / Service Layer):** Chứa toàn bộ các quy tắc nghiệp vụ, xử lý dữ liệu và điều phối các giao dịch (transaction).
        *   **Tầng Truy xuất Dữ liệu (Data Access Layer / Repository Layer):** Tương tác trực tiếp với cơ sở dữ liệu thông qua Spring Data JPA.
        *   **Tầng Thực thể và Truyền tải Dữ liệu (Entity & DTO Layer):** Định nghĩa cấu trúc dữ liệu lưu trữ và định dạng dữ liệu truyền tải giữa các tầng và phía client.

        Để minh họa trực quan luồng đi của dữ liệu qua 4 tầng kiến trúc này, dưới đây là sơ đồ tuần tự thể hiện quá trình hệ thống xử lý một yêu cầu lấy danh sách chủ đề từ vựng:

        ```mermaid
        sequenceDiagram
            autonumber
            participant Client as Client (Web/Mobile)
            participant Controller as VocabController
            participant Service as VocabService
            participant Repo as TopicRepository
            participant DB as Database (PostgreSQL)

            Client->>Controller: GET /vocab/topics (language, category)
            activate Controller
            Controller->>Controller: extractUserId()
            Controller->>Service: getTopicsWithProgress(userId, language, category, ...)
            activate Service
            Service->>Repo: findAll(Specification)
            activate Repo
            Repo->>DB: SELECT * FROM topics WHERE ...
            activate DB
            DB-->>Repo: List<Topic> Entities
            deactivate DB
            Repo-->>Service: Page<Topic>
            deactivate Repo
            Service->>Service: Map Entities to VocabTopicListResponse (DTO)
            Service-->>Controller: VocabTopicListResponse
            deactivate Service
            Controller-->>Client: 200 OK (JSON Data)
            deactivate Controller
        ```
        *Hình 3.4. Sơ đồ tuần tự xử lý yêu cầu lấy danh sách chủ đề từ vựng.*

        Các phần từ 3.4.2.2 đến 3.4.2.7 dưới đây là chi tiết các tầng và các thành phần bổ trợ trong kiến trúc:

    *   **3.4.2.2. Tầng Trình diễn (Controller Layer)**
        Các lớp Controller đóng vai trò là điểm cuối (endpoint) cho các API RESTful. Tầng này có nhiệm vụ:
        *   Giải mã (Deserialize) các yêu cầu từ Client (JSON/Params).
        *   Xác thực người dùng thông qua `SecurityContext`.
        *   Gọi các phương thức tương ứng trong tầng Service.
        *   Đóng gói kết quả trả về dưới dạng `ResponseEntity`.
        Hầu hết các Controller đều kế thừa từ BaseController để sử dụng các tiện ích xác thực dùng chung.

        ```java
        // File: backend/src/main/java/com/dailyeng/vocabulary/VocabController.java
        @RestController
        @RequestMapping("/vocab")
        @RequiredArgsConstructor
        public class VocabController extends BaseController {

            private final VocabService vocabService;

            @GetMapping("/topics")
            public ResponseEntity<VocabTopicListResponse> getTopics(
                    @RequestHeader(value = "X-Learning-Language", defaultValue = "en") String language,
                    @RequestParam(required = false) String category,
                    @RequestParam(required = false) String subcategory,
                    @RequestParam(required = false) List<String> levels,
                    @RequestParam(defaultValue = "1") int page,
                    @RequestParam(defaultValue = "12") int limit
            ) {
                var userId = extractUserId();
                return ResponseEntity.ok(
                        vocabService.getTopicsWithProgress(userId, language, category, subcategory, levels, page, limit));
            }
        }
        ```

    *   **3.4.2.3. Tầng Nghiệp vụ (Service Layer)**
        Đây là tầng quan trọng nhất của hệ thống, nơi xử lý các logic phức tạp như tính toán tiến độ học tập, tìm kiếm với tiêu chí phức tạp, và quản lý bộ nhớ đệm (cache). Đặc điểm nổi bật:
        *   **Quản lý giao dịch (@Transactional):** Đảm bảo tính toàn vẹn dữ liệu khi thực hiện nhiều thao tác ghi vào database.
        *   **Tối ưu hiệu năng (@Cacheable):** Sử dụng cache để giảm tải cho database đối với các dữ liệu ít thay đổi.
        *   **Tính đóng gói nghiệp vụ:** Controller không biết về các Repository, nó chỉ giao tiếp qua Service.

        ```java
        // File: backend/src/main/java/com/dailyeng/vocabulary/VocabService.java
        @Service
        @RequiredArgsConstructor
        public class VocabService {

            private final TopicGroupRepository topicGroupRepo;
            private final TopicRepository topicRepo;
            private final UserVocabProgressRepository userVocabProgressRepo;

            @Cacheable(value = "vocabTopicGroups", key = "#language")
            @Transactional(readOnly = true)
            public List<TopicGroupResponse> getTopicGroups(String language) {
                var groups = topicGroupRepo.findByHubTypeAndLanguageOrderByOrderAsc("vocab", language);
                return groups.stream()
                        .map(g -> new TopicGroupResponse(
                                g.getId(),
                                toTitleCase(g.getName()),
                                g.getSubcategories() != null
                                        ? g.getSubcategories().stream().map(this::toTitleCase).toList()
                                        : List.of()))
                        .toList();
            }
        }
        ```

    *   **3.4.2.4. Tầng Truy xuất Dữ liệu (Repository Layer)**
        Tầng này tận dụng sức mạnh của Spring Data JPA để thực hiện các thao tác CRUD (Create, Read, Update, Delete) mà không cần viết câu lệnh SQL thủ công (trong hầu hết các trường hợp). Các kỹ thuật áp dụng:
        *   **Derived Query Methods:** Tự động sinh câu truy vấn dựa trên tên phương thức (ví dụ: findByTopicGroupIdOrderByOrderAsc).
        *   **JPQL (@Query):** Sử dụng cho các truy vấn phức tạp hoặc tối ưu hóa hiệu năng (join nhiều bảng).
        *   **JpaSpecificationExecutor:** Hỗ trợ tạo các câu truy vấn động dựa trên các tiêu chí lọc.

        ```java
        // File: backend/src/main/java/com/dailyeng/vocabulary/TopicRepository.java
        public interface TopicRepository extends JpaRepository<Topic, String>, JpaSpecificationExecutor<Topic> {
            
            // Derived Query
            List<Topic> findByTopicGroupIdOrderByOrderAsc(String topicGroupId);

            // JPQL cho tìm kiếm phức tạp và tối ưu hiệu năng
            @Query("""
                SELECT t FROM Topic t
                WHERE t.topicGroup.hubType = :hubType
                  AND t.topicGroup.language = :language
                  AND (LOWER(t.title) LIKE LOWER(CONCAT('%', :query, '%'))
                       OR LOWER(t.description) LIKE LOWER(CONCAT('%', :query, '%')))
                ORDER BY t.title ASC
                """)
            List<Topic> searchByTitleOrDescription(
                    @Param("hubType") com.dailyeng.common.enums.HubType hubType,
                    @Param("language") String language,
                    @Param("query") String query,
                    Pageable pageable);
        }
        ```

    *   **3.4.2.5. Tầng Thực thể và Truyền tải Dữ liệu (Entity & DTO Layer)**
        Tầng Entity và DTO có nhiệm vụ biểu diễn dữ liệu trong hệ thống và kiểm soát dữ liệu trao đổi giữa Backend và Client. Việc tách riêng hai thành phần này giúp hệ thống rõ ràng, an toàn và dễ bảo trì hơn.
        *   **Entity:** Là các lớp Java dùng để ánh xạ với các bảng trong cơ sở dữ liệu PostgreSQL. Mỗi Entity tương ứng với một bảng, các thuộc tính tương ứng với các cột dữ liệu. Các Entity thường kế thừa từ BaseEntity để dùng chung các trường như createdAt, updatedAt, giúp tự động quản lý thời gian tạo và cập nhật dữ liệu.
        *   **DTO (Data Transfer Object):** Là đối tượng dùng để truyền dữ liệu qua API. Hệ thống sử dụng các DTO để quy định dữ liệu gửi đến hoặc nhận từ Client. Nhỡ đó, hệ thống tránh trả trực tiếp Entity ra ngoài, hạn chế lộ thông tin không cần thiết và giảm lượng dữ liệu truyền tải.
        Nhìn chung, tầng Entity & DTO giúp tách biệt dữ liệu trong database với dữ liệu hiển thị qua API. Điều này giúp API ổn định hơn khi cấu trúc cơ sở dữ liệu thay đổi, đồng thời hỗ trợ việc mở rộng và bảo trì hệ thống.

        Để làm rõ nguyên lý hoạt động và vai trò bảo mật dữ liệu của tầng này, dưới đây là sơ đồ luồng ánh xạ từ thực thể cơ sở dữ liệu (Entity) sang đối tượng truyền tải dữ liệu (DTO) trước khi phản hồi về giao diện người dùng:

        ```mermaid
        flowchart TD
            subgraph DataTier ["Tầng Cơ sở dữ liệu"]
                DB[("Bảng PostgreSQL<br/>Table: Topic")]
            end

            subgraph BackendTier ["Tầng Backend (Spring Boot)"]
                direction TB
                E["JPA Entity<br/>Topic.java"]
                MapProcess["Mapping Process<br/>Chuyển đổi & Lọc bỏ"]
                DTO["Response DTO<br/>TopicGroupResponse.java"]
            end

            subgraph ClientTier ["Tầng Giao diện (Next.js)"]
                UI["React Component<br/>UI Hub View"]
            end

            DB <-->|Spring Data JPA| E
            E -->|1. Đọc Entity| MapProcess
            MapProcess -->|2. Ánh xạ sang DTO| DTO
            DTO -->|3. Trả về JSON| UI

            %% Styling
            style DB fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#e65100;
            style E fill:#e8f5e9,stroke:#4caf50,stroke-width:2px,color:#1b5e20;
            style MapProcess fill:#e8f5e9,stroke:#4caf50,stroke-width:2px,color:#1b5e20;
            style DTO fill:#e8f5e9,stroke:#4caf50,stroke-width:2px,color:#1b5e20;
            style UI fill:#e0f7fa,stroke:#00acc1,stroke-width:2px,color:#006064;
        ```
        *Hình 3.5. Luồng ánh xạ và chuyển đổi dữ liệu giữa Entity và DTO.*

        **Giải thích nhanh các thành phần trong sơ đồ:**
        *   **Bảng PostgreSQL (Table: Topic):** Nơi lưu trữ dữ liệu vật lý thực tế dưới dạng các hàng và cột trong database, chứa tất cả các trường (kể cả các trường nhạy cảm hoặc không cần thiết cho giao diện như `createdAt`, `updatedAt`, `hubType`).
        *   **JPA Entity (Topic.java):** Đối tượng Java ánh xạ trực tiếp 1:1 với cấu trúc bảng PostgreSQL thông qua Spring Data JPA ORM.
        *   **Mapping Process:** Tiến trình xử lý nghiệp vụ tại tầng Service. Ở đây, dữ liệu từ Entity được lọc bỏ các trường nhạy cảm, đồng thời thực hiện các phép biến đổi dữ liệu (ví dụ: chuyển đổi tên chủ đề thành Title Case qua hàm `toTitleCase(g.getName())`).
        *   **Response DTO (TopicGroupResponse.java):** Đối tượng truyền tải dữ liệu tinh gọn, chỉ chứa đúng những thuộc tính cần thiết mà giao diện người dùng yêu cầu (ví dụ: `id`, `name`, `subcategories`).
        *   **React Component (UI Hub View):** Lớp trình diễn hiển thị giao diện phía Client (Next.js). Tầng này nhận DTO an toàn dưới dạng JSON mà không hề tiếp xúc trực tiếp hay biết về cấu trúc thực tế của cơ sở dữ liệu.

    *   **3.4.2.6. Các thành phần bổ trợ (Cross-cutting Concerns)**
        Ngoài cấu trúc phân tầng chính, hệ thống còn triển khai các thành phần dùng chung nhằm đảm bảo tính nhất quán:
        *   **Xử lý ngoại lệ tập trung (Global Exception Handling):** Sử dụng `@RestControllerAdvice` để bắt các ngoại lệ từ mọi tầng và trả về định dạng lỗi chuẩn cho frontend.
        *   **Cấu hình Bảo mật (Security Config):** Quản lý xác thực JWT và phân quyền truy cập endpoint qua Spring Security.
        *   **Common Utilities:** Các lớp Enum, BaseEntity, và ApiResponse dùng chung cho toàn bộ module.

    *   **3.4.2.7. Ưu điểm của kiến trúc**
        Việc áp dụng kiến trúc phân tầng trong hệ thống DailyEng mang lại nhiều lợi ích quan trọng trong quá trình phát triển, vận hành và mở rộng hệ thống: 
        *   **Tính Module hóa (Modularity):** Mỗi chức năng (vocabulary, auth, speaking) được đóng gói trong package riêng với đầy đủ các tầng, giúp việc quản lý code dễ dàng hơn.
        *   **Khả năng Bảo trì (Maintainability):** Khi cần thay đổi logic nghiệp vụ, chỉ cần tác động vào tầng Service mà không ảnh hưởng đến Controller hay Database.
        *   **Tính Kiểm thử (Testability):** Có thể viết Unit Test cho tầng Service bằng cách mock các Repository, hoặc Integration Test cho Controller.
        *   **Hiệu năng:** Kết hợp Cache ở tầng Service giúp hệ thống phản hồi nhanh hơn đáng kể đối với các yêu cầu lặp lại.

**3.5. Thiết kế hướng đối tượng và Design Pattern:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Phân tích tư duy OOP và các mẫu thiết kế linh hoạt được áp dụng.*

*   **3.5.1. Thiết kế cấu trúc hướng đối tượng**
    Hệ thống DailyEng được xây dựng và phát triển dựa trên nền tảng Java 21 ở Backend (Spring Boot) và TypeScript ở Frontend (Next.js). Dự án tận dụng triệt để 4 tính chất cơ bản của lập trình hướng đối tượng (OOP) bao gồm đóng gói, kế thừa, đa hình và trừu tượng hóa để thiết lập một cấu trúc mã nguồn chặt chẽ, mạch lạc, dễ bảo trì và dễ mở rộng.

    *   **3.5.1.1. Tính Đóng gói (Encapsulation)**
        Mọi thực thể (Entity) và đối tượng truyền tải dữ liệu (DTO) trong hệ thống đều tuân thủ nghiêm ngặt tính đóng gói. Tất cả các thuộc tính dữ liệu được khai báo với phạm vi truy cập `private` nhằm ngăn chặn sự can thiệp và sửa đổi trực tiếp từ bên ngoài. Quyền đọc và ghi dữ liệu chỉ được cung cấp thông qua các phương thức Getter/Setter tương ứng. Hệ thống sử dụng thư viện Lombok (`@Getter`, `@Setter`) để tự động hóa các phương thức này, giúp giảm lượng mã nguồn trùng lặp (boilerplate code) và tăng khả năng đọc hiểu.

        *Ví dụ thực tế:* Trong thực thể kịch bản luyện nói `SpeakingScenario.java`, các thuộc tính như `title`, `description`, `context`, `difficulty` đều được đóng gói kỹ lưỡng và chỉ có thể truy xuất thông qua các getter/setter an toàn.

        ```java
        // File: backend/src/main/java/com/dailyeng/speaking/SpeakingScenario.java
        package com.dailyeng.speaking;

        import com.dailyeng.common.entity.BaseEntity;
        import com.dailyeng.common.enums.Level;
        import jakarta.persistence.*;
        import lombok.*;

        @Entity
        @Table(name = "\"SpeakingScenario\"")
        @Getter @Setter @NoArgsConstructor @AllArgsConstructor
        public class SpeakingScenario extends BaseEntity {
            
            @Column(nullable = false)
            private String title;

            @Column(nullable = false, columnDefinition = "TEXT")
            private String description;

            @Column(nullable = false, columnDefinition = "TEXT")
            private String goal;

            @Enumerated(EnumType.STRING)
            @Column(columnDefinition = "\"Level\"")
            private Level difficulty;

            @Column(nullable = false, columnDefinition = "TEXT")
            private String context;

            private String userRole;
            private String botRole;
            private String openingLine;
            private boolean isCustom;
        }
        ```

    *   **3.5.1.2. Tính Kế thừa (Inheritance)**
        Kiến trúc hệ thống sử dụng cơ chế kế thừa để tái sử dụng mã nguồn, đồng bộ hóa các trường thông tin dùng chung và tổ chức các tầng xử lý một cách khoa học:
        *   **BaseEntity:** Lớp trừu tượng cha (`@MappedSuperclass`) định nghĩa các trường dữ liệu dùng chung cho toàn bộ các JPA Entity bao gồm `id` (sử dụng định danh CUID để tăng tính bảo mật), `createdAt`, và `updatedAt`. Các thực thể cụ thể như `SpeakingScenario`, `SpeakingSession`, `SpeakingTurn`, và `SpeakingBookmark` đều kế thừa từ `BaseEntity` để tự động sở hữu các thuộc tính này mà không cần khai báo lại.
        *   **BaseController:** Cung cấp các phương thức dùng chung cho các lớp Controller ở tầng API, chẳng hạn như trích xuất và xác thực thông tin tài khoản người dùng từ JWT Token trong Security Context.

        Sơ đồ dưới đây biểu diễn mối quan hệ kế thừa và quan hệ cấu thành giữa các thực thể chính trong phân hệ luyện nói (Speaking Module):

        ```mermaid
        classDiagram
            class BaseEntity {
                <<abstract>>
                +String id
                +prePersist()
                +equals(Object o) boolean
                +hashCode() int
            }

            class SpeakingScenario {
                +String title
                +String description
                +String goal
                +Level difficulty
                +String context
                +String userRole
                +String botRole
                +String openingLine
                +boolean isCustom
                +List~SpeakingSession~ sessions
            }

            class SpeakingSession {
                +String userId
                +String scenarioId
                +Integer overallScore
                +Integer grammarScore
                +Integer fluencyScore
                +Integer accuracyScore
                +String feedbackSummary
                +List~SpeakingTurn~ turns
            }

            class SpeakingTurn {
                +String sessionId
                +Role role
                +String text
                +String audioUrl
                +Integer accuracyScore
                +Integer fluencyScore
                +Object wordAssessmentsJson
                +List~SpeakingTurnError~ errors
            }

            class SpeakingTurnError {
                +String turnId
                +String errorType
                +String word
                +String suggestion
            }

            class SpeakingBookmark {
                +String userId
                +String scenarioId
            }

            BaseEntity <|-- SpeakingScenario
            BaseEntity <|-- SpeakingSession
            BaseEntity <|-- SpeakingTurn
            BaseEntity <|-- SpeakingTurnError
            BaseEntity <|-- SpeakingBookmark

            SpeakingScenario "1" --> "*" SpeakingSession : has
            SpeakingScenario "1" --> "*" SpeakingBookmark : bookmarked by
            SpeakingSession "1" --> "*" SpeakingTurn : contains
            SpeakingTurn "1" --> "*" SpeakingTurnError : has
        ```
        *Hình 3.6. Sơ đồ quan hệ kế thừa các thực thể trong phân hệ luyện nói (Speaking Module).*

    *   **3.5.1.3. Tính Đa hình (Polymorphism)**
        Tính đa hình được thể hiện rõ nét nhất ở tầng truy xuất dữ liệu (Repository Layer). Các Repository kế thừa từ các interface có sẵn của Spring Data JPA như `JpaRepository` và `JpaSpecificationExecutor`. Nhờ đó, mỗi Repository có thể thực hiện đa hình các thao tác CRUD cơ bản trên các thực thể tương ứng mà không cần viết code triển khai thực tế. Đồng thời, các Repository có thể định nghĩa thêm các phương thức truy vấn đặc thù để xử lý các nghiệp vụ nâng cao.

        *Ví dụ thực tế:* Trong lớp `SpeakingScenarioRepository.java`, interface này kế thừa từ `JpaRepository<SpeakingScenario, String>` và `JpaSpecificationExecutor<SpeakingScenario>`. Nhờ vậy, repository có thể sử dụng các phương thức chung như `findAll()`, `findById()`, `save()`, đồng thời bổ sung các phương thức riêng biệt với các truy vấn tùy biến động (Dynamic Specification) và câu lệnh JPQL chuyên biệt:

        ```java
        // File: backend/src/main/java/com/dailyeng/speaking/SpeakingScenarioRepository.java
        package com.dailyeng.speaking;

        import com.dailyeng.common.enums.Level;
        import org.springframework.data.domain.Page;
        import org.springframework.data.domain.Pageable;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
        import org.springframework.data.jpa.repository.Query;
        import org.springframework.data.repository.query.Param;
        import java.util.List;

        public interface SpeakingScenarioRepository extends JpaRepository<SpeakingScenario, String>,
               JpaSpecificationExecutor<SpeakingScenario> {

           List<SpeakingScenario> findByLanguageAndTopicGroupId(String language, String topicGroupId);
           Page<SpeakingScenario> findByLanguageAndIsCustomFalse(String language, Pageable pageable);
           Page<SpeakingScenario> findByLanguageAndDifficulty(String language, Level difficulty, Pageable pageable);
           List<SpeakingScenario> findByCreatedByIdAndIsCustomTrue(String userId);

           @Query("SELECT s FROM SpeakingScenario s WHERE s.language = :language AND s.topicGroupId IS NOT NULL " +
                   "AND (LOWER(s.title) LIKE LOWER(CONCAT('%', :q, '%')) " +
                   "OR LOWER(s.description) LIKE LOWER(CONCAT('%', :q, '%')))")
           List<SpeakingScenario> searchByTitleOrDescription(@Param("language") String language, @Param("q") String q, Pageable pageable);
        }
        ```
        Trong cấu trúc trên, `SpeakingScenarioRepository` vừa kế thừa các hành vi đa hình của các Spring Data Repositories để thao tác với cơ sở dữ liệu, vừa cung cấp các phương thức truy vấn riêng cho thực thể `SpeakingScenario`. Sự đa hình này giúp giảm thiểu đáng kể số lượng code thừa, giúp hệ thống hoạt động vô cùng linh hoạt và dễ mở rộng.

    *   **3.5.1.4. Thiết kế quan hệ giữa các đối tượng (Object Relationships)**
        Hệ thống thiết lập các mối quan hệ chặt chẽ giữa các đối tượng thực thể để phản ánh chính xác quy trình nghiệp vụ:
        *   **One-to-Many (Một - Nhiều):** Một kịch bản luyện tập (`SpeakingScenario`) có thể có nhiều phiên luyện tập (`SpeakingSession`) tương ứng với nhiều lượt thực hiện của người dùng.
        *   **Many-to-One (Nhiều - Một):** Nhiều phiên luyện tập (`SpeakingSession`) thuộc về một thực thể người dùng (`User`) duy nhất. Nhiều lượt thoại (`SpeakingTurn`) thuộc về một phiên luyện tập (`SpeakingSession`).

*   **3.5.2. Áp dụng Design Pattern**
    Hệ thống DailyEng áp dụng nhiều mẫu thiết kế (Design Pattern) tiêu chuẩn từ tầng Frontend, BFF (Backend for Frontend) cho đến Backend để tối ưu cấu trúc phần mềm, giảm thiểu sự phụ thuộc lẫn nhau (loose coupling) và nâng cao khả năng bảo trì.

    Sơ đồ dưới đây tổng hợp các Design Pattern được áp dụng xuyên suốt hệ thống:

    ```mermaid
    flowchart LR
        subgraph Frontend ["Frontend"]
            direction LR
            Hooks["Custom Hooks"]
            Comp["React Components"]
            Provider["Provider Pattern"]
            
            Hooks --> Comp
            Comp --> Provider
        end

        subgraph BFF ["BFF Layer"]
            SA["Server Actions Facade"]
        end

        subgraph Backend ["Backend"]
            direction LR
            Controller["Controller"]
            Service["Service Layer"]
            Repo["Repository Pattern"]
            Entity["Entity Model"]
            
            Controller --> Service
            Service --> Repo
            Repo --> Entity
        end

        Comp -.-> SA
        SA -.-> Controller

        %% Styling for Subgraphs Containers
        style Frontend fill:#f0f7ff,stroke:#3b82f6,stroke-width:2px,color:#1e3a8a
        style BFF fill:#faf5ff,stroke:#a855f7,stroke-width:2px,color:#581c87
        style Backend fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#14532d

        %% Styling for Nodes inside Frontend
        style Hooks fill:#ffffff,stroke:#3b82f6,stroke-width:1px,color:#1e3a8a
        style Comp fill:#ffffff,stroke:#3b82f6,stroke-width:1px,color:#1e3a8a
        style Provider fill:#ffffff,stroke:#3b82f6,stroke-width:1px,color:#1e3a8a

        %% Styling for Nodes inside BFF
        style SA fill:#ffffff,stroke:#a855f7,stroke-width:1px,color:#581c87

        %% Styling for Nodes inside Backend
        style Controller fill:#ffffff,stroke:#22c55e,stroke-width:1px,color:#14532d
        style Service fill:#ffffff,stroke:#22c55e,stroke-width:1px,color:#14532d
        style Repo fill:#ffffff,stroke:#22c55e,stroke-width:1px,color:#14532d
        style Entity fill:#ffffff,stroke:#22c55e,stroke-width:1px,color:#14532d
    ```
    *Hình 3.7. Sơ đồ tổng hợp các Design Pattern được áp dụng trong hệ thống DailyEng.*

    *   **3.5.2.1. Mô hình MVC (Model-View-Controller)**
        Là mẫu thiết kế chủ đạo điều hướng dữ liệu của hệ thống, giúp phân tách độc lập các luồng xử lý:
        *   **Model:** Là các JPA Entity đại diện cho thực thể dữ liệu dưới database như `Account`, `Topic`, `SpeakingScenario`.
        *   **View:** Là các React Component ở Frontend Next.js chịu trách nhiệm hiển thị giao diện và nhận tương tác từ học viên.
        *   **Controller:** Là các `@RestController` trong Spring Boot làm nhiệm vụ đón tiếp các HTTP request, kiểm tra định dạng và điều hướng xử lý.
        Mô hình MVC giúp mã nguồn rõ ràng, tránh việc lồng ghép logic hiển thị giao diện vào logic nghiệp vụ và dữ liệu.

    *   **3.5.2.2. Repository Pattern**
        Repository Pattern được sử dụng để tách biệt hoàn toàn logic truy xuất dữ liệu khỏi logic nghiệp vụ của hệ thống. Thay vì để các lớp Service làm việc và kết nối trực tiếp với cơ sở dữ liệu vật lý, hệ thống sử dụng các Repository làm lớp trung gian (Abstraction Layer). Tầng Service chỉ cần tương tác với các phương thức của Repository, giúp mã nguồn gọn gàng, tăng tính an toàn dữ liệu và dễ dàng mock dữ liệu khi viết Unit Test.

    *   **3.5.2.3. Service Layer Pattern**
        Hệ thống gom toàn bộ logic nghiệp vụ (business logic) vào tầng Service chuyên biệt. Lớp Service là trung gian kết nối giữa Controller và Repository, giúp gánh vác toàn bộ các tác vụ xử lý phức tạp của hệ thống bao gồm: điều phối bài học từ vựng, tính toán tiến độ học tập, lưu lịch sử hội thoại, và gửi dữ liệu giọng nói đến AI để chấm điểm. Điều này giúp Controller cực kỳ mỏng (thin controller), chỉ làm nhiệm vụ tiếp nhận và phản hồi dữ liệu.

    *   **3.5.2.4. DTO Pattern (Data Transfer Object)**
        DTO Pattern được áp dụng để chuẩn hóa cấu trúc dữ liệu truyền tải qua mạng giữa Frontend và Backend. Thay vì trả trực tiếp thực thể Database (Entity) ra API, hệ thống định nghĩa các lớp DTO như `SpeakingDtos`, `VocabDtos` để truyền nhận dữ liệu qua API. Điều này đem lại nhiều lợi ích thiết thực:
        *   *Bảo mật dữ liệu:* Che giấu hoàn toàn các trường dữ liệu nhạy cảm hoặc không cần thiết của Entity (như password, trường auditing hệ thống).
        *   *Tối ưu hóa hiệu năng:* Giảm kích thước gói tin JSON truyền tải bằng cách chỉ gửi đúng các trường dữ liệu mà Frontend yêu cầu.
        *   *Ổn định API:* Khi cơ sở dữ liệu thay đổi cấu trúc bảng, API vẫn giữ nguyên cấu trúc DTO cũ để đảm bảo Frontend không bị lỗi.

    *   **3.5.2.5. Facade Pattern (Server Action Layer)**
        Trong kiến trúc Next.js của DailyEng, Server Actions đóng vai trò như một lớp **Facade**. Mẫu thiết kế này cung cấp một giao diện đơn giản và thống nhất để React Components ở Client gọi đến các nghiệp vụ phức tạp ở Backend Spring Boot mà không cần biết các chi tiết kỹ thuật phức tạp bên dưới (như cách đính kèm Header Authorization JWT Token, xử lý Http Status, hay quản lý Exception). Component chỉ cần gọi một Server Action duy nhất, làm cho mã nguồn giao diện gọn gàng và dễ bảo trì hơn rất nhiều.

    *   **3.5.2.6. Provider Pattern (React Context & Zustand)**
        Ở phía Frontend, hệ thống sử dụng Provider Pattern để quản lý các trạng thái toàn cục (Global State). Những thông tin dùng chung ở nhiều nơi trong hệ thống như thông tin đăng nhập học viên (`AuthContext`) hoặc hồ sơ người dùng (`UserProfileContext`) được đưa vào các Context Provider bao bọc bên ngoài. Các component bên trong có thể dễ dàng truy cập và đăng ký lắng nghe sự thay đổi của các trạng thái này mà không cần truyền biến lồng nhau qua nhiều tầng component (prop drilling).

    *   **3.5.2.7. Custom Hook Pattern**
        Custom Hook Pattern được áp dụng ở Frontend Next.js để tách biệt hoàn toàn phần logic xử lý tương tác ra khỏi giao diện hiển thị của React Component. Các tác vụ như: gọi API, xử lý độ trễ tìm kiếm (debounce), quản lý trạng thái tải (`isLoading`) hay bắt lỗi được đóng gói trong các custom hook dùng chung như `useSearch.ts`. Nhờ vậy, phần view hiển thị của React Component cực kỳ tinh gọn, dễ đọc, và có thể tái sử dụng logic xử lý này ở nhiều màn hình khác nhau một cách dễ dàng.

**3.6. Thiết kế API Protocol và giao thức giao tiếp:**

*   **3.6.1. Tổng quan kiến trúc giao tiếp**
    Hệ thống DailyEng áp dụng mô hình kiến trúc giao tiếp đa tầng, kết hợp giữa tính linh hoạt của kết xuất dữ liệu phía máy chủ để tối ưu tốc độ tải trang ban đầu cùng hiệu năng tương tác trực tiếp phía trình duyệt. Toàn bộ luồng giao tiếp được thiết kế dựa trên các chuẩn công nghiệp nhằm đảm bảo tính nhất quán và bảo mật tuyệt đối.
    
    Kiến trúc giao tiếp gồm ba thành phần chính:
    *   **Client - Giao diện người dùng**: Sử dụng React chạy trên Next.js nhằm thực hiện các yêu cầu lấy dữ liệu dạng Fetch và thay đổi dữ liệu dạng Mutation.
    *   **BFF - Backend-For-Frontend**: Đóng vai trò lớp trung gian kiểu Proxy hoặc Facade, xử lý việc xác thực tập trung, quản lý session và tối ưu hóa dữ liệu trước khi chuyển tiếp.
    *   **Backend API - Spring Boot**: Hệ thống dịch vụ lõi cung cấp các tài nguyên thông qua giao thức RESTful.
    
    Mô hình giao tiếp đa tầng điển hình khi người học gửi yêu cầu lấy danh sách chủ đề từ vựng được trình bày chi tiết trong **Sơ đồ tuần tự xử lý yêu cầu lấy danh sách chủ đề từ vựng tại Hình 3.4** ở mục **3.4.2.1**. Sơ đồ này mô tả chi tiết cách thức một request đi từ trình duyệt của người dùng qua lớp trung gian BFF, vượt qua bộ lọc Spring Security để đi vào các tầng Controller, Service, Repository và tương tác với cơ sở dữ liệu PostgreSQL trước khi trả về kết quả đã chuẩn hóa cho giao diện.

*   **3.6.2. Thiết kế RESTful API chuẩn hóa**
    Hệ thống tuân thủ các nguyên tắc thiết kế REST, đảm bảo các tài nguyên được định danh rõ ràng thông qua URL và thao tác thông qua các phương thức HTTP chuẩn.
    
    ##### Các phương thức HTTP
    Hệ thống sử dụng các phương thức tương ứng với các hành động nghiệp vụ:
    *   **GET**: Truy xuất thông tin như danh sách bài học, kịch bản luyện nói, hồ sơ người học.
    *   **POST**: Tạo mới tài nguyên hoặc thực hiện các hành động phức tạp như bắt đầu phiên học, tạo kịch bản tùy chỉnh, đăng nhập.
    *   **PUT**: Cập nhật toàn bộ tài nguyên như lộ trình học tập, thông tin cá nhân.
    *   **PATCH**: Cập nhật một phần tài nguyên như đánh dấu thông báo đã đọc, cập nhật mức độ thông thạo từ vựng.
    *   **DELETE**: Loại bỏ tài nguyên như xóa sổ tay, xóa lịch sử luyện tập.
    
    ##### Mã trạng thái phản hồi (HTTP Status Codes)
    Backend trả về các mã trạng thái chuẩn để Client có thể xử lý logic giao diện phù hợp:
    *   **200 OK**: Yêu cầu thành công.
    *   **201 Created**: Tạo mới tài nguyên thành công.
    *   **400 Bad Request**: Dữ liệu đầu vào không hợp lệ, thường đi kèm danh sách lỗi trường dữ liệu chi tiết.
    *   **401 Unauthorized**: Người dùng chưa đăng nhập hoặc thẻ xác thực hết hạn.
    *   **403 Forbidden**: Người dùng không có quyền truy cập vào tài nguyên yêu cầu.
    *   **404 Not Found**: Không tìm thấy tài nguyên, ví dụ như mã định danh bài học không tồn tại.
    *   **500 Internal Server Error**: Lỗi phát sinh từ phía máy chủ.

*   **3.6.3. Giao thức xác thực và bảo mật dữ liệu**
    Hệ thống triển khai cơ chế xác thực dựa trên JSON Web Token không trạng thái để tối ưu hóa khả năng mở rộng ngang của máy chủ.
    
    ##### Cơ chế JWT Flow
    *   **Bước 1**: Người dùng gửi thông tin đăng nhập đến đường dẫn `/api/auth/login`.
    *   **Bước 2**: Backend xác thực thông tin và tạo bộ đôi access_token cùng refresh_token.
    *   **Bước 3**: Token được lưu trữ trực tiếp trong HTTP-only Cookie tại trình duyệt nhằm ngăn chặn triệt để các cuộc tấn công đánh cắp mã phiên qua mã độc chạy trên trình duyệt.
    *   **Bước 4**: Trình duyệt sẽ tự động đính kèm cookie chứa mã định danh này trong mọi yêu cầu truyền tải lên máy chủ thông qua cấu hình liên kết của API Client. Đối với các ứng dụng di động hoặc các đối tác tích hợp hệ thống bên ngoài trình duyệt, mã định danh này sẽ được truyền tải qua tiêu đề Authorization Bearer tiêu chuẩn.
    
    ##### Cơ chế làm mới Token Silent Refresh
    Để duy trì trải nghiệm liền mạch, hệ thống triển khai cơ chế tự động làm mới token khi access_token hết hạn thông qua endpoint `/api/auth/refresh`.
    
    Hình sau mô tả luồng xác thực JWT hoàn chỉnh và cách hệ thống lấy danh sách kịch bản luyện nói sau khi xác thực thành công:

    ```mermaid
    %%{init: { "themeVariables": { "actorFontSize": "17px", "messageFontSize": "15px" } } }%%
    sequenceDiagram
        autonumber
        participant Client as Trình duyệt Client
        participant BFF as BFF - Next.js
        participant BE as Backend API - Spring Boot
        participant DB as Cơ sở dữ liệu

        Client->>BFF: Yêu cầu đăng nhập bằng email và mật khẩu
        BFF->>BE: POST /api/auth/login
        BE->>DB: Truy vấn thông tin tài khoản để đối chiếu
        DB-->>BE: Trả về kết quả hợp lệ
        BE-->>BFF: Trả về khóa JWT Token
        BFF-->>Client: Lưu khóa token vào HTTP-only Cookie

        Client->>BFF: Yêu cầu lấy danh sách kịch bản luyện nói
        BFF->>BE: GET /api/speaking/scenarios với Header Bearer JWT
        BE->>BE: Thực hiện xác thực và kiểm tra token
        BE-->>BFF: Trả về danh sách kịch bản dạng JSON
        BFF-->>Client: Hiển thị giao diện bài học cho học viên
    ```
    *Hình 3.8. Luồng xác thực JWT và lấy danh sách kịch bản luyện nói trong DailyEng.*

*   **3.6.4. Giao thức Truyền tải Dữ liệu thời gian thực Server-Sent Events**
    Đối với tính năng hội thoại trí tuệ nhân tạo cùng trợ lý Dorara, hệ thống không sử dụng giao thức REST truyền thống vốn yêu cầu phản hồi toàn bộ một lần mà sử dụng Server-Sent Events.
    
    Lý do lựa chọn giải pháp này bao gồm:
    *   **Hiệu ứng gõ chữ**: Hiển thị văn bản ngay khi mô hình ngôn ngữ vừa sinh ra kết quả mà không cần đợi hoàn thành toàn bộ câu trả lời dài.
    *   **Hiệu năng**: Kết nối một chiều nhẹ hơn so với WebSocket và đặc biệt phù hợp với luồng dữ liệu liên tục từ các mô hình trí tuệ nhân tạo.
    
    ##### Quá trình tối ưu hóa giao thức truyền tải
    Trong quá trình phát triển, hệ thống đã tiến hóa qua hai phiên bản giao thức để đạt được hiệu năng tối ưu nhất:
    
    *   **Phiên bản ban đầu sử dụng cấu trúc JSON**:
        Ban đầu, hệ thống đóng gói từng mảnh từ vựng vào một đối tượng JSON nhằm quản lý trạng thái truyền tải:
        ```http
        event: message
        data: {"chunk": "Hello", "status": "streaming"}
        
        event: message
        data: {"chunk": " there!", "status": "streaming"}
        
        event: done
        data: [DONE]
        ```
        Tuy nhiên, cách tiếp cận này gặp phải hạn chế lớn khi gói tin bị phân mảnh trên đường truyền, dẫn đến việc trình duyệt không thể phân tích cú pháp chuỗi JSON chưa hoàn chỉnh và gây ra lỗi hệ thống. Đồng thời việc đóng gói liên tục cũng tạo ra lượng dữ liệu dư thừa không đáng có.
        
    *   **Phiên bản tối ưu hiện tại sử dụng chuỗi ký tự thô**:
        Để giải quyết triệt để vấn đề trên và tối ưu hóa tốc độ phản hồi, hệ thống đã lược bỏ hoàn toàn lớp bọc JSON phức tạp. Trợ lý trí tuệ nhân tạo sẽ truyền tải từng mảnh văn bản thô trực tiếp qua đường ống dẫn dữ liệu và báo kết thúc bằng một thông điệp chuẩn hóa:
        ```http
        data: Hello
        
        data:  there!
        
        data: [DONE]
        ```
        Sự cải tiến này giúp tăng tốc độ hiển thị giao diện, loại bỏ hoàn toàn lỗi phân tích cú pháp JSON ở trình duyệt của học viên và tiết kiệm tối đa băng thông đường truyền.


*   **3.6.5. Cấu trúc Đối tượng Truyền tải dữ liệu DTO Pattern**
    Để đảm bảo tính trừu tượng và bảo mật, hệ thống tuyệt đối không trả về các thực thể cơ sở dữ liệu trực tiếp. Thay vào đó, dữ liệu được đóng gói vào các lớp DTO.
    
    ##### Minh chứng kỹ thuật Backend Record DTO:
    ```java
    // backend/src/main/java/com/dailyeng/common/exception/GlobalExceptionHandler.java
    public record ErrorResponse(
            boolean success,
            String error,
            int status,
            Instant timestamp
    ) {}
    ```
    
    ##### Minh chứng kỹ thuật Frontend Type:
    ```typescript
    // src/actions/speaking.ts
    export interface ScenarioListResponse {
      scenarios: ScenarioListItem[];
      total: number;
      totalPages: number;
      currentPage: number;
    }
    ```

*   **3.6.6. Cơ chế Xử lý lỗi và Exception Handling**
    Hệ thống triển khai cơ chế xử lý lỗi tập trung thông qua `@RestControllerAdvice` tại Backend, đảm bảo mọi lỗi đều được trả về dưới định dạng JSON đồng nhất, giúp Client dễ dàng bóc tách thông tin.
    
    ##### Các loại lỗi chính:
    *   **Validation Error với mã lỗi 400**: Trả về danh sách các trường bị lỗi dữ liệu như email sai định dạng.
    *   **Authentication Error với mã lỗi 401**: Yêu cầu người dùng thực hiện đăng nhập lại.
    *   **External Service Error với mã lỗi 503**: Thông báo khi các dịch vụ trí tuệ nhân tạo ngoại vi tạm thời không phản hồi.

*   **3.6.7. Bảng tổng hợp các API Endpoints hệ thống**
    Hệ thống được module hóa thành các bộ điều khiển chuyên biệt nhằm xử lý các nghiệp vụ riêng biệt. Dưới đây là bảng liệt kê toàn diện các đường dẫn chính dựa trên cấu trúc mã nguồn thực tế:

    | Module | Đường dẫn chính | Endpoint tiêu biểu | Chức năng chính |
    | :--- | :--- | :--- | :--- |
    | **Auth** | `/auth` | `/login`, `/register`, `/refresh`, `/me` | Quản lý định danh và phiên làm việc thông qua mã xác thực bảo mật (httpOnly cookie). |
    | **User Profile** | `/users` | `/me` (GET/PUT) | Quản lý thông tin hồ sơ cá nhân và cập nhật thông tin người học. |
    | **Speaking** | `/speaking` | `/scenarios`, `/sessions`, `/history` | Xử lý danh sách kịch bản luyện nói và các phiên hội thoại học tập. |
    | **Speech Engine** | `/speaking/speech` | `/transcribe`, `/transcribe-assess`, `/pronunciation`, `/synthesize`, `/voices` | Nhận diện giọng nói, đánh giá phát âm (scripted/unscripted) và chuyển văn bản thành giọng nói mẫu. |
    | **Vocabulary** | `/vocab` | `/topic-groups`, `/topics` | Cung cấp kho từ vựng và theo dõi tiến độ học tập của người dùng. |
    | **Grammar** | `/grammar` | `/topic-groups`, `/topics`, `/current` | Cung cấp hệ thống bài học ngữ pháp phân cấp theo trình độ học viên. |
    | **Spaced Repetition** | `/srs` | `/due`, `/review`, `/stats`, `/optimize` | Hệ thống ôn tập từ vựng ngắt quãng dựa trên thuật toán FSRS và tự động huấn luyện trọng số học tập cá nhân hóa. |
    | **Notebook** | `/notebooks` | `/` (GET/POST), `/{id}/items`, `/items/{itemId}/mastery` | Quản lý sổ tay từ vựng cá nhân, danh sách từ vựng và mức độ thuộc từ của học viên. |
    | **Bookmarks** | `/bookmarks` | `/vocab/toggle`, `/grammar/toggle` | Đánh dấu các chủ đề từ vựng hoặc bài học ngữ pháp yêu thích. |
    | **Dictionary** | `/dictionary` | `/words/search`, `/grammar/search` | Tra cứu nhanh từ vựng và cấu trúc ngữ pháp hỗ trợ cho tính năng ghi chú nhanh. |
    | **Study Plan** | `/study` | `/plan`, `/tasks/today`, `/plan/goal` | Lập lịch học tập và theo dõi lộ trình rèn luyện hàng ngày. |
    | **XP và Leaderboard** | `/xp` | `/stats`, `/history`, `/leaderboard` | Quản lý điểm tích lũy học tập và hệ thống bảng xếp hạng thi đua tuần hoặc tháng. |
    | **Placement Test** | `/placement-test` | `/questions`, `/submit`, `/results` | Kiểm tra trình độ đầu vào để tự động đề xuất lộ trình phù hợp. |
    | **Notification** | `/notifications` | `/` (GET), `/unread-count`, `/read-all`, `/read-batch` | Quản lý hệ thống thông báo người dùng và đánh dấu trạng thái đã đọc. |
    | **Dorara AI** | `/dorara` | `/chat`, `/enrich` | Giao tiếp với trợ lý trí tuệ nhân tạo qua luồng dữ liệu thời gian thực (SSE) và phân tích từ vựng nâng cao sau hội thoại. |
    | **SmartLens** | `/smartlens` | `/analyze` | Nhận diện văn bản từ hình ảnh (OCR) sử dụng trí tuệ nhân tạo. |
    | **Translate** | `/translate` | POST `/` | Dịch thuật văn bản song ngữ đa ngôn ngữ qua điện toán đám mây. |
    | **Site Content** | `/site-content` | `/`, `/{key}` (GET) | Cung cấp nội dung tĩnh và cấu hình động của hệ thống (FAQ, reviews, stats). |
    | **Health Check** | `/health` | `/` (GET) | Kiểm tra trạng thái hoạt động của hệ thống (Health Check) và giữ ấm kết nối cơ sở dữ liệu. | 

**3.7. Đặc tả Server Actions và tích hợp dịch vụ bên thứ ba:** 
> [!NOTE]
> *Nguồn: src/actions/ | Trọng tâm: Đặc tả chi tiết các hàm xử lý phía Frontend Next.js Server Actions (hoặc API client wrappers) và tích hợp các dịch vụ ngoại vi.*

*   **3.7.1. Danh sách Server Action & API Wrapper**
    Các hàm xử lý được phân chia thành các nhóm chức năng chính. Toàn bộ các đối tượng truyền tải dữ liệu (DTO) được định nghĩa bằng TypeScript Interfaces, đảm bảo đồng bộ với cấu trúc dữ liệu của Backend Java.

    ##### 3.7.1.1. Xác thực (`src/actions/auth.ts`)
    | STT | Tên Server Action | Mô tả chức năng | Đầu vào | Đầu ra |
    | :--- | :--- | :--- | :--- | :--- |
    | 1 | `registerUser` | Đăng ký người dùng mới với email và mật khẩu | `name: string, email: string, password: string` | `Promise<AuthResult>` |
    | 2 | `signInWithCredentials` | Đăng nhập bằng email/mật khẩu | `email: string, password: string` | `Promise<AuthResult>` |
    | 3 | `signInWithGoogle` | Đăng nhập bằng Google OAuth thông qua ID Token | `idToken: string` | `Promise<AuthResult>` |
    | 4 | `signOutUser` | Đăng xuất người dùng hiện tại, xóa các cookie | Không | `Promise<void>` |
    | 5 | `requestPasswordReset` | Gửi email yêu cầu đặt lại mật khẩu | `email: string` | `Promise<AuthResult>` |
    | 6 | `resetPassword` | Đặt lại mật khẩu bằng token từ email | `token: string, newPassword: string` | `Promise<AuthResult>` |
    | 7 | `changePassword` | Thay đổi mật khẩu cho người dùng đã đăng nhập | `currentPassword: string, newPassword: string` | `Promise<AuthResult>` |

    ##### 3.7.1.2. Quản lý người dùng (`src/actions/user.ts`)
    | STT | Tên Server Action | Mô tả chức năng | Đầu vào | Đầu ra |
    | :--- | :--- | :--- | :--- | :--- |
    | 1 | `getUserProfile` | Lấy thông tin profile người dùng hiện tại từ token cookie | Không | `Promise<{user: UserProfile \| null, isGoogleUser: boolean, error?: string}>` |
    | 2 | `updateUserProfile` | Cập nhật thông tin profile người dùng | `data: UserProfileUpdateData` | `Promise<{success: boolean, error?: string}>` |

    ##### 3.7.1.3. Speaking (`src/actions/speaking.ts`)
    | STT | Tên Server Action | Mô tả chức năng | Đầu vào | Đầu ra |
    | :--- | :--- | :--- | :--- | :--- |
    | 1 | `getSpeakingTopicGroups` | Lấy nhóm chủ đề cho Speaking Hub (cached) | Không | `Promise<TopicGroup[]>` |
    | 2 | `getSpeakingScenariosWithProgress` | Lấy kịch bản luyện nói kèm tiến độ người học | `_userId?: string, options?: FilterOptions` | `Promise<ScenarioListResponse>` |
    | 3 | `searchSpeakingScenarios` | Tìm kiếm kịch bản luyện nói theo từ khóa | `query: string, _userId?: string` | `Promise<ScenarioListItem[]>` |
    | 4 | `getScenarioById` | Lấy chi tiết kịch bản theo ID | `id: string` | `Promise<ScenarioDetail \| null>` |
    | 5 | `createCustomScenario` | Tạo kịch bản tùy chỉnh do AI sinh từ prompt | `_userId: string, topicPrompt: string` | `Promise<CustomScenarioResponse>` |
    | 6 | `createRandomScenario` | Tạo kịch bản ngẫu nhiên (nút Surprise Me) | `_userId: string` | `Promise<CustomScenarioResponse>` |
    | 7 | `createFreeTalkScenario` | Tạo kịch bản luyện nói tự do | `_userId: string` | `Promise<CustomScenarioResponse>` |
    | 8 | `deleteCustomScenario` | Xóa kịch bản tùy chỉnh của người dùng | `scenarioId: string` | `Promise<void>` |
    | 9 | `startSessionWithGreeting` / `createSession` | Khởi tạo phiên luyện nói mới kèm câu chào mở đầu | `_userId: string, scenarioId: string` | `Promise<SessionStartResponse>` |
    | 10 | `submitTurn` | Gửi câu thoại của người học và nhận câu phản hồi từ AI | `sessionId: string, userText: string, audioUrl?: string, speechMetrics?: SpeechMetrics` | `Promise<SubmitTurnResponse>` |
    | 11 | `getSessionHint` | Lấy gợi ý câu thoại tiếp theo kèm bản dịch tham khảo | `sessionId: string` | `Promise<SessionHintResponse>` |
    | 12 | `analyzeAndScoreSession` | Kết thúc phiên học, yêu cầu AI phân tích và chấm điểm | `sessionId: string` | `Promise<SessionAnalysisResponse>` |
    | 13 | `getSessionDetailsById` | Lấy chi tiết lịch sử một phiên hội thoại | `sessionId: string` | `Promise<SessionDetailResponse \| null>` |
    | 14 | `getUserSpeakingHistory` / `getSessionHistory` | Lấy t�        *Hình 3.9. Sơ đồ các giao diện trang chính Sitemap của ứng dụng DailyEng.*

        Sơ đồ Sitemap phản ánh cấu trúc điều hướng thực tế của DailyEng được khảo sát trực tiếp từ mã nguồn Next.js App Router. Người dùng bắt đầu tại trang Đăng nhập/Đăng ký ở đường dẫn /auth, sau khi xác thực JWT sẽ đến Dashboard là trung tâm điều hướng. Dashboard kết nối đến các module chính: Vocabulary Hub gồm danh sách chủ đề → chi tiết chủ đề bao gồm chế độ Learn Mode với Flashcard kết hợp Word List và chế độ Practice Mode → Daily Review FSRS; Grammar Hub gồm danh sách và chi tiết bài ngữ pháp; Speaking Room gồm danh sách kịch bản và phòng hội thoại AI; Notebook với sổ tay từ vựng và ôn tập Flashcard; Trang người dùng gồm các chức năng Profile, Bảng xếp hạng, Cài đặt và Thông báo; Study Plan/Build Plan lập kế hoạch học; và trang Translate tích hợp hai tab tính năng là Dịch văn bản Text Translate và Dịch hình ảnh SmartLens.

    *   3.8.1.2. Sơ đồ giao diện trang Speaking Room
    
        Khi người dùng truy cập vào phân hệ **Speaking Room**, hệ thống cung cấp 4 nhánh chức năng cốt lõi đáp ứng toàn diện các nhu cầu rèn luyện kỹ năng nói:
        *   **Topic Selection làm màn hình mặc định**: Hiển thị kho kịch bản luyện nói có sẵn phân theo nhiều lĩnh vực. Người dùng chọn kịch bản để bắt đầu phiên học với AI qua lệnh Start Session, gửi câu nói bằng giọng nói hoặc văn bản và nhận phản hồi tức thời từ trợ lý AI qua lệnh Submit Turn, rồi kết thúc hội thoại và nhận kết quả phân tích cùng chấm điểm chi tiết tại màn hình Feedback.
        *   **Custom Topic tạo chủ đề tùy chỉnh**: Cho phép người dùng tự nhập mô tả kịch bản nói dựa theo nhu cầu thực tế cá nhân để AI tự động sinh nội dung kịch bản và khởi tạo phòng hội thoại.
        *   **Bookmarks lưu trữ kịch bản yêu thích**: Nơi lưu giữ các kịch bản nói tiêu biểu giúp người dùng dễ dàng ôn tập và rèn luyện lại nhiều lần.
        *   **History ghi nhận lịch sử hội thoại**: Lưu trữ chi tiết tất cả các phiên hội thoại trước đó kèm theo điểm số phát âm để người dùng tự theo dõi tiến độ của bản thân.| Cập nhật mức độ thông thạo của từ vựng | `itemId: string, masteryLevel: number` | `Promise<{success: boolean, error?: string}>` |
    | 9 | `revalidateNotebookCache` | Xử lý revalidate cache sổ tay từ vựng (no-op) | Không | `Promise<void>` |
    | 10 | `searchDictionaryWords` | Tra cứu nhanh từ vựng trong từ điển hệ thống | `query: string, limit?: number` | `Promise<DictionaryWordResult[]>` |
    | 11 | `searchDictionaryGrammar` | Tra cứu cấu trúc ngữ pháp trong từ điển hệ thống | `query: string, limit?: number` | `Promise<DictionaryGrammarResult[]>` |

    ##### 3.7.1.7. Bookmark (`src/actions/bookmark.ts`)
    | STT | Tên Server Action | Mô tả chức năng | Đầu vào | Đầu ra |
    | :--- | :--- | :--- | :--- | :--- |
    | 1 | `toggleVocabBookmark` | Bật/tắt đánh dấu chủ đề từ vựng yêu thíc    *   3.8.1.3. Sơ đồ giao diện trang Vocabulary Hub
        Phân hệ **Vocabulary Hub** hỗ trợ người dùng tích lũy từ vựng một cách khoa học thông qua 4 nhánh giao diện:
        *   **Topic Selection làm màn hình mặc định**: Trang chính hiển thị danh sách các chủ đề từ vựng phân chia theo các nhóm lĩnh vực. Sau khi chọn chủ đề, người dùng tham gia vào luồng học tập thông qua 2 chế độ chính:
            *   *Learning Mode*: Chế độ học tập trực quan giúp xem danh sách từ đầy đủ Word List và ôn tập qua các thẻ Flashcards.
            *   *Practice Mode*: Chế độ luyện tập thực hành thông qua các bài Quiz trắc nghiệm hoặc điền từ để củng cố khả năng ghi nhớ.
        *   **Bookmarks**: Quản lý và ôn luyện các từ vựng cụ thể đã được người dùng chủ động đánh dấu lưu lại.
        *   **Dictionary**: Tra cứu nhanh nghĩa, phiên âm cùng ví dụ của từ vựng mới, hỗ trợ lưu trực tiếp vào sổ tay cá nhân.dấu | `_userId: string` | `Promise<string[]>` |
    | 7 | `toggleSpeakingBookmark` | Bật/tắt đánh dấu kịch bản luyện nói (khai báo tại speaking) | `_userId: string, scenarioId: string` | `Promise<{bookmarked: boolean}>` |
    | 8 | `getSpeakingBookmarks` | Lấy danh sách các kịch bản Speaking đã đánh dấu | `_userId: string, page?, limit?` | `Promise<{bookmarks, bookmarkIds, total, totalPages, currentPage}>` |
    | 9 | `getSpeakingBookmarkIds` | Lấy danh sách ID các kịch bản Speaking đã đánh dấu | `_userId: string` | `Promise<string[]>` |

    ##### 3.7.1.8. Study Plan (`src/actions/study.ts`)
    | STT | Tên Server Action | Mô tả chức năng | Đầu vào | Đầu ra |
    | :--- | :--- | :--- | :--- | :--- |
    | 1 | `getStudyPlan` | Lấy kế hoạch lộ trình học tập của người dùng | `_userId: string` | `Promise<StudyPlan \| null>` |
    | 2 | `getTodayTasks` | Lấy danh sách nhiệm vụ học tập được đề xuất hôm nay | `_userId: string` | `Promise<StudyTask[]>` |
    | 3 | `toggleTaskCompletion` | Đánh dấu hoàn thành/chưa hoàn thành một nhiệm vụ | `taskId: string, _completed: boolean` | `Promise<void>` |
    | 4 | `updateTaskTime` | Cập nhật thời lượng học tập thực tế cho nhiệm vụ | `taskId: string, startTime: string, endTime: string` | `Promise<void>` |
    | 5 | `updateStudyGoal` | Cập nhật mục tiêu và thời lượng học tập mỗi tuần | `_userId: string, goal: string, level: string, hoursPerWeek: number` | `Promise<void>` |
    | 6 | `updateExamDate` | Cập nhật hoặc đặt ngày thi mục tiêu | `_userId: string, date: Date` | `Promise<void>` |
    | 7 | `getStudyStats` | Lấy thống kê số giờ học hàng ngày, hàng tuần, tổng số giờ | `_userId: string` | `Promise<StudyStats>` |
    | 8 | `createNewPlan` | Thiết lập một lộ trình học tập mới từ khảo sát đầu vào | `_userId: string, data: { goal, level, hoursPerWeek, interests }` | `Promise<void>` |

    ##### 3.7.1.9. Spaced Repetition - SRS (`src/actions/srs.ts`)
    | STT | Tên Server Action | Mô tả chức năng | Đầu vào | Đầu ra |
    | :--- | :--- | :--- | :--- | :--- |
    | 1 | `reviewVocabItem` | Gửi đánh giá ôn tập từ vựng kèm xếp hạng FSRS (1-4) | `vocabItemId: string, rating: 1 \| 2 \| 3 \| 4` | `Promise<ReviewResponse>` |
    | 2 | `getDueItems` | Lấy danh sách từ vựng đến hạn ôn tập, xếp theo độ khẩn cấp | `limit?: number` | `Promise<DueItem[]>` |
    | 3 | `getReviewStats` | Lấy thống kê tổng quan tiến độ ôn tập ngắt quãng | Không | `Promise<ReviewStats>` |
    | 4 | `getStudySession` | Khởi tạo phiên ôn tập kết hợp từ cũ đến hạn và từ mới học | `topicId: string, limit?: number` | `Promise<StudySession>` |
    | 5 | `optimizeFsrsWeights` | Kích hoạt huấn luyện ML tối ưu hóa trọng số FSRS cá nhân hóa | Không | `Promise<OptimizeResult>` |

    ##### 3.7.1.10. XP & Leaderboard (`src/actions/xp.ts`)
    | STT | Tên Server Action | Mô tả chức năng | Đầu vào | Đầu ra |
    | :--- | :--- | :--- | :--- | :--- |
    | 1 | `getXpStats` | Lấy thông tin cấp độ, chuỗi streak và số điểm XP tích lũy | Không | `Promise<XpStats>` |
    | 2 | `getActivityHistory` | Lấy lịch sử hoạt động học tập hàng ngày theo thời gian | `days?: number` | `Promise<ActivityHistory>` |
    | 3 | `getLeaderboard` | Lấy bảng xếp hạng thi đua tuần hoặc tháng theo điểm XP | `period?: string, type?: string, limit?: number` | `Promise<LeaderboardData>` |

    ##### 3.7.1.11. Thông báo (`src/actions/notification.ts`)
    | STT | Tên Server Action | Mô tả chức năng | Đầu vào | Đầu ra |
    | :--- | :--- | :--- | :--- | :--- |
    | 1 | `getNotifications` | Lấy danh sách thông báo kèm phân trang, tìm kiếm | `userId: string, options?: GetNotificationsOptions` | `Promise<GetNotificationsResponse>` |
    | 2 | `markNotificationAsRead` | Đánh dấu một thông báo cụ thể là đã đọc | `notificationId: string` | `Promise<{success: boolean}>` |
    | 3 | `markNotificationsAsRead` | Đánh dấu loạt nhiều thông báo là đã đọc (batch read) | `notificationIds: string[]` | `Promise<{success: boolean, count: number}>` |
    | 4 | `getUnreadNotificationCount` | Lấy tổng số lượng thông báo chưa đọc của học viên | `userId: string` | `Promise<number>` |
    | 5 | `markAllNotificationsAsRead` | Đánh dấu toàn bộ thông báo của học viên là đã đọc | `userId: string` | `Promise<{success: boolean, count: number}>` |

    ##### 3.7.1.12. Smart Tools (`src/actions/smartlens.ts`, `src/actions/translate.ts`)
    | STT | Tên Server Action | Mô tả chức năng | Đầu vào | Đầu ra |
    | :--- | :--- | :--- | :--- | :--- |
    | 1 | `analyzeImage` | Gửi hình ảnh lên hệ thống để phân tích OCR và dịch thuật | `file: File, targetLanguage: string` | `Promise<SmartLensResponse>` |
    | 2 | `translateText` | Thực hiện dịch thuật văn bản song ngữ thông qua API đám mây | `request: TranslateRequest` | `Promise<TranslateResponse>` |

    ##### 3.7.1.13. Trợ lý ảo Dorara & Khác (`src/actions/dorara.ts`)
    | STT | Tên Server Action | Mô tả chức năng | Đầu vào | Đầu ra |
    | :--- | :--- | :--- | :--- | :--- |
    | 1 | `sendDoraraMessage` | Gửi tin nhắn đến Dorara nhận phản hồi dạng hội thoại không stream | `messages: DoraraChatMessage[], userMessage: string, currentPage: string, learningLanguage?: string` | `Promise<DoraraChatResponse>` |
    | 2 | `fetchEnrichment` | Phân tích từ vựng nâng cao và tự động tạo quiz sau khi stream hội thoại xong | `aiResponse: string, userMessage: string, targetLanguage?: string` | `Promise<{vocabHighlights: VocabHighlight[], quizQuestion: QuizQuestion \| null}>` |
    | 3 | `getStreamConfig` | Lấy cấu hình kết nối Endpoint và token để khởi tạo kết nối SSE Client-side | Không | `Promise<{apiBase: string, token: string \| undefined}>` |

    ##### 3.7.1.14. Nhóm chủ đề dùng chung (`src/actions/topic-groups.ts`)
    | STT | Tên Server Action | Mô tả chức năng | Đầu vào | Đầu ra |
    | :--- | :--- | :--- | :--- | :--- |
    | 1 | `getTopicGroups` | Lấy tất cả nhóm chủ đề theo loại hub (speaking, grammar, vocab) | `hubType: string` | `Promise<TopicGroup[]>` |
    | 2 | `getGrammarTopicsByGroup` | Lấy các chủ đề ngữ pháp theo nhóm và phân loại con | `groupName: string, subcategory?: string` | `Promise<Topic[]>` |

    ##### 3.7.1.15. Đồ thị từ vựng (`src/actions/vocab-graph.ts`)
    | STT | Tên Server Action | Mô tả chức năng | Đầu vào | Đầu ra |
    | :--- | :--- | :--- | :--- | :--- |
    | 1 | `getVocabGraphData` | Xây dựng đồ thị tri thức từ vựng (Nodes & Edges) dựa trên dữ liệu từ sổ tay và tra cứu từ đồng nghĩa/trái nghĩa | `options?: { notebookId?: string; limit?: number }` | `Promise<VocabGraphData>` |

*   **3.7.2. Tích hợp dịch vụ và API bên thứ ba** 
    ##### 3.7.2.1. Xác thực Auth.js
    *   **Endpoint:** `/api/auth/[...nextauth]`
    *   **Method:** GET, POST
    *   **Mô tả:** Xử lý các endpoints liên quan đến xác thực tại cổng Next.js bao gồm: đăng nhập/đăng xuất, callback OAuth (Google), quản lý session, và bảo vệ chống tấn công CSRF. Route này sử dụng catch-all route segment `[...nextauth]` để điều phối nhiều sub-routes.
    *   **Sub-routes bao gồm:**
        *   `/api/auth/signin` - Trang đăng nhập
        *   `/api/auth/signout` - Đăng xuất
        *   `/api/auth/callback/google` - OAuth callback từ Google
        *   `/api/auth/session` - Lấy thông tin session hiện tại
        *   `/api/auth/csrf` - Lấy CSRF token

    ##### 3.7.2.2. Upload ảnh đại diện lên Cloudinary
    *   **Endpoint:** `/api/upload/avatar`
    *   **Method:** POST
    *   **Body:**
        ```json
        {
          "image": "base64_encoded_image_data...",
          "mimeType": "image/jpeg"
        }
        ```
    *   **Response (Case 1: Thành công):**
        ```json
        {
          "success": true,
          "url": "https://res.cloudinary.com/dailyeng/image/upload/v123456/dailyeng/avatars/abc123.jpg"
        }
        ```
    *   **Response (Các lỗi trả về):**
        *   *Chưa xác thực (401):* `{"error": "Unauthorized"}`
        *   *Thiếu dữ liệu (400):* `{"error": "Image and mimeType are required"}`
        *   *Sai định dạng (400):* `{"error": "Invalid file type. Allowed: jpg, png, webp, gif"}`
        *   *File quá lớn (413):* `{"error": "File too large. Maximum size is 5MB"}`
        *   *Lỗi máy chủ (500):* `{"error": "Failed to upload avatar"}`

**3.8. Thiết kế Giao diện người dùng:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Sơ đồ trang web Sitemap và Wireframe luồng người dùng.*

*   **3.8.1. Sơ đồ trang web**
    *   3.8.1.1. Sơ đồ các giao diện trang tổng quan
        Trang web gồm có 7 giao diện lớn chính, chức năng tương ứng với tên của nó. Sơ đồ của 7 trang được trình bày trong hình sau. 

        `mermaid
        flowchart LR
            Login["Login / Register"] --> Dashboard["Dashboard"]

            %% Vocabulary Hub
            Dashboard --> VocabList["Vocabulary Hub"]
            VocabList --> VocabDetail["Topic Detail gồm Learn và Practice"]
            VocabList --> DailyReview["Daily Review"]

            %% Grammar Hub
            Dashboard --> GrammarList["Grammar Hub"]
            GrammarList --> GrammarDetail["Grammar Detail"]

            %% Speaking Room
            Dashboard --> SpeakingList["Speaking Room"]
            SpeakingList --> SpeakingSession["Speaking Session"]

            %% Notebook
            Dashboard --> NotebookMain["Notebook"]
            NotebookMain --> NotebookFlashcard["Notebook Flashcards"]

            %% Translate
            Dashboard --> Translate["Translate"]
            Translate --> TextTranslate["Text Translate"]
            Translate --> SmartLens["SmartLens"]

            %% Study Plan
            Dashboard --> StudyPlan["Study Plan"]
            StudyPlan --> BuildPlan["Build Plan"]

            %% User Module
            Dashboard --> User["User"]
            User --> Profile["Profile"]
            User --> Leaderboard["Leaderboard"]
            User --> Settings["Settings"]
            User --> Notifications["Notifications"]

            style Login fill:#e3f2fd,stroke:#1565c0
            style Dashboard fill:#fff9c4,stroke:#f9a825
            
            style VocabList fill:#e8f5e9,stroke:#2e7d32
            style VocabDetail fill:#e8f5e9,stroke:#2e7d32
            style DailyReview fill:#e8f5e9,stroke:#2e7d32
            
            style GrammarList fill:#f3e5f5,stroke:#6a1b9a
            style GrammarDetail fill:#f3e5f5,stroke:#6a1b9a
            
            style SpeakingList fill:#fce4ec,stroke:#c62828
            style SpeakingSession fill:#fce4ec,stroke:#c62828
            
            style NotebookMain fill:#fff3e0,stroke:#e65100
            style NotebookFlashcard fill:#fff3e0,stroke:#e65100
            
            style Translate fill:#e0f2f1,stroke:#004d40
            style TextTranslate fill:#e0f2f1,stroke:#004d40
            style SmartLens fill:#e0f2f1,stroke:#004d40

            style StudyPlan fill:#eceff1,stroke:#37474f
            style BuildPlan fill:#eceff1,stroke:#37474f

            style User fill:#e0f7fa,stroke:#00695c
            style Profile fill:#e0f7fa,stroke:#00695c
            style Leaderboard fill:#e0f7fa,stroke:#00695c
            style Settings fill:#e0f7fa,stroke:#00695c
            style Notifications fill:#e0f7fa,stroke:#00695c
        `
        *Hình 3.9. Sơ đồ các giao diện trang chính Sitemap của ứng dụng DailyEng.*

    *   3.8.1.2. Sơ đồ giao diện trang Speaking Room
        Với trang Speaking, mới vào, người dùng sẽ có 4 lựa chọn vào các trang con, tương ứng với nhu cầu của người dùng tại thời điểm đó. 4 trang bao gồm:
        *   **Topic Selection**: Đây là giao diện mặc định và cũng là giao diện chính của Speaking Room. Bên trong nó sẽ là luồng người dùng học như: Chọn Topic -> Thực hiện nói -> Kết thúc nói -> Màn hình Feedback.
        *   Ngoài ra còn có các trang khác như: **Custom Topic**, **Bookmarks** và **History**.

        `mermaid
        flowchart TD
            SpeakingHub["Speaking Hub"] --> TopicSelection["Topic Selection mặc định"]
            SpeakingHub --> CustomTopic["Custom Topic tự tạo"]
            SpeakingHub --> Bookmarks["Bookmarks yêu thích"]
            SpeakingHub --> History["History lịch sử"]
            
            TopicSelection --> StartSession["Khởi tạo Phiên học"]
            StartSession --> SubmitTurn["Thực hiện nói và Phản hồi"]
            SubmitTurn --> |Lặp lượt thoại| SubmitTurn
            SubmitTurn --> EndSession["Kết thúc hội thoại và Chấm điểm"]
            EndSession --> Feedback["Màn hình Feedback và Phân tích phát âm"]
            
            CustomTopic --> CreateScenario["AI tự sinh Kịch bản"]
            CreateScenario --> StartSession
        `
        *Hình 3.10. Sơ đồ các giao diện trang con và luồng nghiệp vụ Speaking Room.*

    *   3.8.1.3. Sơ đồ giao diện trang Vocabulary Hub
        Với trang Vocabulary Hub, hệ thống cung cấp 3 trang con chính bao gồm:
        *   **Topic Selection**: Trang mặc định giúp người dùng chọn chủ đề từ vựng và tham gia luồng học tập thông qua hai chế độ Học (Learning) và Luyện tập (Practice).
        *   Ngoài ra còn có các trang con bổ trợ: **Bookmarks** để xem lại các từ đã đánh dấu và **Dictionary** để tra cứu từ điển trực tiếp.

        ```mermaid
        flowchart TD
            VocabHub["Vocabulary Hub"] --> TopicSelection["Topic Selection"]
            VocabHub --> Bookmark["Bookmark"]
            VocabHub --> Dictionary["Dictionary"]
            
            TopicSelection --> Learning["Learning"]
            TopicSelection --> Practice["Practice"]
            
            Practice --> SpeakingPractice["Speaking Practice"]
            Practice --> WritingPractice["Writing Practice"]
            
            style VocabHub fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
            
            style TopicSelection fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
            style Bookmark fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
            style Dictionary fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
            
            style Learning fill:#fff9c4,stroke:#f9a825,stroke-width:2px
            style Practice fill:#fff9c4,stroke:#f9a825,stroke-width:2px
            style SpeakingPractice fill:#fff9c4,stroke:#f9a825,stroke-width:2px
            style WritingPractice fill:#fff9c4,stroke:#f9a825,stroke-width:2px
        ```
        *Hình 3.11. Sơ đồ giao diện và luồng học tập Vocabulary Hub.*

    *   3.8.1.4. Sơ đồ giao diện trang Grammar Hub
        Trang Grammar về cơ bản cũng giống như trang Vocabulary Hub, nhưng các chức năng sẽ tinh giản hơn. Trang Grammar chỉ bao gồm 2 giao diện chính như sau:
        *   **Topic Selection**: Tương tự như Vocabulary Hub, trang Grammar cũng có các Topic để người dùng chọn (thường là các chủ đề ngữ pháp). Trang cũng đưa người dùng vào luồng học tập tương tự như Vocabulary Hub.
        *   Ngoài ra còn có trang **Bookmarks**.

        `mermaid
        flowchart TD
            GrammarHub["Grammar Hub"] --> TopicSelection["Topic Selection mặc định"]
            GrammarHub --> Bookmarks["Bookmarks đã đánh dấu"]
            
            TopicSelection --> SelectTopic["Chọn chủ đề Ngữ pháp"]
            SelectTopic --> StudyTheory["Học Lý thuyết với ví dụ song ngữ"]
            StudyTheory --> PracticeQuiz["Làm bài tập Quiz trắc nghiệm"]
            PracticeQuiz --> MasteryProgress["Cập nhật tiến độ thông thạo"]
        `
        *Hình 3.12. Sơ đồ các giao diện và luồng rèn luyện Grammar Hub.*

    *   3.8.1.5. Sơ đồ giao diện trang Notebook
        Trang Notebook bao gồm 2 giao diện chính, mỗi giao diện có vai trò và chức năng tương đương nhau. Cụ thể là:
        *   **Vocabulary Notebook**: Trang này bao gồm các trang con là List View, Flashcards và Statistics.
        *   **Grammar Notebook**: Trang này bao gồm các trang con là All Rules, Quizzes và Statistics.

        `mermaid
        flowchart TD
            Notebook["Notebook Dashboard"] --> VocabNotebook["Vocabulary Notebook"]
            Notebook --> GrammarNotebook["Grammar Notebook"]
            
            VocabNotebook --> ListView["List View danh sách từ và độ thông thạo"]
            VocabNotebook --> Flashcard["Flashcard Review ôn tập ngắt quãng"]
            VocabNotebook --> VocabStats["Vocabulary Statistics"]
            
            GrammarNotebook --> AllRules["All Rules ngữ pháp đã lưu"]
            GrammarNotebook --> Quizzes["Quizzes luyện tập"]
            GrammarNotebook --> GrammarStats["Grammar Statistics"]
        `
        *Hình 3.13. Cấu trúc giao diện Sổ tay cá nhân Notebook.*

    *   3.8.1.6. Sơ đồ giao diện trang Translate
        Trang Translate bao gồm 2 công cụ chính là Text Translate và SmartLens để hỗ trợ dịch thuật.

        `mermaid
        flowchart TD
            Translate["Translate System"] --> TextTranslate["Text Translate dịch văn bản"]
            Translate --> SmartLens["SmartLens dịch hình ảnh OCR"]
            
            TextTranslate --> InputText["Nhập văn bản nguồn"] --> TranslateAPI["Dịch qua API"] --> OutputTranslation["Kết quả dịch song ngữ"]
            SmartLens --> UploadImage["Tải ảnh lên hệ thống"] --> OCR["AI nhận diện văn bản OCR"] --> TranslateOverlay["Dịch & Phủ chữ đè hình ảnh"]
        `
        *Hình 3.14. Quy trình vận hành giao diện Dịch thuật Translate.*

    *   3.8.1.7. Sơ đồ giao diện trang Study Plan
        Trang Study Plan chỉ có 1 giao diện duy nhất là hiển thị toàn bộ các thông tin cần thiết như lịch học và mục tiêu học.

    *   3.8.1.8. Sơ đồ giao diện trang User
        Đây là trang lưu thông tin cá nhân của người dùng, bao gồm 4 giao diện với 4 thông tin cơ bản cần có của 1 website học tập. Bốn giao diện bao gồm:
        *   **Profile**
        *   **Notification**
        *   **Settings**
        *   **Helps**

*   **3.8.2. Thiết kế Wireframe**
    Sau khi đã xác định được kiến trúc các trang và các trang con, nhóm tiến hành thiết kế Wireframe các trang chính bằng công cụ Figma. Việc thiết kế Wireframe bằng Figma này giúp nhóm hình dung được đại khái trang web, giúp giảm áp lực lên công việc thiết kế UI trực tiếp bằng code.
    Trong bước thiết kế Wireframe bằng Figma, nhóm các thiết kế cho các trang như bảng dưới: 
    *   Trang Homepage
    *   Trang Speaking Room
    *   Trang Vocabulary Hub
    *   Trang Notebook

    ![Hình 3.15. Bản vẽ Wireframe phác thảo cấu trúc giao diện hệ thống DailyEng trên Figma.](file:///C:/Users/MaiVu/.gemini/antigravity-ide/brain/94bad8d2-7b89-4ea4-b840-fb2fea58bc17/dailyeng_wireframe_figma_1779359769759.png)
    *Hình 3.15. Một số wireframe mà nhóm đã thiết kế ở Figma.*

*   **3.8.3. Thiết kế giao diện hoàn chỉnh**
    *   3.8.3.1. Quy định hệ thống màu sắc và font chữ
        Hệ thống màu sắc này được xây dựng với 10 cấp độ cho các nhóm màu từ chính đến phụ, đảm bảo độ linh hoạt tối đa cho việc thiết kế giao diện. Hệ thống bao gồm 5 nhóm chính:
        *   **Primary**: Dùng cho các thành phần chính, hành động chính và nhận diện thương hiệu.
        *   **Secondary**: Dùng cho các thành phần phụ, các nút hành động phụ, nhằm phụ trợ cho Primary.
        *   **Accent**: Dùng để trang trí hoặc làm nổi bật.
        *   **Semantic**: Dùng cho các trạng thái thông báo (Thành công, Lỗi, Cảnh báo, Thông tin).
        *   **Grayscale**: Dùng cho các văn bản và các chi tiết khác.

        | Nhóm màu | Mã Hex tiêu biểu | Vai trò và Ứng dụng thực tế |
        | :--- | :--- | :--- |
        | **Primary** | #0284c7 Sky 600 | Sử dụng cho các thành phần nhận diện thương hiệu, các nút CTA. |
        | **Secondary** | #0ea5e9 Sky 500 | Sử dụng cho các nút phụ, viền thẻ bài học. |
        | **Accent** | #f59e0b Amber 500 | Tạo điểm nhấn thị giác nổi bật. |
        | **Semantic** | #10b981 Emerald 500| Thông báo bài làm đúng hoặc hoàn thành. |
        | **Grayscale** | #1e293b text | Tối ưu hóa việc hiển thị nội dung chữ sắc nét. |

        Về font chữ, nhóm lựa chọn Nunito làm phông chữ chủ đạo cho toàn bộ hệ thống. Đây là một bộ phông Sans-serif với các đường nét bo tròn nhẹ nhàng, mang lại cảm giác hiện đại, thân thiện nhưng vẫn giữ được sự chuyên nghiệp.
        Điểm số của người học được tổng hợp và hiển thị trên bảng xếp hạng Leaderboard theo tuần, tháng và mọi thời đại thông qua `LeaderboardService`. Để đảm bảo hệ thống phản hồi mượt mà dưới tải trọng người dùng lớn, các truy vấn bảng xếp hạng được tối ưu hóa bằng cách đánh chỉ mục index trên trường `totalXp` kết hợp lưu trữ bộ nhớ đệm cache. Cấp độ người dùng được xác định động từ tổng XP theo công thức:
        
        $$Level = \lfloor\sqrt{XP / 100}\rfloor$$
        
        Đoạn mã xử lý cộng điểm kinh nghiệm tích hợp cơ chế cộng streak login trong `XpService.java`:
        ```java     <artifactId>spring-boot-starter-actuator</artifactId>
            </dependency>

            <!-- Resilience4j & Caching -->
            <dependency>
                <groupId>io.github.resilience4j</groupId>
                <artifactId>resilience4j-spring-boot3</artifactId>
                <version>2.4.0</version>
            </dependency>
            <dependency>
                <groupId>com.github.ben-manes.caffeine</groupId>
                <artifactId>caffeine</artifactId>
            </dependency>

            <!-- External Integrations & SDKs -->
            <dependency>
                <groupId>com.google.genai</groupId>
                <artifactId>google-genai</artifactId>
                <version>1.0.0</version>
            </dependency>
            <dependency>
                <groupId>com.microsoft.cognitiveservices.speech</groupId>
                <artifactId>client-sdk</artifactId>
                <version>1.42.0</version>
            </dependency>
            <dependency>
                <groupId>io.sentry</groupId>
                <artifactId>sentry-spring-boot-starter-jakarta</artifactId>
                <version>8.16.0</version>
            </dependency>

            <!-- Utilities and Persistence Support -->
            <dependency>
                <groupId>io.hypersistence</groupId>
                <artifactId>hypersistence-utils-hibernate-63</artifactId>
                <version>3.9.0</version>
            </dependency>
            <dependency>
                <groupId>io.github.thibaultmeyer</groupId>
                <artifactId>cuid</artifactId>
                <version>2.0.2</version>
            </dependency>
        </dependencies>
        ```

*   **4.1.3. Cấu trúc thư mục dự án**
    Để bảo đảm tính rõ ràng và khả năng mở rộng lâu dài, mã nguồn hệ thống được tổ chức phân tách rành mạch theo cấu trúc phân tầng:

    ```
    DailyEng-java/
    ├── backend/                     # Mã nguồn Spring Boot Backend
    │   ├── src/main/java/com/dailyeng/
    │   │   ├── auth/            # Module bảo mật và xác thực JWT (Account.java, Session.java)
    │   │   ├── config/          # Các cấu hình hệ thống (CORS, Properties)
    │   │   ├── controller/      # Tầng tiếp nhận yêu cầu REST API
    │   │   ├── dto/             # Lớp truyền dữ liệu sử dụng Java Records
    │   │   ├── entity/          # Các thực thể JPA ánh xạ với cơ sở dữ liệu PostgreSQL
    │   │   ├── exception/       # Bộ xử lý ngoại lệ tập trung (Global Exception Handling)
    │   │   ├── repository/      # Tầng truy xuất dữ liệu Spring Data JPA
    │   │   ├── srs/             # Module ôn tập ngắt quãng (FsrsAlgorithm.java, FsrsOptimizer.java)
    │   │   ├── user/            # Quản lý hồ sơ người dùng (User.java, UserRepository.java)
    │   │   ├── vocabulary/      # Quản lý kho từ vựng và tiến độ học tập
    │   │   ├── grammar/         # Quản lý lý thuyết và bài tập trắc nghiệm ngữ pháp
    │   │   └── xp/              # Tính điểm kinh nghiệm và bảng xếp hạng
    │   └── src/main/resources/
    │       ├── application.yml  # Tệp cấu hình các thông số môi trường của Spring
    │       └── db/migration/    # Lịch sử các tập lệnh di chuyển dữ liệu của Flyway (V1 -> V10)
    │
    ├── src/                         # Mã nguồn Next.js Frontend
    │   ├── app/                     # Cấu trúc các trang và bố cục theo Next.js App Router
    │   ├── actions/                 # Các Server Actions giao tiếp với API máy chủ backend
    │   ├── components/              # Các thành phần giao diện React tái sử dụng
    │   │   ├── auth/                # Giao diện đăng nhập, đăng ký
    │   │   ├── dashboard/           # Giao diện trang tổng quan
    │   │   ├── speaking/            # Giao diện ghi âm và luyện nói AI
    │   │   └── ui/                  # Các thành phần giao diện nền tảng (Radix/shadcn)
    │   ├── contexts/                # Bộ quản lý trạng thái chia sẻ (Auth Context)
    │   ├── hooks/                   # Các hook React tùy chỉnh (useAudioRecorder...)
    │   ├── lib/                     # Công cụ tiện ích và cấu hình HttpClient kết nối API
    │   └── types/                   # Định nghĩa các kiểu dữ liệu và Interface của TypeScript
    │
    ├── public/                      # Tài nguyên tĩnh (hình ảnh, phông chữ, mô hình 3D)
    ├── components.json              # Tệp cấu hình thư viện giao diện shadcn/ui
    ├── next.config.mjs              # Tệp cấu hình biên dịch của Next.js
    └── package.json                 # Khai báo các gói phụ thuộc của Frontend
    ```

**4.2. Hiện thực mã nguồn các module lõi:**

*   **4.2.1. Module xác thực và phân quyền**
    *   **4.2.1.1. Kiến trúc bảo mật và luồng xác thực**
        Hệ thống triển khai mô hình xác thực không trạng thái (stateless) dựa trên Spring Security kết hợp với mã thông báo JWT. Luồng xác thực được tổ chức phối hợp chặt chẽ giữa hai tầng:
        *   **Frontend**: Người dùng điền thông tin đăng nhập tại giao diện. Hệ thống kích hoạt Server Action tại `src/actions/auth.ts` để gọi API bảo mật thông qua `src/lib/auth-api.ts`.
        *   **Backend**: `AuthController` tiếp nhận thông tin yêu cầu và chuyển cho `AuthService` xử lý. `AuthService` tiến hành so khớp dữ liệu từ `AccountRepository` và mã hóa mật khẩu bằng BCrypt.
        *   **Phản hồi**: Khi xác thực thành công, máy chủ backend sinh ra cặp khóa bao gồm Access Token và Refresh Token. Refresh Token được tự động nhúng vào Cookie của trình duyệt với thuộc tính `HttpOnly` và `Secure` nhằm ngăn chặn các cuộc tấn công đánh cắp phiên làm việc từ JavaScript (XSS), giúp duy trì trạng thái đăng nhập lâu dài và an toàn.
    *   **4.2.1.2. Các thành phần mã nguồn cốt lõi**
        Để hiện thực hóa kiến trúc bảo mật và luồng xác thực nêu trên, hệ thống DailyEng phát triển và tổ chức các thành phần mã nguồn cốt lõi dưới đây nhằm đảm bảo tính toàn vẹn dữ liệu và phân tách rõ ràng trách nhiệm giữa các tầng xử lý:
        *   `Account.java`: Thực thể lưu trữ thông tin đăng nhập của người dùng, hỗ trợ liên kết nhiều phương thức đăng nhập khác nhau như đăng nhập cục bộ hoặc qua OAuth2 Google với cùng một hồ sơ người dùng `User`.
        *   `Session.java`: Quản lý danh sách các phiên đăng nhập hoạt động của người dùng, hỗ trợ thu hồi mã thông báo từ xa và đăng xuất an toàn.
        *   `JwtAuthenticationFilter`: Bộ lọc bảo mật nằm trong chuỗi lọc của Spring Security, trích xuất mã thông báo từ yêu cầu HTTP gửi đến, giải mã chữ ký số và thiết lập ngữ cảnh bảo mật nếu hợp lệ.
        
        Cấu hình chi tiết chuỗi lọc bảo mật trong `SecurityConfig.java`:
        ```java
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                    .dispatcherTypeMatchers(DispatcherType.ASYNC).permitAll()
                    .requestMatchers("/auth/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/vocab/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/grammar/**").permitAll()
                    .requestMatchers("/actuator/health").permitAll()
                    .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
            return http.build();
        }
        ```

*   **4.2.2. Module luyện phát âm AI**
    *   **4.2.2.1. Phân tích cao độ thời gian thực**
        Trong phân hệ luyện nói Speaking Room, để đánh giá chính xác tiêu chí ngữ điệu Intonation, hệ thống phát triển lớp phân tích âm thanh `PitchAnalyzer` ở phía Client chạy trên trình duyệt sử dụng Web Audio API. 
        Hệ thống áp dụng thuật toán **Tự tương quan Autocorrelation** để tìm ra tần số cơ bản F0 của giọng nói. Tín hiệu âm thanh thu được từ micrô được chia thành các cấu trúc khung dữ liệu frames, sau đó tính toán độ tương quan giữa tín hiệu thực tế và phiên bản bị trễ của chính nó. Từ đó xác định chính xác cao độ giọng nói của người học trong dải tần số nói chuẩn của con người từ 85 Hz đến 500 Hz để tính toán độ biến thiên cao độ.
        
        Phương thức nhận diện tần số giọng nói trong `src/lib/pitch-analyzer.ts`:
        ```typescript
        private detectPitch(buffer: Float32Array, sampleRate: number): number | null {
          const bufferLength = buffer.length;
          const correlations = new Float32Array(bufferLength);
          
          for (let lag = 0; lag < bufferLength; lag++) {
            let sum = 0;
            for (let i = 0; i < bufferLength - lag; i++) {
              sum += buffer[i] * buffer[i + lag];
            }
            correlations[lag] = sum;
          }
          
          const minLag = Math.floor(sampleRate / PitchAnalyzer.MAX_PITCH);
          const maxLag = Math.floor(sampleRate / PitchAnalyzer.MIN_PITCH);
          let maxCorrelation = 0;
          let bestLag = 0;
          
          for (let lag = minLag; lag < Math.min(maxLag, bufferLength); lag++) {
            if (correlations[lag] > maxCorrelation) {
              maxCorrelation = correlations[lag];
              bestLag = lag;
            }
          }
          
          if (maxCorrelation < correlations[0] * 0.3) {
            return null; // Không tìm thấy tính tuần hoàn rõ ràng
          }
          
          let refinedLag = bestLag;
          if (bestLag > 0 && bestLag < bufferLength - 1) {
            const prev = correlations[bestLag - 1];
            const curr = correlations[bestLag];
            const next = correlations[bestLag + 1];
            refinedLag = bestLag + (prev - next) / (2 * (prev - 2 * curr + next));
          }
          
          const frequency = sampleRate / refinedLag;
          if (frequency >= PitchAnalyzer.MIN_PITCH && frequency <= PitchAnalyzer.MAX_PITCH) {
            return frequency;
          }
          return null;
        }
        ```
    *   **4.2.2.2. Đánh giá phát âm chuyên sâu**
        Hệ thống tích hợp Azure Speech SDK để tiến hành chấm điểm chi tiết giọng nói của người học dựa trên 3 tiêu chí cốt lõi: độ chính xác phát âm Accuracy, độ lưu loát trôi chảy Fluency và ngữ điệu biến thiên Prosody kết hợp thông tin cao độ thu từ PitchAnalyzer. Phản hồi từ Azure SDK được kết hợp cùng mô hình Google Gemini để nhận diện lỗi sai ngữ pháp, dùng từ và gợi ý cách diễn đạt tự nhiên hơn theo trình độ cá nhân.
        Hệ thống áp dụng cơ chế tự động điều chỉnh độ khó thích ứng adaptive difficulty: tự động nâng trình độ đối thoại của AI lên một bậc nếu người học có điểm trung bình của 5 phiên gần nhất đạt từ 85 trở lên, hoặc hạ độ khó nếu điểm trung bình 3 phiên liên tiếp dưới 45.
        
        Logic tính toán điểm tổng hợp có trọng số dựa trên trình độ ngôn ngữ hiện tại của người học trong `SpeakingSessionService.java`:
        ```java
        private int calculateWeightedOverallScore(int grammar, int vocabulary, int relevance,
                        int fluency, int pronunciation, int intonation, String level) {
            double wGrammar, wVocab, wRelevance, wFluency, wPron, wInto;
            if (level != null && (level.equals("A1") || level.equals("A2"))) {
                wGrammar = 0.25; wVocab = 0.15; wRelevance = 0.15;
                wFluency = 0.20; wPron = 0.15; wInto = 0.10;
            } else if (level != null && (level.equals("C1") || level.equals("C2"))) {
                wGrammar = 0.15; wVocab = 0.20; wRelevance = 0.15;
                wFluency = 0.15; wPron = 0.15; wInto = 0.20;
            } else {
                wGrammar = 0.20; wVocab = 0.15; wRelevance = 0.15;
                wFluency = 0.20; wPron = 0.15; wInto = 0.15;
            }
            double weighted = grammar * wGrammar + vocabulary * wVocab + relevance * wRelevance
                            + fluency * wFluency + p*   **4.4.1. Kiểm thử tự động Unit Testing:**
    
    **4.4.1.1. Backend Unit Testing**
    *   **Công nghệ sử dụng**: JUnit 5 được sử dụng làm nền tảng để điều phối và thực thi kiểm thử. Dự án kết hợp Mockito để giả lập các phụ thuộc ngoài như cơ sở dữ liệu hoặc các dịch vụ API liên kết, giúp quá trình kiểm tra tập trung vào logic xử lý của từng phương thức cụ thể. Ngoài ra, thư viện AssertJ hỗ trợ định nghĩa các biểu thức khẳng định trực quan và chuẩn hóa.
    *   **Chiến lược kiểm thử Service Layer**: Các dịch vụ cốt lõi bao gồm `AuthService`, `VocabService` và `SrsService` được kiểm tra bằng cách cô lập và giả lập tầng Repository. Chiến lược này giúp tối ưu hóa thời gian thực thi nhờ việc lược bỏ bước khởi tạo cơ sở dữ liệu, đồng thời kiểm soát chính xác cấu trúc dữ liệu đầu vào và các kịch bản phát sinh ngoại lệ.
    *   **Ví dụ về Mocking trong AuthServiceTest:**
        ```java
        @ExtendWith(MockitoExtension.class)
        class AuthServiceTest {
            @Mock
            private UserRepository userRepository;
            
            @InjectMocks
            private AuthService authService;
        
            @Test
            void registerSuccess() {
                // Setup: Khi tìm email này, trả về trống do tài khoản chưa tồn tại
                when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
                
                // Execute & Verify: Thực hiện đăng ký và kiểm tra kết quả
                var result = authService.register(new RegisterRequest("User", "test@email.com", "Pass123"));
                assertTrue(result.success());
            }
        }
        ```
    *   **Kiểm thử thuật toán lõi**: Thuật toán FSRS `FsrsAlgorithm` được kiểm tra chi tiết với các kịch bản kiểm thử toán học nhằm đảm bảo độ ổn định và khả năng tái hiện thông tin được tính toán chính xác theo đúng mô hình thiết kế.

    **4.4.1.2. Frontend Unit Testing**
    *   **Công nghệ sử dụng**: Phía Client sử dụng Vitest và jsdom để giả lập môi trường trình duyệt cho các kiểm thử giao diện. V8 Coverage được tích hợp để thống kê tỷ lệ bao phủ mã nguồn của các tệp tin kiểm thử.
    *   **Kiểm thử logic và Utility**: Hệ thống tập trung kiểm tra các hàm xử lý dữ liệu độc lập và các thư viện tiện ích ở phía máy khách, tiêu biểu là logic phân bổ thẻ và lập lịch ôn tập tại `src/lib/srs.test.ts`.
    *   **Ví dụ về kiểm thử logic SRS:**
        ```typescript
        // src/lib/srs.test.ts
        describe("getCardsDue", () => {
          it("nên lọc ra các thẻ đã đến hạn và sắp xếp theo thời gian cũ nhất", () => {
            const cardPast = createCard("1", new Date("2024-03-14"));
            const cardFuture = createCard("2", new Date("2024-03-16"));
            
            const results = getCardsDue([cardPast, cardFuture]);
            
            expect(results).toHaveLength(1);
            expect(results[0].id).toBe("1");
          });
        });
        ```
    *   **Lợi ích mang lại**: Việc áp dụng kiểm thử tự động hỗ trợ phát hiện lỗi sớm trong quá trình phát triển và kiểm soát rủi ro phát sinh lỗi mới khi tiến hành tái cấu trúc mã nguồn. Đồng thời, hệ thống kiểm thử này đóng vai trò như tài liệu đặc tả kỹ thuật mô tả trực quan hoạt động của các phương thức.�i của người học
        private static double nextDifficulty(double difficulty, int rating, double[] w) {
            double d0Mean = w[4] - Math.exp(w[5] * (3 - 3)) + 1;
            double newD = w[5] * d0Mean + (1 - w[5]) * (difficulty - w[6] * (rating - 3));
            return clampDifficulty(newD);
        }

        // Bước 2: Tính toán độ bền S dựa trên độ khó mới
        private static double calculateSuccessStability(
                double stability, double difficulty, double retrievability, int rating, double[] w
        ) {
            double hardPenalty = (rating == HARD) ? w[14] : 1.0;
            double easyBonus = (rating == EASY) ? w[15] * w[16] + 1 : 1.0;
            double sinr = Math.exp(w[6])
                    * (11 - difficulty)
                    * Math.pow(stability, -w[8])
                    * (Math.exp(w[9] * (1 - retrievability)) - 1)
                    * hardPenalty
                    * easyBonus;
            return stability * (sinr + 1);
        }
        ```
        
        Theo cơ chế trên, đánh giá tích cực ở mức 3 và 4 sẽ giữ nguyên hoặc giảm độ khó, trong khi đánh giá tiêu cực ở mức 1 và 2 sẽ làm tăng độ khó. Từ độ khó mới, hệ số `11 - difficulty` đảm bảo nguyên lý tỷ lệ nghịch: từ vựng càng khó thì hiệu số càng nhỏ, khiến độ bền tăng càng chậm và khoảng cách ôn tập càng ngắn lại.

*   **4.2.4. Module từ vựng và ngữ pháp Vocabulary & Grammar**
    *   **4.2.4.1. Quản lý nội dung phân cấp khoa học**
        Dữ liệu học tập được cấu trúc phân cấp rõ ràng theo sơ đồ: `TopicGroup` đại diện nhóm chủ đề lớn theo trình độ từ A1 đến C2 hoặc mục tiêu luyện thi $\rightarrow$ `Topic` đại diện chủ đề học cụ thể $\rightarrow$ `VocabItem` chứa chi tiết các từ vựng đi kèm nghĩa, phiên âm, câu ví dụ hoặc `GrammarNote` chứa quy tắc ngữ pháp. Cấu trúc này giúp người dùng dễ dàng định hình lộ trình học và quản lý tri thức.
    *   **4.2.4.2. Theo dõi tiến độ học tập của người dùng**
        Tương tác học tập của người dùng được lưu trữ qua các thực thể dữ liệu như `UserVocabProgress`. Hệ thống phân cấp các từ vựng thành các trạng thái bao gồm `New` biểu thị từ mới chưa học, `Learning` là đang trong quy trình ôn tập FSRS và `Mastered` biểu thị trạng thái ghi nhớ ổn định dựa trên chỉ số độ bền trí nhớ.
        
        Phía Frontend Next.js thực hiện truy vấn danh sách chủ đề kết hợp tiến độ thông qua Server Action trong `src/actions/vocab.ts`:
        ```typescript
        export async function getVocabTopicsWithProgress(userId: string, options: FilterOptions) {
          // Kết hợp thông tin topic với dữ liệu tiến độ của người dùng từ Database
          return apiClient.get<VocabTopicListResponse>('/vocab/topics', { params: options });
        }
        ```
        
        Cấu trúc thực thể lưu trữ tiến độ học từ vựng JPA ánh xạ cơ sở dữ liệu `UserVocabProgress.java`:
        ```java
        @Entity
        @Table(name = "\"UserVocabProgress\"",
               uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "vocabItemId"}))
        @Getter @Setter @NoArgsConstructor @AllArgsConstructor @SuperBuilder
        public class UserVocabProgress extends BaseEntity {
            @Column(nullable = false)
            private String userId;
            @Column(nullable = false)
            private String vocabItemId;
            @Builder.Default
            private int masteryLevel = 0;
            private LocalDateTime lastReviewed;
            private LocalDateTime nextReview;
            
            // Tham số thuật toán FSRS
            @Builder.Default
            private double stability = 0.0;
            @Builder.Default
            private double difficulty = 5.0;
            @Builder.Default
            private int repetitions = 0;
            @Builder.Default
            private int lapses = 0;
            @Builder.Default
            @Enumerated(EnumType.STRING)
            private SrsState srsState = SrsState.NEW;
        }
        ```

*   **4.2.5. Module hệ thống XP và bảng xếp hạng Gamification**
    *   **4.2.5.1. Cơ chế thúc đẩy động lực học tập qua điểm thưởng XP**
        Hệ thống tích hợp các yếu tố trò chơi hóa gamification để khuyến khích người học. Điểm kinh nghiệm XP được tích lũy thông qua các hoạt động thực tế bao gồm hoàn thành bài học từ vựng được cộng 10 XP, thực hiện hội thoại luyện nói AI đạt điểm cao được cộng từ 20 đến 50 XP. Ngoài ra, hệ thống ghi nhận chuỗi ngày học tập liên tục streak và áp dụng phần thưởng chuyên cần đăng nhập hàng ngày nhằm hỗ trợ xây dựng thói quen tự học.
    *   **4.2.5.2. Bảng xếp hạng và tính toán cấp độ động**
        Điểm số của người học được tổng hợp và hiển thị trên bảng xếp hạng Leaderboard theo tuần, tháng và mọi thời đại thông qua `LeaderboardService`. Để tối ưu hóa tốc độ phản hồi của truy vấn, hệ thống thực hiện đánh chỉ mục index trên trường `totalXp` kết hợp lưu trữ bộ nhớ đệm cache. Cấp độ người dùng được xác định động từ tổng XP theo công thức:
        
        $$Level = \lfloor\sqrt{XP / 100}\rfloor$$
        
        Đoạn mã xử lý cộng điểm kinh nghiệm tích hợp cơ chế cộng streak login trong `XpService.java`:
        ```java
        @Transactional
        public XpAwardResult awardXp(String userId, int amount) {
            var stats = findOrCreateProfileStats(userId);
            var today = LocalDate.now();
            boolean isNewDay = !today.equals(stats.getLastStreakDate() != null
                    ? stats.getLastStreakDate().toLocalDate() : null);
            int streakBonus = 0;
            if (isNewDay) {
                boolean isConsecutive = stats.getLastStreakDate() != null
                        && ChronoUnit.DAYS.between(stats.getLastStreakDate().toLocalDate(), today) == 1;
                if (isConsecutive) {
                    stats.setStreak(stats.getStreak() + 1);
                } else {
                    stats.setStreak(1);
                }
                stats.setLastStreakDate(today.atStartOfDay());
                streakBonus = XpDtos.XP_DAILY_LOGIN + (stats.getStreak() * 2);
            }
            int totalAwarded = amount + streakBonus;
            stats.setXp(stats.getXp() + totalAwarded);
            profileStatsRepo.save(stats);
            recordDailyXp(userId, today, totalAwarded);
            return new XpAwardResult(totalAwarded, stats.getXp(), stats.getStreak(), streakBonus, isNewDay);
        }
        ```

**4.3. Vận hành và triển khai đám mây:**

**4.3.1. Container hóa với Docker:**

*   **4.3.1.1. Docker Compose cho môi trường phát triển:**
    Trong giai đoạn phát triển cục bộ Local Development, hệ thống sử dụng công cụ **Docker Compose** để khởi chạy các dịch vụ phụ trợ như cơ sở dữ liệu PostgreSQL 15, giúp đồng bộ cấu hình và phiên bản cơ sở dữ liệu trong môi trường phát triển chung.
    
    Cấu hình tệp di động `docker-compose.yml` phục vụ khởi tạo dịch vụ cơ sở dữ liệu:
    ```yaml
    version: "3.8"
    services:
      postgres:
        image: postgres:15
        container_name: dailyeng-postgres
        environment:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: dailyeng
        ports:
          - "5432:5432"
        volumes:
          - pgdata:/var/lib/postgresql/data
    volumes:
      pgdata:
    ```
    Toàn bộ hệ thống có thể được thiết lập sẵn sàng chỉ thông qua câu lệnh: `docker compose up -d`.

*   **4.3.1.2. Chiến lược đóng gói ứng dụng Dockerfile Multi-stage Build:**
    Để tối ưu dung lượng và hiệu năng vận hành trên đám mây, hệ thống áp dụng chiến lược đóng gói và tối ưu hóa runtime riêng biệt cho từng phân hệ:
    
    *   **Backend:** Ứng dụng Spring Boot được đóng gói thành tệp JAR thực thi thông qua quy trình Dockerfile đa tầng Multi-stage Build. Cơ chế này chia tách độc lập giai đoạn biên dịch bằng Maven và giai đoạn vận hành bằng JRE tinh giản, giúp loại bỏ tệp tin trung gian và giảm thiểu kích thước ảnh Docker. Đồng thời, hệ thống tận dụng Java 21 Virtual Threads cấu hình trong tệp `application.yml` để tối ưu tài nguyên CPU và bộ nhớ trong container, hỗ trợ xử lý số lượng lớn yêu cầu đồng thời với độ trễ thấp.
    *   **Frontend:** Ứng dụng Next.js được biên dịch sang định dạng Standalone Output. Phương pháp này chỉ giữ lại những thành phần thực sự cần thiết của thư mục `node_modules` cho quá trình production, giúp thu gọn kích thước ảnh Docker ở mức tối đa và tăng tốc độ khởi động khi triển khai trên các nền tảng đám mây.

    *Hình 4.1. Sơ đồ quy trình đóng gói đa tầng Multi-stage Build và khởi chạy Docker Container.*
    ```mermaid
    flowchart TD
        subgraph Host ["Máy chủ phát triển - CI-CD Build Server"]
            SourceCode["Mã nguồn Backend Java 21, Spring Boot, Pom.xml"]
        end

        subgraph DockerBuild ["Giai đoạn 1: Đóng gói ứng dụng Build Stage"]
            MavenImg["Docker Image gốc: maven:3.9-eclipse-temurin-21-alpine"]
            MavenBuild["Chạy lệnh: mvn clean package -DskipTests"]
            JarArtifact["Tệp đầu ra: app.jar Fat JAR"]
        end

        subgraph DockerProd ["Giai đoạn 2: Khởi chạy ứng dụng Production Stage"]
            JreImg["Docker Image JRE tinh giản: eclipse-temurin:21-jre-alpine"]
            CopiedJar["Sao chép app.jar sang JRE Image"]
            EntryCmd["Lệnh khởi chạy: java -jar app.jar"]
        end

        subgraph RenderPaaS ["Môi trường chạy thực tế Runtime Environment"]
            ActiveContainer["Docker Container hoạt động cổng 8080"]
            EnvInject["Inject biến môi trường: Database URL, API Keys..."]
        end

        SourceCode -->|1. Docker Build Trigger| MavenImg
        MavenImg -->|2. Biên dịch & Đóng gói| MavenBuild
        MavenBuild -->|3. Tạo tệp Jar| JarArtifact
        JarArtifact -->|4. Copy tệp Jar Multi-stage| CopiedJar
        JreImg --> CopiedJar
        CopiedJar -->|5. Định nghĩa ENTRYPOINT| EntryCmd
        EntryCmd -->|6. Đẩy lên Render VPS| ActiveContainer
        EnvInject -.->|7. Cấu hình Runtime| ActiveContainer
    ```

    Việc tách biệt hai giai đoạn giúp giảm thiểu dung lượng của Container Runtime bằng cách loại bỏ mã nguồn gốc và các công cụ biên dịch. Kích thước Docker Image được rút gọn từ khoảng 820 MB xuống còn 180 MB, hỗ trợ giảm thiểu bề mặt tấn công và tiết kiệm tài nguyên lưu trữ khi triển khai.

**4.3.2. Quy trình tích hợp và triển khai tự động CI/CD:**

*   **4.3.2.1. Tự động hóa kiểm thử Continuous Integration CI:**
    Quy trình kiểm thử tích hợp liên tục được kích hoạt tự động khi lập trình viên tạo Pull Request hoặc thực hiện Push mã nguồn lên kho lưu trữ GitHub. Tệp cấu hình `.github/workflows/pr-check.yml` định nghĩa các bước kiểm tra tự động cho mỗi Pull Request:
    *   **Backend:** Tự động cài đặt JDK 21 phiên bản Temurin, chạy lệnh `mvn compile` để kiểm tra lỗi cú pháp và tính toàn vẹn của các thư viện phụ thuộc.
    *   **Frontend:** Sử dụng Node.js 24, thực hiện lệnh `npm ci`, `npm run lint` và `npm run build` để kiểm tra lỗi TypeScript hoặc lỗi biên dịch.
    Mã nguồn cần vượt qua các bài kiểm thử tự động này trước khi được tích hợp vào nhánh chính.

*   **4.3.2.2. Triển khai liên tục Continuous Deployment CD:**
    Sau khi mã nguồn được tích hợp vào nhánh chính `main`, các dịch vụ đám mây sẽ kích hoạt cơ chế tự động phân phối Auto-deploy trên các nền tảng bao gồm:
    *   **Frontend trên nền tảng Vercel:** Được kết nối trực tiếp với tài khoản Vercel. Mỗi khi có commit mới trên nhánh `main`, Vercel tự động kích hoạt quá trình biên dịch mã nguồn Next.js 15 sang dạng Standalone Output và phân phối tài nguyên tĩnh qua mạng Edge CDN toàn cầu.
    *   **Backend trên đám mây Render:** Triển khai thông qua đóng gói Docker Image và chạy Docker Container trực tiếp trên máy chủ Render. Quá trình triển khai bao gồm việc cập nhật tự động các biến môi trường nhạy cảm như API Keys và DB Credentials thông qua GitHub Secrets. Ứng dụng tận dụng tính năng Virtual Threads của Java 21 để hỗ trợ xử lý hiệu quả các luồng đồng thời.
    *   **Database trên dịch vụ Supabase Cloud:** Cơ sở dữ liệu PostgreSQL 16 được vận hành trên hạ tầng Supabase Cloud, kết nối với Backend thông qua cơ chế Connection Pooling để tối ưu tần suất kết nối.

    *Hình 4.2. Sơ đồ kiến trúc triển khai vật lý hệ thống DailyEng trên hạ tầng đám mây.*
    ```mermaid
    flowchart TD
        subgraph Client ["Client Tier - Môi trường Người dùng"]
            UserBrowser["Trình duyệt Web Chrome, Safari, Edge"]
        end

        subgraph VercelHost ["Frontend Tier Vercel Cloud - PaaS"]
            NextJS["Ứng dụng Next.js 15 React 19"]
            NextEdge["Mạng lưới phân phối tĩnh Edge CDN"]
        end

        subgraph RenderHost ["Backend Tier Render - PaaS Docker Host"]
            DockerCont["Spring Boot Container Java 21 Virtual Threads"]
            Caffeine["Caffeine Cache In-Memory"]
        end

        subgraph DataHost ["Data Tier Supabase - Cloud PostgreSQL"]
            PostgresDB[("Cơ sở dữ liệu PostgreSQL 16")]
        end

        subgraph ServiceTier ["External Services Tier - Dịch vụ bên thứ ba"]
            AzureSpeech["Azure Speech Service STT-TTS-Assessment"]
            GeminiAI["Google Gemini 2.5 Flash API LLM-Grammar"]
            Cloudinary["Cloudinary Cloud Static Assets"]
        end

        %% Các luồng kết nối dữ liệu
        UserBrowser -->|HTTPS / WSS / SSE| NextEdge
        NextEdge --> NextJS
        UserBrowser -->|HTTPS API Requests| DockerCont
        NextJS -->|API Proxy Calls / Server Actions| DockerCont
        
        DockerCont <-->|In-Memory Read/Write| Caffeine
        DockerCont <-->|JDBC Connections / Connection Pool| PostgresDB
        
        DockerCont -->|HTTPS Client Calls| AzureSpeech
        DockerCont -->|HTTPS Client Calls| GeminiAI
        NextJS -->|HTTPS Direct Get/Upload| Cloudinary
    ```

**4.3.3. Giám sát và quản lý lỗi Monitoring & Logging:**

*   **4.3.3.1. Sentry - Giám sát lỗi và hiệu suất thời gian thực:**
    Hệ thống tích hợp Sentry trên cả Frontend và Backend để theo dõi và quản lý lỗi tập trung:
    *   **Capture Errors:** Tự động ghi nhận và gửi thông báo khi có ngoại lệ Exception phát sinh trong quá trình vận hành, đi kèm thông tin chi tiết về stack trace, trạng thái thiết bị và ngữ cảnh của người dùng tại thời điểm xảy ra lỗi.
    *   **Performance Monitoring:** Giám sát thời gian phản hồi của các REST API và các chỉ số Web Vitals của Frontend bao gồm LCP, FID cùng CLS để hỗ trợ tối ưu hóa tốc độ phản hồi.
    *   **Source Maps:** Tự động tải lên bản đồ nguồn Source Maps trong bước xây dựng CI giúp Sentry hiển thị chính xác vị trí lỗi trên mã nguồn gốc TypeScript thay vì mã nguồn đã bị thu gọn.

    ![Hình 4.3. Dashboard giám sát lỗi và hiệu năng Sentry cho Next.js Frontend.](file:///C:/Users/MaiVu/.gemini/antigravity-ide/brain/3f966ec1-3ea9-48ef-9e35-6c1ee1feee9c/.tempmediaStorage/media_3f966ec1-3ea9-48ef-9e35-6c1ee1feee9c_1779380079216.png)
    *Hình 4.3. Dashboard giám sát lỗi của Next.js Frontend.*

    ![Hình 4.4. Các lỗi và ngoại lệ của Spring Boot Backend được cảnh báo trên Sentry.](file:///C:/Users/MaiVu/.gemini/antigravity-ide/brain/3f966ec1-3ea9-48ef-9e35-6c1ee1feee9c/.tempmediaStorage/media_3f966ec1-3ea9-48ef-9e35-6c1ee1feee9c_1779380081333.png)
    *Hình 4.4. Giao diện báo cáo lỗi Backend được ghi nhận trên Sentry.*
    
    Từ đó giúp nhóm phát triển chủ động phát hiện và khắc phục nhanh chóng các sự cố phát sinh trên môi trường thực tế mà không phụ thuộc vào phản hồi từ người dùng, đồng thời tối ưu hóa thời gian sửa lỗi nhờ các thông tin chi tiết về mã nguồn và ngữ cảnh xảy ra lỗi.

*   **4.3.3.2. Spring Boot Actuator:**
    Phía Backend cung cấp các cổng thông tin giám sát trạng thái hoạt động thông qua thư viện `spring-boot-starter-actuator`:
    *   `/api/health`: Kiểm tra trạng thái sẵn sàng hoạt động của hệ thống bao gồm cơ sở dữ liệu PostgreSQL, máy chủ gửi thư và các dịch vụ AI liên kết.
    *   `/api/metrics`: Thu thập thông tin về tài nguyên hệ thống như mức độ sử dụng bộ nhớ JVM, tài nguyên CPU và lưu lượng yêu cầu.
    *   `/api/circuitbreakers`: Theo dõi trạng thái hoạt động đóng hoặc mở của các bộ ngắt mạch Resilience4j đối với các kết nối dịch vụ Azure và Gemini.

**4.3.4. Khả năng phục hồi và Quản lý môi trường:**

*   **4.3.4.1. Resilience4j - Cơ chế Circuit Breaker:**
    Cơ chế ngắt mạch được áp dụng khi giao tiếp với các API bên thứ ba như Azure Speech và Google Gemini để hạn chế rủi ro gián đoạn dịch vụ liên đới:
    *   **Circuit Breaker**: Tự động chuyển sang trạng thái OPEN khi tỷ lệ cuộc gọi lỗi vượt ngưỡng 50% nhằm tránh việc hệ thống bị nghẽn do chờ phản hồi quá lâu.
    *   **Retry với Exponential Backoff**: Thực hiện gửi lại yêu cầu đối với các lỗi mạng tạm thời với thời gian chờ tăng dần theo cấp số nhân, hỗ trợ nâng cao tính ổn định của kết nối.
*   **4.3.4.2. Quản lý cấu hình theo môi trường:**
    Cấu hình hệ thống được linh động hóa thông qua các biến môi trường trong tệp `application.yml`. Các tham số quan trọng như `HIKARI_MAX_POOL_SIZE`, `JWT_SECRET` cùng các khóa API của Google và Azure được quản lý tập trung và bảo mật dưới dạng các biến môi trường, tự động nạp vào ứng dụng khi khởi chạy, cho phép thay đổi cấu hình hệ thống mà không cần sửa đổi mã nguồn.

**4.4. Kiểm thử hệ thống:**
> [!NOTE]
> *Trọng tâm: Minh chứng chất lượng hệ thống qua Unit Test và API Test.*

*   **4.4.1. Kiểm thử tự động Unit Testing:**
    
    **4.4.1.1. Backend Unit Testing**
    *   **Công nghệ sử dụng:** **JUnit 5** đóng vai trò là framework nền tảng để điều phối và thực thi các test case. Kết hợp với **Mockito**, hệ thống tiến hành giả lập mocking các phụ thuộc dependencies như Repositories hoặc các External Services. Điều này giúp quá trình kiểm thử tập trung vào logic của lớp đang xét mà không cần phải kết nối đến cơ sở dữ liệu thực tế. Ngoài ra, **AssertJ** được sử dụng để cung cấp các hàm khẳng định assertions hỗ trợ kiểm tra dữ liệu dễ đọc.
    *   **Chiến lược kiểm thử Service Layer:** Các lớp Service tiêu biểu như `AuthService`, `VocabService` và `SrsService` được kiểm thử bằng cách giả lập toàn bộ lớp Repository. Chiến lược này giúp rút ngắn thời gian thực thi kiểm thử do không tốn thời gian khởi tạo Database, đồng thời cho phép kiểm soát các thiết lập dữ liệu đầu vào Data Setup và kiểm tra việc xử lý ngoại lệ Exception Handling.
    *   **Ví dụ về Mocking trong AuthServiceTest:**
        ```java
        @ExtendWith(MockitoExtension.class)
        class AuthServiceTest {
            @Mock
            private UserRepository userRepository;
            
            @InjectMocks
            private AuthService authService;
        
            @Test
            void registerSuccess() {
                // Setup: Khi tìm email này, trả về trống do tài khoản chưa tồn tại
                when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
                
                // Execute & Verify: Thực hiện đăng ký và kiểm tra kết quả
                var result = authService.register(new RegisterRequest("User", "test@email.com", "Pass123"));
                assertTrue(result.success());
            }
        }
        ```
    *   **Kiểm thử thuật toán lõi:** Thuật toán FSRS `FsrsAlgorithm` được kiểm thử với các bộ dữ liệu toán học Mathematical Test Cases. Việc này nhằm kiểm tra các giá trị `Stability` và `Retrievability` được tính toán phù hợp theo mô hình ghi nhớ của con người.

    **4.4.1.2. Frontend Unit Testing**
    *   **Công nghệ sử dụng:** Dự án sử dụng **Vitest** để thay thế cho Jest, hỗ trợ tích hợp cho TypeScript. Kết hợp với **jsdom** đóng vai trò là môi trường giả lập trình duyệt trên Node.js, hỗ trợ kiểm thử các logic liên quan đến DOM. Ngoài ra, **V8 Coverage** được dùng để đo lường độ bao phủ mã nguồn Code Coverage.
    *   **Kiểm thử logic và Utility:** Hệ thống tập trung kiểm thử các hàm xử lý dữ liệu phức tạp Pure Functions và các lớp tiện ích Utilities ở phía client. Điển hình là việc kiểm thử logic lập lịch ôn tập và tính toán thẻ học trong `src/lib/srs.test.ts`.
    *   **Ví dụ về kiểm thử logic SRS:**
        ```typescript
        // src/lib/srs.test.ts
        describe("getCardsDue", () => {
          it("nên lọc ra các thẻ đã đến hạn và sắp xếp theo thời gian cũ nhất", () => {
            const cardPast = createCard("1", new Date("2024-03-14"));
            const cardFuture = createCard("2", new Date("2024-03-16"));
            
            const results = getCardsDue([cardPast, cardFuture]);
            
            expect(results).toHaveLength(1);
            expect(results[0].id).toBe("1");
          });
        });
        ```
    *   **Lợi ích mang lại:** Việc áp dụng kiểm thử tự động hỗ trợ phát hiện các lỗi logic (như xử lý chuỗi hay tính ngày ôn tập) trong quá trình phát triển, hỗ trợ lập trình viên khi tiến hành tái cấu trúc mã nguồn (Refactoring) bằng cách giảm thiểu các lỗi phát sinh (Regression bugs). Đồng thời, các bản kiểm thử này cũng đóng vai trò như tài liệu kỹ thuật mô tả hoạt động của các hàm trong các trường hợp biên.

*   **4.4.2. Kiểm thử REST API và tích hợp:**
    *   **4.4.2.1. Kiểm thử Module Xác thực qua AuthServiceTest**
        Phân hệ xác thực được kiểm tra qua các kịch bản tích hợp để kiểm định hoạt động của luồng nghiệp vụ:
        *   **Đăng ký tài khoản**: Kiểm tra việc đăng ký tài khoản thành công, mã hóa mật khẩu và xử lý lỗi khi email bị trùng lặp.
        *   **Đăng nhập hệ thống**: Xác thực việc cấp phát chính xác Access Token và Refresh Token cho thông tin đăng nhập hợp lệ.
        *   **Thay đổi mật khẩu**: Kiểm tra logic so khớp mật khẩu cũ và thực thi mã hóa mật khẩu mới.
        *   **Cơ chế chống dò tìm email**: Đảm bảo tính năng chống dò tìm email anti-enumeration hoạt động đúng thiết kế bằng cách phản hồi thành công im lặng ngay cả khi email không tồn tại.
        
        Minh họa kiểm thử xử lý ngoại lệ khi đăng ký trùng email trong `AuthServiceTest.java`:
        ```java
        @Test
        @DisplayName("throws BadRequestException for duplicate email")
        void duplicateEmail() {
            // Setup: Giả lập email đã tồn tại trong database
            when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(createTestUser()));

            var request = new RegisterRequest("Test", EMAIL, "Password1");
            assertThrows(BadRequestException.class, () -> authService.register(request));
        }
        ```

    *   **4.4.2.2. Kiểm thử Module Từ vựng qua VocabServiceTest**
        Các lớp kiểm thử hỗ trợ kiểm tra tính nhất quán dữ liệu và tiến độ học tập của người dùng:
        *   **Tải nhóm chủ đề**: Kiểm tra việc ánh xạ dữ liệu từ Database sang DTO và xử lý định dạng tiêu đề Title Case.
        *   **Hòa trộn tiến độ**: Đảm bảo khi học chủ đề, hệ thống tính toán chính xác mức độ thông thạo Mastery Level dựa trên dữ liệu từ UserVocabProgress.
        *   **Tìm kiếm chủ đề**: Kiểm thử hiệu suất truy vấn cơ sở dữ liệu dựa trên từ khóa tìm kiếm tiếng Anh hoặc tiếng Việt.
        
        Đoạn mã kiểm thử tự động hòa trộn tiến độ người dùng trong `VocabServiceTest.java`:
        ```java
        @Test
        @DisplayName("merges paginated topics with user mastery progress")
        void mergesWithProgress() {
            var topic = buildTopic(TOPIC_ID, "Animals", Level.A1);
            var page = new PageImpl<>(List.of(topic));
            when(topicRepo.findAll(any(Specification.class), any(Pageable.class))).thenReturn(page);

            var vocabItem = buildVocabItem("vi-1", TOPIC_ID);
            when(vocabItemRepo.findByTopicId(TOPIC_ID)).thenReturn(List.of(vocabItem));

            var progress = UserVocabProgress.builder()
                    .userId(USER_ID).vocabItemId("vi-1").masteryLevel(100).build();
            progress.setId("uvp-1");
            when(userVocabProgressRepo.findByUserIdAndVocabItemIdIn(eq(USER_ID), anyList()))
                    .thenReturn(List.of(progress));

            var result = vocabService.getTopicsWithProgress(USER_ID, "en", null, null, null, 1, 12);

            assertEquals(1, result.topics().size());
            assertEquals(100, result.topics().get(0).progress());
        }
        ```

    *   **4.4.2.3. Kiểm thử Thuật toán FSRS qua FsrsAlgorithmTest**
        Kiểm thử thuật toán đóng vai trò kiểm tra hoạt động của mô hình lặp lại ngắt quãng:
        *   **Đường cong quên**: Kiểm tra hàm `retrievability` tính toán xác suất nhớ lại của người học theo công thức toán học, tiệm cận mức $R = 0.9$ tại thời điểm số ngày trôi qua bằng độ bền trí nhớ khi $t = S$.
        *   **Cơ chế lập lịch ôn tập**: Kiểm tra việc chuyển đổi trạng thái thẻ học từ New sang Learning rồi sang Review và sự thay đổi độ ổn định bộ nhớ Stability dựa trên các mức đánh giá Again, Hard, Good, Easy.
        *   **Giới hạn thông số**: Kiểm tra tham số độ khó Difficulty của từ vựng được giới hạn trong khoảng $[1, 10]$ bất kể lịch sử phản hồi.
        
        Đoạn mã kiểm thử độ suy giảm khả năng nhớ theo định nghĩa FSRS trong `FsrsAlgorithmTest.java`:
        ```java
        @Test
        @DisplayName("is ~0.9 at t = stability (by definition)")
        void ninetyPercentAtStability() {
            // Theo định nghĩa: R(S) = (1 + S / (9*S))^(-1) = (1 + 1/9)^(-1) = 0.9
            assertEquals(0.9, FsrsAlgorithm.retrievability(5.0, 5.0), 0.001);
        }
        ```

    *   **4.4.2.4. Bảng tổng hợp kết quả kiểm thử**
        Hệ thống kiểm thử tự động được thực thi với kết quả như sau:

        | Phân hệ | Số lượng Test Case | Trạng thái | Ghi chú |
        | :--- | :--- | :--- | :--- |
        | **Authentication** | 12 | Hoàn thành | Kiểm thử cơ chế JWT, đổi mật khẩu và anti-enumeration |
        | **Vocabulary** | 15 | Hoàn thành | Kiểm thử phân trang, tìm kiếm và hòa trộn tiến độ người dùng |
        | **FSRS Algorithm** | 20 | Hoàn thành | Kiểm tra công thức toán học và lập lịch ôn tập |
        | **AI Speaking** | 8 | Hoàn thành | Giả lập tích hợp và tính điểm có trọng số từ Azure AI Speech |
        | **Tổng cộng** | **55** | **Hoàn thành** | **Hỗ trợ kiểm tra các lỗi logic phát sinh** |

**4.5. Kết quả:**
Hệ thống DailyEng đã được triển khai thử nghiệm trên môi trường Internet. Các mô-đun chức năng được tích hợp thông qua giao diện người dùng. Dưới đây là mô tả kết quả xây dựng các trang giao diện của hệ thống:

*   **4.5.1. Landing page:**
    Trang giới thiệu chính của ứng dụng cung cấp thông tin tổng quan cho người học. Giao diện sử dụng phông chữ Nunito và tông màu chủ đạo xanh da trời Sky 600. Trang web tích hợp hiệu ứng cuộn bằng Framer Motion, hiển thị các thông số thống kê như số lượng người học, số từ vựng ghi nhớ và thời lượng luyện tập trên hệ thống. Đồng thời, trang cung cấp nút liên kết đăng ký tài khoản (CTA).

    ![Hình 4.5. Giao diện trang chủ Landing page của hệ thống DailyEng với phong cách hiện đại.](file:///C:/Users/MaiVu/.gemini/antigravity-ide/brain/3f966ec1-3ea9-48ef-9e35-6c1ee1feee9c/media__1779375501528.png)
    *Hình 4.5. Giao diện trang chủ Landing page của hệ thống DailyEng.*

*   **4.5.2. Đăng nhập, đăng ký:**
    Phân hệ xác thực cung cấp biểu mẫu nhập liệu. Biểu mẫu tích hợp cơ chế kiểm tra lỗi nhập liệu ở phía client sử dụng thư viện React Hook Form kết hợp xác thực Schema bằng Zod để phản hồi khi người dùng nhập sai định dạng. Hệ thống hỗ trợ hai phương thức đăng nhập chính: đăng nhập bằng tài khoản email mật khẩu (được băm bằng thuật toán BCrypt) và đăng nhập thông qua liên kết OAuth2 với Google. Sau khi xác thực thành công, máy chủ cấu hình cặp mã thông báo bảo mật JWT dưới dạng HttpOnly Cookie để duy trì trạng thái đăng nhập.

*   **4.5.3. Speaking room:**
    Đây là phân hệ luyện giao tiếp tiếng Anh trực tiếp với trí tuệ nhân tạo. Người học có thể lựa chọn các kịch bản có sẵn được phân loại theo trình độ CEFR hoặc tự thiết lập một bối cảnh đối thoại tùy biến. Giao diện Speaking Room cung cấp công cụ ghi âm, hỗ trợ chuyển hóa giọng nói của người học thành dữ liệu văn bản và phát nội dung trả lời từ AI. Sau khi kết thúc buổi đối thoại, hệ thống hiển thị bảng phản hồi bao gồm điểm ngữ pháp, vốn từ vựng, độ trôi chảy, độ chính xác phát âm và ngữ điệu. Trang kết quả hiển thị biểu đồ cao độ thời gian thực Pitch Intonation Chart mô tả sự biến thiên của tần số F0, hỗ trợ người học đối chiếu ngữ điệu cá nhân với mô hình chuẩn.

    ![Hình 4.6. Giao diện phòng luyện nói Speaking room và phản hồi chấm điểm phát âm AI.](file:///C:/Users/MaiVu/.gemini/antigravity-ide/brain/3f966ec1-3ea9-48ef-9e35-6c1ee1feee9c/media__1779375508030.png)
    *Hình 4.6. Giao diện phòng luyện nói và chấm điểm phát âm AI.*

*   **4.5.4. Vocabulary hub:**
    Không gian học từ vựng được phân chia theo các nhóm chủ đề. Hệ thống cung cấp hai chế độ rèn luyện: Chế độ học Learn sử dụng thẻ học Flashcard tích hợp thuật toán lặp lại ngắt quãng FSRS, hiển thị thông tin từ vựng bao gồm phiên âm IPA, từ loại, định nghĩa song ngữ, câu ví dụ thực hành và tệp âm thanh phát âm mẫu. Sau mỗi thẻ học, người dùng đánh giá khả năng ghi nhớ theo bốn mức độ để lập lịch ôn tập. Chế độ luyện tập Practice bao gồm các bài tập như viết câu dịch thuật hoặc luyện nói phát âm để củng cố kiến thức.

*   **4.5.5. Grammar hub:**
    Hệ thống lý thuyết ngữ pháp được phân cấp từ cơ bản đến nâng cao. Giao diện học tập được tổ chức dưới dạng các tab thông tin, chia giữa lý thuyết quy tắc ngữ pháp, giải thích và các ví dụ thực hành song ngữ. Đi kèm với mỗi bài học là phần bài tập trắc nghiệm vận dụng Quiz có chấm điểm và giải thích đáp án để hỗ trợ củng cố lý thuyết.

*   **4.5.6. Trợ lý ảo Dorara:**
    Được triển khai dưới dạng một bong bóng trò chuyện tại góc dưới giao diện màn hình. Trợ lý ảo tích hợp mô hình đồ họa 3D tương tác sử dụng WebGL có khả năng chuyển động theo con trỏ chuột. Khi được kích hoạt, Dorara mở ra khung hội thoại kết nối với Google Gemini API. Dorara hỗ trợ giải thích các cấu trúc ngữ pháp, đưa ra định nghĩa từ vựng trong ngữ cảnh cụ thể, hoặc đưa ra các câu hỏi trắc nghiệm nhanh để giúp củng cố kiến thức.

*   **4.5.7. Notebook:**
    Sổ tay lưu giữ từ vựng và quy tắc ngữ pháp mà người học đã đánh dấu hoặc tự tạo. Giao diện cung cấp danh sách từ vựng dưới dạng bảng hiển thị rõ ràng từ loại, nghĩa tiếng Việt và mức độ thông thạo hiện tại. Người học có thể dễ dàng tìm kiếm, lọc từ vựng theo trình độ/mức độ học tập, và tham gia ôn tập bằng thẻ Flashcard để củng cố ghi nhớ lâu dài..

*   **4.5.8. Translate:**
    Phân hệ dịch thuật cung cấp hai tính năng dịch thuật được hỗ trợ bởi trí tuệ nhân tạo:
    *   **Dịch văn bản Text Translate**: Hỗ trợ người dùng dịch thuật các câu hoặc đoạn văn giữa tiếng Anh, tiếng Việt và tiếng Nhật phù hợp với ngữ cảnh.
    *   **SmartLens dịch hình ảnh**: Cho phép người học tải lên hình ảnh chứa văn bản cần dịch. Hệ thống sử dụng dịch vụ Azure AI Vision để nhận diện và trích xuất chữ viết OCR, sau đó tiến hành dịch thuật và hiển thị chữ dịch đè lên vị trí văn bản gốc dựa trên tọa độ nhận diện được.

*   **4.5.9. User & setting:**
    Không gian quản lý tài khoản hiển thị các thông tin cá nhân và số liệu thống kê học tập. Giao diện hiển thị biểu đồ hoạt động dạng lưới ô vuông Activity Heatmap tương tự như hệ thống GitHub để thể hiện tần suất học tập theo ngày. Người dùng có thể theo dõi tổng điểm kinh nghiệm XP tích lũy, cấp độ hiện tại, chuỗi ngày học liên tục streak cao nhất. Ngoài ra, giao diện cài đặt cho phép thiết lập mục tiêu hàng ngày, lựa chọn các giọng đọc như tiếng Anh - Anh, Anh - Mỹ, Anh - Úc hoặc bật/tắt các thông báo nhắc nhở học tập.

---

## CHƯƠNG 5: TỔNG KẾT

**5.1. Kết luận:**
Dự án DailyEng đã hoàn thành xuất sắc mục tiêu xây dựng một ứng dụng học tiếng Anh toàn diện, kết hợp hiệu quả giữa lý thuyết khoa học về trí nhớ và các công nghệ trí tuệ nhân tạo hiện đại. Hệ thống giải quyết triệt để bài toán thiếu môi trường luyện tập giao tiếp thực tế của người học Việt Nam thông qua phòng giao tiếp AI linh hoạt, đồng thời tối ưu hóa thời gian và hiệu quả ghi nhớ từ vựng nhờ thuật toán ôn tập ngắt quãng FSRS-4.5 tiên tiến. DailyEng chứng minh năng lực ứng dụng công nghệ Full-Stack mạnh mẽ và sẵn sàng đưa vào vận hành thực tiễn.

**5.2. Mức độ hoàn thiện:**

*   **5.2.1. Về tính năng sản phẩm:**
    Hệ thống đã hoàn thiện 100% các phân hệ chức năng cốt lõi được vạch ra trong giai đoạn thiết kế ban đầu bao gồm: Speaking Room hỗ trợ giao tiếp và chấm điểm phát âm, Vocabulary Hub cho phép học từ vựng qua Flashcard FSRS, Grammar Hub cung cấp bài học ngữ pháp kèm Quiz, Notebook đóng vai trò sổ tay cá nhân hóa, Translate hỗ trợ dịch văn bản và quét ảnh SmartLens OCR, Dorara AI Companion làm trợ lý ảo 3D hỗ trợ học tập và phân hệ Gamification quản lý thống kê tiến độ, XP, streak cùng bảng xếp hạng.
*   **5.2.2. Về kiến trúc kỹ thuật Backend:**
    Xây dựng thành công hệ thống API RESTful an toàn, vững chắc trên nền tảng Spring Boot 3.4 và Java 21 Virtual Threads. Hệ thống đảm bảo tính toàn vẹn dữ liệu thông qua cơ chế ORM của Spring Data JPA kết hợp quản lý định danh CUID. Triển khai thành công mô hình bảo mật Stateless Authentication sử dụng JWT bảo vệ bằng HttpOnly Cookie, đồng thời tối ưu hóa hiệu năng truy xuất cơ sở dữ liệu nhờ Caffeine Cache và HikariCP Connection Pool.
*   **5.2.3. Về chất lượng mã nguồn và kiểm thử:**
    Mã nguồn của hệ thống được tổ chức khoa học, tuân thủ nghiêm ngặt các nguyên tắc thiết kế sạch Clean Code và mô hình phân tầng chuẩn hóa. Dự án đã xây dựng và thực thi thành công bộ 55 kiểm thử tự động Unit Test toàn diện sử dụng JUnit 5, Mockito ở phía Backend và Vitest ở phía Client, đạt tỷ lệ vượt qua tuyệt đối 100% giúp kiểm soát chặt chẽ lỗi logic và bảo đảm tính bền vững khi cập nhật hệ thống.
*   **5.2.4. Về triển khai và vận hành:**
    Hệ thống được thiết lập quy trình tự động hóa tích hợp và triển khai liên tục CI/CD chuyên nghiệp thông qua GitHub Actions. Triển khai thực tế thành công ứng dụng Frontend Next.js lên Vercel Cloud và Backend Spring Boot dưới dạng Docker Container đa tầng lên nền tảng đám mây Render, kết nối an toàn đến dịch vụ cơ sở dữ liệu Supabase Cloud. Hệ thống được giám sát hiệu năng thời gian thực và quản lý lỗi chủ động thông qua việc tích hợp SDK Sentry cùng các cổng Actuator.

**5.3. Phân tích ưu nhược điểm:**

*   **5.3.1. Ưu điểm:**
    *   **Ứng dụng AI đột phá**: Việc kết hợp nhịp nhàng giữa Azure Speech SDK chấm điểm phát âm chi tiết ở cấp độ âm vị và Google Gemini API phản hồi thông minh tạo ra môi trường luyện nói ảo cực kỳ sinh động và chuẩn xác.
    *   **Thuật toán ôn tập tối ưu cá nhân hóa**: Tích hợp thuật toán FSRS-4.5 tiên tiến nhất hiện nay, đặc biệt là cơ chế chạy ngầm FsrsOptimizer tự động điều chỉnh 17 trọng số đặc trưng thông qua thuật toán Gradient Descent dựa trên lịch sử học thực tế của người dùng.
    *   **Trải nghiệm người dùng vượt trội**: Giao diện được định kiểu nhất quán, phông chữ đẹp mắt, tương thích hoàn toàn với thiết bị di động, kết hợp với các hiệu ứng vi chuyển động mượt mà và nhân vật 3D tương tác tạo cảm hứng tự học mạnh mẽ.
    *   **Hạ tầng đám mây tin cậy**: Kiến trúc Fault-tolerant bền vững nhờ cơ chế Circuit Breaker của Resilience4j giúp hệ thống không bị ảnh hưởng khi các API bên ngoài gặp sự cố.
*   **5.3.2. Nhược điểm:**
    *   **Hiện tượng khởi động nguội (Cold Start)**: Do triển khai Backend trên gói tài nguyên miễn phí của Render, container sẽ tự động rơi vào trạng thái ngủ khi không có yêu cầu truy cập trong thời gian dài, dẫn đến độ trễ phản hồi tăng cao trong lượt gọi đầu tiên khi khởi động lại.
    *   **Phụ thuộc vào kết nối Internet và API bên thứ ba**: Toàn bộ các tính năng thông minh của hệ thống (STT, TTS, LLM) đều yêu cầu kết nối Internet liên tục và phụ thuộc trực tiếp vào tính sẵn sàng của các nhà cung cấp dịch vụ đám mây Microsoft Azure và Google Cloud.

**5.4. Hướng phát triển:**
*   **Tích hợp mô hình ngôn ngữ lớn cục bộ (Local LLM)**: Nghiên cứu tích hợp các mô hình ngôn ngữ nhỏ gọn chạy trực tiếp trên máy chủ hoặc thiết bị của người dùng (như Gemma 2B hoặc Llama 3B) để giảm thiểu chi phí cuộc gọi API và tăng tính bảo mật thông tin.
*   **Mở rộng các tiêu chí đánh giá giọng nói**: Nâng cấp hệ thống chấm điểm phát âm AI để nhận diện sâu hơn các lỗi về nuốt âm, nối âm hoặc nhấn trọng âm từ của người học Việt Nam.
*   **Xây dựng chế độ học ngoại tuyến (Offline Mode)**: Hỗ trợ người học tải xuống trước các chủ đề từ từ vựng và ngữ pháp để tiến hành ôn tập Flashcard ngắt quãng ngay cả khi không có kết nối mạng.
*   **Mở rộng ngôn ngữ rèn luyện**: Nâng cấp kiến trúc lõi để hỗ trợ người dùng học và luyện tập thêm các ngôn ngữ phổ biến khác bên cạnh tiếng Anh như tiếng Nhật, tiếng Trung và tiếng Hàn.

---

## TÀI LIỆU THAM KHẢO

1.  **Fielding, R. T., & Taylor, R. N.** (2002). *Principled design of the modern Web architecture style with framework support*. ACM Transactions on Internet Technology (TOIT), 2(2), 115-150.
2.  **Microsoft Azure Cognitive Services.** (2025). *Speech Service Documentation: Pronunciation Assessment API reference*. Microsoft Learn.
3.  **Google Generative AI.** (2025). *Gemini API Developer Guide and System Instructions*. Google AI Studio.
4.  **Open Spaced Repetition (OSR) Initiative.** (2024). *Free Spaced Repetition Scheduler (FSRS-4.5) mathematical specification and Anki implementation*. GitHub Repository.
5.  **Walls, C.** (2022). *Spring Boot in Action* (5th ed.). Manning Publications.
6.  **React & Next.js Core Team.** (2025). *Next.js 15 App Router Architecture and Server Actions Specification*. Vercel Documentation.
7.  **Sentry Team.** (2025). *Real-time error tracking and application performance monitoring integration guide for Next.js and Spring Boot*. Sentry Docs.
8.  **Resilience4j Authors.** (2024). *Fault tolerance library for Java 8 and Spring Boot reference documentation*. Resilience4j Github.

## PHỤ LỤC (nếu có)
