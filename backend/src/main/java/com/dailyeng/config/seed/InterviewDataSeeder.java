package com.dailyeng.config.seed;

import com.dailyeng.entity.SpeakingScenario;
import com.dailyeng.entity.TopicGroup;
import com.dailyeng.entity.enums.HubType;
import com.dailyeng.entity.enums.Level;
import com.dailyeng.repository.SpeakingScenarioRepository;
import com.dailyeng.repository.TopicGroupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Seeds the database with Interview Practice speaking scenarios on first startup.
 * Idempotent — skips if the "interview practice" TopicGroup already exists.
 * Disabled in test profile — test DB does not have schema from Flyway migrations.
 */
@Slf4j
@Component
@Order(10)
@Profile("!test")
@RequiredArgsConstructor
public class InterviewDataSeeder implements CommandLineRunner {

    private final TopicGroupRepository topicGroupRepo;
    private final SpeakingScenarioRepository scenarioRepo;

    @Override
    @Transactional
    public void run(String... args) {
        // Idempotent check: skip if already seeded
        var existingGroups = topicGroupRepo.findByHubTypeOrderByOrderAsc("speaking");
        boolean alreadyExists = existingGroups.stream()
                .anyMatch(g -> "interview practice".equalsIgnoreCase(g.getName()));
        if (alreadyExists) {
            log.info("✅ Interview Practice topic group already exists — skipping seed");
            return;
        }

        log.info("🌱 Seeding Interview Practice topic group and scenarios...");

        // 1. Create TopicGroup
        var topicGroup = TopicGroup.builder()
                .name("interview practice")
                .hubType(HubType.speaking)
                .order(7)  // After the 6 existing groups
                .subcategories(List.of(
                        "self introduction",
                        "behavioral",
                        "technical",
                        "salary & negotiation",
                        "case & situational"
                ))
                .build();
        topicGroupRepo.save(topicGroup);

        String groupId = topicGroup.getId();
        String category = "interview practice";

        // 2. Seed scenarios — 5 subcategories × 6 CEFR levels = 30 scenarios
        seedSelfIntroduction(groupId, category);
        seedBehavioral(groupId, category);
        seedTechnical(groupId, category);
        seedSalaryNegotiation(groupId, category);
        seedCaseSituational(groupId, category);

        log.info("✅ Seeded Interview Practice: 1 topic group + 30 scenarios");
    }

    // ─── Self Introduction ──────────────────────────────

    private void seedSelfIntroduction(String groupId, String category) {
        String sub = "self introduction";

        save(groupId, category, sub, Level.A1,
                "Saying Hello at an Interview",
                "Practice a simple self-introduction using basic greetings and your name.",
                "Greet the interviewer and introduce yourself with simple sentences.",
                "You are at a job interview. The interviewer says hello and asks your name. Tell them your name and what job you want.",
                "Job Candidate", "Friendly Interviewer",
                "Hello! Welcome to our company. What is your name?",
                List.of("Say your name clearly", "Tell what job you want", "Use simple present tense"));

        save(groupId, category, sub, Level.A2,
                "Tell Me About Yourself",
                "Introduce yourself with basic information about your background and interests.",
                "Share your name, job, and a few details about your experience.",
                "You are meeting the interviewer for the first time. They want to know about your background. Tell them your name, your current job, and why you are interested in this position.",
                "Job Applicant", "HR Interviewer",
                "Good morning! Please have a seat. Can you tell me a little about yourself?",
                List.of("Share your name and current job", "Mention one reason for applying", "Use past and present tenses"));

        save(groupId, category, sub, Level.B1,
                "Your Professional Story",
                "Present a clear summary of your career journey and motivation.",
                "Deliver a structured self-introduction covering education, experience, and goals.",
                "You are in a formal interview. The interviewer asks you to introduce yourself. Give a brief summary of your education, work experience, and why you are excited about this role.",
                "Professional Candidate", "Hiring Manager",
                "Thank you for coming in today. Let's start — could you walk me through your background?",
                List.of("Structure your introduction logically", "Mention education and work history", "Express enthusiasm for the role"));

        save(groupId, category, sub, Level.B2,
                "Why This Company?",
                "Explain your motivation for applying to a specific company with compelling reasons.",
                "Articulate why this company and role align with your career goals.",
                "The interviewer wants to know why you chose to apply here specifically, not just any company. You need to show that you researched the company and explain how your values and goals align.",
                "Motivated Candidate", "Senior Interviewer",
                "We have many applicants. What specifically attracted you to our company?",
                List.of("Reference specific company values or projects", "Connect your experience to their mission", "Show genuine enthusiasm"));

        save(groupId, category, sub, Level.C1,
                "The Executive Elevator Pitch",
                "Craft a polished, concise personal pitch for senior-level positions.",
                "Deliver a compelling 60-second elevator pitch showcasing leadership and impact.",
                "You are interviewing for a senior position. The panel asks you to give a concise overview of who you are and what you bring to the table. You need to balance brevity with substance, highlighting key achievements and leadership qualities.",
                "Senior Professional", "Interview Panel Lead",
                "Before we dive into specifics, give us a brief overview — who are you and what drives you professionally?",
                List.of("Deliver a concise yet impactful pitch", "Highlight leadership achievements", "Use sophisticated vocabulary naturally"));

        save(groupId, category, sub, Level.C2,
                "Navigating the 'Weakness' Question",
                "Handle the classic 'greatest weakness' question with authenticity and strategy.",
                "Turn a potentially negative question into a demonstration of self-awareness and growth.",
                "An experienced interviewer asks about your greatest weakness. This is a nuanced question — they want authenticity, not a disguised strength. You need to show genuine self-awareness, describe how the weakness manifested, and demonstrate concrete steps you have taken to address it.",
                "Executive Candidate", "Chief People Officer",
                "We appreciate honesty here. What would you say is your greatest professional weakness, and how has it affected your work?",
                List.of("Show genuine self-awareness", "Describe specific growth actions", "Demonstrate mature professional reflection"));
    }

