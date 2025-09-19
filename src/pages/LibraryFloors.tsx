import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { MobileContainer } from "@/components/ui/mobile-container";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { ArrowLeft } from "lucide-react";

const LibraryFloors = () => {
  const { libraryName } = useParams<{ libraryName: string }>();
  const navigate = useNavigate();

  // Decode the library name from URL
  const decodedLibraryName = libraryName ? decodeURIComponent(libraryName) : "Library";

  // Only Central Library has 6 floors, others have only Floor 1
  const isCentralLibrary = decodedLibraryName === "Central Library";
  
  const floors = isCentralLibrary 
    ? [
        { level: 1, name: "Level - 1" },
        { level: 2, name: "Level - 2" },
        { level: 3, name: "Level - 3" },
        { level: 4, name: "Level - 4" },
        { level: 5, name: "Level - 5" },
        { level: 6, name: "Level - 6" },
      ]
    : [
        { level: 1, name: "Level - 1" },
      ];

  const handleFloorSelect = (level: number) => {
    // Navigate to seat booking for the specific floor
    navigate(`/library/${libraryName}/floor/${level}/seats`);
  };

  const handleBack = () => {
    navigate("/libraries");
  };

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
        <div className="w-full bg-primary text-primary-foreground rounded-lg p-6 text-center border-2 border-primary-dark">
          <h1 className="text-2xl font-bold">{decodedLibraryName}</h1>
        </div>
      </div>

      {/* Floor Selection */}
      <main className="px-6 pb-24 animate-fade-in">
        <div className={`grid gap-4 ${isCentralLibrary ? 'grid-cols-2' : 'grid-cols-1 max-w-xs mx-auto'}`}>
          {floors.map((floor) => (
            <Button
              key={floor.level}
              onClick={() => handleFloorSelect(floor.level)}
              className="h-16 bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary-dark rounded-lg font-medium text-base"
            >
              {floor.name}
            </Button>
          ))}
        </div>
      </main>

      <BottomNavigation />
    </MobileContainer>
  );
};

export default LibraryFloors;
