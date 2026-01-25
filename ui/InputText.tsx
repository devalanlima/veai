import { Input } from "@/ui/input";
import { LucideIcon, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputTextProps extends React.ComponentProps<typeof Input> {
  label?: string;
  icon?: LucideIcon;
  errorMessage?: string;
}

export function InputText({
  className,
  label,
  errorMessage,
  icon: Icon,
  ...props
}: InputTextProps) {
  return (
    <label
      className={cn(
        "relative block w-full h-11",
        label && "mt-6",
        errorMessage && "mb-6",
      )}
    >
      {label && (
        <span className="absolute -top-6 left-1 text-sm text-muted-foreground">
          {label}
        </span>
      )}

      {Icon && (
        <Icon
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary",
            errorMessage && "text-destructive",
          )}
        />
      )}

      <Input
        aria-invalid={!!errorMessage}
        {...props}
        className={cn(Icon && "pl-12", className)}
      />

      {errorMessage && (
        <TriangleAlert
          className={cn(
            "absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary",
            errorMessage && "text-destructive",
          )}
        />
      )}

      {errorMessage && (
        <span className="absolute left-1 text-destructive -bottom-5 text-xs">
          {errorMessage}
        </span>
      )}
    </label>
  );
}