    // ─── Behavioral ─────────────────────────────────────

    private void seedBehavioral(String groupId, String category) {
        String sub = "behavioral";

        save(groupId, category, sub, Level.A1,
                "Working with Others",
                "Describe a simple experience of working with a teammate using basic sentences.",
                "Talk about a time you worked with someone and how it went.",
                "The interviewer asks you about working with other people. Think of a simple time when you worked with a friend or a classmate. Tell them what happened using simple words.",
                "Job Candidate", "Friendly Interviewer",
                "Do you like working with other people? Can you tell me about a time you worked with someone?",
                List.of("Describe a simple teamwork experience", "Use past tense verbs", "Say if it was good or bad"));

        save(groupId, category, sub, Level.A2,
                "A Problem You Solved",
                "Tell a short story about fixing a problem at school or work.",
                "Describe a problem, what you did, and the result.",
                "The interviewer wants to hear about a problem you had at work or school. Think of a time something went wrong and you helped fix it. Tell them about the situation, what you did, and what happened after.",
                "Job Applicant", "HR Manager",
                "Everyone faces problems sometimes. Can you tell me about a time you solved a problem?",
                List.of("Describe the problem clearly", "Explain what actions you took", "Share the result"));

        save(groupId, category, sub, Level.B1,
                "Overcoming a Challenge",
                "Share a work challenge you overcame using the STAR method framework.",
                "Structure a story about facing and overcoming a significant challenge.",
                "The interviewer wants to understand how you handle difficulties. Use the STAR method: describe the Situation, the Task you needed to accomplish, the Action you took, and the Result. Choose a real challenge from your experience.",
                "Professional Candidate", "Team Lead Interviewer",
                "Tell me about a time you faced a significant challenge at work. How did you handle it?",
                List.of("Use the STAR method structure", "Be specific about your actions", "Quantify the result if possible"));

        save(groupId, category, sub, Level.B2,
                "Resolving a Conflict",
                "Navigate a behavioral question about handling disagreements with diplomacy.",
                "Demonstrate conflict resolution skills through a well-structured story.",
                "The interviewer asks about a conflict with a colleague. This is a common behavioral question to test your interpersonal skills. You need to show that you can disagree professionally, find common ground, and maintain working relationships.",
                "Experienced Professional", "Department Manager",
                "Tell me about a time you disagreed with a coworker on a project decision. How did you resolve it?",
                List.of("Show empathy and active listening", "Describe a constructive resolution", "Highlight the positive outcome"));

        save(groupId, category, sub, Level.C1,
                "Leading Through Failure",
                "Discuss a professional failure with nuance, showing leadership and learning.",
                "Demonstrate accountability and growth from a significant setback.",
                "The interviewer wants to hear about a time a project you led did not succeed. They are looking for self-awareness, accountability, and the ability to extract lessons from failure. Avoid blaming others — focus on what you learned and how it made you a better leader.",
                "Senior Leader Candidate", "VP of Engineering",
                "We value transparency here. Tell me about a project you led that failed. What happened, and what did you take away from it?",
                List.of("Show accountability without deflecting blame", "Describe specific lessons learned", "Explain how it changed your approach"));

        save(groupId, category, sub, Level.C2,
                "Influencing Without Authority",
                "Articulate a complex story about cross-functional influence and strategic persuasion.",
                "Demonstrate sophisticated stakeholder management and influence skills.",
                "The interviewer probes your ability to drive change across organizational boundaries without formal authority. This requires illustrating political acumen, coalition-building, and the ability to align diverse stakeholders around a common vision through persuasion rather than hierarchy.",
                "Director-Level Candidate", "C-Suite Interviewer",
                "Describe a situation where you had to drive a significant organizational change without having direct authority over the people involved. How did you navigate that?",
                List.of("Illustrate strategic stakeholder mapping", "Demonstrate coalition-building skills", "Show sophisticated communication and persuasion"));
    }

