// import { NavLink } from "react-router-dom";
// import { useContext } from "react";
// import CurrentUserContext from "../contexts/current-user-context";
// import logo from '../images/3.png'

// export default function SiteHeadingAndNav() {
//   const { currentUser } = useContext(CurrentUserContext);

//   return (
//     <header>
//       <a id='logo' href='/'>
//         <img className="logo-image" src={logo} alt="Logo" />
//       </a>
//       <nav>
//         <ul>
//           <li><NavLink to='/'>Home</NavLink></li>
//           <li><NavLink to='/about-us'>About Us</NavLink></li>
//           {currentUser ? (
//             <>
//               <li><NavLink to="/community-forum">Community Forum</NavLink></li>
//               <li>
//                 <NavLink to={`/users/${currentUser.id}`} style={{ display: 'flex', alignItems: 'center' }}>
//                   {currentUser.username}
//                   {/* Display the profile image after the username */}
//                   {currentUser.profileImage && (
//                     <img
//                       src={currentUser.profileImage} // Assuming this is the URL of the profile image
//                       alt={`${currentUser.username}'s profile`}
//                       className="profile-image" // Use the defined class for styling
//                     />
//                   )}
//                 </NavLink>
//               </li>
//             </>
//           ) : (
//             <>
//               <li><NavLink to='/login'>Login</NavLink></li>
//               <li><NavLink to='/sign-up'>Sign Up</NavLink></li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }

import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import logo from '../images/3.png';

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <>
      <header>
        <a id='logo' href='/'>
          <img className="logo-image" src={logo} alt="Logo" />
        </a>
        <div className="hamburger" onClick={toggleSidebar}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* Nav is initially hidden on mobile and will be shown on desktop */}
        <nav className={`navbar ${isSidebarOpen ? 'open' : ''}`}>
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/about-us'>About Us</NavLink></li>
            {currentUser ? (
              <>
                <li><NavLink to="/community-forum">Community Forum</NavLink></li>
                <li>
                  <NavLink to={`/users/${currentUser.id}`} style={{ display: 'flex', alignItems: 'center' }}>
                    {currentUser.username}
                    {currentUser.profileImage && (
                      <img
                        src={currentUser.profileImage}
                        alt={`${currentUser.username}'s profile`}
                        className="profile-image"
                      />
                    )}
                  </NavLink>
                </li>
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

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          <li><NavLink to='/' onClick={toggleSidebar}>Home</NavLink></li>
          <li><NavLink to='/about-us' onClick={toggleSidebar}>About Us</NavLink></li>
          {currentUser ? (
            <>
              <li><NavLink to="/community-forum" onClick={toggleSidebar}>Community Forum</NavLink></li>
              <li>
                <NavLink to={`/users/${currentUser.id}`} onClick={toggleSidebar} style={{ display: 'flex', alignItems: 'center' }}>
                  {currentUser.username}
                  {currentUser.profileImage && (
                    <img
                      src={currentUser.profileImage}
                      alt={`${currentUser.username}'s profile`}
                      className="profile-image"
                    />
                  )}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li><NavLink to='/login' onClick={toggleSidebar}>Login</NavLink></li>
              <li><NavLink to='/sign-up' onClick={toggleSidebar}>Sign Up</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}
