import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Line, Radar } from 'react-chartjs-2';
import { getCurrentUser } from '../../store/session'
import { fetchUserRatings } from '../../store/ratings';
import { getRatings } from '../../store/ratings';
import Pin from './Pin';
import FeedItem from '../Feed/FeedItem';
import './Profile.css';

export default function Profile() {

  const dispatch = useDispatch();
  const [bio, setBio] = useState('this is my bio');
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [],
  });
  const [radarData, setRadarData] = useState({
    labels: [],
    datasets: [],
  });
  const [lineOptions, setLineOptions] = useState({});
  const [radarOptions, setRadarOptions] = useState({});
  let currentUser = useSelector(state => state.session.user);
  const dummyUser = {
    firstName: 'Dummy',
    lastName: 'User',
    username: 'dummy_user',
    email: 'dummy@user.io',
    followers: ["", "", ""],
    following: ["", "", ""]
  };
  const finalUser = currentUser ? currentUser : dummyUser;
  const ratings = useSelector(getRatings);
  // ratings ||= {};

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserRatings(currentUser._id))
    }

    
  }, [dispatch, currentUser])

  useEffect(() => {
    // if (ratings.length === 0) { return; }
    const needColors = {
      Transcendence: "#577590",
      Actualization: "#4d908e",
      Aesthetics: "#43aa8b",
      Cognition: "#90be6d",
      Esteem: "#f9c74f",
      Love: "#f8961e",
      Safety: "#f3722c",
      Physiology: "#f94144",
    };
    const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const datasets = [];

    for (const [need, color] of Object.entries(needColors)) {
      datasets.push({
        label: need,
        borderColor: color,
        data: months.map(() => Math.floor(Math.random() * 10 + 1)),
        fill: false,
        tension: 0.1,
      });
    }

    const lineChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets,
    };

    const lineChartOptions = {
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 1,
          max: 10,
          ticks: {
            stepSize: 1,
          },
        },
      },
    };

    const avg = (idx) => {
      let sum = 0;
      ratings.forEach(rating => {
        sum += rating[idx]
      })
      console.log(ratings, idx)
      return  sum / ratings.length;
    }

    const radarChartData = {
      labels: ['Physiology', 'Safety', 'Love', 'Esteem', 'Cognition', 'Aesthetics', 'Actualization', 'Transcendence'],
      datasets: [
        {
          label: 'Average over time',
          // data: [avg("physiological"), avg("safety"),
          //         avg("love"), avg("esteem"),
          //         avg("knowledge"), avg("aesthetics"),
          //         avg("actualization"), avg("transcendance")],
          data: [7, 7, 8, 6, 3, 5, 8, 6],
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(75, 192, 192)',
        },
      ],
    };

    const radarChartOptions = {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        r: {
          min: 1,
          max: 10,
          ticks: {
            stepSize: 1,
          },
          angleLines: {
            color: "darkgreen",
          },
          grid: {
            color: "darkgreen",
          },
          pointLabels: {
            color: "darkgreen",
            font: {
              size: 17,
            },
          },
        },
      },
    };

    setLineData(lineChartData);
    setLineOptions(lineChartOptions);
    setRadarData(radarChartData);
    setRadarOptions(radarChartOptions);
  
  }, [ratings]);

  // console.log(ratings)

  const allRatings = useSelector(state => state.ratings)

  // console.log('profile', ratings)

  const handleFollow = (e) => {
    e.preventDefault();
    console.log('followed')
  }

  return (
    <div className="profile-page">
      <div className="top">
        <div className="info-box">
          <i id="profile-icon" className="fas fa-user-circle"></i>
          <div className="username-layer">
            <h2 className="username">{finalUser.username}</h2>
          </div>
          <div className="stats-layer">
            <div className="stat-item">
              <span className="stat-value">{ratings.length}</span>
              <span className="stat-label">Ratings</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{finalUser.followers.length}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{finalUser.following.length}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
          <div className="bio-layer">
            <p>{bio}</p>
          </div>
          {/* add logout button on the left and a follow button on the right */}
          <div className="buttons-layer">
            {finalUser._id !== currentUser._id && (
                <button className="follow-button" onClick={handleFollow}>Follow</button>
            )}
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className='charts-container'>
          <div className="radar-chart-container">
            <Radar data={radarData} options={radarOptions} />
            <div className="suggestions">
              <Pin />
            </div>
          </div>
          <div className="line-chart-container"><Line data={lineData} options={lineOptions} /></div>
          <div className="ratings">
            {/* <h1>Ratings</h1> */}
            {
            ratings.map((rating, idx) => (
              <FeedItem key={idx} rating={rating} idx={idx} />
            ))
            
            }
          </div>
        </div>
      </div>
    </div>
  );
}