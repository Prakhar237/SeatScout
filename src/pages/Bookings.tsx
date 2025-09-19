import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { MobileContainer } from "@/components/ui/mobile-container";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { Clock, MapPin, Calendar } from "lucide-react";

const Bookings = () => {
  const bookings: any[] = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-accent text-accent-foreground";
      case "upcoming":
        return "bg-primary-light text-primary";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <MobileContainer>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border h-app-header">
        <div className="flex flex-col items-center justify-center px-6 h-full">
          <Logo size="sm" />
        </div>
      </header>

      {/* My Bookings Title */}
      <div className="px-6 pt-4 pb-2 text-center">
        <h1 className="text-xl font-bold text-foreground">My Bookings</h1>
      </div>

      {/* Main Content */}
      <main className="px-6 py-2 pb-24 animate-fade-in">
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="p-4 bg-card shadow-card border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{booking.library}</h3>
                  <p className="text-sm text-muted-foreground">Seat {booking.seatNumber}</p>
                </div>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status === "active" ? "Active" : "Upcoming"}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Level 2, Study Area</span>
                </div>
              </div>

              {booking.status === "active" && (
                <div className="mt-4 p-3 bg-accent-light/20 rounded-lg border border-accent-light">
                  <p className="text-sm text-accent-dark font-medium">
                    🟢 Currently checked in
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Remember to check out when you leave
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">No bookings yet</h3>
            <p className="text-muted-foreground text-sm">
              Start by selecting a library and booking your seat
            </p>
          </div>
        )}
      </main>

      <BottomNavigation />
    </MobileContainer>
  );
};

export default Bookings;