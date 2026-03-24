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
@Order(5)
@Profile("!test")
@RequiredArgsConstructor
public class TravelDataSeeder implements CommandLineRunner {

        private final TopicGroupRepository topicGroupRepo;
        private final SpeakingScenarioRepository scenarioRepo;

        @Override
        @Transactional
        public void run(String... args) {
                var existingGroups = topicGroupRepo.findByHubTypeAndLanguageOrderByOrderAsc("speaking", "en");
                boolean alreadyExists = existingGroups.stream()
                                .anyMatch(g -> "travel".equalsIgnoreCase(g.getName()));
                if (alreadyExists) {
                        log.info("✅ Travel topic group already exists — skipping seed");
                        return;
                }

                log.info("🌱 Seeding Travel topic group and scenarios...");

                var topicGroup = TopicGroup.builder()
                                .name("travel")
                                .hubType(HubType.speaking)
                                .order(4)
                                .subcategories(List.of("hotels", "airports", "tourist sites", "emergency"))
                                .build();
                topicGroupRepo.save(topicGroup);

                String groupId = topicGroup.getId();
                String category = "travel";

                seedHotels(groupId, category);
                seedAirports(groupId, category);
                seedTouristSites(groupId, category);
                seedEmergency(groupId, category);

                log.info("✅ Seeded Travel: 1 topic group + 24 scenarios");
        }

        private void seedHotels(String groupId, String category) {
                String sub = "hotels";

                save(groupId, category, sub, Level.A1,
                                "Hotel Check-in",
                                "Check into a hotel",
                                "Successfully check into the hotel",
                                "You\'ve arrived at a hotel and need to check in. The receptionist will help you.",
                                "Guest", "Receptionist",
                                "Good evening! Welcome to Sunrise Hotel. Do you have a reservation?",
                                List.of("Give your name", "Show your ID", "Get your room key",
                                                "Ask where your room is"));

                save(groupId, category, sub, Level.A2,
                                "Hotel Room Request",
                                "Request something for your hotel room",
                                "Get what you need for your room",
                                "You\'re staying at a hotel and need to request something for your room, like extra towels or pillows.",
                                "Guest", "Front Desk Staff",
                                "Front desk, how may I assist you?",
                                List.of("Call the front desk", "Explain what you need", "Confirm the request",
                                                "Say thank you"));

                save(groupId, category, sub, Level.B1,
                                "Hotel Booking",
                                "Book a hotel room with specific requirements",
                                "Book a suitable hotel room",
                                "You\'re calling a hotel to book a room for your vacation. You have specific requirements and want to know about amenities.",
                                "Guest", "Reservations Agent",
                                "Thank you for calling Grand Plaza Hotel. How may I help you with your reservation today?",
                                List.of("Specify dates and room type", "Ask about amenities",
                                                "Understand pricing and policies", "Confirm the reservation"));

                save(groupId, category, sub, Level.B2,
                                "Hotel Complaint Resolution",
                                "Resolve a problem with your hotel stay",
                                "Resolve hotel issues professionally",
                                "You\'ve experienced issues during your hotel stay and need to discuss them with the manager. You want a satisfactory resolution.",
                                "Guest", "Hotel Manager",
                                "I understand you\'ve asked to speak with me about some concerns with your stay. I apologize for any inconvenience. Please tell me what happened.",
                                List.of("Describe problems clearly", "Express expectations reasonably",
                                                "Negotiate compensation", "Maintain professional tone"));

                save(groupId, category, sub, Level.C1,
                                "Corporate Event Planning",
                                "Plan a corporate event at a hotel",
                                "Successfully negotiate comprehensive event arrangements",
                                "You\'re organizing a major corporate conference at a hotel. You need to negotiate complex arrangements including rooms, catering, AV equipment, and custom requirements.",
                                "Event Planner", "Hotel Events Director",
                                "Thank you for considering us for your annual conference. I\'ve reviewed your RFP. Before we discuss specifics, I\'d like to understand your vision for the event and what success looks like for your organization.",
                                List.of("Specify detailed event requirements", "Negotiate pricing and packages",
                                                "Coordinate multiple service elements", "Establish contingency plans"));

                save(groupId, category, sub, Level.C2,
                                "Luxury Hospitality Partnership",
                                "Negotiate a luxury hospitality partnership",
                                "Establish a mutually beneficial luxury partnership",
                                "You\'re negotiating a long-term partnership between your company and a luxury hotel group. The arrangement involves exclusive rates, custom services, and brand association considerations.",
                                "Corporate Travel Director", "Luxury Hotel Group CEO",
                                "Your company\'s reputation for excellence aligns with our brand values. However, the exclusivity terms you\'re proposing concern me. How do we structure an arrangement that serves both our interests without constraining either party\'s growth?",
                                List.of("Articulate partnership vision", "Navigate brand alignment concerns",
                                                "Structure complex value exchange",
                                                "Build long-term relationship foundation"));

        }

