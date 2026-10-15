"use server";

export async function getTeachers() {
  try {
    const res = await fetch("http://localhost:5000/teacher/get", {
      method: "GET",
      cache: "no-store",
    });

    const result = await res.json();

    return result.data;
  } catch (error) {
    console.error("Get teachers Error:", error);
    return [];
  }
}