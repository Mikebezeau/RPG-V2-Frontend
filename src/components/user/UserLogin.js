import { useState, useEffect } from "react";
import Chat from "./chat/Chat.js";

function UserLogin() {
  //socket.io
  const [nickname, setNickname] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleNicknameChange = (event) => {
    setNickname(event.target.value.trim());
  };

  const handleNicknameSubmit = (e) => {
    if (!nickname.length) return;

    e.preventDefault();

    setLoggedIn(true);
    console.log(nickname);
  };
  //---
  return (
    <div>
      {!loggedIn ? (
        <div className="dialog">
          <form className="dialog-form" onSubmit={handleNicknameSubmit}>
            <label className="username-label" htmlFor="username">
              Nickname:
            </label>
            <input
              id="username"
              className="username-input"
              autoFocus
              onChange={handleNicknameChange}
              type="text"
              name="userId"
              placeholder="Enter your nickname"
            />
            <button type="submit" className="submit-btn">
              Continue
            </button>
          </form>
        </div>
      ) : (
        <Chat nickname={nickname} />
      )}
    </div>
  );
}

export default UserLogin;
