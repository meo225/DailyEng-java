import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// ─── Types ─────────────────────────────────────────

interface CreateScenarioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topicPrompt: string;
  onTopicPromptChange: (value: string) => void;
  isCreating: boolean;
  onCreateScenario: () => void;
}

// ─── Component ─────────────────────────────────────

export function CreateScenarioDialog({
  open,
  onOpenChange,
  topicPrompt,
  onTopicPromptChange,
  isCreating,
  onCreateScenario,
}: CreateScenarioDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Custom Topic</DialogTitle>
          <DialogDescription>
            Describe the situation or topic you want to practice. AI will
            generate a roleplay scenario for you.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="E.g. I want to practice arguing about a refund at an electronics store..."
            value={topicPrompt}
            onChange={(e) => onTopicPromptChange(e.target.value)}
            rows={4}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            onClick={onCreateScenario}
            disabled={isCreating || !topicPrompt.trim()}
          >
            {isCreating && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isCreating ? "Generating..." : "Create Scenario"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
