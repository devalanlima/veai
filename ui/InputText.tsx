import { Input } from "@/ui/input";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputTextProps extends React.ComponentProps<typeof Input> {
  label?: string;
  icon?: LucideIcon;
}

export function InputText({
  className,
  label,
  icon: Icon,
  ...props
}: InputTextProps) {
  return (
    <label className={cn("relative block w-full", label && "mt-6")}>
      {label && (
        <span className="absolute -top-6 text-sm text-muted-foreground">
          {label}
        </span>
      )}

      {Icon && (
        <Icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
      )}

      <Input {...props} className={cn(Icon && "pl-12", className)} />
    </label>
  );
}
