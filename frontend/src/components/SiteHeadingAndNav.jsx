import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header>
      <a id='logo' href='/'>
        <img className="logo-image" src="../../images/3.png" alt="Logo" />
      </a>
      <nav>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/about-us'>About Us</NavLink></li>
          {currentUser ? (
            <>
              <li><NavLink to="/community-forum">Community Forum</NavLink></li>
              <li><NavLink to={`/users/${currentUser.id}`}>{currentUser.username}</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to='/login'>Login</NavLink></li>
              <li><NavLink to='/sign-up'>Sign Up</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
