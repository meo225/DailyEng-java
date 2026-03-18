import { Sparkles } from "lucide-react";

interface SparkleLoadingOverlayProps {
  message?: string;
}

export function SparkleLoadingOverlay({
  message = "Generating scenario...",
}: SparkleLoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-white shadow-xl border border-primary-100">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center animate-pulse">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-bounce" />
          <Sparkles className="absolute -bottom-1 -left-3 w-5 h-5 text-yellow-500 animate-bounce delay-100" />
          <Sparkles className="absolute top-1/2 -right-4 w-4 h-4 text-primary-400 animate-bounce delay-200" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">{message}</h3>
          <p className="text-muted-foreground text-sm">
            AI is crafting the perfect scenario for you
          </p>
        </div>
        <div className="flex gap-1.5">
          <div
            className="w-2 h-2 rounded-full bg-primary-400 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-primary-600 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
