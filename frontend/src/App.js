import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Pizza",
      totalPortions: 4,
      remainingPortions: 1,
      requests: []
    }
  ]);

  // 🧑 Request Portion
  function requestPortion(itemId, roommate) {
    setItems(prev =>
      prev.map(item => {
        if (item.id !== itemId) return item;

        const newRequest = {
          id: Date.now().toString(),
          roommate,
          status: "PENDING",
          createdAt: Date.now()
        };

        return {
          ...item,
          requests: [...item.requests, newRequest]
        };
      })
    );
  }

  // 🔥 Approve Request (Scenario 1)
  function approveRequest(itemId, requestId) {
    setItems(prev =>
      prev.map(item => {
        if (item.id !== itemId) return item;

        if (item.remainingPortions <= 0) {
          alert("No portions left!");
          return item;
        }

        return {
          ...item,
          remainingPortions: item.remainingPortions - 1,
          requests: item.requests.map(req =>
            req.id === requestId && req.status === "PENDING"
              ? { ...req, status: "APPROVED" }
              : req
          )
        };
      })
    );
  }

  // ⏳ Expire Requests (Scenario 2)
  function expireRequests() {
    const now = Date.now();

    setItems(prev =>
      prev.map(item => {
        let updatedRemaining = item.remainingPortions;

        const updatedRequests = item.requests.map(req => {
          if (
            req.status === "APPROVED" &&
            now - req.createdAt > 10000 // 10 sec for demo
          ) {
            updatedRemaining += 1;
            return { ...req, status: "EXPIRED" };
          }
          return req;
        });

        return {
          ...item,
          remainingPortions: updatedRemaining,
          requests: updatedRequests
        };
      })
    );
  }

  // 🧴 Add Item (Scenario 3)
  function addItem() {
    const name = prompt("Enter item name:");
    if (!name) return;

    setItems(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name,
        totalPortions: 1,
        remainingPortions: 1,
        requests: []
      }
    ]);
  }

  // 🧹 Fix Inventory (Scenario 4)
  function fixInventory(itemId) {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, remainingPortions: 0 }
          : item
      )
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>FridgePolice 🧊</h1>

      <button onClick={addItem}>Add Item</button>
      <button onClick={expireRequests} style={{ marginLeft: "10px" }}>
        Expire Old Requests
      </button>

      {items.map(item => (
        <div
          key={item.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginTop: "10px"
          }}
        >
          <h3>
            {item.name} (Remaining: {item.remainingPortions})
          </h3>

          <button onClick={() => requestPortion(item.id, "B")}>
            Request as B
          </button>
          <button onClick={() => requestPortion(item.id, "C")}>
            Request as C
          </button>
          <button onClick={() => fixInventory(item.id)}>
            Mark as Gone
          </button>

          <h4>Requests:</h4>
          {item.requests.map(req => (
            <div key={req.id}>
              {req.roommate} - {req.status}
              {req.status === "PENDING" && (
                <button
                  onClick={() =>
                    approveRequest(item.id, req.id)
                  }
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      ))}

      <h3>Debug State 👇</h3>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}

export default App;