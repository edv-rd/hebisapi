import API_URL from "./urls";

export async function fetchAll(category: string): Promise<{
  response: { entries: { _id: string; entry: string; active: boolean }[] };
}> {
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
}): Promise<{ _id: string; entry: string; active: boolean }> {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entryData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data; // Ensure this returns the newly added entry
}

export async function hideEntry(entryData: {
  id: string;
}): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/hide`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entryData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data; // Ensure this returns the newly added entry
}
