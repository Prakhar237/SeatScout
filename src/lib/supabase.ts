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

// Function to update seats in the database
export const updateSeatsInDatabase = async (libraryName: string, operation: 'increment' | 'decrement') => {
  try {
    let columnName: string;
    
    // Map library names to database column names
    switch (libraryName) {
      case 'Central Library':
        columnName = 'SEATS_CENTRAL_LIBRARY';
        break;
      case 'Law School Library':
        columnName = 'SEATS_LAWSCHOOL';
        break;
      case 'Business School Library':
        columnName = 'SEATS_BIZ';
        break;
      case 'Fashion School Library':
        columnName = 'SEATS_FASHION';
        break;
      default:
        throw new Error(`Unknown library: ${libraryName}`);
    }

    // First, get the current seats data
    const { data: currentData, error: fetchError } = await supabase
      .from('SEATS AVAILABLE')
      .select(columnName)
      .limit(1)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    if (!currentData) {
      throw new Error('No seats data found');
    }

    // Calculate new seat count
    const currentSeats = currentData[columnName as keyof SeatsAvailableRecord] as number;
    const newSeatCount = operation === 'decrement' 
      ? Math.max(0, currentSeats - 1)  // Ensure it doesn't go below 0
      : currentSeats + 1;

    // Update the seats in the database
    const { error: updateError } = await supabase
      .from('SEATS AVAILABLE')
      .update({ [columnName]: newSeatCount })
      .eq('id', 1); // Assuming there's only one record with id 1

    if (updateError) {
      throw updateError;
    }

    return { success: true, newSeatCount };
  } catch (error) {
    console.error('Error updating seats in database:', error);
    throw error;
  }
};
