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
// TOPIC GROUP 8: TRAVEL
// ============================================

const travelVocab = {
  "Transportation": {
    A1: [
      v("taxi", "/ˈtæksi/", "/ˈtæksi/", "a car that you pay to take you to a specific place", "xe taxi", "noun", "Let's call a taxi to the airport.", "Hãy gọi một chiếc taxi đến sân bay.", ["cab"], [], ["call a taxi", "take a taxi"]),
      v("travel", "/ˈtrævl/", "/ˈtrævl/", "to go from one place to another", "du lịch, đi lại", "verb", "I like to travel by plane.", "Tôi thích đi du lịch bằng máy bay.", ["journey"], [], ["travel abroad", "travel by train"]),
      v("ride", "/raɪd/", "/raɪd/", "to sit on and control a vehicle like a bike or a horse", "đi (xe), cưỡi", "verb", "I can ride a bike very well.", "Tôi có thể đi xe đạp rất giỏi.", ["drive"], [], ["ride a bike", "ride a motorcycle"]),
    ],
    A2: [
      v("bicycle", "/ˈbaɪ.sɪ.kəl/", "/ˈbaɪ.sə.kəl/", "a vehicle with two wheels that you ride by pushing pedals with your feet", "xe đạp", "noun", "I ride my bicycle to school every morning.", "Tôi đạp xe đi học mỗi sáng.", ["bike"], [], ["ride a bicycle", "bicycle lane"]),
      v("traffic", "/ˈtræf.ɪk/", "/ˈtræf.ɪk/", "the number of vehicles moving along a road", "giao thông", "noun", "There is a lot of traffic on the road during rush hour.", "Có rất nhiều giao thông trên đường vào giờ cao điểm.", ["congestion"], [], ["traffic jam", "heavy traffic"]),
      v("arrive", "/əˈraɪv/", "/əˈraɪv/", "to reach a destination at the end of a journey", "đến nơi", "verb", "We will arrive at the airport at 5 PM.", "Chúng tôi sẽ đến sân bay lúc 5 giờ chiều.", ["reach", "get to"], ["depart"], ["arrive at", "arrive in"]),
      v("delay", "/dɪˈleɪ/", "/dɪˈleɪ/", "a situation in which something happens later than expected", "sự chậm trễ", "noun", "The flight had a short delay because of the bad weather.", "Chuyến bay đã bị chậm trễ một chút do thời tiết xấu.", ["hold-up"], [], ["flight delay", "cause a delay"]),
      v("fast", "/fɑːst/", "/fæst/", "moving or capable of moving at high speed", "nhanh", "adjective", "The bullet train is a very fast way to get to the city.", "Tàu cao tốc là một cách rất nhanh để đến thành phố.", ["quick", "rapid"], ["slow"], ["fast car", "travel fast"]),
    ],
    B1: [
      v("departure", "/dɪˈpɑːtʃə(r)/", "/dɪˈpɑːrtʃər/", "the action of leaving a place", "sự khởi hành", "noun", "Please check the departure time on your ticket.", "Vui lòng kiểm tra thời gian khởi hành trên vé của bạn.", ["exit", "leaving"], ["arrival"], ["departure time", "departure lounge"]),
      v("board", "/bɔːd/", "/bɔːrd/", "to get on or into a ship, aircraft, or other vehicle", "lên tàu, xe, máy bay", "verb", "Passengers are requested to board the plane through gate 5.", "Hành khách được yêu cầu lên máy bay qua cổng số 5.", ["embark", "enter"], ["disembark"], ["board a plane", "boarding pass"]),
      v("connection", "/kəˈnekʃn/", "/kəˈnekʃn/", "a train, bus, or plane that arrives at a time that allows you to change to it from another", "chuyến xe/tàu nối tiếp", "noun", "We missed our connection because the first flight was delayed.", "Chúng tôi đã lỡ chuyến bay nối tiếp vì chuyến bay đầu tiên bị hoãn.", ["transfer"], [], ["miss a connection", "flight connection"]),
      v("destination", "/ˌdestɪˈneɪʃn/", "/ˌdestɪˈneɪʃn/", "the place to which someone or something is going", "điểm đến", "noun", "We finally reached our destination after a long journey.", "Cuối cùng chúng tôi cũng đến nơi sau một hành trình dài.", ["arrival point", "goal"], [], ["reach your destination", "popular destination"]),
      v("direct", "/daɪˈrekt/", "/dəˈrekt/", "going straight to a place without stopping or changing vehicles", "trực tiếp (không dừng, không chuyển)", "adjective", "Is there a direct train from here to the city center?", "Có chuyến tàu trực tiếp từ đây đến trung tâm thành phố không?", ["non-stop", "straight"], ["indirect"], ["direct flight", "direct route"]),
    ],
    B2: [
      v("commuter", "/kəˈmjuː.tər/", "/kəˈmjuː.t̬ɚ/", "a person who travels some distance to work on a regular basis", "người đi làm xa (bằng phương tiện công cộng)", "noun", "The train was packed with commuters heading into the city center.", "Con tàu chật kín những người đi làm đang hướng vào trung tâm thành phố.", ["passenger", "traveler"], [], ["daily commuter", "commuter train"]),
      v("disembark", "/ˌdɪs.ɪmˈbɑːk/", "/ˌdɪs.ɪmˈbɑːrk/", "to leave a ship, aircraft, or other vehicle", "xuống tàu, máy bay hoặc xe", "verb", "Passengers were asked to disembark the aircraft via the rear exit.", "Hành khách được yêu cầu xuống máy bay qua lối cửa sau.", ["alight", "get off"], ["board"], ["disembark from", "safely disembark"]),
      v("expedite", "/ˈek.spə.daɪt/", "/ˈek.spə.daɪt/", "to make an action or process happen sooner or be accomplished more quickly", "xúc tiến, làm nhanh chóng", "verb", "We are trying to expedite the boarding process for international flights.", "Chúng tôi đang cố gắng xúc tiến quy trình lên máy bay cho các chuyến bay quốc tế.", ["accelerate", "hasten"], ["delay"], ["expedite the process", "expedite delivery"]),
      v("vessel", "/ˈves.əl/", "/ˈves.əl/", "a ship or large boat", "tàu, thuyền lớn", "noun", "The large cargo vessel docked at the port early this morning.", "Chiếc tàu chở hàng lớn đã cập bến vào sáng sớm nay.", ["ship", "craft"], [], ["cargo vessel", "passenger vessel"]),
      v("intercity", "/ˌɪn.təˈsɪt.i/", "/ˌɪn.t̬ɚˈsɪt̬.i/", "traveling or existing between cities", "liên tỉnh, giữa các thành phố", "adjective", "We took an intercity bus to travel from the capital to the coastal region.", "Chúng tôi đã bắt một chiếc xe buýt liên tỉnh để đi từ thủ đô đến vùng ven biển.", ["long-distance"], ["local"], ["intercity bus", "intercity train"]),
      v("connectivity", "/kəˌnekˈtɪv.ə.ti/", "/kəˌnekˈtɪv.ə.t̬i/", "the ability of a transport system to link different places effectively", "khả năng kết nối (giao thông)", "noun", "Better transport connectivity is essential for the economic development of rural areas.", "Khả năng kết nối giao thông tốt hơn là yếu tố thiết yếu cho sự phát triển kinh tế của các vùng nông thôn.", ["linkage", "network"], [], ["transport connectivity", "improve connectivity"]),
    ],
    C1: [
      v("thoroughfare", "/ˈθʌrəfeə(r)/", "/ˈθɜːroʊfer/", "a main road or public way in a town or city", "đường lớn, đại lộ", "noun", "The main thoroughfare was blocked due to the parade.", "Con đường lớn chính đã bị chặn do cuộc diễu hành.", ["main road", "artery"], [], ["busy thoroughfare", "major thoroughfare"]),
      v("pedestrianize", "/pəˈdestriənaɪz/", "/pəˈdestriənaɪz/", "to close a street to vehicles so that it can be used only by people walking", "quy hoạch thành phố đi bộ", "verb", "The city council plans to pedestrianize the historic district to reduce traffic.", "Hội đồng thành phố có kế hoạch quy hoạch khu phố cổ thành khu vực đi bộ để giảm ùn tắc.", ["de-motorize"], [], ["pedestrianize streets", "pedestrianize areas"]),
      v("congested", "/kənˈdʒestɪd/", "/kənˈdʒestɪd/", "so crowded with traffic that it is difficult to move", "tắc nghẽn", "adjective", "We were stuck in highly congested traffic for hours.", "Chúng tôi đã bị mắc kẹt trong làn xe cộ tắc nghẽn suốt nhiều giờ.", ["overcrowded", "clogged"], ["clear"], ["congested roads", "heavily congested"]),
      v("disrupt", "/dɪsˈrʌpt/", "/dɪsˈrʌpt/", "to interrupt an event, activity, or process by causing a disturbance or problem", "làm gián đoạn", "verb", "Severe weather conditions may disrupt train services across the region.", "Điều kiện thời tiết khắc nghiệt có thể gây gián đoạn dịch vụ tàu hỏa trên toàn khu vực.", ["disturb", "interrupt"], [], ["severely disrupt", "disrupt travel"]),
    ],
    C2: [
      v("circumnavigate", "/ˌsɜːkəmˈnævɪɡeɪt/", "/ˌsɜːrkəmˈnævɪɡeɪt/", "to sail or travel all the way around something, especially the world", "đi vòng quanh (bằng đường biển hoặc đường hàng không)", "verb", "The explorers attempted to circumnavigate the globe in a small sailboat.", "Các nhà thám hiểm đã cố gắng đi vòng quanh thế giới trên một chiếc thuyền buồm nhỏ.", ["encircle", "orbit"], [], ["circumnavigate the globe", "circumnavigate the earth"]),
      v("conveyance", "/kənˈveɪəns/", "/kənˈveɪəns/", "a means of transport; a vehicle", "phương tiện chuyên chở", "noun", "The carriage was the primary mode of conveyance for the wealthy in the 19th century.", "Xe ngựa là phương tiện chuyên chở chính cho giới nhà giàu vào thế kỷ 19.", ["vehicle", "transportation"], [], ["public conveyance", "means of conveyance"]),
      v("peregrination", "/ˌperɪɡrɪˈneɪʃn/", "/ˌperɪɡrɪˈneɪʃn/", "a long or meandering journey or period of wandering", "cuộc hành trình dài, chuyến du ngoạn", "noun", "After years of peregrination across the continent, he finally decided to settle down.", "Sau nhiều năm du ngoạn khắp lục địa, cuối cùng anh ấy đã quyết định ổn định cuộc sống.", ["voyage", "odyssey"], [], ["constant peregrination", "years of peregrination"]),
      v("tarmac", "/ˈtɑːmæk/", "/ˈtɑːrmæk/", "the surface of an airport runway", "đường băng (sân bay)", "noun", "The passengers were delayed on the tarmac for three hours due to technical issues.", "Hành khách đã bị hoãn trên đường băng trong ba giờ do các vấn đề kỹ thuật.", ["runway", "apron"], [], ["stuck on the tarmac", "tarmac delay"]),
      v("wayfarer", "/ˈweɪfeərə(r)/", "/ˈweɪferər/", "a person who travels on foot", "người lữ hành, người đi bộ", "noun", "The weary wayfarer sought shelter in a small inn as the storm began to gather.", "Người lữ hành mệt mỏi tìm nơi trú ẩn trong một quán trọ nhỏ khi cơn bão bắt đầu ập đến.", ["traveler", "wanderer"], [], ["weary wayfarer", "solitary wayfarer"]),
      v("traverse", "/trəˈvɜːs/", "/trəˈvɜːrs/", "to travel across or through", "đi ngang qua, băng qua", "verb", "It is dangerous to traverse the mountain pass during the winter months.", "Thật nguy hiểm khi băng qua đèo trong những tháng mùa đông.", ["cross", "cross over"], [], ["traverse the landscape", "traverse the distance"]),
      v("intermodal", "/ˌɪntəˈməʊdl/", "/ˌɪntərˈmoʊdl/", "involving two or more different modes of transport", "đa phương thức (vận tải)", "adjective", "The city is investing in an intermodal transit hub to connect trains, buses, and subways.", "Thành phố đang đầu tư vào một trung tâm trung chuyển đa phương thức để kết nối tàu hỏa, xe buýt và tàu điện ngầm.", ["multimodal"], [], ["intermodal transportation", "intermodal hub"]),
      v("thwart", "/θwɔːt/", "/θwɔːrt/", "to prevent someone from accomplishing something or to stop a journey/plan", "cản trở, làm thất bại (kế hoạch đi lại)", "verb", "Heavy snowfalls served to thwart all our attempts to reach the remote village.", "Những đợt tuyết rơi dày đã làm thất bại mọi nỗ lực của chúng tôi để đến được ngôi làng hẻo lánh đó.", ["hinder", "obstruct"], ["facilitate"], ["thwart plans", "thwart attempts"]),
    ],
  },
  "Accommodation": {
    A1: [
      v("hotel", "/həʊˈtel/", "/hoʊˈtel/", "a building where people pay to stay", "khách sạn", "noun", "We stay at a big hotel in the city.", "Chúng tôi ở tại một khách sạn lớn trong thành phố.", ["inn", "lodge"], [], ["stay at a hotel", "book a hotel"]),
      v("key", "/kiː/", "/kiː/", "a metal object used to open a lock", "chìa khóa", "noun", "Here is the key for your room.", "Đây là chìa khóa cho phòng của bạn.", ["opener"], [], ["room key", "get the key"]),
      v("stay", "/steɪ/", "/steɪ/", "to live in a place for a short time", "ở lại", "verb", "I want to stay here for three nights.", "Tôi muốn ở lại đây ba đêm.", ["reside", "lodge"], ["leave"], ["stay at", "stay for"]),
      v("check-in", "/ˈtʃek.ɪn/", "/ˈtʃek.ɪn/", "to arrive and register at a hotel", "làm thủ tục nhận phòng", "verb", "We can check-in at two o'clock.", "Chúng ta có thể làm thủ tục nhận phòng lúc hai giờ.", ["register", "arrive"], ["check-out"], ["check-in time", "ready to check-in"]),
      v("guest", "/ɡest/", "/ɡest/", "a person who is staying at a hotel", "khách", "noun", "The hotel has many guests today.", "Khách sạn có nhiều khách hôm nay.", ["visitor", "customer"], ["host"], ["hotel guest", "welcome a guest"]),
      v("reception", "/rɪˈsep.ʃən/", "/rɪˈsep.ʃən/", "the place in a hotel where you arrive", "quầy lễ tân", "noun", "Please go to the reception to get your key.", "Vui lòng đến quầy lễ tân để lấy chìa khóa của bạn.", ["front desk"], [], ["at the reception", "go to reception"]),
      v("quiet", "/ˈkwaɪ.ət/", "/ˈkwaɪ.ət/", "making very little noise", "yên tĩnh", "adjective", "This hotel is very quiet at night.", "Khách sạn này rất yên tĩnh vào ban đêm.", ["silent", "peaceful"], ["noisy"], ["quiet place", "very quiet"]),
      v("hostel", "/ˈhɒs.təl/", "/ˈhɑː.stəl/", "a cheap place for travelers to sleep", "nhà nghỉ bình dân", "noun", "We stay at a cheap hostel.", "Chúng tôi ở tại một nhà nghỉ bình dân.", ["dormitory"], [], ["youth hostel", "stay at a hostel"]),
    ],
    A2: [
      v("reservation", "/ˌrez.əˈveɪ.ʃən/", "/ˌrez.ɚˈveɪ.ʃən/", "an arrangement to have a room held for you", "sự đặt chỗ", "noun", "I made a reservation for a single room last week.", "Tôi đã đặt trước một phòng đơn vào tuần trước.", ["booking"], [], ["make a reservation", "confirm a reservation"]),
      v("vacant", "/ˈveɪ.kənt/", "/ˈveɪ.kənt/", "not occupied; available for use", "trống, chưa có người ở", "adjective", "Are there any vacant rooms for tonight?", "Có phòng nào trống cho đêm nay không?", ["empty", "available"], ["occupied"], ["vacant room", "remain vacant"]),
      v("keycard", "/ˈkiː.kɑːd/", "/ˈkiː.kɑːrd/", "a plastic card used to open a hotel door", "thẻ từ (mở cửa phòng)", "noun", "Don't forget to take your keycard when you leave the room.", "Đừng quên mang theo thẻ từ khi bạn rời khỏi phòng.", ["electronic key"], [], ["use a keycard", "lose a keycard"]),
      v("check-out", "/ˈtʃek aʊt/", "/ˈtʃek aʊt/", "the time or process of leaving a hotel", "làm thủ tục trả phòng", "verb", "We need to check-out before 11 AM.", "Chúng tôi cần làm thủ tục trả phòng trước 11 giờ sáng.", ["leave", "depart"], ["check-in"], ["check-out time", "late check-out"]),
      v("view", "/vjuː/", "/vjuː/", "what you can see from a particular place", "tầm nhìn, cảnh quan", "noun", "Our room has a beautiful view of the mountains.", "Phòng của chúng tôi có tầm nhìn tuyệt đẹp ra những ngọn núi.", ["sight", "scenery"], [], ["ocean view", "mountain view"]),
    ],
    B1: [
      v("overnight", "/ˌəʊ.vəˈnaɪt/", "/ˌoʊ.vɚˈnaɪt/", "for the duration of one night", "qua đêm", "adjective", "We booked an overnight stay near the airport.", "Chúng tôi đã đặt một chỗ nghỉ qua đêm gần sân bay.", ["nightly"], [], ["overnight stay", "overnight trip"]),
      v("suite", "/swiːt/", "/swiːt/", "a set of connected rooms in a hotel, usually more expensive than a standard room", "phòng hạng sang (gồm nhiều phòng nhỏ bên trong)", "noun", "They decided to upgrade to a luxury suite for their anniversary.", "Họ quyết định nâng cấp lên một phòng hạng sang cho lễ kỷ niệm của mình.", ["deluxe room"], [], ["luxury suite", "book a suite"]),
      v("guesthouse", "/ˈɡest.haʊs/", "/ˈɡest.haʊs/", "a private house where people can pay to stay and have meals", "nhà khách", "noun", "We preferred a small guesthouse to a large, noisy hotel.", "Chúng tôi thích một nhà khách nhỏ hơn là một khách sạn lớn ồn ào.", ["inn"], [], ["stay at a guesthouse", "local guesthouse"]),
      v("shared", "/ʃeəd/", "/ʃerd/", "used or occupied by more than one person", "dùng chung", "adjective", "The hostel offers shared facilities like a kitchen and lounge.", "Hostel cung cấp các tiện nghi dùng chung như nhà bếp và phòng chờ.", ["communal"], ["private"], ["shared bathroom", "shared room"]),
      v("rate", "/reɪt/", "/reɪt/", "the price charged for a room for a specific period", "giá phòng", "noun", "The nightly rate includes breakfast and free Wi-Fi.", "Giá phòng mỗi đêm đã bao gồm bữa sáng và Wi-Fi miễn phí.", ["tariff"], [], ["nightly rate", "discounted rate"]),
    ],
    B2: [
      v("inbound", "/ˈɪn.baʊnd/", "/ˈɪn.baʊnd/", "arriving at a place, especially when traveling back home or to a destination", "đến, cập bến", "adjective", "The hotel provides a shuttle service for all inbound guests arriving at the train station.", "Khách sạn cung cấp dịch vụ đưa đón cho tất cả các vị khách đến nhà ga.", ["arriving", "incoming"], ["outbound"], ["inbound flight", "inbound tourism"]),
      v("adjoining", "/əˈdʒɔɪ.nɪŋ/", "/əˈdʒɔɪ.nɪŋ/", "next to or joined with another room", "liền kề, thông nhau", "adjective", "We requested adjoining rooms so the family could stay together during the trip.", "Chúng tôi đã yêu cầu các phòng liền kề để cả gia đình có thể ở cùng nhau trong suốt chuyến đi.", ["adjacent", "neighboring"], [], ["adjoining room", "adjoining door"]),
      v("breathtaking", "/ˈbreθˌteɪ.kɪŋ/", "/ˈbreθˌteɪ.kɪŋ/", "extremely beautiful or impressive, often referring to a view from a room", "đẹp đến nín thở, ngoạn mục", "adjective", "Our villa offered a breathtaking view of the ocean.", "Biệt thự của chúng tôi có tầm nhìn ngoạn mục ra đại dương.", ["stunning", "spectacular"], [], ["breathtaking view", "breathtaking scenery"]),
      v("accommodate", "/əˈkɒm.ə.deɪt/", "/əˈkɑː.mə.deɪt/", "to provide enough space for someone or something", "đáp ứng, cung cấp chỗ ở", "verb", "The small guesthouse can accommodate up to twenty guests at a time.", "Nhà khách nhỏ này có thể chứa tối đa hai mươi khách một lúc.", ["house", "lodge"], [], ["accommodate guests", "accommodate needs"]),
      v("inclusive", "/ɪnˈkluː.sɪv/", "/ɪnˈkluː.sɪv/", "including everything, especially all costs in a price", "trọn gói, bao gồm tất cả", "adjective", "We opted for an all-inclusive package to avoid extra expenses during our stay.", "Chúng tôi đã chọn một gói trọn gói để tránh các chi phí phát sinh trong thời gian lưu trú.", ["all-encompassing", "comprehensive"], ["exclusive"], ["all-inclusive", "inclusive price"]),
      v("overbook", "/ˌəʊ.vəˈbʊk/", "/ˌoʊ.vɚˈbʊk/", "to sell more tickets or reservations than are actually available", "đặt chỗ quá tải", "verb", "The hotel tends to overbook during peak season, so confirm your reservation early.", "Khách sạn thường có xu hướng nhận đặt phòng quá tải vào mùa cao điểm, vì vậy hãy xác nhận đặt phòng của bạn sớm.", ["double-book"], [], ["overbook a flight", "overbook a hotel"]),
      v("concierge", "/ˈkɒn.si.eərʒ/", "/ˈkɑːn.si.erʒ/", "a staff member who assists guests with arrangements like tours or restaurant reservations", "nhân viên hỗ trợ khách hàng", "noun", "Ask the concierge if they can help you book tickets for the city tour.", "Hãy hỏi nhân viên hỗ trợ xem họ có thể giúp bạn đặt vé cho chuyến tham quan thành phố hay không.", ["attendant", "receptionist"], [], ["hotel concierge", "concierge desk"]),
      v("nightly", "/ˈnaɪt.li/", "/ˈnaɪt.li/", "happening or costing every night", "hàng đêm, mỗi đêm", "adjective", "The nightly rate includes breakfast and access to the pool.", "Giá mỗi đêm đã bao gồm bữa sáng và quyền sử dụng hồ bơi.", ["per night", "nocturnal"], [], ["nightly rate", "nightly fee"]),
    ],
    C1: [
      v("en-suite", "/ɒnˈswiːt/", "/ɑːnˈswiːt/", "a room with an attached private bathroom", "phòng có nhà vệ sinh khép kín", "adjective", "We decided to book an en-suite room to ensure complete privacy during our stay.", "Chúng tôi quyết định đặt một phòng khép kín để đảm bảo sự riêng tư tuyệt đối trong suốt kỳ nghỉ.", ["private bathroom", "adjoining"], ["shared"], ["en-suite bathroom", "en-suite facility"]),
      v("vacate", "/vəˈkeɪt/", "/ˈveɪkeɪt/", "to leave a place that you have been staying in", "trả phòng, rời đi", "verb", "Guests are kindly requested to vacate their rooms by 11:00 AM on the day of departure.", "Quý khách vui lòng trả phòng trước 11 giờ sáng vào ngày khởi hành.", ["depart", "evacuate"], ["occupy"], ["vacate the premises", "vacate the room"]),
      v("resplendent", "/rɪˈsplendənt/", "/rɪˈsplendənt/", "attractive and impressive in appearance", "rực rỡ, lộng lẫy", "adjective", "The hotel lobby was resplendent with gold leaf and marble columns.", "Sảnh khách sạn rực rỡ với những lá vàng và cột đá cẩm thạch.", ["magnificent", "dazzling"], ["dull"], ["resplendent decor", "resplendent interior"]),
      v("sublet", "/ˌsʌbˈlet/", "/ˈsʌblet/", "to rent out a room or property that you are already renting", "cho thuê lại", "verb", "The contract strictly forbids the tenant to sublet the apartment to travelers.", "Hợp đồng nghiêm cấm người thuê cho khách du lịch thuê lại căn hộ.", ["sublease"], [], ["illegally sublet", "sublet the property"]),
      v("opulent", "/ˈɒpjələnt/", "/ˈɑːpjələnt/", "extremely rich, luxurious, and expensive", "xa hoa, sang trọng", "adjective", "They spent their honeymoon in an opulent suite overlooking the Mediterranean Sea.", "Họ đã dành kỳ trăng mật trong một phòng suite xa hoa nhìn ra biển Địa Trung Hải.", ["luxurious", "lavish"], ["modest"], ["opulent surroundings", "opulent lifestyle"]),
      v("lodging", "/ˈlɒdʒɪŋ/", "/ˈlɑːdʒɪŋ/", "a temporary place to stay", "nơi ăn chốn ở, chỗ trọ", "noun", "We secured affordable lodging near the train station for the duration of our trip.", "Chúng tôi đã tìm được chỗ ở giá cả phải chăng gần ga tàu trong suốt chuyến đi.", ["accommodation", "quarters"], [], ["provide lodging", "temporary lodging"]),
      v("deposit", "/dɪˈpɒzɪt/", "/dɪˈpɑːzɪt/", "a sum of money paid as a first installment or security", "tiền đặt cọc", "noun", "You are required to pay a security deposit upon checking into the villa.", "Bạn được yêu cầu đóng một khoản tiền đặt cọc bảo đảm khi nhận phòng tại căn biệt thự.", ["down payment", "security"], [], ["security deposit", "refundable deposit"]),
      v("overhaul", "/ˈəʊvəhɔːl/", "/ˈoʊvərhɔːl/", "to repair or improve a system or structure extensively", "đại tu, cải tổ", "verb", "The hotel chain plans to overhaul its booking system to handle peak season traffic.", "Chuỗi khách sạn có kế hoạch đại tu hệ thống đặt phòng để xử lý lưu lượng khách mùa cao điểm.", ["renovate", "revamp"], ["neglect"], ["complete overhaul", "overhaul the system"]),
    ],
    C2: [
      v("pied-à-terre", "/ˌpjeɪ.əˈteər/", "/ˌpjeɪ.əˈter/", "a small apartment or house kept for occasional use", "căn hộ nhỏ dùng để ở tạm", "noun", "The diplomat maintains a modest pied-à-terre in the capital for his frequent business trips.", "Nhà ngoại giao duy trì một căn hộ nhỏ ở thủ đô cho những chuyến công tác thường xuyên của ông.", ["bolt-hole", "secondary residence"], [], ["maintain a pied-à-terre", "city pied-à-terre"]),
      v("bivouac", "/ˈbɪv.u.æk/", "/ˈbɪv.wæk/", "a temporary camp without tents or cover, used especially by soldiers or mountaineers", "trại dã chiến tạm thời", "noun", "After the storm destroyed their tent, the climbers were forced to establish a makeshift bivouac on the ledge.", "Sau khi cơn bão phá hủy lều, những người leo núi buộc phải dựng một chỗ trú tạm trên vách đá.", ["encampment", "bivvy"], [], ["establish a bivouac", "makeshift bivouac"]),
      v("château", "/ˈʃæt.əʊ/", "/ʃæˈtoʊ/", "a large French country house or castle, often giving its name to wine made in its neighborhood", "lâu đài hoặc biệt thự kiểu Pháp", "noun", "We were invited to stay at an ancestral château in the Loire Valley during the harvest season.", "Chúng tôi được mời ở lại một lâu đài cổ kính ở Thung lũng Loire trong mùa thu hoạch.", ["manor", "palace"], [], ["ancestral château", "stay at a château"]),
      v("cohabit", "/kəʊˈhæb.ɪt/", "/koʊˈhæb.ɪt/", "to live or exist together in the same space", "sống chung, cùng ở", "verb", "The travel group had to cohabit in a single cabin due to the unexpected surge in tourism demand.", "Nhóm du lịch phải ở chung trong một căn nhà gỗ do nhu cầu du lịch tăng đột biến ngoài dự kiến.", ["coexist", "live together"], [], ["cohabit in", "forced to cohabit"]),
      v("hostelry", "/ˈhɒs.təl.ri/", "/ˈhɑː.stəl.ri/", "an inn or hotel, especially an old-fashioned one", "quán trọ, khách sạn cổ", "noun", "The weary travelers sought refuge in a quaint hostelry at the edge of the village.", "Những du khách mệt mỏi đã tìm nơi trú ẩn tại một quán trọ cổ kính ở rìa ngôi làng.", ["inn", "tavern"], [], ["quaint hostelry", "old-fashioned hostelry"]),
      v("lodgings", "/ˈlɒdʒ.ɪŋz/", "/ˈlɑː.dʒɪŋz/", "temporary accommodation, typically in someone else's house", "chỗ ở tạm thời", "noun", "During the festival, students often find lodgings with local families to save on travel expenses.", "Trong suốt lễ hội, sinh viên thường tìm chỗ ở tạm tại các gia đình địa phương để tiết kiệm chi phí đi lại.", ["quarters", "digs"], [], ["find lodgings", "temporary lodgings"]),
      v("secluded", "/sɪˈkluː.dɪd/", "/sɪˈkluː.dɪd/", "hidden from view; private and quiet", "hẻo lánh, tách biệt", "adjective", "They chose a secluded villa on the cliffside to ensure absolute privacy during their vacation.", "Họ chọn một căn biệt thự tách biệt trên vách đá để đảm bảo sự riêng tư tuyệt đối trong kỳ nghỉ của mình.", ["isolated", "sequestrated"], ["public"], ["secluded villa", "remain secluded"]),
      v("surroundings", "/səˈraʊn.dɪŋz/", "/səˈraʊn.dɪŋz/", "the things and conditions around a person or place", "môi trường xung quanh", "noun", "The resort is designed to blend harmoniously with its natural mountainous surroundings.", "Khu nghỉ dưỡng được thiết kế để hòa hợp hoàn hảo với môi trường núi non xung quanh.", ["environment", "setting"], [], ["natural surroundings", "pleasant surroundings"]),
    ],
  },
  "Sightseeing": {
    A1: [
      v("tour", "/tʊə/", "/tʊr/", "a journey for pleasure in which several different places are visited.", "chuyến tham quan", "noun", "We went on a city tour yesterday.", "Chúng tôi đã đi một chuyến tham quan thành phố vào ngày hôm qua.", ["trip", "excursion"], [], ["take a tour", "guided tour"]),
      v("map", "/mæp/", "/mæp/", "a drawing of a particular area showing its main features.", "bản đồ", "noun", "Please look at the map to find the museum.", "Vui lòng nhìn vào bản đồ để tìm bảo tàng.", ["chart", "plan"], [], ["follow a map", "city map"]),
      v("visit", "/ˈvɪz.ɪt/", "/ˈvɪz.ɪt/", "to go to see a place or a person for a period of time.", "thăm, tham quan", "verb", "I want to visit the old castle.", "Tôi muốn tham quan lâu đài cổ.", ["see", "explore"], [], ["visit a place", "visit a museum"]),
      v("guide", "/ɡaɪd/", "/ɡaɪd/", "a person who shows tourists around a place.", "hướng dẫn viên", "noun", "The guide told us about the history of the park.", "Hướng dẫn viên đã kể cho chúng tôi nghe về lịch sử của công viên.", ["leader", "escort"], [], ["tour guide", "local guide"]),
      v("photo", "/ˈfəʊ.təʊ/", "/ˈfoʊ.t̬oʊ/", "a picture made by a camera.", "ảnh", "noun", "I took a photo of the beautiful statue.", "Tôi đã chụp một bức ảnh bức tượng tuyệt đẹp.", ["picture", "image"], [], ["take a photo", "nice photo"]),
      v("beautiful", "/ˈbjuː.tɪ.fəl/", "/ˈbjuː.t̬ə.fəl/", "very pleasant to look at.", "đẹp", "adjective", "The view from the tower is beautiful.", "Khung cảnh từ trên tháp rất đẹp.", ["lovely", "pretty"], ["ugly"], ["beautiful view", "beautiful place"]),
      v("famous", "/ˈfeɪ.məs/", "/ˈfeɪ.məs/", "known by many people.", "nổi tiếng", "adjective", "This is a famous park in the city.", "Đây là một công viên nổi tiếng trong thành phố.", ["popular", "well-known"], ["unknown"], ["famous place", "very famous"]),
      v("look", "/lʊk/", "/lʊk/", "to direct your eyes to see something.", "nhìn", "verb", "Look at that big monument!", "Hãy nhìn đài tưởng niệm lớn đó kìa!", ["see", "watch"], [], ["look at", "look around"]),
    ],
    A2: [
      v("tourist", "/ˈtʊərɪst/", "/ˈtʊrɪst/", "a person who is visiting a place for pleasure", "khách du lịch", "noun", "There are many tourists in the city center today.", "Hôm nay có rất nhiều khách du lịch ở trung tâm thành phố.", ["visitor", "traveler"], ["local"], ["tourist attraction", "tourist destination"]),
      v("museum", "/mjuˈziːəm/", "/mjuˈziːəm/", "a building where objects of historical or scientific interest are kept", "bảo tàng", "noun", "We visited the local museum to learn about history.", "Chúng tôi đã đến thăm bảo tàng địa phương để tìm hiểu về lịch sử.", ["gallery", "exhibition center"], [], ["visit a museum", "museum exhibit"]),
      v("sightseeing", "/ˈsaɪtsiːɪŋ/", "/ˈsaɪtsiːɪŋ/", "the activity of visiting interesting places", "đi tham quan", "noun", "We went sightseeing around the old town.", "Chúng tôi đã đi tham quan quanh khu phố cổ.", ["touring", "sight-seeing"], [], ["go sightseeing", "enjoy sightseeing"]),
      v("statue", "/ˈstætʃuː/", "/ˈstætʃuː/", "a figure of a person or animal made of stone or metal", "tượng", "noun", "The big statue in the square is very beautiful.", "Bức tượng lớn ở quảng trường rất đẹp.", ["sculpture", "figure"], [], ["stone statue", "bronze statue"]),
      v("castle", "/ˈkɑːsl/", "/ˈkæsl/", "a large, strong building built in the past to protect people", "lâu đài", "noun", "The old castle on the hill is a popular spot.", "Lâu đài cổ trên đồi là một địa điểm nổi tiếng.", ["fortress", "palace"], [], ["visit a castle", "ancient castle"]),
      v("explore", "/ɪkˈsplɔː(r)/", "/ɪkˈsplɔːr/", "to travel around a new place to learn about it", "khám phá", "verb", "We want to explore the city on foot.", "Chúng tôi muốn khám phá thành phố bằng cách đi bộ.", ["discover", "investigate"], [], ["explore the city", "explore the area"]),
      v("scenery", "/ˈsiːnəri/", "/ˈsiːnəri/", "the natural features of a place, such as mountains or forests", "phong cảnh", "noun", "The scenery in the mountains is breathtaking.", "Phong cảnh trên núi thật ngoạn mục.", ["view", "landscape"], [], ["beautiful scenery", "enjoy the scenery"]),
      v("souvenir", "/ˌsuːvəˈnɪə(r)/", "/ˌsuːvəˈnɪr/", "something you buy to remember a place you visited", "quà lưu niệm", "noun", "I bought a small souvenir for my mother.", "Tôi đã mua một món quà lưu niệm nhỏ cho mẹ tôi.", ["keepsake", "memento"], [], ["buy a souvenir", "souvenir shop"]),
    ],
    B1: [
      v("landmark", "/ˈlænd.mɑːk/", "/ˈlænd.mɑːrk/", "an object or feature of a landscape or town that is easily seen and recognized from a distance", "địa danh, cột mốc", "noun", "The Eiffel Tower is the most famous landmark in Paris.", "Tháp Eiffel là địa danh nổi tiếng nhất ở Paris.", ["monument", "sight"], [], ["famous landmark", "historic landmark"]),
      v("excursion", "/ɪkˈskɜː.ʃən/", "/ɪkˈskɜːr.ʒən/", "a short journey or trip, especially one engaged in as a leisure activity", "chuyến tham quan, cuộc đi chơi", "noun", "We went on a boat excursion to see the nearby islands.", "Chúng tôi đã đi một chuyến tham quan bằng thuyền để ngắm các hòn đảo gần đó.", ["trip", "outing"], [], ["go on an excursion", "day excursion"]),
      v("panoramic", "/ˌpæn.əˈræm.ɪk/", "/ˌpæn.əˈræm.ɪk/", "with a view of a wide area of land", "toàn cảnh", "adjective", "The hilltop offers a panoramic view of the entire city.", "Đỉnh đồi mang đến tầm nhìn toàn cảnh của cả thành phố.", ["wide", "sweeping"], [], ["panoramic view", "panoramic window"]),
      v("guided", "/ˈɡaɪ.dɪd/", "/ˈɡaɪ.dɪd/", "led by someone who shows the way or provides information", "có hướng dẫn", "adjective", "We took a guided tour of the castle to learn its history.", "Chúng tôi đã tham gia một chuyến tham quan có hướng dẫn ở lâu đài để tìm hiểu lịch sử của nó.", ["escorted", "led"], ["independent"], ["guided tour", "guided walk"]),
      v("scenic", "/ˈsiː.nɪk/", "/ˈsiː.nɪk/", "providing views of beautiful natural features", "có cảnh đẹp", "adjective", "We chose the scenic route through the mountains instead of the highway.", "Chúng tôi đã chọn con đường có cảnh đẹp đi qua các ngọn núi thay vì đường cao tốc.", ["picturesque", "beautiful"], [], ["scenic view", "scenic route"]),
      v("captivate", "/ˈkæp.tɪ.veɪt/", "/ˈkæp.tɪ.veɪt/", "to hold the interest of; to charm", "thu hút, làm say đắm", "verb", "The beauty of the sunset captivated all the tourists.", "Vẻ đẹp của hoàng hôn đã làm say đắm tất cả du khách.", ["fascinate", "enchant"], ["bore"], ["captivated by", "highly captivated"]),
      v("wander", "/ˈwɒn.dər/", "/ˈwɑːn.dɚ/", "to walk slowly around an area without a specific purpose or direction", "đi lang thang, dạo quanh", "verb", "It is lovely to wander through the narrow streets of the old town.", "Thật tuyệt khi dạo quanh những con phố nhỏ của khu phố cổ.", ["stroll", "roam"], [], ["wander around", "wander through"]),
    ],
    B2: [
      v("picturesque", "/ˌpɪktʃəˈresk/", "/ˌpɪktʃəˈresk/", "visually attractive, especially in a quaint or charming way", "đẹp như tranh", "adjective", "The village is incredibly picturesque, with its narrow streets and stone houses.", "Ngôi làng đẹp như tranh vẽ với những con phố hẹp và những ngôi nhà bằng đá.", ["scenic", "charming"], ["ugly"], ["picturesque village", "picturesque landscape"]),
      v("stunning", "/ˈstʌnɪŋ/", "/ˈstʌnɪŋ/", "extremely impressive or attractive", "gây ấn tượng mạnh, tuyệt đẹp", "adjective", "The cathedral's architecture is absolutely stunning.", "Kiến trúc của nhà thờ này thực sự tuyệt đẹp.", ["breathtaking", "spectacular"], ["ordinary"], ["stunning view", "stunning scenery"]),
      v("off the beaten track", "/ɒf ðə ˈbiːtn træk/", "/ɔːf ðə ˈbiːtn træk/", "in a place that is not frequently visited by tourists", "nơi hẻo lánh, ít người biết đến", "phrase", "We prefer to find places that are a bit off the beaten track.", "Chúng tôi thích tìm những địa điểm ít người lui tới hơn.", ["remote", "secluded"], ["touristy"], ["get off the beaten track", "live off the beaten track"]),
    ],
    C1: [
      v("hinterland", "/ˈhɪntəlænd/", "/ˈhɪntərlænd/", "an area lying beyond what is visible or known", "vùng nội địa", "noun", "We decided to venture into the hinterland to explore the untouched natural beauty.", "Chúng tôi quyết định mạo hiểm vào vùng nội địa để khám phá vẻ đẹp tự nhiên hoang sơ.", ["backcountry", "interior"], [], ["rural hinterland", "remote hinterland"]),
      v("sojourn", "/ˈsɒdʒən/", "/ˈsoʊdʒɜːrn/", "a temporary stay", "chuyến lưu trú ngắn", "noun", "During our brief sojourn in Rome, we managed to visit the Colosseum twice.", "Trong suốt chuyến lưu trú ngắn của chúng tôi tại Rome, chúng tôi đã kịp ghé thăm Đấu trường La Mã hai lần.", ["stay", "visit"], [], ["brief sojourn", "pleasant sojourn"]),
      v("promenade", "/ˌprɒməˈnɑːd/", "/ˌprɑːməˈnɑːd/", "a paved public walk, typically one along a waterfront at a resort", "đường đi dạo", "noun", "Tourists love strolling along the seaside promenade at sunset.", "Khách du lịch thích tản bộ dọc theo con đường đi dạo bên bờ biển vào lúc hoàng hôn.", ["esplanade", "boardwalk"], [], ["seaside promenade", "take a promenade"]),
      v("unspoilt", "/ʌnˈspɔɪlt/", "/ʌnˈspɔɪlt/", "not damaged or diminished in quality; preserved in its natural state", "còn nguyên sơ", "adjective", "The island remains largely unspoilt by mass tourism.", "Hòn đảo này phần lớn vẫn giữ được vẻ nguyên sơ, chưa bị du lịch đại trà làm hỏng.", ["pristine", "untouched"], ["commercialized"], ["unspoilt countryside", "unspoilt beach"]),
      v("meander", "/miˈændə/", "/miˈændər/", "to walk in a slow or relaxed way, often without a specific destination", "đi dạo thong dong", "verb", "We spent the afternoon meandering through the narrow alleys of the old quarter.", "Chúng tôi dành cả buổi chiều để thong dong đi dạo qua những con hẻm nhỏ trong khu phố cổ.", ["wander", "stroll"], ["rush"], ["meander through", "meander along"]),
    ],
    C2: [
      v("effulgent", "/ɪˈfʌl.dʒənt/", "/ɪˈfʌl.dʒənt/", "radiantly shining; brilliant", "rực rỡ, chói lọi", "adjective", "The effulgent sunset reflecting off the ancient cathedral left the tourists breathless.", "Ánh hoàng hôn rực rỡ phản chiếu trên nhà thờ cổ kính khiến khách du lịch không khỏi ngỡ ngàng.", ["radiant", "resplendent"], ["dull"], ["effulgent beauty", "effulgent glow"]),
      v("vantage", "/ˈvɑːn.tɪdʒ/", "/ˈvæn.t̬ɪdʒ/", "a place or position affording a good view of something", "vị trí thuận lợi để quan sát", "noun", "From our high vantage on the cliffside, we could see the entire sprawl of the historic city.", "Từ vị trí thuận lợi trên vách đá, chúng tôi có thể nhìn thấy toàn cảnh thành phố lịch sử.", ["vantage point", "outlook"], [], ["vantage point", "strategic vantage"]),
      v("pulchritudinous", "/ˌpʌl.krɪˈtjuː.dɪ.nəs/", "/ˌpʌl.krəˈtuː.dən.əs/", "having great physical beauty", "đẹp đẽ, mỹ lệ", "adjective", "The garden's pulchritudinous layout is a testament to the landscape architect's vision.", "Bố cục mỹ lệ của khu vườn là minh chứng cho tầm nhìn của kiến trúc sư cảnh quan.", ["stunning", "exquisite"], ["hideous"], ["pulchritudinous architecture", "pulchritudinous vista"]),
      v("perambulate", "/pəˈræm.bjə.leɪt/", "/pəˈræm.bjə.leɪt/", "to walk through, around, or over a place, especially for pleasure", "đi dạo, đi bộ tham quan", "verb", "We chose to perambulate through the cobblestone streets of the old quarter to better appreciate the local architecture.", "Chúng tôi chọn cách đi dạo qua những con phố lát đá của khu phố cổ để cảm nhận rõ hơn về kiến trúc địa phương.", ["stroll", "wander"], [], ["perambulate through", "leisurely perambulate"]),
      v("gawk", "/ɡɔːk/", "/ɡɑːk/", "to stare openly and stupidly, often in awe", "nhìn chằm chằm (do ngạc nhiên/ngưỡng mộ)", "verb", "It is hard not to gawk at the sheer scale of the monuments when you first arrive at the square.", "Thật khó để không nhìn chằm chằm vào quy mô đồ sộ của các di tích khi bạn lần đầu đặt chân đến quảng trường.", ["gape", "stare"], [], ["gawk at", "gawk in wonder"]),
      v("vestige", "/ˈves.tɪdʒ/", "/ˈves.tɪdʒ/", "a trace of something that is disappearing or no longer exists", "dấu vết, tàn tích", "noun", "The ruins remain as a poignant vestige of the city's once-glorious past.", "Những tàn tích còn sót lại như một dấu vết đầy xúc động về quá khứ huy hoàng một thời của thành phố.", ["remnant", "trace"], [], ["vestige of", "historical vestige"]),
      v("sublime", "/səˈblaɪm/", "/səˈblaɪm/", "of such excellence, grandeur, or beauty as to inspire great admiration or awe", "hùng vĩ, tuyệt vời", "adjective", "The sublime beauty of the mountain range at dawn is an experience every traveler should seek.", "Vẻ đẹp hùng vĩ của dãy núi vào lúc bình minh là trải nghiệm mà mọi du khách đều nên tìm kiếm.", ["magnificent", "awe-inspiring"], ["mediocre"], ["sublime beauty", "sublime experience"]),
    ],
  },
  "At the Airport": {
    A1: [
      v("flight", "/flaɪt/", "/flaɪt/", "a journey made by air in an aircraft", "chuyến bay", "noun", "My flight is at ten o'clock.", "Chuyến bay của tôi là vào lúc mười giờ.", ["air travel"], [], ["catch a flight", "flight number"]),
      v("passport", "/ˈpɑːspɔːt/", "/ˈpæspɔːrt/", "an official document for travel to foreign countries", "hộ chiếu", "noun", "Do you have your passport?", "Bạn có mang theo hộ chiếu không?", ["travel document"], [], ["show a passport", "valid passport"]),
      v("luggage", "/ˈlʌɡɪdʒ/", "/ˈlʌɡɪdʒ/", "bags and suitcases that you take on a trip", "hành lý", "noun", "I have two pieces of luggage.", "Tôi có hai kiện hành lý.", ["baggage", "suitcases"], [], ["check in luggage", "heavy luggage"]),
      v("gate", "/ɡeɪt/", "/ɡeɪt/", "the place where you go to get on the plane", "cổng lên máy bay", "noun", "Our flight leaves from gate five.", "Chuyến bay của chúng ta khởi hành từ cổng số năm.", ["boarding gate"], [], ["at the gate", "go to the gate"]),
      v("wait", "/weɪt/", "/weɪt/", "to stay in a place until something happens", "chờ đợi", "verb", "Please wait in the lounge.", "Làm ơn chờ ở phòng chờ.", ["stay"], [], ["wait for", "wait in line"]),
    ],
    A2: [
      v("boarding", "/ˈbɔː.dɪŋ/", "/ˈbɔːr.dɪŋ/", "the act of getting onto a plane", "việc lên máy bay", "noun", "The boarding for flight VN123 will start in ten minutes.", "Việc lên máy bay cho chuyến bay VN123 sẽ bắt đầu trong mười phút nữa.", ["embarkation"], [], ["boarding pass", "boarding time"]),
      v("delayed", "/dɪˈleɪd/", "/dɪˈleɪd/", "happening later than expected", "bị trì hoãn", "adjective", "The flight to London is delayed due to bad weather.", "Chuyến bay đến London bị trì hoãn do thời tiết xấu.", ["late", "behind schedule"], ["on-time"], ["delayed flight", "severely delayed"]),
      v("land", "/lænd/", "/lænd/", "to arrive on the ground in a plane", "hạ cánh", "verb", "The plane will land at the airport in thirty minutes.", "Máy bay sẽ hạ cánh xuống sân bay trong ba mươi phút nữa.", ["touch down"], ["take off"], ["land safely", "ready to land"]),
    ],
    B1: [
      v("boarding pass", "/ˈbɔː.dɪŋ ˌpɑːs/", "/ˈbɔːr.dɪŋ ˌpæs/", "a document provided by an airline during check-in, giving a passenger permission to board the airplane.", "thẻ lên máy bay", "noun", "Please have your boarding pass and passport ready for the security check.", "Vui lòng chuẩn bị sẵn thẻ lên máy bay và hộ chiếu cho việc kiểm tra an ninh.", ["boarding card"], [], ["show your boarding pass", "scan your boarding pass"]),
      v("check in", "/tʃek ɪn/", "/tʃek ɪn/", "to report your arrival at an airport to get your boarding pass.", "làm thủ tục lên máy bay", "verb", "You need to check in at least two hours before your flight.", "Bạn cần làm thủ tục lên máy bay ít nhất hai tiếng trước giờ bay.", ["register"], ["check out"], ["check in online", "check in at the counter"]),
      v("security", "/sɪˈkjʊə.rə.ti/", "/səˈkjʊr.ə.t̬i/", "the process of checking passengers and their bags for dangerous items.", "an ninh", "noun", "Remove your laptop from your bag before going through security.", "Hãy lấy máy tính xách tay ra khỏi túi trước khi đi qua khu vực an ninh.", ["security check"], [], ["go through security", "security screening"]),
      v("customs", "/ˈkʌs.təmz/", "/ˈkʌs.təmz/", "the place where your bags are checked for illegal goods when entering a country.", "hải quan", "noun", "You may be asked to open your suitcase by customs officers.", "Bạn có thể được yêu cầu mở vali bởi các nhân viên hải quan.", ["border control"], [], ["clear customs", "pass through customs"]),
    ],
    B2: [
      v("layover", "/ˈleɪəʊvə/", "/ˈleɪoʊvər/", "a period of waiting between two flights during a journey", "thời gian quá cảnh", "noun", "We had a six-hour layover in Dubai before catching our connecting flight.", "Chúng tôi đã có một khoảng thời gian quá cảnh sáu giờ ở Dubai trước khi bắt chuyến bay nối chuyến.", ["stopover"], [], ["long layover", "short layover"]),
      v("excess", "/ɪkˈses/", "/ˈekses/", "more than is allowed or necessary", "vượt mức/quá quy định", "adjective", "You will have to pay a fee for your excess baggage at the check-in counter.", "Bạn sẽ phải trả phí cho hành lý quá cước tại quầy làm thủ tục.", ["surplus", "extra"], ["insufficient"], ["excess baggage", "excess weight"]),
      v("concourse", "/ˈkɒŋkɔːs/", "/ˈkɑːnkɔːrs/", "a large open area inside or in front of a public building like an airport", "sảnh chính/khu vực chờ", "noun", "The main concourse was crowded with travelers waiting for their flights.", "Sảnh chính đông đúc những hành khách đang chờ đợi chuyến bay của họ.", ["terminal", "hall"], [], ["airport concourse", "main concourse"]),
      v("clear", "/klɪə/", "/klɪr/", "to pass through or get official permission to move through a checkpoint", "thông qua (cửa kiểm soát)", "verb", "It took us nearly an hour to clear customs after landing.", "Chúng tôi mất gần một giờ để thông quan sau khi hạ cánh.", ["pass through", "get through"], [], ["clear customs", "clear security"]),
      v("prohibited", "/prəˈhɪbɪtɪd/", "/proʊˈhɪbɪtɪd/", "formally forbidden by law or rule", "bị cấm", "adjective", "Please ensure there are no prohibited items in your carry-on luggage.", "Vui lòng đảm bảo không có vật phẩm bị cấm trong hành lý xách tay của bạn.", ["banned", "forbidden"], ["permitted"], ["prohibited items", "prohibited substances"]),
      v("validate", "/ˈvælɪdeɪt/", "/ˈvælɪdeɪt/", "to make something officially acceptable or approved", "xác nhận/hợp thức hóa", "verb", "You need to validate your parking ticket before leaving the airport garage.", "Bạn cần xác nhận vé đỗ xe trước khi rời khỏi bãi đỗ xe sân bay.", ["verify", "confirm"], ["invalidate"], ["validate ticket", "validate documents"]),
    ],
    C2: [
      v("interline", "/ˌɪntəˈlaɪn/", "/ˌɪntərˈlaɪn/", "To transfer baggage or passengers between different airlines under a single booking.", "Liên danh (vận chuyển)", "verb", "The travel agent ensured the flights would interline, allowing the luggage to be checked through to the final destination.", "Đại lý du lịch đã đảm bảo các chuyến bay được liên danh, cho phép hành lý được ký gửi thẳng đến điểm đến cuối cùng.", ["transfer", "connect"], [], ["interline agreement", "interline baggage"]),
      v("non-rev", "/ˌnɒnˈrev/", "/ˌnɑːnˈrev/", "A passenger, usually an airline employee, traveling on a standby basis at a reduced fare.", "Khách đi vé giảm giá (thường là nhân viên hãng hàng không)", "noun", "As a non-rev, I had to wait until the very last minute to see if there was an empty seat available.", "Là một nhân viên đi vé giảm giá, tôi phải đợi đến phút cuối cùng mới biết liệu có ghế trống hay không.", ["standby passenger", "staff traveler"], ["revenue passenger"], ["non-rev travel", "non-rev ticket"]),
      v("marshalling", "/ˈmɑːʃəlɪŋ/", "/ˈmɑːrʃəlɪŋ/", "The process of directing aircraft on the ground using hand signals or light wands.", "Công tác điều phối máy bay dưới mặt đất", "noun", "The ground crew is responsible for the safe marshalling of the aircraft into the parking bay.", "Đội ngũ mặt đất chịu trách nhiệm điều phối máy bay vào bãi đỗ một cách an toàn.", ["guidance", "directing"], [], ["aircraft marshalling", "marshalling signals"]),
      v("airside", "/ˈeəsaɪd/", "/ˈersaɪd/", "The area of an airport beyond the security checkpoints, accessible only to passengers and staff.", "Khu vực hạn chế (bên trong sân bay)", "noun", "Once you pass through security, you are officially in the airside zone of the terminal.", "Một khi bạn đã qua kiểm tra an ninh, bạn chính thức ở trong khu vực hạn chế của nhà ga.", ["restricted area", "departure lounge"], ["landside"], ["airside access", "airside transfer"]),
      v("cabotage", "/ˈkæbətɪdʒ/", "/ˈkæbətɪdʒ/", "The right of an airline from one country to operate flights between two points within another country.", "Quyền vận chuyển nội địa (của hãng hàng không nước ngoài)", "noun", "The new trade agreement grants limited cabotage rights to foreign carriers on specific domestic routes.", "Hiệp định thương mại mới cấp quyền vận chuyển nội địa hạn chế cho các hãng hàng không nước ngoài trên một số tuyến bay nội địa nhất định.", ["domestic traffic rights"], [], ["cabotage rights", "cabotage restrictions"]),
      v("pushback", "/ˈpʊʃbæk/", "/ˈpʊʃbæk/", "The procedure where an aircraft is pushed backwards away from the airport gate by an external vehicle.", "Việc đẩy máy bay ra khỏi cửa khởi hành", "noun", "We are currently waiting for the tug to arrive so we can initiate pushback.", "Chúng tôi hiện đang đợi xe kéo đến để có thể bắt đầu quá trình đẩy máy bay ra khỏi cửa.", ["towing", "reversing"], [], ["pushback procedure", "ready for pushback"]),
      v("deplane", "/ˌdiːˈpleɪn/", "/ˌdiːˈpleɪn/", "To disembark from an aircraft.", "Rời khỏi máy bay", "verb", "Passengers are requested to remain seated until the aircraft has come to a complete stop and it is safe to deplane.", "Hành khách được yêu cầu ngồi tại chỗ cho đến khi máy bay dừng hẳn và việc rời khỏi máy bay là an toàn.", ["disembark", "alight"], ["board", "embark"], ["deplane passengers", "orderly deplaning"]),
      v("slot", "/slɒt/", "/slɑːt/", "A scheduled time assigned to an airline for a takeoff or landing at a specific airport.", "Lượt cất/hạ cánh (tại sân bay)", "noun", "The airline struggled to secure a prime morning slot at the congested international airport.", "Hãng hàng không đã rất vất vả để giành được một lượt cất cánh vào buổi sáng sớm tại sân bay quốc tế đang quá tải.", ["time slot", "landing window"], [], ["landing slot", "takeoff slot"]),
    ],
  },
};


// Seed function
async function seedVocab() {
  console.log("🌱 Seeding Vocabulary Data - Travel...");

  // Get or create topic group
  const topicGroup = await prisma.topicGroup.upsert({
    where: { name_hubType: { name: "Travel", hubType: "vocab" } },
    update: {},
    create: {
      name: "Travel",
      order: 8,
      hubType: "vocab",
      subcategories: [
        "Transportation",
        "Accommodation",
        "Sightseeing",
        "At the Airport",
      ],
    },
  });

  // Helper to slugify
  const slugify = (text: string) => text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

  // Iterate over subcategories
  for (const [subcat, levelsData] of Object.entries(travelVocab)) {
    console.log(`Processing Subcategory: ${subcat}`);

    for (const [level, vocabItems] of Object.entries(levelsData)) {
      const currentLevel = level as Level;
      const items = vocabItems as ReturnType<typeof v>[];

      if (!items || items.length === 0) continue;

      const topicId = `travel-${slugify(subcat)}-${currentLevel.toLowerCase()}`;

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
          category: "Travel",
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

  console.log("✅ Travel seeded successfully!");
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
