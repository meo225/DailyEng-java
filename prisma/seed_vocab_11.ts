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
// TOPIC GROUP 11: SCIENCE
// ============================================

const scienceVocab = {
  "Physics & Chemistry": {
    A1: [
      v("light", "/laɪt/", "/laɪt/", "the form of energy that makes things visible", "ánh sáng", "noun", "The sun gives us light.", "Mặt trời cho chúng ta ánh sáng.", ["illumination"], ["darkness"], ["bright light", "speed of light"]),
      v("gas", "/ɡæs/", "/ɡæs/", "a substance like air that is not solid or liquid", "chất khí", "noun", "Oxygen is a type of gas.", "Oxy là một loại chất khí.", ["vapor"], ["solid"], ["natural gas", "gas state"]),
      v("solid", "/ˈsɒlɪd/", "/ˈsɑːlɪd/", "a substance that is firm and stable in shape", "chất rắn", "noun", "Ice is a solid.", "Đá là một chất rắn.", ["hard object"], ["liquid"], ["solid state", "solid object"]),
      v("slow", "/sləʊ/", "/sloʊ/", "moving at a low speed", "chậm", "adjective", "The chemical reaction is very slow.", "Phản ứng hóa học này rất chậm.", ["gradual"], ["fast"], ["very slow", "slow process"]),
      v("melt", "/melt/", "/melt/", "to change from a solid to a liquid state", "tan chảy", "verb", "Ice will melt in the sun.", "Đá sẽ tan chảy dưới ánh mặt trời.", ["thaw", "liquefy"], ["freeze"], ["melt away", "start to melt"]),
    ],
    A2: [
      v("liquid", "/ˈlɪkwɪd/", "/ˈlɪkwɪd/", "A substance that flows freely but has a constant volume.", "chất lỏng", "noun", "Water is a liquid at room temperature.", "Nước là chất lỏng ở nhiệt độ phòng.", ["fluid"], ["solid"], ["liquid state", "pour liquid"]),
      v("force", "/fɔːs/", "/fɔːrs/", "A push or pull on an object.", "lực", "noun", "Gravity is a force that pulls things to the ground.", "Trọng lực là một loại lực kéo mọi thứ xuống mặt đất.", ["power", "strength"], [], ["apply force", "physical force"]),
      v("metal", "/ˈmetl/", "/ˈmetl/", "A hard, shiny material like iron or gold that conducts electricity.", "kim loại", "noun", "Iron is a common metal used in building.", "Sắt là một loại kim loại phổ biến được sử dụng trong xây dựng.", ["element"], [], ["heavy metal", "sheet metal"]),
    ],
    B1: [
      v("substance", "/ˈsʌbstəns/", "/ˈsʌbstəns/", "a particular type of matter with uniform properties", "chất, vật chất", "noun", "The scientist identified an unknown substance in the liquid.", "Nhà khoa học đã xác định được một chất lạ trong dung dịch.", ["material", "matter"], [], ["chemical substance", "pure substance"]),
      v("dissolve", "/dɪˈzɒlv/", "/dɪˈzɑːlv/", "to become incorporated into a liquid so as to form a solution", "hòa tan", "verb", "Sugar will dissolve faster in hot water than in cold water.", "Đường sẽ hòa tan nhanh hơn trong nước nóng so với nước lạnh.", ["melt", "liquefy"], ["solidify"], ["dissolve completely", "easily dissolve"]),
      v("gravity", "/ˈɡrævəti/", "/ˈɡrævəti/", "the force that attracts a body toward the center of the earth", "trọng lực, hấp dẫn", "noun", "Gravity pulls objects toward the ground.", "Trọng lực kéo các vật về phía mặt đất.", ["gravitation", "attraction"], [], ["force of gravity", "law of gravity"]),
      v("reaction", "/riˈækʃn/", "/riˈækʃn/", "a process that involves rearrangement of the molecular or ionic structure of a substance", "phản ứng", "noun", "The chemical reaction produced a bright green gas.", "Phản ứng hóa học đã tạo ra một loại khí màu xanh lá cây sáng.", ["interaction", "change"], [], ["chemical reaction", "produce a reaction"]),
      v("measure", "/ˈmeʒə(r)/", "/ˈmeʒər/", "to ascertain the size, amount, or degree of something", "đo lường", "verb", "We use a thermometer to measure the temperature of the gas.", "Chúng ta dùng nhiệt kế để đo nhiệt độ của chất khí.", ["calculate", "gauge"], [], ["measure accurately", "measure height"]),
      v("vibration", "/vaɪˈbreɪʃn/", "/vaɪˈbreɪʃn/", "a periodic motion of the particles of an elastic body or medium", "sự rung động", "noun", "Sound is caused by the vibration of air molecules.", "Âm thanh được tạo ra bởi sự rung động của các phân tử không khí.", ["oscillation", "shaking"], [], ["constant vibration", "detect vibration"]),
      v("conduct", "/kənˈdʌkt/", "/kənˈdʌkt/", "to transmit a form of energy such as heat or electricity", "dẫn (nhiệt, điện)", "verb", "Metals like copper conduct electricity very well.", "Các kim loại như đồng dẫn điện rất tốt.", ["transmit", "carry"], ["insulate"], ["conduct electricity", "conduct heat"]),
    ],
    B2: [
      v("catalyst", "/ˈkæt.əl.ɪst/", "/ˈkæt̬.əl.ɪst/", "a substance that increases the rate of a chemical reaction without itself undergoing any permanent chemical change", "chất xúc tác", "noun", "The chemical reaction speeded up significantly once the catalyst was added to the mixture.", "Phản ứng hóa học tăng tốc đáng kể khi chất xúc tác được thêm vào hỗn hợp.", ["stimulant", "impetus"], [], ["act as a catalyst", "chemical catalyst"]),
      v("velocity", "/vəˈlɒs.ɪ.ti/", "/vəˈlɑː.sə.t̬i/", "the speed of an object in a given direction", "vận tốc", "noun", "The rocket reached a high velocity as it escaped the Earth's atmosphere.", "Tên lửa đạt vận tốc cao khi thoát khỏi bầu khí quyển Trái Đất.", ["speed", "pace"], [], ["constant velocity", "terminal velocity"]),
      v("molecule", "/ˈmɒl.ɪ.kjuːl/", "/ˈmɑː.lə.kjuːl/", "the smallest unit of a chemical compound that can take part in a chemical reaction", "phân tử", "noun", "Water is composed of two hydrogen atoms and one oxygen atom in each molecule.", "Nước được cấu tạo từ hai nguyên tử hydro và một nguyên tử oxy trong mỗi phân tử.", ["particle", "corpuscle"], [], ["complex molecule", "organic molecule"]),
      v("equilibrium", "/ˌiː.kwɪˈlɪb.ri.əm/", "/ˌiː.kwəˈlɪb.ri.əm/", "a state in which opposing forces or influences are balanced", "trạng thái cân bằng", "noun", "The chemical system eventually reached a state of dynamic equilibrium.", "Hệ thống hóa học cuối cùng đã đạt đến trạng thái cân bằng động.", ["balance", "stability"], ["imbalance"], ["chemical equilibrium", "dynamic equilibrium"]),
      v("condense", "/kənˈdens/", "/kənˈdens/", "to change from a gas or vapor to a liquid", "ngưng tụ", "verb", "Steam will condense into water droplets when it touches a cold surface.", "Hơi nước sẽ ngưng tụ thành những giọt nước khi chạm vào bề mặt lạnh.", ["liquefy", "precipitate"], ["evaporate"], ["condense into", "water vapor condenses"]),
      v("kinetic", "/kɪˈnet.ɪk/", "/kəˈnet̬.ɪk/", "relating to or resulting from motion", "thuộc về động lực học", "adjective", "The kinetic energy of the moving ball depends on its mass and speed.", "Động năng của quả bóng đang chuyển động phụ thuộc vào khối lượng và tốc độ của nó.", ["active", "moving"], ["potential"], ["kinetic energy", "kinetic theory"]),
      v("solute", "/ˈsɒl.juːt/", "/ˈsɑː.luːt/", "the substance that is dissolved in a solvent to form a solution", "chất tan", "noun", "When you add salt to water, salt acts as the solute in the solution.", "Khi bạn thêm muối vào nước, muối đóng vai trò là chất tan trong dung dịch.", ["dissolved substance"], ["solvent"], ["dissolve the solute", "solute concentration"]),
      v("refraction", "/rɪˈfræk.ʃən/", "/rɪˈfræk.ʃən/", "the change in direction of a wave passing from one medium to another", "sự khúc xạ", "noun", "The refraction of light through the prism created a beautiful rainbow.", "Sự khúc xạ của ánh sáng qua lăng kính đã tạo ra một chiếc cầu vồng tuyệt đẹp.", ["bending", "deflection"], [], ["light refraction", "angle of refraction"]),
      v("synthesize", "/ˈsɪn.θə.saɪz/", "/ˈsɪn.θə.saɪz/", "to combine a number of things into a coherent whole, often in a chemical context", "tổng hợp", "verb", "Scientists are working to synthesize a new compound that can kill bacteria.", "Các nhà khoa học đang nỗ lực tổng hợp một hợp chất mới có khả năng tiêu diệt vi khuẩn.", ["create", "manufacture"], ["decompose"], ["synthesize a compound", "synthesize materials"]),
    ],
    C1: [
      v("viscosity", "/vɪˈskɒs.ə.ti/", "/vɪˈskɑː.sə.t̬i/", "the state of being thick, sticky, and semifluid in consistency, due to internal friction", "độ nhớt", "noun", "Engine oil must maintain a specific viscosity to ensure proper lubrication across varying temperatures.", "Dầu động cơ phải duy trì một độ nhớt cụ thể để đảm bảo khả năng bôi trơn thích hợp ở các mức nhiệt độ khác nhau.", ["thickness", "stickiness"], [], ["high viscosity", "kinematic viscosity"]),
      v("sublimation", "/ˌsʌb.lɪˈmeɪ.ʃən/", "/ˌsʌb.ləˈmeɪ.ʃən/", "the transition of a substance directly from the solid to the gas state, without passing through the liquid state", "sự thăng hoa", "noun", "Dry ice is a classic example of sublimation, as it turns directly into carbon dioxide gas at room temperature.", "Đá khô là một ví dụ điển hình của sự thăng hoa, vì nó chuyển trực tiếp thành khí carbon dioxide ở nhiệt độ phòng.", ["vaporization"], [], ["process of sublimation", "undergo sublimation"]),
      v("amorphous", "/əˈmɔː.fəs/", "/əˈmɔːr.fəs/", "having no clearly defined shape or form; lacking a crystalline structure", "vô định hình", "adjective", "Glass is considered an amorphous solid because its molecules are arranged in a disordered, random fashion.", "Thủy tinh được coi là một chất rắn vô định hình vì các phân tử của nó được sắp xếp theo một cách hỗn loạn và ngẫu nhiên.", ["shapeless", "non-crystalline"], ["crystalline"], ["amorphous solid", "amorphous structure"]),
      v("exothermic", "/ˌek.səʊˈθɜː.mɪk/", "/ˌek.soʊˈθɝː.mɪk/", "accompanied by the release of heat", "tỏa nhiệt", "adjective", "Combustion is a highly exothermic reaction that releases significant amounts of energy in the form of heat and light.", "Sự cháy là một phản ứng tỏa nhiệt mạnh giải phóng một lượng năng lượng đáng kể dưới dạng nhiệt và ánh sáng.", [], ["endothermic"], ["exothermic reaction", "exothermic process"]),
      v("precipitate", "/prɪˈsɪp.ɪ.teɪt/", "/prəˈsɪp.ə.teɪt/", "to cause a substance to be deposited in solid form from a solution", "làm kết tủa", "verb", "Adding silver nitrate to the solution will precipitate the chloride ions as a white solid.", "Việc thêm bạc nitrat vào dung dịch sẽ làm kết tủa các ion clorua dưới dạng chất rắn màu trắng.", ["deposit", "sediment"], ["dissolve"], ["precipitate out", "chemical precipitate"]),
      v("momentum", "/məˈmen.təm/", "/məˈmen.təm/", "the quantity of motion of a moving body, measured as a product of its mass and velocity", "động lượng", "noun", "According to Newton's second law, the force applied to an object is equal to the rate of change of its momentum.", "Theo định luật hai Newton, lực tác dụng lên một vật bằng tốc độ thay đổi động lượng của nó.", ["impetus", "force"], [], ["angular momentum", "conserve momentum"]),
      v("volatile", "/ˈvɒl.ə.taɪl/", "/ˈvɑː.lə.t̬əl/", "liable to change rapidly and unpredictably, especially for the worse; easily evaporated at normal temperatures", "dễ bay hơi", "adjective", "Organic solvents are often highly volatile and should be stored in tightly sealed containers to prevent evaporation.", "Các dung môi hữu cơ thường rất dễ bay hơi và nên được bảo quản trong các thùng chứa kín để ngăn chặn sự bay hơi.", ["evaporative", "unstable"], ["stable"], ["volatile organic compounds", "highly volatile"]),
    ],
    C2: [
      v("allotrope", "/ˈælətrəʊp/", "/ˈælətroʊp/", "One of two or more existing physical forms of a chemical element.", "Dạng thù hình", "noun", "Diamond and graphite are both well-known allotropes of carbon.", "Kim cương và than chì đều là những dạng thù hình nổi tiếng của carbon.", ["allotropic form"], [], ["carbon allotrope", "allotrope of oxygen"]),
      v("effervescence", "/ˌefəˈvesns/", "/ˌefərˈvesns/", "The process of bubbling as gas escapes from a liquid.", "Sự sủi bọt", "noun", "The reaction produced a vigorous effervescence as carbon dioxide was released.", "Phản ứng tạo ra sự sủi bọt mạnh mẽ khi khí carbon dioxide được giải phóng.", ["fizziness", "bubbling"], [], ["vigorous effervescence", "chemical effervescence"]),
      v("stoichiometry", "/ˌstɔɪkiˈɒmətri/", "/ˌstɔɪkiˈɑːmətri/", "The relationship between the relative quantities of substances taking part in a reaction.", "Phép đo tỷ lượng", "noun", "Accurate stoichiometry is essential for balancing complex chemical equations.", "Phép đo tỷ lượng chính xác là cần thiết để cân bằng các phương trình hóa học phức tạp.", ["chemical calculation"], [], ["reaction stoichiometry", "stoichiometry calculation"]),
      v("isobaric", "/ˌaɪsəˈbærɪk/", "/ˌaɪsəˈbærɪk/", "Relating to a process that occurs at constant pressure.", "Đẳng áp", "adjective", "In an isobaric expansion, the gas does work while the pressure remains unchanged.", "Trong quá trình giãn nở đẳng áp, chất khí thực hiện công trong khi áp suất không thay đổi.", ["constant-pressure"], [], ["isobaric process", "isobaric expansion"]),
      v("diffraction", "/dɪˈfrækʃn/", "/dɪˈfrækʃn/", "The process by which a beam of light or other system of waves is spread out as a result of passing through a narrow aperture.", "Sự nhiễu xạ", "noun", "X-ray diffraction is a powerful tool for determining the atomic structure of crystals.", "Nhiễu xạ tia X là một công cụ mạnh mẽ để xác định cấu trúc nguyên tử của các tinh thể.", ["scattering"], [], ["X-ray diffraction", "light diffraction"]),
      v("paramagnetic", "/ˌpærəˈmæɡnətɪk/", "/ˌpærəˈmæɡnətɪk/", "Relating to substances that are weakly attracted by a magnetic field.", "Thuận từ", "adjective", "Oxygen is paramagnetic because it has unpaired electrons.", "Oxy là chất thuận từ vì nó có các electron độc thân.", ["magnetically susceptible"], ["diamagnetic"], ["paramagnetic material", "paramagnetic property"]),
      v("solvate", "/ˈsɒlveɪt/", "/ˈsɑːlveɪt/", "To cause a solute to be surrounded by solvent molecules.", "Solvat hóa", "verb", "In an aqueous solution, water molecules effectively solvate the ions.", "Trong dung dịch nước, các phân tử nước solvat hóa các ion một cách hiệu quả.", ["dissolve", "hydrate"], [], ["solvate ions", "process of solvation"]),
    ],
  },
  "Biology": {
    A1: [
      v("body", "/ˈbɒdi/", "/ˈbɑːdi/", "the physical structure of a person or animal", "cơ thể", "noun", "Exercise is good for your body.", "Tập thể dục rất tốt cho cơ thể của bạn.", ["physique"], [], ["human body", "healthy body"]),
      v("life", "/laɪf/", "/laɪf/", "the state of being alive", "sự sống", "noun", "There is life in the ocean.", "Có sự sống trong đại dương.", ["existence"], ["death"], ["ocean life", "all life"]),
      v("small", "/smɔːl/", "/smɔːl/", "not large in size", "nhỏ", "adjective", "An ant is a very small animal.", "Kiến là một loài động vật rất nhỏ.", ["tiny"], ["big"], ["small animal", "small plant"]),
      v("big", "/bɪɡ/", "/bɪɡ/", "large in size", "lớn, to", "adjective", "The elephant is a big animal.", "Voi là một loài động vật to lớn.", ["large"], ["small"], ["big animal", "grow big"]),
      v("see", "/siː/", "/siː/", "to notice or become aware of something using eyes", "nhìn thấy", "verb", "I can see a bird in the tree.", "Tôi có thể nhìn thấy một con chim trên cây.", ["watch"], [], ["see clearly", "can see"]),
      v("alive", "/əˈlaɪv/", "/əˈlaɪv/", "living, not dead", "còn sống", "adjective", "The flower is still alive.", "Bông hoa vẫn còn sống.", ["living"], ["dead"], ["stay alive", "keep alive"]),
    ],
    A2: [
      v("cell", "/sel/", "/sel/", "the smallest basic unit of a living thing", "tế bào", "noun", "Every living thing is made of at least one cell.", "Mọi sinh vật sống đều được tạo thành từ ít nhất một tế bào.", ["unit"], [], ["living cell", "blood cell"]),
      v("organism", "/ˈɔːɡənɪzəm/", "/ˈɔːrɡənɪzəm/", "an individual living creature", "sinh vật", "noun", "A tiny organism lives in the pond.", "Một sinh vật nhỏ bé sống trong cái ao.", ["creature"], [], ["living organism", "microscopic organism"]),
      v("breathe", "/briːð/", "/briːð/", "to take air into the lungs and let it out", "thở", "verb", "Fish breathe through their gills.", "Cá thở bằng mang.", ["respire"], [], ["breathe air", "breathe deeply"]),
      v("species", "/ˈspiːʃiːz/", "/ˈspiːʃiːz/", "a group of animals or plants that are similar", "loài", "noun", "There are many species of birds in this forest.", "Có nhiều loài chim trong khu rừng này.", ["type", "kind"], [], ["endangered species", "rare species"]),
      v("nature", "/ˈneɪtʃə(r)/", "/ˈneɪtʃər/", "the physical world including plants and animals", "tự nhiên", "noun", "We should protect nature for our future.", "Chúng ta nên bảo vệ tự nhiên vì tương lai của chúng ta.", ["environment"], [], ["protect nature", "love nature"]),
    ],
    B1: [
      v("reproduce", "/ˌriːprəˈdjuːs/", "/ˌriːprəˈduːs/", "To produce offspring.", "sinh sản", "verb", "Some bacteria reproduce very quickly in warm conditions.", "Một số vi khuẩn sinh sản rất nhanh trong điều kiện ấm áp.", ["breed", "propagate"], [], ["reproduce rapidly", "ability to reproduce"]),
      v("evolve", "/ɪˈvɒlv/", "/ɪˈvɑːlv/", "To develop gradually over time, especially from a simple to a more complex form.", "tiến hóa", "verb", "Animals often evolve to adapt to changes in their environment.", "Động vật thường tiến hóa để thích nghi với những thay đổi trong môi trường của chúng.", ["develop", "adapt"], [], ["evolve over time", "slowly evolve"]),
      v("genetic", "/dʒəˈnetɪk/", "/dʒəˈnetɪk/", "Relating to genes or heredity.", "thuộc về di truyền", "adjective", "Eye color is determined by genetic factors.", "Màu mắt được quyết định bởi các yếu tố di truyền.", ["hereditary", "inherited"], [], ["genetic modification", "genetic research"]),
      v("extinct", "/ɪkˈstɪŋkt/", "/ɪkˈstɪŋkt/", "Having no living members; no longer in existence.", "tuyệt chủng", "adjective", "Dinosaurs have been extinct for millions of years.", "Khủng long đã tuyệt chủng hàng triệu năm nay.", ["vanished", "lost"], ["living"], ["become extinct", "threatened with extinction"]),
      v("nutrient", "/ˈnjuːtriənt/", "/ˈnuːtriənt/", "A substance that provides nourishment essential for growth and the maintenance of life.", "chất dinh dưỡng", "noun", "Plants absorb nutrients from the soil through their roots.", "Cây cối hấp thụ chất dinh dưỡng từ đất thông qua rễ của chúng.", ["nourishment", "vitamin"], [], ["essential nutrient", "absorb nutrients"]),
    ],
    B2: [
      v("adaptation", "/ˌædæpˈteɪʃn/", "/ˌædæpˈteɪʃn/", "The process by which a species becomes fitted to its environment.", "sự thích nghi", "noun", "Camouflage is a common adaptation that helps animals survive.", "Ngụy trang là một sự thích nghi phổ biến giúp động vật sinh tồn.", ["adjustment", "acclimatization"], [], ["evolutionary adaptation", "biological adaptation"]),
      v("microbe", "/ˈmaɪkrəʊb/", "/ˈmaɪkroʊb/", "A microorganism, especially a bacterium causing disease or fermentation.", "vi trùng, vi sinh vật", "noun", "The human gut contains trillions of beneficial microbes.", "Ruột người chứa hàng nghìn tỷ vi sinh vật có lợi.", ["microorganism", "germ"], [], ["harmful microbe", "gut microbe"]),
      v("replicate", "/ˈreplɪkeɪt/", "/ˈreplɪkeɪt/", "To make an exact copy of, especially in the context of DNA or viruses.", "tái tạo, sao chép", "verb", "Viruses need a host cell to replicate their genetic material.", "Virus cần một tế bào vật chủ để tái tạo vật chất di truyền của chúng.", ["duplicate", "copy"], [], ["replicate DNA", "rapidly replicate"]),
      v("cellular", "/ˈseljələ(r)/", "/ˈseljələr/", "Relating to or consisting of cells.", "thuộc về tế bào", "adjective", "Cancer research focuses on the abnormal cellular division in the body.", "Nghiên cứu ung thư tập trung vào sự phân chia tế bào bất thường trong cơ thể.", ["microscopic"], [], ["cellular structure", "cellular respiration"]),
      v("stimulus", "/ˈstɪmjələs/", "/ˈstɪmjələs/", "A thing or event that evokes a specific functional reaction in an organ or tissue.", "tác nhân kích thích", "noun", "Plants react to light as a primary environmental stimulus.", "Thực vật phản ứng với ánh sáng như một tác nhân kích thích môi trường chính.", ["impulse", "trigger"], ["inhibition"], ["external stimulus", "respond to stimulus"]),
    ],
    C1: [
      v("homeostasis", "/ˌhəʊmiəˈsteɪsɪs/", "/ˌhoʊmiəˈsteɪsɪs/", "The tendency of a biological system to maintain internal stability while adjusting to changing external conditions.", "Sự cân bằng nội môi", "noun", "The human body maintains homeostasis by regulating temperature through sweating and shivering.", "Cơ thể con người duy trì sự cân bằng nội môi bằng cách điều chỉnh nhiệt độ thông qua đổ mồ hôi và rùng mình.", ["equilibrium", "stability"], [], ["maintain homeostasis", "disrupt homeostasis"]),
      v("mitochondrion", "/ˌmaɪtəˈkɒndriən/", "/ˌmaɪtəˈkɑːndriən/", "An organelle found in large numbers in most cells, in which the biochemical processes of respiration and energy production occur.", "Ti thể", "noun", "The mitochondrion is often referred to as the powerhouse of the cell because it generates most of the cell's supply of adenosine triphosphate.", "Ti thể thường được gọi là nhà máy năng lượng của tế bào vì nó tạo ra hầu hết nguồn cung cấp adenosine triphosphate cho tế bào.", ["organelle"], [], ["mitochondrial DNA", "mitochondrial function"]),
      v("symbiosis", "/ˌsɪmbaɪˈəʊsɪs/", "/ˌsɪmbaɪˈoʊsɪs/", "Interaction between two different organisms living in close physical association, typically to the advantage of both.", "Sự cộng sinh", "noun", "The relationship between certain species of bacteria and the human gut is a prime example of symbiosis.", "Mối quan hệ giữa một số loài vi khuẩn và ruột người là một ví dụ điển hình về sự cộng sinh.", ["mutualism", "interdependence"], ["parasitism"], ["obligate symbiosis", "mutualistic symbiosis"]),
      v("phenotype", "/ˈfiːnətaɪp/", "/ˈfiːnətaɪp/", "The observable physical or biochemical characteristics of an organism, as determined by both genetic makeup and environmental influences.", "Kiểu hình", "noun", "Even with the same genotype, environmental factors can lead to a different phenotype in the plants.", "Ngay cả với cùng một kiểu gen, các yếu tố môi trường có thể dẫn đến một kiểu hình khác nhau ở thực vật.", ["observable trait"], ["genotype"], ["express a phenotype", "phenotype variation"]),
      v("catalyze", "/ˈkætəlaɪz/", "/ˈkætəlaɪz/", "To cause or accelerate a chemical reaction by acting as a catalyst.", "Xúc tác", "verb", "Specific enzymes are required to catalyze the metabolic reactions necessary for life.", "Các enzyme cụ thể là cần thiết để xúc tác các phản ứng trao đổi chất cần thiết cho sự sống.", ["accelerate", "facilitate"], ["inhibit"], ["catalyze a reaction", "enzymatically catalyze"]),
      v("prokaryotic", "/prəʊˌkæriˈɒtɪk/", "/proʊˌkæriˈɑːtɪk/", "Relating to single-celled organisms that lack a distinct nucleus and other membrane-bound organelles.", "Thuộc sinh vật nhân sơ", "adjective", "Unlike eukaryotic cells, prokaryotic cells have their genetic material floating freely in the cytoplasm.", "Không giống như các tế bào nhân thực, các tế bào nhân sơ có vật chất di truyền trôi nổi tự do trong tế bào chất.", ["primitive"], ["eukaryotic"], ["prokaryotic cell", "prokaryotic organism"]),
      v("osmosis", "/ɒzˈməʊsɪs/", "/ɑːzˈmoʊsɪs/", "The process by which molecules of a solvent pass through a semipermeable membrane from a less concentrated solution into a more concentrated one.", "Sự thẩm thấu", "noun", "Water enters the plant roots through the process of osmosis to maintain turgor pressure.", "Nước đi vào rễ cây thông qua quá trình thẩm thấu để duy trì áp suất trương nước.", ["diffusion"], [], ["process of osmosis", "osmotic pressure"]),
      v("endogenous", "/enˈdɒdʒɪnəs/", "/enˈdɑːdʒənəs/", "Having an internal cause or origin; produced from within an organism or system.", "Nội sinh", "adjective", "The study focuses on how endogenous hormones regulate the sleep-wake cycle in mammals.", "Nghiên cứu tập trung vào việc các hormone nội sinh điều chỉnh chu kỳ ngủ-thức ở động vật có vú như thế nào.", ["internal", "innate"], ["exogenous"], ["endogenous rhythm", "endogenous factors"]),
    ],
    C2: [
      v("phylogenetic", "/ˌfaɪləʊdʒəˈnetɪk/", "/ˌfaɪlədʒəˈnetɪk/", "Relating to the evolutionary development and diversification of a species or group of organisms.", "Thuộc về phát sinh loài", "adjective", "Modern genetic sequencing has fundamentally altered our understanding of the phylogenetic relationships between early primates.", "Việc giải trình tự gen hiện đại đã thay đổi căn bản hiểu biết của chúng ta về các mối quan hệ phát sinh loài giữa các loài linh trưởng sơ khai.", ["evolutionary"], [], ["phylogenetic tree", "phylogenetic analysis"]),
      v("epigenetics", "/ˌepɪdʒəˈnetɪks/", "/ˌepɪdʒəˈnetɪks/", "The study of changes in organisms caused by modification of gene expression rather than alteration of the genetic code itself.", "Di truyền học biểu hiện", "noun", "Research in epigenetics suggests that environmental factors can leave chemical marks on DNA that influence health across generations.", "Nghiên cứu về di truyền học biểu hiện cho thấy các yếu tố môi trường có thể để lại các dấu vết hóa học trên DNA ảnh hưởng đến sức khỏe qua nhiều thế hệ.", ["epigenesis"], [], ["epigenetic markers", "epigenetic changes"]),
      v("senescence", "/sɪˈnesns/", "/səˈnesns/", "The condition or process of deterioration with age.", "Sự lão hóa", "noun", "Cellular senescence is a critical mechanism that prevents damaged cells from proliferating, thereby reducing cancer risk.", "Sự lão hóa tế bào là một cơ chế quan trọng ngăn chặn các tế bào bị tổn thương tăng sinh, từ đó giảm nguy cơ ung thư.", ["aging", "decrepitude"], ["rejuvenation"], ["cellular senescence", "accelerated senescence"]),
      v("morphology", "/mɔːˈfɒlədʒi/", "/mɔːrˈfɑːlədʒi/", "The branch of biology that deals with the form of living organisms and the relationships between their structures.", "Hình thái học", "noun", "By examining the skull morphology of the fossils, scientists were able to classify the extinct species.", "Bằng cách kiểm tra hình thái hộp sọ của các hóa thạch, các nhà khoa học đã có thể phân loại loài đã tuyệt chủng đó.", ["anatomy", "structure"], [], ["functional morphology", "comparative morphology"]),
      v("allopatric", "/ˌæləʊˈpætrɪk/", "/ˌæləˈpætrɪk/", "Occurring in or occupying different geographical areas.", "Khác khu vực địa lý", "adjective", "Allopatric speciation occurs when a physical barrier prevents two populations from interbreeding, leading to divergent evolution.", "Sự hình thành loài khác khu vực địa lý xảy ra khi một rào cản vật lý ngăn cản hai quần thể giao phối, dẫn đến sự tiến hóa phân kỳ.", ["geographically isolated"], ["sympatric"], ["allopatric speciation", "allopatric populations"]),
      v("transcription", "/trænˈskrɪpʃn/", "/trænˈskrɪpʃn/", "The process by which the information in a strand of DNA is copied into a new molecule of messenger RNA.", "Sự phiên mã", "noun", "The regulation of gene transcription is a fundamental process that determines cell differentiation and function.", "Sự điều hòa phiên mã gen là một quá trình cơ bản quyết định sự biệt hóa và chức năng của tế bào.", ["RNA synthesis"], [], ["transcription factor", "gene transcription"]),
      v("mitochondrial", "/ˌmaɪtəˈkɒndriəl/", "/ˌmaɪtəˈkɑːndriəl/", "Relating to the mitochondria, which are the powerhouses of the cell.", "Thuộc về ty thể", "adjective", "Defects in mitochondrial DNA can lead to severe metabolic disorders due to impaired energy production.", "Các khiếm khuyết trong DNA ty thể có thể dẫn đến các rối loạn chuyển hóa nghiêm trọng do suy giảm khả năng sản xuất năng lượng.", [], [], ["mitochondrial DNA", "mitochondrial function"]),
      v("bioluminescence", "/ˌbaɪəʊˌluːmɪˈnesns/", "/ˌbaɪoʊˌluːmɪˈnesns/", "The biochemical emission of light by living organisms such as deep-sea fish and fungi.", "Sự phát quang sinh học", "noun", "Many deep-sea creatures use bioluminescence as a lure to attract prey in the absolute darkness of the ocean.", "Nhiều sinh vật biển sâu sử dụng sự phát quang sinh học như một loại mồi nhử để thu hút con mồi trong bóng tối tuyệt đối của đại dương.", ["phosphorescence"], [], ["exhibit bioluminescence", "bioluminescence emission"]),
    ],
  },
  "Environment": {
    A1: [
      v("air", "/eər/", "/er/", "The invisible mixture of gases that we breathe.", "không khí", "noun", "The air is fresh in the morning.", "Không khí rất trong lành vào buổi sáng.", ["atmosphere"], [], ["fresh air", "clean air"]),
      v("sea", "/siː/", "/siː/", "The large body of salt water covering much of the Earth.", "biển", "noun", "We go to the sea in summer.", "Chúng tôi đi biển vào mùa hè.", ["ocean"], [], ["deep sea", "by the sea"]),
    ],
    A2: [
      v("planet", "/ˈplæn.ɪt/", "/ˈplæn.ɪt/", "a large round object in space, such as the Earth", "hành tinh", "noun", "We must take care of our planet.", "Chúng ta phải chăm sóc hành tinh của mình.", ["Earth", "globe"], [], ["save the planet", "our planet"]),
      v("green", "/ɡriːn/", "/ɡriːn/", "relating to the protection of the environment", "xanh (thân thiện với môi trường)", "adjective", "Using a bicycle is a green way to travel.", "Sử dụng xe đạp là một cách đi lại thân thiện với môi trường.", ["eco-friendly"], [], ["green energy", "go green"]),
    ],
    B1: [
      v("natural", "/ˈnætʃrəl/", "/ˈnætʃrəl/", "existing in or derived from nature; not made by humans", "thuộc về tự nhiên", "adjective", "We need to conserve our natural resources.", "Chúng ta cần bảo tồn các tài nguyên thiên nhiên của mình.", ["environmental"], ["artificial"], ["natural resources", "natural disaster"]),
    ],
    B2: [
      v("deplete", "/dɪˈpliːt/", "/dɪˈpliːt/", "to use up the supply or resources of something", "làm cạn kiệt", "verb", "Intensive farming practices continue to deplete the soil of essential nutrients.", "Các phương pháp canh tác thâm canh tiếp tục làm cạn kiệt các chất dinh dưỡng thiết yếu trong đất.", ["exhaust", "drain"], ["replenish"], ["deplete resources", "severely deplete"]),
      v("degrade", "/dɪˈɡreɪd/", "/dɪˈɡreɪd/", "to break down or deteriorate chemically or physically", "làm suy thoái", "verb", "Plastic waste does not degrade easily and remains in the ocean for centuries.", "Rác thải nhựa không dễ bị phân hủy và tồn tại trong đại dương hàng thế kỷ.", ["deteriorate", "decompose"], ["improve"], ["environmentally degrade", "degrade quality"]),
    ],
    C1: [
      v("mitigation", "/ˌmɪtɪˈɡeɪʃn/", "/ˌmɪtɪˈɡeɪʃn/", "the action of reducing the severity, seriousness, or painfulness of something", "sự giảm nhẹ, sự làm dịu bớt", "noun", "Effective climate change mitigation requires international cooperation and policy shifts.", "Việc giảm nhẹ biến đổi khí hậu hiệu quả đòi hỏi sự hợp tác quốc tế và thay đổi chính sách.", ["alleviation", "reduction"], ["aggravation"], ["climate mitigation", "mitigation strategies"]),
      v("degradation", "/ˌdeɡrəˈdeɪʃn/", "/ˌdeɡrəˈdeɪʃn/", "the process in which the beauty, strength, or quality of something is damaged", "sự suy thoái, sự xuống cấp", "noun", "Soil degradation is a major concern for farmers trying to maintain crop yields.", "Sự suy thoái đất là mối quan tâm lớn đối với những người nông dân đang cố gắng duy trì năng suất cây trồng.", ["deterioration", "decline"], ["improvement"], ["environmental degradation", "soil degradation"]),
      v("sequestration", "/ˌsiːkwəˈstreɪʃn/", "/ˌsiːkwəˈstreɪʃn/", "the process of removing and storing carbon dioxide from the atmosphere", "sự cô lập (carbon)", "noun", "Forests play a crucial role in carbon sequestration by absorbing greenhouse gases.", "Rừng đóng một vai trò quan trọng trong việc cô lập carbon bằng cách hấp thụ các khí nhà kính.", ["capture", "isolation"], [], ["carbon sequestration", "sequestration potential"]),
      v("anthropogenic", "/ˌænθrəpəˈdʒenɪk/", "/ˌænθrəpəˈdʒenɪk/", "originating in human activity", "do con người gây ra", "adjective", "Scientists have confirmed that anthropogenic emissions are the primary driver of current warming trends.", "Các nhà khoa học đã xác nhận rằng khí thải do con người gây ra là nguyên nhân chính dẫn đến xu hướng nóng lên hiện nay.", ["human-induced", "man-made"], ["natural"], ["anthropogenic climate change", "anthropogenic impact"]),
      v("resilience", "/rɪˈzɪliəns/", "/rɪˈzɪliəns/", "the capacity to recover quickly from difficulties or environmental changes", "khả năng phục hồi", "noun", "Building ecological resilience is essential to help coral reefs survive rising ocean temperatures.", "Xây dựng khả năng phục hồi sinh thái là điều cần thiết để giúp các rạn san hô tồn tại trước nhiệt độ đại dương đang tăng cao.", ["adaptability", "toughness"], ["fragility"], ["climate resilience", "ecological resilience"]),
      v("contaminant", "/kənˈtæmɪnənt/", "/kənˈtæmɪnənt/", "a substance that makes something impure or poisonous", "chất gây ô nhiễm", "noun", "The water supply was tested for any chemical contaminant that could pose a health risk.", "Nguồn cung cấp nước đã được kiểm tra để tìm bất kỳ chất gây ô nhiễm hóa học nào có thể gây nguy hiểm cho sức khỏe.", ["pollutant", "impurity"], [], ["toxic contaminant", "detect a contaminant"]),
      v("effluent", "/ˈefluənt/", "/ˈefluənt/", "liquid waste or sewage discharged into a river or the sea", "nước thải (công nghiệp)", "noun", "Strict regulations prevent factories from dumping untreated effluent into the local water system.", "Các quy định nghiêm ngặt ngăn cản các nhà máy xả nước thải chưa qua xử lý vào hệ thống nước địa phương.", ["sewage", "wastewater"], [], ["industrial effluent", "discharge effluent"]),
      v("remediate", "/rɪˈmiːdieɪt/", "/rɪˈmiːdieɪt/", "to fix or improve a situation, especially by removing environmental damage", "khắc phục, xử lý (ô nhiễm)", "verb", "It will take decades to remediate the land contaminated by industrial mining activities.", "Sẽ mất hàng thập kỷ để xử lý vùng đất bị ô nhiễm bởi các hoạt động khai thác công nghiệp.", ["clean up", "restore"], ["pollute"], ["remediate pollution", "remediate contaminated soil"]),
    ],
    C2: [
      v("eutrophication", "/ˌjuːtrəfɪˈkeɪʃn/", "/ˌjuːtrəfɪˈkeɪʃn/", "excessive richness of nutrients in a body of water, causing dense plant growth and death of animal life from lack of oxygen", "hiện tượng phú dưỡng", "noun", "Runoff from agricultural fertilizers is a major driver of eutrophication in coastal estuaries.", "Dòng chảy từ phân bón nông nghiệp là tác nhân chính gây ra hiện tượng phú dưỡng ở các cửa sông ven biển.", ["algal bloom formation"], [], ["prevent eutrophication", "nutrient-driven eutrophication"]),
      v("bioaccumulation", "/ˌbaɪəʊəkjuːmjʊˈleɪʃn/", "/ˌbaɪoʊəkjuːmjʊˈleɪʃn/", "the gradual accumulation of substances, such as pesticides or other chemicals, in an organism", "sự tích tụ sinh học", "noun", "Predatory birds often suffer from bioaccumulation of heavy metals found in their prey.", "Các loài chim săn mồi thường chịu ảnh hưởng từ sự tích tụ sinh học của các kim loại nặng có trong con mồi của chúng.", ["biomagnification"], [], ["bioaccumulation of toxins", "prevent bioaccumulation"]),
      v("desalination", "/ˌdiːˌsælɪˈneɪʃn/", "/ˌdiːˌsælɪˈneɪʃn/", "the process of removing salt from seawater", "sự khử muối (nước biển)", "noun", "Arid regions increasingly rely on desalination plants to address chronic water shortages.", "Các khu vực khô hạn ngày càng dựa vào các nhà máy khử muối để giải quyết tình trạng thiếu nước kinh niên.", ["desalinization"], [], ["desalination plant", "seawater desalination"]),
      v("desertification", "/dɪˌzɜːtɪfɪˈkeɪʃn/", "/dɪˌzɜːrtɪfɪˈkeɪʃn/", "the process by which fertile land becomes desert, typically as a result of drought, deforestation, or inappropriate agriculture", "quá trình sa mạc hóa", "noun", "Overgrazing has accelerated desertification in the Sahel region of Africa.", "Việc chăn thả quá mức đã đẩy nhanh quá trình sa mạc hóa ở vùng Sahel của châu Phi.", ["land degradation"], [], ["combat desertification", "risk of desertification"]),
      v("sustainability", "/səˌsteɪnəˈbɪləti/", "/səˌsteɪnəˈbɪləti/", "the ability to be maintained at a certain rate or level, specifically avoiding depletion of natural resources", "sự bền vững", "noun", "The company is shifting its focus toward environmental sustainability in all its operations.", "Công ty đang chuyển trọng tâm sang sự bền vững về môi trường trong tất cả các hoạt động của mình.", ["viability", "endurance"], [], ["environmental sustainability", "long-term sustainability"]),
    ],
  },
  "Space & Astronomy": {
    A1: [
      v("moon", "/muːn/", "/muːn/", "the natural object that orbits the Earth", "mặt trăng", "noun", "The moon is very big tonight.", "Mặt trăng tối nay rất to.", ["lunar"], [], ["full moon", "the moon shines"]),
      v("space", "/speɪs/", "/speɪs/", "the area outside the Earth's atmosphere", "không gian", "noun", "Astronauts travel into space.", "Các phi hành gia du hành vào không gian.", ["outer space"], [], ["outer space", "travel to space"]),
      v("earth", "/ɜːθ/", "/ɜːrθ/", "the planet where we live", "Trái Đất", "noun", "Earth is our home.", "Trái Đất là ngôi nhà của chúng ta.", ["the world"], [], ["planet Earth", "live on Earth"]),
      v("night", "/naɪt/", "/naɪt/", "the time when it is dark and we can see stars", "ban đêm", "noun", "I look at the stars at night.", "Tôi ngắm nhìn những ngôi sao vào ban đêm.", ["evening"], ["day"], ["at night", "night time"]),
      v("far", "/fɑːr/", "/fɑːr/", "a long distance away", "xa", "adjective", "The stars are very far away.", "Các ngôi sao ở rất xa.", ["distant"], ["near"], ["far away", "so far"]),
    ],
    A2: [
      v("rocket", "/ˈrɒk.ɪt/", "/ˈrɑː.kɪt/", "a vehicle used for traveling into space", "tên lửa", "noun", "The rocket launched into the air successfully.", "Tên lửa đã phóng lên không trung thành công.", ["spacecraft"], [], ["launch a rocket", "space rocket"]),
      v("orbit", "/ˈɔː.bɪt/", "/ˈɔːr.bɪt/", "the curved path of an object moving around a planet or star", "quỹ đạo", "noun", "The satellite is in orbit around the Earth.", "Vệ tinh đang ở trên quỹ đạo quanh Trái Đất.", ["path", "course"], [], ["in orbit", "enter orbit"]),
      v("telescope", "/ˈtel.ɪ.skəʊp/", "/ˈtel.ə.skoʊp/", "an instrument used to see distant objects in space", "kính thiên văn", "noun", "We can see the moon clearly through a telescope.", "Chúng ta có thể thấy mặt trăng rõ ràng qua kính thiên văn.", ["scope"], [], ["look through a telescope", "use a telescope"]),
      v("dark", "/dɑːk/", "/dɑːrk/", "having little or no light", "tối", "adjective", "Space is very dark and cold.", "Không gian rất tối và lạnh lẽo.", ["dim"], ["bright"], ["dark sky", "pitch dark"]),
      v("fly", "/flaɪ/", "/flaɪ/", "to move through the air or space", "bay", "verb", "Astronauts fly in special ships to reach the moon.", "Các phi hành gia bay trên những con tàu đặc biệt để đến mặt trăng.", ["travel"], [], ["fly into space", "fly high"]),
    ],
    B1: [
      v("galaxy", "/ˈɡæləksi/", "/ˈɡæləksi/", "a massive system of stars, stellar remnants, gas, dust, and dark matter bound together by gravity", "thiên hà", "noun", "Our solar system is located within the Milky Way galaxy.", "Hệ mặt trời của chúng ta nằm trong thiên hà Ngân Hà.", ["star system"], [], ["spiral galaxy", "distant galaxy"]),
      v("launch", "/lɔːntʃ/", "/lɔːntʃ/", "to set a rocket or spacecraft in motion", "phóng", "verb", "The agency plans to launch a new satellite into space tomorrow.", "Cơ quan này dự định phóng một vệ tinh mới vào không gian vào ngày mai.", ["blast off", "send up"], ["land"], ["launch a rocket", "space launch"]),
      v("comet", "/ˈkɒmɪt/", "/ˈkɑːmɪt/", "a celestial object consisting of a nucleus of ice and dust that develops a tail when near the sun", "sao chổi", "noun", "A bright comet can be seen in the night sky once every few decades.", "Một ngôi sao chổi sáng có thể được nhìn thấy trên bầu trời đêm vài thập kỷ một lần.", ["shooting star"], [], ["Halley's comet", "bright comet"]),
      v("lunar", "/ˈluːnə(r)/", "/ˈluːnər/", "relating to or resembling the moon", "thuộc về mặt trăng", "adjective", "The astronauts conducted several experiments during the lunar mission.", "Các phi hành gia đã thực hiện một vài thí nghiệm trong suốt sứ mệnh trên Mặt Trăng.", ["moon-related"], ["solar"], ["lunar surface", "lunar eclipse"]),
      v("universe", "/ˈjuːnɪvɜːs/", "/ˈjuːnɪvɜːrs/", "all existing matter and space considered as a whole", "vũ trụ", "noun", "The universe is constantly expanding.", "Vũ trụ đang không ngừng mở rộng.", ["cosmos", "space"], [], ["the entire universe", "origin of the universe"]),
    ],
    B2: [
      v("celestial", "/səˈles.ti.əl/", "/səˈles.tʃəl/", "positioned in or relating to the sky, or outer space as observed in astronomy", "thuộc về bầu trời, thiên thể", "adjective", "Ancient navigators relied on celestial bodies to determine their position at sea.", "Những người đi biển cổ đại dựa vào các thiên thể để xác định vị trí của họ trên biển.", ["astronomical", "heavenly"], ["terrestrial"], ["celestial body", "celestial mechanics"]),
      v("constellation", "/ˌkɒn.stəˈleɪ.ʃən/", "/ˌkɑːn.stəˈleɪ.ʃən/", "a group of stars forming a recognizable pattern that is traditionally named after its apparent form", "chòm sao", "noun", "Orion is one of the most easily recognizable constellations in the night sky.", "Orion là một trong những chòm sao dễ nhận biết nhất trên bầu trời đêm.", ["star pattern", "asterism"], [], ["observe a constellation", "identify a constellation"]),
      v("gravitational", "/ˌɡræv.ɪˈteɪ.ʃən.əl/", "/ˌɡræv.əˈteɪ.ʃən.əl/", "relating to the force that attracts a body toward the center of the earth or toward any other physical body having mass", "thuộc về trọng lực", "adjective", "The gravitational pull of the moon is responsible for the ocean tides.", "Lực hút trọng trường của mặt trăng là nguyên nhân gây ra thủy triều đại dương.", ["gravitic"], [], ["gravitational pull", "gravitational force"]),
      v("phenomenon", "/fəˈnɒm.ɪ.nən/", "/fəˈnɑː.mə.nɑːn/", "a fact or situation that is observed to exist or happen, especially one whose cause or explanation is in question", "hiện tượng", "noun", "A solar eclipse is a fascinating natural phenomenon that draws crowds of observers.", "Nhật thực là một hiện tượng tự nhiên hấp dẫn thu hút đám đông người quan sát.", ["occurrence", "event"], [], ["natural phenomenon", "astronomical phenomenon"]),
      v("vacuum", "/ˈvæk.juːm/", "/ˈvæk.juːm/", "a space entirely devoid of matter", "chân không", "noun", "Space is essentially a vacuum, which is why sound cannot travel through it.", "Không gian về cơ bản là một môi trường chân không, đó là lý do tại sao âm thanh không thể truyền qua đó.", ["void", "emptiness"], ["matter", "atmosphere"], ["outer space vacuum", "create a vacuum"]),
    ],
    C1: [
      v("nebula", "/ˈneb.jə.lə/", "/ˈneb.jə.lə/", "a cloud of gas and dust in outer space", "tinh vân", "noun", "The telescope captured a stunning image of a vibrant nebula where new stars are being born.", "Kính thiên văn đã chụp được một hình ảnh tuyệt đẹp về một tinh vân rực rỡ nơi các ngôi sao mới đang được hình thành.", ["interstellar cloud"], [], ["diffuse nebula", "planetary nebula"]),
      v("extraterrestrial", "/ˌek.strə.təˈres.tri.əl/", "/ˌek.strə.təˈres.tri.əl/", "originating, located, or occurring outside the earth or its atmosphere", "ngoài trái đất", "adjective", "The search for extraterrestrial intelligence remains one of the most profound scientific endeavors.", "Việc tìm kiếm trí thông minh ngoài trái đất vẫn là một trong những nỗ lực khoa học sâu sắc nhất.", ["alien", "otherworldly"], ["terrestrial"], ["extraterrestrial life", "extraterrestrial intelligence"]),
      v("accretion", "/əˈkriː.ʃən/", "/əˈkriː.ʃən/", "the process of growth or increase, typically by the gradual accumulation of additional layers or matter", "sự bồi tụ, sự tích tụ", "noun", "The planet grew through the accretion of dust and gas from the surrounding protoplanetary disk.", "Hành tinh đã phát triển thông qua sự bồi tụ bụi và khí từ đĩa tiền hành tinh xung quanh.", ["accumulation", "aggregation"], ["erosion"], ["accretion disk", "accretion process"]),
      v("supernova", "/ˌsuː.pəˈnəʊ.və/", "/ˌsuː.pɚˈnoʊ.və/", "a powerful and luminous stellar explosion", "siêu tân tinh", "noun", "When a massive star reaches the end of its life, it collapses and explodes in a spectacular supernova.", "Khi một ngôi sao lớn đến cuối vòng đời, nó sụp đổ và phát nổ trong một vụ siêu tân tinh ngoạn mục.", ["stellar explosion"], [], ["supernova remnant", "witness a supernova"]),
      v("trajectory", "/trəˈdʒek.tər.i/", "/trəˈdʒek.tə.ri/", "the path followed by a projectile flying or an object moving under the action of given forces", "quỹ đạo, đường đạn", "noun", "Mission control carefully calculated the spacecraft's trajectory to ensure it would enter the Martian orbit correctly.", "Trung tâm điều khiển nhiệm vụ đã tính toán cẩn thận quỹ đạo của tàu vũ trụ để đảm bảo nó đi vào quỹ đạo sao Hỏa một cách chính xác.", ["path", "flight path"], [], ["orbital trajectory", "calculate a trajectory"]),
      v("luminosity", "/ˌluː.mɪˈnɒs.ə.ti/", "/ˌluː.məˈnɑː.sə.t̬i/", "the total amount of energy emitted by a star, galaxy, or other astronomical object per unit time", "độ sáng, quang độ", "noun", "Astronomers use the luminosity of a star to determine its distance from Earth.", "Các nhà thiên văn học sử dụng độ sáng của một ngôi sao để xác định khoảng cách của nó so với Trái Đất.", ["brightness", "radiance"], ["darkness"], ["stellar luminosity", "measure luminosity"]),
      v("parallax", "/ˈpær.ə.læks/", "/ˈpær.ə.læks/", "the effect whereby the position or direction of an object appears to differ when viewed from different positions", "thị sai", "noun", "Scientists measure the distance to nearby stars by observing the parallax effect as Earth orbits the Sun.", "Các nhà khoa học đo khoảng cách đến các ngôi sao gần đó bằng cách quan sát hiệu ứng thị sai khi Trái Đất quay quanh Mặt Trời.", ["apparent displacement"], [], ["stellar parallax", "measure parallax"]),
      v("interstellar", "/ˌɪn.təˈstel.ər/", "/ˌɪn.t̬ɚˈstel.ɚ/", "occurring or situated between stars", "liên sao, giữa các vì sao", "adjective", "Voyager 1 is currently traveling through interstellar space, carrying a message for any potential life it might encounter.", "Voyager 1 hiện đang du hành qua không gian liên sao, mang theo thông điệp cho bất kỳ sự sống tiềm năng nào mà nó có thể gặp phải.", ["deep-space"], [], ["interstellar space", "interstellar medium"]),
    ],
    C2: [
      v("syzygy", "/ˈsɪz.ɪ.dʒi/", "/ˈsɪz.ə.dʒi/", "The alignment of three celestial bodies in a gravitational system.", "Sự thẳng hàng của các thiên thể", "noun", "A solar eclipse can only occur when the Earth, Moon, and Sun are in perfect syzygy.", "Nhật thực chỉ có thể xảy ra khi Trái Đất, Mặt Trăng và Mặt Trời thẳng hàng hoàn hảo.", ["alignment", "conjunction"], [], ["perfect syzygy", "orbital syzygy"]),
      v("spaghettification", "/spəˌɡɛt.ɪ.fɪˈkeɪ.ʃən/", "/spəˌɡɛt̬.ɪ.fəˈkeɪ.ʃən/", "The vertical stretching and horizontal compression of objects in a very strong non-homogeneous gravitational field.", "Hiệu ứng mì ống (sự kéo giãn vật thể bởi lỗ đen)", "noun", "Any astronaut venturing too close to the event horizon would suffer immediate spaghettification.", "Bất kỳ phi hành gia nào mạo hiểm lại quá gần chân trời sự kiện đều sẽ chịu hiệu ứng mì ống ngay lập tức.", ["vertical stretching"], [], ["prevent spaghettification", "undergo spaghettification"]),
      v("oblate", "/ˈɒb.leɪt/", "/ˈɑː.bleɪt/", "Having a shape that is flattened at the poles.", "Dẹt ở hai cực (hình cầu)", "adjective", "Due to its rapid rotation, Saturn is noticeably oblate in its overall shape.", "Do tốc độ tự quay nhanh, Sao Thổ có hình dạng dẹt rõ rệt ở hai cực.", ["flattened", "ellipsoidal"], ["prolate"], ["oblate spheroid", "oblate planet"]),
      v("scintillation", "/ˌsɪn.tɪˈleɪ.ʃən/", "/ˌsɪn.t̬əˈleɪ.ʃən/", "The flickering or twinkling of stars caused by the Earth's atmosphere.", "Sự nhấp nháy của các vì sao", "noun", "Astronomers prefer high-altitude observatories to minimize the effects of atmospheric scintillation.", "", ["twinkling", "flickering"], [], ["atmospheric scintillation", "stellar scintillation"]),
      v("perihelion", "/ˌper.ɪˈhiː.li.ən/", "/ˌper.əˈhiː.li.ən/", "The point in the orbit of a planet or comet where it is nearest to the sun.", "Điểm cận nhật", "noun", "The Earth reaches its perihelion in early January each year.", "Trái Đất đạt đến điểm cận nhật vào đầu tháng Một hàng năm.", ["closest approach"], ["aphelion"], ["reach perihelion", "at perihelion"]),
      v("bolide", "/ˈbɒl.aɪd/", "/ˈboʊ.laɪd/", "An exceptionally bright meteor that explodes in the atmosphere.", "Thiên thạch sáng (cầu lửa)", "noun", "The massive bolide lit up the night sky over the city for several seconds before disintegrating.", "Thiên thạch sáng rực rỡ đã thắp sáng bầu trời đêm trên thành phố trong vài giây trước khi tan rã.", ["fireball", "meteor"], [], ["bright bolide", "bolide impact"]),
      v("synergetic", "/ˌsɪn.əˈdʒet.ɪk/", "/ˌsɪn.ɚˈdʒet̬.ɪk/", "Working together; relating to the interaction of elements that when combined produce a total effect greater than the sum of the individual elements.", "Có tính hiệp đồng", "adjective", "The synergetic effect of multiple gravitational fields can stabilize a complex multi-star system.", "Hiệu ứng hiệp đồng của nhiều trường hấp dẫn có thể ổn định một hệ đa sao phức tạp.", ["collaborative", "cooperative"], ["antagonistic"], ["synergetic effect", "synergetic interaction"]),
      v("transient", "/ˈtræn.zi.ənt/", "/ˈtræn.ʃənt/", "Lasting for a very short time; referring to astronomical events like supernovae or gamma-ray bursts.", "Nhất thời, ngắn hạn (sự kiện thiên văn)", "adjective", "Modern telescopes are designed to detect transient cosmic events in real-time.", "Các kính viễn vọng hiện đại được thiết kế để phát hiện các sự kiện vũ trụ nhất thời trong thời gian thực.", ["ephemeral", "fleeting"], ["permanent"], ["transient event", "cosmic transient"]),
      v("infer", "/ɪnˈfɜːr/", "/ɪnˈfɜːr/", "To deduce or conclude information from evidence and reasoning rather than from explicit statements.", "Suy luận", "verb", "Scientists can infer the composition of a distant star by analyzing its spectral signature.", "Các nhà khoa học có thể suy luận thành phần của một ngôi sao xa xôi bằng cách phân tích phổ đặc trưng của nó.", ["deduce", "conclude"], ["ignore"], ["infer from data", "infer properties"]),
    ],
  },
};


// Seed function
async function seedVocab() {
  console.log("🌱 Seeding Vocabulary Data - Science...");

  // Get or create topic group
  const topicGroup = await prisma.topicGroup.upsert({
    where: { name_hubType: { name: "Science", hubType: "vocab" } },
    update: {},
    create: {
      name: "Science",
      order: 11,
      hubType: "vocab",
      subcategories: [
        "Physics & Chemistry",
        "Biology",
        "Environment",
        "Space & Astronomy",
      ],
    },
  });

  // Helper to slugify
  const slugify = (text: string) => text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

  // Iterate over subcategories
  for (const [subcat, levelsData] of Object.entries(scienceVocab)) {
    console.log(`Processing Subcategory: ${subcat}`);

    for (const [level, vocabItems] of Object.entries(levelsData)) {
      const currentLevel = level as Level;
      const items = vocabItems as ReturnType<typeof v>[];

      if (!items || items.length === 0) continue;

      const topicId = `science-${slugify(subcat)}-${currentLevel.toLowerCase()}`;

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
          category: "Science",
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

  console.log("✅ Science seeded successfully!");
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
