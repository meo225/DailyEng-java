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
@Order(1)
@Profile("!test")
@RequiredArgsConstructor
public class DailyLifeDataSeeder implements CommandLineRunner {

    private final TopicGroupRepository topicGroupRepo;
    private final SpeakingScenarioRepository scenarioRepo;

    @Override
    @Transactional
    public void run(String... args) {
        var existingGroups = topicGroupRepo.findByHubTypeOrderByOrderAsc("speaking");
        boolean alreadyExists = existingGroups.stream()
                .anyMatch(g -> "daily life".equalsIgnoreCase(g.getName()));
        if (alreadyExists) {
            log.info("✅ DailyLife topic group already exists — skipping seed");
            return;
        }

        log.info("🌱 Seeding DailyLife topic group and scenarios...");

        var topicGroup = TopicGroup.builder()
                .name("daily life")
                .hubType(HubType.speaking)
                .order(0)
                .subcategories(List.of("shopping", "dining", "healthcare", "transportation"))
                .build();
        topicGroupRepo.save(topicGroup);

        String groupId = topicGroup.getId();
        String category = "daily life";

        seedShopping(groupId, category);
        seedDining(groupId, category);
        seedHealthcare(groupId, category);
        seedTransportation(groupId, category);

        log.info("✅ Seeded DailyLife: 1 topic group + 24 scenarios");
    }

    private void seedShopping(String groupId, String category) {
        String sub = "shopping";

        save(groupId, category, sub, Level.A1,
                "Buying Fruits",
                "Practice buying simple items at a fruit stand",
                "Buy fruits using basic vocabulary",
                "You are at a small fruit stand. You want to buy some apples and bananas. The seller is friendly and speaks slowly.",
                "Customer", "Fruit Seller",
                "Hello! Welcome! What do you want today?",
                List.of("Say hello", "Ask for apples", "Ask the price", "Say thank you"));

        save(groupId, category, sub, Level.A2,
                "Grocery Shopping",
                "Practice shopping at a grocery store",
                "Find and purchase multiple grocery items",
                "You are at a grocery store looking for items on your shopping list. A store assistant offers to help you find what you need.",
                "Shopper", "Store Assistant",
                "Good afternoon! Can I help you find something today?",
                List.of("Ask where items are located", "Compare prices", "Ask about quantities", "Complete checkout"));

        save(groupId, category, sub, Level.B1,
                "Clothing Store",
                "Practice trying on and buying clothes",
                "Successfully select and purchase appropriate clothing",
                "You are in a clothing store looking for a new outfit for a friend\'s party. You need help with sizes and want to try some items on.",
                "Customer", "Sales Associate",
                "Welcome to Fashion Forward! Are you looking for anything special today?",
                List.of("Describe what you\'re looking for", "Ask about sizes and colors", "Request to try items", "Negotiate or ask about discounts"));

        save(groupId, category, sub, Level.B2,
                "Electronics Purchase",
                "Practice buying electronics with detailed specifications",
                "Make an informed electronics purchase after comparing options",
                "You\'re at an electronics store looking for a new laptop. You have specific requirements for performance, battery life, and budget constraints.",
                "Customer", "Electronics Specialist",
                "Hello! Welcome to TechWorld. I noticed you\'re looking at our laptop section. What kind of specifications are you looking for?",
                List.of("Explain your technical requirements", "Compare different models", "Ask about warranty and support", "Negotiate price or request bundle deals"));

        save(groupId, category, sub, Level.C1,
                "Antique Negotiation",
                "Practice negotiating for antiques and collectibles",
                "Successfully negotiate a fair price while verifying authenticity",
                "You\'re at an antique fair interested in a vintage piece. You need to assess authenticity, negotiate price, and discuss provenance while maintaining rapport with the dealer.",
                "Collector", "Antique Dealer",
                "Ah, I see you\'ve got a discerning eye! That Victorian writing desk has quite an interesting history. Would you like to know more about its provenance?",
                List.of("Inquire about the item\'s history and provenance", "Diplomatically question authenticity", "Employ negotiation strategies", "Discuss payment and delivery terms"));

        save(groupId, category, sub, Level.C2,
                "Luxury Brand Experience",
                "Navigate a high-end luxury shopping experience",
                "Complete a refined luxury shopping experience with cultural sophistication",
                "You\'re visiting a prestigious luxury boutique for a significant purchase. The experience requires sophisticated communication, understanding of luxury etiquette, and articulate expression of preferences.",
                "Discerning Client", "Luxury Brand Consultant",
                "Good afternoon, and welcome to Maison Élégance. It\'s a pleasure to have you with us today. May I offer you some champagne while we discuss what brings you to our atelier?",
                List.of("Engage in sophisticated small talk", "Express nuanced preferences", "Discuss craftsmanship and heritage", "Handle the purchase with appropriate etiquette"));

    }

