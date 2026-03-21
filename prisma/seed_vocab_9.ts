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
// TOPIC GROUP 9: FOOD & COOKING
// ============================================

const foodandcookingVocab = {
  "Ingredients": {
    A1: [
      v("egg", "/eɡ/", "/eɡ/", "an oval object laid by a female bird, used as food", "trứng", "noun", "I have an egg for breakfast.", "Tôi ăn một quả trứng vào bữa sáng.", ["ovum"], [], ["boiled egg", "fried egg"]),
      v("salt", "/sɒlt/", "/sɔːlt/", "a white substance used to improve the taste of food", "muối", "noun", "Add a little salt to the soup.", "Thêm một chút muối vào món súp.", ["sodium chloride"], [], ["sea salt", "add salt"]),
      v("sugar", "/ˈʃʊɡ.ər/", "/ˈʃʊɡ.ɚ/", "a sweet substance used to make food taste sweet", "đường", "noun", "Do you want sugar in your tea?", "Bạn có muốn thêm đường vào trà không?", ["sweetener"], [], ["white sugar", "brown sugar"]),
      v("oil", "/ɔɪl/", "/ɔɪl/", "a smooth, thick liquid used for cooking", "dầu ăn", "noun", "Heat the oil in the pan.", "Làm nóng dầu trong chảo.", ["cooking fat"], [], ["vegetable oil", "olive oil"]),
      v("rice", "/raɪs/", "/raɪs/", "small white or brown grains from a plant, eaten as a main food", "gạo/cơm", "noun", "We eat rice every day.", "Chúng tôi ăn cơm mỗi ngày.", ["grain"], [], ["white rice", "brown rice"]),
      v("onion", "/ˈʌn.jən/", "/ˈʌn.jən/", "a round vegetable with a strong taste and smell", "hành tây", "noun", "Chop the onion into small pieces.", "Cắt hành tây thành những miếng nhỏ.", ["bulb"], [], ["red onion", "chopped onion"]),
      v("pepper", "/ˈpep.ər/", "/ˈpep.ɚ/", "a black or white powder used to make food spicy", "hạt tiêu", "noun", "The soup needs more pepper.", "Món súp cần thêm chút tiêu.", ["spice"], [], ["black pepper", "white pepper"]),
      v("flour", "/ˈflaʊər/", "/ˈflaʊ.ɚ/", "powder made from grain, used for making bread or cakes", "bột mì", "noun", "You need flour to make a cake.", "Bạn cần bột mì để làm bánh.", ["powder"], [], ["wheat flour", "add flour"]),
      v("add", "/æd/", "/æd/", "to put something with something else", "thêm vào", "verb", "Add some vegetables to the pot.", "Thêm một ít rau vào nồi.", ["include", "put in"], ["remove"], ["add salt", "add water"]),
    ],
    A2: [
      v("butter", "/ˈbʌtər/", "/ˈbʌtər/", "a yellow food made from cream, used for cooking or spreading on bread", "bơ", "noun", "Spread some butter on your toast.", "Phết một ít bơ lên bánh mì nướng của bạn.", ["spread"], [], ["melted butter", "unsalted butter"]),
      v("garlic", "/ˈɡɑːrlɪk/", "/ˈɡɑːrlɪk/", "a plant with a strong taste used in cooking to add flavor", "tỏi", "noun", "This sauce has a lot of garlic in it.", "Nước sốt này có rất nhiều tỏi.", ["clove"], [], ["garlic clove", "crushed garlic"]),
      v("cheese", "/tʃiːz/", "/tʃiːz/", "a food made from milk, often yellow or white", "phô mai", "noun", "Would you like some cheese on your pasta?", "Bạn có muốn thêm phô mai vào mì ý không?", ["dairy product"], [], ["grated cheese", "slice of cheese"]),
    ],
    B1: [
      v("seasoning", "/ˈsiːzənɪŋ/", "/ˈsiːzənɪŋ/", "substances like salt or spices added to food to improve its flavor", "gia vị", "noun", "This soup needs a little more seasoning to make it taste better.", "Món súp này cần thêm một chút gia vị để có hương vị ngon hơn.", ["condiment", "spice"], [], ["add seasoning", "extra seasoning"]),
      v("cereal", "/ˈsɪəriəl/", "/ˈsɪriəl/", "a grain used for food, such as wheat, oats, or corn", "ngũ cốc", "noun", "Whole grain cereal is a very healthy choice for breakfast.", "Ngũ cốc nguyên hạt là một lựa chọn rất lành mạnh cho bữa sáng.", ["grain", "corn"], [], ["breakfast cereal", "whole grain cereal"]),
      v("vinegar", "/ˈvɪnɪɡə(r)/", "/ˈvɪnɪɡər/", "a sour liquid made from wine or cider, used in salads and cooking", "giấm", "noun", "Add a tablespoon of vinegar to the dressing for a tangy taste.", "Thêm một muỗng canh giấm vào nước sốt để có vị chua thanh.", ["acid", "acetic acid"], [], ["cider vinegar", "white vinegar"]),
      v("dairy", "/ˈdeəri/", "/ˈderi/", "food products made from milk, such as cheese or butter", "sản phẩm từ sữa", "noun", "She tries to avoid dairy products because she is lactose intolerant.", "Cô ấy cố gắng tránh các sản phẩm từ sữa vì cô ấy không dung nạp được đường lactose.", ["milk products"], [], ["dairy products", "dairy-free"]),
      v("herb", "/hɜːb/", "/ɜːrb/", "a plant used for adding flavor to food or as medicine", "thảo mộc", "noun", "Fresh herbs like basil make a huge difference in pasta sauces.", "Các loại thảo mộc tươi như húng quế tạo nên sự khác biệt lớn trong các loại sốt mì Ý.", ["plant", "seasoning"], [], ["fresh herbs", "dried herbs"]),
      v("marinate", "/ˈmærɪneɪt/", "/ˈmærɪneɪt/", "to soak meat or fish in a sauce before cooking it", "ướp", "verb", "It is best to marinate the chicken for at least two hours before grilling.", "Tốt nhất là nên ướp gà ít nhất hai giờ trước khi nướng.", ["soak", "steep"], [], ["marinate meat", "marinate overnight"]),
      v("peel", "/piːl/", "/piːl/", "to remove the outer skin of a fruit or vegetable", "gọt vỏ", "verb", "You need to peel the potatoes before boiling them.", "Bạn cần gọt vỏ khoai tây trước khi luộc chúng.", ["skin", "pare"], [], ["peel potatoes", "peel fruit"]),
      v("stale", "/steɪl/", "/steɪl/", "no longer fresh and pleasant to eat, usually used for bread or cake", "ôi thiu, cũ (thường dùng cho bánh)", "adjective", "The bread went stale because we left the bag open overnight.", "Bánh mì đã bị cũ vì chúng tôi để túi mở qua đêm.", ["hard", "dry"], ["fresh"], ["stale bread", "go stale"]),
    ],
    B2: [
      v("substitute", "/ˈsʌbstɪtjuːt/", "/ˈsʌbstɪtuːt/", "a person or thing acting or serving in place of another", "vật thay thế", "noun", "Honey is a popular natural substitute for refined sugar in baking.", "Mật ong là một chất thay thế tự nhiên phổ biến cho đường tinh luyện trong làm bánh.", ["replacement", "alternative"], [], ["suitable substitute", "perfect substitute"]),
      v("condiment", "/ˈkɒndɪmənt/", "/ˈkɑːndɪmənt/", "a substance such as salt, mustard, or pickle that is used to add flavor to food", "đồ gia vị", "noun", "The table was set with a variety of condiments like soy sauce, chili oil, and vinegar.", "Bàn ăn được bày sẵn các loại gia vị như nước tương, dầu ớt và giấm.", ["relish", "sauce"], [], ["table condiment", "spicy condiment"]),
      v("garnish", "/ˈɡɑːnɪʃ/", "/ˈɡɑːrnɪʃ/", "a small amount of food used to decorate a dish", "đồ trang trí món ăn", "noun", "A sprig of fresh parsley makes a simple yet elegant garnish for the roasted chicken.", "Một nhánh mùi tây tươi tạo thành món trang trí đơn giản nhưng thanh lịch cho món gà nướng.", ["decoration", "embellishment"], [], ["edible garnish", "parsley garnish"]),
      v("staple", "/ˈsteɪpl/", "/ˈsteɪpl/", "a basic or necessary food item that is used frequently", "thực phẩm chủ yếu", "noun", "Rice is a staple in many Asian diets, providing the primary source of carbohydrates.", "Gạo là thực phẩm chủ yếu trong chế độ ăn của nhiều người châu Á, cung cấp nguồn tinh bột chính.", ["essential", "mainstay"], [], ["dietary staple", "household staple"]),
      v("concoction", "/kənˈkɒkʃn/", "/kənˈkɑːkʃn/", "a mixture of various ingredients or elements", "hỗn hợp pha chế", "noun", "The chef created a strange concoction of chocolate and chili that surprisingly tasted delicious.", "Đầu bếp đã tạo ra một hỗn hợp lạ lùng từ sô-cô-la và ớt mà bất ngờ thay lại có vị rất ngon.", ["mixture", "blend"], [], ["bizarre concoction", "creative concoction"]),
      v("infuse", "/ɪnˈfjuːz/", "/ɪnˈfjuːz/", "to steep or soak an ingredient in liquid to extract its flavor", "ngâm, chiết xuất hương vị", "verb", "You should infuse the olive oil with garlic and rosemary for at least two days.", "Bạn nên ngâm dầu ô liu với tỏi và hương thảo trong ít nhất hai ngày.", ["steep", "soak"], [], ["infuse with flavor", "infuse oil"]),
      v("zest", "/zest/", "/zest/", "the thin, outer colored part of the peel of citrus fruits, used as flavoring", "vỏ cam/chanh bào", "noun", "Add some lemon zest to the batter to give the cake a refreshing citrus aroma.", "Thêm một ít vỏ chanh bào vào bột để bánh có mùi hương cam chanh tươi mát.", ["peel", "rind"], [], ["lemon zest", "orange zest"]),
      v("bland", "/blænd/", "/blænd/", "lacking strong flavor or character", "nhạt nhẽo", "adjective", "The sauce was far too bland, so I added extra herbs and black pepper.", "Nước sốt quá nhạt nhẽo, vì vậy tôi đã thêm nhiều thảo mộc và tiêu đen hơn.", ["tasteless", "flavorless"], ["flavorful"], ["bland taste", "bland diet"]),
      v("perishable", "/ˈperɪʃəbl/", "/ˈperɪʃəbl/", "likely to decay or go bad quickly", "dễ hư hỏng", "adjective", "Store all perishable items like meat and dairy in the refrigerator immediately after shopping.", "Hãy cất tất cả các thực phẩm dễ hư hỏng như thịt và sữa vào tủ lạnh ngay sau khi mua sắm.", ["degradable", "spoilable"], ["non-perishable"], ["perishable goods", "perishable ingredients"]),
    ],
    C1: [
      v("emulsifier", "/ɪˈmʌlsɪfaɪə/", "/ɪˈmʌlsɪfaɪər/", "a substance used to mix two liquids that normally do not mix, such as oil and water", "chất nhũ hóa", "noun", "Lecithin is a common emulsifier used in chocolate production to maintain a smooth texture.", "Lecithin là một chất nhũ hóa phổ biến được sử dụng trong sản xuất sô-cô-la để duy trì kết cấu mịn màng.", ["stabilizer"], [], ["natural emulsifier", "food-grade emulsifier"]),
      v("leavening", "/ˈlɛvənɪŋ/", "/ˈlɛvənɪŋ/", "a substance, such as yeast or baking powder, that makes dough or batter rise", "chất làm nở (bột)", "noun", "Without sufficient leavening, the bread will turn out dense and unappealing.", "Nếu không có đủ chất làm nở, bánh mì sẽ trở nên đặc và kém hấp dẫn.", ["raising agent"], [], ["chemical leavening", "natural leavening"]),
      v("macerate", "/ˈmæsəreɪt/", "/ˈmæsəreɪt/", "to soften food by soaking it in a liquid", "ngâm mềm", "verb", "You should macerate the strawberries in sugar and balsamic vinegar for an hour before serving.", "Bạn nên ngâm dâu tây với đường và giấm balsamic trong một giờ trước khi phục vụ.", ["steep", "soak"], [], ["macerate fruit", "macerated in syrup"]),
      v("succulent", "/ˈsʌkjələnt/", "/ˈsʌkjələnt/", "juicy and tasty", "mọng nước, ngon lành", "adjective", "The recipe highlights the use of succulent tomatoes picked at the peak of the season.", "Công thức nhấn mạnh việc sử dụng những quả cà chua mọng nước được hái vào thời điểm chín rộ.", ["juicy", "moist"], ["dry"], ["succulent fruit", "succulent meat"]),
      v("emulsion", "/ɪˈmʌlʃn/", "/ɪˈmʌlʃn/", "a fine dispersion of minute droplets of one liquid in another in which it is not soluble", "nhũ tương", "noun", "Vinaigrette is a temporary emulsion of oil and vinegar that needs constant whisking.", "Vinaigrette là một dạng nhũ tương tạm thời giữa dầu và giấm cần phải đánh đều liên tục.", ["mixture", "blend"], [], ["stable emulsion", "create an emulsion"]),
    ],
    C2: [
      v("allium", "/ˈæl.i.əm/", "/ˈæl.i.əm/", "a plant of a genus that includes onion, garlic, shallot, and leek.", "thực vật thuộc chi hành (hành, tỏi, hẹ)", "noun", "The soup base relies heavily on a complex allium profile to build depth.", "Nền súp dựa nhiều vào đặc tính phức hợp của các loại hành tỏi để tạo độ sâu cho hương vị.", ["bulbous plant"], [], ["allium family", "aromatic allium"]),
      v("legume", "/ˈleɡ.juːm/", "/ˈleɡ.juːm/", "a plant in the family Fabaceae, or its edible seed.", "cây họ đậu", "noun", "Incorporating a variety of legume species into your pantry increases protein diversity.", "Kết hợp nhiều loại cây họ đậu vào tủ bếp giúp tăng cường sự đa dạng protein.", ["pulse", "bean"], [], ["dried legume", "legume crop"]),
      v("viscous", "/ˈvɪs.kəs/", "/ˈvɪs.kəs/", "having a thick, sticky consistency between solid and liquid.", "nhớt, đặc dính", "adjective", "The reduction created a highly viscous glaze that coated the meat perfectly.", "Sự cô đặc đã tạo ra một lớp sốt bóng đặc dính bao phủ miếng thịt một cách hoàn hảo.", ["syrupy", "thick"], ["runny"], ["viscous liquid", "highly viscous"]),
      v("reconstitute", "/ˌriːˈkɒn.stɪ.tjuːt/", "/ˌriːˈkɑːn.stə.tuːt/", "to restore dried food to its original state by adding water.", "hoàn nguyên (thực phẩm khô)", "verb", "You must reconstitute the dried porcini mushrooms in warm water before adding them to the risotto.", "Bạn phải ngâm nấm porcini khô trong nước ấm để hoàn nguyên trước khi thêm vào món risotto.", ["rehydrate"], ["dehydrate"], ["reconstitute dried mushrooms", "reconstitute powder"]),
      v("tuber", "/ˈtjuː.bər/", "/ˈtuː.bɚ/", "a thick, fleshy, underground stem of a plant.", "củ", "noun", "The potato is perhaps the most versatile culinary tuber in global gastronomy.", "Khoai tây có lẽ là loại củ linh hoạt nhất trong ẩm thực toàn cầu.", ["root vegetable"], [], ["starchy tuber", "tuberous root"]),
      v("pith", "/pɪθ/", "/pɪθ/", "the white, spongy inner layer of citrus peel.", "cùi trắng (của cam, quýt)", "noun", "Remove the bitter pith carefully to ensure the marmalade remains sweet and refined.", "Hãy loại bỏ lớp cùi trắng đắng một cách cẩn thận để đảm bảo món mứt cam vẫn giữ được vị ngọt và sự tinh tế.", ["albedo"], [], ["bitter pith", "remove the pith"]),
    ],
  },
  "Cooking Methods": {
    A1: [
      v("boil", "/bɔɪl/", "/bɔɪl/", "to heat a liquid until it reaches the temperature at which it bubbles and turns to vapor", "luộc, đun sôi", "verb", "Please boil the water for the tea.", "Làm ơn đun sôi nước để pha trà.", ["simmer"], [], ["boil water", "boil eggs"]),
      v("fry", "/fraɪ/", "/fraɪ/", "to cook food in hot oil or fat", "chiên, rán", "verb", "I like to fry potatoes for lunch.", "Tôi thích chiên khoai tây cho bữa trưa.", ["sauté"], [], ["fry chicken", "deep fry"]),
      v("bake", "/beɪk/", "/beɪk/", "to cook food in an oven using dry heat", "nướng (bằng lò)", "verb", "We bake a cake for her birthday.", "Chúng tôi nướng một chiếc bánh cho ngày sinh nhật của cô ấy.", ["roast"], [], ["bake bread", "bake a cake"]),
      v("steam", "/stiːm/", "/stiːm/", "to cook food using steam from boiling water", "hấp", "verb", "It is healthy to steam vegetables.", "Hấp rau củ thì tốt cho sức khỏe.", ["poach"], [], ["steam vegetables", "steam fish"]),
      v("grill", "/ɡrɪl/", "/ɡrɪl/", "to cook food over direct heat, usually on a metal grate", "nướng (trên vỉ)", "verb", "Let's grill some meat in the garden.", "Hãy nướng thịt ngoài vườn nào.", ["barbecue"], [], ["grill meat", "grill fish"]),
      v("mix", "/mɪks/", "/mɪks/", "to combine two or more substances together", "trộn, khuấy", "verb", "Mix the flour and eggs in a bowl.", "Trộn bột mì và trứng vào một cái bát.", ["blend", "stir"], [], ["mix well", "mix ingredients"]),
      v("slice", "/slaɪs/", "/slaɪs/", "to cut food into thin, flat pieces", "thái lát", "verb", "Please slice the bread for breakfast.", "Làm ơn thái lát bánh mì cho bữa sáng.", ["cut", "chop"], [], ["slice thin", "slice bread"]),
      v("wash", "/wɒʃ/", "/wɑːʃ/", "to clean food with water before cooking", "rửa", "verb", "You must wash the vegetables before you cook.", "Bạn phải rửa rau trước khi nấu.", ["rinse"], [], ["wash fruit", "wash hands"]),
      v("heat", "/hiːt/", "/hiːt/", "to make food become warm or hot", "làm nóng", "verb", "Heat the soup for five minutes.", "Làm nóng súp trong năm phút.", ["warm up"], ["cool"], ["heat up", "heat slowly"]),
    ],
    A2: [
      v("stir-fry", "/ˈstɜː.fraɪ/", "/ˈstɜːr.fraɪ/", "to cook small pieces of food quickly in a little hot oil while moving it constantly", "xào", "verb", "Stir-fry the beef with some onions and peppers.", "Xào thịt bò với một ít hành tây và ớt chuông.", ["sauté"], [], ["stir-fry vegetables", "quick stir-fry"]),
      v("chop", "/tʃɒp/", "/tʃɑːp/", "to cut food into smaller pieces with a knife", "thái, chặt", "verb", "Please chop the onions into small pieces.", "Làm ơn thái hành tây thành những miếng nhỏ.", ["slice", "cut"], [], ["chop vegetables", "finely chop"]),
    ],
    B1: [
      v("simmer", "/ˈsɪm.ər/", "/ˈsɪm.ɚ/", "to cook something liquid slowly at a temperature just below boiling", "ninh, đun sôi lăn tăn", "verb", "Let the soup simmer for twenty minutes before serving.", "Hãy để món súp ninh trong hai mươi phút trước khi phục vụ.", ["stew"], ["boil"], ["simmer gently", "simmer the sauce"]),
      v("blend", "/blend/", "/blend/", "to mix two or more substances together until they are smooth", "xay, trộn", "verb", "You should blend the fruits to make a delicious smoothie.", "Bạn nên xay trái cây để làm món sinh tố thơm ngon.", ["mix", "puree"], ["separate"], ["blend together", "blend well"]),
      v("whisk", "/wɪsk/", "/wɪsk/", "to beat food quickly with a special tool to add air", "đánh (trứng, kem)", "verb", "Whisk the eggs until they become light and fluffy.", "Đánh trứng cho đến khi chúng trở nên nhẹ và bông xốp.", ["beat", "whip"], [], ["whisk eggs", "whisk until smooth"]),
    ],
    B2: [
      v("sauté", "/ˈsəʊteɪ/", "/soʊˈteɪ/", "to fry food quickly in a little hot fat", "áp chảo", "verb", "Sauté the onions and garlic until they are soft and translucent.", "Áp chảo hành và tỏi cho đến khi chúng mềm và trong.", ["pan-fry"], [], ["sauté vegetables", "lightly sauté"]),
      v("blanch", "/blɑːntʃ/", "/blæntʃ/", "to put food briefly in boiling water to make it easier to peel or to preserve color", "trần sơ", "verb", "You should blanch the tomatoes to remove their skins easily.", "Bạn nên trần sơ cà chua để bóc vỏ chúng dễ dàng hơn.", ["scald"], [], ["blanch vegetables", "blanch almonds"]),
      v("braise", "/breɪz/", "/breɪz/", "to cook meat or vegetables slowly in a small amount of liquid in a closed container", "om", "verb", "The chef decided to braise the beef in red wine for three hours.", "Đầu bếp quyết định om thịt bò trong rượu vang đỏ trong ba giờ.", ["stew"], [], ["braise meat", "slowly braise"]),
      v("sear", "/sɪə(r)/", "/sɪr/", "to cook the surface of meat quickly at a very high temperature", "làm cháy cạnh", "verb", "Sear the steak on both sides to lock in the juices.", "Làm cháy cạnh miếng bít tết ở cả hai mặt để giữ lại nước cốt.", ["brown"], [], ["sear a steak", "properly sear"]),
      v("glaze", "/ɡleɪz/", "/ɡleɪz/", "to coat food with a shiny substance such as sugar or syrup", "phết lớp phủ bóng", "verb", "Brush the ham with honey to glaze it before putting it in the oven.", "Phết mật ong lên giăm bông để tạo lớp phủ bóng trước khi cho vào lò nướng.", ["coat"], [], ["glaze a cake", "honey glaze"]),
    ],
    C1: [
      v("sous-vide", "/suːˈviːd/", "/suːˈviːd/", "cooking food sealed in vacuum bags at a precisely controlled low temperature", "nấu chân không (nhiệt độ thấp)", "verb", "Many modern restaurants sous-vide their steaks to achieve a perfectly even doneness.", "Nhiều nhà hàng hiện đại nấu bít tết bằng phương pháp chân không để đạt được độ chín đều hoàn hảo.", ["vacuum-seal cooking"], [], ["sous-vide steak", "sous-vide machine"]),
      v("confit", "/ˈkɒnfi/", "/kɑːnˈfiː/", "to cook food slowly in fat at a low temperature for preservation", "nấu chậm trong mỡ", "verb", "The duck legs are slow-cooked in their own fat to create a traditional duck confit.", "Những chiếc đùi vịt được nấu chậm trong mỡ của chính nó để tạo nên món vịt confit truyền thống.", ["slow-cook in fat"], [], ["duck confit", "confit garlic"]),
      v("deglaze", "/diːˈɡleɪz/", "/diːˈɡleɪz/", "to add liquid to a hot pan to loosen caramelized food particles for a sauce", "lấy nước cốt từ chảo (sau khi chiên/rán)", "verb", "Deglaze the pan with a splash of wine to incorporate the flavorful browned bits into the sauce.", "Dùng một ít rượu để lấy nước cốt từ chảo nhằm hòa quyện những phần cháy sém thơm ngon vào nước sốt.", ["scrape the pan"], [], ["deglaze the pan", "deglaze with wine"]),
      v("char", "/tʃɑː(r)/", "/tʃɑːr/", "to burn the surface of food slightly to add a smoky flavor", "làm cháy xém", "verb", "Char the peppers over an open flame until the skin is blackened and blistered.", "Làm cháy xém ớt trên ngọn lửa cho đến khi vỏ chuyển sang màu đen và phồng rộp.", ["sear", "scorch"], [], ["char slightly", "charred surface"]),
      v("emulsify", "/ɪˈmʌlsɪfaɪ/", "/ɪˈmʌlsɪfaɪ/", "to combine two liquids that normally do not mix, like oil and vinegar", "nhũ hóa (kết hợp các chất lỏng không hòa tan)", "verb", "Whisk the dressing vigorously to emulsify the oil and lemon juice into a smooth sauce.", "Đánh mạnh tay hỗn hợp nước sốt để nhũ hóa dầu và nước cốt chanh thành một loại sốt sánh mịn.", ["blend", "bind"], ["separate"], ["emulsify sauce", "emulsify dressing"]),
    ],
    C2: [
      v("flambé", "/flɒmˈbeɪ/", "/flɑːmˈbeɪ/", "to cover food with alcohol and set it alight briefly", "đốt rượu", "verb", "The waiter will flambé the crêpes suzette at your table for a dramatic effect.", "Người phục vụ sẽ đốt rượu món crêpes suzette ngay tại bàn của bạn để tạo hiệu ứng ấn tượng.", ["ignite"], [], ["flambé a dish", "flambé pan"]),
      v("render", "/ˈrendə(r)/", "/ˈrendər/", "to melt down solid fat, especially from meat, to separate it from the connective tissue", "nấu chảy mỡ", "verb", "Render the fat from the bacon slowly until it becomes crispy and golden.", "Nấu chảy mỡ từ thịt xông khói từ từ cho đến khi nó trở nên giòn và vàng.", ["melt down"], [], ["render fat", "rendered lard"]),
    ],
  },
  "Restaurants": {
    A1: [
      v("menu", "/ˈmenjuː/", "/ˈmenjuː/", "a list of dishes available in a restaurant", "thực đơn", "noun", "Can I see the menu, please?", "Cho tôi xem thực đơn được không?", ["bill of fare"], [], ["read the menu", "ask for the menu"]),
      v("waiter", "/ˈweɪtə(r)/", "/ˈweɪtər/", "a person who serves food and drinks in a restaurant", "bồi bàn nam", "noun", "The waiter brings us our food.", "Người phục vụ mang đồ ăn đến cho chúng tôi.", ["server"], [], ["friendly waiter", "ask the waiter"]),
      v("order", "/ˈɔːdə(r)/", "/ˈɔːrdər/", "a request for food or drink", "gọi món", "verb", "Are you ready to order now?", "Bạn đã sẵn sàng để gọi món chưa?", ["request"], [], ["order food", "place an order"]),
      v("bill", "/bɪl/", "/bɪl/", "a document showing how much you have to pay", "hóa đơn", "noun", "Could we have the bill, please?", "Cho chúng tôi xin hóa đơn ạ.", ["check"], [], ["pay the bill", "ask for the bill"]),
      v("serve", "/sɜːv/", "/sɜːrv/", "to provide food or drink to someone", "phục vụ", "verb", "They serve breakfast until 10 am.", "Họ phục vụ bữa sáng đến 10 giờ sáng.", ["provide"], [], ["serve food", "serve drinks"]),
      v("tip", "/tɪp/", "/tɪp/", "extra money given to service staff", "tiền boa", "noun", "I left a small tip for the waiter.", "Tôi đã để lại một chút tiền boa cho người phục vụ.", ["gratuity"], [], ["give a tip", "leave a tip"]),
      v("tasty", "/ˈteɪsti/", "/ˈteɪsti/", "having a very good flavor", "ngon", "adjective", "This soup is very tasty.", "Món súp này rất ngon.", ["delicious"], ["bland"], ["very tasty", "tasty meal"]),
    ],
    A2: [
      v("reserve", "/rɪˈzɜːv/", "/rɪˈzɜːrv/", "to arrange for a table to be kept for you at a restaurant", "đặt chỗ", "verb", "I would like to reserve a table for two this evening.", "Tôi muốn đặt một bàn cho hai người vào tối nay.", ["book"], [], ["reserve a table", "need to reserve"]),
    ],
    B1: [
      v("special", "/ˈspeʃl/", "/ˈspeʃl/", "a dish that is not on the regular menu but is available for a limited time", "món đặc biệt trong ngày", "noun", "Today's special is grilled salmon with herbs.", "Món đặc biệt hôm nay là cá hồi nướng với thảo mộc.", ["daily special"], [], ["chef's special", "try the special"]),
      v("recommend", "/ˌrekəˈmend/", "/ˌrekəˈmend/", "to suggest a particular dish or restaurant because it is good", "gợi ý, đề xuất", "verb", "Can you recommend any good Italian restaurants in this area?", "Bạn có thể gợi ý nhà hàng Ý nào ngon ở khu vực này không?", ["suggest"], [], ["highly recommend", "recommend a dish"]),
      v("included", "/ɪnˈkluːdɪd/", "/ɪnˈkluːdɪd/", "part of the total price, especially regarding taxes or service charges", "được bao gồm", "adjective", "Is the service charge included in the price?", "Phí dịch vụ đã được bao gồm trong giá chưa?", ["contained"], ["excluded"], ["tax included", "service included"]),
      v("available", "/əˈveɪləbl/", "/əˈveɪləbl/", "something that you can get, buy, or use at the restaurant", "có sẵn", "adjective", "Are there any vegetarian options available on the menu?", "Có lựa chọn ăn chay nào có sẵn trong thực đơn không?", ["obtainable"], ["unavailable"], ["readily available", "make available"]),
    ],
    B2: [
      v("ambiance", "/ˈæm.bi.əns/", "/ˈæm.bi.əns/", "the character and atmosphere of a place", "không gian, bầu không khí", "noun", "The restaurant has a relaxing ambiance that makes it perfect for a romantic dinner.", "Nhà hàng có một bầu không khí thư thái khiến nó trở nên hoàn hảo cho một bữa tối lãng mạn.", ["atmosphere", "mood"], [], ["relaxed ambiance", "intimate ambiance"]),
      v("impeccable", "/ɪmˈpek.ə.bəl/", "/ɪmˈpek.ə.bəl/", "faultless; in accordance with the highest standards", "hoàn hảo, không tì vết", "adjective", "The service at the five-star hotel restaurant was truly impeccable.", "Dịch vụ tại nhà hàng khách sạn năm sao thực sự hoàn hảo.", ["flawless", "perfect"], ["imperfect"], ["impeccable service", "impeccable standards"]),
      v("savory", "/ˈseɪ.vər.i/", "/ˈseɪ.vɚ.i/", "salty or spicy rather than sweet in taste", "có vị mặn hoặc cay (thường dùng cho món chính)", "adjective", "After the dessert, we were craving something savory to balance the sweetness.", "Sau món tráng miệng, chúng tôi thèm một thứ gì đó có vị mặn để cân bằng vị ngọt.", ["salty", "piquant"], ["sweet"], ["savory dish", "savory snack"]),
      v("beverage", "/ˈbev.ər.ɪdʒ/", "/ˈbev.ɚ.ɪdʒ/", "a drink of any type", "đồ uống", "noun", "The restaurant offers an extensive list of alcoholic and non-alcoholic beverages.", "Nhà hàng cung cấp một danh sách phong phú các loại đồ uống có cồn và không cồn.", ["drink", "refreshment"], [], ["hot beverage", "beverage menu"]),
      v("complimentary", "/ˌkɒm.plɪˈmen.tər.i/", "/ˌkɑːm.pləˈmen.t̬ɚ.i/", "given free of charge", "miễn phí, tặng kèm", "adjective", "We were served complimentary bread while waiting for our main course.", "Chúng tôi được phục vụ bánh mì miễn phí trong khi chờ món chính.", ["free", "gratis"], ["paid"], ["complimentary drink", "complimentary dessert"]),
      v("diner", "/ˈdaɪ.nər/", "/ˈdaɪ.nɚ/", "a person who is eating a meal, especially in a restaurant", "thực khách", "noun", "The waiter made sure every diner was satisfied with their meal.", "Người phục vụ đảm bảo rằng mọi thực khách đều hài lòng với bữa ăn của họ.", ["customer", "patron"], [], ["satisfied diner", "regular diner"]),
      v("split the bill", "/splɪt ðə bɪl/", "/splɪt ðə bɪl/", "to share the cost of a restaurant bill among a group", "chia hóa đơn, chia tiền ăn", "phrase", "It is common for friends to split the bill when they dine out together.", "Việc bạn bè chia nhau hóa đơn khi đi ăn ngoài cùng nhau là rất phổ biến.", ["go Dutch", "share the cost"], [], ["agreed to split the bill"]),
    ],
    C1: [
      v("gastronomy", "/ɡæsˈtrɒn.ə.mi/", "/ɡæsˈtrɑː.nə.mi/", "the art and practice of choosing, cooking, and eating good food", "nghệ thuật ẩm thực", "noun", "The restaurant is dedicated to the highest standards of local gastronomy.", "Nhà hàng này cam kết tuân thủ các tiêu chuẩn cao nhất của nghệ thuật ẩm thực địa phương.", ["culinary art", "cookery"], [], ["fine gastronomy", "molecular gastronomy"]),
      v("a la carte", "/ˌɑː.ləˈkɑːt/", "/ˌɑː.ləˈkɑːrt/", "referring to a menu where items are priced and ordered separately", "gọi món theo từng món riêng lẻ", "adjective", "We preferred an a la carte menu so we could select exactly what we wanted to try.", "Chúng tôi thích thực đơn gọi món hơn để có thể chọn chính xác những gì mình muốn thử.", ["individually priced"], ["table d'hôte"], ["a la carte menu", "dine a la carte"]),
      v("sommelier", "/ˈsɒm.əl.jeɪ/", "/ˌsʌm.əlˈjeɪ/", "a wine steward or expert professional in a restaurant", "chuyên gia thử nếm rượu vang", "noun", "The sommelier recommended a vintage red to perfectly complement our steak.", "Chuyên gia rượu vang đã gợi ý một loại rượu vang đỏ lâu năm để kết hợp hoàn hảo với món bít tết của chúng tôi.", ["wine steward"], [], ["expert sommelier", "consult the sommelier"]),
      v("palate", "/ˈpæl.ət/", "/ˈpæl.ət/", "a person's ability to distinguish and appreciate different flavors", "khẩu vị, vị giác", "noun", "The chef's innovative dishes are designed to challenge the refined palate of his guests.", "Những món ăn sáng tạo của đầu bếp được thiết kế để thử thách khẩu vị tinh tế của các thực khách.", ["taste", "gustatory sense"], [], ["refined palate", "sophisticated palate"]),
      v("scrumptious", "/ˈskrʌmp.ʃəs/", "/ˈskrʌmp.ʃəs/", "extremely delicious or pleasant to the taste", "ngon tuyệt hảo", "adjective", "We were served a scrumptious three-course meal that left us completely satisfied.", "Chúng tôi được phục vụ một bữa ăn ba món ngon tuyệt hảo khiến chúng tôi hoàn toàn hài lòng.", ["delectable", "exquisite"], ["bland", "unappetizing"], ["scrumptious dessert", "scrumptious meal"]),
      v("patronize", "/ˈpæt.rə.naɪz/", "/ˈpeɪ.trə.naɪz/", "to be a regular customer of a business", "thường xuyên lui tới (nhà hàng, quán ăn)", "verb", "Locals have continued to patronize this historic bistro for over fifty years.", "Người dân địa phương vẫn tiếp tục lui tới quán ăn lịch sử này hơn năm mươi năm qua.", ["frequent", "support"], ["boycott"], ["patronize a restaurant", "loyal patrons"]),
      v("decanter", "/dɪˈkæn.tər/", "/dɪˈkæn.t̬ɚ/", "a glass container used for serving wine or other liquids", "bình chiết rượu", "noun", "The waiter carefully poured the wine into a crystal decanter to let it breathe.", "Người phục vụ cẩn thận rót rượu vào bình chiết pha lê để rượu được thở.", ["carafe", "vessel"], [], ["glass decanter", "decant the wine"]),
    ],
    C2: [
      v("trencherman", "/ˈtrɛntʃəmən/", "/ˈtrɛntʃərmən/", "A person who eats heartily and with great appetite.", "người ăn khỏe, người có sức ăn lớn", "noun", "He is a notable trencherman, easily finishing the entire five-course tasting menu.", "Anh ấy là một người có sức ăn đáng nể, dễ dàng hoàn thành toàn bộ thực đơn nếm thử năm món.", ["glutton", "big eater"], ["fussy eater"], ["notable trencherman", "prolific trencherman"]),
      v("amuse-bouche", "/əˌmjuːz ˈbuːʃ/", "/əˌmjuːz ˈbuːʃ/", "A single, bite-sized hors d'oeuvre served before a meal to whet the appetite.", "món khai vị nhỏ dùng thử", "noun", "The chef presented an amuse-bouche of chilled gazpacho to start our culinary journey.", "Đầu bếp đã phục vụ một món khai vị nhỏ là súp gazpacho ướp lạnh để bắt đầu hành trình ẩm thực của chúng tôi.", ["starter", "appetizer"], [], ["delicate amuse-bouche", "serve an amuse-bouche"]),
      v("scoff", "/skɒf/", "/skɑːf/", "To eat something quickly and greedily.", "ăn ngấu nghiến, ăn vội vàng", "verb", "After the long conference, the delegates proceeded to scoff the buffet leftovers.", "Sau hội nghị kéo dài, các đại biểu đã nhanh chóng ăn ngấu nghiến phần thức ăn thừa tại tiệc buffet.", ["devour", "gobble"], ["nibble"], ["scoff down", "scoff greedily"]),
      v("refection", "/rɪˈfɛkʃən/", "/rɪˈfɛkʃən/", "A meal or light refreshment, especially one that is formal or communal.", "bữa ăn nhẹ, sự bồi dưỡng", "noun", "The restaurant lounge provided a quiet space for a light refection after the theater performance.", "Sảnh nhà hàng cung cấp một không gian yên tĩnh cho một bữa ăn nhẹ sau buổi biểu diễn sân khấu.", ["refreshment", "repast"], [], ["light refection", "formal refection"]),
      v("conviviality", "/kənˌvɪviˈæləti/", "/kənˌvɪviˈæləti/", "The quality of being friendly, lively, and enjoyable in a social or dining setting.", "sự vui vẻ, không khí thân mật", "noun", "The bistro is renowned for the conviviality of its atmosphere, making it a favorite local haunt.", "Quán rượu nhỏ này nổi tiếng với không khí vui vẻ, thân mật, khiến nó trở thành địa điểm yêu thích của người dân địa phương.", ["gaiety", "sociability"], ["solemnity"], ["shared conviviality", "atmosphere of conviviality"]),
      v("decant", "/dɪˈkænt/", "/dɪˈkænt/", "To pour wine from its bottle into another container to separate it from sediment.", "gạn rượu (để lắng cặn)", "verb", "It is essential to decant the aged red wine an hour before serving to let it breathe.", "Việc gạn loại rượu vang đỏ lâu năm một giờ trước khi phục vụ để rượu thở là rất cần thiết.", ["pour", "transfer"], [], ["decant wine", "properly decant"]),
      v("epicurean", "/ˌɛpɪkjʊˈriːən/", "/ˌɛpɪkjʊˈriːən/", "Devoted to sensual enjoyment, especially that derived from fine food and drink.", "sành ăn, khoái lạc", "adjective", "The restaurant offers an epicurean experience that emphasizes seasonal ingredients and masterful techniques.", "Nhà hàng mang đến một trải nghiệm sành ăn chú trọng vào nguyên liệu theo mùa và kỹ thuật điêu luyện.", ["gourmet", "gastronomic"], ["ascetic"], ["epicurean delight", "epicurean experience"]),
    ],
  },
  "Drinks & Beverages": {
    A1: [
      v("tea", "/tiː/", "/tiː/", "a hot drink made by steeping dried leaves in water", "trà", "noun", "I like to have tea in the morning.", "Tôi thích uống trà vào buổi sáng.", ["green tea", "black tea"], [], ["hot tea", "cup of tea"]),
      v("juice", "/dʒuːs/", "/dʒuːs/", "a liquid from fruit or vegetables", "nước ép", "noun", "She drinks orange juice for breakfast.", "Cô ấy uống nước cam vào bữa sáng.", ["nectar"], [], ["orange juice", "fresh juice"]),
      v("soda", "/ˈsəʊ.də/", "/ˈsoʊ.də/", "a sweet, fizzy carbonated drink", "nước ngọt có ga", "noun", "Do you want a glass of soda?", "Bạn có muốn một ly nước ngọt không?", ["fizzy drink", "pop"], [], ["can of soda", "ice-cold soda"]),
      v("cup", "/kʌp/", "/kʌp/", "a small container used for drinking", "cái tách, cái chén", "noun", "He holds a cup of tea in his hand.", "Anh ấy cầm một tách trà trên tay.", ["mug"], [], ["cup of tea", "coffee cup"]),
      v("glass", "/ɡlɑːs/", "/ɡlæs/", "a clear container for drinking", "cái ly", "noun", "Please pour some juice into the glass.", "Vui lòng rót một ít nước ép vào ly.", ["tumbler"], [], ["glass of water", "empty glass"]),
      v("pour", "/pɔːr/", "/pɔːr/", "to make a liquid flow from a container", "rót", "verb", "Can you pour me a glass of water?", "Bạn có thể rót cho tôi một ly nước không?", ["fill"], [], ["pour a drink", "pour into"]),
      v("ice", "/aɪs/", "/aɪs/", "frozen water", "đá", "noun", "I would like my soda with ice.", "Tôi muốn uống nước ngọt với đá.", ["frozen water"], [], ["ice cube", "with ice"]),
      v("sweet", "/swiːt/", "/swiːt/", "having a taste like sugar", "ngọt", "adjective", "This juice is very sweet.", "Nước ép này rất ngọt.", ["sugary"], ["bitter"], ["sweet drink", "sweet tea"]),
    ],
    A2: [
      v("smoothie", "/ˈsmuːði/", "/ˈsmuːði/", "a thick, cold drink made of fruit mixed with milk or yogurt", "sinh tố", "noun", "A strawberry smoothie is a great healthy snack.", "Một ly sinh tố dâu tây là món ăn nhẹ lành mạnh tuyệt vời.", ["shake"], [], ["fruit smoothie", "strawberry smoothie"]),
      v("sip", "/sɪp/", "/sɪp/", "to drink something by taking very small amounts", "nhấp môi, uống từng ngụm nhỏ", "verb", "She likes to sip her hot chocolate slowly.", "Cô ấy thích nhấp từng ngụm sô cô la nóng thật chậm rãi.", ["taste"], ["gulp"], ["sip slowly", "take a sip"]),
      v("lemonade", "/ˌleməˈneɪd/", "/ˌleməˈneɪd/", "a drink made of lemon juice, water, and sugar", "nước chanh", "noun", "Cold lemonade is very refreshing on a hot day.", "Nước chanh lạnh rất sảng khoái vào một ngày nóng bức.", ["limeade"], [], ["fresh lemonade", "glass of lemonade"]),
      v("mug", "/mʌɡ/", "/mʌɡ/", "a large cup with a handle, usually for hot drinks", "cái cốc lớn (có quai)", "noun", "He held a warm mug of tea in his hands.", "Anh ấy cầm một chiếc cốc trà nóng trên tay.", ["cup"], [], ["coffee mug", "large mug"]),
      v("bottle", "/ˈbɒtl/", "/ˈbɑːtl/", "a container with a narrow neck, used for storing liquids", "cái chai", "noun", "Can you pass me that bottle of water?", "Bạn có thể đưa cho tôi chai nước đó được không?", ["flask"], [], ["water bottle", "plastic bottle"]),
    ],
    B1: [
      v("refreshment", "/rɪˈfreʃmənt/", "/rɪˈfreʃmənt/", "a snack or light drink provided at an event", "đồ ăn nhẹ hoặc nước uống giải khát", "noun", "We served some light refreshments during the break.", "Chúng tôi đã phục vụ một ít đồ giải khát trong giờ nghỉ.", ["snack", "tonic"], [], ["serve refreshments", "light refreshments"]),
      v("fizzy", "/ˈfɪzi/", "/ˈfɪzi/", "having bubbles of gas in a liquid", "có ga, sủi bọt", "adjective", "Children often prefer fizzy drinks like soda.", "Trẻ em thường thích các loại đồ uống có ga như nước ngọt.", ["carbonated", "sparkling"], ["still"], ["fizzy drink", "fizzy water"]),
      v("brew", "/bruː/", "/bruː/", "to make a hot drink like tea or coffee by mixing it with hot water", "pha (trà, cà phê)", "verb", "He went to the kitchen to brew a fresh pot of coffee.", "Anh ấy đi vào bếp để pha một bình cà phê mới.", ["infuse", "prepare"], [], ["brew coffee", "freshly brewed"]),
      v("caffeine", "/ˈkæfiːn/", "/ˈkæfiːn/", "a substance found in tea and coffee that makes you feel more active", "chất caffein", "noun", "Too much caffeine can make it difficult to sleep at night.", "Quá nhiều caffein có thể khiến bạn khó ngủ vào ban đêm.", ["stimulant"], [], ["caffeine intake", "caffeine-free"]),
      v("dilute", "/daɪˈluːt/", "/daɪˈluːt/", "to make a liquid thinner or weaker by adding water", "pha loãng", "verb", "You should dilute the fruit juice with water before giving it to the child.", "Bạn nên pha loãng nước trái cây với nước lọc trước khi cho trẻ uống.", ["water down", "weaken"], ["concentrate"], ["dilute with water", "highly diluted"]),
      v("iced", "/aɪst/", "/aɪst/", "served cold with ice", "được ướp lạnh, có đá", "adjective", "I prefer iced tea instead of coffee on a hot summer day.", "Tôi thích trà đá hơn là cà phê vào một ngày hè nóng bức.", ["chilled", "frozen"], ["steaming"], ["iced coffee", "iced tea"]),
      v("tap", "/tæp/", "/tæp/", "water that comes from a pipe in the house", "nước vòi, nước máy", "noun", "Is it safe to drink water straight from the tap here?", "Uống nước trực tiếp từ vòi ở đây có an toàn không?", ["faucet water"], [], ["tap water", "turn on the tap"]),
    ],
    B2: [
      v("intoxicating", "/ɪnˈtɒk.sɪ.keɪ.tɪŋ/", "/ɪnˈtɑːk.sə.keɪ.t̬ɪŋ/", "containing alcohol that can make you feel drunk", "có chất gây say, có cồn", "adjective", "The guests were offered a variety of intoxicating beverages at the wedding reception.", "Các vị khách được mời nhiều loại đồ uống có cồn tại tiệc cưới.", ["alcoholic", "inebriating"], ["non-alcoholic"], ["intoxicating beverage", "intoxicating liquor"]),
      v("quench", "/kwentʃ/", "/kwentʃ/", "to drink something to stop yourself from being thirsty", "giải khát", "verb", "Nothing quenches my thirst like an ice-cold lemonade on a hot summer day.", "Không gì giải khát bằng một ly nước chanh đá lạnh vào ngày hè oi ả.", ["slake", "satisfy"], [], ["quench thirst", "thirst-quenching"]),
      v("decaffeinated", "/ˌdiːˈkæf.ɪ.neɪ.tɪd/", "/ˌdiːˈkæf.ə.neɪ.t̬ɪd/", "having the caffeine removed", "đã loại bỏ caffeine", "adjective", "I usually order a decaffeinated coffee in the evening to avoid sleeplessness.", "Tôi thường gọi cà phê đã loại bỏ caffeine vào buổi tối để tránh mất ngủ.", ["decaf"], ["caffeinated"], ["decaffeinated coffee", "decaffeinated tea"]),
      v("connoisseur", "/ˌkɒn.əˈsɜːr/", "/ˌkɑː.nəˈsɜːr/", "a person who knows a lot about a particular subject like wine or tea", "người sành sỏi (về rượu, trà)", "noun", "As a wine connoisseur, he could identify the vintage just by the smell.", "Là một người sành rượu, anh ấy có thể nhận ra năm sản xuất chỉ bằng mùi hương.", ["expert", "aficionado"], ["amateur"], ["wine connoisseur", "coffee connoisseur"]),
      v("carbonated", "/ˈkɑː.bə.neɪ.tɪd/", "/ˈkɑːr.bə.neɪ.t̬ɪd/", "containing small bubbles of carbon dioxide gas", "có ga", "adjective", "Many people try to limit their intake of carbonated soft drinks for health reasons.", "Nhiều người cố gắng hạn chế lượng nước ngọt có ga vì lý do sức khỏe.", ["fizzy", "sparkling"], ["still"], ["carbonated drink", "carbonated water"]),
      v("infusion", "/ɪnˈfjuː.ʒən/", "/ɪnˈfjuː.ʒən/", "a drink made by soaking herbs or tea leaves in hot water", "trà thảo mộc, nước hãm", "noun", "This herbal infusion is known for its calming properties.", "Loại trà thảo mộc này nổi tiếng với đặc tính giúp thư giãn.", ["brew", "tisane"], [], ["herbal infusion", "fruit infusion"]),
    ],
    C1: [
      v("imbue", "/ɪmˈbjuː/", "/ɪmˈbjuː/", "to soak or saturate with a particular quality or flavor", "thấm đẫm, ngấm", "verb", "They imbue the tea leaves with jasmine blossoms to create a fragrant scent.", "Họ ướp hoa nhài vào lá trà để tạo nên hương thơm ngát.", ["infuse", "permeate"], [], ["imbue with flavor", "imbue with essence"]),
      v("effervescent", "/ˌef.əˈves.ənt/", "/ˌef.ɚˈves.ənt/", "bubbling, hissing, and foaming as gas escapes", "sủi bọt, có ga", "adjective", "The sommelier recommended an effervescent wine to pair with the light appetizer.", "Chuyên gia rượu vang gợi ý một loại vang sủi để dùng kèm với món khai vị nhẹ.", ["fizzy", "sparkling"], ["still"], ["effervescent wine", "effervescent mineral water"]),
      v("intoxicant", "/ɪnˈtɒk.sɪ.kənt/", "/ɪnˈtɑːk.sɪ.kənt/", "a substance, especially a drink, that causes someone to lose control of their physical and mental faculties", "chất gây say", "noun", "The local laws strictly regulate the sale of any potent intoxicant in public venues.", "Luật địa phương quy định nghiêm ngặt việc bán bất kỳ loại chất gây say mạnh nào tại các địa điểm công cộng.", ["stimulant", "alcohol"], [], ["potent intoxicant", "mild intoxicant"]),
      v("slurp", "/slɜːp/", "/slɝːp/", "to drink or eat something with a loud, sucking noise", "húp sùm sụp", "verb", "It is considered impolite to slurp your soup or tea in formal Western dining settings.", "Việc húp sùm sụp khi uống trà hoặc ăn súp bị coi là thiếu lịch sự trong các buổi ăn uống trang trọng ở phương Tây.", ["lap", "gulp"], [], ["slurp noisily", "audible slurp"]),
      v("astringent", "/əˈstrɪn.dʒənt/", "/əˈstrɪn.dʒənt/", "having a sharp, bitter, or drying taste, often associated with tannins in tea or wine", "chát", "adjective", "The young red wine had an astringent quality that lingered on the tongue.", "Loại rượu vang đỏ trẻ này có vị chát đọng lại trên đầu lưỡi.", ["sharp", "bitter"], ["mellow"], ["astringent taste", "astringent tannins"]),
    ],
    C2: [
      v("libation", "/laɪˈbeɪʃn/", "/laɪˈbeɪʃn/", "a drink, especially an alcoholic one, often poured as an offering to a deity or in celebration.", "đồ uống có cồn (thường dùng trong bối cảnh trang trọng hoặc nghi lễ)", "noun", "The guests raised their glasses to offer a final libation before the ceremony concluded.", "Các vị khách nâng ly để dâng một ly rượu cuối cùng trước khi buổi lễ kết thúc.", ["beverage", "potation"], [], ["pour a libation", "alcoholic libation"]),
      v("quaff", "/kwɒf/", "/kwɑːf/", "to drink something, especially an alcoholic drink, heartily or in large quantities.", "uống ừng ực, uống cạn một hơi", "verb", "After the long hike, they sat at the tavern to quaff mugs of cold ale.", "Sau chuyến đi bộ dài, họ ngồi tại quán rượu để uống cạn những vại bia lạnh.", ["gulp", "imbibe"], ["sip"], ["quaff a drink", "heartily quaff"]),
      v("tisane", "/tɪˈzæn/", "/tɪˈzɑːn/", "an herbal infusion made by steeping parts of plants in boiling water, excluding tea leaves.", "trà thảo mộc", "noun", "She prefers a calming chamomile tisane before bed to help her relax.", "Cô ấy thích một ly trà thảo mộc hoa cúc êm dịu trước khi đi ngủ để giúp thư giãn.", ["herbal tea", "infusion"], [], ["chamomile tisane", "brewed tisane"]),
      v("imbibe", "/ɪmˈbaɪb/", "/ɪmˈbaɪb/", "to drink alcohol, or formally, to absorb or take in moisture or knowledge.", "uống (thường là rượu), tiếp thu", "verb", "He does not imbibe, preferring to stick to sparkling mineral water at social gatherings.", "Anh ấy không uống rượu, thích dùng nước khoáng có ga hơn tại các buổi tụ tập xã hội.", ["consume", "drink"], ["abstain"], ["imbibe alcohol", "imbibe spirits"]),
      v("nectar", "/ˈnektə(r)/", "/ˈnektər/", "a delicious or sweet drink, often metaphorically used to describe a very enjoyable beverage.", "thức uống ngọt ngào, mật hoa", "noun", "The chilled peach juice was pure nectar on such a sweltering summer afternoon.", "Nước ép đào ướp lạnh ngon như mật ngọt vào một buổi chiều hè nóng nực như vậy.", ["ambrosia", "sweet drink"], [], ["sweet nectar", "divine nectar"]),
      v("potable", "/ˈpəʊtəbl/", "/ˈpoʊtəbl/", "safe or suitable for drinking.", "có thể uống được, an toàn để uống", "adjective", "The expedition team struggled to find a reliable source of potable water in the remote mountains.", "Đội thám hiểm đã rất chật vật để tìm một nguồn nước uống an toàn trên những ngọn núi hẻo lánh.", ["drinkable", "safe"], ["non-potable"], ["potable water", "potable liquid"]),
      v("dram", "/dræm/", "/dræm/", "a small drink of whiskey or other spirits.", "một ngụm nhỏ rượu mạnh", "noun", "The old man enjoyed a small dram of scotch by the fireplace every evening.", "Ông lão thích thưởng thức một ngụm nhỏ rượu scotch bên lò sưởi mỗi buổi tối.", ["nip", "shot"], [], ["a dram of whisky", "small dram"]),
      v("slake", "/sleɪk/", "/sleɪk/", "to satisfy a thirst by drinking.", "giải khát", "verb", "Nothing could slake his thirst after the marathon quite like a glass of ice-cold lemonade.", "Không gì có thể giải khát cho anh ấy sau cuộc chạy marathon bằng một ly nước chanh đá lạnh.", ["quench", "satisfy"], [], ["slake thirst", "fully slake"]),
    ],
  },
};


// Seed function
async function seedVocab() {
  console.log("🌱 Seeding Vocabulary Data - Food & Cooking...");

  // Get or create topic group
  const topicGroup = await prisma.topicGroup.upsert({
    where: { name_hubType: { name: "Food & Cooking", hubType: "vocab" } },
    update: {},
    create: {
      name: "Food & Cooking",
      order: 9,
      hubType: "vocab",
      subcategories: [
        "Ingredients",
        "Cooking Methods",
        "Restaurants",
        "Drinks & Beverages",
      ],
    },
  });

  // Helper to slugify
  const slugify = (text: string) => text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

  // Iterate over subcategories
  for (const [subcat, levelsData] of Object.entries(foodandcookingVocab)) {
    console.log(`Processing Subcategory: ${subcat}`);

    for (const [level, vocabItems] of Object.entries(levelsData)) {
      const currentLevel = level as Level;
      const items = vocabItems as ReturnType<typeof v>[];

      if (!items || items.length === 0) continue;

      const topicId = `food-and-cooking-${slugify(subcat)}-${currentLevel.toLowerCase()}`;

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
          category: "Food & Cooking",
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

  console.log("✅ Food & Cooking seeded successfully!");
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
