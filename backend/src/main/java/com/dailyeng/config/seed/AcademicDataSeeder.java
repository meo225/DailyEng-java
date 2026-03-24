package com.dailyeng.config.seed;

import com.dailyeng.speaking.SpeakingScenario;
import com.dailyeng.vocabulary.TopicGroup;
import com.dailyeng.common.enums.HubType;
import com.dailyeng.common.enums.Level;
import com.dailyeng.speaking.SpeakingScenarioRepository;
import com.dailyeng.vocabulary.TopicGroupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Component
@Order(3)
@Profile("!test")
@RequiredArgsConstructor
public class AcademicDataSeeder implements CommandLineRunner {

        private final TopicGroupRepository topicGroupRepo;
        private final SpeakingScenarioRepository scenarioRepo;

        @Override
        @Transactional
        public void run(String... args) {
                var existingGroups = topicGroupRepo.findByHubTypeAndLanguageOrderByOrderAsc("speaking", "en");
                boolean alreadyExists = existingGroups.stream()
                                .anyMatch(g -> "academic".equalsIgnoreCase(g.getName()));
                if (alreadyExists) {
                        log.info("✅ Academic topic group already exists — skipping seed");
                        return;
                }

                log.info("🌱 Seeding Academic topic group and scenarios...");

                var topicGroup = TopicGroup.builder()
                                .name("academic")
                                .hubType(HubType.speaking)
                                .order(2)
                                .subcategories(List.of("lectures", "discussions", "research", "presentations"))
                                .build();
                topicGroupRepo.save(topicGroup);

                String groupId = topicGroup.getId();
                String category = "academic";

                seedLectures(groupId, category);
                seedDiscussions(groupId, category);
                seedResearch(groupId, category);
                seedPresentations(groupId, category);

                log.info("✅ Seeded Academic: 1 topic group + 24 scenarios");
        }

        private void seedLectures(String groupId, String category) {
                String sub = "lectures";

                save(groupId, category, sub, Level.A1,
                                "Classroom Questions",
                                "Ask simple questions in class",
                                "Ask a question in class",
                                "You are in a class and don\'t understand something. You want to ask the teacher a question.",
                                "Student", "Teacher",
                                "Does everyone understand so far? Any questions before we continue?",
                                List.of("Get the teacher\'s attention", "Ask your question", "Understand the answer",
                                                "Say thank you"));

                save(groupId, category, sub, Level.A2,
                                "Lecture Clarification",
                                "Ask for clarification during a lecture",
                                "Get clarification on lecture content",
                                "You\'re in a university lecture and some parts are unclear. You need to ask the lecturer to explain further.",
                                "Student", "Lecturer",
                                "We\'ve covered the main theories today. I\'ll take a few questions now if anything needs clarification.",
                                List.of("Ask about unclear concepts", "Request examples", "Take notes on explanations",
                                                "Confirm understanding"));

                save(groupId, category, sub, Level.B1,
                                "Office Hours Discussion",
                                "Discuss course material in office hours",
                                "Get help understanding course material",
                                "You\'re visiting your professor during office hours to discuss a topic from the lectures that you find confusing.",
                                "Student", "Professor",
                                "Welcome! I\'m glad you came by. What topic from the lectures would you like to discuss?",
                                List.of("Explain what\'s confusing you", "Ask specific questions",
                                                "Request additional resources", "Plan your study approach"));

                save(groupId, category, sub, Level.B2,
                                "Seminar Participation",
                                "Actively participate in an academic seminar",
                                "Participate meaningfully in academic discussion",
                                "You\'re in a graduate seminar where active participation is expected. You need to engage with the material and contribute to discussion.",
                                "Graduate Student", "Seminar Leader",
                                "Based on this week\'s readings, I\'d like us to examine the tension between the two theoretical frameworks. Who would like to start us off with their analysis?",
                                List.of("Present your interpretation of readings", "Engage with others\' viewpoints",
                                                "Raise thoughtful questions", "Connect concepts across texts"));

                save(groupId, category, sub, Level.C1,
                                "Guest Lecture Q&A",
                                "Engage with a visiting scholar",
                                "Ask a sophisticated question of a visiting scholar",
                                "A distinguished visiting scholar has just finished their lecture. You want to ask an insightful question that demonstrates your engagement with their research.",
                                "Doctoral Student", "Distinguished Visiting Scholar",
                                "Thank you for your attention during my talk. I\'m happy to take questions about the research or any points you\'d like me to elaborate on.",
                                List.of("Frame a research-level question", "Connect to your own work",
                                                "Engage with methodological choices", "Follow up on their response"));

                save(groupId, category, sub, Level.C2,
                                "Academic Debate",
                                "Engage in scholarly debate on contested topics",
                                "Engage in rigorous academic debate",
                                "You\'re participating in an academic debate on a contested issue in your field. You need to articulate and defend your position against a scholar with opposing views.",
                                "Academic Debater", "Opposing Scholar",
                                "I\'ve read your recent publication challenging the established paradigm in our field. I find your evidence selective and your conclusions premature. Perhaps you can defend your methodology?",
                                List.of("Articulate a nuanced position", "Engage critically with opposing arguments",
                                                "Use evidence effectively", "Maintain scholarly discourse norms"));

        }

