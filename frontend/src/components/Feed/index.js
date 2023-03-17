import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicRatings, getRatings } from '../../store/ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import FeedItem from './FeedItem';
import './Feed.css';

const placeholderImg = <FontAwesomeIcon icon={faUser} size="2x" />;

export default function Feed() {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const ratingBatchSize = 5;
  const [displayedRating, setDisplayedRating] = useState([]);

  const ratings = useSelector(getRatings);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPublicRatings());
      // loadMorePosts();
    };
    fetchData();
  }, [dispatch]);

  return (
    <div ref={containerRef} className="feed-container">
      {ratings.map((rating, idx) => (
        <FeedItem key={idx} rating={rating} idx={idx} />
      ))}
    </div>
  );
}