    private void seedDining(String groupId, String category) {
        String sub = "dining";

        save(groupId, category, sub, Level.A1,
                "Fast Food Order",
                "Order a simple meal at a fast food restaurant",
                "Order a simple meal successfully",
                "You are at a fast food counter. You want to order a burger and drink. The cashier is waiting for your order.",
                "Customer", "Cashier",
                "Hi! Welcome to Burger Town. What would you like to order?",
                List.of("Look at the menu", "Order food and drink", "Answer questions about your order", "Pay for your meal"));

        save(groupId, category, sub, Level.A2,
                "Coffee Shop Ordering",
                "Practice ordering drinks and snacks at a coffee shop",
                "Successfully order your preferred coffee drink with customizations",
                "You are at a busy coffee shop during morning rush hour. The barista is ready to take your order and can help with menu questions.",
                "Customer", "Barista",
                "Good morning! Welcome to Daily Brew. What can I get started for you today?",
                List.of("Greet the barista", "Order a drink with size preference", "Ask about available pastries", "Complete payment"));

        save(groupId, category, sub, Level.B1,
                "Restaurant Reservation",
                "Make a restaurant reservation by phone",
                "Successfully book a table with specific requirements",
                "You want to make a dinner reservation at a nice restaurant for a special occasion. You\'re calling ahead to book a table.",
                "Caller", "Restaurant Host",
                "Good afternoon, thank you for calling Bella Italia. This is Maria speaking. How may I help you today?",
                List.of("State the date and time preference", "Specify number of guests", "Mention special occasion", "Confirm reservation details"));

        save(groupId, category, sub, Level.B2,
                "Fine Dining Experience",
                "Navigate a full fine dining experience",
                "Successfully navigate a formal dining experience",
                "You\'re at an upscale restaurant for a business dinner. You need to order for yourself and make conversation while handling the multi-course meal properly.",
                "Dinner Guest", "Sommelier & Server",
                "Good evening, and welcome to Le Château. I\'ll be your server tonight. May I start you off with our wine list, or would you prefer to hear about tonight\'s specials?",
                List.of("Discuss menu options with the server", "Ask about wine pairings", "Handle dietary restrictions diplomatically", "Manage the bill appropriately"));

        save(groupId, category, sub, Level.C1,
                "Food Critic Review",
                "Discuss a meal as a food critic would",
                "Conduct an insightful conversation about gastronomy",
                "You\'re a food blogger visiting a new fusion restaurant. The chef has come out to discuss their creative process and you need to engage meaningfully about culinary techniques.",
                "Food Blogger", "Executive Chef",
                "Thank you so much for visiting us! I understand you\'re writing about our new tasting menu. I\'d love to walk you through the inspiration behind each course.",
                List.of("Inquire about cooking techniques", "Discuss flavor profiles articulately", "Ask about ingredient sourcing", "Provide constructive feedback"));

        save(groupId, category, sub, Level.C2,
                "Culinary Business Pitch",
                "Pitch a restaurant concept to investors",
                "Deliver a compelling investment pitch for a restaurant venture",
                "You\'re presenting your innovative restaurant concept to potential investors. You must articulate your vision, address concerns, and demonstrate market understanding.",
                "Restaurant Entrepreneur", "Venture Capitalist",
                "I\'ve reviewed your preliminary materials and I\'m intrigued by your farm-to-table concept. Walk me through your vision—what makes this venture different from the dozen other proposals I see each month?",
                List.of("Present unique value proposition", "Address market positioning", "Discuss financial projections", "Handle challenging questions with poise"));

    }