        private void seedDiscussions(String groupId, String category) {
                String sub = "discussions";

                save(groupId, category, sub, Level.A1,
                                "Classroom Discussion",
                                "Share simple opinions in class",
                                "Share your opinion in class",
                                "Your teacher asks students to share their opinions about a simple topic. You need to say what you think.",
                                "Student", "Teacher",
                                "Today we\'re talking about favorite hobbies. What do you like to do in your free time?",
                                List.of("Say your opinion", "Give a reason", "Listen to others", "Respond simply"));

                save(groupId, category, sub, Level.A2,
                                "Group Project Discussion",
                                "Discuss ideas for a group project",
                                "Contribute to group decision-making",
                                "You\'re in a group project meeting with classmates. You need to share ideas and decide on a topic together.",
                                "Group Member", "Group Leader",
                                "We need to choose a topic for our project. Does anyone have ideas they want to share?",
                                List.of("Share your ideas", "Listen to others\' ideas", "Ask questions",
                                                "Help make a decision"));

                save(groupId, category, sub, Level.B1,
                                "Study Group Session",
                                "Discuss course material in a study group",
                                "Learn through discussion and explanation",
                                "You\'re in a study group preparing for an exam. You need to explain concepts to friends and learn from their explanations too.",
                                "Study Group Member", "Study Partner",
                                "Let\'s review the main topics for the exam. Which areas do you feel confident about, and which ones should we focus on?",
                                List.of("Explain concepts you understand", "Ask about confusing topics",
                                                "Practice explaining ideas", "Help test each other"));

                save(groupId, category, sub, Level.B2,
                                "Tutorial Discussion",
                                "Participate in a university tutorial",
                                "Demonstrate analytical engagement with readings",
                                "You\'re in a tutorial session where the tutor facilitates discussion of weekly readings. Students are expected to share prepared analyses.",
                                "Tutorial Student", "Tutor",
                                "For today\'s discussion, I\'d like us to critically examine the author\'s methodology. What strengths and limitations did you identify in their approach?",
                                List.of("Present your reading analysis", "Compare interpretations",
                                                "Build on others\' contributions", "Ask probing questions"));

                save(groupId, category, sub, Level.C1,
                                "Research Group Meeting",
                                "Participate in a research group discussion",
                                "Receive and respond to academic feedback",
                                "You\'re presenting your work-in-progress to your research group. Colleagues will ask questions and provide feedback on your methodology and findings.",
                                "Research Student", "Senior Researcher",
                                "Thank you for presenting your preliminary findings. I have some questions about your sample selection. Can you walk us through your rationale?",
                                List.of("Present work clearly and concisely", "Receive feedback constructively",
                                                "Defend methodological choices",
                                                "Incorporate suggestions appropriately"));

                save(groupId, category, sub, Level.C2,
                                "Interdisciplinary Roundtable",
                                "Facilitate interdisciplinary academic discussion",
                                "Facilitate productive interdisciplinary dialogue",
                                "You\'re moderating a roundtable bringing together scholars from different disciplines to address a complex contemporary issue. Different methodological approaches and assumptions need bridging.",
                                "Discussion Moderator", "Distinguished Panelist",
                                "Your introduction raised fascinating points about translating concepts across disciplines. However, I\'m skeptical that our methodological assumptions are commensurable. How do you propose we bridge these fundamental differences?",
                                List.of("Bridge disciplinary languages", "Identify common ground",
                                                "Surface productive tensions",
                                                "Synthesize insights across perspectives"));

        }

