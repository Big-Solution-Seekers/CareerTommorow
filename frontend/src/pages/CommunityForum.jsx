import { useContext, useEffect, useState } from "react";
import PostModel from "../components/PostModal";
import CurrentUserContext from "../contexts/current-user-context";
import '../styles/PostModel.css';


export default function CommunityForum() {
    const { currentUser } = useContext(CurrentUserContext);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    return (
        <div id="community-page">
            <h1 className={`welcome-message ${fadeIn ? 'fade-in' : ''}`}>
                {currentUser 
                    ? `Welcome to the Community Forum ${currentUser.username}!` 
                    : "Welcome to the Community Forum!"}
            </h1>
            <PostModel />
        </div>
    );
}

