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
            UC4_2([" Tra cứu mindmap "])
            UC5_1([" Đánh giá phát âm "])
        end

        %% Hỗ trợ và cá nhân hóa
        subgraph HT_HoTro [Phân hệ trợ lý và tiện ích]
            direction TB
            UC7([" Quản lý sổ tay cá nhân "])
            UC8([" Kế hoạch và thống kê "])
            UC9([" Trợ lý ảo Dorara "])
            UC10([" Tra cứu và dịch thuật "])
            UC11([" Nhiệm vụ và huy hiệu "])
            
            %% Extends
            UC10_1([" Dịch hình ảnh SmartLens "])
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

        %% Mối quan hệ Include / Extend chuyên sâu
        UC4 -.->|«extend»| UC4_1
        UC4 -.->|«extend»| UC4_2
        UC5 -.->|«include»| UC5_1
        UC10 -.->|«extend»| UC10_1

        %% Tính thẩm mỹ: Màu Pastel phân loại theo từng hệ thống
        classDef actor fill:#ffe0b2,stroke:#ffb300,stroke-width:2px,color:#e65100;
        classDef ucAccount fill:#e3f2fd,stroke:#64b5f6,stroke-width:2px,color:#0d47a1;
        classDef ucLearning fill:#e8f5e9,stroke:#81c784,stroke-width:2px,color:#1b5e20;
        classDef ucSupport fill:#f3e5f5,stroke:#ba68c8,stroke-width:2px,color:#4a148c;

        class G,U actor;
        class UC1,UC2,UC3 ucAccount;
        class UC4,UC5,UC6,UC4_1,UC4_2,UC5_1 ucLearning;
        class UC7,UC8,UC9,UC10,UC11,UC10_1 ucSupport;

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
*   **3.3.2. Chi tiết các thực thể chính** 
    *   Bảng 1: User
    *   Chi tiết bảng User
    *   Bảng 2: Topic
    *   Chi tiết bảng Topic
    *   Bảng 3: VocabItem
    *   Chi tiết bảng VocabItem
    *   Bảng 4: SpeakingSession
    *   Chi tiết bảng SpeakingSession
*   **3.3.3. Các bảng khác** 

**3.4. Mô hình kiến trúc hệ thống:**
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Trình bày mô hình hoạt động phân tán giữa Client và Backend Server.*
*   **3.4.1. Kiến trúc tổng quan: Mô hình Client – Server** 
    *   3.4.1.1. Phía Client (Frontend Layer)
    *   3.4.1.2. Phía Server (Application Server Layer)
    *   3.4.1.3. Lớp Dữ liệu (Data Tier)
    *   3.4.1.4. Cơ chế tương tác giữa Client và Server
*   **3.4.2. Kiến trúc phân tầng Backend (Layered Architecture)** 
    *   3.4.2.1. Tổng quan về Kiến trúc phân tầng (Layered Architecture)
    *   3.4.2.2. Tầng Trình diễn (Controller Layer)
    *   3.4.2.3. Tầng Nghiệp vụ (Service Layer)
    *   3.4.2.4. Tầng Truy xuất Dữ liệu (Repository Layer)
    *   3.4.2.5. Tầng Thực thể và Truyền tải Dữ liệu (Entity & DTO Layer)
    *   3.4.2.6. Các thành phần bổ trợ (Cross-cutting Concerns)
    *   3.4.2.7. Ưu điểm của kiến trúc

**3.5. Thiết kế hướng đối tượng và Design Pattern:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Phân tích tư duy OOP và các mẫu thiết kế linh hoạt được áp dụng.*
*   **3.5.1. Thiết kế cấu trúc hướng đối tượng**
    *   3.5.1.1. Tính Đóng gói (Encapsulation)
    *   3.5.1.2. Tính Kế thừa (Inheritance)
    *   3.5.1.3. Tính Đa hình (Polymorphism)
    *   3.5.1.4. Thiết kế quan hệ giữa các đối tượng (Object Relationships)
