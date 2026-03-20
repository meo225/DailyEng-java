import { Input } from "@/components/ui/input";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface FormFieldProps {
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  hasChanged: boolean;
  onReset: () => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  /** Extra label suffix, e.g. "(Google account)" */
  labelSuffix?: React.ReactNode;
}

export function FormField({
  label,
  icon: Icon,
  value,
  onChange,
  isEditing,
  hasChanged,
  onReset,
  placeholder,
  required = false,
  disabled = false,
  labelSuffix,
}: FormFieldProps) {
  const isFieldDisabled = !isEditing || disabled;
  const showReset = isEditing && hasChanged && !disabled;

  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">
        {label}
        {required && <span className="text-destructive">*</span>}
        {labelSuffix}
      </label>
      <div className="relative">
        <div className="relative">
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={isFieldDisabled}
            placeholder={placeholder}
            className={cn(
              "pl-10 border-input",
              !isEditing &&
                "disabled:opacity-100 disabled:text-foreground disabled:cursor-default",
              disabled && "bg-muted cursor-not-allowed",
              showReset && "pr-10",
            )}
          />
        </div>
        {showReset && (
          <button
            type="button"
            onClick={onReset}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            title="Reset to original"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
