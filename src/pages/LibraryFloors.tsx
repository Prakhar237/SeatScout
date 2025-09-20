import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { MobileContainer } from "@/components/ui/mobile-container";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { useSeats } from "@/hooks/useSeats";
import { ArrowLeft } from "lucide-react";

const LibraryFloors = () => {
  const { libraryName } = useParams<{ libraryName: string }>();
  const navigate = useNavigate();
  const { seats, loading } = useSeats();

  // Decode the library name from URL
  const decodedLibraryName = libraryName ? decodeURIComponent(libraryName) : "Library";

  // Only Central Library has 6 floors, others have only Floor 1
  const isCentralLibrary = decodedLibraryName === "Central Library";

  // Get available seats for this library
  const getAvailableSeatsForLibrary = () => {
    if (!seats) return 0;
    
    switch (decodedLibraryName) {
      case "Central Library":
        return seats.central;
      case "Law School Library":
        return seats.law;
      case "Business School Library":
        return seats.business;
      case "Fashion School Library":
        return seats.fashion;
      default:
        return 0;
    }
  };

  const availableSeats = getAvailableSeatsForLibrary();
  const hasAvailableSeats = availableSeats > 0;
  
  const floors = isCentralLibrary 
    ? [
        { level: 1, name: "Level - 1", available: hasAvailableSeats },
        { level: 2, name: "Level - 2", available: hasAvailableSeats },
        { level: 3, name: "Level - 3", available: hasAvailableSeats },
        { level: 4, name: "Level - 4", available: hasAvailableSeats },
        { level: 5, name: "Level - 5", available: hasAvailableSeats },
        { level: 6, name: "Level - 6", available: hasAvailableSeats },
      ]
    : [
        { level: 1, name: "Level - 1", available: hasAvailableSeats },
      ];

  const handleFloorSelect = (level: number, available: boolean) => {
    // Only navigate if seats are available
    if (available) {
      navigate(`/library/${libraryName}/floor/${level}/seats`);
    }
  };

  const handleBack = () => {
    navigate("/libraries");
  };

  if (loading) {
    return (
      <MobileContainer>
        <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border h-app-header">
          <div className="flex items-center justify-between px-6 h-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2 hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Logo size="sm" />
            <div className="w-9" />
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading floor availability...</p>
          </div>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border h-app-header">
        <div className="flex items-center justify-between px-6 h-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-2 hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Logo size="sm" />
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Library Banner */}
      <div className="px-6 pt-4 pb-6">
        <div className={`w-full text-primary-foreground rounded-lg p-6 text-center border-2 ${
          hasAvailableSeats 
            ? 'bg-primary border-primary-dark' 
            : 'bg-gray-400 border-gray-500'
        }`}>
          <h1 className="text-2xl font-bold">{decodedLibraryName}</h1>
          <p className="text-sm opacity-90 mt-2">
            {hasAvailableSeats ? `${availableSeats} seats available` : 'No seats available'}
          </p>
        </div>
      </div>

      {/* Floor Selection */}
      <main className="px-6 pb-24 animate-fade-in">
        <div className={`grid gap-4 ${isCentralLibrary ? 'grid-cols-2' : 'grid-cols-1 max-w-xs mx-auto'}`}>
          {floors.map((floor) => (
            <Button
              key={floor.level}
              onClick={() => handleFloorSelect(floor.level, floor.available)}
              disabled={!floor.available}
              className={`h-16 border-2 rounded-lg font-medium text-base transition-all duration-200 ${
                floor.available
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground border-primary-dark cursor-pointer'
                  : 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
              }`}
            >
              {floor.name}
              {!floor.available && (
                <span className="block text-xs opacity-75">No seats</span>
              )}
            </Button>
          ))}
        </div>
      </main>

      <BottomNavigation />
    </MobileContainer>
  );
};

export default LibraryFloors;
