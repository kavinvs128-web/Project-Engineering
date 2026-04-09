import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");

  const fetchItems = async () => {
    const res = await fetch("http://localhost:5000/items");
    return await res.json();
  };

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const addItem = async () => {
    await fetch("http://localhost:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });

    setTitle("");
    fetchItems().then(setItems);
  };

  const claimItem = async (id) => {
    const res = await fetch(`http://localhost:5000/claim/${id}`, {
      method: "POST"
    });

    if (!res.ok) {
      alert("Already claimed!");
    }

    fetchItems().then(setItems);
  };

  const markSold = async (id) => {
    await fetch(`http://localhost:5000/mark-sold/${id}`, {
      method: "POST"
    });

    fetchItems().then(setItems);
  };

  return (
    <div>
      <h1>Dorm Marketplace</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Item name"
      />
      <button onClick={addItem}>Add Item</button>

      {items.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>Status: {item.status}</p>

          {item.status === "available" && (
            <button onClick={() => claimItem(item.id)}>Claim</button>
          )}

          <button onClick={() => markSold(item.id)}>
            Mark Sold
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;