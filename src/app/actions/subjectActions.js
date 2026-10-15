"use server";

export async function getSubjects() {
  try {
    const res = await fetch("https://cr-scheduling-server.onrender.com/subject/get", {
      method: "GET",
      cache: "no-store",
    });

    const result = await res.json();

    return result.data;
  } catch (error) {
    console.error("Get Subjects Error:", error);
    return [];
  }
}