        private void seedAirports(String groupId, String category) {
                String sub = "airports";

                save(groupId, category, sub, Level.A1,
                                "Finding Your Gate",
                                "Ask for directions at an airport",
                                "Find your departure gate",
                                "You\'re at an airport and need to find your gate. You can ask the staff for help.",
                                "Traveler", "Airport Staff",
                                "Hello! You look like you might need some help. Can I assist you?",
                                List.of("Ask where your gate is", "Understand the directions",
                                                "Ask how long it takes to walk", "Say thank you"));

                save(groupId, category, sub, Level.A2,
                                "Airport Check-in",
                                "Check in for your flight at the airport",
                                "Complete airport check-in",
                                "You\'ve arrived at the airport and need to check in at the counter. You have your passport and booking confirmation.",
                                "Passenger", "Check-in Agent",
                                "Good morning! Welcome to Sky Airways. May I see your passport and booking confirmation, please?",
                                List.of("Present your documents", "Choose your seat if possible", "Check your luggage",
                                                "Get your boarding pass"));

                save(groupId, category, sub, Level.B1,
                                "Security and Customs",
                                "Navigate airport security and customs",
                                "Pass through security and customs smoothly",
                                "You\'re going through airport security and customs. You need to follow procedures and answer questions from officers.",
                                "Traveler", "Customs Officer",
                                "Welcome back. What was the purpose of your trip abroad, and do you have anything to declare?",
                                List.of("Follow security procedures", "Answer officer questions",
                                                "Declare items if necessary", "Collect your belongings"));

                save(groupId, category, sub, Level.B2,
                                "Flight Rebooking",
                                "Rebook a flight due to cancellation",
                                "Successfully rebook to reach your destination",
                                "Your flight has been cancelled and you need to rebook. The airline counter is busy and options may be limited.",
                                "Affected Passenger", "Airline Customer Service",
                                "I\'m sorry about the cancellation. We\'re trying to accommodate all affected passengers. Let me see what options I can find for you.",
                                List.of("Understand cancellation reason", "Explore alternative options",
                                                "Negotiate for better arrangements", "Document everything for claims"));

                save(groupId, category, sub, Level.C1,
                                "VIP Airport Services",
                                "Arrange VIP airport services for executives",
                                "Arrange seamless VIP travel experience",
                                "You\'re coordinating VIP airport handling for a delegation of senior executives visiting multiple countries. Custom protocols and security considerations apply.",
                                "Executive Assistant", "VIP Services Coordinator",
                                "We\'ve reviewed your delegation\'s itinerary. The requirements are complex, particularly the short connection in Dubai. Let\'s discuss how we can ensure a seamless experience despite the tight timeline.",
                                List.of("Coordinate multi-airport logistics", "Negotiate premium services",
                                                "Handle security protocols", "Manage contingencies across time zones"));

                save(groupId, category, sub, Level.C2,
                                "Aviation Crisis Communication",
                                "Handle crisis communication during aviation incident",
                                "Manage crisis communication with integrity",
                                "There\'s been a significant aviation incident and you\'re coordinating communication between the airline, airport authorities, families, and media. Sensitivity and accuracy are paramount.",
                                "Crisis Communications Director", "Airport Authority PR Chief",
                                "The media are gathering and families are demanding information. We need to issue a statement within the hour, but we\'re still confirming details. How do we communicate appropriately without speculating or creating additional distress?",
                                List.of("Communicate with appropriate sensitivity",
                                                "Coordinate multi-stakeholder messaging",
                                                "Balance transparency with legal constraints",
                                                "Support affected parties compassionately"));

        }

