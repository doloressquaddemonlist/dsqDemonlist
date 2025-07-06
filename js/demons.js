let demons = [];

async function loadDemons() {
  try {
    const response = await fetch("./data/demons.json");
    demons = await response.json();
    calculatePoints();
    displayDemons();
  } catch (error) {
    console.error("Ошибка загрузки демонов:", error);
  }
}

function calculatePoints() {
  demons.forEach((demon, index) => {
    demon.points = Math.round(500 * Math.pow(0.81, index));
  });
}

function displayDemons() {
  const demonList = document.getElementById("demonList");
  if (!demonList) return;

  demonList.innerHTML = "";

  demons.forEach((demon, index) => {
    const demonItem = document.createElement("div");
    demonItem.className = "demon-item";
    demonItem.innerHTML = `
      <div class="position">#${index + 1}</div>
      <div class="demon-info">
        <h3 class="demon-name">${demon.demonName}</h3>
        <p class="demon-creator">By ${demon.creator}</p>
      </div>
      <div class="demon-points">${demon.points} pts</div>
    `;

    demonItem.addEventListener("click", () => showDemonModal(demon, index + 1));
    demonList.appendChild(demonItem);
  });
}

function showDemonModal(demon, position) {
  document.getElementById("demonName").textContent = demon.demonName;
  document.getElementById("demonCreator").textContent = `By: ${demon.creator}`;
  document.getElementById("demonPoints").textContent = `${demon.points} pts (#${position})`;

  const firstCompletion = demon.firstCompletion;
  document.getElementById('firstPlayerName').textContent = firstCompletion.playerName;
  document.getElementById('completionDate').textContent = `Date: ${new Date(firstCompletion.date).toLocaleDateString()}`;

  const completionsList = document.getElementById("completionsList");
  completionsList.innerHTML = "";

  demon.completions.forEach((completion) => {
    if (completion.playerName !== firstCompletion.playerName) {
      const item = document.createElement("div");
      item.className = "completion-item";
      item.innerHTML = `
        <div>
          <p class=completer>${completion.playerName}</h3>
          <small>${new Date(completion.date).toLocaleDateString()}</small>
        </div>
      `;
      completionsList.appendChild(item);
    }
  });

  openModal("demonModal");
}

document.addEventListener("DOMContentLoaded", loadDemons);