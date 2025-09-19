import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vstxqcyqkxpskdurtyml.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzdHhxY3lxa3hwc2tkdXJ0eW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyODcwMTYsImV4cCI6MjA3Mzg2MzAxNn0.jRl3NEKcJdQ8eQiKQ4wVnYg7-oiyg7J_qcY4gZYXG1c'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface LibraryRecord {
  id: number
  Student_Name: string
  // Add other fields as needed
}

export interface SeatsAvailableRecord {
  id: number
  SEATS_CENTRAL_LIBRARY: number
  SEATS_LAWSCHOOL: number
  SEATS_BIZ: number
  SEATS_FASHION: number
}
