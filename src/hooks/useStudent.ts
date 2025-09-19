import { useState, useEffect } from 'react'
import { supabase, LibraryRecord } from '@/lib/supabase'

interface UseStudentResult {
  studentName: string | null
  loading: boolean
  error: string | null
}

export const useStudent = (): UseStudentResult => {
  const [studentName, setStudentName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch the first student record from the LIBRARY table
        const { data, error: fetchError } = await supabase
          .from('LIBRARY')
          .select('Student_Name')
          .limit(1)
          .single()

        if (fetchError) {
          throw fetchError
        }

        if (data && data.Student_Name) {
          setStudentName(data.Student_Name)
        } else {
          setStudentName('Student User') // Fallback name
        }
      } catch (err) {
        console.error('Error fetching student data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch student data')
        setStudentName('Student User') // Fallback name
      } finally {
        setLoading(false)
      }
    }

    fetchStudent()
  }, [])

  return { studentName, loading, error }
}
