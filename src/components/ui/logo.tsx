import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className, showText = true, size = "md" }: LogoProps) => {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div className={cn(
          "rounded-full bg-gradient-primary p-2 shadow-soft",
          sizes[size]
        )}>
          <MapPin className="h-full w-full text-white" />
        </div>
      </div>
      {showText && (
        <div className={cn("font-bold", textSizes[size])}>
          <span className="text-primary">Seat</span>
          <span className="text-accent">Scout</span>
        </div>
      )}
    </div>
  );
};