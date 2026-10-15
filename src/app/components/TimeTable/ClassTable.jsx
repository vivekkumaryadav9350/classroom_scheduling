"use client";

import "../../styles/TeacherTimeTable.css";
import { useState } from "react";
import AddSchedule from "./AddSchedule";
import DeleteSchedule from "./DeleteSchedule";
import { deleteSchedule } from "@/app/actions/scheduleActions";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function ClassTimetable({
  classes = [],
  periods = [],
  schedules = [],
  sections = [],
  teachers = [],
  subjects = [],
  selectedDate = "",
}) {
  const router = useRouter();

  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const [showDeleteSchedule, setShowDeleteSchedule] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleCellClick = (cls, period) => {
    setSelectedClass(cls);
    setSelectedPeriod(period);
    setShowAddSchedule(true);
  };

  const handleCloseSchedule = () => {
    setShowAddSchedule(false);
    setSelectedClass(null);
    setSelectedPeriod(null);
  };

  const handleDeleteSchedule = async () => {
    if (!selectedSchedule?.id) return;

    try {
      const result = await deleteSchedule(selectedSchedule.id);

      if (!result?.success) {
        alert(result?.message || "Failed to delete schedule");
        return;
      }

      setShowDeleteSchedule(false);
      setSelectedSchedule(null);

      router.refresh();
    } catch (error) {
      console.error("Delete Schedule Error:", error);

      alert(error?.message || "Failed to delete schedule");

      setShowDeleteSchedule(false);
      setSelectedSchedule(null);
    }
  };

  return (
    <div className="teacher-timetable">
      <div className="teacher-table">
        {classes.map((cls) => (
          <div className="teacher-row" key={cls.id}>
            <div className="teacher-name">
              {cls.name}
            </div>

            <div className="schedule-cells">
              {periods.map((period) => {
                const cellSchedules = schedules.filter(
                  (schedule) =>
                    Number(schedule.classId) === Number(cls.id) &&
                    Number(schedule.periodId) === Number(period.id)
                );

                return (
                  <div
                    className="schedule-cell"
                    key={`${cls.id}-${period.id}`}
                    onClick={() => handleCellClick(cls, period)}
                  >
                    {cellSchedules.length === 0 ? (
                      <div className="no-schedule">
                        +
                      </div>
                    ) : (
                      <div className="schedule-content">
                        {cellSchedules.map((schedule, index) => (
                          <div
                            className="schedule-card"
                            key={
                              schedule.id ??
                              `${cls.id}-${period.id}-${index}`
                            }
                          >
                            <div className="schedule-section">
                              👨‍🎓 {schedule.sectionName}
                            </div>

                            <div className="schedule-teacher">
                              {schedule.teacherName}
                              {schedule.subjectName &&
                                ` (${schedule.subjectName})`}
                            </div>

                            <button
                              type="button"
                              className="delete-schedule"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSchedule(schedule);
                                setShowDeleteSchedule(true);
                              }}
                            >
                              <Trash2
                                size={16}
                                strokeWidth={2}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {showAddSchedule && (
        <AddSchedule
  classes={classes}
  sections={sections}
  teachers={teachers}
  subjects={subjects}
  periods={periods}
  schedules={schedules}
  selectedClass={selectedClass}
  selectedPeriod={selectedPeriod}
  selectedDate={selectedDate}
  onClose={handleCloseSchedule}
/>
      )}

      {showDeleteSchedule && (
        <DeleteSchedule
          isOpen={showDeleteSchedule}
          onClose={() => {
            setShowDeleteSchedule(false);
            setSelectedSchedule(null);
          }}
          onConfirm={handleDeleteSchedule}
        />
      )}
    </div>
  );
}