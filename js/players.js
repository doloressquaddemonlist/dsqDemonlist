let players = [];
let demons = [];

async function loadPlayers() {
  try {
    // Сначала загружаем демонов
    const demonsResponse = await fetch("./data/demons.json");
    demons = await demonsResponse.json();
    calculateDemonsPoints();

    // Затем игроков
    const playersResponse = await fetch("./data/players.json");
    players = await playersResponse.json();
    calculatePlayerPoints();
    displayPlayers();
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
}

function calculateDemonsPoints() {
  demons.forEach((demon, index) => {
    demon.points = Math.round(500 * Math.pow(0.81, index));
    demon.position = index + 1;
  });
}

function calculatePlayerPoints() {
  players.forEach((player) => {
    player.points = 0;
    player.demonsData = [];

    player.completedDemons.forEach((demonName) => {
      const demon = demons.find((d) => d.demonName === demonName);
      if (demon) {
        player.points += demon.points;
        player.demonsData.push({
          name: demon.demonName,
          points: demon.points,
          position: demon.position,
        });
      }
    });
  });
}

function displayPlayers() {
  const playerList = document.getElementById("playerList");
  if (!playerList) return;

  playerList.innerHTML = "";

  players
    .sort((a, b) => b.points - a.points)
    .forEach((player, index) => {
      const playerItem = document.createElement("div");
      playerItem.className = "player-item";
      playerItem.innerHTML = `
        <div class="position">#${index + 1}</div>
        <div class="player-info">
          <h3 class="player-name">${player.playerName}</h3>
          <p class="player-points">Total Points: ${player.points}</p>
        </div>
        <div class="player-demons">Demons: ${player.completedDemons.length}</div>
      `;

      playerItem.addEventListener("click", () => showPlayerModal(player, index + 1));
      playerList.appendChild(playerItem);
    });
}

function showPlayerModal(player, position) {
  document.getElementById("playerName").textContent = player.playerName;
  document.getElementById("playerPoints").textContent = `Total Points: ${player.points}`;
  document.getElementById("playerPosition").textContent = `#${position}`;
  document.getElementById("playerDemonsCount").textContent = `Demons Completed: ${player.completedDemons.length}`;

  const completedDemons = document.getElementById("completedDemons");
  completedDemons.innerHTML = "";

  player.demonsData
    .sort((a, b) => b.points - a.points)
    .forEach((demon) => {
      const demonCard = document.createElement("div");
      demonCard.className = "demon-card";
      demonCard.innerHTML = `
        <h4>${demon.name}</h4>
        <p>${demon.points} pts (#${demon.position})</p>
      `;
      completedDemons.appendChild(demonCard);
    });

  openModal("playerModal");
}


document.addEventListener("DOMContentLoaded", loadPlayers);