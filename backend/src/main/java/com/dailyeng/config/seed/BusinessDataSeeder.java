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
@Order(4)
@Profile("!test")
@RequiredArgsConstructor
public class BusinessDataSeeder implements CommandLineRunner {

    private final TopicGroupRepository topicGroupRepo;
    private final SpeakingScenarioRepository scenarioRepo;

    @Override
    @Transactional
    public void run(String... args) {
        var existingGroups = topicGroupRepo.findByHubTypeOrderByOrderAsc("speaking");
        boolean alreadyExists = existingGroups.stream()
                .anyMatch(g -> "business".equalsIgnoreCase(g.getName()));
        if (alreadyExists) {
            log.info("✅ Business topic group already exists — skipping seed");
            return;
        }

        log.info("🌱 Seeding Business topic group and scenarios...");

        var topicGroup = TopicGroup.builder()
                .name("business")
                .hubType(HubType.speaking)
                .order(3)
                .subcategories(List.of("marketing", "sales", "finance", "management"))
                .build();
        topicGroupRepo.save(topicGroup);

        String groupId = topicGroup.getId();
        String category = "business";

        seedMarketing(groupId, category);
        seedSales(groupId, category);
        seedFinance(groupId, category);
        seedManagement(groupId, category);

        log.info("✅ Seeded Business: 1 topic group + 24 scenarios");
    }

    private void seedMarketing(String groupId, String category) {
        String sub = "marketing";

        save(groupId, category, sub, Level.A1,
                "Product Description",
                "Describe a simple product",
                "Describe a product simply",
                "You need to tell a customer about a product your company sells. Use simple words to describe what it does.",
                "Sales Person", "Customer",
                "Hi! I\'m interested in your product. Can you tell me about it?",
                List.of("Name the product", "Say what it does", "Say why it\'s good", "Answer simple questions"));

        save(groupId, category, sub, Level.A2,
                "Social Media Post",
                "Create content for social media",
                "Plan a simple social media post",
                "You\'re helping plan a social media post for your company. You need to discuss ideas and what message to share.",
                "Marketing Assistant", "Marketing Manager",
                "We need a new post for our company page. What ideas do you have for this week?",
                List.of("Suggest post ideas", "Choose the best option", "Decide on the message", "Plan when to post"));

        save(groupId, category, sub, Level.B1,
                "Marketing Campaign Brainstorm",
                "Brainstorm ideas for a marketing campaign",
                "Contribute meaningful ideas to campaign planning",
                "Your team is planning a new marketing campaign for a product launch. You need to share ideas and discuss the target audience.",
                "Marketing Team Member", "Marketing Director",
                "We\'re launching our new product next month. I\'d like to hear your ideas for the marketing campaign. What approaches do you think would work best?",
                List.of("Propose campaign ideas", "Discuss target audience", "Consider different channels", "Agree on next steps"));

        save(groupId, category, sub, Level.B2,
                "Market Research Presentation",
                "Present market research findings",
                "Deliver actionable market research insights",
                "You\'ve completed market research and need to present your findings to the marketing team. Your insights will guide the marketing strategy.",
                "Market Researcher", "CMO",
                "I\'ve been looking forward to seeing your research findings. Please walk us through what you\'ve discovered about our target market.",
                List.of("Present key findings clearly", "Identify market trends", "Recommend strategic actions", "Defend your methodology"));

        save(groupId, category, sub, Level.C1,
                "Brand Repositioning Strategy",
                "Develop a brand repositioning strategy",
                "Propose a compelling brand repositioning strategy",
                "Your company needs to reposition its brand to stay competitive. You\'re presenting a comprehensive rebranding strategy to senior leadership.",
                "Brand Strategist", "CEO",
                "Our brand has lost relevance with younger demographics. I need to understand your vision for repositioning. What\'s the core insight driving your strategy?",
                List.of("Analyze current brand perception", "Define new brand positioning", "Outline implementation roadmap", "Address stakeholder concerns"));

        save(groupId, category, sub, Level.C2,
                "Global Marketing Integration",
                "Coordinate global marketing strategy",
                "Orchestrate global marketing alignment",
                "You\'re leading a discussion to integrate marketing strategies across multiple international markets while respecting local nuances and maintaining brand consistency.",
                "Global Marketing VP", "Regional Marketing Director",
                "The global brand guidelines don\'t account for our market\'s unique consumer behavior. We\'ve seen 30% better engagement when we adapt the messaging locally. How do we reconcile this with headquarters\' push for consistency?",
                List.of("Balance global consistency with local relevance", "Navigate cultural sensitivities", "Resolve regional resource allocation", "Build consensus among regional leads"));

    }

