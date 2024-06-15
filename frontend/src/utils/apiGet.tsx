import API_URL from "./urls";

export async function fetchAll(
  category: string
): Promise<{ response: { entries: { _id: string; entry: string }[] } }> {
  return fetch(
    `${API_URL}/all?` +
      new URLSearchParams({
        category: `${category}`,
      }),
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function fetchRandom(
  category: string
): Promise<{ response: { entry: { _id: string; entry: string } } }> {
  return fetch(
    `${API_URL}/random?` +
      new URLSearchParams({
        category: `${category}`,
      }),
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function addEntry(entryData: {
  entry: string;
  category: string;
}): Promise<void> {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entryData),
  });
  const data = await response.json();
  return data;
}