        private void seedResearch(String groupId, String category) {
                String sub = "research";

                save(groupId, category, sub, Level.A1,
                                "Library Help",
                                "Ask for help at a library",
                                "Find a book with help",
                                "You are at a library and need help finding a book. The librarian can help you.",
                                "Library User", "Librarian",
                                "Hello! Welcome to the library. How can I help you today?",
                                List.of("Ask where to find books", "Say what topic you need",
                                                "Understand the directions", "Thank the librarian"));

                save(groupId, category, sub, Level.A2,
                                "Research Resources",
                                "Ask about research resources",
                                "Learn how to find research sources",
                                "You need to write a research paper and aren\'t sure how to find good sources. You\'re asking a librarian for help.",
                                "Student Researcher", "Research Librarian",
                                "I understand you\'re working on a research paper. What\'s your topic, and what kind of sources are you looking for?",
                                List.of("Explain your research topic", "Ask about databases", "Learn how to search",
                                                "Get recommendations"));

                save(groupId, category, sub, Level.B1,
                                "Research Proposal Discussion",
                                "Discuss your research proposal with an advisor",
                                "Get feedback on your research proposal",
                                "You\'re meeting with your academic advisor to discuss your research proposal. You need to explain your research question and methodology.",
                                "Student", "Academic Advisor",
                                "I\'ve had a chance to look at your proposal outline. Tell me more about what\'s driving your research question and how you plan to approach it.",
                                List.of("Present your research question", "Explain your methodology",
                                                "Discuss potential challenges", "Incorporate advisor\'s feedback"));

                save(groupId, category, sub, Level.B2,
                                "Data Collection Discussion",
                                "Discuss research data collection methods",
                                "Resolve data collection challenges",
                                "You\'re meeting with your supervisor to discuss challenges with your data collection. You need to explain problems and propose solutions.",
                                "Research Student", "Research Supervisor",
                                "Your update mentioned some challenges with data collection. Walk me through what\'s happening and what you\'ve tried so far.",
                                List.of("Describe data collection issues", "Analyze possible causes",
                                                "Propose solutions", "Discuss implications for research"));

                save(groupId, category, sub, Level.C1,
                                "Thesis Defense Preparation",
                                "Prepare for thesis defense questions",
                                "Successfully defend research decisions",
                                "You\'re preparing for your thesis defense with your supervisor playing the role of critical examiner. You need to defend your research decisions and findings.",
                                "Thesis Candidate", "Mock Examiner",
                                "Let\'s do a mock defense. I\'ll ask you difficult questions your examiners might raise. First, convince me why your research question matters to the field.",
                                List.of("Articulate research contribution clearly", "Defend methodological choices",
                                                "Address limitations honestly", "Respond to challenging questions"));

                save(groupId, category, sub, Level.C2,
                                "Research Ethics Review",
                                "Navigate complex research ethics discussions",
                                "Navigate complex research ethics approval",
                                "You\'re meeting with the research ethics committee to discuss your research involving vulnerable populations. Complex ethical considerations need to be addressed.",
                                "Principal Investigator", "Ethics Committee Chair",
                                "Your proposed research raises significant ethical considerations given the vulnerable population. The committee has concerns about informed consent procedures. How do you propose to ensure participants truly understand what they\'re consenting to?",
                                List.of("Demonstrate ethical awareness", "Address committee concerns thoroughly",
                                                "Propose robust safeguards",
                                                "Balance research value with ethical protection"));

        }

