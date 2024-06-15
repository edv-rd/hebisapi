import API_URL from "./urls";

export const fetchAll = (category) => {
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
};

export const fetchRandom = (category) => {
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
};

export const addEntry = (category, entry) => {
  return fetch(
    `${API_URL}/add?` +
      new URLSearchParams({
        category: `${category}`,
        entry: `${entry}`,
      }),
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};
