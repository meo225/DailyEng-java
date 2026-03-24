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
@Order(6)
@Profile("!test")
@RequiredArgsConstructor
public class SocialSituationsDataSeeder implements CommandLineRunner {

        private final TopicGroupRepository topicGroupRepo;
        private final SpeakingScenarioRepository scenarioRepo;

        @Override
        @Transactional
        public void run(String... args) {
                var existingGroups = topicGroupRepo.findByHubTypeAndLanguageOrderByOrderAsc("speaking", "en");
                boolean alreadyExists = existingGroups.stream()
                                .anyMatch(g -> "social situations".equalsIgnoreCase(g.getName()));
                if (alreadyExists) {
                        log.info("✅ SocialSituations topic group already exists — skipping seed");
                        return;
                }

                log.info("🌱 Seeding SocialSituations topic group and scenarios...");

                var topicGroup = TopicGroup.builder()
                                .name("social situations")
                                .hubType(HubType.speaking)
                                .order(5)
                                .subcategories(List.of("parties", "small talk", "making friends", "dating"))
                                .build();
                topicGroupRepo.save(topicGroup);

                String groupId = topicGroup.getId();
                String category = "social situations";

                seedParties(groupId, category);
                seedSmallTalk(groupId, category);
                seedMakingFriends(groupId, category);
                seedDating(groupId, category);

                log.info("✅ Seeded SocialSituations: 1 topic group + 24 scenarios");
        }

        private void seedParties(String groupId, String category) {
                String sub = "parties";

                save(groupId, category, sub, Level.A1,
                                "Party Introduction",
                                "Introduce yourself at a party",
                                "Introduce yourself at a party",
                                "You\'re at a birthday party and someone starts talking to you. You need to introduce yourself.",
                                "Party Guest", "Another Guest",
                                "Hi there! I don\'t think we\'ve met. Are you a friend of the birthday person?",
                                List.of("Say hello", "Say your name", "Ask their name", "Make simple conversation"));

                save(groupId, category, sub, Level.A2,
                                "Party Conversation",
                                "Have a friendly conversation at a party",
                                "Have an enjoyable party conversation",
                                "You\'re at a house party and talking to someone new. You want to learn more about them and share about yourself.",
                                "Party Guest", "New Acquaintance",
                                "Great party, isn\'t it? So how do you know everyone here?",
                                List.of("Ask about their job or studies", "Share about yourself",
                                                "Find common interests", "Keep the conversation going"));

                save(groupId, category, sub, Level.B1,
                                "Dinner Party Host",
                                "Host a small dinner party",
                                "Successfully host an enjoyable dinner party",
                                "You\'re hosting a dinner party for friends. You need to make guests feel welcome, manage conversations, and ensure everyone is having a good time.",
                                "Host", "Guest",
                                "Thank you so much for having us! Your home looks lovely. Can I help with anything?",
                                List.of("Welcome guests warmly", "Introduce people who don\'t know each other",
                                                "Keep conversations flowing", "Handle any awkward moments"));

                save(groupId, category, sub, Level.B2,
                                "Networking Event",
                                "Network effectively at a professional social event",
                                "Build meaningful professional connections",
                                "You\'re at a professional networking event with potential business contacts. You need to make a positive impression while being genuinely engaging.",
                                "Professional", "Industry Contact",
                                "I noticed you seemed to know a lot of people here. I\'m relatively new to the industry. What brings you to events like this?",
                                List.of("Start conversations naturally", "Exchange professional information",
                                                "Identify mutual opportunities", "Follow up appropriately"));

                save(groupId, category, sub, Level.C1,
                                "High-Stakes Social Function",
                                "Navigate a high-profile social event",
                                "Navigate high-stakes social situations gracefully",
                                "You\'re at an exclusive industry gala where senior leaders and influential figures are present. Social interactions have professional implications.",
                                "Rising Executive", "Industry Leader",
                                "I\'ve heard interesting things about your work. These events can feel somewhat performative, but I find the genuine conversations are worth searching for. What\'s really exciting you professionally right now?",
                                List.of("Make appropriate impressions on VIPs", "Navigate status dynamics gracefully",
                                                "Build strategic relationships naturally",
                                                "Exit conversations diplomatically"));

                save(groupId, category, sub, Level.C2,
                                "Diplomatic Reception",
                                "Navigate a high-level diplomatic or political reception",
                                "Successfully navigate diplomatic social context",
                                "You\'re representing your organization at a diplomatic reception with government officials, ambassadors, and business leaders from multiple countries. Cultural protocols and political sensitivities matter.",
                                "Delegation Member", "Ambassador",
                                "Welcome to our reception. I understand your organization is exploring opportunities in our region. These social occasions offer valuable opportunities for understanding beyond formal negotiations. What aspects of our culture have you found most intriguing?",
                                List.of("Observe appropriate diplomatic protocols",
                                                "Navigate cultural differences gracefully",
                                                "Build bridges while representing interests",
                                                "Handle sensitive topics with discretion"));

        }

