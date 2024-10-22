import React, { useContext, useState, useEffect } from "react";
import '../styles/PostModel.css';
import CurrentUserContext from "../contexts/current-user-context";
import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";
import { deletePost } from "../adapters/post-adapter"; // Import the deletePost function

const baseUrl = '/api/posts';
const commentsUrl = '/api/comments';

const PostModel = () => {
    const [modal, setModal] = useState(false);
    const [createTitle, setTitle] = useState('');
    const [createContent, setContent] = useState('');
    const [errorText, setErrorText] = useState('');
    const { currentUser } = useContext(CurrentUserContext);
    const [posts, setPosts] = useState([]); // State for the list of posts
    const [comments, setComments] = useState({}); // State for the comments for each post
    const [newComment, setNewComment] = useState(''); // State for the new comment

    // Function to toggle the modal visibility
    const toggleModal = () => {
        setModal(!modal);
        if (!modal) {
            setTitle('');
            setContent('');
        }
    };
    const currentTime = new Date().toLocaleString(); // Get current date and time

    // Function to handle form submission for posts
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (createTitle.trim() && createContent.trim()) {
            const fields_id = 1; // Set this dynamically if needed
            
            const newPost = {
                user_id: currentUser.id,
                fields_id,
                title: createTitle,
                content: createContent,
                username: currentUser.username,
                timePosted: currentTime, // Set the time the post was created
            };

            const [post, error] = await fetchHandler(baseUrl, getPostOptions(newPost));
            
            if (post) {
                setPosts((prevPosts) => [post, ...prevPosts]); // Update posts state to include new post
                setTitle('');
                setContent('');
                toggleModal(); // Close modal after successful submission
            } else {
                setErrorText('Error creating post'); // Display error message if submission fails
            }
        }
    };

    // Function to fetch comments for a specific post
    const fetchComments = async (postId) => {
        const [fetchedComments] = await fetchHandler(`${commentsUrl}?post_id=${postId}`);
        setComments((prevComments) => ({
            ...prevComments,
            [postId]: fetchedComments || [],
        }));
    };

    // Fetch comments for all posts
    const fetchAllComments = async (posts) => {
        for (let post of posts) {
            await fetchComments(post.id);
        }
    };

    // Function to handle adding a comment
    const handleAddComment = async (postId) => {
        if (!newComment.trim()) return;

        const newCommentData = {
            post_id: postId,
            user_id: currentUser.id,
            content: newComment,
            username: currentUser.username, // Including username for display
        };

        const [comment, error] = await fetchHandler(commentsUrl, getPostOptions(newCommentData, 'POST'));
        
        if (comment) {
            setComments((prevComments) => ({
                ...prevComments,
                [postId]: [...(prevComments[postId] || []), comment],
            }));
            setNewComment(''); // Clear the input field after successful submission
        } else {
            console.error('Error creating comment', error);
        }
    };

    // Function to delete a post
    const handleDeletePost = async (postId) => {
        try {
            await deletePost(postId);
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId)); // Remove post from state
        } catch (error) {
            console.error('Failed to delete post:', error);
            // Handle error state here if needed
        }
    };

    // Function to delete a comment
    const handleDeleteComment = async (postId, commentId) => {
        try {
            // Replace this with your delete comment function
            await fetchHandler(`${commentsUrl}/${commentId}`, {
                method: 'DELETE',
            });
            setComments((prevComments) => ({
                ...prevComments,
                [postId]: prevComments[postId].filter((comment) => comment.id !== commentId),
            }));
        } catch (error) {
            console.error('Failed to delete comment:', error);
            // Handle error state here if needed
        }
    };

    // Fetch posts from the server when the component mounts
    useEffect(() => {
        const fetchPosts = async () => {
            const [fetchedPosts] = await fetchHandler(baseUrl);
            setPosts(fetchedPosts || []); // Set the state with fetched posts

            // Fetch comments for each post
            if (fetchedPosts) {
                await fetchAllComments(fetchedPosts);
            }
        };
        fetchPosts();
    }, []);

    return (
        <>
            <button onClick={toggleModal} className="btn-modal">Add a post!</button>

            {modal && (
                <div className='modal'>
                    <div className='overlay' onClick={toggleModal}></div>
                    <div className='modal-content'>
                        <form className='post-form' onSubmit={handleSubmit} aria-labelledby="create-post">
                            <h2>Create your post!</h2>
                            <label htmlFor="title">Title</label>
                            <input
                                autoComplete="off"
                                type="text"
                                id='title'
                                name='title'
                                value={createTitle}
                                placeholder="Title..."
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <label htmlFor="content">Content</label>
                            <input
                                autoComplete="off"
                                type="text"
                                id='content'
                                name='content'
                                value={createContent}
                                placeholder="Content..."
                                onChange={(e) => setContent(e.target.value)}
                            />
                            
                            <button type="submit" className="submit-button">
                                Post
                            </button>
                        </form>
                        {errorText && <p className="error-text">{errorText}</p>}
                    </div>
                </div>
            )}

            {/* Render the list of posts */}
            <div className="posts-list">
                {posts.map((post) => (
                    <div key={post.id} className="post-item">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <small>
                            Posted by {post.username} at {currentTime}
                        </small>
                     
                        {/* Comments Section */}
                        <div className="comments-section">
                            <h4>Comments</h4>
                            <div className="comments-list">
                                {(comments[post.id] || []).map((comment) => (
                                    <div key={comment.id} className="comment-item">
                                        <p>{comment.content}</p>
                                        <small>Commented by {comment.username || currentUser.username}</small>
                                        {/* Button to delete comment */}
                                        {currentUser.id === comment.user_id && ( // Check if the current user is the owner of the comment
                                            <button onClick={() => handleDeleteComment(post.id, comment.id)} className="delete-button">
                                                Delete Comment
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={newComment}
                                placeholder="Add a comment..."
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button onClick={() => handleAddComment(post.id)}>Add Comment</button>
                            
                            {/* Button to delete the post */}
                            {currentUser.id === post.user_id && ( // Check if the current user is the owner of the post
                                <button onClick={() => handleDeletePost(post.id)} className="delete-button">
                                    Delete Post
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PostModel;