        private void seedTouristSites(String groupId, String category) {
                String sub = "tourist sites";

                save(groupId, category, sub, Level.A1,
                                "Buying Tickets",
                                "Buy tickets at a tourist attraction",
                                "Buy an entrance ticket",
                                "You\'re at a famous monument and want to buy an entrance ticket. The ticket seller is ready to help you.",
                                "Tourist", "Ticket Seller",
                                "Hello! Welcome to the National Museum. How can I help you today?",
                                List.of("Ask for a ticket", "Ask the price", "Pay for the ticket",
                                                "Ask about opening hours"));

                save(groupId, category, sub, Level.A2,
                                "Guided Tour",
                                "Join a guided tour at a tourist site",
                                "Get information about and join a tour",
                                "You\'re at a historic castle and want to join a guided tour. The guide is answering questions.",
                                "Tourist", "Tour Guide",
                                "Welcome to Castle Highbury! Are you interested in our guided tours? We have one starting soon.",
                                List.of("Ask about tour times", "Ask about tour length", "Ask what you\'ll see",
                                                "Join the tour"));

                save(groupId, category, sub, Level.B1,
                                "Tourist Information",
                                "Get travel recommendations from a tourist office",
                                "Get useful travel recommendations",
                                "You\'re at a tourist information center asking about things to do in the city. You want recommendations based on your interests.",
                                "Tourist", "Tourism Advisor",
                                "Welcome to Barcelona Tourist Information! How long will you be staying, and what kind of experiences are you looking for?",
                                List.of("Explain your interests", "Ask about top attractions",
                                                "Get transportation advice", "Request a map or brochure"));

                save(groupId, category, sub, Level.B2,
                                "Cultural Site Photography",
                                "Negotiate photography access at a cultural site",
                                "Secure photography access with appropriate terms",
                                "You\'re a photographer wanting special access to photograph a historic site. You need to discuss permission, fees, and restrictions with the site manager.",
                                "Photographer", "Site Manager",
                                "I understand you\'re interested in professional photography at our site. We\'re selective about who we grant access to. Tell me about your project and what you\'re hoping to capture.",
                                List.of("Explain your photography project", "Negotiate access terms",
                                                "Understand restrictions", "Agree on usage rights"));

                save(groupId, category, sub, Level.C1,
                                "Heritage Conservation Discussion",
                                "Discuss heritage site conservation challenges",
                                "Contribute to heritage conservation planning",
                                "You\'re meeting with heritage conservation officials to discuss balancing tourism access with preservation needs at a UNESCO World Heritage site.",
                                "Tourism Consultant", "Conservation Authority Director",
                                "Annual visitor numbers have tripled over the past decade, and we\'re seeing accelerated degradation. The local economy depends on tourism, but we risk destroying what people come to see. How would you approach this paradox?",
                                List.of("Analyze conservation challenges", "Propose sustainable tourism approaches",
                                                "Balance stakeholder interests", "Consider long-term preservation"));

                save(groupId, category, sub, Level.C2,
                                "Cultural Diplomacy Through Tourism",
                                "Navigate cultural diplomacy in tourism context",
                                "Advance cultural diplomacy through tourism initiatives",
                                "You\'re involved in high-level discussions about tourism exchange programs between countries with complex political relationships. Cultural sensitivity and diplomatic awareness are essential.",
                                "Cultural Diplomacy Advisor", "Foreign Affairs Ministry Official",
                                "Tourism exchange has potential to improve bilateral relations, but there are sensitivities on both sides. How do we structure an initiative that creates genuine cultural connection without it becoming politicized or creating tensions?",
                                List.of("Navigate politically sensitive terrain",
                                                "Build bridges through cultural exchange",
                                                "Balance national interests with cooperation",
                                                "Create sustainable people-to-people connections"));

        }

