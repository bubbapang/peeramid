import './Suggestion.css';
import Sidebar from './Sidebar';
import ItemSuggestions from './ItemSuggestions';
import { useState } from 'react';
import Pin from '../Profile/Pin';
import PinItem from '../Profile/PinItem';
import { fetchAllPublicSuggestions } from '../../store/suggestions';
import { fetchCategorySuggestions } from '../../store/suggestions';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';



  // const bodySamples = [
  //   'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,',
  //   'Have you considered doing this?ooooooooooooooooooooooooooI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try this',
  //   'This could be a great option for youoooooooooooooooooooI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try thisI think you should try this',
  //   'Maybe give this a shotooooooooooooooooooooooooo',
  //   'This is worth exploringoooooooooooooooooooooooooo',
  //   'I believe this could help youooooooooooooooooooooooo',
  //   'This might be a good ideaooooooooooooooooooooooooooooooooooooooooo',
  //   'Why not try this out?ooooooooooooooooooooooooooooooo',
  //   'You should give this a g0000000000000000000000000o',
  //   'Check this outcdjschsduvhuisvksvgkysgviygvyigisvuy',
  // ];
  
  // function getRandomElement(arr) {
  //   return arr[Math.floor(Math.random() * arr.length)];
  // }
  
  // function generateReviews() {
  //   const suggestions = [];
  
  //   for (let i = 1; i <= 50; i++) {
  //     suggestions.push({
  //       id: i,
  //       user: {
  //         id: i,
  //         username: `user${i}`,
  //         profilePic:
  //           'https://www.pngfind.com/download/hJmwxix_image-placeholder-png-user-profile-placeholder-image-png/',
  //       },
  //       body: getRandomElement(bodySamples),
  //       category: getRandomElement(categories),
  //     });
  //   }
  
  //   return suggestions;
  // }
  
  // const suggestions = generateReviews();
  

export default function Suggestion() {
  const user = useSelector(state => state.session.user)
  const suggestions = useSelector(state => state.suggestions)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPublicSuggestions())
  }, [dispatch])

  // useEffect(() => {

  // })
  const categories = [
    'Transcendence',
    'Actualization',
    'Aesthetics',
    'Cognition',
    'Esteem',
    'Love',
    'Safety',
    'Physiology',
  ];
  
    const [filter, setFilter] = useState('All Suggestions');

    // const handleClick = (e, button) => {
    //   console.log(e)
    //   setFilter(button.label)
    //   dispatch(fetchCategorySuggestions(filter))
    // }

    const buttons = [
    { label: "All Suggestions", emoji: "🔎" },
    { label: "Transcendence", emoji: "🌌" },
    { label: "Actualization", emoji: "🌟" },
    { label: "Aesthetics", emoji: "🎨" },
    { label: "Cognition", emoji: "🧠" },
    { label: "Esteem", emoji: "🏆" },
    { label: "Love", emoji: "❤️" },
    { label: "Safety", emoji: "🔒" },
    { label: "Physiology", emoji: "💪" },
  ];

    const filteredSuggestions = filter === 'All Suggestions'
  ? suggestions
  : suggestions.filter((suggestion) => suggestion.categoryTag === filter);

    return (
        <div className="suggestion-page">
            <div className="sidebar">
            {/* <Sidebar setFilter={setFilter} /> */}
            <div className="sidebar">
                {buttons.map((button, index) => (
                  <button
                    key={index}
                    className="sidebar-button"
                    title={button.label}
                    onClick={() => setFilter(button.label)}
                  >
                    {button.emoji} {button.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="suggestion-list">
            {Object.values(filteredSuggestions).map((suggestion) => (
                <ItemSuggestions key={suggestion.id} suggestion={suggestion} />
            ))}
        </div>
        </div>
    )
}
