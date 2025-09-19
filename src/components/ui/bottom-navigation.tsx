import { Home, Clock, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export const BottomNavigation = () => {
  const navItems = [
    { icon: Home, label: "Home", to: "/libraries" },
    { icon: Clock, label: "My Bookings", to: "/bookings" },
    { icon: User, label: "Profile", to: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-card border-t border-border h-bottom-nav">
      <div className="flex items-center justify-around h-full px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all duration-200",
              "text-muted-foreground hover:text-primary hover:bg-primary-light/20",
              isActive && "text-primary bg-primary-light/30"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};