import React, { useContext, useState, useEffect } from "react";
import '../styles/PostModel.css';
import CurrentUserContext from "../contexts/current-user-context";
import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";
import { deletePost, updatePost } from "../adapters/post-adapter";
import { getAllComments } from "../adapters/comments-adapter";

const baseUrl = '/api/posts';
const commentsUrl = '/api/comments';

const PostModel = () => {
    const [modal, setModal] = useState(false);
    const [createTitle, setTitle] = useState('');
    const [createContent, setContent] = useState('');
    const [errorText, setErrorText] = useState('');
    const { currentUser } = useContext(CurrentUserContext);
    const [posts, setPosts] = useState([]); 
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [editModal, setEditModal] = useState(false);
    const [editPostId, setEditPostId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [visibleComments, setVisibleComments] = useState({});
    const [moreCommentsVisible, setMoreCommentsVisible] = useState({});
    const [selectedField, setSelectedField] = useState('all');
    const [postMakingField, setPostMakingField] = useState('');

    


    const timeAgo = (timestamp) => {
        const now = new Date();
        const postTime = new Date(timestamp);
        const seconds = Math.floor((now - postTime) / 1000);

        let interval = Math.floor(seconds / 31536000); // Years
        if (interval >= 1) return interval === 1 ? `${interval} year ago` : `${interval} years ago`;
        interval = Math.floor(seconds / 2592000); // Months
        if (interval >= 1) return interval === 1 ? `${interval} month ago` : `${interval} months ago`;
        interval = Math.floor(seconds / 86400); // Days
        if (interval >= 1) return interval === 1 ? `${interval} day ago` : `${interval} days ago`;
        interval = Math.floor(seconds / 3600); // Hours
        if (interval >= 1) return interval === 1 ? `${interval} hour ago` : `${interval} hours ago`;
        interval = Math.floor(seconds / 60); // Minutes
        if (interval >= 1) return interval === 1 ? `${interval} minute ago` : `${interval} minutes ago`;

        return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`;
    };

    const toggleModal = () => {
        setModal(!modal);
        if (!modal) {
            setTitle('');
            setContent('');
            setSelectedField('1'); // Default to first field option
        }
    };

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    const toggleComments = (postId) => {
        setVisibleComments((prevVisibleComments) => ({
            ...prevVisibleComments,
            [postId]: !prevVisibleComments[postId],
        }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!currentUser) {
    //         setErrorText('You must be signed in to create a post.');
    //         return;
    //     }
    //     if (createTitle.trim() && createContent.trim()) {
    //         const fields_id = parseInt(postMakingField);
    //         console.log("Selected fields_id:", fields_id);

    //         const newPost = {
    //             user_id: currentUser.id,
    //             fields_id, // Save selected field ID
    //             title: createTitle,
    //             content: createContent,
    //             username: currentUser.username,
    //             profile_image: currentUser.profile_image
    //         };
    //         const [post, error] = await fetchHandler(baseUrl, getPostOptions(newPost));
    //         if (post) {
    //             setPosts((prevPosts) => [post,  ...prevPosts]);
    //             setTitle('');
    //             setContent('');
    //             toggleModal(); 
    //         } else {
    //             setErrorText('Error creating post'); 
    //         }
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setErrorText('You must be signed in to create a post.');
            return;
        }
        if (createTitle.trim() && createContent.trim()) {
            const fields_id = parseInt(postMakingField);
            const newPost = {
                user_id: currentUser.id,
                fields_id,
                title: createTitle,
                content: createContent,
                username: currentUser.username,
                profile_image: currentUser.profile_image, // Include profile_image directly
            };
            
            // Handle post creation
            const [post, error] = await fetchHandler(baseUrl, getPostOptions(newPost));
            if (post) {
                // Update posts with the newly created post, ensuring it has the correct profile image
                setPosts((prevPosts) => [{ ...post, profile_image: currentUser.profile_image }, ...prevPosts]);
                setTitle('');
                setContent('');
                toggleModal(); 
            } else {
                setErrorText('Error creating post'); 
            }
        }
    };
    

    const handleEditPost = (post) => {
        setEditPostId(post.id);
        setEditTitle(post.title);
        setEditContent(post.content);
        toggleEditModal();
    };

    const handleUpdatePost = async (postId) => {
        const updatedContent = {
            title: editTitle,
            content: editContent,
        };

        try {
            const updated = await updatePost(postId, updatedContent); 
            if (updated) {
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.id === postId ? { ...post, title: editTitle, content: editContent } : post
                    )
                );
                toggleEditModal(); 
            } else {
                setErrorText('Error updating post');
            }
        } catch (error) {
            setErrorText('Error updating post');
            console.error(error);
        }
    };

    const fetchAllComments = async (posts) => {
        for (let post of posts) {
            const fetchedComments = await getAllComments(post.id);
            if (!fetchedComments) console.log('error');
            setComments((prevComments) => ({
                ...prevComments,
                [post.id]: fetchedComments || [],
            }));
        }
    };

    const handleAddComment = async (postId) => {
        if (!newComment.trim()) return;
        if (!currentUser) {
            setErrorText('You must be signed in to add a comment.');
            return;
        }

        const newCommentData = {
            post_id: postId,
            user_id: currentUser.id,
            content: newComment,
            username: currentUser.username,
        };
        const [comment] = await fetchHandler(commentsUrl, getPostOptions(newCommentData, 'POST'));
        if (comment) {
            setComments((prevComments) => ({
                ...prevComments,
                [postId]: [...(prevComments[postId] || []), comment],
            }));
            setNewComment('');
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await deletePost(postId);
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId)); 
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    const handleDeleteComment = async (postId, commentId) => {
        try {
            await fetchHandler(`${commentsUrl}/${commentId}`, { method: 'DELETE' });
            setComments((prevComments) => ({
                ...prevComments,
                [postId]: prevComments[postId].filter((comment) => comment.id !== commentId),
            }));
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    const toggleMoreComments = (postId) => {
        setMoreCommentsVisible((prevVisible) => ({
            ...prevVisible,
            [postId]: !prevVisible[postId],
        }));
    };

    // Filter posts based on selected field
    const filteredPosts = selectedField === 'all' ? posts : posts.filter(post => post.fields_id === parseInt(selectedField));

    useEffect(() => {
        const fetchPosts = async () => {
            const [fetchedPosts] = await fetchHandler(baseUrl);
            setPosts(fetchedPosts || []);
            if (fetchedPosts) {
                await fetchAllComments(fetchedPosts);
            }
        };
        fetchPosts();
    }, []);

    if (!currentUser) {
        return <p>You must be signed in to view posts and comments.</p>; 
    }
// console.log(comments)
    return (
        <>
    
        <div className="field-selector-container">
            <label htmlFor="field-filter">Filter by Field: </label>
            <select id="field-filter" className="field-selector" value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
                <option value="all">All</option>
                <option value="1">Technology</option>
                <option value="2">Business</option>
                 <option value="3">Healthcare</option>
                 <option value="4">Trade Training</option>
            </select>

            
   
            <button onClick={toggleModal}  style={{ margin: 0, marginTop: '20px', borderRadius: '10px' }} className="btn-modal">Ask a Question!</button>

        </div>

            {modal && (
                <div className='modal'>
                    <div className='overlay' onClick={toggleModal}></div>
                    <div className='modal-content'>
                        <button className="close" onClick={toggleModal}>X</button>
                        <form className='post-form' onSubmit={handleSubmit}>
                            <h2>Create your post!</h2>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id='title'
                                name='title'
                                value={createTitle}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label htmlFor="content">Content</label>
                            <input
                                type="text"
                                id='content'
                                name='content'
                                value={createContent}
                                onChange={(e) => setContent(e.target.value)}
                            />
                           <label htmlFor="field">Select Field:</label>
                         <select id="field" value={postMakingField} onChange={(e) => setPostMakingField(e.target.value)}>
                            <option value="all">All</option>
                            <option value="1">Technology</option>
                            <option value="2">Business</option>
                            <option value="3">Healthcare</option>
                            <option value="4">Trade Training</option>
                        </select>

                            <button type="submit" className='btn'>Create</button>
                            {errorText && <p className='error'>{errorText}</p>}
                        </form>
                    </div>
                </div>
            )}
            
            {editModal && (
                <div className='modal'>
                    <div className='overlay' onClick={toggleEditModal}></div>
                    <div className='modal-content'>
                        <button className="close" onClick={toggleEditModal}>X</button>
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdatePost(editPostId); }}>
                            <h2>Edit Post</h2>
                            <label htmlFor="edit-title">Title</label>
                            <input
                                type="text"
                                id="edit-title"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <label htmlFor="edit-content">Content</label>
                            <input
                                type="text"
                                id="edit-content"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <button className='btn' type="submit">Update</button>
                        </form>
                    </div>
                </div>
            )}


<div className="posts-container">
    {filteredPosts.map((post) => (
        <div key={post.id} className="post-card">


            {/* <div className="profile-and-name">
                <img src={post.profile_image || currentUser.profile_image} alt={`${post.username}'s profile`} className="profile-pic" />
            */}

<div className="profile-and-name">
  <img
    key={post.profile_image} // This will force React to reload the image if the profile image URL changes
    src={post.profile_image || currentUser.profile_image}
    alt={`${post.username}'s profile`}
    className="profile-pic"
  /> 
            <h3 className='post-user'> {post.username || currentUser.username} </h3>
            </div>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-content">{post.content}</p>
            <p className="post-meta">Posted by {post.username || currentUser.username} {timeAgo(post.created_at)}</p>
            {currentUser.id === post.user_id && (
                <div className="post-actions">
                    <button onClick={() => handleEditPost(post)}>Edit</button>
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                </div>
            )}
            <button onClick={() => toggleComments(post.id)} className="comments-toggle-button">
                Comments ({comments[post.id]?.length || 0})
            </button>
            {visibleComments[post.id] && (
    <div className="comments-section">
        <div className="comments-container">
            {comments[post.id]?.map((comment) => (
                <div key={comment.id} className="comment">
                    <div className="comment-content-wrapper">
                        <p className="comment-content">{comment.content}</p>
                        <p className="comment-meta">Commented by {comment.username || currentUser.username}</p>
                    </div>
                    
                    {currentUser.id === comment.user_id && (
                        <button className="delete-btn" onClick={() => handleDeleteComment(post.id, comment.id)}>Delete</button>
                    )}
                </div>
                        ))}
                    </div>
                    <div className="add-comment-section">
                    <input
                        type="text"
                        className="new-comment-input"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button className="btn"onClick={() => handleAddComment(post.id)}>Add Comment</button>
                    </div>
                </div>
            )}
        </div>
    ))}
</div>

        </>
    );
};

export default PostModel;
