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

@Slf4j
@Component
@Order(2)
@Profile("!test")
@RequiredArgsConstructor
public class ProfessionalEnglishDataSeeder implements CommandLineRunner {

    private final TopicGroupRepository topicGroupRepo;
    private final SpeakingScenarioRepository scenarioRepo;

    @Override
    @Transactional
    public void run(String... args) {
        var existingGroups = topicGroupRepo.findByHubTypeOrderByOrderAsc("speaking");
        boolean alreadyExists = existingGroups.stream()
                .anyMatch(g -> "professional english".equalsIgnoreCase(g.getName()));
        if (alreadyExists) {
            log.info("✅ ProfessionalEnglish topic group already exists — skipping seed");
            return;
        }

        log.info("🌱 Seeding ProfessionalEnglish topic group and scenarios...");

        var topicGroup = TopicGroup.builder()
                .name("professional english")
                .hubType(HubType.speaking)
                .order(1)
                .subcategories(List.of("meetings", "presentations", "negotiations", "interviews"))
                .build();
        topicGroupRepo.save(topicGroup);

        String groupId = topicGroup.getId();
        String category = "professional english";

        seedMeetings(groupId, category);
        seedPresentations(groupId, category);
        seedNegotiations(groupId, category);
        seedInterviews(groupId, category);

        log.info("✅ Seeded ProfessionalEnglish: 1 topic group + 24 scenarios");
    }

    private void seedMeetings(String groupId, String category) {
        String sub = "meetings";

        save(groupId, category, sub, Level.A1,
                "Team Introduction",
                "Introduce yourself in a team meeting",
                "Introduce yourself to your new colleagues",
                "It\'s your first day at a new job. You are in a meeting and need to introduce yourself to your new team.",
                "New Employee", "Team Manager",
                "Welcome to the team! We\'re happy to have you here. Please, tell us a little about yourself.",
                List.of("Say your name", "Say your job", "Say nice to meet everyone", "Answer simple questions"));

        save(groupId, category, sub, Level.A2,
                "Weekly Team Meeting",
                "Participate in a regular team meeting",
                "Share updates and understand next week\'s tasks",
                "You\'re in your weekly team meeting. You need to share what you worked on this week and ask about the schedule.",
                "Team Member", "Team Lead",
                "Good morning everyone! Let\'s start our weekly check-in. Who would like to share their updates first?",
                List.of("Share your weekly progress", "Ask questions about tasks", "Understand deadlines", "Offer to help teammates"));

        save(groupId, category, sub, Level.B1,
                "Project Status Meeting",
                "Report on project progress and challenges",
                "Deliver a clear project status update",
                "You\'re presenting your project status to stakeholders. You need to cover progress, challenges, and next steps clearly.",
                "Project Team Member", "Project Manager",
                "Thanks everyone for joining. Let\'s go around and hear updates on each workstream. Can you start us off with your area?",
                List.of("Summarize completed work", "Explain current challenges", "Propose solutions", "Outline next steps"));

        save(groupId, category, sub, Level.B2,
                "Cross-functional Meeting",
                "Collaborate with different departments",
                "Achieve alignment across departments",
                "You\'re in a meeting with colleagues from different departments to align on a company-wide initiative. Different perspectives and priorities need to be balanced.",
                "Department Representative", "Senior Manager",
                "Thank you all for making time for this cross-functional sync. We need to align our approaches before the quarterly review. Let\'s hear each department\'s perspective.",
                List.of("Present your department\'s perspective", "Understand others\' constraints", "Find common ground", "Agree on action items"));

        save(groupId, category, sub, Level.C1,
                "Strategic Planning Session",
                "Contribute to strategic planning discussions",
                "Contribute meaningful strategic insights",
                "You\'re part of a strategic planning session discussing company direction for the next fiscal year. Complex trade-offs and long-term implications need consideration.",
                "Strategy Team Member", "Chief Strategy Officer",
                "Our competitive landscape has shifted considerably. I\'d like us to critically examine our current strategic pillars and identify where we need to pivot. What patterns are you seeing in our market?",
                List.of("Analyze market trends", "Evaluate strategic options", "Challenge assumptions constructively", "Build on others\' ideas"));

        save(groupId, category, sub, Level.C2,
                "Board Presentation",
                "Present to the board of directors",
                "Secure board approval for a strategic initiative",
                "You\'re presenting a major strategic initiative to the board of directors. You must demonstrate executive presence, handle tough questions, and convey complex information concisely.",
                "Executive Presenter", "Board Chairperson",
                "The board has reviewed your preliminary materials. Before you begin, I should mention that there are some concerns about the timeline and capital requirements. Please address those in your presentation.",
                List.of("Present compelling business case", "Demonstrate thorough risk analysis", "Handle probing questions with confidence", "Navigate board dynamics diplomatically"));

    }

