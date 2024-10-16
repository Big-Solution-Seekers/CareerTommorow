import { useState } from "react";
import '../styles/PostModel.css';

const PostModel = ({ addPost }) => {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const toggleModal = () => {
        setModal(!modal);
        if (!modal) {
            setTitle('');
            setContent('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const newPost = {
                title,
                content,
                username: "newUser",
                timePosted: formattedTime,
            };

            addPost(newPost);
            setTitle('');
            setContent('');
            toggleModal();
        }
    };

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
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <label htmlFor="content">Content</label>
                            <input
                                autoComplete="off"
                                type="text"
                                id='content'
                                name='content'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            
                            <button
                                type="submit"
                                className="submit-button"
                                onClick={(e) => {
                                    if (!title.trim() && !content.trim()) {
                                        e.preventDefault();
                                        toggleModal();
                                    }
                                }}
                            >
                                {title.trim() && content.trim() ? 'Post' : 'Cancel'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default PostModel;
