import { PrismaClient, Level, PartOfSpeech } from "@prisma/client";

const prisma = new PrismaClient();

const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

// Helper to create vocab item
const v = (
  word: string,
  phonBr: string,
  phonNAm: string,
  meaning: string,
  vietnameseMeaning: string,
  partOfSpeech: PartOfSpeech,
  exampleSentence: string,
  exampleTranslation: string,
  synonyms: string[] = [],
  antonyms: string[] = [],
  collocations: string[] = []
) => ({
  word,
  phonBr,
  phonNAm,
  meaning,
  vietnameseMeaning,
  partOfSpeech,
  exampleSentence,
  exampleTranslation,
  synonyms,
  antonyms,
  collocations,
});

// ============================================
// TOPIC GROUP 7: EDUCATION
// ============================================

const educationVocab = {
  "School Life": {
    A1: [
      v("class", "/klɑːs/", "/klæs/", "a group of students who are taught together", "lớp học", "noun", "I am in a big class.", "Tôi đang ở trong một lớp học lớn.", ["group", "course"], [], ["attend class", "start class"]),
      v("book", "/bʊk/", "/bʊk/", "a set of printed pages held together in a cover", "sách", "noun", "Please open your book to page ten.", "Làm ơn hãy mở sách của bạn ra trang mười.", ["textbook"], [], ["read a book", "open a book"]),
      v("study", "/ˈstʌdi/", "/ˈstʌdi/", "to learn about a subject", "học", "verb", "I study English at school.", "Tôi học tiếng Anh ở trường.", ["learn", "examine"], [], ["study hard", "study English"]),
      v("teacher", "/ˈtiːtʃə(r)/", "/ˈtiːtʃər/", "a person who teaches at a school", "Giáo viên của tôi rất tốt bụng.", "noun", "My teacher is very kind.", "", ["instructor", "tutor"], ["student"], ["meet the teacher", "ask the teacher"]),
      v("test", "/test/", "/test/", "an examination of someone's knowledge", "bài kiểm tra", "noun", "We have a math test today.", "Chúng tôi có một bài kiểm tra toán hôm nay.", ["exam", "quiz"], [], ["take a test", "pass a test"]),
      v("read", "/riːd/", "/riːd/", "to look at and understand written words", "đọc", "verb", "Can you read this word?", "Bạn có thể đọc từ này không?", ["peruse"], [], ["read a book", "read aloud"]),
      v("write", "/raɪt/", "/raɪt/", "to mark letters or words on paper", "viết", "verb", "Please write your name here.", "Làm ơn viết tên của bạn vào đây.", ["record", "compose"], [], ["write down", "write a sentence"]),
      v("school", "/skuːl/", "/skuːl/", "a place where children go to learn", "trường học", "noun", "I go to school by bus.", "Tôi đi học bằng xe buýt.", ["academy", "institution"], [], ["go to school", "at school"]),
    ],
    A2: [
      v("subject", "/ˈsʌbdʒɪkt/", "/ˈsʌbdʒɪkt/", "an area of knowledge studied at school", "môn học", "noun", "My favorite school subject is mathematics.", "Môn học yêu thích của tôi ở trường là toán.", ["discipline"], [], ["school subject", "favorite subject"]),
      v("uniform", "/ˈjuːnɪfɔːm/", "/ˈjuːnɪfɔːrm/", "a special set of clothes worn by all students at a school", "đồng phục", "noun", "All students must wear a school uniform.", "Tất cả học sinh phải mặc đồng phục trường.", ["outfit"], [], ["school uniform", "wear a uniform"]),
      v("grade", "/ɡreɪd/", "/ɡreɪd/", "a mark or score given to a student's work", "điểm số", "noun", "She got a good grade on her English test.", "Cô ấy đạt điểm cao trong bài kiểm tra tiếng Anh.", ["mark", "score"], [], ["get a grade", "good grade"]),
      v("homework", "/ˈhəʊmwɜːk/", "/ˈhoʊmwɜːrk/", "work that a student is given to do at home", "bài tập về nhà", "noun", "I usually finish my homework after dinner.", "Tôi thường làm xong bài tập về nhà sau bữa tối.", ["assignment"], [], ["do homework", "finish homework"]),
      v("semester", "/sɪˈmestə(r)/", "/səˈmestər/", "one of the two periods that a school year is divided into", "học kỳ", "noun", "The first semester ends in December.", "Học kỳ đầu tiên kết thúc vào tháng 12.", ["term"], [], ["first semester", "second semester"]),
      v("break", "/breɪk/", "/breɪk/", "a short period of time when students stop working and rest", "giờ ra chơi", "noun", "We play soccer during the break.", "Chúng tôi chơi đá bóng trong giờ ra chơi.", ["recess"], [], ["lunch break", "short break"]),
      v("graduate", "/ˈɡrædʒueɪt/", "/ˈɡrædʒueɪt/", "to complete a course of study at a school or college", "tốt nghiệp", "verb", "He will graduate from high school next year.", "Anh ấy sẽ tốt nghiệp trung học vào năm tới.", ["finish school"], [], ["graduate from", "graduate school"]),
      v("difficult", "/ˈdɪfɪkəlt/", "/ˈdɪfɪkəlt/", "needing effort or skill to do or understand", "khó", "adjective", "The history test was very difficult.", "Bài kiểm tra lịch sử rất khó.", ["hard", "tough"], ["easy"], ["difficult subject", "very difficult"]),
      v("absent", "/ˈæbsənt/", "/ˈæbsənt/", "not at school when you should be there", "vắng mặt", "adjective", "She was absent from class because of a cold.", "Cô ấy vắng mặt trong lớp vì bị cảm lạnh.", ["away"], ["present"], ["absent from", "mark absent"]),
    ],
    B1: [
      v("assignment", "/əˈsaɪnmənt/", "/əˈsaɪnmənt/", "a task or piece of work allocated to someone as part of a course of study", "bài tập, nhiệm vụ", "noun", "I have to finish my history assignment before the deadline tomorrow.", "Tôi phải hoàn thành bài tập lịch sử trước hạn chót ngày mai.", ["homework", "task"], [], ["hand in an assignment", "complete an assignment"]),
      v("attendance", "/əˈtendəns/", "/əˈtendəns/", "the action or state of going regularly to or being present at a place or event", "sự tham dự, điểm danh", "noun", "Poor attendance can affect your final grade in this class.", "Việc đi học không chuyên cần có thể ảnh hưởng đến điểm tổng kết của bạn trong lớp này.", ["presence"], ["absence"], ["check attendance", "compulsory attendance"]),
      v("enroll", "/ɪnˈrəʊl/", "/ɪnˈroʊl/", "to officially register as a member of an institution or a student on a course", "ghi danh, đăng ký nhập học", "verb", "She decided to enroll in an advanced English course this semester.", "Cô ấy quyết định đăng ký một khóa học tiếng Anh nâng cao vào học kỳ này.", ["register", "sign up"], ["withdraw"], ["enroll in a course", "enroll at a university"]),
      v("lecture", "/ˈlektʃə(r)/", "/ˈlektʃər/", "an educational talk to an audience, especially one of students in a university", "bài giảng", "noun", "The professor gave a fascinating lecture on modern history.", "Giáo sư đã có một bài giảng rất thú vị về lịch sử hiện đại.", ["talk", "presentation"], [], ["attend a lecture", "give a lecture"]),
      v("revise", "/rɪˈvaɪz/", "/rɪˈvaɪz/", "to study again something you have already learned, in preparation for an exam", "ôn tập", "verb", "I need to revise for my biology test all weekend.", "Tôi cần phải ôn tập cho bài kiểm tra sinh học cả cuối tuần.", ["review", "study"], [], ["revise for an exam", "thoroughly revise"]),
      v("tuition", "/tjuˈɪʃn/", "/tuˈɪʃn/", "the money paid for instruction at a school or college", "học phí", "noun", "The university decided to increase tuition fees for international students.", "Trường đại học đã quyết định tăng học phí cho sinh viên quốc tế.", ["fees", "schooling cost"], [], ["pay tuition", "tuition fees"]),
      v("undergraduate", "/ˌʌndəˈɡrædʒuət/", "/ˌʌndərˈɡrædʒuət/", "a student at a college or university who has not yet earned a bachelor's or equivalent degree", "sinh viên đại học (chưa tốt nghiệp)", "noun", "Most undergraduate students live in dormitories on campus.", "Hầu hết sinh viên đại học sống trong ký túc xá trong khuôn viên trường.", ["student"], ["postgraduate"], ["undergraduate degree", "undergraduate student"]),
    ],
    B2: [
      v("curriculum", "/kəˈrɪkjələm/", "/kəˈrɪkjələm/", "The subjects comprising a course of study in a school or college.", "chương trình giảng dạy", "noun", "The school is planning to update its curriculum to include more digital literacy skills.", "Nhà trường đang lên kế hoạch cập nhật chương trình giảng dạy để bao gồm nhiều kỹ năng kỹ thuật số hơn.", ["syllabus", "course of study"], [], ["school curriculum", "national curriculum"]),
      v("extracurricular", "/ˌekstrəkəˈrɪkjələ(r)/", "/ˌekstrəkəˈrɪkjələr/", "Activities initiated or conducted by students outside the regular curriculum.", "ngoại khóa", "adjective", "Participating in extracurricular activities helps students develop teamwork and leadership skills.", "Tham gia vào các hoạt động ngoại khóa giúp học sinh phát triển kỹ năng làm việc nhóm và lãnh đạo.", ["after-school", "outside the classroom"], ["curricular"], ["extracurricular activities", "extracurricular clubs"]),
      v("academic", "/ˌækəˈdemɪk/", "/ˌækəˈdemɪk/", "Relating to education and scholarship.", "thuộc về học tập/học thuật", "adjective", "The student showed great academic improvement after attending extra classes.", "Học sinh đó đã cho thấy sự tiến bộ rõ rệt trong học tập sau khi tham gia các lớp học thêm.", ["educational", "scholastic"], ["non-academic"], ["academic performance", "academic achievement"]),
      v("procrastinate", "/prəˈkræstɪneɪt/", "/proʊˈkræstɪneɪt/", "To delay or postpone action; put off doing something.", "trì hoãn", "verb", "Students often procrastinate when they have difficult assignments to complete.", "Học sinh thường trì hoãn khi họ có những bài tập khó cần hoàn thành.", ["delay", "dally"], ["prioritize"], ["tend to procrastinate", "procrastinate on work"]),
      v("scholarship", "/ˈskɒləʃɪp/", "/ˈskɑːlərʃɪp/", "A grant or payment made to support a student's education.", "học bổng", "noun", "She was awarded a scholarship because of her outstanding academic results.", "Cô ấy đã được trao học bổng nhờ vào kết quả học tập xuất sắc của mình.", ["grant", "bursary"], [], ["win a scholarship", "apply for a scholarship"]),
      v("cram", "/kræm/", "/kræm/", "To study intensively over a short period of time just before an examination.", "học nhồi nhét", "verb", "It is better to review your notes regularly than to cram the night before the exam.", "Tốt hơn hết là hãy ôn tập ghi chú thường xuyên thay vì học nhồi nhét vào đêm trước kỳ thi.", ["study intensely", "swot"], [], ["cram for an exam", "cramming session"]),
      v("peer", "/pɪə(r)/", "/pɪr/", "A person of the same age, status, or ability as another specified person.", "bạn đồng trang lứa", "noun", "Peer pressure can often influence the academic habits of teenagers.", "Áp lực từ bạn bè đồng trang lứa thường có thể ảnh hưởng đến thói quen học tập của thanh thiếu niên.", ["classmate", "contemporary"], [], ["peer pressure", "peer review"]),
    ],
    C1: [
      v("pedagogy", "/ˈpedəɡɒdʒi/", "/ˈpedəɡɑːdʒi/", "The method and practice of teaching, especially as an academic subject or theoretical concept.", "Phương pháp sư phạm", "noun", "The university is renowned for its innovative pedagogy, focusing on collaborative learning rather than rote memorization.", "Trường đại học này nổi tiếng với phương pháp sư phạm đổi mới, tập trung vào học tập hợp tác thay vì học vẹt.", ["teaching methods", "instructional theory"], [], ["modern pedagogy", "effective pedagogy"]),
      v("matriculate", "/məˈtrɪkjuleɪt/", "/məˈtrɪkjuleɪt/", "To be enrolled at a college or university.", "Nhập học (đại học)", "verb", "After graduating from high school, he plans to matriculate at a prestigious university abroad.", "Sau khi tốt nghiệp trung học, anh ấy dự định nhập học tại một trường đại học danh tiếng ở nước ngoài.", ["enroll", "register"], ["graduate"], ["matriculate at", "matriculate into"]),
      v("seminar", "/ˈsemɪnɑː(r)/", "/ˈsemɪnɑːr/", "A conference or other meeting for discussion or training, usually involving a small group.", "Hội thảo chuyên đề", "noun", "The professor led a weekly seminar where students analyzed complex historical texts in depth.", "Giáo sư đã chủ trì một buổi hội thảo hàng tuần, nơi sinh viên phân tích sâu các văn bản lịch sử phức tạp.", ["workshop", "tutorial"], [], ["attend a seminar", "lead a seminar"]),
      v("vocational", "/vəˈkeɪʃənl/", "/voʊˈkeɪʃənl/", "Relating to an occupation or employment, often referring to practical skill-based training.", "Thuộc về nghề nghiệp/dạy nghề", "adjective", "The government is increasing funding for vocational training to address the shortage of skilled technicians.", "Chính phủ đang tăng ngân sách cho đào tạo nghề để giải quyết tình trạng thiếu hụt kỹ thuật viên lành nghề.", ["occupational", "technical"], ["academic"], ["vocational training", "vocational school"]),
      v("accreditation", "/əˌkredɪˈteɪʃn/", "/əˌkredɪˈteɪʃn/", "The action or process of officially recognizing someone as having a particular status or being qualified to perform a particular activity.", "Sự kiểm định chất lượng", "noun", "The university sought international accreditation to boost the value of its degrees in the global market.", "Trường đại học đã tìm kiếm sự kiểm định quốc tế để nâng cao giá trị bằng cấp của mình trên thị trường toàn cầu.", ["certification", "authorization"], [], ["seek accreditation", "maintain accreditation"]),
    ],
    C2: [
      v("erudition", "/ˌer.jʊˈdɪʃ.ən/", "/ˌer.jəˈdɪʃ.ən/", "The quality of having or showing great knowledge or learning.", "Sự uyên bác", "noun", "His erudition in classical literature made him an invaluable asset to the research department.", "Sự uyên bác của ông ấy về văn học cổ điển đã khiến ông trở thành một tài sản vô giá đối với bộ phận nghiên cứu.", ["scholarship", "learning"], ["ignorance"], ["deep erudition", "academic erudition"]),
      v("explicate", "/ˈek.splɪ.keɪt/", "/ˈek.splə.keɪt/", "To analyze and develop an idea or principle in detail.", "Giải thích chi tiết", "verb", "The professor took the entire lecture to explicate the nuances of the complex philosophical text.", "Vị giáo sư đã dành toàn bộ buổi giảng để giải thích chi tiết các sắc thái của văn bản triết học phức tạp.", ["elucidate", "clarify"], ["obfuscate"], ["explicate a theory", "explicate a text"]),
      v("didactic", "/daɪˈdæk.tɪk/", "/daɪˈdæk.tɪk/", "Intended to teach, particularly in having moral instruction as an ulterior motive.", "Có tính giáo huấn", "adjective", "The fable served a didactic purpose, teaching young students about the consequences of dishonesty.", "Câu chuyện ngụ ngôn phục vụ một mục đích giáo huấn, dạy cho học sinh nhỏ tuổi về hậu quả của sự không trung thực.", ["instructive", "edifying"], [], ["didactic approach", "didactic literature"]),
      v("exegesis", "/ˌek.sɪˈdʒiː.sɪs/", "/ˌek.səˈdʒiː.sɪs/", "Critical explanation or interpretation of a text, especially of scripture.", "Phân tích, chú giải văn bản", "noun", "The scholar provided a rigorous exegesis of the ancient manuscript to uncover its hidden meanings.", "Học giả đã cung cấp một bản chú giải nghiêm ngặt về bản thảo cổ để khám phá những ý nghĩa ẩn giấu của nó.", ["interpretation", "analysis"], [], ["textual exegesis", "rigorous exegesis"]),
      v("recapitulate", "/ˌriː.kəˈpɪt.jʊ.leɪt/", "/ˌriː.kəˈpɪtʃ.ə.leɪt/", "To summarize and state again the main points of.", "Tóm tắt lại", "verb", "At the end of the seminar, the moderator will recapitulate the key findings of the research project.", "Vào cuối buổi hội thảo, người điều phối sẽ tóm tắt lại những phát hiện chính của dự án nghiên cứu.", ["summarize", "reiterate"], [], ["recapitulate the main points", "briefly recapitulate"]),
      v("pedantic", "/pəˈdæn.tɪk/", "/pəˈdæn.t̬ɪk/", "Excessively concerned with minor details and rules or with displaying academic learning.", "Máy móc, giáo điều", "adjective", "His pedantic obsession with grammar rules often distracted from the creative spirit of his students' writing.", "Sự ám ảnh giáo điều của ông ấy đối với các quy tắc ngữ pháp thường làm xao nhãng tinh thần sáng tạo trong bài viết của học sinh.", ["scrupulous", "dogmatic"], [], ["pedantic detail", "pedantic manner"]),
      v("seminarian", "/ˌsem.ɪˈneə.ri.ən/", "/ˌsem.əˈner.i.ən/", "A student in a seminary, especially one studying to become a priest or minister.", "Sinh viên chủng viện", "noun", "The young seminarian spent his mornings in deep contemplation and his afternoons studying theology.", "Chàng sinh viên chủng viện trẻ tuổi dành buổi sáng để suy ngẫm sâu sắc và buổi chiều để nghiên cứu thần học.", ["theology student", "novice"], [], ["aspiring seminarian", "devout seminarian"]),
      v("interdisciplinary", "/ˌɪn.təˈdɪs.ə.plɪ.nər.i/", "/ˌɪn.t̬ɚˈdɪs.ə.plə.ner.i/", "Relating to more than one branch of knowledge.", "Liên ngành", "adjective", "The course is highly interdisciplinary, drawing on insights from psychology, sociology, and economics.", "Khóa học này mang tính liên ngành cao, rút ra những hiểu biết từ tâm lý học, xã hội học và kinh tế học.", ["cross-disciplinary", "multidisciplinary"], ["specialized"], ["interdisciplinary research", "interdisciplinary approach"]),
    ],
  },
  "Higher Education": {
    A1: [
      v("exam", "/ɪɡˈzæm/", "/ɪɡˈzæm/", "a formal test of knowledge or ability", "kỳ thi", "noun", "The final exam is very difficult.", "Kỳ thi cuối kỳ rất khó.", ["test", "assessment"], [], ["take an exam", "pass an exam"]),
      v("student", "/ˈstjuːdnt/", "/ˈstuːdnt/", "a person who is studying at a school or college", "sinh viên", "noun", "She is a student at the university.", "Cô ấy là sinh viên tại trường đại học.", ["learner", "pupil"], ["teacher"], ["university student", "international student"]),
      v("note", "/nəʊt/", "/noʊt/", "a short piece of information written down to help you remember something", "ghi chú", "noun", "I take notes during the lecture.", "Tôi ghi chú trong suốt bài giảng.", ["record", "jotting"], [], ["take notes", "make notes"]),
      v("easy", "/ˈiːzi/", "/ˈiːzi/", "not difficult; needing little effort", "dễ", "adjective", "This homework is very easy.", "Bài tập về nhà này rất dễ.", ["simple", "effortless"], ["difficult"], ["easy task", "easy test"]),
      v("pass", "/pɑːs/", "/pæs/", "to succeed in an examination or test", "đỗ, vượt qua", "verb", "I want to pass my university exam.", "Tôi muốn vượt qua kỳ thi đại học của mình.", ["succeed", "qualify"], ["fail"], ["pass a test", "pass a course"]),
    ],
    A2: [
      v("university", "/ˌjuːnɪˈvɜːsəti/", "/ˌjuːnɪˈvɜːrsəti/", "an educational institution for advanced studies", "trường đại học", "noun", "She wants to study medicine at university.", "Cô ấy muốn học y tại trường đại học.", ["college"], [], ["attend university", "go to university"]),
      v("course", "/kɔːs/", "/kɔːrs/", "a series of lessons or lectures on a particular subject", "khóa học", "noun", "I am taking an English course this semester.", "Tôi đang tham gia một khóa học tiếng Anh trong học kỳ này.", ["class", "program"], [], ["take a course", "enroll in a course"]),
      v("campus", "/ˈkæmpəs/", "/ˈkæmpəs/", "the grounds and buildings of a university", "khuôn viên trường", "noun", "The university campus is very beautiful.", "Khuôn viên trường đại học rất đẹp.", ["grounds"], [], ["on campus", "campus life"]),
      v("professor", "/prəˈfesə(r)/", "/prəˈfesər/", "a high-ranking teacher at a university", "giáo sư", "noun", "The professor is very kind to the students.", "Giáo sư rất tốt bụng với các sinh viên.", ["lecturer", "teacher"], ["student"], ["university professor", "meet the professor"]),
    ],
    B1: [
      v("tutor", "/ˈtjuːtə(r)/", "/ˈtuːtər/", "a person who gives private instruction to a student", "gia sư, người hướng dẫn", "noun", "My math tutor helped me understand complex equations.", "Gia sư toán đã giúp tôi hiểu các phương trình phức tạp.", ["instructor", "coach"], [], ["private tutor", "academic tutor"]),
    ],
    B2: [
      v("dissertation", "/ˌdɪsəˈteɪʃn/", "/ˌdɪsərˈteɪʃn/", "A long essay on a particular subject, especially one written for a university degree.", "Luận văn", "noun", "He spent months researching his final year dissertation.", "Anh ấy đã dành nhiều tháng để nghiên cứu cho luận văn năm cuối của mình.", ["thesis"], [], ["write a dissertation", "submit a dissertation"]),
      v("faculty", "/ˈfæklti/", "/ˈfæklti/", "A department or group of departments in a college or university specializing in a particular field.", "Khoa (trong trường đại học)", "noun", "The faculty of science is hosting a conference next month.", "Khoa khoa học sẽ tổ chức một hội nghị vào tháng tới.", ["department", "school"], [], ["faculty member", "the Faculty of Arts"]),
      v("prerequisite", "/ˌpriːˈrekwɪzɪt/", "/ˌpriːˈrekwɪzɪt/", "A thing that is required as a prior condition for something else to happen or exist.", "Điều kiện tiên quyết", "noun", "Mathematics is a prerequisite for taking this physics course.", "Toán học là điều kiện tiên quyết để tham gia khóa học vật lý này.", ["requirement", "necessity"], ["elective"], ["meet a prerequisite", "course prerequisite"]),
    ],
    C1: [
      v("rigorous", "/ˈrɪɡ.ər.əs/", "/ˈrɪɡ.ɚ.əs/", "extremely thorough, exhaustive, or accurate", "nghiêm ngặt, chặt chẽ", "adjective", "The university maintains a rigorous academic standard that challenges even the most talented students.", "Trường đại học duy trì một tiêu chuẩn học thuật nghiêm ngặt thách thức cả những sinh viên tài năng nhất.", ["thorough", "exacting"], ["lax"], ["rigorous academic standards", "rigorous analysis"]),
    ],
    C2: [
      v("postgraduate", "/ˌpəʊstˈɡrædʒ.u.ət/", "/ˌpoʊstˈɡrædʒ.u.ət/", "A person who has completed a first degree and is studying for a more advanced degree.", "Sau đại học", "noun", "The library provides dedicated resources for postgraduate students writing their dissertations.", "Thư viện cung cấp các tài nguyên chuyên biệt dành cho sinh viên sau đại học đang viết luận án của họ.", ["graduate student"], ["undergraduate"], ["postgraduate degree", "postgraduate study"]),
      v("epistemological", "/ɪˌpɪs.tə.məˈlɒdʒ.ɪ.kəl/", "/ɪˌpɪs.tə.məˈlɑː.dʒɪ.kəl/", "Relating to the theory of knowledge, especially with regard to its methods, validity, and scope.", "Thuộc về nhận thức luận", "adjective", "His thesis challenges the epistemological foundations of modern social sciences.", "Luận án của anh ấy thách thức các nền tảng nhận thức luận của các ngành khoa học xã hội hiện đại.", ["philosophical", "cognitive"], [], ["epistemological framework", "epistemological basis"]),
      v("adjunct", "/ˈædʒ.ʌŋkt/", "/ˈædʒ.ʌŋkt/", "A person who is employed at a college or university on a temporary or auxiliary basis.", "Giảng viên thỉnh giảng", "noun", "The university relies heavily on adjunct faculty to teach introductory courses.", "Trường đại học dựa nhiều vào đội ngũ giảng viên thỉnh giảng để giảng dạy các khóa học nhập môn.", ["visiting lecturer", "part-time instructor"], ["tenured professor"], ["adjunct professor", "adjunct faculty"]),
    ],
  },
  "Exams & Tests": {
    A1: [
      v("fail", "/feɪl/", "/feɪl/", "to not be successful in an exam", "trượt, không đạt", "verb", "Do not worry if you fail the test.", "Đừng lo lắng nếu bạn trượt bài kiểm tra.", ["flunk"], ["pass"], ["fail a test", "fail an exam"]),
      v("mark", "/mɑːk/", "/mɑːrk/", "a number or letter showing how well you did", "điểm số", "noun", "I got a high mark on my test.", "Tôi đã nhận được điểm cao trong bài kiểm tra của mình.", ["grade", "score"], [], ["get a mark", "high mark"]),
      v("hard", "/hɑːd/", "/hɑːrd/", "difficult to do or understand", "khó", "adjective", "That was a hard exam.", "Đó là một bài thi khó.", ["difficult", "tough"], ["easy"], ["hard test", "hard question"]),
      v("question", "/ˈkwes.tʃən/", "/ˈkwes.tʃən/", "a sentence asking for information", "câu hỏi", "noun", "There are ten questions on the test.", "Có mười câu hỏi trong bài kiểm tra.", ["inquiry", "query"], ["answer"], ["answer a question", "difficult question"]),
    ],
    A2: [
      v("prepare", "/prɪˈpeər/", "/prɪˈper/", "to get ready for something", "chuẩn bị", "verb", "Students need to prepare for the final exam.", "Học sinh cần chuẩn bị cho kỳ thi cuối kỳ.", ["study", "revise"], [], ["prepare for", "well-prepared"]),
    ],
    B1: [
      v("invigilator", "/ɪnˈvɪdʒɪleɪtə(r)/", "/ɪnˈvɪdʒɪleɪtər/", "a person who watches students during an exam to prevent cheating", "giám thị", "noun", "The invigilator walked around the room to ensure no one was using a phone.", "Giám thị đi quanh phòng để đảm bảo không có ai sử dụng điện thoại.", ["proctor", "supervisor"], [], ["strict invigilator"]),
      v("assessment", "/əˈsesmənt/", "/əˈsesmənt/", "a test or evaluation of someone's knowledge or ability", "sự đánh giá", "noun", "The final assessment will cover all the topics we studied this term.", "Bài đánh giá cuối kỳ sẽ bao quát tất cả các chủ đề chúng ta đã học trong học kỳ này.", ["evaluation", "test"], [], ["formal assessment", "complete an assessment"]),
      v("certificate", "/səˈtɪfɪkət/", "/sərˈtɪfɪkət/", "an official document proving you passed an exam or finished a course", "chứng chỉ", "noun", "She received a certificate after passing her English proficiency exam.", "Cô ấy đã nhận được chứng chỉ sau khi vượt qua kỳ thi năng lực tiếng Anh.", ["diploma", "qualification"], [], ["obtain a certificate", "language certificate"]),
      v("attempt", "/əˈtempt/", "/əˈtempt/", "to try to answer a question or complete a test", "cố gắng, làm thử", "verb", "Make sure you attempt every question on the test, even if you are unsure.", "Hãy chắc chắn rằng bạn làm thử mọi câu hỏi trong bài kiểm tra, ngay cả khi bạn không chắc chắn.", ["try", "tackle"], [], ["attempt a question", "successful attempt"]),
      v("failing", "/ˈfeɪlɪŋ/", "/ˈfeɪlɪŋ/", "not achieving the required standard to pass an exam", "trượt, không đạt", "adjective", "He was worried about failing the math exam because it was very difficult.", "Anh ấy lo lắng về việc trượt bài thi toán vì nó rất khó.", ["unsuccessful"], ["passing"], ["failing grade", "risk failing"]),
      v("instructions", "/ɪnˈstrʌkʃnz/", "/ɪnˈstrʌkʃnz/", "detailed information on how to do something in the exam", "hướng dẫn", "noun", "Read the instructions carefully before you start writing your answers.", "Hãy đọc kỹ hướng dẫn trước khi bạn bắt đầu viết câu trả lời.", ["directions", "guidelines"], [], ["follow instructions", "clear instructions"]),
      v("hand in", "/hænd ɪn/", "/hænd ɪn/", "to give your completed work to the teacher or examiner", "nộp bài", "phrase", "Students must hand in their papers when the time is up.", "Học sinh phải nộp bài khi hết giờ.", ["submit", "turn in"], [], ["hand in work", "hand in assignment"]),
    ],
    B2: [
      v("assess", "/əˈses/", "/əˈses/", "To evaluate or estimate the nature, quality, or ability of someone or something.", "Đánh giá", "verb", "Teachers use various methods to assess student progress throughout the semester.", "Giáo viên sử dụng nhiều phương pháp khác nhau để đánh giá sự tiến bộ của học sinh trong suốt học kỳ.", ["evaluate", "appraise"], [], ["assess performance", "assess impact"]),
      v("retake", "/ˌriːˈteɪk/", "/ˌriːˈteɪk/", "To take an examination again after failing it previously.", "Thi lại", "verb", "He had to retake the chemistry exam because he failed the first time.", "Anh ấy phải thi lại môn hóa vì lần đầu anh ấy đã trượt.", ["resit"], [], ["retake an exam", "forced to retake"]),
      v("provisional", "/prəˈvɪʒənl/", "/prəˈvɪʒənl/", "Arranged or existing for the present, possibly to be changed later.", "Đây là kết quả tạm thời cho đến khi điểm cuối cùng được xác nhận vào tuần tới.", "adjective", "These are the provisional results until the final grades are confirmed next week.", "", ["temporary", "interim"], ["final"], ["provisional results", "provisional assessment"]),
      v("eligibility", "/ˌelɪdʒəˈbɪləti/", "/ˌelɪdʒəˈbɪləti/", "The state of having the necessary qualities or fulfilling the necessary conditions.", "Sự đủ điều kiện", "noun", "You must check your eligibility for the scholarship before submitting the application.", "Bạn phải kiểm tra điều kiện nhận học bổng của mình trước khi nộp đơn.", ["qualification", "entitlement"], ["ineligibility"], ["check eligibility", "confirm eligibility"]),
      v("standardized", "/ˈstændədaɪzd/", "/ˈstændərdaɪzd/", "Designed to be administered and scored in a consistent manner.", "Được tiêu chuẩn hóa", "adjective", "The university requires scores from a standardized test like the TOEFL or IELTS.", "Trường đại học yêu cầu điểm số từ một bài thi tiêu chuẩn hóa như TOEFL hoặc IELTS.", ["uniform", "regularized"], [], ["standardized test", "standardized assessment"]),
      v("benchmark", "/ˈbentʃmɑːk/", "/ˈbentʃmɑːrk/", "A standard or point of reference against which things may be compared or assessed.", "Tiêu chuẩn đánh giá", "noun", "The final exam serves as a benchmark for student achievement in the course.", "Bài thi cuối kỳ đóng vai trò là tiêu chuẩn đánh giá thành tích của học sinh trong khóa học.", ["standard", "criterion"], [], ["set a benchmark", "performance benchmark"]),
      v("comprehensive", "/ˌkɒmprɪˈhensɪv/", "/ˌkɑːmprɪˈhensɪv/", "Including all or nearly all elements or aspects of something.", "Toàn diện", "adjective", "The final exam is a comprehensive test covering everything we learned this year.", "Bài thi cuối kỳ là một bài kiểm tra toàn diện bao gồm mọi thứ chúng ta đã học năm nay.", ["thorough", "exhaustive"], ["limited"], ["comprehensive exam", "comprehensive review"]),
    ],
    C1: [
      v("invigilate", "/ɪnˈvɪdʒɪleɪt/", "/ɪnˈvɪdʒəleɪt/", "to supervise candidates during an examination to prevent cheating", "coi thi", "verb", "The professors were asked to invigilate the final exam to ensure academic integrity.", "Các giáo sư được yêu cầu coi thi cuối kỳ để đảm bảo tính liêm chính trong học thuật.", ["supervise", "proctor"], [], ["invigilate an exam", "strictly invigilate"]),
      v("procrastination", "/prəˌkræstɪˈneɪʃn/", "/proʊˌkræstəˈneɪʃn/", "the action of delaying or postponing something, often detrimental to exam preparation", "sự trì hoãn", "noun", "Chronic procrastination often leads to poor performance in high-stakes examinations.", "Thói quen trì hoãn kinh niên thường dẫn đến kết quả kém trong các kỳ thi quan trọng.", ["delay", "dallying"], ["diligence"], ["avoid procrastination", "chronic procrastination"]),
      v("extrapolate", "/ɪkˈstræpəleɪt/", "/ɪkˈstræpəleɪt/", "to infer or estimate by extending known information, often used in data-based exam questions", "suy diễn, ngoại suy", "verb", "Students must be able to extrapolate trends from the provided graphs during the statistics test.", "Học sinh phải có khả năng suy diễn các xu hướng từ biểu đồ được cung cấp trong bài kiểm tra thống kê.", ["infer", "project"], [], ["extrapolate data", "extrapolate a trend"]),
      v("mitigating", "/ˈmɪtɪɡeɪtɪŋ/", "/ˈmɪtɪɡeɪtɪŋ/", "making something less severe, serious, or painful, often used in 'mitigating circumstances' for exam appeals", "giảm nhẹ", "adjective", "The board considered her illness as a mitigating factor for her poor exam results.", "Hội đồng đã xem xét bệnh tình của cô ấy như một yếu tố giảm nhẹ cho kết quả thi kém.", ["alleviating", "diminishing"], ["aggravating"], ["mitigating circumstances", "mitigating factor"]),
      v("concomitant", "/kənˈkɒmɪtənt/", "/kənˈkɑːmɪtənt/", "naturally accompanying or associated with something", "đi kèm, đồng thời", "adjective", "High anxiety is a concomitant effect of preparing for high-stakes examinations.", "Lo âu cao độ là một tác động đi kèm với việc chuẩn bị cho các kỳ thi quan trọng.", ["associated", "attendant"], [], ["concomitant factor", "concomitant result"]),
      v("elucidate", "/ɪˈluːsɪdeɪt/", "/ɪˈluːsɪdeɪt/", "to make something clear; explain", "làm sáng tỏ", "verb", "The teacher had to elucidate the complex exam rubric to ensure all students understood the requirements.", "Giáo viên phải làm sáng tỏ tiêu chí chấm thi phức tạp để đảm bảo tất cả học sinh hiểu rõ các yêu cầu.", ["clarify", "explain"], ["confuse"], ["elucidate a point", "elucidate the meaning"]),
      v("substantiate", "/səbˈstænʃieɪt/", "/səbˈstænʃieɪt/", "to provide evidence to support or prove the truth of", "chứng minh, làm sáng tỏ bằng chứng", "verb", "In your essay, you must substantiate your arguments with relevant data to achieve a high grade.", "Trong bài luận, bạn phải chứng minh các lập luận của mình bằng dữ liệu liên quan để đạt điểm cao.", ["validate", "verify"], ["refute"], ["substantiate a claim", "substantiate an argument"]),
    ],
    C2: [
      v("scantron", "/ˈskæntrɒn/", "/ˈskæntrɑːn/", "a specialized optical mark recognition form used for automated test grading", "phiếu trả lời trắc nghiệm (được chấm bằng máy)", "noun", "Please ensure your pencil marks on the scantron are dark and complete to avoid grading errors.", "Hãy đảm bảo các vết chì trên phiếu trắc nghiệm của bạn đậm và đầy đủ để tránh sai sót khi chấm điểm.", ["bubble sheet", "answer sheet"], [], ["fill out a scantron", "scantron sheet"]),
      v("adjudicate", "/əˈdʒuːdɪkeɪt/", "/əˈdʒuːdɪkeɪt/", "to make a formal judgment on a disputed matter or competition", "xét xử, phân xử, chấm điểm (trong các cuộc thi)", "verb", "A panel of experts was appointed to adjudicate the oral presentations of the finalists.", "Một hội đồng chuyên gia đã được chỉ định để chấm điểm các bài thuyết trình của những người lọt vào vòng chung kết.", ["arbitrate", "judge"], [], ["adjudicate a contest", "adjudicate the results"]),
      v("proctor", "/ˈprɒktə(r)/", "/ˈprɑːktər/", "a person who monitors students during an exam", "giám thị", "noun", "The proctor walked up and down the aisles, checking for any unauthorized electronic devices.", "Giám thị đi dọc các lối đi, kiểm tra xem có thiết bị điện tử trái phép nào không.", ["invigilator", "monitor"], [], ["exam proctor", "proctor a test"]),
      v("distractor", "/dɪˈstræktə(r)/", "/dɪˈstræktər/", "a wrong answer in a multiple-choice test designed to look like a correct one", "đáp án gây nhiễu", "noun", "The test designer included a plausible distractor to ensure that only those who understood the concept would succeed.", "Người thiết kế bài thi đã đưa vào một đáp án gây nhiễu hợp lý để đảm bảo rằng chỉ những người thực sự hiểu khái niệm mới thành công.", ["decoy", "foil"], [], ["plausible distractor", "eliminate distractors"]),
      v("abstruse", "/əbˈstruːs/", "/əbˈstruːs/", "difficult to understand; obscure, often used to describe complex exam questions", "khó hiểu, trừu tượng", "adjective", "The physics paper was filled with abstruse theories that challenged even the brightest students.", "Bài thi vật lý chứa đầy những lý thuyết khó hiểu thách thức cả những sinh viên giỏi nhất.", ["esoteric", "arcane"], ["lucid"], ["abstruse concepts", "abstruse subject matter"]),
      v("post-hoc", "/ˌpəʊst ˈhɒk/", "/ˌpoʊst ˈhɑːk/", "occurring or done after the event, often referring to test analysis performed after results are released", "xảy ra sau sự kiện (phân tích sau khi thi)", "adjective", "The committee conducted a post-hoc analysis of the exam data to identify potential bias in the questions.", "Ủy ban đã thực hiện phân tích dữ liệu bài thi sau khi sự kiện kết thúc để xác định khả năng thiên kiến trong các câu hỏi.", ["retrospective"], ["a priori"], ["post-hoc analysis", "post-hoc evaluation"]),
      v("infallible", "/ɪnˈfæləbl/", "/ɪnˈfæləbl/", "incapable of making mistakes or being wrong; often used regarding grading accuracy", "không thể sai lầm, chính xác tuyệt đối", "adjective", "No automated grading system is entirely infallible, which is why a manual review is sometimes necessary.", "Không có hệ thống chấm điểm tự động nào là chính xác tuyệt đối, đó là lý do tại sao đôi khi cần phải xem xét thủ công.", ["flawless", "unfailing"], ["fallible"], ["infallible method", "not infallible"]),
    ],
  },
  "Teaching & Learning": {
    A2: [
      v("lesson", "/ˈles.ən/", "/ˈles.ən/", "a period of time in which a student learns something", "bài học", "noun", "We have an English lesson every Monday morning.", "Chúng tôi có một bài học tiếng Anh vào mỗi sáng thứ Hai.", ["class", "session"], [], ["take a lesson", "attend a lesson"]),
      v("practice", "/ˈpræk.tɪs/", "/ˈpræk.tɪs/", "to do something repeatedly to become better at it", "luyện tập", "verb", "You should practice speaking English every day.", "Bạn nên luyện tập nói tiếng Anh mỗi ngày.", ["rehearse", "train"], [], ["practice speaking", "practice English"]),
      v("explain", "/ɪkˈspleɪn/", "/ɪkˈspleɪn/", "to make something clear or easy to understand", "giải thích", "verb", "Can you explain this grammar rule to me?", "Bạn có thể giải thích quy tắc ngữ pháp này cho tôi không?", ["clarify", "describe"], [], ["explain clearly", "explain to someone"]),
      v("notebook", "/ˈnəʊt.bʊk/", "/ˈnoʊt.bʊk/", "a book with blank pages for writing notes", "vở ghi chép", "noun", "Please write the new words in your notebook.", "Hãy viết các từ mới vào vở của bạn.", ["pad", "journal"], [], ["open your notebook", "write in a notebook"]),
      v("correct", "/kəˈrekt/", "/kəˈrekt/", "to show someone where they have made a mistake", "sửa lỗi", "verb", "The teacher will correct our tests tomorrow.", "Giáo viên sẽ sửa bài kiểm tra của chúng tôi vào ngày mai.", ["fix", "amend"], ["make a mistake"], ["correct a mistake", "correct the answer"]),
      v("knowledge", "/ˈnɒl.ɪdʒ/", "/ˈnɑː.lɪdʒ/", "information, understanding, or skill that you get from experience or education", "kiến thức", "noun", "Reading books helps you gain more knowledge.", "Đọc sách giúp bạn có thêm nhiều kiến thức.", ["wisdom", "understanding"], ["ignorance"], ["gain knowledge", "general knowledge"]),
      v("improve", "/ɪmˈpruːv/", "/ɪmˈpruːv/", "to get better or to make something better", "cải thiện", "verb", "I want to improve my writing skills.", "Tôi muốn cải thiện kỹ năng viết của mình.", ["enhance", "better"], ["worsen"], ["improve skills", "improve English"]),
    ],
    B1: [
      v("evaluate", "/ɪˈvæljueɪt/", "/ɪˈvæljueɪt/", "to judge or calculate the quality, importance, or value of something", "đánh giá", "verb", "Teachers often evaluate students based on their participation and test scores.", "Giáo viên thường đánh giá học sinh dựa trên sự tham gia và điểm kiểm tra của họ.", ["assess", "judge"], [], ["evaluate performance", "evaluate progress"]),
      v("instruction", "/ɪnˈstrʌkʃn/", "/ɪnˈstrʌkʃn/", "the act of teaching something or the knowledge that is taught", "sự hướng dẫn, giảng dạy", "noun", "The students received clear instruction on how to conduct the experiment.", "Các học sinh đã nhận được sự hướng dẫn rõ ràng về cách thực hiện thí nghiệm.", ["teaching", "coaching"], [], ["provide instruction", "follow instructions"]),
      v("knowledgeable", "/ˈnɒlɪdʒəbl/", "/ˈnɑːlɪdʒəbl/", "knowing a lot about a particular subject", "có kiến thức, am hiểu", "adjective", "My professor is very knowledgeable about modern literature.", "Giáo sư của tôi rất am hiểu về văn học hiện đại.", ["well-informed", "educated"], ["ignorant"], ["highly knowledgeable", "become knowledgeable"]),
      v("participate", "/pɑːˈtɪsɪpeɪt/", "/pɑːrˈtɪsɪpeɪt/", "to be involved in an activity or event", "tham gia", "verb", "Students are encouraged to participate in class discussions.", "Học sinh được khuyến khích tham gia vào các cuộc thảo luận trên lớp.", ["take part", "join in"], ["avoid"], ["participate in class", "actively participate"]),
      v("research", "/rɪˈsɜːtʃ/", "/ˈriːsɜːrtʃ/", "a detailed study of a subject, especially in order to discover new information", "nghiên cứu", "noun", "She spent months doing research for her final project.", "Cô ấy đã dành nhiều tháng để thực hiện nghiên cứu cho bài tập cuối khóa.", ["investigation", "study"], [], ["conduct research", "do research"]),
      v("tutorial", "/tjuːˈtɔːriəl/", "/tuːˈtɔːriəl/", "a period of study with a tutor involving one student or a small group", "bài hướng dẫn, buổi học nhóm nhỏ", "noun", "I have a tutorial with my professor to discuss my thesis draft.", "Tôi có một buổi hướng dẫn với giáo sư để thảo luận về bản nháp luận văn của mình.", ["workshop", "lesson"], [], ["attend a tutorial", "weekly tutorial"]),
    ],
    B2: [
      v("ascertain", "/ˌæsəˈteɪn/", "/ˌæsərˈteɪn/", "to find something out for certain; make sure of", "xác minh, tìm hiểu chắc chắn", "verb", "The teacher tried to ascertain the cause of the student's sudden decline in grades.", "Giáo viên đã cố gắng xác minh nguyên nhân khiến điểm số của học sinh giảm sút đột ngột.", ["determine", "discover"], [], ["ascertain the truth", "ascertain the facts"]),
      v("pedagogical", "/ˌpedəˈɡɒdʒɪkl/", "/ˌpedəˈɡɑːdʒɪkl/", "relating to teaching methods", "thuộc về sư phạm", "adjective", "The workshop focused on innovative pedagogical approaches to improve student engagement.", "Hội thảo tập trung vào các phương pháp sư phạm đổi mới để cải thiện sự tham gia của học sinh.", ["educational", "didactic"], [], ["pedagogical approach", "pedagogical skills"]),
      v("articulate", "/ɑːˈtɪkjuleɪt/", "/ɑːrˈtɪkjuleɪt/", "having the ability to speak fluently and coherently", "ăn nói lưu loát, diễn đạt rõ ràng", "adjective", "She is a highly articulate student who can explain complex concepts with ease.", "Cô ấy là một học sinh rất lưu loát, người có thể giải thích các khái niệm phức tạp một cách dễ dàng.", ["eloquent", "fluent"], ["inarticulate"], ["articulate speaker", "articulate clearly"]),
      v("facilitate", "/fəˈsɪlɪteɪt/", "/fəˈsɪlɪteɪt/", "to make an action or process easy or easier", "tạo điều kiện thuận lợi, hỗ trợ", "verb", "The software is designed to facilitate communication between teachers and parents.", "Phần mềm được thiết kế để tạo điều kiện thuận lợi cho việc liên lạc giữa giáo viên và phụ huynh.", ["ease", "assist"], ["hinder"], ["facilitate learning", "facilitate discussion"]),
      v("comprehend", "/ˌkɒmprɪˈhend/", "/ˌkɑːmprɪˈhend/", "to grasp mentally; understand", "thấu hiểu, lĩnh hội", "verb", "Students often struggle to comprehend abstract theories without practical examples.", "Học sinh thường gặp khó khăn trong việc thấu hiểu các lý thuyết trừu tượng nếu không có ví dụ thực tế.", ["understand", "grasp"], ["misunderstand"], ["fully comprehend", "difficult to comprehend"]),
      v("profound", "/prəˈfaʊnd/", "/prəˈfaʊnd/", "having or showing great knowledge or insight", "sâu sắc, uyên thâm", "adjective", "The teacher had a profound influence on his students' academic development.", "Người giáo viên đã có ảnh hưởng sâu sắc đến sự phát triển học thuật của học sinh.", ["deep", "insightful"], ["superficial"], ["profound impact", "profound knowledge"]),
      v("competence", "/ˈkɒmpɪtəns/", "/ˈkɑːmpɪtəns/", "the ability to do something successfully or efficiently", "năng lực, khả năng", "noun", "The course aims to build the students' competence in academic writing.", "Khóa học nhằm mục đích xây dựng năng lực viết học thuật cho học sinh.", ["capability", "proficiency"], ["incompetence"], ["demonstrate competence", "core competence"]),
    ],
    C1: [
      v("scaffold", "/ˈskæf.əʊld/", "/ˈskæf.oʊld/", "To provide temporary support to students to help them master a new concept.", "Hỗ trợ học tập (theo khung)", "verb", "Teachers should scaffold complex tasks by breaking them down into manageable steps.", "Giáo viên nên hỗ trợ các nhiệm vụ phức tạp bằng cách chia nhỏ chúng thành các bước dễ thực hiện.", ["support", "structure"], [], ["scaffold learning", "scaffold instruction"]),
      v("differentiate", "/ˌdɪf.əˈren.ʃi.eɪt/", "/ˌdɪf.əˈren.ʃi.eɪt/", "To tailor instruction to meet individual students' needs and learning styles.", "Phân hóa (trong giảng dạy)", "verb", "It is challenging to differentiate instruction in a classroom with thirty diverse students.", "Thật khó để phân hóa việc giảng dạy trong một lớp học với ba mươi học sinh có trình độ khác nhau.", ["tailor", "customize"], [], ["differentiate instruction", "differentiated learning"]),
      v("andragogy", "/ˈæn.drə.ɡɒdʒ.i/", "/ˈæn.drə.ɡɑː.dʒi/", "The method and practice of teaching adult learners.", "Phương pháp giáo dục người lớn", "noun", "Training programs for corporate employees are often based on the principles of andragogy.", "Các chương trình đào tạo cho nhân viên doanh nghiệp thường dựa trên các nguyên tắc giáo dục người lớn.", ["adult education"], ["pedagogy"], ["principles of andragogy"]),
      v("metacognition", "/ˌmet.ə.kɒɡˈnɪʃ.ən/", "/ˌmet.ə.kɑːɡˈnɪʃ.ən/", "Awareness and understanding of one's own thought processes.", "Siêu nhận thức", "noun", "Encouraging metacognition helps students become more independent and effective learners.", "Khuyến khích siêu nhận thức giúp học sinh trở thành những người học độc lập và hiệu quả hơn.", ["self-awareness", "reflective thinking"], [], ["metacognition strategies", "develop metacognition"]),
      v("summative", "/ˈsʌm.ə.tɪv/", "/ˈsʌm.ə.t̬ɪv/", "Relating to an assessment that evaluates student learning at the end of an instructional unit.", "Tổng kết (đánh giá)", "adjective", "Final exams are a common form of summative assessment used to measure student achievement.", "Các kỳ thi cuối kỳ là một hình thức đánh giá tổng kết phổ biến được sử dụng để đo lường thành tích học sinh.", ["final", "evaluative"], ["formative"], ["summative assessment", "summative evaluation"]),
      v("formative", "/ˈfɔː.mə.tɪv/", "/ˈfɔːr.mə.t̬ɪv/", "Relating to an assessment that monitors student learning to provide ongoing feedback.", "Thường xuyên (đánh giá quá trình)", "adjective", "Formative assessments allow teachers to adjust their teaching strategies in real-time.", "Các bài đánh giá thường xuyên cho phép giáo viên điều chỉnh chiến lược giảng dạy của họ theo thời gian thực.", ["continuous", "developmental"], ["summative"], ["formative assessment", "formative feedback"]),
    ],
    C2: [
      v("curriculum vitae", "/kəˌrɪk.jə.ləm ˈviː.taɪ/", "/kəˌrɪk.jə.ləm ˈviː.taɪ/", "A brief account of a person's education, qualifications, and previous experience.", "Sơ yếu lý lịch (học thuật/chuyên môn)", "noun", "The committee reviewed her curriculum vitae before inviting her for an interview.", "Hội đồng đã xem xét sơ yếu lý lịch của cô ấy trước khi mời cô ấy đến phỏng vấn.", ["resume", "profile"], [], ["submit a curriculum vitae", "update a curriculum vitae"]),
      v("pedagogue", "/ˈped.ə.ɡɒɡ/", "/ˈped.ə.ɡɑːɡ/", "A teacher, especially one who is strict or pedantic.", "Nhà giáo, giáo viên", "noun", "The old-fashioned pedagogue insisted on absolute silence in the classroom.", "Vị giáo viên theo lối cũ khăng khăng yêu cầu sự im lặng tuyệt đối trong lớp học.", ["educator", "instructor"], [], ["stern pedagogue", "professional pedagogue"]),
    ],
  },
};


