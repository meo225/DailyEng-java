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
// TOPIC GROUP 10: LAW & SOCIETY
// ============================================

const lawandsocietyVocab = {
  "Crime & Justice": {
    A1: [
      v("law", "/lɔː/", "/lɔ/", "a rule made by the government", "luật pháp", "noun", "We must follow the law.", "Chúng ta phải tuân theo luật pháp.", ["rule", "regulation"], [], ["break the law", "obey the law"]),
      v("crime", "/kraɪm/", "/kraɪm/", "an illegal act", "tội phạm", "noun", "Stealing is a crime.", "Trộm cắp là một tội phạm.", ["offense"], [], ["commit a crime", "fight crime"]),
      v("bad", "/bæd/", "/bæd/", "not good or against the rules", "xấu, tồi tệ", "adjective", "Doing bad things is wrong.", "Làm những điều xấu là sai trái.", ["evil", "wrong"], ["good"], ["bad behavior", "bad person"]),
      v("police", "/pəˈliːs/", "/pəˈliːs/", "the people who catch criminals", "cảnh sát", "noun", "The police help people.", "Cảnh sát giúp đỡ mọi người.", ["officers"], [], ["call the police", "police officer"]),
      v("wrong", "/rɒŋ/", "/rɔːŋ/", "not right or illegal", "sai trái", "adjective", "It is wrong to hurt others.", "Làm tổn thương người khác là sai trái.", ["incorrect", "illegal"], ["right"], ["do wrong", "it is wrong to"]),
      v("judge", "/dʒʌdʒ/", "/dʒʌdʒ/", "a person who decides a case in court", "thẩm phán", "noun", "The judge works in a court.", "Thẩm phán làm việc tại tòa án.", ["magistrate"], [], ["the judge says", "talk to the judge"]),
      v("court", "/kɔːt/", "/kɔrt/", "a place where legal cases are heard", "tòa án", "noun", "They go to court today.", "Họ đi đến tòa án hôm nay.", ["tribunal"], [], ["go to court", "in court"]),
      v("steal", "/stiːl/", "/stiːl/", "to take something that is not yours", "ăn cắp", "verb", "Do not steal things.", "Đừng ăn cắp đồ đạc.", ["rob", "take"], [], ["steal money", "steal a bag"]),
      v("safe", "/seɪf/", "/seɪf/", "free from danger or crime", "an toàn", "adjective", "The city is safe.", "Thành phố này an toàn.", ["secure"], ["dangerous"], ["stay safe", "keep safe"]),
    ],
    A2: [
      v("jail", "/dʒeɪl/", "/dʒeɪl/", "a place where people are kept as punishment for a crime", "nhà tù, trại giam", "noun", "The man went to jail because he broke the law.", "Người đàn ông đó phải vào tù vì anh ta đã vi phạm pháp luật.", ["prison", "cell"], [], ["go to jail", "in jail"]),
      v("guilty", "/ˈɡɪlti/", "/ˈɡɪlti/", "having done something wrong or committed a crime", "có tội", "adjective", "The judge decided the man was guilty of the crime.", "Thẩm phán quyết định người đàn ông đó có tội.", ["responsible", "at fault"], ["innocent"], ["found guilty", "feel guilty"]),
      v("arrest", "/əˈrest/", "/əˈrest/", "to take someone to a police station because they may have committed a crime", "bắt giữ", "verb", "The police had to arrest the thief at the store.", "Cảnh sát đã phải bắt giữ tên trộm tại cửa hàng.", ["capture", "seize"], ["release"], ["arrest a suspect", "under arrest"]),
      v("innocent", "/ˈɪnəsnt/", "/ˈɪnəsnt/", "not guilty of a crime", "vô tội", "adjective", "The jury believed that the young man was innocent.", "Bồi thẩm đoàn tin rằng người thanh niên đó vô tội.", ["blameless", "guiltless"], ["guilty"], ["prove innocent", "found innocent"]),
    ],
    B1: [
      v("witness", "/ˈwɪtnəs/", "/ˈwɪtnəs/", "a person who sees an event, typically a crime, take place", "nhân chứng", "noun", "The witness told the police exactly what happened at the scene.", "Nhân chứng đã kể cho cảnh sát chính xác những gì đã xảy ra tại hiện trường.", ["eyewitness", "observer"], [], ["key witness", "call a witness"]),
      v("evidence", "/ˈevɪdəns/", "/ˈevɪdəns/", "facts or objects that help prove whether someone has committed a crime", "bằng chứng", "noun", "The police did not have enough evidence to charge him.", "Cảnh sát không có đủ bằng chứng để buộc tội anh ta.", ["proof", "testimony"], [], ["gather evidence", "provide evidence"]),
      v("punishment", "/ˈpʌnɪʃmənt/", "/ˈpʌnɪʃmənt/", "the act of imposing a penalty on someone for an offense", "hình phạt", "noun", "The judge decided on a fair punishment for the young offender.", "Thẩm phán đã quyết định một hình phạt công bằng cho người phạm tội trẻ tuổi.", ["penalty", "sanction"], [], ["severe punishment", "capital punishment"]),
      v("robbery", "/ˈrɒbəri/", "/ˈrɑːbəri/", "the crime of stealing from a person or place by force or threat", "vụ cướp", "noun", "The bank robbery happened late yesterday afternoon.", "Vụ cướp ngân hàng đã xảy ra vào chiều muộn hôm qua.", ["theft", "burglary"], [], ["armed robbery", "commit robbery"]),
      v("suspect", "/ˈsʌspekt/", "/ˈsʌspekt/", "a person thought to be guilty of a crime", "nghi phạm", "noun", "The police are questioning a suspect in connection with the crime.", "Cảnh sát đang thẩm vấn một nghi phạm liên quan đến vụ án.", ["accused", "defendant"], [], ["main suspect", "identify a suspect"]),
      v("illegal", "/ɪˈliːɡl/", "/ɪˈliːɡl/", "not allowed by law", "bất hợp pháp", "adjective", "It is illegal to drive without a valid license.", "Lái xe mà không có bằng lái hợp lệ là bất hợp pháp.", ["unlawful", "prohibited"], ["legal"], ["illegal activity", "illegal act"]),
      v("break the law", "/breɪk ðə lɔː/", "/breɪk ðə lɔː/", "to do something that is against the law", "phạm luật", "phrase", "You will face serious consequences if you break the law.", "Bạn sẽ phải đối mặt với hậu quả nghiêm trọng nếu bạn phạm luật.", ["commit a crime", "violate the law"], ["obey the law"], ["intentionally break the law"]),
    ],
    B2: [
      v("convict", "/kənˈvɪkt/", "/kənˈvɪkt/", "to decide and state officially in court that someone is guilty of a crime", "kết án, tuyên án có tội", "verb", "The jury took only two hours to convict the defendant of fraud.", "Bồi thẩm đoàn chỉ mất hai giờ để kết án bị cáo về tội gian lận.", ["find guilty", "sentence"], ["acquit"], ["convict someone of a crime", "wrongfully convict"]),
      v("acquittal", "/əˈkwɪt.əl/", "/əˈkwɪt̬.əl/", "a decision by a court that someone is not guilty of a crime", "sự tuyên bố vô tội, sự trắng án", "noun", "The lawyer was confident that the evidence would lead to his client's acquittal.", "Luật sư tin tưởng rằng bằng chứng sẽ dẫn đến việc thân chủ của mình được tuyên vô tội.", ["exoneration", "discharge"], ["conviction"], ["secure an acquittal", "a dramatic acquittal"]),
      v("allegation", "/ˌæl.əˈɡeɪ.ʃən/", "/ˌæl.əˈɡeɪ.ʃən/", "a statement that someone has done something wrong or illegal, usually made without proof", "cáo buộc", "noun", "The company is investigating the serious allegations of corruption against its manager.", "Công ty đang điều tra những cáo buộc nghiêm trọng về tham nhũng chống lại người quản lý của họ.", ["accusation", "charge"], [], ["make an allegation", "serious allegation"]),
      v("sentence", "/ˈsen.təns/", "/ˈsen.təns/", "a punishment given by a judge in court to a person convicted of a crime", "bản án, sự kết án", "noun", "The judge handed down a five-year prison sentence to the offender.", "Thẩm phán đã đưa ra bản án năm năm tù cho kẻ phạm tội.", ["judgment", "penalty"], [], ["serve a sentence", "harsh sentence"]),
      v("prosecute", "/ˈprɒs.ɪ.kjuːt/", "/ˈprɑː.sə.kjuːt/", "to officially accuse someone of a crime and try them in a court of law", "truy tố", "verb", "The authorities decided to prosecute the company for violating environmental laws.", "Các cơ quan chức năng đã quyết định truy tố công ty vì vi phạm luật môi trường.", ["put on trial", "indict"], [], ["prosecute for a crime", "fail to prosecute"]),
      v("defendant", "/dɪˈfen.dənt/", "/dɪˈfen.dənt/", "a person in a law case who is accused of having done something illegal", "bị cáo", "noun", "The defendant pleaded not guilty to all charges brought against him.", "Bị cáo đã tuyên bố không nhận tội đối với tất cả các cáo buộc chống lại anh ta.", ["accused", "prisoner"], ["plaintiff"], ["the defendant's lawyer", "cross-examine the defendant"]),
      v("testify", "/ˈtes.tɪ.faɪ/", "/ˈtes.tə.faɪ/", "to speak seriously about something, especially in a law court", "làm chứng, đưa ra lời khai", "verb", "She was asked to testify in court regarding what she saw on the night of the robbery.", "Cô ấy được yêu cầu làm chứng tại tòa về những gì cô ấy đã thấy vào đêm xảy ra vụ cướp.", ["give evidence", "bear witness"], [], ["testify under oath", "refuse to testify"]),
      v("verdict", "/ˈvɜː.dɪkt/", "/ˈvɝː.dɪkt/", "an official decision made by a jury or a judge at the end of a trial", "lời tuyên án, phán quyết", "noun", "The jury reached a unanimous verdict after deliberating for several days.", "Bồi thẩm đoàn đã đạt được phán quyết nhất trí sau khi cân nhắc trong vài ngày.", ["judgment", "finding"], [], ["reach a verdict", "deliver a verdict"]),
      v("offender", "/əˈfen.dər/", "/əˈfen.dɚ/", "a person who is guilty of a crime", "người phạm tội", "noun", "Programs have been set up to help young offenders reintegrate into society.", "Các chương trình đã được thiết lập để giúp những người phạm tội trẻ tuổi tái hòa nhập xã hội.", ["criminal", "wrongdoer"], [], ["first-time offender", "repeat offender"]),
    ],
    C1: [
      v("perjury", "/ˈpɜː.dʒər.i/", "/ˈpɝː.dʒɚ.i/", "the crime of telling a lie in court after having promised to tell the truth", "tội khai man trước tòa", "noun", "He was charged with perjury after he was caught lying under oath.", "Anh ta bị buộc tội khai man sau khi bị bắt gặp nói dối trước tòa.", ["false testimony", "lying under oath"], [], ["commit perjury", "convicted of perjury"]),
      v("litigation", "/ˌlɪt.ɪˈɡeɪ.ʃən/", "/ˌlɪt̬.əˈɡeɪ.ʃən/", "the process of taking legal action in court", "hoạt động tranh tụng, kiện tụng", "noun", "The company is currently involved in expensive litigation over intellectual property rights.", "Công ty hiện đang tham gia vào vụ kiện tụng đắt đỏ về quyền sở hữu trí tuệ.", ["lawsuit", "legal action"], [], ["engage in litigation", "complex litigation"]),
      v("indictment", "/ɪnˈdaɪt.mənt/", "/ɪnˈdaɪt.mənt/", "a formal charge or accusation of a serious crime", "bản cáo trạng, sự buộc tội", "noun", "The grand jury returned an indictment against the high-ranking official.", "Bồi thẩm đoàn đã đưa ra bản cáo trạng chống lại vị quan chức cấp cao.", ["charge", "accusation"], [], ["bring an indictment", "face an indictment"]),
      v("culpable", "/ˈkʌl.pə.bəl/", "/ˈkʌl.pə.bəl/", "deserving to be blamed or considered responsible for something bad", "có tội, đáng trách", "adjective", "The company was found culpable for the environmental disaster due to negligence.", "Công ty bị coi là có tội trong thảm họa môi trường do sự tắc trách.", ["guilty", "blameworthy"], ["innocent"], ["culpable negligence", "found culpable"]),
      v("precedent", "/ˈpres.ɪ.dənt/", "/ˈpres.ə.dənt/", "an earlier action or decision that is regarded as an example or guide for subsequent similar circumstances", "tiền lệ", "noun", "The court's decision set a significant legal precedent for future cases.", "Phán quyết của tòa án đã tạo ra một tiền lệ pháp lý quan trọng cho các vụ án tương lai.", ["model", "authority"], [], ["set a precedent", "legal precedent"]),
    ],
    C2: [
      v("exonerate", "/ɪɡˈzɒnəreɪt/", "/ɪɡˈzɑːnəreɪt/", "To officially absolve someone from blame or fault for a wrongdoing.", "giải oan, miễn tội", "verb", "The new DNA evidence was sufficient to exonerate the man who had spent two decades in prison.", "Bằng chứng DNA mới đủ để giải oan cho người đàn ông đã dành hai thập kỷ trong tù.", ["acquit", "vindicate"], ["convict"], ["completely exonerate", "exonerate from blame"]),
      v("litigious", "/lɪˈtɪdʒəs/", "/lɪˈtɪdʒəs/", "Unreasonably prone to go to law to settle disputes.", "hay kiện tụng", "adjective", "In such a litigious society, corporations often settle out of court to avoid lengthy legal battles.", "Trong một xã hội hay kiện tụng như vậy, các tập đoàn thường dàn xếp ngoài tòa án để tránh những cuộc chiến pháp lý kéo dài.", ["contentious", "argumentative"], [], ["litigious society", "litigious individual"]),
      v("recidivism", "/rɪˈsɪdɪvɪzəm/", "/rɪˈsɪdɪvɪzəm/", "The tendency of a convicted criminal to reoffend.", "tái phạm tội", "noun", "Rehabilitation programs are essential to lower the high rates of recidivism among former inmates.", "Các chương trình phục hồi chức năng là cần thiết để giảm tỷ lệ tái phạm cao ở các cựu tù nhân.", ["reoffending", "relapse"], [], ["high recidivism", "reduce recidivism"]),
      v("subpoena", "/səˈpiːnə/", "/səˈpiːnə/", "A writ ordering a person to attend a court.", "trát hầu tòa", "noun", "The defense attorney issued a subpoena to obtain the confidential records of the defendant.", "Luật sư bào chữa đã ban hành trát hầu tòa để lấy các hồ sơ bảo mật của bị cáo.", ["summons", "court order"], [], ["issue a subpoena", "comply with a subpoena"]),
      v("affidavit", "/ˌæfɪˈdeɪvɪt/", "/ˌæfəˈdeɪvɪt/", "A written statement confirmed by oath or affirmation, for use as evidence in court.", "bản khai có tuyên thệ", "noun", "She signed an affidavit confirming that she had witnessed the entire incident.", "Cô ấy đã ký một bản khai có tuyên thệ xác nhận rằng cô ấy đã chứng kiến toàn bộ vụ việc.", ["sworn statement", "deposition"], [], ["sign an affidavit", "submit an affidavit"]),
      v("malfeasance", "/mælˈfiːzəns/", "/mælˈfiːzəns/", "Wrongdoing, especially by a public official.", "hành vi sai trái (của quan chức)", "noun", "The governor was investigated for financial malfeasance during his second term in office.", "Thống đốc đã bị điều tra vì hành vi sai trái tài chính trong nhiệm kỳ thứ hai của mình.", ["misconduct", "corruption"], [], ["public malfeasance", "allegations of malfeasance"]),
      v("jurisprudence", "/ˌdʒʊərɪsˈpruːdns/", "/ˌdʒʊrɪsˈpruːdns/", "The theory or philosophy of law.", "khoa học luật, triết học pháp luật", "noun", "The judge is known for his deep commitment to the principles of classical jurisprudence.", "Vị thẩm phán này nổi tiếng với cam kết sâu sắc đối với các nguyên tắc của khoa học luật cổ điển.", ["legal theory", "legal philosophy"], [], ["modern jurisprudence", "study of jurisprudence"]),
    ],
  },
  "Government": {
    A1: [
      v("leader", "/ˈliːdə(r)/", "/ˈliːdər/", "a person who directs a group or country", "lãnh đạo", "noun", "The leader works for the people.", "Người lãnh đạo làm việc vì người dân.", ["head", "chief"], ["follower"], ["political leader", "national leader"]),
      v("rule", "/ruːl/", "/ruːl/", "to control or govern a country", "cai trị", "verb", "The president will rule the country.", "Tổng thống sẽ cai trị đất nước.", ["govern", "control"], [], ["rule a country", "rule of law"]),
      v("public", "/ˈpʌblɪk/", "/ˈpʌblɪk/", "relating to all the people in a country", "công cộng", "adjective", "The park is for the public.", "Công viên này dành cho công chúng.", ["common", "civil"], ["private"], ["public service", "public place"]),
      v("state", "/steɪt/", "/steɪt/", "a country or its government", "nhà nước", "noun", "The state provides schools for children.", "Nhà nước cung cấp trường học cho trẻ em.", ["nation", "country"], [], ["the state", "state school"]),
      v("power", "/ˈpaʊə(r)/", "/ˈpaʊər/", "the ability or right to control people", "quyền lực", "noun", "The government has the power to change things.", "Chính phủ có quyền lực để thay đổi mọi thứ.", ["authority", "control"], [], ["in power", "political power"]),
      v("right", "/raɪt/", "/raɪt/", "something you are allowed to do by law", "quyền", "noun", "Everyone has the right to vote.", "Mọi người đều có quyền bỏ phiếu.", ["entitlement", "privilege"], [], ["human rights", "legal right"]),
      v("city", "/ˈsɪti/", "/ˈsɪti/", "a large town with its own local government", "thành phố", "noun", "The city has a new mayor.", "Thành phố có một thị trưởng mới.", ["town", "municipality"], [], ["city government", "capital city"]),
    ],
    A2: [
      v("policy", "/ˈpɒləsi/", "/ˈpɑːləsi/", "a plan of action agreed by a government", "chính sách", "noun", "The government has a new policy to help students.", "Chính phủ có một chính sách mới để giúp đỡ học sinh.", ["plan", "strategy"], [], ["government policy", "change policy"]),
      v("elect", "/ɪˈlekt/", "/ɪˈlekt/", "to choose someone for a position by voting", "bầu chọn", "verb", "We will elect a new president next year.", "Chúng ta sẽ bầu ra một vị tổng thống mới vào năm sau.", ["choose", "select"], [], ["elect a leader", "newly elected"]),
      v("official", "/əˈfɪʃl/", "/əˈfɪʃl/", "a person who has a position of responsibility in an organization or government", "viên chức", "noun", "A government official explained the new rules.", "Một viên chức chính phủ đã giải thích các quy định mới.", ["civil servant", "administrator"], [], ["government official", "senior official"]),
      v("local", "/ˈləʊkl/", "/ˈloʊkl/", "relating to the area where you live", "địa phương", "adjective", "I went to the local council office to ask for help.", "Tôi đã đến văn phòng hội đồng địa phương để nhờ giúp đỡ.", ["regional", "nearby"], ["national"], ["local government", "local community"]),
    ],
    B1: [
      v("election", "/ɪˈlekʃn/", "/ɪˈlekʃn/", "a formal process of voting to choose someone for a public office", "cuộc bầu cử", "noun", "The national election will take place next month.", "Cuộc bầu cử quốc gia sẽ diễn ra vào tháng tới.", ["vote", "ballot"], [], ["hold an election", "win an election"]),
      v("authority", "/ɔːˈθɒrəti/", "/əˈθɔːrəti/", "the power or right to give orders and make decisions", "thẩm quyền", "noun", "The local authority is responsible for fixing the roads.", "Chính quyền địa phương chịu trách nhiệm sửa chữa các con đường.", ["power", "control"], [], ["local authority", "have the authority"]),
      v("minister", "/ˈmɪnɪstə(r)/", "/ˈmɪnɪstər/", "a person who is in charge of a government department", "bộ trưởng", "noun", "The Minister of Health visited the hospital today.", "Bộ trưởng Bộ Y tế đã đến thăm bệnh viện hôm nay.", ["official", "secretary"], [], ["prime minister", "cabinet minister"]),
      v("represent", "/ˌreprɪˈzent/", "/ˌreprɪˈzent/", "to act or speak officially for a group of people", "đại diện", "verb", "She was elected to represent the people of her district.", "Cô ấy được bầu để đại diện cho người dân trong quận của mình.", ["act for", "speak for"], [], ["represent the people", "represent a group"]),
    ],
    B2: [
      v("legislation", "/ˌledʒɪˈsleɪʃn/", "/ˌledʒɪˈsleɪʃn/", "a law or set of laws suggested by a government and made official by a parliament", "pháp luật, luật lệ", "noun", "The government is planning to introduce new legislation to protect the environment.", "Chính phủ đang lên kế hoạch ban hành luật mới để bảo vệ môi trường.", ["statute", "act"], [], ["pass legislation", "introduce legislation"]),
      v("amend", "/əˈmend/", "/əˈmend/", "to change a law, document, or statement slightly in order to correct a mistake or improve it", "sửa đổi, bổ sung", "verb", "Parliament voted to amend the constitution to ensure equal rights for all citizens.", "Quốc hội đã bỏ phiếu sửa đổi hiến pháp để đảm bảo quyền bình đẳng cho mọi công dân.", ["revise", "modify"], [], ["amend the law", "formally amend"]),
      v("constituency", "/kənˈstɪtjuənsi/", "/kənˈstɪtʃuənsi/", "a district that elects its own representative to parliament", "khu vực bầu cử", "noun", "The politician spent the weekend meeting with voters in his constituency.", "Chính trị gia đã dành cả cuối tuần để gặp gỡ cử tri trong khu vực bầu cử của ông ấy.", ["electorate", "district"], [], ["local constituency", "represent a constituency"]),
      v("ratify", "/ˈrætɪfaɪ/", "/ˈrætɪfaɪ/", "to make an agreement official by signing it or voting for it", "phê chuẩn", "verb", "The treaty must be ratified by all member states before it can come into effect.", "Hiệp ước phải được tất cả các quốc gia thành viên phê chuẩn trước khi có hiệu lực.", ["approve", "endorse"], ["reject"], ["ratify a treaty", "formally ratify"]),
      v("sovereign", "/ˈsɒvrɪn/", "/ˈsɑːvrən/", "having independent authority and the right to govern itself", "có chủ quyền", "adjective", "The country is a sovereign state with its own independent government.", "Đất nước này là một quốc gia có chủ quyền với chính phủ độc lập của riêng mình.", ["autonomous", "independent"], ["dependent"], ["sovereign state", "sovereign power"]),
      v("mandate", "/ˈmændeɪt/", "/ˈmændeɪt/", "the authority to do something given by the people to a government after an election", "ủy nhiệm, sự cho phép", "noun", "The government won a clear mandate to implement its economic reforms.", "Chính phủ đã giành được sự ủy nhiệm rõ ràng để thực hiện các cải cách kinh tế của mình.", ["authorization", "instruction"], [], ["clear mandate", "public mandate"]),
      v("partisan", "/ˌpɑːtɪˈzæn/", "/ˈpɑːrtɪzn/", "strongly supporting a particular political party, often without considering other ideas", "đảng phái", "adjective", "Political debates in the chamber often become highly partisan and unproductive.", "Các cuộc tranh luận chính trị tại nghị viện thường trở nên rất mang tính đảng phái và không hiệu quả.", ["biased", "factional"], ["impartial"], ["partisan politics", "highly partisan"]),
      v("dissent", "/dɪˈsent/", "/dɪˈsent/", "the expression of disagreement with official opinions or government policies", "sự bất đồng chính kiến", "noun", "The government faced widespread dissent over the new tax policies.", "Chính phủ đã phải đối mặt với sự bất đồng chính kiến lan rộng về các chính sách thuế mới.", ["disagreement", "opposition"], ["agreement"], ["political dissent", "suppress dissent"]),
      v("enact", "/ɪˈnækt/", "/ɪˈnækt/", "to put something into action, especially to make something law", "ban hành (luật)", "verb", "The assembly decided to enact a new law regarding public safety.", "Quốc hội đã quyết định ban hành một đạo luật mới liên quan đến an toàn công cộng.", ["pass", "establish"], ["repeal"], ["enact legislation", "enact a law"]),
    ],
    C1: [
      v("legislature", "/ˈledʒ.ɪ.slə.tʃər/", "/ˈledʒ.ə.sleɪ.tʃɚ/", "the legislative body of a country or state", "cơ quan lập pháp", "noun", "The state legislature passed a new bill aimed at improving public infrastructure.", "Cơ quan lập pháp tiểu bang đã thông qua một dự luật mới nhằm cải thiện cơ sở hạ tầng công cộng.", ["parliament", "congress"], [], ["state legislature", "national legislature"]),
      v("sovereignty", "/ˈsɒv.rən.ti/", "/ˈsɑːv.rən.ti/", "the authority of a state to govern itself or another state", "chủ quyền", "noun", "The nation fiercely defended its sovereignty against foreign intervention.", "Quốc gia đã quyết liệt bảo vệ chủ quyền của mình trước sự can thiệp từ nước ngoài.", ["autonomy", "independence"], [], ["national sovereignty", "protect sovereignty"]),
      v("arbitrary", "/ˈɑː.bɪ.trər.i/", "/ˈɑːr.bə.trer.i/", "based on random choice or personal whim, rather than any reason or system", "độc đoán", "adjective", "The citizens protested against the arbitrary exercise of power by the local authorities.", "Người dân đã phản đối việc chính quyền địa phương sử dụng quyền lực một cách độc đoán.", ["capricious", "despotic"], ["just", "reasonable"], ["arbitrary power", "arbitrary detention"]),
      v("amendment", "/əˈmend.mənt/", "/əˈmend.mənt/", "a change or addition to the terms of a contract or document, such as a constitution", "tu chính án", "noun", "The proposed amendment to the constitution aims to improve democratic accountability.", "Tu chính án được đề xuất cho hiến pháp nhằm cải thiện trách nhiệm giải trình dân chủ.", ["revision", "alteration"], [], ["constitutional amendment", "propose an amendment"]),
      v("jurisdiction", "/ˌdʒʊə.rɪsˈdɪk.ʃən/", "/ˌdʒʊr.ɪsˈdɪk.ʃən/", "the official power to make legal decisions and judgments", "thẩm quyền tài phán", "noun", "The court ruled that the case fell outside its legal jurisdiction.", "Tòa án phán quyết rằng vụ việc nằm ngoài thẩm quyền tài phán của họ.", ["authority", "control"], [], ["legal jurisdiction", "within the jurisdiction"]),
      v("impeach", "/ɪmˈpiːtʃ/", "/ɪmˈpiːtʃ/", "to charge a public official with a crime done while in office", "luận tội", "verb", "The opposition party moved to impeach the president following the corruption scandal.", "Đảng đối lập đã tiến hành luận tội tổng thống sau vụ bê bối tham nhũng.", ["indict", "accuse"], ["acquit"], ["impeach a leader", "impeach a president"]),
    ],
    C2: [
      v("hegemony", "/hɪˈɡɛməni/", "/hɪˈɡɛməni/", "leadership or dominance, especially by one country or social group over others.", "quyền bá chủ", "noun", "The nation sought to maintain its regional hegemony through strategic diplomatic alliances.", "Quốc gia này tìm cách duy trì quyền bá chủ trong khu vực thông qua các liên minh ngoại giao chiến lược.", ["dominance", "supremacy"], ["subservience"], ["regional hegemony", "maintain hegemony"]),
      v("autocratic", "/ˌɔːtəˈkrætɪk/", "/ˌɔːtəˈkrætɪk/", "relating to a system of government by one person with absolute power.", "chuyên quyền, độc tài", "adjective", "The autocratic regime suppressed all forms of political dissent.", "Chế độ độc tài đã đàn áp mọi hình thức bất đồng chính kiến.", ["dictatorial", "tyrannical"], ["democratic"], ["autocratic regime", "autocratic rule"]),
      v("disenfranchise", "/ˌdɪsɪnˈfræntʃaɪz/", "/ˌdɪsɪnˈfræntʃaɪz/", "to deprive someone of the right to vote or other rights of citizenship.", "tước quyền bầu cử", "verb", "Critics argue that strict voter ID laws tend to disenfranchise marginalized communities.", "Các nhà phê bình lập luận rằng luật nhận dạng cử tri nghiêm ngặt có xu hướng tước quyền bầu cử của các cộng đồng yếu thế.", ["marginalize", "disempower"], ["enfranchise"], ["disenfranchise voters", "systemically disenfranchise"]),
      v("polity", "/ˈpɒləti/", "/ˈpɑːləti/", "a form or process of civil government or constitution; an organized society.", "chính thể, quốc gia", "noun", "The stability of the democratic polity depends on the active participation of its citizens.", "Sự ổn định của chính thể dân chủ phụ thuộc vào sự tham gia tích cực của công dân.", ["body politic", "state"], [], ["democratic polity", "stable polity"]),
      v("usurp", "/juːˈzɜːp/", "/juːˈzɜːrp/", "to take a position of power or importance illegally or by force.", "chiếm đoạt, tiếm quyền", "verb", "The military attempted to usurp the authority of the elected government.", "Quân đội đã cố gắng tiếm quyền chính phủ được bầu cử.", ["seize", "arrogate"], [], ["usurp power", "usurp authority"]),
      v("gerrymandering", "/ˈdʒerimændərɪŋ/", "/ˈdʒerimændərɪŋ/", "the manipulation of the boundaries of an electoral constituency so as to favor one party or class.", "gian lận bầu cử bằng cách vẽ lại khu vực bầu cử", "noun", "The practice of gerrymandering has been criticized for undermining fair representation in elections.", "Thực tiễn vẽ lại khu vực bầu cử có lợi cho một đảng đã bị chỉ trích vì làm suy yếu sự đại diện công bằng trong các cuộc bầu cử.", ["redistricting", "manipulation"], [], ["political gerrymandering", "partisan gerrymandering"]),
    ],
  },
  "Rights & Duties": {
    A1: [
      v("duty", "/ˈdʒuːti/", "/ˈduːti/", "something that you have to do because it is your job or your responsibility", "nghĩa vụ, bổn phận", "noun", "It is our duty to help others.", "Giúp đỡ người khác là nghĩa vụ của chúng ta.", ["responsibility", "obligation"], [], ["do one's duty", "civic duty"]),
      v("fair", "/feə(r)/", "/fer/", "treating everyone in the same way according to the rules", "công bằng", "adjective", "The game was fair for everyone.", "Trò chơi rất công bằng với mọi người.", ["just", "impartial"], ["unfair"], ["fair treatment", "be fair"]),
      v("obey", "/əˈbeɪ/", "/əˈbeɪ/", "to do what you are told to do", "vâng lời, tuân theo", "verb", "You must obey your parents.", "Bạn phải vâng lời cha mẹ.", ["follow", "comply"], ["disobey"], ["obey the law", "obey rules"]),
      v("free", "/friː/", "/friː/", "having the power to do what you want", "tự do", "adjective", "We are free to say what we think.", "Chúng ta có quyền tự do nói lên suy nghĩ của mình.", ["independent"], ["restricted"], ["be free", "freedom of speech"]),
    ],
    A2: [
      v("allow", "/əˈlaʊ/", "/əˈlaʊ/", "to give permission for someone to do something", "cho phép", "verb", "The law does not allow stealing.", "Pháp luật không cho phép hành vi trộm cắp.", ["permit", "let"], ["forbid"], ["allow someone to do", "strictly allowed"]),
      v("legal", "/ˈliːɡəl/", "/ˈliːɡəl/", "connected with the law", "hợp pháp", "adjective", "Is it legal to park here?", "Đậu xe ở đây có hợp pháp không?", ["lawful", "permitted"], ["illegal"], ["legal action", "legal right"]),
      v("ban", "/bæn/", "/bæn/", "to say officially that something cannot be done", "cấm", "verb", "They decided to ban smoking in public places.", "Họ quyết định cấm hút thuốc ở những nơi công cộng.", ["prohibit", "forbid"], ["allow"], ["total ban", "ban on something"]),
      v("responsible", "/rɪˈspɒnsəbəl/", "/rɪˈspɑːnsəbəl/", "having a duty to deal with something", "có trách nhiệm", "adjective", "Students are responsible for their own books.", "Học sinh có trách nhiệm với sách vở của mình.", ["accountable", "liable"], ["irresponsible"], ["responsible for", "be held responsible"]),
      v("voter", "/ˈvəʊtər/", "/ˈvoʊtər/", "a person who has the right to vote in an election", "cử tri, người đi bầu", "noun", "Every voter should go to the polling station.", "Mỗi cử tri nên đến điểm bỏ phiếu.", ["elector"], [], ["registered voter", "eligible voter"]),
    ],
    B1: [
      v("citizen", "/ˈsɪtɪzn/", "/ˈsɪtɪzən/", "a person who is a legal member of a country", "công dân", "noun", "Every citizen has the right to vote in national elections.", "Mỗi công dân đều có quyền bỏ phiếu trong các cuộc bầu cử quốc gia.", ["national", "subject"], ["foreigner"], ["law-abiding citizen", "private citizen"]),
      v("prohibit", "/prəˈhɪbɪt/", "/proʊˈhɪbɪt/", "to stop something by law or rule", "cấm", "verb", "The new law will prohibit smoking in public parks.", "Luật mới sẽ cấm hút thuốc tại các công viên công cộng.", ["ban", "forbid"], ["allow"], ["strictly prohibit", "legally prohibit"]),
      v("responsibility", "/rɪˌspɒnsəˈbɪləti/", "/riˌspɑːnsəˈbɪləti/", "a duty to deal with something", "trách nhiệm", "noun", "It is the responsibility of parents to look after their children.", "Cha mẹ có trách nhiệm chăm sóc con cái.", ["accountability", "duty"], [], ["take responsibility", "individual responsibility"]),
      v("freedom", "/ˈfriːdəm/", "/ˈfriːdəm/", "the power or right to act, speak, or think as one wants", "sự tự do", "noun", "Freedom of speech is a fundamental human right.", "Tự do ngôn luận là một quyền con người cơ bản.", ["liberty", "independence"], ["oppression"], ["personal freedom", "freedom of speech"]),
      v("violate", "/ˈvaɪəleɪt/", "/ˈvaɪəleɪt/", "to break or fail to comply with a rule or law", "vi phạm", "verb", "Those who violate the rules will be punished.", "Những ai vi phạm các quy định sẽ bị trừng phạt.", ["breach", "infringe"], ["observe"], ["violate the law", "violate a right"]),
      v("equality", "/iˈkwɒləti/", "/iˈkwɑːləti/", "the state of being equal, especially in status, rights, and opportunities", "sự bình đẳng", "noun", "The constitution guarantees equality for all citizens.", "Hiến pháp bảo đảm sự bình đẳng cho tất cả công dân.", ["fairness", "impartiality"], ["inequality"], ["social equality", "gender equality"]),
      v("comply", "/kəmˈplaɪ/", "/kəmˈplaɪ/", "to act in accordance with a wish or command", "tuân thủ", "verb", "The company must comply with safety regulations.", "Công ty phải tuân thủ các quy định an toàn.", ["obey", "observe"], ["defy"], ["comply with", "fully comply"]),
    ],
    B2: [
      v("obligation", "/ˌɒblɪˈɡeɪʃn/", "/ˌɑːblɪˈɡeɪʃn/", "a duty or commitment to do something", "nghĩa vụ", "noun", "Citizens have a legal obligation to pay taxes to the state.", "Công dân có nghĩa vụ pháp lý phải đóng thuế cho nhà nước.", ["duty", "responsibility"], ["discretion"], ["legal obligation", "moral obligation"]),
      v("entitlement", "/ɪnˈtaɪtlmənt/", "/ɪnˈtaɪtlmənt/", "the fact of having a right to something", "quyền lợi", "noun", "The new law clarifies the entitlement of employees to paid leave.", "Luật mới làm rõ quyền lợi của nhân viên đối với việc nghỉ phép có lương.", ["right", "claim"], [], ["social entitlement", "claim entitlement"]),
      v("infringe", "/ɪnˈfrɪndʒ/", "/ɪnˈfrɪndʒ/", "to actively break the terms of a law or agreement", "vi phạm", "verb", "The government must ensure that new policies do not infringe upon individual privacy.", "Chính phủ phải đảm bảo rằng các chính sách mới không vi phạm quyền riêng tư của cá nhân.", ["violate", "breach"], ["comply"], ["infringe upon", "infringe rights"]),
      v("accountable", "/əˈkaʊntəbl/", "/əˈkaʊntəbl/", "required or expected to justify actions or decisions", "chịu trách nhiệm", "adjective", "Public officials should be held accountable for their actions.", "Các quan chức nhà nước cần phải chịu trách nhiệm về những hành động của mình.", ["responsible", "liable"], ["irresponsible"], ["held accountable", "remain accountable"]),
      v("uphold", "/ʌpˈhəʊld/", "/ʌpˈhoʊld/", "to maintain or support a law, principle, or decision", "duy trì, bảo vệ (luật pháp)", "verb", "The court is committed to upholding the rights of all citizens.", "Tòa án cam kết bảo vệ quyền lợi của tất cả công dân.", ["defend", "maintain"], ["overturn"], ["uphold the law", "uphold justice"]),
      v("mandatory", "/ˈmændətəri/", "/ˈmændətɔːri/", "required by law or rules; compulsory", "bắt buộc", "adjective", "It is mandatory for all citizens to carry identification in this country.", "Việc tất cả công dân mang theo giấy tờ tùy thân là bắt buộc ở đất nước này.", ["compulsory", "obligatory"], ["optional"], ["mandatory requirement", "mandatory attendance"]),
      v("enforce", "/ɪnˈfɔːs/", "/ɪnˈfɔːrs/", "to compel observance of a law, rule, or obligation", "thi hành, thực thi", "verb", "The police are responsible for enforcing traffic laws.", "Cảnh sát chịu trách nhiệm thực thi luật giao thông.", ["implement", "apply"], [], ["enforce the law", "strictly enforce"]),
      v("civil", "/ˈsɪvl/", "/ˈsɪvl/", "relating to ordinary citizens and their concerns", "thuộc về dân sự", "adjective", "Every individual is entitled to civil liberties under the constitution.", "Mỗi cá nhân đều được hưởng các quyền tự do dân sự theo hiến pháp.", ["secular", "public"], ["criminal"], ["civil rights", "civil society"]),
      v("immunity", "/ɪˈmjuːnəti/", "/ɪˈmjuːnəti/", "exemption from penalties or legal requirements", "quyền miễn trừ", "noun", "Diplomats often have legal immunity while serving in a foreign country.", "Các nhà ngoại giao thường có quyền miễn trừ pháp lý khi phục vụ tại nước ngoài.", ["exemption", "impunity"], [], ["legal immunity", "diplomatic immunity"]),
    ],
    C1: [
      v("enfranchise", "/ɪnˈfræn.tʃaɪz/", "/ɪnˈfræn.tʃaɪz/", "to give someone the right to vote", "trao quyền bầu cử", "verb", "The new legislation aims to enfranchise citizens who were previously excluded from the electoral process.", "Đạo luật mới nhằm mục đích trao quyền bầu cử cho những công dân trước đây từng bị loại khỏi quy trình bầu cử.", ["empower", "liberate"], ["disenfranchise"], ["formally enfranchise", "fully enfranchise"]),
      v("prerogative", "/prɪˈrɒɡ.ə.tɪv/", "/prəˈrɑː.ɡə.t̬ɪv/", "a right or privilege exclusive to a particular individual or class", "đặc quyền", "noun", "It is the president's prerogative to grant pardons to convicted individuals.", "Đặc quyền của tổng thống là ân xá cho những cá nhân đã bị kết án.", ["entitlement", "privilege"], [], ["exclusive prerogative", "exercise a prerogative"]),
      v("codify", "/ˈkəʊ.dɪ.faɪ/", "/ˈkoʊ.də.faɪ/", "to arrange laws or rules into a systematic code", "hệ thống hóa luật pháp", "verb", "The committee sought to codify the existing common law principles into a single statute.", "Ủy ban đã tìm cách hệ thống hóa các nguyên tắc thông luật hiện hành thành một đạo luật duy nhất.", ["systematize", "formalize"], [], ["codify laws", "codify rights"]),
      v("infringement", "/ɪnˈfrɪnʒ.mənt/", "/ɪnˈfrɪnʒ.mənt/", "the action of breaking the terms of a law or agreement", "sự vi phạm (quyền)", "noun", "The activists argued that the new surveillance measures constitute an infringement of personal privacy.", "Các nhà hoạt động lập luận rằng các biện pháp giám sát mới cấu thành sự vi phạm quyền riêng tư cá nhân.", ["breach", "violation"], [], ["copyright infringement", "serious infringement"]),
      v("inalienable", "/ɪnˈeɪ.li.ə.nə.bəl/", "/ɪnˈeɪ.li.ə.nə.bəl/", "unable to be taken away from or given away by the possessor", "không thể tước bỏ", "adjective", "Human rights are considered inalienable, regardless of a person's nationality or status.", "Quyền con người được coi là không thể tước bỏ, bất kể quốc tịch hay địa vị của một người.", ["untouchable", "absolute"], ["alienable"], ["inalienable rights", "inalienable freedom"]),
      v("discretionary", "/dɪˈskreʃ.ən.ər.i/", "/dɪˈskreʃ.ə.ner.i/", "available to be used when and how you decide", "tùy ý, theo quyết định riêng", "adjective", "The judge has the discretionary power to reduce the sentence based on mitigating circumstances.", "Thẩm phán có quyền tùy ý giảm án dựa trên các tình tiết giảm nhẹ.", ["optional", "voluntary"], ["mandatory"], ["discretionary power", "discretionary authority"]),
      v("accountability", "/əˌkaʊn.təˈbɪl.ə.ti/", "/əˌkaʊn.təˈbɪl.ə.t̬i/", "the fact of being responsible for your decisions or actions", "trách nhiệm giải trình", "noun", "Public officials must maintain a high level of accountability to the citizens they serve.", "Các quan chức công phải duy trì mức độ trách nhiệm giải trình cao đối với những công dân mà họ phục vụ.", ["responsibility", "liability"], [], ["public accountability", "ensure accountability"]),
    ],
    C2: [
      v("enfranchisement", "/ɪnˈfræn.tʃɪz.mənt/", "/ɪnˈfræn.tʃaɪz.mənt/", "the granting of the right to vote", "quyền bầu cử", "noun", "The movement focused on the universal enfranchisement of all adult citizens regardless of gender or race.", "Phong trào tập trung vào việc trao quyền bầu cử phổ thông cho tất cả công dân trưởng thành bất kể giới tính hay chủng tộc.", ["suffrage", "franchise"], ["disenfranchisement"], ["universal enfranchisement", "political enfranchisement"]),
      v("fiduciary", "/fɪˈdʒuː.ʃi.er.i/", "/fɪˈduː.ʃi.er.i/", "involving a confidence or trust, especially regarding financial matters", "thuộc về trách nhiệm ủy thác", "adjective", "The directors have a fiduciary duty to act in the best interests of the company shareholders.", "Các giám đốc có nghĩa vụ ủy thác phải hành động vì lợi ích tốt nhất của các cổ đông công ty.", ["trustee", "confidential"], [], ["fiduciary duty", "fiduciary responsibility"]),
      v("abrogate", "/ˈæb.rə.ɡeɪt/", "/ˈæb.rə.ɡeɪt/", "to repeal or do away with a law, right, or formal agreement", "bãi bỏ, hủy bỏ", "verb", "The government cannot unilaterally abrogate the treaty without facing significant international repercussions.", "Chính phủ không thể đơn phương hủy bỏ hiệp ước mà không phải đối mặt với những hậu quả quốc tế nghiêm trọng.", ["repeal", "rescind"], ["enact"], ["abrogate a treaty", "abrogate rights"]),
      v("indefeasible", "/ˌɪn.dɪˈfiː.zə.bəl/", "/ˌɪn.dɪˈfiː.zə.bəl/", "not able to be lost, annulled, or overturned", "không thể bị hủy bỏ, không thể tước đoạt", "adjective", "Human rights are often described as indefeasible entitlements that no state should undermine.", "Quyền con người thường được mô tả là những quyền lợi không thể tước đoạt mà không quốc gia nào được phép làm suy yếu.", ["inalienable", "absolute"], ["defeasible"], ["indefeasible right", "indefeasible title"]),
      v("redress", "/rɪˈdres/", "/rɪˈdres/", "remedy or compensation for a wrong or grievance", "sự bồi thường, sự khắc phục", "noun", "Citizens have the right to seek legal redress if they feel their civil liberties have been violated.", "Công dân có quyền tìm kiếm sự bồi thường pháp lý nếu họ cảm thấy các quyền tự do dân sự của mình bị vi phạm.", ["remedy", "reparation"], [], ["seek redress", "legal redress"]),
      v("subrogation", "/ˌsʌb.rəˈɡeɪ.ʃən/", "/ˌsʌb.rəˈɡeɪ.ʃən/", "the substitution of one person or group by another in respect of a debt or insurance claim", "sự thế quyền", "noun", "Through the principle of subrogation, the insurance company gained the right to sue the party responsible for the damage.", "Thông qua nguyên tắc thế quyền, công ty bảo hiểm đã có quyền kiện bên chịu trách nhiệm cho thiệt hại.", ["substitution", "replacement"], [], ["right of subrogation", "principle of subrogation"]),
      v("immunities", "/ɪˈmjuː.nə.tiz/", "/ɪˈmjuː.nə.tiz/", "exemptions from legal obligations or penalties", "quyền miễn trừ", "noun", "Diplomatic immunities protect foreign officials from prosecution while they are serving abroad.", "Quyền miễn trừ ngoại giao bảo vệ các quan chức nước ngoài khỏi bị truy tố trong khi họ đang công tác ở nước ngoài.", ["exemptions", "privileges"], ["liability"], ["diplomatic immunities", "sovereign immunities"]),
    ],
  },
  "Social Issues": {
    A1: [
      v("poor", "/pɔː(r)/", "/pʊr/", "Having very little money", "Nghèo", "adjective", "The family is very poor.", "Gia đình đó rất nghèo.", ["needy", "impoverished"], ["rich"], ["poor people", "very poor"]),
      v("give", "/ɡɪv/", "/ɡɪv/", "To offer something to someone", "Cho, tặng", "verb", "We give clothes to poor people.", "Chúng tôi tặng quần áo cho những người nghèo.", ["donate", "provide"], ["take"], ["give help", "give money"]),
      v("dirty", "/ˈdɜːti/", "/ˈdɜːrti/", "Not clean", "Bẩn", "adjective", "The street is very dirty.", "Con phố này rất bẩn.", ["filthy", "messy"], ["clean"], ["dirty water", "dirty street"]),
    ],
    A2: [
      v("problem", "/ˈprɒbləm/", "/ˈprɑːbləm/", "a situation that causes difficulty", "vấn đề", "noun", "Pollution is a big problem for our society.", "Ô nhiễm là một vấn đề lớn đối với xã hội của chúng ta.", ["issue"], ["solution"], ["solve a problem", "big problem"]),
      v("change", "/tʃeɪndʒ/", "/tʃeɪndʒ/", "to make something different", "thay đổi", "verb", "We want to change the laws to help the poor.", "Chúng tôi muốn thay đổi luật lệ để giúp đỡ người nghèo.", ["alter"], ["keep"], ["make a change", "change the law"]),
    ],
    B1: [
      v("poverty", "/ˈpɒvəti/", "/ˈpɑːvərti/", "the state of being extremely poor", "sự nghèo đói", "noun", "The government is working on new policies to reduce poverty in rural areas.", "Chính phủ đang thực hiện các chính sách mới để giảm nghèo ở các vùng nông thôn.", ["destitution", "penury"], ["wealth"], ["alleviate poverty", "extreme poverty"]),
      v("homeless", "/ˈhəʊmləs/", "/ˈhoʊmləs/", "without a home", "vô gia cư", "adjective", "Many charities provide food and shelter for homeless people during winter.", "Nhiều tổ chức từ thiện cung cấp thức ăn và nơi ở cho người vô gia cư trong mùa đông.", ["unsheltered", "displaced"], ["housed"], ["homeless people", "homeless shelter"]),
      v("discrimination", "/dɪˌskrɪmɪˈneɪʃn/", "/dɪˌskrɪmɪˈneɪʃn/", "unfair treatment of different categories of people", "sự phân biệt đối xử", "noun", "Laws exist to protect citizens against discrimination based on race or religion.", "Các đạo luật tồn tại để bảo vệ công dân chống lại sự phân biệt đối xử dựa trên chủng tộc hoặc tôn giáo.", ["prejudice", "bias"], [], ["face discrimination", "racial discrimination"]),
      v("unemployment", "/ˌʌnɪmˈplɔɪmənt/", "/ˌʌnɪmˈplɔɪmənt/", "the state of being unemployed", "tình trạng thất nghiệp", "noun", "High unemployment rates often lead to social instability.", "Tỷ lệ thất nghiệp cao thường dẫn đến mất ổn định xã hội.", ["joblessness"], ["employment"], ["high unemployment", "tackle unemployment"]),
      v("protest", "/ˈprəʊtest/", "/ˈproʊtest/", "a public expression of objection or disapproval", "cuộc biểu tình", "noun", "Students held a peaceful protest against the new tuition fees.", "Sinh viên đã tổ chức một cuộc biểu tình ôn hòa phản đối học phí mới.", ["demonstration", "rally"], [], ["hold a protest", "peaceful protest"]),
      v("justice", "/ˈdʒʌstɪs/", "/ˈdʒʌstɪs/", "fairness in the way people are dealt with", "công lý", "noun", "The community is demanding justice for the victims of the crime.", "Cộng đồng đang đòi công lý cho các nạn nhân của vụ án.", ["fairness", "equity"], ["injustice"], ["social justice", "serve justice"]),
      v("censor", "/ˈsensə(r)/", "/ˈsensər/", "to suppress unacceptable parts of something", "kiểm duyệt", "verb", "Some countries choose to censor the internet to control information.", "Một số quốc gia chọn kiểm duyệt internet để kiểm soát thông tin.", ["ban", "suppress"], [], ["censor information", "government censor"]),
      v("overcrowded", "/ˌəʊvəˈkraʊdɪd/", "/ˌoʊvərˈkraʊdɪd/", "having too many people or things in a space", "quá đông đúc", "adjective", "The city is struggling to manage its overcrowded public transport system.", "Thành phố đang chật vật quản lý hệ thống giao thông công cộng quá đông đúc của mình.", ["congested", "packed"], ["spacious"], ["overcrowded city", "overcrowded prison"]),
    ],
    B2: [
      v("inequality", "/ˌɪnɪˈkwɒləti/", "/ˌɪnɪˈkwɑːləti/", "the unfair situation in society when some people have more money or opportunities than others", "sự bất bình đẳng", "noun", "The government is implementing new policies to reduce social inequality.", "Chính phủ đang thực hiện các chính sách mới để giảm bớt sự bất bình đẳng xã hội.", ["disparity", "imbalance"], ["equality"], ["social inequality", "economic inequality"]),
      v("marginalize", "/ˈmɑːdʒɪnəlaɪz/", "/ˈmɑːrdʒɪnəlaɪz/", "to treat a person or group as if they are not important and cannot influence decisions", "gạt ra ngoài lề xã hội", "verb", "We must ensure that minority groups are not marginalized in our community.", "Chúng ta phải đảm bảo rằng các nhóm thiểu số không bị gạt ra ngoài lề xã hội trong cộng đồng của mình.", ["alienate", "side-line"], ["integrate"], ["marginalized groups", "socially marginalized"]),
      v("advocacy", "/ˈædvəkəsi/", "/ˈædvəkəsi/", "public support for or recommendation of a particular cause or policy", "sự ủng hộ, biện hộ", "noun", "Her advocacy for children's rights has led to significant legal reforms.", "Sự ủng hộ của cô ấy đối với quyền trẻ em đã dẫn đến những cải cách pháp lý quan trọng.", ["support", "campaigning"], [], ["strong advocacy", "advocacy group"]),
      v("segregation", "/ˌseɡrɪˈɡeɪʃn/", "/ˌseɡrɪˈɡeɪʃn/", "the action or state of setting someone or something apart from other people or things", "sự phân biệt chủng tộc, sự chia tách", "noun", "The country has worked hard to overcome its history of racial segregation.", "Đất nước này đã nỗ lực rất nhiều để vượt qua lịch sử chia tách chủng tộc của mình.", ["separation", "division"], ["integration"], ["racial segregation", "end segregation"]),
      v("vulnerable", "/ˈvʌlnərəbl/", "/ˈvʌlnərəbl/", "able to be easily physically, emotionally, or socially hurt, influenced, or attacked", "dễ bị tổn thương", "adjective", "The new welfare program specifically targets vulnerable families in the city.", "Chương trình phúc lợi mới nhắm mục tiêu cụ thể vào các gia đình dễ bị tổn thương trong thành phố.", ["defenseless", "susceptible"], ["resilient"], ["vulnerable groups", "highly vulnerable"]),
      v("empower", "/ɪmˈpaʊə(r)/", "/ɪmˈpaʊər/", "to give someone official authority or the freedom to do something", "trao quyền, nâng cao vị thế", "verb", "Education is intended to empower young people to improve their lives.", "Giáo dục nhằm mục đích trao quyền cho người trẻ để cải thiện cuộc sống của họ.", ["enable", "authorize"], ["disable"], ["empower citizens", "empower women"]),
    ],
    C1: [
      v("marginalization", "/ˌmɑːdʒɪnəlaɪˈzeɪʃn/", "/ˌmɑːrdʒɪnələˈzeɪʃn/", "the treatment of a person, group, or concept as insignificant or peripheral", "sự bị gạt ra ngoài lề xã hội", "noun", "The systemic marginalization of minority groups remains a critical challenge for modern democracy.", "Sự gạt ra ngoài lề xã hội một cách có hệ thống đối với các nhóm thiểu số vẫn là một thách thức quan trọng đối với nền dân chủ hiện đại.", ["exclusion", "alienation"], ["inclusion"], ["systemic marginalization", "social marginalization"]),
      v("disenfranchisement", "/ˌdɪsɪnˈfræntʃɪzmənt/", "/ˌdɪsɪnˈfræntʃaɪzmənt/", "the state of being deprived of a right or privilege, especially the right to vote", "sự tước quyền công dân", "noun", "Voter ID laws have led to the widespread disenfranchisement of low-income citizens.", "Các đạo luật về căn cước cử tri đã dẫn đến việc tước quyền bầu cử trên diện rộng đối với những công dân có thu nhập thấp.", ["deprivation", "disempowerment"], ["enfranchisement"], ["widespread disenfranchisement", "political disenfranchisement"]),
      v("stratification", "/ˌstrætɪfɪˈkeɪʃn/", "/ˌstrætɪfɪˈkeɪʃn/", "the arrangement or classification of something into different groups", "sự phân tầng xã hội", "noun", "Economic stratification has widened significantly over the last decade, leading to greater social tension.", "Sự phân tầng kinh tế đã nới rộng đáng kể trong thập kỷ qua, dẫn đến căng thẳng xã hội lớn hơn.", ["hierarchy", "grading"], [], ["social stratification", "economic stratification"]),
      v("mitigate", "/ˈmɪtɪɡeɪt/", "/ˈmɪtɪɡeɪt/", "to make something less severe, serious, or painful", "giảm nhẹ, làm dịu bớt", "verb", "The government implemented new policies to mitigate the effects of urban poverty.", "Chính phủ đã thực hiện các chính sách mới để giảm nhẹ tác động của nghèo đói đô thị.", ["alleviate", "assuage"], ["exacerbate"], ["mitigate risks", "mitigate impact"]),
      v("exacerbate", "/ɪɡˈzæsəbeɪt/", "/ɪɡˈzæsərbeɪt/", "to make a problem, bad situation, or negative feeling worse", "làm trầm trọng thêm", "verb", "Rising inflation will only exacerbate the struggles of families already living below the poverty line.", "Lạm phát gia tăng sẽ chỉ làm trầm trọng thêm những khó khăn của các gia đình vốn đã sống dưới mức nghèo khổ.", ["aggravate", "worsen"], ["mitigate"], ["exacerbate the situation", "exacerbate tension"]),
      v("disparity", "/dɪˈspærəti/", "/dɪˈspærəti/", "a great difference, especially one that is unfair", "sự chênh lệch, sự bất bình đẳng", "noun", "Addressing the growing disparity in healthcare access is a priority for the new health minister.", "Giải quyết sự chênh lệch ngày càng tăng trong việc tiếp cận dịch vụ chăm sóc sức khỏe là ưu tiên của tân bộ trưởng y tế.", ["imbalance", "inequality"], ["parity"], ["economic disparity", "wide disparity"]),
      v("stigma", "/ˈstɪɡmə/", "/ˈstɪɡmə/", "a mark of disgrace associated with a particular circumstance, quality, or person", "sự kỳ thị, vết nhơ", "noun", "We must work to reduce the social stigma surrounding mental health issues.", "Chúng ta phải nỗ lực để giảm bớt sự kỳ thị của xã hội đối với các vấn đề sức khỏe tâm thần.", ["shame", "disgrace"], [], ["social stigma", "attached to the stigma"]),
      v("systemic", "/sɪˈstemiːk/", "/sɪˈstemiːk/", "relating to a system, especially as opposed to a particular part", "có tính hệ thống", "adjective", "The report highlights systemic failures in the education department that have persisted for years.", "Báo cáo nhấn mạnh những thất bại mang tính hệ thống trong bộ giáo dục đã tồn tại nhiều năm nay.", ["structural", "institutional"], [], ["systemic failure", "systemic racism"]),
    ],
    C2: [
      v("egalitarian", "/iˌɡæl.ɪˈteə.ri.ən/", "/iˌɡæl.əˈter.i.ən/", "Believing in or based on the principle that all people are equal", "Bình đẳng xã hội", "adjective", "The constitution was drafted with the goal of fostering a more egalitarian society.", "Hiến pháp được soạn thảo với mục tiêu thúc đẩy một xã hội bình đẳng hơn.", ["impartial", "democratic"], ["elitist"], ["egalitarian society", "egalitarian ideals"]),
      v("precarious", "/prɪˈkeə.ri.əs/", "/prɪˈker.i.əs/", "Not securely held or in position; dangerously likely to fall or collapse", "Bấp bênh, không chắc chắn", "adjective", "Many gig economy workers live in a precarious financial state with no job security.", "Nhiều lao động trong nền kinh tế gig sống trong tình trạng tài chính bấp bênh mà không có sự đảm bảo công việc.", ["unstable", "insecure"], ["secure"], ["precarious existence", "precarious employment"]),
      v("neoliberalism", "/ˌniː.əʊˈlɪb.ər.əl.ɪ.zəm/", "/ˌniː.oʊˈlɪb.ɚ.əl.ɪ.zəm/", "A political approach that favors free-market capitalism, deregulation, and reduction in government spending", "Chủ nghĩa tân tự do", "noun", "Critics argue that neoliberalism has widened the wealth gap significantly over the last few decades.", "Các nhà phê bình lập luận rằng chủ nghĩa tân tự do đã nới rộng khoảng cách giàu nghèo đáng kể trong vài thập kỷ qua.", ["laissez-faire capitalism", "market fundamentalism"], [], ["neoliberal policies", "rise of neoliberalism"]),
      v("xenophobia", "/ˌzen.əˈfəʊ.bi.ə/", "/ˌzen.əˈfoʊ.bi.ə/", "Dislike of or prejudice against people from other countries", "Nỗi sợ hãi hoặc kỳ thị người nước ngoài", "noun", "Economic instability often serves as a catalyst for rising xenophobia in diverse urban centers.", "Sự bất ổn kinh tế thường đóng vai trò là chất xúc tác cho sự gia tăng kỳ thị người nước ngoài tại các trung tâm đô thị đa dạng.", ["racism", "jingoism"], ["tolerance"], ["rising xenophobia", "combat xenophobia"]),
    ],
  },
};


// Seed function
async function seedVocab() {
  console.log("🌱 Seeding Vocabulary Data - Law & Society...");

  // Get or create topic group
  const topicGroup = await prisma.topicGroup.upsert({
    where: { name_hubType: { name: "Law & Society", hubType: "vocab" } },
    update: {},
    create: {
      name: "Law & Society",
      order: 10,
      hubType: "vocab",
      subcategories: [
        "Crime & Justice",
        "Government",
        "Rights & Duties",
        "Social Issues",
      ],
    },
  });

  // Helper to slugify
  const slugify = (text: string) => text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

  // Iterate over subcategories
  for (const [subcat, levelsData] of Object.entries(lawandsocietyVocab)) {
    console.log(`Processing Subcategory: ${subcat}`);

    for (const [level, vocabItems] of Object.entries(levelsData)) {
      const currentLevel = level as Level;
      const items = vocabItems as ReturnType<typeof v>[];

      if (!items || items.length === 0) continue;

      const topicId = `law-and-society-${slugify(subcat)}-${currentLevel.toLowerCase()}`;

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
          category: "Law & Society",
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

  console.log("✅ Law & Society seeded successfully!");
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
