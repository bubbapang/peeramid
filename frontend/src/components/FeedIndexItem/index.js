import './FeedIndexItem.css'

export default function FeedIndexItem({post}) {
    return (
        <div className="profile-index-item-container">
            <h1>{post.user.username}</h1>
            <img src={post.user.profilePic} alt="profile-pic" />
        </div>
    )
}