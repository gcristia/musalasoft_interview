export const useDate = date => {
  const newDate = new Date(date)

  return newDate.toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
