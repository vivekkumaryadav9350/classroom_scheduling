"use server"
export async function getPeriods() {
  try {
    const res = await fetch("http://localhost:5000/period/get", {
      method: "GET",
      cache: "no-store",
    });

    const result = await res.json();

    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}