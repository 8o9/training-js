// 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す
export function getDaysInMonth(year: number, month: number): number {
  // うるう年を考慮しない
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonth[month - 1];
}

// 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す
export function getWeekdaysCount(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let count = 0;
  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      count++;
    }
  }
  return count;
}

// 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す
export function getDayOfWeek(
  dateString: string,
  locale: string,
): string | null {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return null;
  }
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "long" });
  return formatter.format(date);
}

// ローカルのタイムゾーンにおいて先月 1日 0時 0分 0秒の Date オブジェクトを返す
export function getPreviousMonthStartDate(): Date {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 使わない方法が思いつかなかった
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  return new Date(prevYear, prevMonth, 1, 0, 0, 0);
}