*   **3.5.2. Áp dụng Design Pattern**
    *   1. Mô hình MVC (Model-View-Controller)
    *   2. Repository Pattern
    *   3. Service Layer Pattern
    *   4. DTO Pattern (Data Transfer Object)
    *   5. Facade Pattern (Server Action Layer)
    *   6. Provider Pattern (React Context)
    *   7. Custom Hook Pattern

**3.6. Thiết kế API Protocol và giao thức giao tiếp:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Thiết kế giao thức, chuẩn hóa dữ liệu RESTful và quản lý lỗi.*
*   **3.6.1. Tổng quan kiến trúc giao tiếp** 
*   **3.6.2. Thiết kế RESTful API chuẩn hóa** 
*   **3.6.3. Giao thức xác thực và bảo mật dữ liệu** 
*   **3.6.4. Giao thức Truyền tải Dữ liệu thời gian thực (Server-Sent Events)** 
*   **3.6.5. Cấu trúc Đối tượng Truyền tải dữ liệu (DTO Pattern)** 
*   **3.6.6. Cơ chế Xử lý lỗi và Exception Handling** 
*   **3.6.7. Bảng tổng hợp các API Endpoints hệ thống** 

**3.7. Đặc tả Server Actions và tích hợp dịch vụ bên thứ ba:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Đặc tả chi tiết các hàm xử lý phía Server-side Next.js và tích hợp AI.*
*   **3.7.1. Danh sách Server Action** 
    *   3.7.1.1. Xác thực
    *   3.7.1.2. Quản lý người dùng
    *   3.7.1.3. Speaking
    *   3.7.1.4. Vocabulary
    *   3.7.1.5. Grammar
    *   3.7.1.6. Notebook
    *   3.7.1.7. Bookmark
    *   3.7.1.8. Study Plan
    *   3.7.1.9. Thông báo
    *   3.7.1.10. Các chức năng khác
*   **3.7.2. Tích hợp dịch vụ và API bên thứ ba** 
    *   3.7.2.1. Xác thực Auth.js
    *   3.7.2.2. Upload ảnh đại diện lên Cloudinary

**3.8. Thiết kế Giao diện người dùng:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Sơ đồ trang web (Sitemap) và Wireframe luồng người dùng.*
*   **3.8.1. Sơ đồ trang web**
    *   3.8.1.1. Sơ đồ các giao diện trang tổng quan
    *   3.8.1.2. Sơ đồ giao diện trang Speaking Room
    *   3.8.1.3. Sơ đồ giao diện trang Vocabulary Hub
    *   3.8.1.4. Sơ đồ giao diện trang Grammar Hub
    *   3.8.1.5. Sơ đồ giao diện trang Notebook
    *   3.8.1.6. Sơ đồ giao diện trang Translate
    *   3.8.1.7. Sơ đồ giao diện trang Study Plan
    *   3.8.1.8. Sơ đồ giao diện trang User
*   **3.8.2. Wireframe**
*   **3.8.3. Thiết kế giao diện hoàn chỉnh**
    *   3.8.3.1. Quy định hệ thống màu sắc và font chữ
    *   3.8.3.2. Một số giao diện chính

---

## CHƯƠNG 4: HIỆN THỰC HÓA VÀ TRIỂN KHAI HỆ THỐNG

**4.1. Môi trường phát triển:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Trình bày IDE, bộ công cụ và cấu trúc tổ chức dự án.*
*   **4.1.1. Công cụ soạn thảo mã nguồn**
*   **4.1.2. Công cụ quản lý thư viện**
*   **4.1.3. Cấu trúc thư mục dự án**

**4.2. Hiện thực mã nguồn các module lõi:**
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Cài đặt code Java thực tế cho 5 module quan trọng nhất.*
*   **4.2.1. Module xác thực và phân quyền** 
    *   4.2.1.1. Kiến trúc bảo mật
    *   4.2.1.2. Các thành phần chính
