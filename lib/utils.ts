export function formatDate(dateString: string) {
  const formatedDate = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    hour12: true,
    // weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(dateString));

  return formatedDate;
}
