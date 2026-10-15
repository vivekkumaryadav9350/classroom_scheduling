"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addSchedule } from "@/app/actions/scheduleActions";

import "../../styles/AddSchedule.css";

export default function AddSchedule({
  classes = [],
  schedules = [],
  sections = [],
  teachers = [],
  subjects = [],
  periods = [],
  selectedClass = null,
  selectedPeriod = null,
  selectedTeacher = null,
  selectedDate = "",
  onClose,
}) {
  const router = useRouter();

const [formData, setFormData] = useState({
  className: selectedClass?.name || "",
  sectionName: "",
  teacherName: selectedTeacher?.name || "",
  subjectName: "",
  periodId: selectedPeriod?.id || "",
  startTime: selectedPeriod?.startTime || "",
  endTime: selectedPeriod?.endTime || "",
  scheduleDate: selectedDate,
  dayOfWeek: "",
});

 const availableTeachers = teachers.filter((teacher) => {
  return !schedules.some((schedule) => {
    if (schedule.isDeleted === true || schedule.isActive === false) {
      return false;
    }

    const scheduleDate = schedule.scheduleDate
      ? String(schedule.scheduleDate).split("T")[0]
      : "";

    const selectedDate = formData.scheduleDate;

    return (
      Number(schedule.teacherId) === Number(teacher.id) &&
      Number(schedule.periodId) === Number(formData.periodId) &&
      scheduleDate === selectedDate
    );
  });
});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePeriodChange = (e) => {
    const periodId = e.target.value;

    const selected = periods.find(
      (period) =>
        String(period.id) === String(periodId)
    );

    if (!selected) {
      setFormData((prev) => ({
        ...prev,
        periodId: "",
        startTime: "",
        endTime: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      periodId: selected.id,
      startTime: selected.startTime,
      endTime: selected.endTime,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const scheduleData = {
        className: formData.className,
        sectionName: formData.sectionName,
        teacherName: formData.teacherName,
        subjectName: formData.subjectName,
        startTime: formData.startTime,
        endTime: formData.endTime,
        scheduleDate: formData.scheduleDate,
        dayOfWeek: formData.dayOfWeek,
      };

      await addSchedule(scheduleData);

      alert("Schedule added successfully!");

      if (onClose) {
        onClose();
      }

      router.refresh();
    } catch (error) {
      console.error("Add Schedule Error:", error);

      alert(
        error?.message ||
        "Failed to add schedule"
      );
    }
  };

  return (
    <div className="schedule-modal-overlay">
      <div className="schedule-modal">
        <div className="schedule-modal-header">
          <h2>Add Schedule</h2>

          <button
            type="button"
            className="schedule-close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="schedule-form-grid">
            <div className="schedule-form-group">
              <label>Class</label>

              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                required
                disabled={!!selectedClass}
              >
                <option value="">
                  Select Class
                </option>

                {classes.map((item) => (
                  <option
                    key={item.id}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="schedule-form-group">
              <label>Section</label>

              <select
                name="sectionName"
                value={formData.sectionName}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Section
                </option>

                {[
                  ...new Set(
                    sections.map((item) => item.name)
                  ),
                ].map((sectionName) => (
                  <option
                    key={sectionName}
                    value={sectionName}
                  >
                    {sectionName}
                  </option>
                ))}
              </select>
            </div>

            <div className="schedule-form-group">
              <label>Teacher</label>

              <select
                name="teacherName"
                value={formData.teacherName}
                onChange={handleChange}
                required
                disabled={!!selectedTeacher}
              >
                <option value="">
                  Select Teacher
                </option>

                {availableTeachers.map((item) => (
                  <option
                    key={item.id}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="schedule-form-group">
              <label>Subject</label>

              <select
                name="subjectName"
                value={formData.subjectName}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Subject
                </option>

                {subjects.map((item) => (
                  <option
                    key={item.id}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="schedule-form-group">
              <label>Period</label>

              <select
                name="periodId"
                value={formData.periodId}
                onChange={handlePeriodChange}
                required
                disabled={!!selectedPeriod}
              >
                <option value="">
                  Select Period
                </option>

                {periods.map((period) => (
                  <option
                    key={period.id}
                    value={period.id}
                  >
                    {period.startTime} - {period.endTime}
                  </option>
                ))}
              </select>
            </div>

            <div className="schedule-form-group">
              <label>Schedule Date</label>

             <input
                                type="date"
                                name="scheduleDate"
                                value={formData.scheduleDate}
                                onChange={handleChange}
                                onClick={(e) => e.currentTarget.showPicker?.()}
                                required
                     />
            </div>
          </div>

          <div className="schedule-modal-actions">
            <button
              type="button"
              className="schedule-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="schedule-save-btn"
            >
              ➕ Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}