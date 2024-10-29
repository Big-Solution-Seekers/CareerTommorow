import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUserInfoForm from "../components/UpdateUserInfoForm";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.message);
      setUserProfile(user);
    };

    loadUser();
  }, [id]);

  const handleLogout = async () => {
    await logUserOut(); // Ensure to await logout
    setCurrentUser(null);
    navigate('/');
  };

  const handleUpdateSubmit = async (updatedUser) => {
    // Here you would typically send a request to update the user info in your backend
    // For now, we will simply update the current user context and close the modal
    setCurrentUser(updatedUser);
    setIsModalOpen(false); // Close the modal after submitting
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  const profileUsername = isCurrentUserProfile ? currentUser.username : userProfile.username;

  return (
    <>
    <div className="update-information-card">
      <h1>{profileUsername}</h1>

      {/* Display the profile picture */}
      <div className="profile-picture-container">
        <img
          src={isCurrentUserProfile ? currentUser.profileImage : userProfile.profileImage}
          alt={`${profileUsername}'s profile`}
          className="profile-picture"
        />
      </div>
      
      {isCurrentUserProfile && (
        <>
          <button onClick={() => setIsModalOpen(true)}>Update User Info</button>

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                <UpdateUserInfoForm 
                  currentUser={currentUser} 
                  setCurrentUser={handleUpdateSubmit} 
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
      {isCurrentUserProfile && (
        <button className="log-out" onClick={handleLogout}>
          Log Out
        </button>
      )}
    </>
  );
}
