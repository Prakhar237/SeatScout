import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { MobileContainer } from "@/components/ui/mobile-container";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { Settings, Bell, HelpCircle, LogOut, User, BookOpen, Clock } from "lucide-react";
import { useStudent } from "@/hooks/useStudent";

const Profile = () => {
  const { studentName, loading, error } = useStudent();
  
  const user = {
    name: studentName || "Loading...",
    studentId: "UMS2024001",
    email: "student@university.edu",
    program: "Computer Science",
    year: "3rd Year",
  };

  const stats = [
    { label: "Total Bookings", value: "127", icon: BookOpen },
    { label: "Hours Studied", value: "342", icon: Clock },
    { label: "Favorite Library", value: "Central", icon: User },
  ];

  const menuItems = [
    { icon: Settings, label: "Settings", description: "App preferences" },
    { icon: Bell, label: "Notifications", description: "Booking reminders" },
    { icon: HelpCircle, label: "Help & Support", description: "Get assistance" },
  ];

  if (loading) {
    return (
      <MobileContainer>
        <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border h-app-header">
          <div className="flex flex-col items-center justify-center px-6 h-full">
            <Logo size="sm" />
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border h-app-header">
        <div className="flex flex-col items-center justify-center px-6 h-full">
          <Logo size="sm" />
        </div>
      </header>

      {/* Profile Title */}
      <div className="px-6 pt-4 pb-2 text-center">
        <h1 className="text-xl font-bold text-foreground">Profile</h1>
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-6 py-2">
          <Card className="p-4 bg-destructive/10 border-destructive/20">
            <p className="text-destructive text-sm">
              Error loading profile: {error}
            </p>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <main className="px-6 py-2 pb-24 animate-fade-in">
        {/* User Info */}
        <Card className="p-6 mb-6 bg-gradient-primary border-0 text-white">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white/20">
              <AvatarFallback className="bg-white/20 text-white text-lg font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-white/80 text-sm">{user.studentId}</p>
              <p className="text-white/80 text-sm">{user.program} • {user.year}</p>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4 text-center bg-card border-border">
              <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground leading-tight">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item) => (
            <Card key={item.label} className="p-4 bg-card border-border cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-light rounded-lg">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full h-12 border-destructive text-destructive hover:bg-destructive hover:text-white"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </main>

      <BottomNavigation />
    </MobileContainer>
  );
};

export default Profile;