"use client";

import {
  useState,
} from "react";

import {
  getSchedulesByDate,
} from "@/app/actions/scheduleActions";

import PeriodsTable from "./PeriodsTable";

import TeacherTimetable from "./TeacherTimetable";


export default function TimeTableClient({
  teachers = [],
  classes = [],
  sections = [],
  subjects = [],
  periods = [],
  schedules: initialSchedules = [],
}) {


  const [
    schedules,
    setSchedules,
  ] = useState(
    initialSchedules
  );



  const [
    selectedDate,
    setSelectedDate,
  ] = useState(null);




  const handleDateChange = async (
    date
  ) => {

    try {

      console.log(
        "Selected Date:",
        date
      );


      setSelectedDate(
        date
      );


      const data =
        await getSchedulesByDate(
          date,
          classes,
          sections,
          teachers,
          subjects
        );


      setSchedules(
        data || []
      );


    } catch (error) {

      console.error(
        "Date-wise Schedule Error:",
        error
      );


      setSchedules(
        []
      );
    }
  };



  const handleSchedulesChange = (
    updatedSchedules
  ) => {

    setSchedules(
      updatedSchedules || []
    );
  };


  return (

    <>



      <PeriodsTable

        periods={periods}

        onDateChange={
          handleDateChange
        }

      />


      <TeacherTimetable

        teachers={teachers}

        classes={classes}

        sections={sections}

        subjects={subjects}

        periods={periods}

        schedules={schedules}

        onSchedulesChange={
          handleSchedulesChange
        }

      />

    </>

  );
}