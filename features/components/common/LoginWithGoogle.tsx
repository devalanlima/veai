import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/ui/button";
import Google from "@/ui/icons/Google";
import { VariantProps } from "class-variance-authority";

export default function LoginWithGoogle({
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
        "bg-white hover:bg-gray-200 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
    >
      <Google />
      Fazer login com o Google
    </Button>
  );
}
