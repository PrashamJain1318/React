import { useState } from "react";
import clubs from "./clubs";
import "./App.css";

function ClubCard({ club }) {
  const [joined, setJoined] = useState(false);
  const [memberCount, setMemberCount] = useState(club.members);

  function handleJoin() {
    setJoined(true);
    setMemberCount(memberCount + 1);
  }

  function handleLeave() {
    setJoined(false);
    setMemberCount(memberCount - 1);
  }

  return (
  <div className={joined ? "club-card joined" : "club-card"}>
    <div className="club-emoji">{club.emoji}</div>

    <h2>{club.name}</h2>

    <p>
      <strong>Category:</strong> {club.category}
    </p>

    <p>
      <strong>Coordinator:</strong> {club.coordinator}
    </p>

    <p className="members">
      <strong>Members:</strong> {memberCount}
    </p>

    {joined ? (
      <div>
        <p className="joined-message">🎉 You have joined this club!</p>

        <button className="leave-button" onClick={handleLeave}>
          👋 Leave Club
        </button>
      </div>
    ) : (
      <button className="join-button" onClick={handleJoin}>
        ➕ Join Club
      </button>
    )}
  </div>
);
}

function App() {
  const [clubCount] = useState(clubs.length);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>College Club Dashboard</h1>
          <p>Explore and join college clubs</p>
        </div>

        <div className="club-total">
          Total Clubs: {clubCount}
        </div>
      </header>

      <main className="club-list">
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </main>
    </div>
  );
}

export default App;