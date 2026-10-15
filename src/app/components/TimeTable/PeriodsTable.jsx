"use client";

import { useState } from "react";

import "../../styles/PeriodsTable.css";

export default function PeriodsTable({
  periods = [],
  onDateChange,
}) {

  const today = new Date();

  const todayDate =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");



  const [selectedDate, setSelectedDate] =
    useState(todayDate);

  const [showCalendar, setShowCalendar] =
    useState(false);


  const handleDateChange = (e) => {

    const date = e.target.value;

    if (!date) {
      return;
    }


    setSelectedDate(date);

    setShowCalendar(false);


    
    if (onDateChange) {
      onDateChange(date);
    }

  };


  return (
    <div className="periods-table">



   <div className="period-empty">
  <button
    type="button"
    className="date-picker-btn"
    onClick={() =>
      document.getElementById("schedule-date-picker")?.showPicker()
    }
  >
    📅 {selectedDate}
  </button>

  <input
    id="schedule-date-picker"
    type="date"
    value={selectedDate}
    onChange={handleDateChange}
    className="hidden-date-input"
  />
</div>


      {periods.map(
        (period, index) => (

          <div
            className="period-box"
            key={period.id}
          >

            <div className="period-title">
              Period {index + 1}
            </div>


            <span>
              🕰️ {period.startTime} - {period.endTime} 🕰️
            </span>

          </div>

        )
      )}

    </div>
  );
}