    // ─── Technical ──────────────────────────────────────

    private void seedTechnical(String groupId, String category) {
        String sub = "technical";

        save(groupId, category, sub, Level.A1,
                "What Tools Do You Use?",
                "Talk about basic tools and programs you use at work or school.",
                "Name and describe simple tools or computer programs you use.",
                "The interviewer asks what computer programs or tools you know. Think about what you use every day — like email, Word, or other simple programs. Tell them what you use and what you do with it.",
                "Job Candidate", "IT Support Interviewer",
                "What computer programs do you use? Can you tell me about them?",
                List.of("Name 2-3 tools you use", "Describe what you do with each one", "Use simple present tense"));

        save(groupId, category, sub, Level.A2,
                "Describing Your Skills",
                "Explain your technical skills with examples of how you use them.",
                "List your relevant skills and give simple examples.",
                "The interviewer wants to know about your technical skills. Think about things you are good at — using software, fixing things, or creating documents. Explain each skill and give a short example of how you used it.",
                "Skilled Applicant", "Technical Recruiter",
                "What technical skills do you have? Can you give me some examples?",
                List.of("List 2-3 relevant skills", "Give a brief example for each", "Use past tense for examples"));

        save(groupId, category, sub, Level.B1,
                "Explaining a Project",
                "Walk through a technical project you worked on, explaining your role clearly.",
                "Describe a project's goal, your contribution, and the technologies used.",
                "The interviewer asks about a recent project. Explain what the project was about, what technologies or methods you used, what your specific role was, and what the outcome was. Keep it clear and avoid too much jargon.",
                "Technical Professional", "Engineering Manager",
                "Could you walk me through a recent project you worked on? What was your role and what technologies did you use?",
                List.of("Explain the project goal clearly", "Describe your specific contribution", "Mention technologies used"));

        save(groupId, category, sub, Level.B2,
                "Debugging Under Pressure",
                "Discuss your approach to solving a critical technical issue with limited time.",
                "Demonstrate systematic problem-solving and composure under pressure.",
                "The interviewer describes a scenario where a production system is failing and you need to explain your debugging methodology. Show that you can think systematically, prioritize, and communicate your thought process clearly even under pressure.",
                "Software Engineer Candidate", "Senior Developer",
                "Imagine our main service goes down during peak hours. Walk me through how you would approach diagnosing and fixing the issue.",
                List.of("Demonstrate systematic debugging approach", "Show calm prioritization under pressure", "Explain monitoring and verification steps"));

        save(groupId, category, sub, Level.C1,
                "Architecture Decision Trade-offs",
                "Discuss complex technical trade-offs in system design with nuanced reasoning.",
                "Articulate architectural decisions with clear rationale for each trade-off.",
                "The interviewer presents an open-ended system design question. You need to discuss trade-offs between different architectural approaches — such as monolith vs. microservices, SQL vs. NoSQL, or synchronous vs. asynchronous processing. Show depth of understanding and the ability to reason about constraints.",
                "Senior Engineer Candidate", "Principal Architect",
                "We are building a real-time data pipeline that needs to handle 100K events per second. How would you approach the architecture? Walk me through your decision-making process.",
                List.of("Identify key architectural constraints", "Discuss trade-offs between approaches", "Justify decisions with technical reasoning"));

        save(groupId, category, sub, Level.C2,
                "Defending Your Technical Vision",
                "Present and defend a controversial technical decision to a skeptical audience.",
                "Articulate a sophisticated technical position with compelling evidence.",
                "You are presenting a major technical initiative that goes against conventional wisdom in the organization — for example, rewriting a critical system, adopting an unconventional technology stack, or fundamentally changing the development process. The interviewer challenges your assumptions and pushes back on every point.",
                "Staff Engineer Candidate", "CTO",
                "You mentioned you would rewrite our core platform from scratch. Our team thinks that is extremely risky. Convince me why this is the right call and how you would mitigate the risks.",
                List.of("Present a compelling technical argument", "Address counterarguments proactively", "Demonstrate strategic thinking beyond pure technology"));
    }

