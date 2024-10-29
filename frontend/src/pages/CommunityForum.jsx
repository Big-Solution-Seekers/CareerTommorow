import { useState, useContext } from "react";
import PostModel from "../components/PostModal";
import CurrentUserContext from "../contexts/current-user-context";




export default function CommunityForum() {
    const { currentUser } = useContext(CurrentUserContext);


    return (
        <div id='community-page'>
    {/* <h1> Welcome {currentUser.username}!</h1> */}
    <PostModel/>
        </div>
    );
}
