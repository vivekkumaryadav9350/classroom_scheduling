"use client";

import "../../styles/TeacherTimeTable.css";

import {
  useEffect,
  useState,
} from "react";

import AddSchedule from "./AddSchedule";

import DeleteSchedule from "./DeleteSchedule";

import {
  deleteSchedule,
  getSchedules,
} from "@/app/actions/scheduleActions";

import {
  Trash2,
} from "lucide-react";


export default function TeacherTimetable({
  teachers = [],
  periods = [],
  schedules = [],
  classes = [],
  sections = [],
  subjects = [],
  onSchedulesChange,
}) {




  const [
    currentSchedules,
    setCurrentSchedules,
  ] = useState(schedules);




  useEffect(() => {

    setCurrentSchedules(schedules);

  }, [schedules]);




  const [
    showAddSchedule,
    setShowAddSchedule,
  ] = useState(false);


  const [
    selectedTeacher,
    setSelectedTeacher,
  ] = useState(null);


  const [
    selectedPeriod,
    setSelectedPeriod,
  ] = useState(null);




  const [
    showDeleteSchedule,
    setShowDeleteSchedule,
  ] = useState(false);


  const [
    selectedSchedule,
    setSelectedSchedule,
  ] = useState(null);




  const refreshScheduleData = async () => {

    try {

      const data = await getSchedules();

      const latestSchedules =
        data || [];


    
      setCurrentSchedules(
        latestSchedules
      );


   
      if (onSchedulesChange) {

        onSchedulesChange(
          latestSchedules
        );
      }


    } catch (error) {

      console.error(
        "Refresh Schedule Error:",
        error
      );

    }
  };




  const handleCellClick = (
    teacher,
    period
  ) => {

    setSelectedTeacher(
      teacher
    );

    setSelectedPeriod(
      period
    );

    setShowAddSchedule(
      true
    );
  };




  const handleCloseSchedule = () => {

    setShowAddSchedule(
      false
    );

    setSelectedTeacher(
      null
    );

    setSelectedPeriod(
      null
    );
  };




  const handleScheduleAdded = async () => {

    await refreshScheduleData();

  };



  const handleOpenDelete = (
    e,
    schedule
  ) => {

    e.stopPropagation();


    setSelectedSchedule(
      schedule
    );


    setShowDeleteSchedule(
      true
    );
  };




  const handleCloseDelete = () => {

    setShowDeleteSchedule(
      false
    );

    setSelectedSchedule(
      null
    );
  };


  const handleDeleteSchedule = async () => {

    if (!selectedSchedule?.id) {

      return;
    }

    try {

      const result =
        await deleteSchedule(
          selectedSchedule.id
        );

      if (!result?.success) {

        alert(
          result?.message ||
          "Delete failed"
        );

        handleCloseDelete();

        return;
      }

      alert(
        "Schedule deleted successfully!"
      );


      handleCloseDelete();
      await refreshScheduleData();
    } catch (error) {

      console.error(
        "Delete Schedule Error:",
        error
      );


      alert(
        error?.message ||
        "Failed to delete schedule"
      );


      handleCloseDelete();
    }
  };


  return (

    <div className="teacher-timetable">

      <div className="teacher-table">


        {teachers.map((teacher) => (

          <div
            className="teacher-row"
            key={teacher.id}
          >

            <div className="teacher-name">

              {teacher.name}

            </div>


            <div className="schedule-cells">


              {periods.map((period) => {


                const cellSchedules =
                  currentSchedules.filter(
                    (schedule) =>
                      Number(
                        schedule.teacherId
                      ) ===
                        Number(
                          teacher.id
                        ) &&

                      Number(
                        schedule.periodId
                      ) ===
                        Number(
                          period.id
                        )
                  );


                return (

                  <div
                    className="schedule-cell"
                    key={
                      `${teacher.id}-${period.id}`
                    }
                    onClick={() =>
                      handleCellClick(
                        teacher,
                        period
                      )
                    }
                  >

                    {cellSchedules.length === 0 ? (

                      <div className="no-schedule">
                        +
                      </div>

                    ) : (

                      <div className="schedule-content">


                        {cellSchedules.map(
                          (
                            schedule,
                            index
                          ) => (

                            <div
                              className="schedule-card"
                              key={
                                schedule.id ??
                                `${teacher.id}-${period.id}-${index}`
                              }
                            >


                              <div className="schedule-class">

                                🏫{" "}
                                {
                                  schedule.className
                                }

                              </div>

                              <div className="schedule-section">

                                👨‍🎓{" "}
                                {
                                  schedule.sectionName
                                }

                              </div>

                              <div className="schedule-subject">

                                📖{" "}
                                {
                                  schedule.subjectName
                                }

                              </div>

                              <button
                                type="button"
                                className="delete-schedule"
                                onClick={(e) =>
                                  handleOpenDelete(
                                    e,
                                    schedule
                                  )
                                }
                              >

                                <Trash2
                                  size={16}
                                  strokeWidth={2}
                                />

                              </button>


                            </div>

                          )
                        )}

                      </div>

                    )}

                  </div>

                );

              })}

            </div>

          </div>

        ))}

      </div>
      
//////////////////////////////////////////////////////////////////////////////////////////////

      {showAddSchedule && (

        <AddSchedule

          classes={classes}

          sections={sections}

          teachers={teachers}

          subjects={subjects}

          periods={periods}

          selectedTeacher={
            selectedTeacher
          }

          selectedPeriod={
            selectedPeriod
          }

          onScheduleAdded={
            handleScheduleAdded
          }

          onClose={
            handleCloseSchedule
          }

        />

      )}

////////////////////////////////////////////////////////////////////////////////////////

      <DeleteSchedule

        isOpen={
          showDeleteSchedule
        }

        onClose={
          handleCloseDelete
        }

        onConfirm={
          handleDeleteSchedule
        }

      />

      /////////////////////////////////////////////////////////////////////////////////////////


    </div>
  );
}