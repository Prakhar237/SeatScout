import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { MobileContainer } from "@/components/ui/mobile-container";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface Seat {
  id: number;
  number: string;
  available: boolean;
  selected?: boolean;
}

const SeatBooking = () => {
  const { libraryName, floorNumber } = useParams<{ libraryName: string; floorNumber: string }>();
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  // Decode the library name from URL
  const decodedLibraryName = libraryName ? decodeURIComponent(libraryName) : "Library";
  const floor = floorNumber || "1";

  const handleBack = () => {
    navigate(`/library/${libraryName}/floors`);
  };

  const handleSeatSelect = (seat: Seat) => {
    if (seat.available) {
      setSelectedSeat(seat);
    }
  };

  const handleConfirmBooking = () => {
    if (selectedSeat) {
      // Here you would typically send the booking to your backend
      console.log(`Booking seat ${selectedSeat.number} in ${decodedLibraryName} Floor ${floor}`);
      // Navigate to confirmation page or show success message
      navigate("/bookings");
    }
  };

  // Generate 15 seats with mixed availability
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    
    // Create 15 seats with some occupied and some available
    for (let i = 1; i <= 15; i++) {
      seats.push({
        id: i,
        number: i.toString().padStart(2, '0'),
        // Make some seats occupied (seats 3, 7, 12 are occupied)
        available: ![3, 7, 12].includes(i)
      });
    }

    return seats;
  };

  const seats = generateSeats();

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

      {/* Library and Floor Info */}
      <div className="px-6 pt-4 pb-4">
        <div className="w-full bg-primary text-primary-foreground rounded-lg p-4 text-center border-2 border-primary-dark">
          <h1 className="text-lg font-bold">{decodedLibraryName}</h1>
          <p className="text-sm opacity-90">Floor {floor} - STUDY ZONE B</p>
        </div>
      </div>

      {/* Seat Map */}
      <main className="px-6 pb-24 animate-fade-in">
        <div className="space-y-6">
          {/* Legend */}
          <div className="flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent border-2 border-accent-dark rounded"></div>
              <span className="text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 border-2 border-gray-400 rounded"></div>
              <span className="text-muted-foreground">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent border-2 border-yellow-500 rounded"></div>
              <span className="text-muted-foreground">Selected</span>
            </div>
          </div>

          {/* STUDY ZONE B Label */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-foreground">STUDY ZONE B</h2>
          </div>

          {/* Seat Grid - 15 seats in 3x5 layout */}
          <div className="bg-white rounded-lg p-6 shadow-card border border-border">
            <div className="grid grid-cols-5 gap-4 justify-items-center">
              {seats.map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatSelect(seat)}
                  disabled={!seat.available}
                  className={`
                    w-12 h-12 rounded-lg text-sm font-semibold transition-all duration-200 border-2
                    ${!seat.available 
                      ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed' 
                      : selectedSeat?.id === seat.id
                      ? 'bg-accent text-accent-foreground border-yellow-500 shadow-lg scale-105'
                      : 'bg-accent text-accent-foreground border-accent-dark hover:bg-accent/80 hover:scale-105 cursor-pointer shadow-md'
                    }
                  `}
                >
                  {seat.number}
                </button>
              ))}
            </div>
          </div>

          {/* Booking Confirmation */}
          {selectedSeat && (
            <Card className="p-4 bg-accent-light/20 border border-accent-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-accent-dark">Selected Seat</p>
                  <p className="text-sm text-muted-foreground">
                    {decodedLibraryName} - Floor {floor} - Seat {selectedSeat.number}
                  </p>
                </div>
                <Button 
                  onClick={handleConfirmBooking}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Book Seat
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>

      <BottomNavigation />
    </MobileContainer>
  );
};

export default SeatBooking;
