import axios from "axios";
import React from "react";

function MockServer() {
  const [clicked, setClicked] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");

  const fetchUser = async () => {
    const response = await axios
      .get("https://jsonplaceholder.typicode.com/users/11")
      .catch(() => setError("Fetching Failed !"));
    setUsername(response.data.username);
    setClicked(true);
  };
  const buttonText = clicked ? "Loaded" : "Start Fetch";

  return (
    <div>
      <button onClick={fetchUser} disabled={clicked}>
        {buttonText}
      </button>
      {username && <h3>{username}</h3>}
      {error && <p data-testid="error">{error}</p>}
    </div>
  );
}

export default MockServer;