        private void seedSmallTalk(String groupId, String category) {
                String sub = "small talk";

                save(groupId, category, sub, Level.A1,
                                "Weather Talk",
                                "Talk about the weather",
                                "Make simple small talk about weather",
                                "You\'re waiting at a bus stop and want to make small talk with someone about the weather.",
                                "Stranger", "Another Stranger",
                                "It\'s a nice day today, isn\'t it?",
                                List.of("Comment on the weather", "Listen to their response", "Add another comment",
                                                "End the conversation politely"));

                save(groupId, category, sub, Level.A2,
                                "Office Small Talk",
                                "Chat with colleagues at work",
                                "Have a pleasant chat with a colleague",
                                "You\'re in the office kitchen making coffee and a colleague joins you. You want to have a friendly chat.",
                                "Employee", "Colleague",
                                "Oh hey! How\'s your Monday going so far? The coffee here is pretty good today.",
                                List.of("Ask about their day", "Share about your weekend or plans",
                                                "Find something to talk about", "Return to work naturally"));

                save(groupId, category, sub, Level.B1,
                                "Neighbor Conversation",
                                "Chat with a neighbor you\'ve just met",
                                "Build a friendly relationship with your new neighbor",
                                "You\'ve just moved to a new apartment and meet a neighbor in the hallway. You want to be friendly and learn about the building.",
                                "New Resident", "Neighbor",
                                "Oh, you must be new here! I saw the moving truck yesterday. Welcome to the building! I\'m in apartment 4B.",
                                List.of("Introduce yourself as new", "Ask about the neighborhood",
                                                "Share a bit about yourself",
                                                "Express interest in being good neighbors"));

                save(groupId, category, sub, Level.B2,
                                "Conference Break Chat",
                                "Network during a conference coffee break",
                                "Turn small talk into meaningful professional exchange",
                                "You\'re at a professional conference during a break. Someone approaches you for small talk, and it naturally leads to discussing your work.",
                                "Conference Attendee", "Fellow Attendee",
                                "The last presentation was quite thought-provoking, wasn\'t it? I found myself disagreeing with some points though. What did you think?",
                                List.of("Engage in appropriate openers", "Transition naturally to professional topics",
                                                "Find points of connection", "Exchange contact information naturally"));

                save(groupId, category, sub, Level.C1,
                                "Cross-Cultural Small Talk",
                                "Navigate small talk across cultures",
                                "Navigate cross-cultural social interaction skillfully",
                                "You\'re at an international gathering with people from various cultural backgrounds. Small talk norms vary significantly across cultures.",
                                "International Professional", "Professional from Different Culture",
                                "I noticed from your badge that you\'re based in a different region. I\'ve always been curious about how business culture differs there. What surprises visitors most about working in your context?",
                                List.of("Recognize cultural differences in conversation norms",
                                                "Adapt communication style appropriately",
                                                "Build bridges across cultural divides", "Avoid cultural missteps"));

                save(groupId, category, sub, Level.C2,
                                "Intellectual Salon Discourse",
                                "Engage in sophisticated intellectual discussion",
                                "Contribute meaningfully to intellectual discourse",
                                "You\'re at a gathering of intellectuals, artists, and thought leaders. Conversation ranges from philosophy to politics to arts, requiring cultural breadth and intellectual agility.",
                                "Intellectual Guest", "Renowned Thinker",
                                "I\'ve been contemplating the tension between technological determinism and human agency in shaping our future. The optimists seem naive, but the pessimists paralyzing. Where do you find intellectual ground that allows for meaningful action?",
                                List.of("Engage with ideas across domains",
                                                "Reference broad cultural knowledge appropriately",
                                                "Challenge ideas constructively",
                                                "Express nuanced perspectives elegantly"));

        }

