import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Logo } from "@/components/ui/logo";
import { MobileContainer } from "@/components/ui/mobile-container";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { useBookings } from "@/hooks/useBookings";
import { ArrowLeft, CheckCircle, Clock, Check, MapPin, Calendar } from "lucide-react";

interface Seat {
  id: number;
  number: string;
  available: boolean;
  selected?: boolean;
}

const SeatBooking = () => {
  const { libraryName, floorNumber } = useParams<{ libraryName: string; floorNumber: string }>();
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isBooking, setIsBooking] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Decode the library name from URL
  const decodedLibraryName = libraryName ? decodeURIComponent(libraryName) : "Library";
  const floor = floorNumber || "1";

  // Time slots for booking
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
  ];

  // Get today's date and next few days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: i === 0 ? 'Today' : 
               i === 1 ? 'Tomorrow' : 
               date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const handleBack = () => {
    navigate(`/library/${libraryName}/floors`);
  };

  const handleSeatSelect = (seat: Seat) => {
    if (seat.available) {
      setSelectedSeat(seat);
    }
  };

  const handleConfirmBooking = async () => {
    if (selectedSeat && selectedDate && selectedTime) {
      setIsBooking(true);
      
      try {
        // Create the booking
        const booking = {
          library: decodedLibraryName,
          floor: parseInt(floor),
          seatNumber: selectedSeat.number,
          date: selectedDate,
          time: selectedTime,
          status: 'upcoming' as const
        };

        // Add booking to state and update Supabase
        await addBooking(booking);
        
        // Show success confirmation
        setBookingSuccess(true);
        setShowConfirmation(true);
      } catch (error) {
        console.error('Error booking seat:', error);
        alert('Failed to book seat. Please try again.');
      } finally {
        setIsBooking(false);
      }
    }
  };

  const handleViewBookings = () => {
    setShowConfirmation(false);
    navigate("/bookings");
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setBookingSuccess(false);
    // Reset selections
    setSelectedSeat(null);
    setSelectedTime("");
    setSelectedDate("");
  };

  const isBookingReady = selectedSeat && selectedDate && selectedTime;

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

          {/* Date and Time Selection */}
          <div className="space-y-4">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Date
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableDates.slice(0, 4).map((date) => (
                  <button
                    key={date.value}
                    onClick={() => setSelectedDate(date.value)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      selectedDate === date.value
                        ? 'bg-primary text-primary-foreground border-primary-dark'
                        : 'bg-card text-foreground border-border hover:bg-muted'
                    }`}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg border-2 text-xs font-medium transition-all duration-200 ${
                      selectedTime === time
                        ? 'bg-primary text-primary-foreground border-primary-dark'
                        : 'bg-card text-foreground border-border hover:bg-muted'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
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
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent-dark" />
                  <span className="font-medium text-accent-dark">Booking Details</span>
                </div>
                
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Library:</span> {decodedLibraryName}</p>
                  <p><span className="font-medium">Floor:</span> {floor}</p>
                  <p><span className="font-medium">Seat:</span> {selectedSeat.number}</p>
                  {selectedDate && (
                    <p><span className="font-medium">Date:</span> {availableDates.find(d => d.value === selectedDate)?.label}</p>
                  )}
                  {selectedTime && (
                    <p><span className="font-medium">Time:</span> {selectedTime}</p>
                  )}
                </div>

                <Button 
                  onClick={handleConfirmBooking}
                  disabled={!isBookingReady || isBooking}
                  className={`w-full ${
                    isBookingReady && !isBooking
                      ? 'bg-primary hover:bg-primary/90 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {isBooking 
                    ? 'Booking...' 
                    : isBookingReady 
                      ? 'Confirm Booking' 
                      : 'Select Date & Time'
                  }
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>

      {/* Booking Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              Booking Confirmed!
            </DialogTitle>
            <DialogDescription>
              Your seat has been successfully booked. Here are your booking details:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Booking Details Card */}
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{decodedLibraryName}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span>Floor {floor} • Seat {selectedSeat?.number}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span>{selectedDate} at {selectedTime}</span>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={handleViewBookings}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                View My Bookings
              </Button>
              <Button 
                variant="outline"
                onClick={handleCloseConfirmation}
                className="flex-1"
              >
                Book Another Seat
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNavigation />
    </MobileContainer>
  );
};

export default SeatBooking;
