const container = document.getElementById("character-detail");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  container.innerHTML = "<p style='color:red;'>Error: Character ID missing in URL.</p>";
  throw new Error("Character ID not found in URL");
}

fetch(`https://rickandmortyapi.com/api/character/${id}`)
  .then(res => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then(data => {
    container.innerHTML = `
      <img src="${data.image}" alt="${data.name}" />
      <h2>${data.name}</h2>
      <p><strong>Status:</strong> ${data.status}</p>
      <p><strong>Species:</strong> ${data.species}</p>
      <p><strong>Type:</strong> ${data.type ? data.type : "Unknown"}</p>
      <p><strong>Gender:</strong> ${data.gender}</p>
      <p><strong>Origin:</strong> ${data.origin.name}</p>
      <p><strong>Location:</strong> ${data.location.name}</p>
      <p><strong>Episode Appearances:</strong> ${data.episode.length}</p>
    `;
  })
  .catch(err => {
    container.innerHTML = `<p style="color:red;">Failed to load character data.</p>`;
    console.error("Error fetching character:", err);
  });

// Live updating clock in footer
setInterval(() => {
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  document.getElementById("clock").textContent =
    `${now.toLocaleTimeString()} ${now.toLocaleDateString(undefined, options)}`;
}, 1000);
