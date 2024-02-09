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

export function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  // 2024년 3월 30일 16시 30분 형태로 날짜를 반환합니다.
  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
}
