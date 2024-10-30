import '../styles/SignUp.css';
import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";
import dog from '../images/dog.jpeg'
import cat from '../images/cat.png'
import penguin from '../images/penguin.png'
import frog from '../images/frog.png'
import panda from '../images/panda.png'
import rabbit from '../images/rabbit.png'


export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedProfileImage, setSelectedProfileImage] = useState(null); // State for selected profile image

  // Default profile picture options
  const defaultProfilePictures = [
    dog,
    penguin,
    rabbit,
    panda,
    frog,
    cat
  ];

  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    if (!username || !email || !password || !confirmPassword || !selectedProfileImage) {
      return setErrorText('Missing username, email, password, or profile image');
    }
    if (password !== confirmPassword) {
      return setErrorText('Passwords do not match');
    }
  
    const [user, error] = await createUser({
      username,
      email,
      password,
      profile_image: selectedProfileImage,  // Include profile image
    });
    if (error) return setErrorText(error.message);
  
    setCurrentUser(user);
    navigate('/');
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirm_password') setConfirmPassword(value);
  };

  return (
    <div className='sign_up'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} aria-labelledby="create-heading">
        <h2 id="create-heading">Create New Account</h2>
        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
        />

        <label htmlFor="email">Email</label>
        <input
          autoComplete="off"
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={email}
        />

        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          autoComplete="off"
          type="password"
          id="confirm_password"
          name="confirm_password"
          onChange={handleChange}
          value={confirmPassword}
        />
    <h3>Select a Profile Picture:</h3>

        <div className="profile-container">
          <div className="profile-picture-selection">
            {defaultProfilePictures.map((pic, index) => (
              <img
                key={index}
                src={pic}
                alt={`Profile option ${index + 1}`}
                onClick={() => setSelectedProfileImage(pic)}
                className={`profile-option ${selectedProfileImage === pic ? "selected" : ""}`}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        <button className="btn">Sign Up Now!</button>
      </form>
      {!!errorText && <p>{errorText}</p>}
      <p className='back_to_login'>Already have an account with us? <Link to="/login">Log in!</Link></p>
    </div>
  );
}
