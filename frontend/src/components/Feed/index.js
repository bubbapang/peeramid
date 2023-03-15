import './Feed.css';
import FeedItem from './FeedItem';

export default function Feed() {
    // const ratings = useSelector(state => state.ratings); to add later

    const posts = [
        //each post will have a user object as well as the 8 ratings from maslows hierarchy of needs
        {
            user: {
                id: 1,
                username: "user1",
                profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
            },
            ratings: {
                physiological: 5,
                safety: 4,
                love: 3,
                esteem: 2,
                cognitition: 1,
                aesthetics: 5,
                actualization: 4,
                transcendence: 3,
            }     
        }, {
            user: {
                id: 2,
                username: "user2",
                profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
            },
            ratings: {
                physiological: 5,
                safety: 4,
                love: 3,
                esteem: 2,
                cognitition: 1,
                aesthetics: 5,  
                actualization: 4,
                transcendence: 3,
            }
        }
    ]
    return (
        <div className="feed-container">
            <h1>Feed</h1>
            {posts.map(post => 
                <FeedItem post={post} />
            )}
        </div>
    )
}
