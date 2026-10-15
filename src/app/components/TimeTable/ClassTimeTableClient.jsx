"use client";

import { useState } from "react";
import { getSchedulesByDate } from "@/app/actions/scheduleActions";
import PeriodsTable from "./PeriodsTable";
import ClassTimetable from "./ClassTable";

export default function ClassTimeTableClient({
  teachers = [],
  classes = [],
  sections = [],
  subjects = [],
  periods = [],
  schedules: initialSchedules = [],
}) {
  const [schedules, setSchedules] = useState(initialSchedules);

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();

    return (
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0")
    );
  });

  const handleDateChange = async (date) => {
    try {
      setSelectedDate(date);

      const data = await getSchedulesByDate(
        date,
        classes,
        sections,
        teachers,
        subjects
      );

      setSchedules(data || []);
    } catch (error) {
      console.error("Date-wise Schedule Error:", error);
      setSchedules([]);
    }
  };

  return (
    <>
      <PeriodsTable
        periods={periods}
        onDateChange={handleDateChange}
      />

      <ClassTimetable
        teachers={teachers}
        classes={classes}
        sections={sections}
        subjects={subjects}
        periods={periods}
        schedules={schedules}
        selectedDate={selectedDate}
      />
    </>
  );
}