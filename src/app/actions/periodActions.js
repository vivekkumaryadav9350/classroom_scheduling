"use server"
export async function getPeriods() {
  try {
    const res = await fetch("https://cr-scheduling-server.onrender.com/period/get", {
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