*   **4.2.2. Module luyện phát âm AI** 
    *   4.2.2.1. Phân tích cao độ thời gian thực
    *   4.2.2.2. Đánh giá phát âm chuyên sâu
*   **4.2.3. Module thuật toán FSRS (Spaced Repetition)** 
    *   4.2.3.1. Mô hình toán học
    *   4.2.3.2. Tối ưu hóa cá nhân hóa (Personalization)
*   **4.2.4. Module từ vựng và ngữ pháp (Vocabulary & Grammar)** 
    *   4.2.4.1. Quản lý nội dung phân cấp
    *   4.2.4.2. Theo dõi tiến độ (Learning Progress Tracking)
*   **4.2.5. Module hệ thống XP và bảng xếp hạng (Gamification)** 
    *   4.2.5.1. Cơ chế tính điểm XP
    *   4.2.5.2. Bảng xếp hạng (Leaderboard)

**4.3. Vận hành và triển khai đám mây:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Đóng gói Docker, CI/CD và quy trình giám sát hệ thống.*
*   **4.3.1. Container hóa với Docker**
    *   4.3.1.1. Docker Compose cho môi trường phát triển
    *   4.3.1.2. Chiến lược đóng gói ứng dụng
*   **4.3.2. Quy trình tích hợp và triển khai tự động (CI/CD)**
    *   4.3.2.1. Tự động hóa kiểm thử (Continuous Integration)
    *   4.3.2.2. Triển khai liên tục (Continuous Deployment)
*   **4.3.3. Giám sát và quản lý lỗi (Monitoring & Logging)**
    *   4.3.3.1. Sentry - Giám sát lỗi và hiệu suất thời gian thực
    *   4.3.3.2. Spring Boot Actuator
*   **4.3.4. Khả năng phục hồi và Quản lý môi trường**
    *   4.3.4.1. Resilience4j - Cơ chế Circuit Breaker
    *   4.3.4.2. Quản lý cấu hình theo môi trường

**4.4. Kiểm thử hệ thống:**
> [!NOTE]
> *Trọng tâm: Minh chứng chất lượng hệ thống qua Unit Test và API Test.*

