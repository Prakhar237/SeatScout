import { cn } from "@/lib/utils";

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileContainer = ({ children, className }: MobileContainerProps) => {
  return (
    <div className={cn(
      "mx-auto max-w-sm min-h-screen bg-background",
      "relative overflow-hidden",
      className
    )}>
      {children}
    </div>
  );
};