        private void seedMakingFriends(String groupId, String category) {
                String sub = "making friends";

                save(groupId, category, sub, Level.A1,
                                "Playground Friends",
                                "Make friends in a casual setting",
                                "Start a friendly conversation",
                                "You\'re at a community event and see someone who looks friendly. You want to start talking to them.",
                                "Person Looking for Friends", "Potential Friend",
                                "Hi! This is a fun event, isn\'t it? Is this your first time here?",
                                List.of("Say hello", "Ask a simple question", "Share something about yourself",
                                                "Suggest doing something together"));

                save(groupId, category, sub, Level.A2,
                                "Class Friends",
                                "Make friends in a class or course",
                                "Start building a friendship with a classmate",
                                "You\'re taking an evening class and want to make friends with someone who sits near you. You\'re on a break.",
                                "Student", "Classmate",
                                "That was an interesting lesson! Do you find the homework difficult too?",
                                List.of("Start a conversation about the class", "Find out about their interests",
                                                "Share about yourself", "Suggest meeting outside class"));

                save(groupId, category, sub, Level.B1,
                                "Hobby Group Friend",
                                "Make friends through a shared hobby",
                                "Build friendships through shared interests",
                                "You\'ve joined a new hobby club and want to connect with other members. You share a common interest that brought you here.",
                                "New Club Member", "Experienced Member",
                                "I\'ve noticed you\'re really skilled! How long have you been doing this? I just started and I\'m hooked already.",
                                List.of("Bond over shared interests", "Learn about their experience",
                                                "Share your own journey", "Propose meeting up"));

                save(groupId, category, sub, Level.B2,
                                "Expat Friend",
                                "Making friends as an expat in a new country",
                                "Build meaningful friendships as an expat",
                                "You\'ve recently moved to a new country and are trying to build a social circle. You\'re at an expat meetup connecting with others in similar situations.",
                                "New Expat", "Established Expat",
                                "How long have you been here? The first few months were really challenging for me. It gets easier, I promise! What\'s been the hardest part for you so far?",
                                List.of("Connect over shared expat experiences", "Share adjustment challenges and tips",
                                                "Find common interests beyond nationality", "Plan to stay in touch"));

                save(groupId, category, sub, Level.C1,
                                "Reconnecting Friendship",
                                "Rebuild a friendship after time apart",
                                "Meaningfully reconnect with an old friend",
                                "You\'ve reconnected with an old friend after many years. You\'re navigating how much you\'ve both changed while honoring your history.",
                                "Old Friend", "Reconnected Friend",
                                "I can\'t believe it\'s been ten years! You look great, but I imagine so much has changed. I\'ve thought about reaching out so many times. What\'s life like for you now?",
                                List.of("Acknowledge shared history", "Discover who they\'ve become",
                                                "Share your own evolution", "Establish new connection terms"));

                save(groupId, category, sub, Level.C2,
                                "Late-Life Friendship",
                                "Form deep friendships later in life",
                                "Build a meaningful late-life friendship",
                                "You\'re forming a new friendship as a mature adult. The conversation involves discussing life perspectives, values, and what matters most at this stage.",
                                "Person Seeking Connection", "Potential Friend",
                                "I find that friendships formed at our age can be more genuine—we know who we are and what we value. What do you find yourself caring most about these days? What qualities do you seek in the people you choose to spend time with?",
                                List.of("Share accumulated life wisdom", "Explore compatible values and perspectives",
                                                "Discuss what friendship means at this stage",
                                                "Establish authentic connection"));

        }

