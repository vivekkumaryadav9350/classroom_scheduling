"use server";

export async function getClasses() {
  try {
    const res = await fetch("http://localhost:5000/class/get", {
      method: "GET",
      cache: "no-store",
    });

    const result = await res.json();

    return result.data;
  } catch (error) {
    console.error("Get Classes Error:", error);
    return [];
  }
}