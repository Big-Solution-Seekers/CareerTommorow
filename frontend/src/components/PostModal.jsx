// import React, { useContext, useState, useEffect } from "react";
// import '../styles/PostModel.css';
// import CurrentUserContext from "../contexts/current-user-context";
// import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";
// import { deletePost, updatePost } from "../adapters/post-adapter";

// const baseUrl = '/api/posts';
// const commentsUrl = '/api/comments';

// const PostModel = () => {
//     const [modal, setModal] = useState(false);
//     const [createTitle, setTitle] = useState('');
//     const [createContent, setContent] = useState('');
//     const [errorText, setErrorText] = useState('');
//     const { currentUser } = useContext(CurrentUserContext);
//     const [posts, setPosts] = useState([]); 
//     const [comments, setComments] = useState({});
//     const [newComment, setNewComment] = useState('');
//     const [isEditing, setIsEditing] = useState(null);
//     const [editTitle, setEditTitle] = useState('');
//     const [editContent, setEditContent] = useState('');

//     const toggleModal = () => {
//         setModal(!modal);
//         if (!modal) {
//             setTitle('');
//             setContent('');
//         }
//     };

//     const currentTime = new Date().toLocaleString(); 

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!currentUser) {
//             setErrorText('You must be signed in to create a post.');
//             return;
//         }
//         if (createTitle.trim() && createContent.trim()) {
//             const fields_id = 1; 
//             const newPost = {
//                 user_id: currentUser.id,
//                 fields_id,
//                 title: createTitle,
//                 content: createContent,
//                 username: currentUser.username,
//                 timePosted: currentTime,
//             };
//             const [post, error] = await fetchHandler(baseUrl, getPostOptions(newPost));
//             if (post) {
//                 setPosts((prevPosts) => [post, ...prevPosts]);
//                 setTitle('');
//                 setContent('');
//                 toggleModal(); 
//             } else {
//                 setErrorText('Error creating post'); 
//             }
//         }
//     };

//     const handleEditPost = (post) => {
//         setIsEditing(post.id);
//         setEditTitle(post.title);
//         setEditContent(post.content);
//     };

//     const handleUpdatePost = async (postId) => {
//         const updatedContent = {
//             title: editTitle,
//             content: editContent,
//         };
    
//         try {
//             const updated = await updatePost(postId, updatedContent); 
//             if (updated) {
//                 setPosts((prevPosts) =>
//                     prevPosts.map((post) =>
//                         post.id === postId ? { ...post, title: editTitle, content: editContent, timePosted: currentTime } : post
//                     )
//                 );
//                 setIsEditing(null); 
//             } else {
//                 setErrorText('Error updating post');
//             }
//         } catch (error) {
//             setErrorText('Error updating post');
//             console.error(error);
//         }
//     };

//     const fetchComments = async (postId) => {
//         const [fetchedComments] = await fetchHandler(`${commentsUrl}?post_id=${postId}`);
//         setComments((prevComments) => ({
//             ...prevComments,
//             [postId]: fetchedComments || [],
//         }));
//     };

//     const fetchAllComments = async (posts) => {
//         for (let post of posts) {
//             await fetchComments(post.id);
//         }
//     };

//     const handleAddComment = async (postId) => {
//         if (!newComment.trim()) return;
//         if (!currentUser) {
//             setErrorText('You must be signed in to add a comment.');
//             return;
//         }
//         const newCommentData = {
//             post_id: postId,
//             user_id: currentUser.id,
//             content: newComment,
//             username: currentUser.username,
//         };
//         const [comment] = await fetchHandler(commentsUrl, getPostOptions(newCommentData, 'POST'));
//         if (comment) {
//             setComments((prevComments) => ({
//                 ...prevComments,
//                 [postId]: [...(prevComments[postId] || []), comment],
//             }));
//             setNewComment(''); 
//         }
//     };

//     const handleDeletePost = async (postId) => {
//         try {
//             await deletePost(postId);
//             setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId)); 
//         } catch (error) {
//             console.error('Failed to delete post:', error);
//         }
//     };

//     const handleDeleteComment = async (postId, commentId) => {
//         try {
//             await fetchHandler(`${commentsUrl}/${commentId}`, { method: 'DELETE' });
//             setComments((prevComments) => ({
//                 ...prevComments,
//                 [postId]: prevComments[postId].filter((comment) => comment.id !== commentId),
//             }));
//         } catch (error) {
//             console.error('Failed to delete comment:', error);
//         }
//     };

//     useEffect(() => {
//         const fetchPosts = async () => {
//             const [fetchedPosts] = await fetchHandler(baseUrl);
//             setPosts(fetchedPosts || []);
//             if (fetchedPosts) {
//                 await fetchAllComments(fetchedPosts);
//             }
//         };
//         fetchPosts();
//     }, []);

//     if (!currentUser) {
//         return <p>You must be signed in to view posts and comments.</p>; 
//     }

//     return (
//         <>
//             <button onClick={toggleModal} className="btn-modal">Add a post!</button>

//             {modal && (
//                 <div className='modal'>
//                     <div className='overlay' onClick={toggleModal}></div>
//                     <div className='modal-content'>
//                         <button className="close-button" onClick={toggleModal}>x</button>
//                         <form className='post-form' onSubmit={handleSubmit}>
//                             <h2>Create your post!</h2>
//                             <label htmlFor="title">Title</label>
//                             <input
//                                 type="text"
//                                 id='title'
//                                 name='title'
//                                 value={createTitle}
//                                 onChange={(e) => setTitle(e.target.value)}
//                             />
//                             <label htmlFor="content">Content</label>
//                             <input
//                                 type="text"
//                                 id='content'
//                                 name='content'
//                                 value={createContent}
//                                 onChange={(e) => setContent(e.target.value)}
//                             />
//                             <button type="submit">Post</button>
//                         </form>
//                         {errorText && <p className="error-text">{errorText}</p>}
//                     </div>
//                 </div>
//             )}

//             <div className="posts-list">
//                 {posts.map((post) => (
//                     <div key={post.id} className="post-item">
//                         {isEditing === post.id ? (
//                             <div>
//                                 <input
//                                     type="text"
//                                     value={editTitle}
//                                     onChange={(e) => setEditTitle(e.target.value)}
//                                 />
//                                 <input
//                                     type="text"
//                                     value={editContent}
//                                     onChange={(e) => setEditContent(e.target.value)}
//                                 />
//                                 <button onClick={() => handleUpdatePost(post.id)}>
//                                     Save
//                                 </button>
//                                 <button onClick={() => setIsEditing(null)}>
//                                     Cancel
//                                 </button>
//                             </div>
//                         ) : (
//                             <>
//                                 <h3>{post.title}</h3>
//                                 <p>{post.content}</p>
//                                 <small>Posted by {post.username} at {post.timePosted}</small>
//                                 {currentUser.id === post.user_id && (
//                                     <>
//                                         <button onClick={() => handleEditPost(post)}>
//                                             Edit
//                                         </button>
//                                         <button onClick={() => handleDeletePost(post.id)}>
//                                             Delete Post
//                                         </button>
//                                     </>
//                                 )}
//                             </>
//                         )}
//                         <div className="comments-section">
//                             <h4>Comments</h4>
//                             <div className="comments-list">
//                                 {(comments[post.id] || []).map((comment) => (
//                                     <div key={comment.id} className="comment-item">
//                                         <p>{comment.content}</p>
//                                         <small>Commented by {comment.username}</small>
//                                         {currentUser.id === comment.user_id && (
//                                             <button onClick={() => handleDeleteComment(post.id, comment.id)}>
//                                                 Delete Comment
//                                             </button>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                             <input
//                                 type="text"
//                                 value={newComment}
//                                 onChange={(e) => setNewComment(e.target.value)}
//                                 placeholder="Add a comment..."
//                             />
//                             <button onClick={() => handleAddComment(post.id)}>
//                                 Add Comment
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// };

// export default PostModel;


import React, { useContext, useState, useEffect } from "react";
import '../styles/PostModel.css';
import CurrentUserContext from "../contexts/current-user-context";
import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";
import { deletePost, updatePost } from "../adapters/post-adapter";

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

    const toggleModal = () => {
        setModal(!modal);
        if (!modal) {
            setTitle('');
            setContent('');
        }
    };

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    const currentTime = new Date().toLocaleString(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setErrorText('You must be signed in to create a post.');
            return;
        }
        if (createTitle.trim() && createContent.trim()) {
            const fields_id = 1; 
            const newPost = {
                user_id: currentUser.id,
                fields_id,
                title: createTitle,
                content: createContent,
                username: currentUser.username,
                timePosted: currentTime,
            };
            const [post, error] = await fetchHandler(baseUrl, getPostOptions(newPost));
            if (post) {
                setPosts((prevPosts) => [post, ...prevPosts]);
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
        toggleEditModal(); // Open the edit modal
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
                        post.id === postId ? { ...post, title: editTitle, content: editContent, timePosted: currentTime } : post
                    )
                );
                toggleEditModal(); // Close the edit modal
            } else {
                setErrorText('Error updating post');
            }
        } catch (error) {
            setErrorText('Error updating post');
            console.error(error);
        }
    };

    const fetchComments = async (postId) => {
        const [fetchedComments] = await fetchHandler(`${commentsUrl}?post_id=${postId}`);
        setComments((prevComments) => ({
            ...prevComments,
            [postId]: fetchedComments || [],
        }));
    };

    const fetchAllComments = async (posts) => {
        for (let post of posts) {
            await fetchComments(post.id);
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

    return (
        <>
            <button onClick={toggleModal} className="btn-modal">Add a post!</button>

            {modal && (
                <div className='modal'>
                    <div className='overlay' onClick={toggleModal}></div>
                    <div className='modal-content'>
                        <button className="close-button" onClick={toggleModal}>x</button>
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
                            <button type="submit">Post</button>
                        </form>
                        {errorText && <p className="error-text">{errorText}</p>}
                    </div>
                </div>
            )}

            {/* Edit Post Modal */}
            {editModal && (
                <div className='modal'>
                    <div className='overlay' onClick={toggleEditModal}></div>
                    <div className='modal-content'>
                        <button className="close-button" onClick={toggleEditModal}>x</button>
                        <form className='post-form' onSubmit={() => handleUpdatePost(editPostId)}>
                            <h2>Edit your post!</h2>
                            <label htmlFor="edit-title">Title</label>
                            <input
                                type="text"
                                id='edit-title'
                                name='edit-title'
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <label htmlFor="edit-content">Content</label>
                            <input
                                type="text"
                                id='edit-content'
                                name='edit-content'
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <button type="submit">Save</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="posts-list">
                {posts.map((post) => (
                    <div key={post.id} className="post-item">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <small>Posted by {post.username} at {post.timePosted}</small>
                        {currentUser.id === post.user_id && (
                            <>
                                <button onClick={() => handleEditPost(post)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDeletePost(post.id)}>
                                    Delete Post
                                </button>
                            </>
                        )}
                        <div className="comments-section">
                            <h4>Comments</h4>
                            <div className="comments-list">
                                {(comments[post.id] || []).map((comment) => (
                                    <div key={comment.id} className="comment-item">
                                        <p>{comment.content}</p>
                                        <small>Commented by {comment.username}</small>
                                        {currentUser.id === comment.user_id && (
                                            <button onClick={() => handleDeleteComment(post.id, comment.id)}>
                                                Delete Comment
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment"
                            />
                            <button onClick={() => handleAddComment(post.id)}>Add Comment</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PostModel;
