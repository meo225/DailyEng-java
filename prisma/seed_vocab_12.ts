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
// TOPIC GROUP 12: ARTS & CULTURE
// ============================================

const artsandcultureVocab = {
  "Music": {
    A1: [
      v("guitar", "/ɡɪˈtɑː(r)/", "/ɡɪˈtɑːr/", "a musical instrument with strings that you play with your fingers", "đàn ghi-ta", "noun", "He plays the guitar.", "Anh ấy chơi đàn ghi-ta.", [], [], ["play the guitar", "acoustic guitar"]),
      v("piano", "/piˈænəʊ/", "/piˈænoʊ/", "a large musical instrument with black and white keys", "đàn piano", "noun", "She is learning to play the piano.", "Cô ấy đang học chơi đàn piano.", [], [], ["play the piano", "learn piano"]),
    ],
    A2: [
      v("singer", "/ˈsɪŋ.ə/", "/ˈsɪŋ.ɚ/", "a person who sings", "ca sĩ", "noun", "She is my favorite singer.", "Cô ấy là ca sĩ yêu thích của tôi.", ["vocalist"], [], ["pop singer", "famous singer"]),
      v("concert", "/ˈkɒn.sət/", "/ˈkɑːn.sɚt/", "a performance of music by one or more musicians", "buổi hòa nhạc", "noun", "We are going to a concert tonight.", "Chúng tôi sẽ đi xem hòa nhạc tối nay.", ["show", "gig"], [], ["attend a concert", "live concert"]),
    ],
    B1: [
      v("compose", "/kəmˈpəʊz/", "/kəmˈpoʊz/", "to write or create a piece of music", "sáng tác", "verb", "He started to compose his own songs when he was a teenager.", "Anh ấy bắt đầu sáng tác các bài hát của riêng mình khi còn là một thiếu niên.", ["write", "create"], [], ["compose music", "compose a song"]),
      v("performer", "/pəˈfɔː.mər/", "/pərˈfɔːr.mər/", "a person who entertains an audience", "người biểu diễn", "noun", "She is a talented performer who sings and plays the guitar.", "Cô ấy là một người biểu diễn tài năng, người vừa hát vừa chơi đàn guitar.", ["artist", "entertainer"], [], ["talented performer", "live performer"]),
      v("record", "/rɪˈkɔːd/", "/rɪˈkɔːrd/", "to store sound on tape or a disc so it can be heard later", "thu âm", "verb", "The band went to the studio to record their new album.", "Ban nhạc đã đến phòng thu để thu âm album mới của họ.", ["tape", "capture"], [], ["record a song", "record an album"]),
      v("talented", "/ˈtæl.ən.tɪd/", "/ˈtæl.ən.t̬ɪd/", "having a natural ability to do something well", "có tài năng", "adjective", "The young pianist is incredibly talented.", "Nghệ sĩ piano trẻ tuổi đó cực kỳ có tài năng.", ["gifted", "skilled"], ["untalented"], ["talented musician", "highly talented"]),
    ],
    B2: [
      v("virtuoso", "/ˌvɜːtjuˈəʊsəʊ/", "/ˌvɜːrtʃuˈoʊsoʊ/", "a person highly skilled in music or another artistic pursuit", "bậc thầy (về âm nhạc)", "noun", "The young violinist is a true virtuoso who has mastered the most difficult concertos.", "Nghệ sĩ vĩ cầm trẻ tuổi là một bậc thầy thực sự, người đã làm chủ được những bản hòa tấu khó nhất.", ["master", "prodigy"], ["amateur"], ["musical virtuoso", "piano virtuoso"]),
      v("resonance", "/ˈrezənəns/", "/ˈrezənəns/", "the quality in a sound of being deep, full, and reverberating", "sự cộng hưởng, độ vang", "noun", "The cello is famous for the rich resonance of its lower notes.", "Đàn cello nổi tiếng với độ vang phong phú của những nốt trầm.", ["vibration", "reverberation"], [], ["acoustic resonance", "deep resonance"]),
      v("improvise", "/ˈɪmprəvaɪz/", "/ˈɪmprəvaɪz/", "to create and perform music spontaneously without preparation", "ứng tấu, ngẫu hứng", "verb", "The jazz band decided to improvise a new melody during the live performance.", "Ban nhạc jazz đã quyết định ứng tấu một giai điệu mới trong buổi biểu diễn trực tiếp.", ["ad-lib", "extemporize"], ["rehearse"], ["improvise a solo", "improvise on the piano"]),
      v("crescendo", "/krəˈʃendəʊ/", "/krəˈʃendoʊ/", "a gradual increase in loudness in a piece of music", "sự tăng dần âm lượng", "noun", "The symphony builds to a powerful crescendo that leaves the audience breathless.", "Bản giao hưởng được xây dựng dẫn đến một sự tăng dần âm lượng mạnh mẽ khiến khán giả nín thở.", ["surge", "climax"], ["decrescendo"], ["build to a crescendo", "dramatic crescendo"]),
      v("dissonance", "/ˈdɪsənəns/", "/ˈdɪsənəns/", "a tension or clash resulting from the combination of two disharmonious notes", "sự nghịch tai, sự không hòa hợp", "noun", "Some modern compositions use dissonance to create a sense of unease or conflict.", "Một số tác phẩm hiện đại sử dụng sự nghịch tai để tạo ra cảm giác bất an hoặc xung đột.", ["discord", "clash"], ["harmony"], ["musical dissonance", "create dissonance"]),
      v("melodic", "/məˈlɒdɪk/", "/məˈlɑːdɪk/", "having a pleasant, musical sound or relating to melody", "du dương, êm tai", "adjective", "The singer has a very melodic voice that is perfect for ballads.", "Ca sĩ có một giọng hát rất du dương, hoàn hảo cho những bản ballad.", ["tuneful", "lyrical"], ["cacophonous"], ["melodic line", "melodic structure"]),
      v("virtuosity", "/ˌvɜːtjuˈɒsəti/", "/ˌvɜːrtʃuˈɑːsəti/", "great skill in music or another artistic pursuit", "sự tinh thông, kỹ năng điêu luyện", "noun", "The pianist displayed incredible virtuosity throughout the complex sonata.", "Nghệ sĩ piano đã thể hiện kỹ năng điêu luyện đáng kinh ngạc trong suốt bản sonata phức tạp.", ["mastery", "expertise"], ["incompetence"], ["technical virtuosity", "show of virtuosity"]),
      v("synchronize", "/ˈsɪŋkrənaɪz/", "/ˈsɪŋkrənaɪz/", "to cause to occur or operate at the same time or rate", "đồng bộ hóa", "verb", "The dancers must synchronize their movements perfectly with the music.", "Các vũ công phải đồng bộ hóa các chuyển động của họ một cách hoàn hảo với âm nhạc.", ["coordinate", "align"], [], ["synchronize with the beat", "perfectly synchronized"]),
      v("in harmony", "/ɪn ˈhɑːməni/", "/ɪn ˈhɑːrməni/", "in a state of musical agreement or pleasing combination", "hòa hợp, hòa âm", "phrase", "The choir sang in harmony, creating a beautiful and balanced sound.", "Dàn hợp xướng đã hát hòa âm cùng nhau, tạo nên một âm thanh đẹp và cân bằng.", ["in tune", "accordant"], ["out of tune"], ["sing in harmony", "work in harmony"]),
    ],
    C1: [
      v("cacophony", "/kəˈkɒfəni/", "/kəˈkɑːfəni/", "a harsh, discordant mixture of sounds", "sự hỗn âm", "noun", "The avant-garde piece began as a gentle melody but soon dissolved into a jarring cacophony.", "Tác phẩm tiên phong bắt đầu bằng một giai điệu nhẹ nhàng nhưng nhanh chóng tan biến thành một sự hỗn âm chói tai.", ["din", "racket"], ["harmony"], ["a cacophony of sound", "create a cacophony"]),
      v("rendition", "/renˈdɪʃn/", "/renˈdɪʃn/", "a performance or interpretation of a musical work", "sự trình diễn", "noun", "Her soulful rendition of the classic ballad brought the entire concert hall to tears.", "Phần trình diễn đầy cảm xúc của cô về bản ballad cổ điển đã khiến cả khán phòng rơi lệ.", ["interpretation", "performance"], [], ["a stunning rendition", "vocal rendition"]),
      v("syncopated", "/ˈsɪŋkəpeɪtɪd/", "/ˈsɪŋkəpeɪtɪd/", "characterized by a displacement of the beats in music", "đảo phách", "adjective", "The infectious rhythm of the song relied heavily on a complex, syncopated drum pattern.", "Nhịp điệu lôi cuốn của bài hát dựa rất nhiều vào kiểu trống đảo phách phức tạp.", ["rhythmic", "off-beat"], [], ["syncopated rhythm", "syncopated beat"]),
      v("underscore", "/ˌʌndəˈskɔː(r)/", "/ˌʌndərˈskɔːr/", "to provide background music for a film or theatrical performance", "đệm nhạc nền", "verb", "The subtle piano music was used to underscore the emotional weight of the dialogue scene.", "Nhạc piano tinh tế được sử dụng để đệm nền cho sức nặng cảm xúc của cảnh đối thoại.", ["accompany", "back"], [], ["underscore a scene", "underscore the action"]),
      v("atonal", "/eɪˈtəʊnl/", "/eɪˈtoʊnl/", "not written in any key or mode; lacking a tonal center", "phi điệu tính", "adjective", "Modernist composers often experimented with atonal structures to challenge traditional harmonic expectations.", "Các nhà soạn nhạc hiện đại thường thử nghiệm với cấu trúc phi điệu tính để thách thức những kỳ vọng hòa âm truyền thống.", ["dissonant", "non-tonal"], ["tonal"], ["atonal music", "atonal composition"]),
    ],
    C2: [
      v("syncopation", "/ˌsɪŋkəˈpeɪʃn/", "/ˌsɪŋkəˈpeɪʃn/", "a displacement of the beats in music so that strong pulses become weak and vice versa", "nhịp nghịch phách", "noun", "The complex syncopation in the jazz drummer's rhythm kept the audience captivated throughout the set.", "Nhịp nghịch phách phức tạp trong tiết tấu của tay trống nhạc jazz đã khiến khán giả say mê suốt buổi diễn.", ["rhythmic displacement"], [], ["rhythmic syncopation", "master syncopation"]),
      v("leitmotif", "/ˈlaɪtməʊtiːf/", "/ˈlaɪtmoʊtiːf/", "a recurrent theme throughout a musical or literary composition, associated with a particular person, idea, or situation", "chủ đề âm nhạc chủ đạo", "noun", "Wagner expertly used a haunting leitmotif to signal the hero's tragic fate whenever he appeared on stage.", "Wagner đã sử dụng một chủ đề âm nhạc chủ đạo đầy ám ảnh một cách điêu luyện để báo hiệu số phận bi thảm của người anh hùng mỗi khi anh ta xuất hiện trên sân khấu.", ["recurring theme", "motif"], [], ["recurring leitmotif", "musical leitmotif"]),
      v("polyphony", "/pəˈlɪfəni/", "/pəˈlɪfəni/", "the style of simultaneously combining a number of parts, each forming an individual melody and harmonizing with each other", "đa điệu, đa âm", "noun", "The Renaissance period is renowned for its intricate polyphony, where multiple vocal lines intertwine seamlessly.", "Thời kỳ Phục hưng nổi tiếng với lối đa âm phức tạp, nơi nhiều bè giọng đan xen một cách liền mạch.", ["counterpoint", "multi-part harmony"], ["monophony"], ["intricate polyphony", "vocal polyphony"]),
      v("timbre", "/ˈtæmbə/", "/ˈtæmbər/", "the character or quality of a musical sound or voice as distinct from its pitch and intensity", "âm sắc", "noun", "The unique, raspy timbre of her voice made her instantly recognizable among other jazz singers.", "Âm sắc khàn đặc trưng của giọng hát cô ấy khiến người nghe nhận ra ngay lập tức giữa những ca sĩ nhạc jazz khác.", ["tone color", "tonality"], [], ["distinctive timbre", "vocal timbre"]),
      v("cadence", "/ˈkeɪdns/", "/ˈkeɪdns/", "a sequence of notes or chords comprising the close of a musical phrase", "nhịp kết, kết cấu giai điệu", "noun", "The piece concludes with a perfect cadence that provides a profound sense of resolution.", "Tác phẩm kết thúc bằng một nhịp kết hoàn hảo mang lại cảm giác giải quyết vấn đề một cách sâu sắc.", ["rhythm", "inflection"], [], ["perfect cadence", "musical cadence"]),
    ],
  },
  "Visual Arts": {
    A1: [
      v("art", "/ɑːt/", "/ɑːrt/", "the expression of human creative skill", "nghệ thuật", "noun", "I like looking at art.", "Tôi thích ngắm nhìn nghệ thuật.", ["creative work"], [], ["modern art", "art class"]),
      v("paint", "/peɪnt/", "/peɪnt/", "a colored liquid used to make pictures", "Cô ấy có màu vẽ xanh trên tay.", "noun", "She has blue paint on her hands.", "", ["pigment"], [], ["oil paint", "paint brush"]),
      v("draw", "/drɔː/", "/drɔː/", "to make a picture with a pencil or pen", "vẽ", "verb", "I want to draw a cat.", "Tôi muốn vẽ một con mèo.", ["sketch"], [], ["draw a picture", "draw a line"]),
      v("color", "/ˈkʌl.ər/", "/ˈkʌl.ɚ/", "red, blue, green, etc.", "màu sắc", "noun", "My favorite color is red.", "Màu yêu thích của tôi là màu đỏ.", ["hue"], [], ["bright color", "dark color"]),
      v("picture", "/ˈpɪk.tʃər/", "/ˈpɪk.tʃɚ/", "a drawing or painting on paper or canvas", "bức tranh", "noun", "He made a beautiful picture.", "Anh ấy đã làm ra một bức tranh đẹp.", ["image", "painting"], [], ["take a picture", "draw a picture"]),
      v("pencil", "/ˈpen.səl/", "/ˈpen.səl/", "a tool for writing or drawing", "bút chì", "noun", "I need a pencil to draw.", "Tôi cần một chiếc bút chì để vẽ.", ["lead pencil"], [], ["sharpen a pencil", "use a pencil"]),
      v("make", "/meɪk/", "/meɪk/", "to create something", "làm, tạo ra", "verb", "I can make a drawing.", "Tôi có thể làm ra một bức vẽ.", ["create", "build"], ["destroy"], ["make art", "make a painting"]),
    ],
    A2: [
      v("brush", "/brʌʃ/", "/brʌʃ/", "a tool with hairs used for applying paint", "cọ vẽ", "noun", "Clean your brush after you finish painting.", "Hãy rửa sạch cọ vẽ của bạn sau khi vẽ xong.", ["paintbrush"], [], ["paint brush", "art brush"]),
      v("exhibition", "/ˌeksɪˈbɪʃn/", "/ˌeksəˈbɪʃn/", "a public display of works of art", "triển lãm", "noun", "We went to an art exhibition at the gallery yesterday.", "Chúng tôi đã đi xem một buổi triển lãm nghệ thuật tại phòng tranh ngày hôm qua.", ["show", "display"], [], ["art exhibition", "visit an exhibition"]),
      v("gallery", "/ˈɡæləri/", "/ˈɡæləri/", "a building where art is shown to the public", "phòng tranh, phòng trưng bày", "noun", "The art gallery is open every day except Monday.", "Phòng trưng bày nghệ thuật mở cửa mỗi ngày trừ thứ Hai.", ["museum"], [], ["art gallery", "visit a gallery"]),
      v("bright", "/braɪt/", "/braɪt/", "having a lot of light or strong color", "sáng, rực rỡ", "adjective", "He used bright colors to paint the sunset.", "Anh ấy đã sử dụng những màu sắc rực rỡ để vẽ cảnh hoàng hôn.", ["vivid", "vibrant"], ["dull"], ["bright color", "bright light"]),
      v("portrait", "/ˈpɔːtreɪt/", "/ˈpɔːrtrət/", "a painting or drawing of a person", "tranh chân dung", "noun", "She painted a beautiful portrait of her grandmother.", "Cô ấy đã vẽ một bức chân dung tuyệt đẹp về bà của mình.", ["likeness"], [], ["paint a portrait", "self-portrait"]),
      v("sketch", "/sketʃ/", "/sketʃ/", "a simple, quick drawing", "bản phác thảo", "noun", "Make a quick sketch before you start the painting.", "Hãy tạo một bản phác thảo nhanh trước khi bạn bắt đầu vẽ tranh.", ["draft", "outline"], [], ["rough sketch", "pencil sketch"]),
      v("frame", "/freɪm/", "/freɪm/", "the border that holds a picture", "khung tranh", "noun", "I need to buy a wooden frame for this photo.", "Tôi cần mua một cái khung gỗ cho bức ảnh này.", ["border"], [], ["picture frame", "wooden frame"]),
      v("create", "/kriˈeɪt/", "/kriˈeɪt/", "to make something new", "tạo ra, sáng tạo", "verb", "Artists create beautiful things to share their feelings.", "Các nghệ sĩ tạo ra những thứ đẹp đẽ để chia sẻ cảm xúc của họ.", ["make", "produce"], ["destroy"], ["create art", "create something"]),
    ],
    B1: [
      v("sculpture", "/ˈskʌlptʃə(r)/", "/ˈskʌlptʃər/", "a piece of art made by carving or shaping stone, wood, or metal", "điêu khắc", "noun", "The museum has a large collection of modern sculpture.", "Bảo tàng có một bộ sưu tập lớn các tác phẩm điêu khắc hiện đại.", ["statue", "carving"], [], ["create a sculpture", "bronze sculpture"]),
      v("landscape", "/ˈlændskeɪp/", "/ˈlændskeɪp/", "a painting or drawing of an area of countryside", "tranh phong cảnh", "noun", "He specializes in painting landscapes of the countryside.", "Anh ấy chuyên vẽ tranh phong cảnh vùng quê.", ["scenery", "view"], [], ["landscape painting", "oil landscape"]),
      v("masterpiece", "/ˈmɑːstəpiːs/", "/ˈmæstərpiːs/", "a work of art of outstanding skill or quality", "kiệt tác", "noun", "This painting is considered a masterpiece of the 19th century.", "Bức tranh này được coi là một kiệt tác của thế kỷ 19.", ["classic", "work of art"], [], ["create a masterpiece", "true masterpiece"]),
      v("abstract", "/ˈæbstrækt/", "/ˈæbstrækt/", "art that does not try to represent people or things in a realistic way", "trừu tượng", "adjective", "I find abstract art difficult to understand.", "Tôi thấy nghệ thuật trừu tượng rất khó hiểu.", ["non-representational", "conceptual"], ["realistic"], ["abstract painting", "abstract art"]),
      v("exhibit", "/ɪɡˈzɪbɪt/", "/ɪɡˈzɪbɪt/", "to show objects in a public place for people to enjoy", "trưng bày", "verb", "Local artists will exhibit their work at the gallery next month.", "Các nghệ sĩ địa phương sẽ trưng bày tác phẩm của họ tại phòng tranh vào tháng tới.", ["display", "showcase"], ["hide"], ["exhibit work", "exhibit at a gallery"]),
      v("canvas", "/ˈkænvəs/", "/ˈkænvəs/", "a strong, rough cloth used by artists for oil painting", "vải vẽ tranh", "noun", "The artist applied thick layers of paint onto the canvas.", "Người nghệ sĩ đã phủ những lớp sơn dày lên vải vẽ.", ["oil painting", "painting surface"], [], ["blank canvas", "paint on canvas"]),
    ],
    B2: [
      v("aesthetic", "/iːsˈθetɪk/", "/esˈθetɪk/", "concerned with beauty or the appreciation of beauty", "thẩm mỹ", "adjective", "The artist focused on the aesthetic appeal of the sculpture rather than its function.", "Người nghệ sĩ tập trung vào sức hấp dẫn thẩm mỹ của tác phẩm điêu khắc thay vì công năng của nó.", ["artistic", "pleasing"], ["unaesthetic"], ["aesthetic value", "aesthetic appeal"]),
      v("perspective", "/pəˈspektɪv/", "/pərˈspektɪv/", "the art of representing three-dimensional objects on a two-dimensional surface", "phối cảnh", "noun", "The painter used linear perspective to create the illusion of depth in the landscape.", "Họa sĩ đã sử dụng phối cảnh tuyến tính để tạo ra ảo giác về chiều sâu trong bức tranh phong cảnh.", ["viewpoint", "angle"], [], ["linear perspective", "master perspective"]),
      v("depict", "/dɪˈpɪkt/", "/dɪˈpɪkt/", "to represent or show something in a picture", "mô tả, khắc họa", "verb", "The mural aims to depict the struggles of the working class during the industrial revolution.", "Bức tranh tường nhắm tới việc khắc họa những khó khăn của tầng lớp lao động trong cuộc cách mạng công nghiệp.", ["portray", "represent"], [], ["depict scenes", "vividly depict"]),
      v("curator", "/kjʊəˈreɪtə(r)/", "/ˈkjʊreɪtər/", "a keeper or custodian of a museum or other collection", "người quản lý/giám tuyển bảo tàng", "noun", "The museum curator selected the pieces for the upcoming exhibition.", "Người quản lý bảo tàng đã chọn các tác phẩm cho buổi triển lãm sắp tới.", ["organizer", "keeper"], [], ["art curator", "museum curator"]),
      v("monochrome", "/ˈmɒnəkrəʊm/", "/ˈmɑːnəkrəʊm/", "consisting of or displayed in only one color or shades of one color", "đơn sắc", "adjective", "His monochrome photography highlights the contrast between shadow and light.", "Nhiếp ảnh đơn sắc của anh ấy làm nổi bật sự tương phản giữa bóng tối và ánh sáng.", ["black-and-white", "unicoloured"], ["polychromatic"], ["monochrome painting", "monochrome palette"]),
      v("brushstroke", "/ˈbrʌfstrəʊk/", "/ˈbrʌfstroʊk/", "a mark made by a paintbrush drawn across a surface", "nét cọ", "noun", "You can see the bold brushstrokes in his later impressionist works.", "Bạn có thể thấy những nét cọ táo bạo trong các tác phẩm ấn tượng sau này của ông ấy.", ["mark", "stroke"], [], ["bold brushstroke", "visible brushstroke"]),
      v("vibrant", "/ˈvaɪbrənt/", "/ˈvaɪbrənt/", "strikingly bright or vivid colors", "rực rỡ, sống động", "adjective", "The artist used vibrant colors to convey a sense of joy and celebration.", "Người nghệ sĩ đã sử dụng những màu sắc rực rỡ để truyền tải cảm giác vui vẻ và ăn mừng.", ["bright", "lively"], ["dull"], ["vibrant colors", "vibrant display"]),
    ],
    C1: [
      v("chiaroscuro", "/ˌki.ɑː.rəˈskjʊə.rəʊ/", "/ˌki.ɑː.rəˈskʊr.oʊ/", "the treatment of light and shade in drawing and painting", "kỹ thuật tương phản sáng tối", "noun", "The artist used dramatic chiaroscuro to create a sense of mystery in the portrait.", "Họa sĩ đã sử dụng kỹ thuật tương phản sáng tối đầy kịch tính để tạo ra cảm giác bí ẩn trong bức chân dung.", ["light and shade", "contrast"], [], ["dramatic chiaroscuro", "master of chiaroscuro"]),
      v("juxtaposition", "/ˌdʒʌk.stə.pəˈzɪʃ.ən/", "/ˌdʒʌk.stə.pəˈzɪʃ.ən/", "the fact of two things being seen or placed close together with contrasting effect", "sự đặt cạnh nhau (để tạo sự tương phản)", "noun", "The juxtaposition of vibrant colors against a dark background makes the installation pop.", "Sự đặt cạnh nhau của những gam màu rực rỡ trên nền tối làm cho tác phẩm sắp đặt trở nên nổi bật.", ["contrast", "proximity"], [], ["striking juxtaposition", "visual juxtaposition"]),
      v("evocative", "/ɪˈvɒk.ə.tɪv/", "/ɪˈvɑː.kə.t̬ɪv/", "bringing strong images, memories, or feelings to mind", "gợi cảm, gợi nhớ", "adjective", "Her evocative landscapes capture the melancholy of the countryside.", "Những bức tranh phong cảnh đầy gợi cảm của cô ấy ghi lại nét u sầu của vùng nông thôn.", ["redolent", "resonant"], [], ["evocative imagery", "highly evocative"]),
      v("avant-garde", "/ˌæv.ɒ̃ˈɡɑːd/", "/ˌæv.ɑ̃ːˈɡɑːrd/", "new and experimental ideas and methods in art", "tiên phong, thử nghiệm", "adjective", "The gallery is known for showcasing avant-garde works that challenge traditional norms.", "Phòng tranh này nổi tiếng với việc trưng bày các tác phẩm tiên phong thách thức những quy chuẩn truyền thống.", ["experimental", "innovative"], ["traditional"], ["avant-garde movement", "avant-garde artist"]),
      v("curate", "/kjʊəˈreɪt/", "/ˈkjʊr.eɪt/", "to select, organize, and look after the items in a collection or exhibition", "tổ chức, giám tuyển (triển lãm)", "verb", "The museum invited a guest historian to curate the upcoming exhibition on Renaissance art.", "Bảo tàng đã mời một nhà sử học khách mời để giám tuyển cho cuộc triển lãm sắp tới về nghệ thuật thời Phục hưng.", ["organize", "select"], [], ["curate an exhibition", "carefully curated"]),
      v("ephemeral", "/ɪˈfem.ər.əl/", "/əˈfem.ɚ.əl/", "lasting for a very short time", "phù du, chóng tàn", "adjective", "The artist focuses on ephemeral installations made of ice that melt within hours.", "Người nghệ sĩ tập trung vào các tác phẩm sắp đặt phù du làm từ băng, tan chảy chỉ trong vài giờ.", ["transient", "fleeting"], ["permanent"], ["ephemeral art", "ephemeral nature"]),
      v("eclectic", "/ɪˈklek.tɪk/", "/ɪˈklek.tɪk/", "deriving ideas, style, or taste from a broad and diverse range of sources", "chiết trung, đa dạng (phong cách)", "adjective", "His collection is an eclectic mix of contemporary photography and classical sketches.", "Bộ sưu tập của anh ấy là một sự pha trộn chiết trung giữa nhiếp ảnh đương đại và các bức phác thảo cổ điển.", ["diverse", "varied"], ["uniform"], ["eclectic style", "eclectic collection"]),
      v("visceral", "/ˈvɪs.ər.əl/", "/ˈvɪs.ɚ.əl/", "relating to deep inward feelings rather than to the intellect", "thuộc về bản năng, cảm xúc mạnh", "adjective", "The sculpture evokes a visceral reaction from viewers due to its raw, distorted form.", "Tác phẩm điêu khắc gợi lên phản ứng cảm xúc mạnh mẽ từ người xem nhờ hình dáng thô ráp, méo mó của nó.", ["instinctive", "gut"], ["intellectual"], ["visceral reaction", "visceral impact"]),
    ],
    C2: [
      v("impasto", "/ɪmˈpæs.təʊ/", "/ɪmˈpæs.toʊ/", "The process or technique of laying on paint or pigment thickly so that it stands out from a surface.", "Kỹ thuật vẽ đắp dày", "noun", "Van Gogh is renowned for his expressive use of impasto, which adds a tangible texture to his canvases.", "Van Gogh nổi tiếng với việc sử dụng kỹ thuật vẽ đắp dày đầy biểu cảm, tạo thêm kết cấu hữu hình cho các bức tranh của ông.", ["thick application", "texture"], [], ["heavy impasto", "expressive impasto"]),
      v("pentimento", "/ˌpen.tɪˈmen.təʊ/", "/ˌpen.tɪˈmen.toʊ/", "An alteration in a painting, evidenced by traces of previous work, showing that the artist changed their mind during the process.", "Vết sửa tranh (dấu vết cho thấy nghệ sĩ đã thay đổi chi tiết gốc)", "noun", "X-ray analysis of the portrait revealed a subtle pentimento, suggesting the artist had originally intended a different pose.", "Phân tích tia X của bức chân dung đã tiết lộ một vết sửa tranh tinh tế, cho thấy người nghệ sĩ ban đầu đã dự định một tư thế khác.", ["alteration", "revision"], [], ["revealing a pentimento", "subtle pentimento"]),
      v("sfumato", "/sfuːˈmɑː.təʊ/", "/sfuˈmɑː.toʊ/", "The technique of allowing tones and colors to shade gradually into one another, producing softened outlines or hazy forms.", "Kỹ thuật vẽ nhòe (làm mờ đường nét)", "noun", "Leonardo da Vinci’s Mona Lisa is the quintessential example of sfumato, creating an enigmatic and atmospheric quality.", "Bức Mona Lisa của Leonardo da Vinci là ví dụ điển hình nhất của kỹ thuật vẽ nhòe, tạo ra một vẻ bí ẩn và đầy chất thơ.", ["blending", "soft-focus"], ["sharp outline"], ["masterful sfumato", "delicate sfumato"]),
      v("tessera", "/ˈtes.ər.ə/", "/ˈtes.ər.ə/", "A small block of stone, tile, glass, or other material used in the construction of a mosaic.", "Người nghệ nhân cẩn thận đặt từng mảnh ghép để đảm bảo hoa văn hình học phức tạp được căn chỉnh hoàn hảo.", "noun", "The artisan carefully placed each individual tessera to ensure the intricate geometric pattern was perfectly aligned.", "", ["mosaic tile", "fragment"], [], ["glass tessera", "placing a tessera"]),
      v("trompe-l'oeil", "/trɒmpˈlɜː/", "/trɒmpˈlɔɪ/", "A style of painting in which objects are depicted with photographically realistic detail to create the illusion of three dimensions.", "Kỹ thuật vẽ đánh lừa thị giác", "noun", "The muralist utilized trompe-l'oeil to make the flat wall appear as if it opened into a vast Mediterranean balcony.", "Người họa sĩ vẽ tranh tường đã sử dụng kỹ thuật đánh lừa thị giác để khiến bức tường phẳng trông như thể nó mở ra một ban công Địa Trung Hải rộng lớn.", ["optical illusion", "trick of the eye"], [], ["master of trompe-l'oeil", "convincing trompe-l'oeil"]),
      v("provenance", "/ˈprɒv.ən.əns/", "/ˈprɑː.vən.əns/", "The place of origin or the history of the ownership of a work of art, used as a guide to authenticity.", "Nguồn gốc xuất xứ (của tác phẩm nghệ thuật)", "noun", "Before purchasing the painting at auction, the gallery verified its provenance to ensure it was not a stolen artifact.", "Trước khi mua bức tranh tại buổi đấu giá, phòng tranh đã xác minh nguồn gốc xuất xứ của nó để đảm bảo đó không phải là hiện vật bị đánh cắp.", ["origin", "pedigree"], [], ["impeccable provenance", "verified provenance"]),
      v("juxtapose", "/ˌdʒʌk.stəˈpəʊz/", "/ˌdʒʌk.stəˈpoʊz/", "To place or deal with close together for contrasting effect.", "Đặt cạnh nhau (để tạo sự tương phản)", "verb", "The exhibition serves to juxtapose classical marble sculptures with modern digital installations to highlight the evolution of form.", "Triển lãm nhằm mục đích đặt các tác phẩm điêu khắc bằng đá cẩm thạch cổ điển cạnh các tác phẩm sắp đặt kỹ thuật số hiện đại để làm nổi bật sự tiến hóa của hình thái.", ["contrast", "collocate"], ["separate"], ["juxtapose elements", "juxtapose styles"]),
    ],
  },
  "Literature": {
    A1: [
      v("story", "/ˈstɔːri/", "/ˈstɔːri/", "a description of imaginary or real events", "câu chuyện", "noun", "She told us a funny story.", "Cô ấy kể cho chúng tôi nghe một câu chuyện vui.", ["tale"], [], ["tell a story", "short story"]),
      v("word", "/wɜːd/", "/wɜːrd/", "a single unit of language", "từ", "noun", "I do not know this word.", "Tôi không biết từ này.", ["term"], [], ["new word", "write a word"]),
      v("long", "/lɒŋ/", "/lɔːŋ/", "having a large distance from beginning to end", "dài", "adjective", "This is a very long book.", "Đây là một cuốn sách rất dài.", ["lengthy"], ["short"], ["long story", "long book"]),
    ],
    A2: [
      v("title", "/ˈtaɪtl/", "/ˈtaɪtl/", "the name of a book or story", "tiêu đề, tựa đề", "noun", "Do you know the title of this book?", "Bạn có biết tựa đề của cuốn sách này không?", ["heading"], [], ["book title", "catchy title"]),
    ],
    B1: [
      v("thriller", "/ˈθrɪlə(r)/", "/ˈθrɪlər/", "a book or movie with an exciting story, often about crime or spies", "truyện giật gân, phim ly kỳ", "noun", "I couldn't put the thriller down because it was so exciting.", "Tôi không thể rời mắt khỏi cuốn truyện giật gân đó vì nó quá hồi hộp.", ["suspense novel", "page-turner"], [], ["crime thriller", "psychological thriller"]),
      v("describe", "/dɪˈskraɪb/", "/dɪˈskraɪb/", "to say what someone or something is like", "miêu tả", "verb", "The writer uses vivid words to describe the beautiful forest.", "Nhà văn sử dụng những từ ngữ sống động để miêu tả khu rừng xinh đẹp.", ["portray", "depict"], [], ["vividly describe", "describe in detail"]),
      v("fictional", "/ˈfɪkʃənl/", "/ˈfɪkʃənl/", "imaginary or not real", "thuộc về hư cấu", "adjective", "The detective in the book is a fictional character.", "Vị thám tử trong cuốn sách là một nhân vật hư cấu.", ["imaginary", "invented"], ["real", "factual"], ["fictional story", "fictional world"]),
    ],
    B2: [
      v("foreshadowing", "/fɔːˈʃæd.əʊ.ɪŋ/", "/fɔːrˈʃæd.oʊ.ɪŋ/", "a warning or indication of a future event in a story", "sự báo trước, điềm báo", "noun", "The dark clouds at the beginning of the chapter serve as foreshadowing for the tragic ending.", "Những đám mây đen ở đầu chương đóng vai trò như một điềm báo cho kết thúc bi thảm.", ["omen", "premonition"], [], ["subtle foreshadowing", "effective foreshadowing"]),
      v("imagery", "/ˈɪm.ɪdʒ.ər.i/", "/ˈɪm.ɪdʒ.ər.i/", "visually descriptive or figurative language used in literature", "hình ảnh tượng trưng", "noun", "The poet uses vivid imagery to describe the beauty of the countryside.", "Nhà thơ sử dụng hình ảnh sống động để mô tả vẻ đẹp của vùng quê.", ["metaphor", "description"], [], ["vivid imagery", "poetic imagery"]),
      v("characterize", "/ˈkær.ək.tə.raɪz/", "/ˈker.ək.tə.raɪz/", "to describe the qualities or peculiarities of a character", "khắc họa, mô tả đặc điểm", "verb", "The author characterizes the hero as a lonely but determined wanderer.", "Tác giả khắc họa nhân vật chính như một lữ khách cô đơn nhưng đầy quyết tâm.", ["portray", "depict"], [], ["characterize someone as", "well-characterized"]),
      v("allusion", "/əˈluː.ʒən/", "/əˈluː.ʒən/", "an expression designed to call something to mind without mentioning it explicitly", "sự ám chỉ, sự nói bóng gió", "noun", "The poem makes a subtle allusion to classical Greek mythology.", "Bài thơ có một sự ám chỉ tinh tế đến thần thoại Hy Lạp cổ đại.", ["reference", "suggestion"], [], ["make an allusion", "literary allusion"]),
      v("compelling", "/kəmˈpel.ɪŋ/", "/kəmˈpel.ɪŋ/", "evoking interest, attention, or admiration in a powerfully irresistible way", "thuyết phục, hấp dẫn", "adjective", "It is a compelling story that keeps you turning the pages until the very end.", "Đó là một câu chuyện hấp dẫn khiến bạn không thể rời mắt cho đến tận trang cuối cùng.", ["captivating", "gripping"], ["dull"], ["compelling narrative", "compelling character"]),
    ],
    C1: [
      v("foreshadow", "/fɔːˈʃæd.əʊ/", "/fɔːrˈʃæd.oʊ/", "be a warning or indication of a future event", "báo trước, điềm báo", "verb", "The dark clouds at the beginning of the play foreshadow the tragic ending.", "Những đám mây đen ở đầu vở kịch báo trước cái kết bi thảm.", ["presage", "augur"], [], ["heavily foreshadow", "foreshadow the outcome"]),
      v("verisimilitude", "/ˌver.ɪ.sɪˈmɪl.ɪ.tjuːd/", "/ˌver.ə.səˈmɪl.ə.tuːd/", "the appearance of being true or real", "tính chân thực, sự giống như thật", "noun", "The author's attention to historical detail gives the story a sense of verisimilitude.", "Sự chú ý của tác giả vào các chi tiết lịch sử mang lại cho câu chuyện cảm giác chân thực.", ["realism", "authenticity"], ["implausibility"], ["artistic verisimilitude", "striking verisimilitude"]),
      v("soliloquy", "/səˈlɪl.ə.kwi/", "/səˈlɪl.ə.kwi/", "an act of speaking one's thoughts aloud when by oneself, especially by a character in a play", "độc thoại nội tâm", "noun", "The protagonist's soliloquy reveals his inner conflict and deepest fears.", "Lời độc thoại của nhân vật chính tiết lộ mâu thuẫn nội tâm và những nỗi sợ hãi sâu thẳm nhất của anh ta.", ["monologue", "aside"], [], ["dramatic soliloquy", "powerful soliloquy"]),
      v("delineate", "/dɪˈlɪn.i.eɪt/", "/dɪˈlɪn.i.eɪt/", "to describe or portray something precisely", "mô tả chi tiết, phác họa", "verb", "The biographer carefully delineates the complex relationship between the two poets.", "Người viết tiểu sử mô tả tỉ mỉ mối quan hệ phức tạp giữa hai nhà thơ.", ["depict", "outline"], [], ["delineate a character", "clearly delineate"]),
      v("poignant", "/ˈpɔɪ.njənt/", "/ˈpɔɪ.njənt/", "evoking a keen sense of sadness or regret", "đau lòng, cảm động, sâu sắc", "adjective", "It is a poignant tale of loss and recovery.", "Đó là một câu chuyện cảm động về sự mất mát và phục hồi.", ["touching", "affecting"], [], ["poignant reminder", "poignant scene"]),
      v("lucid", "/ˈluː.sɪd/", "/ˈluː.sɪd/", "expressed clearly; easy to understand", "sáng sủa, dễ hiểu", "adjective", "The critic praised the author for her lucid analysis of the complex text.", "Nhà phê bình khen ngợi tác giả vì cách phân tích sáng sủa của bà về văn bản phức tạp.", ["coherent", "articulate"], ["obscure"], ["lucid style", "lucid explanation"]),
    ],
    C2: [
      v("bildungsroman", "/ˌbɪldʊŋsrəˈmɑːn/", "/ˌbɪldʊŋsrəˈmɑːn/", "A novel dealing with one person's formative years or spiritual education.", "Tiểu thuyết giáo dục", "noun", "The protagonist's journey from innocence to maturity makes this classic a quintessential bildungsroman.", "Hành trình từ sự ngây thơ đến trưởng thành của nhân vật chính khiến tác phẩm kinh điển này trở thành một cuốn tiểu thuyết giáo dục điển hình.", ["coming-of-age novel"], [], ["quintessential bildungsroman", "classic bildungsroman"]),
      v("denouement", "/deɪˈnuːmɒ̃/", "/deɪˈnuːmɑː/", "The final part of a play, movie, or narrative in which the strands of the plot are drawn together and matters are explained or resolved.", "Kết cục, phần kết", "noun", "The complex mystery reaches its dramatic denouement in the final chapter.", "Vụ án bí ẩn phức tạp đạt đến phần kết đầy kịch tính trong chương cuối cùng.", ["resolution", "climax"], ["exposition"], ["dramatic denouement", "reach a denouement"]),
      v("pastiche", "/pæˈstiːʃ/", "/pæˈstiːʃ/", "A work of visual art, literature, or music that imitates the style or character of the work of one or more other artists.", "Tác phẩm mô phỏng, sự bắt chước phong cách", "noun", "The novel is a clever pastiche of Victorian detective fiction.", "Cuốn tiểu thuyết là một tác phẩm mô phỏng khéo léo phong cách tiểu thuyết trinh thám thời Victoria.", ["imitation", "parody"], [], ["clever pastiche", "literary pastiche"]),
      v("epistolary", "/ɪˈpɪstələri/", "/ɪˈpɪstəleri/", "Relating to or contained in letters.", "Dưới dạng thư từ", "adjective", "The author chose an epistolary format to convey the characters' deepest, most private thoughts.", "Tác giả đã chọn định dạng thư từ để truyền tải những suy nghĩ thầm kín và sâu sắc nhất của các nhân vật.", ["letter-based"], [], ["epistolary novel", "epistolary format"]),
      v("prolix", "/ˈprəʊlɪks/", "/ˈproʊlɪks/", "(of speech or writing) using or containing too many words; tediously lengthy.", "Dài dòng, rườm rà", "adjective", "The critic complained that the author's prolix style obscured the narrative's central theme.", "Nhà phê bình phàn nàn rằng phong cách dài dòng của tác giả đã làm lu mờ chủ đề chính của câu chuyện.", ["verbose", "wordy"], ["concise"], ["prolix style", "prolix prose"]),
      v("intertextuality", "/ˌɪntətekstʃuˈæləti/", "/ˌɪntərtekstʃuˈæləti/", "The relationship between texts, especially literary ones.", "Tính liên văn bản", "noun", "The author employs intertextuality by referencing classical mythology throughout the novel.", "Tác giả sử dụng tính liên văn bản bằng cách tham chiếu thần thoại cổ điển xuyên suốt cuốn tiểu thuyết.", ["allusion", "textual reference"], [], ["literary intertextuality", "employ intertextuality"]),
      v("garrulous", "/ˈɡærələs/", "/ˈɡærələs/", "Excessively talkative, especially on trivial matters.", "Nói nhiều, huyên thuyên", "adjective", "The narrator's garrulous tone captures the eccentric personality of the aging character perfectly.", "Giọng điệu huyên thuyên của người dẫn chuyện khắc họa hoàn hảo tính cách lập dị của nhân vật đã có tuổi.", ["loquacious", "talkative"], ["taciturn"], ["garrulous narrator", "garrulous character"]),
    ],
  },
  "Festivals & Traditions": {
    A1: [
      v("festival", "/ˈfestɪvəl/", "/ˈfestəvəl/", "a special day or period of celebration", "lễ hội", "noun", "We go to the spring festival every year.", "Chúng tôi đi lễ hội mùa xuân hàng năm.", ["celebration", "gala"], [], ["music festival", "annual festival"]),
      v("gift", "/ɡɪft/", "/ɡɪft/", "something that you give to someone", "quà tặng", "noun", "I have a small gift for you.", "Tôi có một món quà nhỏ cho bạn.", ["present", "offering"], [], ["give a gift", "birthday gift"]),
      v("wear", "/weə(r)/", "/wer/", "to have clothes on your body", "mặc", "verb", "People wear nice clothes for the party.", "Mọi người mặc quần áo đẹp cho bữa tiệc.", ["dress in", "don"], [], ["wear clothes", "wear traditional dress"]),
    ],
    A2: [
      v("celebrate", "/ˈsel.ə.breɪt/", "/ˈsel.ə.breɪt/", "to show that a day or event is important by doing something special", "ăn mừng, tổ chức", "verb", "We celebrate the New Year with our family every year.", "Chúng tôi ăn mừng năm mới cùng gia đình mỗi năm.", ["party", "observe"], ["ignore"], ["celebrate a festival", "celebrate a birthday"]),
      v("traditional", "/trəˈdɪʃ.ən.əl/", "/trəˈdɪʃ.ən.əl/", "following ideas and methods that have existed for a long time", "thuộc về truyền thống", "adjective", "They wore traditional clothes during the ceremony.", "Họ đã mặc trang phục truyền thống trong suốt buổi lễ.", ["customary", "classic"], ["modern"], ["traditional food", "traditional music"]),
      v("parade", "/pəˈreɪd/", "/pəˈreɪd/", "a public celebration where a group of people move through the streets", "cuộc diễu hành", "noun", "The city held a colorful parade for the festival.", "Thành phố đã tổ chức một cuộc diễu hành đầy màu sắc cho lễ hội.", ["procession", "march"], [], ["join a parade", "watch a parade"]),
      v("costume", "/ˈkɒs.tjuːm/", "/ˈkɑː.stuːm/", "special clothes worn for a festival or event", "trang phục hóa trang", "noun", "The children wore funny costumes to the party.", "Những đứa trẻ đã mặc những bộ trang phục hài hước đến bữa tiệc.", ["outfit", "dress"], [], ["wear a costume", "make a costume"]),
      v("custom", "/ˈkʌs.təm/", "/ˈkʌs.təm/", "a habit or activity that has been done by a group of people for a long time", "phong tục", "noun", "It is a local custom to give lucky money to children.", "Tặng tiền lì xì cho trẻ em là một phong tục địa phương.", ["tradition", "practice"], [], ["local custom", "follow a custom"]),
      v("firework", "/ˈfaɪə.wɜːk/", "/ˈfaɪr.wɝːk/", "a small object that explodes to make a loud noise and bright colors", "pháo hoa", "noun", "We watched the beautiful fireworks in the sky at midnight.", "Chúng tôi đã xem pháo hoa rực rỡ trên bầu trời vào lúc nửa đêm.", ["pyrotechnics"], [], ["set off fireworks", "firework display"]),
      v("perform", "/pəˈfɔːm/", "/pɚˈfɔːrm/", "to entertain people by dancing, singing, or acting", "biểu diễn", "verb", "The dancers will perform a traditional dance tonight.", "Các vũ công sẽ biểu diễn một điệu múa truyền thống vào tối nay.", ["present", "act"], [], ["perform a dance", "perform on stage"]),
      v("ceremony", "/ˈser.ɪ.mə.ni/", "/ˈser.ə.moʊ.ni/", "a formal event held on an important occasion", "buổi lễ", "noun", "They attended a wedding ceremony last weekend.", "Họ đã tham dự một buổi lễ cưới vào cuối tuần trước.", ["rite", "service"], [], ["opening ceremony", "wedding ceremony"]),
      v("gather", "/ˈɡæð.ər/", "/ˈɡæð.ɚ/", "to come together in one place", "tụ họp, sum vầy", "verb", "Families gather to eat together during the holiday.", "Các gia đình tụ họp để ăn cùng nhau trong kỳ nghỉ lễ.", ["assemble", "meet"], ["disperse"], ["gather together", "gather for a meal"]),
    ],
    B1: [
      v("procession", "/prəˈseʃ.ən/", "/prəˈseʃ.ən/", "a line of people who are walking or traveling in a formal way as part of a religious ceremony or public event", "đám rước, đoàn diễu hành", "noun", "The festival began with a colorful procession through the streets.", "Lễ hội bắt đầu bằng một đám rước đầy màu sắc đi qua các con phố.", ["parade", "march"], [], ["religious procession", "lead a procession"]),
      v("annual", "/ˈæn.ju.əl/", "/ˈæn.ju.əl/", "happening once every year", "hàng năm", "adjective", "The village holds an annual festival to thank the gods for a good harvest.", "Ngôi làng tổ chức một lễ hội hàng năm để cảm ơn các vị thần vì một vụ mùa bội thu.", ["yearly"], [], ["annual festival", "annual event"]),
      v("ritual", "/ˈrɪtʃ.u.əl/", "/ˈrɪtʃ.u.əl/", "a set of fixed actions and sometimes words performed regularly, especially as part of a ceremony", "nghi thức, nghi lễ", "noun", "The community performed an ancient ritual to bring good luck for the new year.", "Cộng đồng đã thực hiện một nghi lễ cổ xưa để mang lại may mắn cho năm mới.", ["ceremony", "rite"], [], ["perform a ritual", "religious ritual"]),
      v("spectacular", "/spekˈtæk.jə.lər/", "/spekˈtæk.jə.lɚ/", "very exciting to look at or very impressive", "đẹp mắt, ngoạn mục", "adjective", "The fireworks display at the end of the festival was truly spectacular.", "Màn trình diễn pháo hoa vào cuối lễ hội thực sự rất ngoạn mục.", ["impressive", "magnificent"], ["dull"], ["spectacular display", "spectacular performance"]),
      v("ancestor", "/ˈæn.ses.tər/", "/ˈæn.ses.tɚ/", "a person related to you who lived a long time ago", "tổ tiên", "noun", "Many festivals include offerings to honor our ancestors.", "Nhiều lễ hội bao gồm các lễ vật để tôn vinh tổ tiên của chúng ta.", ["forefather"], ["descendant"], ["worship ancestors", "honor ancestors"]),
    ],
    B2: [
      v("commemorate", "/kəˈmem.ə.reɪt/", "/kəˈmem.ə.reɪt/", "to recall and show respect for someone or something in a ceremony", "tưởng niệm, kỷ niệm", "verb", "The town holds an annual parade to commemorate the historical victory.", "Thị trấn tổ chức một cuộc diễu hành hàng năm để tưởng niệm chiến thắng lịch sử.", ["celebrate", "memorialize"], ["forget"], ["commemorate an event", "commemorate the anniversary"]),
      v("festivity", "/fesˈtɪv.ə.ti/", "/fesˈtɪv.ə.t̬i/", "the atmosphere or activities of a celebration", "sự tưng bừng, không khí lễ hội", "noun", "The streets were filled with music and joy during the mid-winter festivity.", "Đường phố tràn ngập âm nhạc và niềm vui trong suốt lễ hội giữa mùa đông.", ["celebration", "merrymaking"], [], ["holiday festivity", "join the festivities"]),
      v("ancestral", "/ænˈses.trəl/", "/ænˈses.trəl/", "relating to members of your family from past generations", "thuộc về tổ tiên", "adjective", "They traveled back to their ancestral village to perform the traditional rites.", "Họ trở về ngôi làng tổ tiên để thực hiện các nghi lễ truyền thống.", ["hereditary", "familial"], [], ["ancestral home", "ancestral worship"]),
      v("spectacle", "/ˈspek.tə.kəl/", "/ˈspek.tə.kəl/", "a visually striking performance or display", "cảnh tượng, màn trình diễn hoành tráng", "noun", "The fireworks display at the festival was a truly magnificent spectacle.", "Màn trình diễn pháo hoa tại lễ hội là một cảnh tượng thực sự tráng lệ.", ["display", "show"], [], ["public spectacle", "create a spectacle"]),
      v("observance", "/əbˈzɜː.vəns/", "/əbˈzɝː.vəns/", "the act of obeying a law or following a custom", "sự tuân thủ, việc cử hành (lễ nghi)", "noun", "Strict observance of these traditions has kept the community united for centuries.", "", ["celebration", "adherence"], ["disregard"], ["religious observance", "in observance of"]),
      v("impart", "/ɪmˈpɑːt/", "/ɪmˈpɑːrt/", "to pass on information or knowledge to someone", "truyền đạt, truyền thụ", "verb", "Elders often impart the history of the festival to the younger generation.", "Người lớn tuổi thường truyền đạt lịch sử của lễ hội cho thế hệ trẻ.", ["convey", "pass on"], [], ["impart knowledge", "impart wisdom"]),
      v("reverence", "/ˈrev.ər.əns/", "/ˈrev.ɚ.əns/", "deep respect for someone or something", "sự tôn kính", "noun", "They treat their cultural traditions with great reverence.", "Họ đối xử với các truyền thống văn hóa của mình bằng sự tôn kính lớn.", ["respect", "awe"], ["disrespect"], ["show reverence", "deep reverence"]),
    ],
    C1: [
      v("auspicious", "/ɔːˈspɪʃ.əs/", "/ɑːˈspɪʃ.əs/", "Suggesting that a future success is likely; favorable.", "có điềm lành, cát tường", "adjective", "Many couples choose an auspicious date according to the lunar calendar to hold their traditional wedding ceremony.", "Nhiều cặp đôi chọn ngày lành tháng tốt theo âm lịch để tổ chức lễ cưới truyền thống.", ["favorable", "propitious"], ["ominous"], ["auspicious occasion", "auspicious start"]),
      v("rituals", "/ˈrɪtʃ.u.əlz/", "/ˈrɪtʃ.u.əlz/", "A series of actions or a type of behavior regularly and invariably followed by someone.", "nghi thức, nghi lễ", "noun", "Passing down ancestral rituals is essential for preserving the cultural identity of the ethnic community.", "Việc truyền lại các nghi lễ tổ tiên là điều cần thiết để bảo tồn bản sắc văn hóa của cộng đồng dân tộc.", ["ceremonies", "customs"], [], ["perform rituals", "sacred rituals"]),
      v("pageantry", "/ˈpædʒ.ən.tri/", "/ˈpædʒ.ən.tri/", "Spectacular display or ceremony, often involving elaborate costumes and music.", "sự phô trương, nghi thức hoành tráng", "noun", "The royal procession was marked by great pageantry, attracting thousands of spectators to the capital.", "Đoàn rước hoàng gia nổi bật với sự phô trương lộng lẫy, thu hút hàng ngàn khán giả đến thủ đô.", ["spectacle", "pomp"], [], ["color and pageantry", "elaborate pageantry"]),
      v("inveterate", "/ɪnˈvet.ər.ət/", "/ɪnˈvet̬.ɚ.ət/", "Having a particular habit, activity, or interest that is long-established and unlikely to change.", "thâm căn cố đế, lâu đời", "adjective", "They are inveterate believers in the local folklore, never missing the annual solstice festival.", "Họ là những người tin tưởng lâu đời vào văn hóa dân gian địa phương, không bao giờ bỏ lỡ lễ hội hạ chí hàng năm.", ["entrenched", "habitual"], [], ["inveterate tradition", "inveterate custom"]),
      v("immemorial", "/ˌɪm.əˈmɔː.ri.əl/", "/ˌɪm.əˈmɔːr.i.əl/", "Originating in the distant past; very old.", "từ thuở xa xưa, cổ xưa", "adjective", "This dance has been performed since time immemorial as a way to pray for rain.", "Điệu múa này đã được trình diễn từ thuở xa xưa như một cách để cầu mưa.", ["ancient", "primordial"], ["modern"], ["time immemorial", "ancient and immemorial"]),
      v("proliferate", "/prəˈlɪf.ər.eɪt/", "/prəˈlɪf.ə.reɪt/", "To increase rapidly in numbers; to multiply.", "sinh sôi nảy nở, phát triển nhanh", "verb", "Cultural activities tend to proliferate during the New Year season as people reconnect with their roots.", "Các hoạt động văn hóa có xu hướng phát triển mạnh mẽ trong mùa Tết khi mọi người kết nối lại với cội nguồn.", ["multiply", "burgeon"], ["decline"], ["traditions proliferate", "activities proliferate"]),
      v("obliterate", "/əˈblɪt.ə.reɪt/", "/əˈblɪt̬.ə.reɪt/", "To remove or destroy all traces of something.", "xóa bỏ, làm lu mờ", "verb", "Modernization threatens to obliterate many indigenous traditions that have survived for centuries.", "Hiện đại hóa đe dọa xóa bỏ nhiều truyền thống bản địa đã tồn tại qua nhiều thế kỷ.", ["eradicate", "efface"], ["preserve"], ["obliterate traditions", "completely obliterate"]),
    ],
    C2: [
      v("proclivity", "/prəˈklɪv.ə.ti/", "/proʊˈklɪv.ə.t̬i/", "a tendency or inclination to choose or do something regularly", "Cộng đồng này có một thiên hướng lâu đời đối với các nghi lễ thờ cúng tổ tiên cầu kỳ trong chu kỳ mặt trăng.", "noun", "The community has a long-standing proclivity for ornate ancestral veneration rites during the lunar cycle.", "", ["inclination", "predilection"], ["aversion"], ["strong proclivity", "cultural proclivity"]),
      v("obsequies", "/ˈɒb.sɪ.kwiz/", "/ˈɑːb.sə.kwiːz/", "funeral rites or ceremonies performed as a tradition", "nghi lễ tang ma", "noun", "The village observed ancient obsequies for the village elder, involving traditional chants and incense offerings.", "Ngôi làng đã cử hành các nghi lễ tang ma cổ xưa cho vị trưởng làng, bao gồm các bài tụng ca và dâng hương truyền thống.", ["funeral rites", "exequies"], [], ["solemn obsequies", "perform obsequies"]),
      v("talismanic", "/ˌtæl.ɪzˈmæn.ɪk/", "/ˌtæl.ɪzˈmæn.ɪk/", "possessing or believed to possess magical or protective power", "có tính chất bùa chú, mang lại điềm lành", "adjective", "The dancers wore talismanic charms meant to ward off evil spirits during the harvest festival.", "Các vũ công đeo những lá bùa hộ mệnh nhằm xua đuổi tà ma trong lễ hội thu hoạch.", ["amuletic", "magical"], [], ["talismanic object", "talismanic significance"]),
      v("reverberate", "/rɪˈvɜː.bər.eɪt/", "/rɪˈvɝː.bə.reɪt/", "to have a continuing and serious effect; to echo or resonate through a culture", "vang vọng, tạo tiếng vang", "verb", "The spirit of the folk music traditions continues to reverberate through the younger generation's compositions.", "Tinh thần của các truyền thống âm nhạc dân gian vẫn tiếp tục vang vọng qua các sáng tác của thế hệ trẻ.", ["resonate", "echo"], [], ["reverberate through", "deeply reverberate"]),
      v("effigy", "/ˈef.ɪ.dʒi/", "/ˈef.ə.dʒi/", "a sculpture or model of a person, often burned as part of a ritual", "hình nộm", "noun", "Burning an effigy of the winter spirits is a central tradition to symbolize the end of the harsh season.", "Việc đốt hình nộm các linh hồn mùa đông là một truyền thống trung tâm để tượng trưng cho sự kết thúc của mùa khắc nghiệt.", ["likeness", "dummy"], [], ["burn in effigy", "effigy of"]),
      v("liturgy", "/ˈlɪt.ə.dʒi/", "/ˈlɪt̬.ɚ.dʒi/", "a form or formulary according to which public religious worship is conducted", "nghi thức phụng vụ", "noun", "The intricate liturgy of the temple festival has remained unchanged for centuries.", "Nghi thức phụng vụ phức tạp của lễ hội đền thờ vẫn không thay đổi trong nhiều thế kỷ.", ["ritual", "ceremonial"], [], ["religious liturgy", "follow the liturgy"]),
      v("gala", "/ˈɡɑː.lə/", "/ˈɡeɪ.lə/", "a social occasion with special entertainments or performances", "buổi dạ tiệc, lễ hội trang trọng", "noun", "The cultural gala featured performances that highlighted the rich diversity of the region's intangible heritage.", "Buổi dạ tiệc văn hóa có các màn trình diễn làm nổi bật sự đa dạng phong phú của di sản phi vật thể trong khu vực.", ["festivity", "celebration"], [], ["charity gala", "cultural gala"]),
    ],
  },
};


// Seed function
async function seedVocab() {
  console.log("🌱 Seeding Vocabulary Data - Arts & Culture...");

  // Get or create topic group
  const topicGroup = await prisma.topicGroup.upsert({
    where: { name_hubType: { name: "Arts & Culture", hubType: "vocab" } },
    update: {},
    create: {
      name: "Arts & Culture",
      order: 12,
      hubType: "vocab",
      subcategories: [
        "Music",
        "Visual Arts",
        "Literature",
        "Festivals & Traditions",
      ],
    },
  });

  // Helper to slugify
  const slugify = (text: string) => text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

  // Iterate over subcategories
  for (const [subcat, levelsData] of Object.entries(artsandcultureVocab)) {
    console.log(`Processing Subcategory: ${subcat}`);

    for (const [level, vocabItems] of Object.entries(levelsData)) {
      const currentLevel = level as Level;
      const items = vocabItems as ReturnType<typeof v>[];

      if (!items || items.length === 0) continue;

      const topicId = `arts-and-culture-${slugify(subcat)}-${currentLevel.toLowerCase()}`;

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
          category: "Arts & Culture",
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

  console.log("✅ Arts & Culture seeded successfully!");
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
