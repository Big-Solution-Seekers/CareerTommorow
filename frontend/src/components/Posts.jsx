import { useState } from "react";
import '../styles/Posts.css'

export default function Posts( { title, content, username, timePosted } ) {
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
  
    const handleCommentSubmit = () => {
      if (commentInput.trim()) {
        setComments([...comments, commentInput]);
        setCommentInput(''); // Clear the input field after submitting
      }
    };
  
    return (
      <div className='postContainer'>
        <h2 className='postTitle'>{title}</h2>
        <p className='content'>{content}</p>
        <div className='metaInfo'>
          <span className='username'>Posted by: {username}</span>
          <span className='timePosted'>at {timePosted}</span>
        </div>
  
        {/* Comment Section */}
        <div className='commentSection'>
          <h3>Comments</h3>
          {comments.length > 0 ? (
            <ul className='commentList'>
              {comments.map((comment, index) => (
                <li key={index} className='commentItem'>{comment}</li>
              ))}
            </ul>
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
  
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Write a comment..."
            className='commentInput'
          />
          <button onClick={handleCommentSubmit} className='commentButton'>Add Comment</button>
        </div>
      </div>
    );
}