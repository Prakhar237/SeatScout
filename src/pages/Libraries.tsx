import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { MobileContainer } from "@/components/ui/mobile-container";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import centralLibraryImg from "@/assets/CLB.png";
import lawLibraryImg from "@/assets/school of law.png";
import businessLibraryImg from "@/assets/business-library.jpg";
import fashionLibraryImg from "@/assets/fashion-library.jpg";

const Libraries = () => {
  const libraries = [
    {
      id: 1,
      name: "Central Library",
      image: centralLibraryImg,
      availableSeats: 45,
      totalSeats: 60,
    },
    {
      id: 2,
      name: "Law School Library",
      image: lawLibraryImg,
      availableSeats: 23,
      totalSeats: 30,
    },
    {
      id: 3,
      name: "Business School Library",
      image: businessLibraryImg,
      availableSeats: 18,
      totalSeats: 25,
    },
    {
      id: 4,
      name: "Fashion School Library",
      image: fashionLibraryImg,
      availableSeats: 12,
      totalSeats: 20,
    },
  ];

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return "text-accent";
    if (percentage > 20) return "text-yellow-500";
    return "text-destructive";
  };

  return (
    <MobileContainer>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border h-app-header">
        <div className="flex flex-col items-center justify-center px-6 h-full">
          <Logo size="sm" />
        </div>
      </header>

      {/* Libraries Title */}
      <div className="px-6 pt-4 pb-2 text-center">
        <h1 className="text-xl font-bold text-foreground">Libraries</h1>
      </div>

      {/* Main Content */}
      <main className="px-6 py-2 pb-24 animate-fade-in">
        <div className="grid grid-cols-2 gap-4">
          {libraries.map((library) => (
            <Card 
              key={library.id}
              className="overflow-hidden bg-card shadow-card hover:shadow-soft transition-all duration-300 cursor-pointer hover:scale-[1.02] border-border"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={library.image}
                  alt={library.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <div className="text-xs font-medium">
                    <span className={getAvailabilityColor(library.availableSeats, library.totalSeats)}>
                      {library.availableSeats}
                    </span>
                    <span className="text-white/80">/{library.totalSeats}</span>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm text-foreground leading-tight">
                  {library.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {library.availableSeats} seats available
                </p>
              </div>
            </Card>
          ))}
        </div>

      </main>

      <BottomNavigation />
    </MobileContainer>
  );
};

export default Libraries;