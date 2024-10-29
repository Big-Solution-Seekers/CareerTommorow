import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../adapters/user-adapter";
import '../styles/userpage.css'; // Import your CSS file

export default function UpdateUserInfoForm({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updateUserInfo(Object.fromEntries(formData));
    
    // If our user isn't who they say they are
    // (an auth error on update) log them out
    // We added the httpStatus as a custom cause in our error
    if (error?.cause > 400 && error?.cause < 500) {
      setCurrentUser(null);
      return navigate('/');
    }

    setCurrentUser(user);
    event.target.reset();
  };

  return (
    <section className="update-container">
      <form onSubmit={handleSubmit} aria-labelledby="update-heading">
        <h2 id="update-heading">Update User {currentUser.username}</h2>
        
        <label htmlFor='username'>New Username</label>
        <input type='text' id='username' name='username' defaultValue={currentUser.username} />

        <label htmlFor='email'>New Email</label>
        <input type='email' id='email' name='email' defaultValue={currentUser.email} />

        <label htmlFor='password'>New Password</label>
        <input type='text' id='password' name='password' placeholder="Enter new password..." />

        <input type="hidden" name="id" value={currentUser.id} />
        
        <button className="update" type="submit">Update User Info</button>
      </form>
    </section>
  );
}

