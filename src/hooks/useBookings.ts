import { useState, useEffect } from 'react'
import { updateSeatsInDatabase } from '@/lib/supabase'

export interface Booking {
  id: string
  library: string
  floor: number
  seatNumber: string
  date: string
  time: string
  status: 'active' | 'upcoming'
  createdAt: string
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([])

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('seatscout-bookings')
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings))
    }
  }, [])

  // Save bookings to localStorage whenever bookings change
  useEffect(() => {
    localStorage.setItem('seatscout-bookings', JSON.stringify(bookings))
  }, [bookings])

  const addBooking = async (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    try {
      // Update seats in Supabase database (decrement by 1)
      await updateSeatsInDatabase(booking.library, 'decrement');
      
      // Add booking to local state
      const newBooking: Booking = {
        ...booking,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      setBookings(prev => [newBooking, ...prev])
      return newBooking
    } catch (error) {
      console.error('Error adding booking:', error);
      throw error; // Re-throw so the UI can handle the error
    }
  }

  const removeBooking = async (id: string) => {
    try {
      // Find the booking to get the library name
      const booking = bookings.find(b => b.id === id);
      if (booking) {
        // Update seats in Supabase database (increment by 1)
        await updateSeatsInDatabase(booking.library, 'increment');
      }
      
      // Remove booking from local state
      setBookings(prev => prev.filter(booking => booking.id !== id))
    } catch (error) {
      console.error('Error removing booking:', error);
      throw error; // Re-throw so the UI can handle the error
    }
  }

  const updateBookingStatus = (id: string, status: 'active' | 'upcoming') => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      )
    )
  }

  return {
    bookings,
    addBooking,
    removeBooking,
    updateBookingStatus,
  }
}