    // ─── Salary & Negotiation ───────────────────────────

    private void seedSalaryNegotiation(String groupId, String category) {
        String sub = "salary & negotiation";

        save(groupId, category, sub, Level.A1,
                "How Much Money?",
                "Learn basic vocabulary for talking about salary and money at work.",
                "Understand and use simple words about pay and work hours.",
                "The interviewer asks about money. You need to know simple words like salary, pay, full-time, and part-time. Practice answering simple questions about what you need.",
                "Job Candidate", "Office Manager",
                "This job pays $15 per hour. Is that okay for you? What hours can you work?",
                List.of("Understand basic salary vocabulary", "Answer yes/no questions about pay", "Use numbers to talk about hours"));

        save(groupId, category, sub, Level.A2,
                "Your Salary Expectations",
                "Express basic salary expectations and ask simple questions about benefits.",
                "Tell the interviewer what salary you expect and ask about benefits.",
                "The interviewer asks how much money you want to earn. Think about a number that is fair. Also, you can ask about other things like vacation days, health insurance, and work hours.",
                "Job Applicant", "HR Coordinator",
                "Before we continue, can you tell me your salary expectations for this position?",
                List.of("State a salary range using numbers", "Ask about one or two benefits", "Use polite expressions like 'I would like'"));

        save(groupId, category, sub, Level.B1,
                "Discussing Compensation",
                "Navigate a compensation discussion with professionalism and preparation.",
                "Present your salary expectations with supporting reasons.",
                "The recruiter asks about your salary expectations during a phone screening. You need to give a reasonable range based on market research and your experience level. Be honest but strategic — do not give a number too early without understanding the full package.",
                "Professional Candidate", "Recruiter",
                "We would like to understand your compensation expectations. What salary range are you looking for?",
                List.of("Provide a researched salary range", "Mention factors that justify your range", "Ask about the full compensation package"));

        save(groupId, category, sub, Level.B2,
                "Negotiating an Offer",
                "Practice negotiating a job offer with confidence and specific counter-proposals.",
                "Counter-propose terms while maintaining a positive relationship.",
                "You have received a job offer, but the salary is 10% below your target. You want to negotiate without risking the offer. Prepare specific counter-arguments based on your experience, market data, and the value you bring. Be firm but collaborative.",
                "Selected Candidate", "Hiring Manager",
                "We are excited to offer you the position! The base salary would be $85,000 with standard benefits. How does that sound?",
                List.of("Express gratitude before negotiating", "Present data-backed counter-proposal", "Discuss total compensation, not just salary"));

        save(groupId, category, sub, Level.C1,
                "Complex Package Negotiation",
                "Negotiate a multi-component compensation package including equity and benefits.",
                "Strategically negotiate across salary, equity, signing bonus, and flexibility.",
                "You are negotiating a senior-level offer with multiple components: base salary, equity/RSUs, signing bonus, relocation, and remote work flexibility. The company has made an initial offer that is competitive but not exceptional. You need to prioritize your asks and negotiate each component strategically.",
                "Senior Professional", "VP of Talent",
                "Here is our offer: $150K base, 10K RSUs over 4 years, $5K signing bonus, and hybrid work. We believe this is a strong offer. What are your thoughts?",
                List.of("Prioritize negotiation points strategically", "Negotiate multiple components simultaneously", "Use precise professional language"));

        save(groupId, category, sub, Level.C2,
                "Executive Compensation Strategy",
                "Navigate executive-level compensation discussions with sophisticated business acumen.",
                "Demonstrate mastery of complex compensation structures and negotiation tactics.",
                "You are discussing executive compensation involving base salary, performance bonuses tied to KPIs, equity with complex vesting schedules, golden parachutes, and board observer rights. The discussion requires understanding of corporate finance concepts, tax implications, and long-term wealth building strategies.",
                "Executive Candidate", "Board Member",
                "We would like to discuss the compensation structure for this role. Given the company's current valuation and growth trajectory, how do you think about structuring your total compensation?",
                List.of("Demonstrate understanding of equity structures", "Discuss performance-linked incentives", "Navigate tax and vesting implications with fluency"));
    }