    private void seedSales(String groupId, String category) {
        String sub = "sales";

        save(groupId, category, sub, Level.A1,
                "Greeting a Customer",
                "Welcome a customer to your store",
                "Welcome and offer help to a customer",
                "A customer walks into your store. You need to greet them and offer help.",
                "Sales Associate", "Customer",
                "Hello! I\'m looking for something. Can you help me?",
                List.of("Say hello", "Ask how to help", "Listen to their needs", "Direct them to products"));

        save(groupId, category, sub, Level.A2,
                "Product Recommendation",
                "Recommend products to a customer",
                "Help a customer choose the right product",
                "A customer needs help choosing between products. You need to understand what they want and suggest the best option.",
                "Sales Associate", "Customer",
                "I need a new phone but I\'m not sure which one to get. There are so many options!",
                List.of("Ask about their needs", "Explain product options", "Make a recommendation", "Answer their questions"));

        save(groupId, category, sub, Level.B1,
                "Sales Pitch",
                "Present a sales pitch to a potential client",
                "Deliver a convincing sales pitch",
                "You\'re meeting with a potential client to pitch your company\'s services. You need to explain the value and handle their initial questions.",
                "Sales Representative", "Potential Client",
                "Thanks for coming in. I have about 30 minutes. Tell me why I should consider your company.",
                List.of("Introduce your company", "Explain your services", "Highlight benefits", "Handle objections"));

        save(groupId, category, sub, Level.B2,
                "Solution Selling",
                "Conduct a consultative sales conversation",
                "Identify needs and propose tailored solutions",
                "You\'re meeting with a prospect to understand their business challenges and propose a customized solution. The sale depends on demonstrating value.",
                "Solution Sales Consultant", "Business Decision Maker",
                "We\'re evaluating several vendors, but honestly, I\'m skeptical that any solution can address our specific challenges. Convince me you understand our situation.",
                List.of("Conduct discovery questions", "Identify pain points", "Present customized solutions", "Create urgency without pressure"));

        save(groupId, category, sub, Level.C1,
                "Enterprise Deal Negotiation",
                "Negotiate a major enterprise contract",
                "Close a profitable enterprise deal",
                "You\'re in the final stages of a large enterprise deal. The client is pushing back on price while you need to protect margins. Multiple stakeholders are involved.",
                "Enterprise Sales Director", "VP of Procurement",
                "Look, I\'m going to be direct. Your solution tested well, but your pricing is 40% higher than comparable alternatives. Help me understand how I justify this to my board.",
                List.of("Navigate multi-stakeholder dynamics", "Justify value proposition", "Structure creative deal terms", "Close with mutual satisfaction"));

        save(groupId, category, sub, Level.C2,
                "Strategic Partnership Sales",
                "Develop a transformational strategic partnership",
                "Establish a transformational strategic partnership",
                "You\'re proposing a strategic partnership that would fundamentally change how both companies go to market. The conversation requires balancing immediate commercial terms with long-term strategic vision.",
                "Chief Revenue Officer", "Partner CEO",
                "I\'ve read your proposal for strategic alignment. It\'s ambitious—perhaps too ambitious. Our board is skeptical about the execution risk. How do we de-risk this partnership while preserving the upside you\'ve outlined?",
                List.of("Articulate compelling joint vision", "Navigate executive-level concerns", "Structure innovative deal models", "Build executive relationship while closing"));

    }

    private void seedFinance(String groupId, String category) {
        String sub = "finance";

        save(groupId, category, sub, Level.A1,
                "Basic Money Talk",
                "Talk about prices and payments",
                "Ask about prices and pay for items",
                "You\'re at a shop and need to ask about the price and how to pay.",
                "Customer", "Cashier",
                "Hello! Would you like to buy this item? It\'s on sale today!",
                List.of("Ask the price", "Understand the amount", "Ask about payment methods", "Complete payment"));

        save(groupId, category, sub, Level.A2,
                "Bank Account Inquiry",
                "Ask about bank account options",
                "Understand bank account options",
                "You\'re at a bank branch asking about opening a new account. The bank representative will explain the options.",
                "Customer", "Bank Representative",
                "Welcome to City Bank! I understand you\'re interested in opening an account. What type of account are you looking for?",
                List.of("Ask about account types", "Understand fees and benefits", "Ask about requirements", "Decide on an account"));

        save(groupId, category, sub, Level.B1,
                "Budget Discussion",
                "Discuss a project budget",
                "Get approval for your project budget",
                "You\'re meeting with your manager to discuss the budget for your project. You need to explain your needs and justify your requests.",
                "Project Lead", "Finance Manager",
                "I\'ve reviewed your budget proposal. Let\'s go through it together. Can you walk me through your major cost items?",
                List.of("Present budget needs", "Explain each cost item", "Justify expenses", "Negotiate adjustments"));

        save(groupId, category, sub, Level.B2,
                "Financial Performance Review",
                "Review financial performance with stakeholders",
                "Communicate financial performance effectively",
                "You\'re presenting the quarterly financial performance to department heads. You need to explain variances and propose corrective actions.",
                "Financial Analyst", "Department Director",
                "I\'m concerned about the cost overruns this quarter. Please help me understand what\'s driving the variance and what we can do about it.",
                List.of("Present key financial metrics", "Explain variances to budget", "Identify cost optimization opportunities", "Propose corrective actions"));

        save(groupId, category, sub, Level.C1,
                "Investment Pitch",
                "Pitch for investment funding",
                "Secure investment commitment",
                "You\'re presenting to potential investors to secure funding for your business expansion. You need to demonstrate financial viability and growth potential.",
                "CFO", "Private Equity Partner",
                "Your growth story is interesting, but I\'ve seen many companies with similar trajectories that failed to scale profitably. Walk me through your unit economics and how they improve at scale.",
                List.of("Present compelling financial projections", "Explain business model economics", "Address investor concerns", "Negotiate investment terms"));

        save(groupId, category, sub, Level.C2,
                "Financial Crisis Management",
                "Navigate a financial crisis situation",
                "Navigate company through financial crisis",
                "Your company is facing a liquidity crisis. You\'re in urgent discussions with lenders, stakeholders, and the board to restructure finances and maintain operations.",
                "Chief Restructuring Officer", "Lead Creditor Representative",
                "The creditor committee has reviewed your restructuring proposal. Frankly, we find the timeline aggressive and the assumptions optimistic. Several creditors are pushing for acceleration. What assurances can you provide that this plan is viable?",
                List.of("Present realistic financial assessment", "Negotiate with multiple creditor classes", "Maintain stakeholder confidence", "Structure viable turnaround plan"));

    }

