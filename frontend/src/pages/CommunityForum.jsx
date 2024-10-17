import { useState } from "react";
import Posts from "../components/Posts";
import PostModel from "../components/PostModal";

export default function CommunityForum() {
    const [postData, setPostData] = useState([]);

    const addPost = (newPost) => {
        setPostData([newPost, ...postData]);
    };

    return (
        <div id='community-page'>
            <PostModel addPost={addPost} />
            <h1>Community Forum</h1>
            {postData.map((post, index) => (
                <Posts
                    key={index}
                    title={post.title}
                    content={post.content}
                    username={post.username}
                    timePosted={post.timePosted}
                />
            ))}
        </div>
    );
}
