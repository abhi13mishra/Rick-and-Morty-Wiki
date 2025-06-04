const gallery = document.getElementById("gallery");
const pageInfo = document.getElementById("pageInfo");
let currentPage = 1;

function fetchCharacters(page = 1) {
  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then(res => res.json())
    .then(data => {
      renderCharacters(data.results);
      pageInfo.textContent = `Page ${page} of ${data.info.pages}`;
    });
}

function renderCharacters(characters) {
  gallery.innerHTML = "";
  characters.forEach(char => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${char.image}" alt="${char.name}" />
      <h3>${char.name}</h3>
      <p>Species: ${char.species}</p>
      <p>Status: ${char.status}</p>
    `;
    card.onclick = () => {
      window.open(`detail.html?id=${char.id}`, "_blank");
    };
    gallery.appendChild(card);
  });
}

function nextPage() {
  currentPage++;
  fetchCharacters(currentPage);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
  }
}

fetchCharacters(currentPage);

// Live clock
setInterval(() => {
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  document.getElementById("clock").textContent =
    `${now.toLocaleTimeString()} ${now.toLocaleDateString(undefined, options)}`;
}, 1000);