    private void seedHealthcare(String groupId, String category) {
        String sub = "healthcare";

        save(groupId, category, sub, Level.A1,
                "Pharmacy Visit",
                "Buy medicine at a pharmacy",
                "Get the right medicine for your headache",
                "You have a headache and need medicine. You are at a pharmacy and the pharmacist is ready to help you.",
                "Customer", "Pharmacist",
                "Hello! How can I help you today? Are you looking for something?",
                List.of("Explain you have a headache", "Ask for medicine", "Ask how to take it", "Pay for the medicine"));

        save(groupId, category, sub, Level.A2,
                "Doctor Appointment Booking",
                "Schedule a doctor\'s appointment",
                "Successfully book a doctor\'s appointment",
                "You need to see a doctor because you haven\'t been feeling well. You\'re calling the clinic to make an appointment.",
                "Patient", "Receptionist",
                "Good morning, City Health Clinic. How may I help you?",
                List.of("Explain why you need to see a doctor", "Ask about available times", "Provide your information", "Confirm the appointment"));

        save(groupId, category, sub, Level.B1,
                "Doctor\'s Appointment",
                "Describe symptoms to a doctor",
                "Clearly describe your symptoms and understand advice",
                "You are visiting a doctor because you haven\'t been feeling well lately. The doctor will ask questions about your symptoms.",
                "Patient", "Doctor",
                "Hello! Please have a seat. I\'m Dr. Smith. I see you\'ve been feeling unwell. Can you tell me what\'s been bothering you?",
                List.of("Describe your symptoms accurately", "Answer health history questions", "Understand the diagnosis", "Ask about medication"));

        save(groupId, category, sub, Level.B2,
                "Specialist Consultation",
                "Discuss complex health concerns with a specialist",
                "Have a comprehensive consultation about treatment options",
                "You\'ve been referred to a specialist for ongoing health issues. You need to provide detailed medical history and understand treatment options.",
                "Patient", "Medical Specialist",
                "I\'ve reviewed the referral from your GP. I\'d like to discuss your condition in more detail and explore the treatment options available to you.",
                List.of("Provide detailed medical history", "Discuss previous treatments", "Understand specialist recommendations", "Ask about alternative treatments"));

        save(groupId, category, sub, Level.C1,
                "Health Insurance Discussion",
                "Navigate complex health insurance matters",
                "Make informed decisions about health insurance coverage",
                "You\'re meeting with a health insurance advisor to understand coverage options, claim procedures, and policy implications for a planned medical procedure.",
                "Policy Holder", "Insurance Advisor",
                "Thank you for scheduling this consultation. I understand you have questions about coverage for an upcoming procedure. Let\'s review your policy and options together.",
                List.of("Clarify coverage details", "Discuss pre-authorization requirements", "Understand out-of-pocket costs", "Negotiate coverage terms"));

        save(groupId, category, sub, Level.C2,
                "Medical Ethics Discussion",
                "Engage in a nuanced medical ethics conversation",
                "Contribute meaningfully to an ethics committee deliberation",
                "You\'re participating in a hospital ethics committee meeting discussing a complex case involving patient autonomy, family wishes, and medical recommendations.",
                "Ethics Committee Member", "Committee Chair",
                "This case raises significant questions about informed consent and patient autonomy. I\'d like each member to share their perspective. What are your initial thoughts on the ethical dimensions here?",
                List.of("Articulate ethical principles clearly", "Balance competing interests", "Reference relevant precedents", "Propose actionable recommendations"));

    }

    private void seedTransportation(String groupId, String category) {
        String sub = "transportation";

        save(groupId, category, sub, Level.A1,
                "Taking a Taxi",
                "Tell a taxi driver where you want to go",
                "Tell the driver your destination",
                "You need to take a taxi to the train station. The taxi driver is waiting to know your destination.",
                "Passenger", "Taxi Driver",
                "Hello! Where would you like to go today?",
                List.of("Greet the driver", "Say where you want to go", "Ask how long it takes", "Pay the fare"));

        save(groupId, category, sub, Level.A2,
                "Buying Train Tickets",
                "Purchase train tickets at a station",
                "Successfully purchase train tickets",
                "You are at a train station ticket counter. You want to buy tickets to travel to another city this weekend.",
                "Traveler", "Ticket Agent",
                "Good morning! How may I help you with your journey today?",
                List.of("Ask for tickets to your destination", "Specify date and time", "Ask about return tickets", "Complete the purchase"));

        save(groupId, category, sub, Level.B1,
                "Airport Navigation",
                "Navigate through an airport",
                "Successfully navigate the airport and board your flight",
                "You\'re at a busy international airport and need help finding your gate, understanding announcements, and dealing with flight changes.",
                "Traveler", "Airport Staff",
                "Hello! You look a bit lost. Can I help you find your way around the terminal?",
                List.of("Ask for directions to your gate", "Understand flight announcements", "Handle check-in procedures", "Deal with potential delays"));

        save(groupId, category, sub, Level.B2,
                "Car Rental Process",
                "Rent a car with specific requirements",
                "Rent an appropriate vehicle with proper coverage",
                "You\'re at a car rental agency and need a vehicle for a week-long road trip. You have specific requirements and need to understand insurance options.",
                "Customer", "Rental Agent",
                "Welcome to DriveAway Rentals! I see you have a reservation. Let me pull up your details and we can discuss your options.",
                List.of("Specify vehicle requirements", "Understand insurance options", "Discuss mileage and fuel policies", "Complete rental agreement"));

        save(groupId, category, sub, Level.C1,
                "Travel Disruption Management",
                "Handle major travel disruptions professionally",
                "Resolve complex travel disruptions effectively",
                "Your flight has been cancelled due to severe weather. You need to rebook, claim compensation, and manage connecting arrangements while maintaining composure.",
                "Affected Passenger", "Airline Customer Service Manager",
                "I apologize for the inconvenience caused by the cancellation. I understand this affects your travel plans significantly. Let me see what options I can arrange for you.",
                List.of("Assert passenger rights diplomatically", "Negotiate alternative arrangements", "Document issues for claims", "Coordinate multiple travel elements"));

        save(groupId, category, sub, Level.C2,
                "Sustainable Transport Policy",
                "Discuss urban transport policy implications",
                "Contribute substantively to policy development",
                "You\'re participating in a city council working group on sustainable transportation. The discussion involves complex trade-offs between economic, environmental, and social factors.",
                "Urban Planning Consultant", "City Council Transport Director",
                "Our city faces significant challenges in reducing transport emissions while maintaining economic accessibility. I\'m interested in your perspective on how we might balance these competing priorities.",
                List.of("Analyze multi-stakeholder impacts", "Propose evidence-based solutions", "Address counterarguments", "Build consensus through dialogue"));

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