    // ─── Case & Situational ─────────────────────────────

    private void seedCaseSituational(String groupId, String category) {
        String sub = "case & situational";

        save(groupId, category, sub, Level.A1,
                "What Would You Do?",
                "Answer simple 'what would you do' questions about common work situations.",
                "Make simple choices in everyday work scenarios.",
                "The interviewer describes a simple situation at work and asks what you would do. Think about the right thing to do. Use simple words to explain your answer.",
                "Job Candidate", "Supervisor",
                "Imagine a customer is angry because their order is wrong. What do you do?",
                List.of("Understand the situation described", "Give a simple answer", "Use 'I would...' sentences"));

        save(groupId, category, sub, Level.A2,
                "Handling a Difficult Customer",
                "Practice responding to a scenario about an unhappy customer.",
                "Show empathy and offer simple solutions to a customer problem.",
                "The interviewer gives you a situation: a customer is unhappy with a product they bought. You need to listen to them, say sorry, and offer a solution. Practice using polite and helpful language.",
                "Customer Service Applicant", "Store Manager",
                "A customer comes to you and says the product they bought yesterday is broken. They are upset. What do you say and do?",
                List.of("Show empathy with polite phrases", "Offer a clear solution", "Use conditional tense for suggestions"));

        save(groupId, category, sub, Level.B1,
                "Priorities and Time Management",
                "Explain how you would prioritize tasks when everything seems urgent.",
                "Demonstrate decision-making and time management skills.",
                "The interviewer presents a scenario where you have three urgent tasks and only time to complete two. You need to explain your thought process for prioritizing, including how you would communicate with stakeholders about delays.",
                "Professional Candidate", "Project Manager",
                "You have three urgent tasks due by end of day, but you can realistically only finish two. How do you decide what to do first?",
                List.of("Explain your prioritization criteria", "Show communication about trade-offs", "Demonstrate practical decision-making"));

        save(groupId, category, sub, Level.B2,
                "Ethical Dilemma at Work",
                "Navigate a complex workplace ethical scenario with thoughtful reasoning.",
                "Demonstrate ethical thinking and professional judgment.",
                "The interviewer presents an ethical dilemma: you discover that a colleague has been taking credit for a junior team member's work. You need to think about the right course of action, considering relationships, company culture, and fairness. There is no single right answer — the interviewer wants to see your reasoning.",
                "Team Member Candidate", "Ethics Committee Member",
                "You notice that your colleague has been presenting a junior engineer's work as their own in team meetings. The junior engineer has mentioned it to you privately. What would you do?",
                List.of("Consider multiple stakeholders' perspectives", "Propose a thoughtful course of action", "Balance ethical principles with practical concerns"));

        save(groupId, category, sub, Level.C1,
                "Crisis Leadership Simulation",
                "Navigate a high-pressure crisis scenario demonstrating leadership under fire.",
                "Show strategic thinking, rapid decision-making, and stakeholder management during a crisis.",
                "The interviewer simulates a crisis: a major data breach has been discovered, affecting thousands of users. As the incident commander, you need to outline your response strategy covering technical containment, legal obligations, customer communication, and team coordination — all while managing executive expectations.",
                "Senior Manager Candidate", "Chief Information Security Officer",
                "We have just discovered that a database containing 50,000 user records was exposed through a misconfigured API endpoint. As incident commander, walk me through your first 60 minutes.",
                List.of("Demonstrate structured crisis response", "Balance speed with thoroughness", "Address multiple stakeholder groups simultaneously"));

        save(groupId, category, sub, Level.C2,
                "Strategic Business Case",
                "Build and defend a complex business case with financial and strategic analysis.",
                "Demonstrate executive-level strategic thinking and persuasive argumentation.",
                "The interviewer presents a complex strategic question: should the company enter a new market, acquire a competitor, or double down on the existing product? You need to analyze the situation from multiple angles — market dynamics, competitive landscape, financial implications, organizational readiness, and risk — and present a cogent, defensible recommendation.",
                "Strategy Director Candidate", "CEO",
                "Our board is debating whether to enter the Southeast Asian market, acquire our main European competitor, or invest heavily in AI capabilities for our existing product. We can only pursue one. What is your recommendation and why?",
                List.of("Analyze multiple strategic options rigorously", "Present a defensible recommendation with evidence", "Address risks and mitigation strategies for your chosen path"));
    }

    // ─── Helper ─────────────────────────────────────────

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