    private void seedManagement(String groupId, String category) {
        String sub = "management";

        save(groupId, category, sub, Level.A1,
                "Asking for Help",
                "Ask your manager for help",
                "Get help from your manager",
                "You have a problem at work and need to ask your manager for help. Keep your request simple.",
                "Employee", "Manager",
                "Hello! How can I help you today? Is everything okay?",
                List.of("Get your manager\'s attention", "Explain your problem simply", "Listen to advice", "Say thank you"));

        save(groupId, category, sub, Level.A2,
                "Task Update",
                "Give your manager an update on your tasks",
                "Update your manager on your work",
                "Your manager wants to know about your progress on your tasks. You need to explain what you\'ve done and what you\'re working on.",
                "Team Member", "Team Manager",
                "Good morning! I wanted to check in on your progress. How are things going with your current tasks?",
                List.of("Explain completed tasks", "Share current work", "Mention any problems", "Ask for guidance if needed"));

        save(groupId, category, sub, Level.B1,
                "Team Coordination",
                "Coordinate work with your team",
                "Effectively coordinate team work",
                "You\'re leading a small project and need to coordinate tasks with your team members. You need to assign work and set deadlines.",
                "Project Lead", "Team Member",
                "Thanks for getting us together. I know we have a lot on our plates. What do you need from me to get started on your part of the project?",
                List.of("Explain project goals", "Assign tasks fairly", "Set clear deadlines", "Address team concerns"));

        save(groupId, category, sub, Level.B2,
                "Performance Review",
                "Conduct or participate in a performance review",
                "Have a productive performance review conversation",
                "You\'re in an annual performance review discussion. This is an opportunity to discuss achievements, areas for growth, and career development.",
                "Employee", "Manager",
                "Thanks for preparing for our annual review. I\'ve been impressed with several of your contributions this year. Let\'s discuss your performance and what\'s next for your career here.",
                List.of("Discuss achievements objectively", "Address development areas constructively", "Set future goals", "Align on career path"));

        save(groupId, category, sub, Level.C1,
                "Change Management",
                "Lead organizational change initiative",
                "Successfully lead organizational change",
                "You\'re implementing a significant organizational change that affects multiple teams. You need to communicate the change, address resistance, and maintain momentum.",
                "Change Leader", "Skeptical Department Head",
                "I\'ve read the change proposal. My team is already stretched thin with current projects. Now you\'re asking us to fundamentally change how we work? I need to understand why this isn\'t just another corporate initiative that will be abandoned in six months.",
                List.of("Communicate vision compellingly", "Address emotional resistance", "Build change advocates", "Maintain operational continuity"));

        save(groupId, category, sub, Level.C2,
                "Board Governance Challenge",
                "Navigate complex board governance issues",
                "Navigate complex governance while maintaining trust",
                "You\'re dealing with a complex governance situation involving board dynamics, shareholder concerns, and executive decision-making. Multiple stakeholder interests must be balanced.",
                "CEO", "Board Chair",
                "We have a sensitive matter to discuss. Several board members have raised concerns about the strategic direction you\'ve been pursuing. There are also questions from significant shareholders. How do you propose we address these concerns while maintaining confidence in leadership?",
                List.of("Balance competing stakeholder interests", "Maintain fiduciary integrity", "Navigate politically sensitive dynamics", "Preserve organizational reputation"));

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
