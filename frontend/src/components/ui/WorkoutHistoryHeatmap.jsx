import React, { useEffect, useState } from "react";
import { useWorkoutStore } from "../../store/workout.store";
import { formatDate } from "../../utils/formatDate";

function addDays(date, numDays) {
  const result = new Date(date);
  result.setDate(result.getDate() + numDays);
  return result;
}

function startOfWeek(date, weekStartsOn = 0) {
  const clone = new Date(date);
  const dayOfWeek = clone.getDay();
  const diff = (dayOfWeek < weekStartsOn ? 7 : 0) + (dayOfWeek - weekStartsOn);
  clone.setDate(clone.getDate() - diff);
  return clone;
}

function generateWeeks(start, end, weekStartsOn = 0) {
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

function getIntensity(record) {
  if (!record) return 0;
  return (
    record.pushups +
    record.squats +
    record.situps +
    Math.floor(record.running_distance * 10)
  );
}

const GitHubStyleCalendar = () => {
  const currentYear = new Date().getFullYear();

  const availableYears = [];
  for (let y = 2024; y <= currentYear; y++) {
    availableYears.push(y);
  }

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [startDate, setStartDate] = useState(`${selectedYear}-01-01`);
  const [endDate, setEndDate] = useState(`${selectedYear}-12-31`);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getWorkoutHistory } = useWorkoutStore();

  useEffect(() => {
    setStartDate(`${selectedYear}-01-01`);
    setEndDate(`${selectedYear}-12-31`);
  }, [selectedYear]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await getWorkoutHistory(startDate, endDate);
        setHistory(res.history);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [startDate, endDate, getWorkoutHistory]);

  const start = new Date(startDate);
  const end = new Date(endDate);

  const weeks = generateWeeks(start, end, 0);

  const historyMap = {};
  history.forEach((item) => {
    const dateKey = new Date(item.record_date).toISOString().substring(0, 10);
    historyMap[dateKey] = item;
  });

  let allIntensities = [];
  weeks.forEach((week) => {
    week.forEach((day) => {
      if (!day) return;
      const dateStr = day.toISOString().substring(0, 10);
      allIntensities.push(getIntensity(historyMap[dateStr]));
    });
  });
  const maxIntensity = Math.max(...allIntensities, 1);

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  function getColorStyle(intensity) {
    if (intensity === 0) {
      return { backgroundColor: "rgba(200,170,255,0.15)" };
    }
    const normalized = intensity / maxIntensity;
    const opacity = 0.3 + normalized * 0.7;
    return { backgroundColor: `rgba(34,197,94,${opacity})` };
  }

  return (
    <div className="px-4">
      <h2 className="mb-4 text-2xl font-medium uppercase">
        Calendário de Treino (GitHub Style)
      </h2>
      <div className="mb-4 flex items-center gap-4">
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => {
            setLoading(true);
            setSelectedYear(Number(e.target.value));
          }}
          className="bg-dark-purple border px-2 py-1"
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <span className="text-sm">
          Período: {formatDate(startDate)} até {formatDate(endDate)}
        </span>
      </div>

      {loading ? (
        <p>Carregando histórico...</p>
      ) : (
        <div className="flex">
          <div className="mr-2 flex flex-none flex-col">
            {dayLabels.map((label, idx) => (
              <div
                key={idx}
                style={{ height: "1rem", margin: "2px 0" }}
                className="w-8 text-right text-xs"
              >
                {label}
              </div>
            ))}
          </div>

          <div
            className="w-full max-w-[900px] overflow-x-auto"
            style={{ height: "auto" }}
          >
            <div className="flex flex-nowrap gap-1">
              {weeks.map((week, wIndex) => (
                <div
                  key={`week-${wIndex}`}
                  className="flex flex-col items-center"
                >
                  {week.map((day, dIndex) => {
                    if (!day) {
                      return (
                        <div
                          key={`placeholder-${wIndex}-${dIndex}`}
                          className="m-0.5 h-4 w-4 bg-gray-100"
                        ></div>
                      );
                    }
                    const dateStr = day.toISOString().substring(0, 10);
                    const intensity = getIntensity(historyMap[dateStr]);
                    const style = getColorStyle(intensity);
                    return (
                      <div
                        key={dateStr}
                        className="m-0.5 h-4 w-4"
                        style={style}
                        title={`${dateStr}: intensidade ${intensity}`}
                      ></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center text-sm">
        <span className="mr-2">Menos</span>
        <div
          className="mr-1 h-4 w-4"
          style={{ backgroundColor: "rgba(34,197,94,0.3)" }}
        ></div>
        <div
          className="mr-1 h-4 w-4"
          style={{ backgroundColor: "rgba(34,197,94,0.5)" }}
        ></div>
        <div
          className="mr-1 h-4 w-4"
          style={{ backgroundColor: "rgba(34,197,94,0.7)" }}
        ></div>
        <div
          className="mr-1 h-4 w-4"
          style={{ backgroundColor: "rgba(34,197,94,1)" }}
        ></div>
        <span className="ml-2">Mais</span>
      </div>
    </div>
  );
};

export default GitHubStyleCalendar;