// Seed function
async function seedVocab() {
  console.log("🌱 Seeding Vocabulary Data - Education...");

  // Get or create topic group
  const topicGroup = await prisma.topicGroup.upsert({
    where: { name_hubType: { name: "Education", hubType: "vocab" } },
    update: {},
    create: {
      name: "Education",
      order: 7,
      hubType: "vocab",
      subcategories: [
        "School Life",
        "Higher Education",
        "Exams & Tests",
        "Teaching & Learning",
      ],
    },
  });

  // Helper to slugify
  const slugify = (text: string) => text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

  // Iterate over subcategories
  for (const [subcat, levelsData] of Object.entries(educationVocab)) {
    console.log(`Processing Subcategory: ${subcat}`);

    for (const [level, vocabItems] of Object.entries(levelsData)) {
      const currentLevel = level as Level;
      const items = vocabItems as ReturnType<typeof v>[];

      if (!items || items.length === 0) continue;

      const topicId = `education-${slugify(subcat)}-${currentLevel.toLowerCase()}`;

      const topic = await prisma.topic.upsert({
        where: { id: topicId },
        update: { wordCount: items.length },
        create: {
          id: topicId,
          title: `${subcat} - ${currentLevel}`,
          subtitle: `Vocabulary about ${subcat.toLowerCase()}`,
          description: `Learn essential vocabulary about ${subcat.toLowerCase()} at ${currentLevel} level.`,
          level: currentLevel,
          wordCount: items.length,
          estimatedTime: Math.ceil(items.length * 2),
          category: "Education",
          subcategory: subcat,
          order: LEVELS.indexOf(currentLevel),
          topicGroupId: topicGroup.id,
        },
      });

      // Seed vocab items
      for (const vocab of items) {
        const vocabId = `${topic.id}-${vocab.word.toLowerCase().replace(/\s+/g, "-")}`;
        await prisma.vocabItem.upsert({
          where: { id: vocabId },
          update: vocab,
          create: {
            id: vocabId,
            topicId: topic.id,
            ...vocab,
          },
        });
      }
      console.log(`✅ Created: ${subcat} - ${currentLevel} (${items.length} words)`);
    }
  }

  console.log("✅ Education seeded successfully!");
}

async function main() {
  try {
    await seedVocab();
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
