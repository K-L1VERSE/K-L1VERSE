// dateFormat.js

export function formatDate(dateString) {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "ko-KR",
    options,
  );
  return formattedDate;
}

export function formatRelativeTime(dateString) {
  const now = new Date();
  const createdAt = new Date(dateString);
  const timeDifference = now - createdAt;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return formatDate(dateString);
  }
  if (hours > 0) {
    return `${hours}시간 전`;
  }
  if (minutes > 0) {
    return `${minutes}분 전`;
  }
  return "방금 전";
}
