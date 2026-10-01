import { useState } from "react";
import playersData from "./players";
import "./App.css";

function PlayerCard({ player, selected, onSelect, onRemove }) {
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

      <div className="player-buttons">
        <button onClick={onSelect}>
          {selected ? "❌ Deselect Player" : "✅ Select Player"}
        </button>

        <button className="remove-button" onClick={onRemove}>
          🗑️ Remove Player
        </button>
      </div>
    </div>
  );
}

function App() {
  const [players, setPlayers] = useState(playersData);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [runs, setRuns] = useState("");

  function selectPlayer(playerId) {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(
        selectedPlayers.filter((id) => id !== playerId)
      );
    } else {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  }

  function getEmoji(playerRole) {
    if (playerRole === "Batsman") {
      return "🏏";
    }

    if (playerRole === "Bowler") {
      return "🎯";
    }

    if (playerRole === "Wicket Keeper") {
      return "🧤";
    }

    return "⭐";
  }

  function addPlayer(event) {
    event.preventDefault();

    const newPlayer = {
      id: Date.now(),
      name: name,
      role: role,
      runs: Number(runs),
      emoji: getEmoji(role),
    };

    setPlayers([...players, newPlayer]);

    setName("");
    setRole("");
    setRuns("");
    setShowForm(false);
  }

  function removePlayer(playerId) {
    setPlayers(players.filter((player) => player.id !== playerId));

    setSelectedPlayers(
      selectedPlayers.filter((id) => id !== playerId)
    );
  }

  const selectedCount = selectedPlayers.length;

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>🏏 Cricket Team Dashboard</h1>
          <p>Select players for the Playing XI</p>
        </div>

        <div className="header-buttons">
          <button
            className="add-player-button"
            onClick={() => setShowForm(!showForm)}
          >
            ➕ Add Player
          </button>

          <div className="selected-count">
            Selected Players: {selectedCount}
          </div>
        </div>
      </header>

      {showForm && (
        <form className="player-form" onSubmit={addPlayer}>
          <h2>Add New Player</h2>

          <input
            type="text"
            placeholder="Player name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="Wicket Keeper">Wicket Keeper</option>
            <option value="All Rounder">All Rounder</option>
          </select>

          <input
            type="number"
            placeholder="Runs"
            value={runs}
            onChange={(event) => setRuns(event.target.value)}
            required
          />

          <button type="submit">➕ Add Player</button>
        </form>
      )}

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
            onRemove={() => removePlayer(player.id)}
          />
        ))}
      </main>
    </div>
  );
}

export default App;