export function getCurrentTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const currentTime = `${hours}:${minutes}`;
  return currentTime;
}
