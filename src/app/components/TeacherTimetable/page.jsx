import { getClasses } from "@/app/actions/classActions";
import { getPeriods } from "@/app/actions/periodActions";
import { getSchedulesByDate } from "@/app/actions/scheduleActions";
import { getSections } from "@/app/actions/sectionActions";
import { getTeachers } from "@/app/actions/teacherActions";
import { getSubjects } from "@/app/actions/subjectActions";

import TimeTableClient from "./TimeTableClient";

import AdminNavbar from "../AdminNavbar";

import "../../styles/TimeTable.css";

export default async function Page() {

  const classes = await getClasses();

  const sections = await getSections();

  const teachers = await getTeachers();

  const subjects = await getSubjects();

  const periods = await getPeriods();

    const today = new Date();

  const todayDate =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");


      const schedules = await getSchedulesByDate(
    todayDate,
    classes,
    sections,
    teachers,
    subjects
  );


  return (
    <div className="main-layout">

      <AdminNavbar />

      <div className="timetable-wrapper">

        <TimeTableClient
          teachers={teachers}
          classes={classes}
          sections={sections}
          subjects={subjects}
          periods={periods}
          schedules={schedules}
        />

      </div>

    </div>
  );
}