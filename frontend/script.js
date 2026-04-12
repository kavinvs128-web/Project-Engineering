const BACKEND_URL = "http://localhost:3000";

async function generate() {
  const diff = document.getElementById("diff").value;
  const output = document.getElementById("output");
  const loading = document.getElementById("loading");

  if (!diff) {
    alert("Please paste a diff");
    return;
  }

  loading.innerText = "Generating...";
  output.innerText = "";

  try {
    const res = await fetch(`${BACKEND_URL}/generate-pr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ diff })
    });

    const data = await res.json();
    output.innerText = data.result;
  } catch (err) {
    output.innerText = "Error generating PR";
  }

  loading.innerText = "";
}
