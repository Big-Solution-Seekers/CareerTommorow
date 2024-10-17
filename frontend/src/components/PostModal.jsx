import React, { useContext, useState, useEffect } from "react";
import '../styles/PostModel.css';
import CurrentUserContext from "../contexts/current-user-context";
import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/posts';

const PostModel = () => {
    const [modal, setModal] = useState(false);
    const [createTitle, setTitle] = useState('');
    const [createContent, setContent] = useState('');
    const [errorText, setErrorText] = useState('');
    const { currentUser } = useContext(CurrentUserContext);
    const [posts, setPosts] = useState([]); // State for the list of posts

    // Function to toggle the modal visibility
    const toggleModal = () => {
        setModal(!modal);
        if (!modal) {
            setTitle('');
            setContent('');
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (createTitle.trim() && createContent.trim()) {
            const fields_id = 1; // Set this dynamically if needed
            const currentTime = new Date().toLocaleString(); // Get current date and time

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

    // Fetch posts from the server when the component mounts
    useEffect(() => {
        const fetchPosts = async () => {
            const [fetchedPosts] = await fetchHandler(baseUrl);
            setPosts(fetchedPosts || []); // Set the state with fetched posts
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
                            Posted by {currentUser?.username} at {post.timePosted}
                        </small>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PostModel;


