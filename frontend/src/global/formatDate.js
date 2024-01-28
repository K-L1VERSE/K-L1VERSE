// ************ 날짜 yyyy-mm-dd 형태로 변환 ************
export default function formatDate(date) {
  var d = new window.Date(date);
  var month = "" + (d.getMonth() + 1);
  var day = "" + d.getDate();
  var year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}
