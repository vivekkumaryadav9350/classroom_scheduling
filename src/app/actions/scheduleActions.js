"use server";


// GET SCHEDULES


export async function getSchedules() {
  try {
    const res = await fetch("https://cr-scheduling-server.onrender.com/schedule/get", {
      method: "GET",
      cache: "no-store",
    });

    const result = await res.json();

    return result.data;
  } catch (error) {
    console.error("Get Schedule Error:", error);
    return [];
  }
}




// ADD SCHEDULE


export async function addSchedule(scheduleData) {

    const res = await fetch(
      "http://localhost:5000/schedule/post",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        cache: "no-store",

        body: JSON.stringify(scheduleData),
      }
    );
  }
    



// DELETE SCHEDULE


export async function deleteSchedule(id) {
  try {
    console.log("DELETE ID:", id);

    const res = await fetch(
      `http://localhost:5000/schedule/delete/${id}`,
      {
        method: "DELETE",
        cache: "no-store",
      }
    );

    const result = await res.json();

    console.log("DELETE RESPONSE:", result);

    if (!res.ok) {
      return {
        success: false,
        message:
          result?.message ||
          "Failed to delete schedule",
      };
    }

    return {
      success: true,
      data: result,
    };

  } catch (error) {

    console.error(
      "Delete schedule error:",
      error
    );

    return {
      success: false,
      message:
        error?.message ||
        "Something went wrong",
    };
  }
}



export async function getAllTeacherSchedules(teachers = []) {
  try {

    const allSchedules = await Promise.all(

      teachers.map(async (teacher) => {

        const res = await fetch(
          `http://localhost:5000/schedule/teacher/${encodeURIComponent(
            teacher.name
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!res.ok) {
          console.error(
            `Failed to get schedule for teacher: ${teacher.name}`
          );

          return [];
        }

        const result = await res.json();

        const schedules = result.data || [];

        return schedules.map((schedule) => ({
          ...schedule,
          teacherId: teacher.id,
          teacherName: teacher.name,
        }));
      })
    );

    return allSchedules.flat();

  } catch (error) {

    console.error(
      "Get All Teacher Schedules Error:",
      error
    );

    return [];
  }
}


// GET SCHEDULES BY DATE


export async function getSchedulesByDate(
  date,
  classes = [],
  sections = [],
  teachers = [],
  subjects = []
) {
  try {
    console.log("Fetching schedules for date:", date);

    const res = await fetch(
      `http://localhost:5000/schedule/date/${date}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result.message || "Failed to fetch schedules by date"
      );
    }

    const schedules = result.data || [];


    const formattedSchedules = schedules.map((schedule) => {

      const classData = classes.find(
        (item) =>
          Number(item.id) === Number(schedule.classId)
      );

      const sectionData = sections.find(
        (item) =>
          Number(item.id) === Number(schedule.sectionId)
      );

      const teacherData = teachers.find(
        (item) =>
          Number(item.id) === Number(schedule.teacherId)
      );

      const subjectData = subjects.find(
        (item) =>
          Number(item.id) === Number(schedule.subjectId)
      );

      return {
        ...schedule,

        className: classData?.name || "",
        sectionName: sectionData?.name || "",
        teacherName: teacherData?.name || "",
        subjectName: subjectData?.name || "",
      };
    });

    console.log(
      `Schedules for ${date}:`,
      formattedSchedules
    );

    return formattedSchedules;

  } catch (error) {

    console.error(
      "Get Schedules By Date Error:",
      error
    );

    return [];
  }
}