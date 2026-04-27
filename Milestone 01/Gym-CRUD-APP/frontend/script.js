const API = "http://localhost:3000";

const form = document.getElementById("form");
const list = document.getElementById("list");

async function fetchItems() {
  const res = await fetch(API + "/items");
  const data = await res.json();

  list.innerHTML = "";
  data.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.exercise} - ${item.weight}kg - ${item.reps} reps
      <button onclick="deleteItem(${item.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const item = {
    exercise: exercise.value,
    weight: weight.value,
    reps: reps.value,
    date: date.value
  };

  await fetch(API + "/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });

  fetchItems();
});

async function deleteItem(id) {
  await fetch(API + "/items/" + id, { method: "DELETE" });
  fetchItems();
}

fetchItems();