        private void seedDating(String groupId, String category) {
                String sub = "dating";

                save(groupId, category, sub, Level.A1,
                                "First Meeting",
                                "Meet someone new you\'re interested in",
                                "Introduce yourself to someone you like",
                                "You\'re at a coffee shop and see someone interesting. You want to say hello and introduce yourself.",
                                "Interested Person", "Stranger",
                                "Oh, hello! Is this seat taken? This is a nice coffee shop, isn\'t it?",
                                List.of("Say hello nicely", "Introduce yourself", "Ask a simple question",
                                                "Get their name"));

                save(groupId, category, sub, Level.A2,
                                "Getting to Know You",
                                "Have a first conversation with someone you like",
                                "Learn more about someone you\'re interested in",
                                "You\'ve met someone at an event and you\'re both interested in talking more. This is your first longer conversation.",
                                "Person on a Date", "Date",
                                "I\'m glad we could talk more! So tell me, what do you like to do in your free time?",
                                List.of("Ask about their interests", "Share about yourself", "Find things in common",
                                                "Suggest meeting again"));

                save(groupId, category, sub, Level.B1,
                                "First Date Conversation",
                                "Have a successful first date conversation",
                                "Have an engaging first date conversation",
                                "You\'re on a first date at a restaurant. You want to make a good impression and genuinely get to know this person.",
                                "Person on First Date", "Date",
                                "I\'m really glad you suggested this place—the atmosphere is lovely. So, we\'ve texted quite a bit, but I\'m curious to learn more about you in person. What should I know?",
                                List.of("Keep conversation flowing naturally",
                                                "Share interesting things about yourself",
                                                "Show genuine interest in them", "End on a positive note"));

                save(groupId, category, sub, Level.B2,
                                "Deeper Dating Conversation",
                                "Have meaningful conversations while dating",
                                "Explore compatibility through meaningful conversation",
                                "You\'ve been on a few dates and want to have deeper conversations about values, life goals, and what you\'re looking for.",
                                "Person in Dating", "Dating Partner",
                                "Now that we\'ve gotten past the usual first date topics... I find myself wanting to know what really matters to you. What do you value most in life?",
                                List.of("Discuss values and priorities", "Share relationship expectations",
                                                "Explore life goals", "Navigate any differences"));

                save(groupId, category, sub, Level.C1,
                                "Relationship Discussion",
                                "Have an important relationship conversation",
                                "Navigate important relationship conversation",
                                "Your relationship has reached a point where you need to discuss future directions, commitments, and what both of you want going forward.",
                                "Partner", "Significant Other",
                                "I feel like we\'ve reached an important point in our relationship. There are things I want to talk about—about us, about the future. I hope we can be honest with each other about where we both are and what we want.",
                                List.of("Express your feelings and needs clearly", "Listen to partner\'s perspective",
                                                "Find common ground on future", "Address concerns constructively"));

                save(groupId, category, sub, Level.C2,
                                "Complex Relationship Navigation",
                                "Navigate complex relationship dynamics",
                                "Navigate relationship complexity with maturity",
                                "Your relationship involves complex considerations—perhaps different cultural backgrounds, life circumstances, or past experiences. Deep understanding and emotional intelligence are required.",
                                "Partner", "Partner",
                                "We both bring so much to this relationship—including some complicated histories and circumstances. I don\'t want to pretend things are simple when they\'re not. Can we talk honestly about how we navigate all of this together? What do we each need to feel truly supported?",
                                List.of("Acknowledge complexity with nuance",
                                                "Discuss challenging topics with emotional intelligence",
                                                "Find creative solutions to challenges",
                                                "Deepen connection through difficulty"));

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
