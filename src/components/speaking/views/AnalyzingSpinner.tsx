import { Bot } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AnalyzingSpinnerProps {
  title: string;
  description: string;
}

/** Shared full-page loading spinner used during session analysis. */
export default function AnalyzingSpinner({
  title,
  description,
}: AnalyzingSpinnerProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <Card className="p-16 text-center border-0 shadow-2xl bg-white rounded-[3rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-50 via-transparent to-transparent opacity-70" />
        <div className="relative z-10">
          <div className="relative mx-auto mb-8 w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
            <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin" />
            <Bot className="absolute inset-0 m-auto h-8 w-8 text-primary-500 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-slate-800">{title}</h2>
          <p className="text-lg text-slate-500 max-w-md mx-auto">
            {description}
          </p>
        </div>
      </Card>
    </div>
  );
}
