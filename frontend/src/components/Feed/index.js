import { useState, useEffect, useCallback, useRef } from 'react';
import './Feed.css';
import FeedItem from './FeedItem';

const placeholderImg = "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/";

const posts = [
  // Add posts data here
    {
        user: {
            id: 1,
            username: 'user1',
            profilePic: placeholderImg
        },
        ratings: {
            physiology: 1,
            safety: 2,
            love: 3,
            esteem: 4,
            cognition: 5,
            selfActualization: 6,
            selfTranscendence: 7,
            selfAcceptance: 8
        },
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.'
    },
    {
        user: {
            id: 2,
            username: 'user2',
            profilePic: placeholderImg
        },
        ratings: {
            physiology: 1,
            safety: 2,
            love: 3,
            esteem: 4,
            cognition: 5,
            selfActualization: 6,
            selfTranscendence: 7,
            selfAcceptance: 8
        },
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.'
    },
].map((post, index) => ({
  ...post,
  user: { ...post.user, profilePic: placeholderImg },
  id: index + 1,
}));

export default function Feed() {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const postBatchSize = 5;
  const containerRef = useRef(null);

  useEffect(() => {
    setLoadedPosts(posts.slice(0, postBatchSize));
  }, []);

  const loadMorePosts = useCallback(() => {
    const currentPostCount = loadedPosts.length;

    if (currentPostCount < posts.length) {
      const newPosts = posts.slice(currentPostCount, currentPostCount + postBatchSize);
      setLoadedPosts([...loadedPosts, ...newPosts]);
    }
  }, [loadedPosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) {
        return;
      }
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
      const isBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if (isBottom) {
        loadMorePosts();
      }
    };

    containerRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      containerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [loadMorePosts]);

  return (
    <div ref={containerRef} className="feed-container">
      {loadedPosts.map(post => (
        <FeedItem key={post.user.id} post={post} />
      ))}
    </div>
  );
}
