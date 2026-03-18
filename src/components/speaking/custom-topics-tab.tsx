import { Gift, MessageSquarePlus, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TopicCard } from "@/components/hub";
import type { Scenario } from "@/hooks/speaking/types";
import { TopicCardGridSkeleton } from "./topic-card-grid-skeleton";
import { useTranslation } from "@/hooks/use-translation";

interface CustomTopicsTabProps {
  onFreeTalk: () => void;
  onOpenDialog: () => void;
  onSurpriseMe: () => void;
  customScenarios: Scenario[];
  customScenariosLoading: boolean;
  bookmarkedTopics: string[];
  onBookmarkToggle: (topicId: string) => void;
  onScenarioClick?: (id: string) => void;
}

export function CustomTopicsTab({
  onFreeTalk,
  onOpenDialog,
  onSurpriseMe,
  customScenarios,
  customScenariosLoading,
  bookmarkedTopics,
  onBookmarkToggle,
  onScenarioClick,
}: CustomTopicsTabProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Card className="p-8 rounded-3xl border-2 border-primary-100 bg-white">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-1">{t("speaking_hub.custom.create_title")}</h3>
          <p className="text-muted-foreground text-sm">
            {t("speaking_hub.custom.create_desc")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <ActionCard
            onClick={onFreeTalk}
            icon={<MessageCircle className="h-6 w-6 text-emerald-600" />}
            title={t("speaking_hub.custom.free_talk")}
            description={t("speaking_hub.custom.free_talk_desc")}
            colorScheme="emerald"
          />
          <ActionCard
            onClick={onOpenDialog}
            icon={<MessageSquarePlus className="h-6 w-6 text-primary-600" />}
            title={t("speaking_hub.custom.create_scenario")}
            description={t("speaking_hub.custom.create_scenario_desc")}
            colorScheme="primary"
          />
          <ActionCard
            onClick={onSurpriseMe}
            icon={<Gift className="h-6 w-6 text-primary-600" />}
            title={t("speaking_hub.custom.surprise_me")}
            description={t("speaking_hub.custom.surprise_me_desc")}
            colorScheme="primary"
          />
        </div>
      </Card>

      <h3 className="text-xl font-bold mt-8 mb-4">{t("speaking_hub.custom.your_scenarios")}</h3>

      {customScenariosLoading ? (
        <TopicCardGridSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-4">
          {customScenarios.map((topic) => (
            <TopicCard
              key={topic.id}
              id={topic.id}
              title={topic.title}
              description={topic.description}
              level={topic.level}
              wordCount={7}
              thumbnail={topic.image}
              progress={topic.progress}
              href={`/speaking/session/${topic.id}`}
              onNotYet={() => {}}
              type="speaking"
              subcategory={topic.subcategory}
              isBookmarked={bookmarkedTopics.includes(topic.id)}
              onBookmarkToggle={onBookmarkToggle}
              onClick={(id) => onScenarioClick?.(id)}
            />
          ))}
          {customScenarios.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center py-8">
              {t("speaking_hub.custom.no_scenarios")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Internal sub-component ─────────────────────────

interface ActionCardProps {
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  colorScheme: "emerald" | "primary";
}

function ActionCard({
  onClick,
  icon,
  title,
  description,
  colorScheme,
}: ActionCardProps) {
  const borderColor =
    colorScheme === "emerald"
      ? "border-emerald-200 hover:border-emerald-400"
      : "border-primary-200 hover:border-primary-400";
  const bgColor =
    colorScheme === "emerald" ? "bg-emerald-50/50" : "bg-primary-50/50";
  const iconBg =
    colorScheme === "emerald"
      ? "bg-emerald-100 group-hover:bg-emerald-200"
      : "bg-primary-100 group-hover:bg-primary-200";

  return (
    <Card
      onClick={onClick}
      className={`p-6 rounded-2xl border-2 border-dashed ${borderColor} ${bgColor} transition-colors cursor-pointer group`}
    >
      <div className="text-center">
        <div
          className={`w-12 h-12 mx-auto mb-4 rounded-xl ${iconBg} flex items-center justify-center transition-colors`}
        >
          {icon}
        </div>
        <h4 className="font-bold mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}
