import { useState } from "react";
import clubsData from "./clubs";
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

      <p>
        <strong>Year:</strong> {club.year}
      </p>

      <p className="members">
        <strong>Members:</strong> {memberCount}
      </p>

      {joined ? (
        <div>
          <p className="joined-message">
            🎉 You have joined this club!
          </p>

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
  const [clubs, setClubs] = useState(clubsData);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [members, setMembers] = useState("");
  const [emoji, setEmoji] = useState("");
  const [year, setYear] = useState("");

  function addClub(event) {
    event.preventDefault();

    const newClub = {
      id: Date.now(),
      name: name,
      category: category,
      coordinator: coordinator,
      members: Number(members),
      emoji: emoji,
      year: year,
    };

    setClubs([...clubs, newClub]);

    setName("");
    setCategory("");
    setCoordinator("");
    setMembers("");
    setEmoji("");
    setYear("");

    setShowForm(false);
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>College Club Dashboard</h1>
          <p>Explore and join college clubs</p>
        </div>

        <div className="header-buttons">
          <button
            className="add-club-button"
            onClick={() => setShowForm(!showForm)}
          >
            ➕ Add Club
          </button>

          <div className="club-total">
            Total Clubs: {clubs.length}
          </div>
        </div>
      </header>

      {showForm && (
        <form className="club-form" onSubmit={addClub}>
          <h2>Add New Club</h2>

          <input
            type="text"
            placeholder="Club name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Coordinator name"
            value={coordinator}
            onChange={(event) => setCoordinator(event.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Number of members"
            value={members}
            onChange={(event) => setMembers(event.target.value)}
            required
          />

          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            required
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          <input
            type="text"
            placeholder="Club emoji"
            value={emoji}
            onChange={(event) => setEmoji(event.target.value)}
            required
          />

          <button type="submit">➕ Add Club</button>
        </form>
      )}

      <main className="club-list">
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </main>
    </div>
  );
}

export default App;