    private void seedPresentations(String groupId, String category) {
        String sub = "presentations";

        save(groupId, category, sub, Level.A1,
                "Simple Self Presentation",
                "Present basic information about yourself",
                "Complete a simple self-introduction presentation",
                "You need to give a short presentation about yourself to your class or team. Keep it simple with basic information.",
                "Presenter", "Audience Member",
                "We\'re ready to hear your presentation. Please go ahead whenever you\'re ready!",
                List.of("Say your name and where you\'re from", "Talk about your job or studies", "Share one hobby", "Thank the audience"));

        save(groupId, category, sub, Level.A2,
                "Product Introduction",
                "Present a simple product to an audience",
                "Successfully introduce a product",
                "You need to present a simple product to potential customers. Describe what it is, how it works, and why it\'s useful.",
                "Sales Presenter", "Potential Customer",
                "I\'m interested in learning about your product. Could you tell me more about it?",
                List.of("Introduce the product clearly", "Explain main features", "Describe benefits", "Answer basic questions"));

        save(groupId, category, sub, Level.B1,
                "Project Proposal",
                "Present a project proposal to your team",
                "Get approval for your project proposal",
                "You need to present a new project idea to your colleagues. You should explain the concept, benefits, and basic plan.",
                "Project Proposer", "Team Supervisor",
                "I\'ve heard you have an interesting project idea. Please walk us through your proposal.",
                List.of("Explain the project concept", "Present the benefits", "Outline the timeline", "Address initial questions"));

        save(groupId, category, sub, Level.B2,
                "Quarterly Results Presentation",
                "Present quarterly business results",
                "Deliver a professional results presentation",
                "You\'re presenting your department\'s quarterly results to senior management. You need to explain the data, trends, and your recommendations.",
                "Department Lead", "Senior Manager",
                "Thank you for preparing this review. Please take us through the highlights and any areas of concern.",
                List.of("Present key metrics clearly", "Explain variances and trends", "Provide context for results", "Recommend next steps"));

        save(groupId, category, sub, Level.C1,
                "Technical Conference Talk",
                "Deliver a technical presentation at a conference",
                "Deliver an engaging and credible technical presentation",
                "You\'re presenting your research or technical work at a professional conference. The audience includes experts who may challenge your methodology or conclusions.",
                "Conference Speaker", "Audience Expert",
                "Your abstract was quite intriguing. I\'m particularly interested in your methodology. Please proceed with your presentation.",
                List.of("Present complex concepts accessibly", "Demonstrate methodological rigor", "Handle expert Q&A with confidence", "Engage audience effectively"));

        save(groupId, category, sub, Level.C2,
                "Keynote Address",
                "Deliver a high-stakes keynote speech",
                "Deliver a memorable and impactful keynote address",
                "You\'re delivering the keynote address at a major industry conference. Your speech should inspire, challenge conventional thinking, and establish thought leadership.",
                "Keynote Speaker", "Conference Moderator",
                "We\'re honored to have you as our keynote speaker. The audience is eager to hear your perspective on the future of our industry. The stage is yours.",
                List.of("Craft compelling narrative arc", "Balance inspiration with substance", "Challenge audience assumptions", "Create memorable takeaways"));

    }

    private void seedNegotiations(String groupId, String category) {
        String sub = "negotiations";

        save(groupId, category, sub, Level.A1,
                "Simple Price Discussion",
                "Ask for a better price",
                "Ask for a discount politely",
                "You are buying something and want to ask if you can pay less. The seller is friendly.",
                "Buyer", "Seller",
                "This item is $50. Would you like to buy it?",
                List.of("Ask if the price is fixed", "Request a discount", "Accept or decline the offer", "Complete the deal"));

        save(groupId, category, sub, Level.A2,
                "Salary Discussion",
                "Discuss salary expectations in an interview",
                "Communicate your salary expectations",
                "You\'re in a job interview and the interviewer asks about your salary expectations. You need to respond appropriately.",
                "Job Candidate", "Hiring Manager",
                "Your interview went well. Now I\'d like to discuss compensation. What are your salary expectations?",
                List.of("State your expected salary", "Explain your reasoning", "Ask about benefits", "Show flexibility"));

        save(groupId, category, sub, Level.B1,
                "Vendor Negotiation",
                "Negotiate terms with a vendor",
                "Reach a mutually beneficial agreement",
                "You\'re negotiating a contract with a supplier. You need to discuss pricing, delivery terms, and payment conditions.",
                "Procurement Officer", "Sales Representative",
                "Thank you for considering our company. I understand you\'re looking for a long-term supplier. Let\'s discuss how we can work together.",
                List.of("Present your requirements", "Discuss pricing", "Negotiate delivery terms", "Agree on payment terms"));

        save(groupId, category, sub, Level.B2,
                "Contract Renegotiation",
                "Renegotiate an existing contract",
                "Successfully renegotiate while preserving the relationship",
                "A longtime client wants to renegotiate their contract due to budget changes. You need to protect your company\'s interests while maintaining the relationship.",
                "Account Manager", "Client Representative",
                "As you know, our budget situation has changed significantly. We value our partnership, but we need to discuss adjusting our current terms.",
                List.of("Understand their new constraints", "Present your position clearly", "Find creative solutions", "Formalize new agreement"));

        save(groupId, category, sub, Level.C1,
                "Partnership Deal",
                "Negotiate a strategic partnership",
                "Structure a win-win partnership agreement",
                "You\'re negotiating a strategic partnership that involves shared resources, revenue sharing, and joint market development. Both parties have complex interests to balance.",
                "Business Development Director", "Potential Partner Executive",
                "Our teams have identified interesting synergies. However, the devil is in the details. How do you propose we structure this partnership to ensure both parties are appropriately invested in its success?",
                List.of("Explore mutual interests", "Structure value sharing equitably", "Address risk allocation", "Build framework for ongoing collaboration"));

        save(groupId, category, sub, Level.C2,
                "M&A Negotiation",
                "Negotiate merger and acquisition terms",
                "Navigate sophisticated M&A negotiations",
                "You\'re representing your company in preliminary M&A discussions. The negotiation involves valuation disputes, cultural integration concerns, and complex deal structures.",
                "M&A Lead", "Counter-party CFO",
                "We\'ve reviewed your indicative offer. While we appreciate the interest, there\'s a significant gap between your valuation and what we believe the company is worth. How do you justify your numbers?",
                List.of("Justify valuation position", "Address integration concerns", "Structure deal terms creatively", "Manage relationship through tense moments"));

    }

