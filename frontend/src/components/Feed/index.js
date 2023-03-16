import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Feed.css';
import FeedItem from './FeedItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const placeholderImg = <FontAwesomeIcon icon={faUser} size="2x" />; // Placeholder image for posts
const needs = ['Physiology', 'Safety', 'Love', 'Esteem', 'Cognition', 'Aesthetics', 'Actualization', 'Transcendence'];

const createRandomPosts = () => {
  const posts = [];

  for (let idx = 0; idx < 30; idx++) {
    const ratings = {};

    for (const need of needs) {
      ratings[need] = Math.floor(Math.random() * 10);
    }

    posts.push({
      user: {
        id: idx + 1,
        username: `User ${idx + 1}`,
        profilePic: placeholderImg,
      },
      ratings,
    });
  }

  return posts;
};

const postData = createRandomPosts();

postData.map((post, index) => ({
  ...post,
  user: { ...post.user, profilePic: placeholderImg },
  id: index + 1,
}));

export default function Feed() {

    const [displayedPosts, setDisplayedPosts] = useState([]);
    const postBatchSize = 5;
    const containerRef = useRef(null);

    // Load initial batch of posts
    useEffect(() => {
      setDisplayedPosts(postData.slice(0, postBatchSize));
    }, []);
  
    const loadMorePosts = useCallback(() => {
      const currentPostCount = displayedPosts.length;
  
      if (currentPostCount < postData.length) {
        const newPosts = postData.slice(currentPostCount, currentPostCount + postBatchSize);
        setDisplayedPosts(prevPosts => [...prevPosts, ...newPosts]);
      }
    }, [displayedPosts]);
  
    // Infinite scrolling effect
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
  
      const containerElement = containerRef.current;
      containerElement?.addEventListener('scroll', handleScroll);
      return () => {
        containerElement?.removeEventListener('scroll', handleScroll);
      };
    }, [loadMorePosts]);
  
    return (
      <div ref={containerRef} className="feed-container">
        {displayedPosts.map(post => (
          <FeedItem key={post.user.id} post={post} />
        ))}
      </div>
    );
  }