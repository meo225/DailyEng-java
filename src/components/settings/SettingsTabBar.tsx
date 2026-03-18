import type { TabType } from "@/hooks/settings/types";
import { SETTINGS_TABS } from "@/hooks/settings/types";

interface SettingsTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function SettingsTabBar({
  activeTab,
  onTabChange,
}: SettingsTabBarProps) {
  return (
    <div className="flex gap-8 mb-8 border-b border-border">
      {SETTINGS_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`pb-3 px-2 text-base font-bold transition-colors border-b-2 ${
            activeTab === tab.id
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
