"use server";

export async function getSections() {
  try {
    const res = await fetch("http://localhost:5000/section/get", {
      method: "GET",
      cache: "no-store",
    });

    const result = await res.json();

    return result.data;
  } catch (error) {
    console.error("Get Sections Error:", error);
    return [];
  }
}