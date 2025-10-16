function solution(D) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const daySums = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
  const dayCounts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

  // Helper to get weekday name
  const getDayName = (dateStr) => {
    const d = new Date(dateStr);
    // getUTCDay returns 0=Sun...6=Sat. We adjust to Mon-Sun.
    const dayIndex = (d.getUTCDay() + 6) % 7;
    return days[dayIndex];
  };

  // 1) Aggregate sums by weekday
  for (const [dateStr, value] of Object.entries(D)) {
    const dayName = getDayName(dateStr);
    daySums[dayName] += value;
    dayCounts[dayName] += 1;
  }

  // 2) Fill missing days with mean of previous and next
  const output = {};
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    if (dayCounts[day] > 0) {
      output[day] = daySums[day];
    } else {
      // find previous day with value
      let prevIdx = (i - 1 + 7) % 7;
      while (dayCounts[days[prevIdx]] === 0) {
        prevIdx = (prevIdx - 1 + 7) % 7;
      }
      // find next day with value
      let nextIdx = (i + 1) % 7;
      while (dayCounts[days[nextIdx]] === 0) {
        nextIdx = (nextIdx + 1) % 7;
      }
      const prevVal = daySums[days[prevIdx]];
      const nextVal = daySums[days[nextIdx]];
      output[day] = Math.floor((prevVal + nextVal) / 2);
    }
  }

  return output;
}

// =============================
// SAMPLE TESTS
// =============================
const input1 = {
  '2020-01-01': 4,
  '2020-01-02': 4,
  '2020-01-03': 6,
  '2020-01-04': 8,
  '2020-01-05': 2,
  '2020-01-06': -6,
  '2020-01-07': 2,
  '2020-01-08': -2
};
console.log("Output 1:", solution(input1));

const input2 = {
  '2020-01-01': 6,
  '2020-01-04': 12,
  '2020-01-05': 14,
  '2020-01-06': 2,
  '2020-01-07': 4
};
console.log("Output 2:", solution(input2));
