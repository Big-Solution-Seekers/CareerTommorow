import Posts from "../components/Posts";

export default function CommunityForum() {
    const postData = [
        { title: "Post 1", content: "This is the first post", username: "user1", timePosted: "2024-10-15 10:00 AM" },
        { title: "Post 2", content: "Here's some content for post 2", username: "user2", timePosted: "2024-10-15 10:30 AM" },
        { title: "Post 3", content: "Post 3 content goes here", username: "user3", timePosted: "2024-10-15 11:00 AM" },
        { title: "Post 4", content: "Content of post 4", username: "user4", timePosted: "2024-10-15 11:30 AM" },
        { title: "Post 5", content: "Post 5 description", username: "user5", timePosted: "2024-10-15 12:00 PM" },
        { title: "Post 6", content: "Post 6 information", username: "user6", timePosted: "2024-10-15 12:30 PM" },
        { title: "Post 7", content: "Details of post 7", username: "user7", timePosted: "2024-10-15 01:00 PM" },
        { title: "Post 8", content: "Post 8 is about...", username: "user8", timePosted: "2024-10-15 01:30 PM" },
        { title: "Post 9", content: "This is post 9", username: "user9", timePosted: "2024-10-15 02:00 PM" },
        { title: "Post 10", content: "Post 10 details", username: "user10", timePosted: "2024-10-15 02:30 PM" },
      ];
    
      return (
        <div>
            <button>Add a post!</button>
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