import { useState, useEffect } from 'react'
import { supabase, SeatsAvailableRecord } from '@/lib/supabase'

interface LibrarySeats {
  central: number
  law: number
  business: number
  fashion: number
}

interface UseSeatsResult {
  seats: LibrarySeats | null
  loading: boolean
  error: string | null
}

export const useSeats = (): UseSeatsResult => {
  const [seats, setSeats] = useState<LibrarySeats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch seats data from SEATS AVAILABLE table
        const { data, error: fetchError } = await supabase
          .from('SEATS AVAILABLE')
          .select('SEATS_CENTRAL_LIBRARY, SEATS_LAWSCHOOL, SEATS_BIZ, SEATS_FASHION')
          .limit(1)
          .single()

        if (fetchError) {
          throw fetchError
        }

        if (data) {
          setSeats({
            central: data.SEATS_CENTRAL_LIBRARY || 0,
            law: data.SEATS_LAWSCHOOL || 0,
            business: data.SEATS_BIZ || 0,
            fashion: data.SEATS_FASHION || 0,
          })
        } else {
          // Fallback data if no data found
          setSeats({
            central: 45,
            law: 23,
            business: 18,
            fashion: 12,
          })
        }
      } catch (err) {
        console.error('Error fetching seats data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch seats data')
        // Fallback data on error
        setSeats({
          central: 45,
          law: 23,
          business: 18,
          fashion: 12,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSeats()
  }, [])

  return { seats, loading, error }
}
