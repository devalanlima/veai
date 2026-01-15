import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/ui/button";
import Twitch from "@/ui/icons/Twitch";
import { VariantProps } from "class-variance-authority";

export default function LoginWithTwitch({
  className,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  return (
    <Button
      {...props}
      className={cn(
        "bg-[#9147ff] hover:bg-[#772ce8] text-white focus:outline-none focus:ring-2 focus:ring-[#9147ff]",
        className
      )}
    >
      <Twitch />
      Entrar com a Twitch
    </Button>
  );
}
