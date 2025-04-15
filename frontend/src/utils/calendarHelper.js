/**
 * @param {Date}
 * @param {number}
 * @returns {Date}
 */
export function addDays(date, numDays) {
  const result = new Date(date);
  result.setDate(result.getDate() + numDays);
  return result;
}

/**
 * @param {Date}
 * @param {number}
 * @returns {Date}
 */

export function startOfWeek(date, weekStartsOn = 0) {
  const clone = new Date(date);
  const dayOfWeek = clone.getDay();
  const diff = (dayOfWeek < weekStartsOn ? 7 : 0) + (dayOfWeek - weekStartsOn);
  clone.setDate(clone.getDate() - diff);
  return clone;
}

/**
 * @param {Date}
 * @param {Date}
 * @param {number}
 * @returns {Array<Array<Date|null>>}
 */

export function generateWeeks(start, end, weekStartsOn = 0) {
  let current = startOfWeek(start, weekStartsOn);
  const weeks = [];
  while (current <= end) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(current, i);
      week.push(day <= end ? day : null);
    }
    weeks.push(week);
    current = addDays(current, 7);
  }
  return weeks;
}

/**
 * @param {object|null}
 * @returns {number}
 */
export function getIntensity(record) {
  if (!record) return 0;
  return (
    record.pushups +
    record.squats +
    record.situps +
    Math.floor(record.running_distance * 10)
  );
}

/**
 * @param {number}
 * @param {number}
 * @returns {object}
 */

export function getColorStyle(intensity, maxIntensity) {
  if (intensity === 0) {
    return { backgroundColor: "rgba(200,170,255,0.15)" };
  }
  const normalized = intensity / maxIntensity;
  const opacity = 0.3 + normalized * 0.7;
  return { backgroundColor: `rgba(34,197,94,${opacity})` };
}