*   **4.4.1. Kiểm thử tự động (Unit Testing):**
    
    **4.4.1.1. Backend Unit Testing**
    *   **Công nghệ sử dụng:** **JUnit 5 (Jupiter)** đóng vai trò là framework nền tảng để điều phối và thực thi các test case. Kết hợp với **Mockito**, hệ thống tiến hành giả lập (mocking) các phụ thuộc (dependencies) như Repositories hoặc các External Services. Điều này giúp quá trình kiểm thử có thể tập trung hoàn toàn vào logic của lớp đang xét mà không cần phải kết nối đến cơ sở dữ liệu thực tế. Ngoài ra, **AssertJ** được sử dụng để cung cấp các hàm khẳng định (assertions) mạnh mẽ và dễ đọc.
    *   **Chiến lược kiểm thử Service Layer:** Các lớp Service (như `AuthService`, `VocabService`, `SrsService`) được kiểm thử bằng cách giả lập toàn bộ lớp Repository. Chiến lược này giúp tăng tốc độ thực thi kiểm thử đáng kể do không tốn thời gian khởi tạo Database, đồng thời cho phép kiểm soát hoàn toàn các kịch bản dữ liệu đầu vào (Data Setup) và kiểm tra việc xử lý ngoại lệ (Exception Handling) một cách chính xác.
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
                // Setup: Khi tìm email này, trả về trống (chưa tồn tại)
                when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
                
                // Execute & Verify: Thực hiện đăng ký và kiểm tra kết quả
                var result = authService.register(new RegisterRequest("User", "test@email.com", "Pass123"));
                assertTrue(result.success());
            }
        }
        ```
    *   **Kiểm thử thuật toán lõi:** Thuật toán FSRS (`FsrsAlgorithm`) được kiểm thử cực kỳ chi tiết với các bộ dữ liệu toán học (Mathematical Test Cases). Việc này nhằm đảm bảo các giá trị `Stability` và `Retrievability` luôn tính toán chuẩn xác và tuân thủ chặt chẽ mô hình ghi nhớ của con người.

    **4.4.1.2. Frontend Unit Testing**
    *   **Công nghệ sử dụng:** Dự án sử dụng **Vitest** để thay thế cho Jest, mang lại hiệu suất vượt trội và hỗ trợ tích hợp rất tốt cho TypeScript. Kết hợp với **jsdom** đóng vai trò là môi trường giả lập trình duyệt trên Node.js, cho phép kiểm thử các logic liên quan đến DOM (nếu có). Ngoài ra, **V8 Coverage** được dùng để đo lường độ bao phủ mã nguồn (Code Coverage).
    *   **Kiểm thử logic và Utility:** Hệ thống tập trung kiểm thử các hàm xử lý dữ liệu phức tạp (Pure Functions) và các lớp tiện ích (Utilities) ở phía client. Điển hình là việc kiểm thử logic lập lịch ôn tập và tính toán thẻ học trong `src/lib/srs.test.ts`.
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
    *   **Lợi ích mang lại:** Việc áp dụng kiểm thử tự động toàn diện mang lại rất nhiều giá trị: giúp phát hiện lỗi sớm (các lỗi logic về xử lý chuỗi hay tính ngày ôn tập được bắt ngay trong quá trình phát triển), tạo sự tự tin khi tái cấu trúc mã nguồn (Refactoring) vì bộ test suite sẽ đóng vai trò như lưới an toàn chống Regression bugs. Đồng thời, chính các bản kiểm thử này cũng đóng vai trò như một tài liệu hóa sống động bằng mã nguồn, hướng dẫn rõ cách các hàm hoạt động trong từng điều kiện biên khác nhau.

*   **4.4.2. Kiểm thử REST API & tích hợp:** 
    > [!NOTE]
    > *Nguồn: report new.md | Trọng tâm: Bằng chứng kiểm thử API qua Postman và Swagger.*
    *   4.4.2.1. Kiểm thử Module Xác thực (AuthServiceTest)
    *   4.4.2.2. Kiểm thử Module Từ vựng (VocabServiceTest)
    *   4.4.2.3. Kiểm thử Thuật toán FSRS (FsrsAlgorithmTest)
    *   4.4.2.4. Bảng tổng hợp kết quả kiểm thử

**4.5. Kết quả:**
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Trình bày hình ảnh và luồng UX/UI hoàn chỉnh của hệ thống thực tế.*
*   **4.5.1. Landing page**
*   **4.5.2. Đăng nhập, đăng ký**
*   **4.5.3. Speaking room**
*   **4.5.4. Vocabulary hub**
*   **4.5.5. Grammar hub**
*   **4.5.6. Trợ lý ảo Dorara**
*   **4.5.7. Notebook**
*   **4.5.8. Translate**
*   **4.5.9. User & setting**

---

## CHƯƠNG 5: TỔNG KẾT

**5.1. Kết luận:** 
> [!NOTE]
> *Trọng tâm: Tóm tắt lại giá trị dự án mang lại.*

**5.2. Mức độ hoàn thiện:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Đánh giá những gì đã làm được.*
*   **5.2.1. Về tính năng sản phẩm**
*   **5.2.2. Về kiến trúc kỹ thuật Backend**
*   **5.2.3. Về chất lượng mã nguồn và kiểm thử**
*   **5.2.4. Về triển khai và vận hành**

**5.3. Phân tích ưu nhược điểm:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Đánh giá khách quan sức mạnh và hạn chế của hệ thống.*
*   **5.3.1. Ưu điểm**
*   **5.3.2. Nhược điểm**

**5.4. Hướng phát triển:** 
> [!NOTE]
> *Nguồn: report new.md | Trọng tâm: Các tính năng hoặc công nghệ sẽ nâng cấp trong tương lai.*

---

## TÀI LIỆU THAM KHẢO

## PHỤ LỤC (nếu có)