        private void seedEmergency(String groupId, String category) {
                String sub = "emergency";

                save(groupId, category, sub, Level.A1,
                                "Finding Help",
                                "Ask for help in an emergency",
                                "Get help finding your lost bag",
                                "You\'ve lost your bag and need help. You\'re asking a police officer for help.",
                                "Tourist", "Police Officer",
                                "Hello, you look worried. Is everything okay? Can I help you?",
                                List.of("Say you lost your bag", "Describe your bag", "Say where you were",
                                                "Ask what to do"));

                save(groupId, category, sub, Level.A2,
                                "Medical Emergency",
                                "Get medical help while traveling",
                                "Get medical assistance",
                                "You\'re not feeling well while traveling and need to find a pharmacy or doctor. Someone is helping you.",
                                "Sick Traveler", "Local Helper",
                                "You don\'t look well. Are you okay? Do you need help finding a doctor or pharmacy?",
                                List.of("Explain your symptoms", "Ask for a pharmacy or hospital",
                                                "Understand the directions", "Follow advice"));

                save(groupId, category, sub, Level.B1,
                                "Lost Passport",
                                "Report a lost or stolen passport",
                                "Start the process to replace your passport",
                                "You\'ve lost your passport while traveling abroad. You need to report it and get emergency travel documents.",
                                "Traveler in Distress", "Embassy Official",
                                "I\'m sorry to hear about your situation. Please have a seat and tell me exactly what happened. We\'ll help you get emergency travel documents.",
                                List.of("Report the loss to police", "Contact your embassy",
                                                "Gather required documents", "Understand the timeline"));

                save(groupId, category, sub, Level.B2,
                                "Travel Insurance Claim",
                                "File a travel insurance claim",
                                "Successfully file an insurance claim",
                                "You\'ve had a significant travel incident and need to file an insurance claim. You\'re speaking with a claims representative.",
                                "Policy Holder", "Insurance Claims Representative",
                                "I\'m sorry to hear about your travel difficulties. I have your policy information here. Please describe what happened, and I\'ll help you understand what\'s covered and how to proceed.",
                                List.of("Document the incident thoroughly", "Understand coverage details",
                                                "Provide required evidence", "Follow up appropriately"));

                save(groupId, category, sub, Level.C1,
                                "Crisis Evacuation Coordination",
                                "Coordinate emergency evacuation while abroad",
                                "Safely coordinate emergency evacuation",
                                "A natural disaster has occurred in a region where your organization has travelers. You\'re coordinating emergency response and evacuation with local authorities and your home office.",
                                "Corporate Safety Manager", "Embassy Emergency Coordinator",
                                "The situation is evolving rapidly. We\'ve confirmed significant infrastructure damage. Your employees are in the affected area. We need to coordinate extraction routes before conditions worsen. What\'s your current status on locating all your people?",
                                List.of("Assess traveler locations and status",
                                                "Coordinate with local emergency services",
                                                "Manage communication across stakeholders",
                                                "Execute evacuation logistics"));

                save(groupId, category, sub, Level.C2,
                                "International Incident Management",
                                "Handle a serious international incident",
                                "Navigate international incident with diplomatic sensitivity",
                                "A serious incident involving your nationals has occurred abroad, requiring coordination between multiple governments, international organizations, and families. Media attention is intense.",
                                "Consular Affairs Director", "Foreign Ministry Counterpart",
                                "We recognize the gravity of the situation and want to work together toward resolution. However, there are sensitivities regarding jurisdiction and process that we need to navigate carefully. The families are understandably distressed and the media is creating pressure. How do you suggest we proceed in a way that serves everyone\'s interests?",
                                List.of("Coordinate multi-government response", "Manage media sensitively",
                                                "Support affected families appropriately",
                                                "Balance transparency with operational security"));

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
