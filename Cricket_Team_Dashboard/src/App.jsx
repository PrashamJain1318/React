import { useState } from "react";
import players from "./players";
import "./App.css";

function PlayerCard({ player, selected, onSelect }) {
  return (
    <div className={selected ? "player-card selected" : "player-card"}>
      <div className="player-emoji">{player.emoji}</div>

      <h2>{player.name}</h2>

      <p>
        <strong>Role:</strong> {player.role}
      </p>

      <p>
        <strong>Runs:</strong> {player.runs}
      </p>

      {selected ? (
        <p className="playing">🟢 Playing XI</p>
      ) : (
        <p className="substitute">⚪ Substitute</p>
      )}

      <button onClick={onSelect}>
        {selected ? "❌ Deselect Player" : "✅ Select Player"}
      </button>
    </div>
  );
}

function App() {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  function selectPlayer(playerId) {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(
        selectedPlayers.filter((id) => id !== playerId)
      );
    } else {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  }

  const selectedCount = selectedPlayers.length;

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>🏏 Cricket Team Dashboard</h1>
          <p>Select players for the Playing XI</p>
        </div>

        <div className="selected-count">
          Selected Players: {selectedCount}
        </div>
      </header>

      {selectedCount > 11 && (
        <div className="warning">
          ⚠️ Warning: You have selected more than 11 players!
        </div>
      )}

      <main className="players-list">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            selected={selectedPlayers.includes(player.id)}
            onSelect={() => selectPlayer(player.id)}
          />
        ))}
      </main>
    </div>
  );
}

export default App;