/**
 * Format a date to a readable string
 * @param date - The date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Format a date to include time
 * @param date - The date to format
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: Date): string => {
  return new Date(date).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format time from date
 * @param date - The date to extract time from
 * @returns Formatted time string
 */
export const formatTime = (date: Date): string => {
  return new Date(date).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Check if a date is today
 * @param date - The date to check
 * @returns True if date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  const checkDate = new Date(date);
  return checkDate.toDateString() === today.toDateString();
};

/**
 * Get date input value from Date object
 * @param date - The date to convert
 * @returns Date string in YYYY-MM-DD format
 */
export const getDateInputValue = (date: Date): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get time input value from Date object
 * @param date - The date to convert
 * @returns Time string in HH:MM format
 */
export const getTimeInputValue = (date: Date): string => {
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