    private void seedInterviews(String groupId, String category) {
        String sub = "interviews";

        save(groupId, category, sub, Level.A1,
                "Basic Job Interview",
                "Answer simple interview questions",
                "Answer basic interview questions",
                "You\'re in a job interview for an entry-level position. The interviewer will ask basic questions about you.",
                "Job Applicant", "Interviewer",
                "Thank you for coming today. Let\'s start simply. Can you tell me about yourself?",
                List.of("Tell about yourself", "Say why you want the job", "Talk about your skills", "Ask one question"));

        save(groupId, category, sub, Level.A2,
                "Job Experience Interview",
                "Discuss your work experience",
                "Describe your work experience clearly",
                "You\'re interviewing for a position and need to talk about your previous jobs and what you learned from them.",
                "Candidate", "Hiring Manager",
                "I\'ve read your resume. Could you walk me through your work history and tell me about your main responsibilities in your previous roles?",
                List.of("Describe your previous jobs", "Explain your responsibilities", "Share what you learned", "Connect experience to new role"));

        save(groupId, category, sub, Level.B1,
                "Behavioral Interview",
                "Answer behavioral interview questions",
                "Successfully answer behavioral questions using examples",
                "You\'re in an interview where the interviewer asks about specific situations from your past. You need to provide detailed examples.",
                "Candidate", "Senior Recruiter",
                "I\'d like to understand how you handle different situations. Can you tell me about a time when you faced a challenging deadline and how you managed it?",
                List.of("Understand the STAR method", "Provide specific examples", "Highlight your contributions", "Connect to the role"));

        save(groupId, category, sub, Level.B2,
                "Technical Interview",
                "Handle technical and competency questions",
                "Demonstrate technical competence and problem-solving",
                "You\'re in a technical interview where you need to demonstrate your expertise and problem-solving abilities in your field.",
                "Technical Candidate", "Technical Interviewer",
                "Let\'s dive into some technical questions. I\'d like to understand your depth of knowledge in your area. Can you walk me through a complex project you\'ve worked on?",
                List.of("Explain technical concepts clearly", "Walk through problem-solving approach", "Discuss relevant projects", "Handle knowledge gap questions gracefully"));

        save(groupId, category, sub, Level.C1,
                "Executive Interview",
                "Interview for a senior leadership position",
                "Demonstrate executive-level thinking and leadership",
                "You\'re interviewing for a senior leadership role. The interview focuses on strategic thinking, leadership philosophy, and vision.",
                "Executive Candidate", "CEO",
                "This role requires someone who can drive significant organizational change. Tell me about a time when you led transformation that was initially met with resistance. How did you bring people along?",
                List.of("Articulate leadership philosophy", "Demonstrate strategic thinking", "Discuss transformation experience", "Show cultural and EQ awareness"));

        save(groupId, category, sub, Level.C2,
                "Board-Level Interview",
                "Interview for a C-suite or board position",
                "Demonstrate readiness for board-level responsibility",
                "You\'re being considered for a C-suite position or board membership. The interview probes your strategic vision, governance experience, and ability to navigate complex stakeholder environments.",
                "Executive Candidate", "Board Chairman",
                "The board is looking for someone who can help navigate our company through a period of significant disruption. We\'ve faced some governance challenges recently. How would you approach rebuilding stakeholder trust while driving necessary change?",
                List.of("Demonstrate governance sophistication", "Articulate strategic vision compellingly", "Navigate sensitive topics with discretion", "Show gravitas and executive presence"));

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
