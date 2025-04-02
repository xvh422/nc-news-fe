import { useContext } from "react";
import { Link } from "react-router";
import { currentUserContext } from "../contexts/User";

function Header() {
  const { currentUser } = useContext(currentUserContext);

  return (
    <header id="header">
      <Link to={"/"}>
        <h1>NC News</h1>
      </Link>
      <img src={currentUser.avatar_url} alt="profile picture" className="profile-picture"/>
    </header>
  );
}

export default Header;
