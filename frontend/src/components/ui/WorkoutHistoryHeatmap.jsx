import React, { useEffect, useState } from "react";
import { useWorkoutStore } from "../../store/workout.store";

import {
  generateWeeks,
  getIntensity,
  getColorStyle,
} from "../../utils/calendarHelper.js";

const WorkoutHistoryHeatmap = () => {
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

  const intensities = [];
  weeks.forEach((week) => {
    week.forEach((day) => {
      if (!day) return;
      const dateStr = day.toISOString().substring(0, 10);
      intensities.push(getIntensity(historyMap[dateStr]));
    });
  });
  const maxIntensity = Math.max(...intensities, 1);

  const dayLabels = ["", "Seg", "", "Qua", "", "Sex", ""];

  return (
    <div className="px-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-medium uppercase">Histórico de treinos</h2>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => {
            setLoading(true);
            setSelectedYear(Number(e.target.value));
          }}
          className="bg-primary-blue rounded-sm px-3 py-1 text-xs"
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Carregando histórico... Caso demore, contate-nos.</p>
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

          <div className="max-w-max overflow-x-auto custom-scrollbar">
            <div className="flex flex-nowrap gap-[1px] pl-1 pb-2">
              {weeks.map((week, wIndex) => (
                <div
                  key={`week-${wIndex}`}
                  className="flex flex-col items-center"
                >
                  {week.map((day) => {
                    if (!day) {
                      return null;
                    }
                    const dateStr = day.toISOString().substring(0, 10);
                    const intensity = getIntensity(historyMap[dateStr]);
                    const style = getColorStyle(intensity, maxIntensity);
                    return (
                      <div
                        key={dateStr}
                        className="m-[1px] h-4 w-4 rounded"
                        style={style}
                        title={`${dateStr}: intensidade ${intensity}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center text-xs">
        <span className="mr-2">Menos</span>
        <div
          className="mr-1 h-4 w-4 rounded"
          style={{ backgroundColor: "rgba(34,197,94,0.3)" }}
        />
        <div
          className="mr-1 h-4 w-4 rounded"
          style={{ backgroundColor: "rgba(34,197,94,0.5)" }}
        />
        <div
          className="mr-1 h-4 w-4 rounded"
          style={{ backgroundColor: "rgba(34,197,94,0.7)" }}
        />
        <div
          className="mr-1 h-4 w-4 rounded"
          style={{ backgroundColor: "rgba(34,197,94,1)" }}
        />
        <span className="ml-2">Mais</span>
      </div>
    </div>
  );
};

export default WorkoutHistoryHeatmap;
