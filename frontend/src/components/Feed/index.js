import { useState, useEffect, useCallback } from 'react';
import './Feed.css';
import { useRef } from 'react';
import FeedItem from './FeedItem';

const posts = [
    //each post will have a user object as well as the 8 ratings from maslows hierarchy of needs
    {
        user: {
            id: 1,
            username: "user1",
            profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
        },
        ratings: {
            physiological: 1,
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
            physiological: 1,
            safety: 4,
            love: 9,
            esteem: 6,
            cognitition: 5,
            aesthetics: 8,  
            actualization: 7,
            transcendence: 6,
        }
    }, {
        user: {
            id: 3,
            username: "user3",
            profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
        },
        ratings: {
            physiological: 10,
            safety: 10,
            love: 10,
            esteem: 10,
            cognitition: 10,
            aesthetics: 10,
            actualization: 10,
            transcendence: 10,
        }
    },{
        user: {
            id: 4,
            username: "user4",
            profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
        },
        ratings: {
            physiological: 1,
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
            id: 5,
            username: "user5",
            profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
        },
        ratings: {
            physiological: 1,
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
            id: 6,
            username: "user6",
            profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
        },
        ratings: {
            physiological: 1,
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
            id: 7,
            username: "user7",
            profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
        },
        ratings: {
            physiological: 1,
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
            id: 8,
            username: "user8",
            profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
        },
        ratings: {
            physiological: 1,
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
            id: 9,
            username: "user9",
            profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
        },
        ratings: {
            physiological: 1,
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
            id: 10,
            username: "user10",
            profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
        },
        ratings: {
            physiological: 1,
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
            id: 11,
            username: "user11",
            profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
        },
        ratings: {
            physiological: 1,
            safety: 4,
            love: 9,
            esteem: 6,
            cognitition: 5,
            aesthetics: 8,  
            actualization: 7,
            transcendence: 6,
        }
    }, {
        user: {
            id: 12,
            username: "user12",
            profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
        },
        ratings: {
            physiological: 1,
            safety: 4,
            love: 9,
            esteem: 6,
            cognitition: 5,
            aesthetics: 8,  
            actualization: 7,
            transcendence: 6,
        }
    }, {
        user: {
            id: 13,
            username: "user13",
            profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
        },
        ratings: {
            physiological: 1,
            safety: 4,
            love: 9,
            esteem: 6,
            cognitition: 5,
            aesthetics: 8,  
            actualization: 7,
            transcendence: 6,
        }
    }, {
        user: {
            id: 14,
            username: "user14",
            profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
        },
        ratings: {
            physiological: 1,
            safety: 4,
            love: 9,
            esteem: 6,
            cognitition: 5,
            aesthetics: 8,  
            actualization: 7,
            transcendence: 6,
        }
    }, {
        user: {
            id: 15,
            username: "user15",
            profilePic: "https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/"
        },
        ratings: {
            physiological: 1,
            safety: 4,
            love: 9,
            esteem: 6,
            cognitition: 5,
            aesthetics: 8,  
            actualization: 7,
            transcendence: 6,
        }
    }
]

export default function Feed() {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const postBatchSize = 5;
  const containerRef = useRef(null);

  // Load the initial batch of posts
  useEffect(() => {
    setLoadedPosts(posts.slice(0, postBatchSize));
  }, []);

  // Load more posts when the user scrolls to the bottom
  const loadMorePosts = useCallback(() => {
    const currentPostCount = loadedPosts.length;

    if (currentPostCount < posts.length) {
      const newPosts = posts.slice(currentPostCount, currentPostCount + postBatchSize);
      setLoadedPosts([...loadedPosts, ...newPosts]);
    }
  }, [loadedPosts]);

  // Add an event listener for scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) {
        return;
      }
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
      if (scrollHeight - scrollTop === clientHeight) {
        loadMorePosts();
        console.log('scroll')
      }
    };
    if (containerRef.current) {
        console.log('scroll')
      containerRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (containerRef.current) {
        console.log('scroll')
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [loadMorePosts, containerRef]);
  ;

  return (
    <div ref={containerRef} className="feed-container">
      <h1>Feed</h1>
      {loadedPosts.map(post => (
        <FeedItem key={post.user.id} post={post} />
      ))}
    </div>
  );
}


