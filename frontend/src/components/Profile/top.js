

export default function Top({
    user,
    targetUser,
    finalUser,
    unfollowUser,
    followUser,
    sortedRatings,
    createFollow,
    deleteFollow,
}) {
    const renderFollowButton = () => {
        if (!user || !targetUser) {
            // Don't render the button if either user object is undefined or null.
            return null;
        }
        // if the user searched for someone else, show the follow/unfollow button
        if (user._id !== finalUser._id) {
            return user.following.includes(finalUser._id) ? (
                <button
                    className="unfollow-button"
                    onClick={() => unfollowUser(finalUser._id)}
                >
                    Unfollow
                </button>
            ) : (
                <button
                    className="follow-button"
                    onClick={() => followUser(finalUser._id)}
                >
                    Follow
                </button>
            );
        }
        return null;
    };

    return (
        <div className="top">
            {renderFollowButton()}
            <div className="profile-image"></div>
            <div className="info-box">
                <i id="profile-icon" className="fas fa-user-circle"></i>
                <h2 className="username">{finalUser.username}</h2>
                <div className="stats-layer">
                    <div className="stat-item">
                        <span className="stat-value">
                            {sortedRatings.length}
                        </span>
                        <span className="stat-label">Ratings</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">
                            {finalUser.followers?.length || 0}
                        </span>
                        <span className="stat-label">Followers</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">
                            {finalUser.following?.length || 0}
                        </span>
                        <span className="stat-label">Following</span>
                    </div>
                </div>
            </div>
        </div>
    );
}