        private void seedPresentations(String groupId, String category) {
                String sub = "presentations";

                save(groupId, category, sub, Level.A1,
                                "Show and Tell",
                                "Present something simple to your class",
                                "Present something simple to the class",
                                "You need to show something to your class and talk about it. It can be a picture, object, or simple topic.",
                                "Presenter", "Teacher",
                                "It\'s your turn to present. What did you bring to show us today?",
                                List.of("Show your item", "Describe it simply", "Answer one question",
                                                "Thank the class"));

                save(groupId, category, sub, Level.A2,
                                "Class Presentation",
                                "Give a short presentation on a topic",
                                "Complete a short class presentation",
                                "You need to give a 5-minute presentation about a topic you researched. Your classmates and teacher are your audience.",
                                "Student Presenter", "Classmate",
                                "We\'re ready to hear your presentation. Please start whenever you\'re ready!",
                                List.of("Introduce your topic", "Share main information", "Use visual aids",
                                                "Answer simple questions"));

                save(groupId, category, sub, Level.B1,
                                "Group Project Presentation",
                                "Present group project findings",
                                "Successfully present group project work",
                                "Your group has completed a project and you need to present your part of the findings to the class and answer questions.",
                                "Group Presenter", "Course Instructor",
                                "Your group has done interesting work. Please present your findings and be prepared for questions.",
                                List.of("Explain your contribution clearly", "Connect to overall project",
                                                "Use evidence effectively", "Handle audience questions"));

                save(groupId, category, sub, Level.B2,
                                "Literature Review Presentation",
                                "Present a literature review to your seminar",
                                "Deliver a scholarly literature review",
                                "You\'re presenting a critical review of literature on a topic to your graduate seminar. You need to synthesize multiple sources and provide critical analysis.",
                                "Graduate Student", "Seminar Professor",
                                "Please proceed with your literature review. The seminar is particularly interested in how you\'ve synthesized the competing perspectives in this area.",
                                List.of("Synthesize multiple sources", "Identify themes and gaps",
                                                "Provide critical analysis", "Connect to research questions"));

                save(groupId, category, sub, Level.C1,
                                "Conference Paper Presentation",
                                "Present research at an academic conference",
                                "Successfully present research to academic peers",
                                "You\'re presenting your research paper at an academic conference. The audience includes experts who will ask challenging questions about your methodology and conclusions.",
                                "Conference Presenter", "Session Discussant",
                                "Thank you for that interesting presentation. As the discussant, I have some questions about your theoretical framework and how it shapes your interpretation of the data.",
                                List.of("Communicate complex ideas accessibly", "Demonstrate scholarly rigor",
                                                "Handle expert questioning", "Position contribution to field"));

                save(groupId, category, sub, Level.C2,
                                "Job Talk Presentation",
                                "Deliver an academic job talk",
                                "Deliver a compelling academic job talk",
                                "You\'re giving a job talk as part of a faculty hiring process. You must present your research, demonstrate teaching ability, and convey your vision for future scholarship.",
                                "Faculty Candidate", "Search Committee Chair",
                                "Welcome to our department. We\'re excited to hear about your research. After your presentation, the committee will have questions about both your scholarship and how you see yourself contributing to our department\'s mission.",
                                List.of("Present research program compellingly", "Demonstrate pedagogical vision",
                                                "Articulate future research directions",
                                                "Navigate committee dynamics"));

        }

        private void save(String groupId, String category, String subcategory, Level level,
                        String title, String description, String goal, String context,
                        String userRole, String botRole, String openingLine, List<String> objectives) {
                var scenario = SpeakingScenario.builder()
                                .topicGroupId(groupId)
                                .category(category)
                                .subcategory(subcategory)
                                .difficulty(level)
                                .title(title)
                                .description(description)
                                .goal(goal)
                                .context(context)
                                .userRole(userRole)
                                .botRole(botRole)
                                .openingLine(openingLine)
                                .objectives(objectives)
                                .image("/learning.png")
                                .isCustom(false)
                                .build();
                scenarioRepo.save(scenario);
        }
}
