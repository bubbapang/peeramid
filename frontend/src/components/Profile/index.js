import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Line, Radar } from 'react-chartjs-2';
import { fetchUserRatings } from '../../store/ratings';
import { getRatings } from '../../store/ratings';
import Pin from './Pin';
import FeedItem from '../Feed/FeedItem';
import './Profile.css';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserRatings(currentUser._id))
    }

    
  }, [dispatch, currentUser])

  useEffect(() => {
    const needColors = {
      Transcendence: "#f94144",
      Actualization: "#f3722c",
      Aesthetics: "#f8961e",
      Cognition: "#f9c74f",
      Esteem: "#90be6d",
      Love: "#43aa8b",
      Safety: "#4d908e",
      Physiology: "#577590",
    };
    const months = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    const needs = ["actualization",
      "aesthetics",
      "esteem",
      "knowledge",
      "love",
      "physiological",
      "safety",
      "transcendance"]
    const frontendNeeds = ["Actualization",
      "Aesthetics",
      "Esteem",
      "Cognition",
      "Love",
      "Physiology",
      "Safety",
      "Transcendence"]
    const datasets = [];
    const ratingsByMonth = {};
    ratings.forEach(rating => {
      const currentYear = new Date().getFullYear();
      const timestamp = Date.parse(rating.createdAt);
      const date = new Date(timestamp)
      if (currentYear === date.getFullYear()) {
        const datestr = date.getMonth();
        ratingsByMonth[datestr] = ratingsByMonth[datestr] || [];
        ratingsByMonth[datestr].push(rating);
      }
    })

    const ratingAvgByNeed = {};
    needs.forEach((need, idx) => {
      for (const [k, val] of Object.entries(ratingsByMonth)) {
        let sum = 0;
        val.forEach(elem => {
          sum += elem[need]
        })
        ratingAvgByNeed[k] = ratingAvgByNeed[k] || {};
        ratingAvgByNeed[k][frontendNeeds[idx]] = sum / val.length;
      }
    })

    for (const [need, color] of Object.entries(needColors)) {
      datasets.push({
        label: need,
        borderColor: color,
        data: months.map(month => ratingAvgByNeed[month] ? ratingAvgByNeed[month][need] : null ),
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

    const totalAvg = (idx) => {
      let sum = 0;
      ratings.forEach(rating => {
        sum += rating[idx]
      })
      return  sum / ratings.length;
    }

    const radarChartData = {
      labels: ['Physiology', 'Safety', 'Love', 'Esteem', 'Cognition', 'Aesthetics', 'Actualization', 'Transcendence'],
      datasets: [
        {
          label: 'Average over time',
          data: [totalAvg("physiological"), totalAvg("safety"),
                  totalAvg("love"), totalAvg("esteem"),
                  totalAvg("knowledge"), totalAvg("aesthetics"),
                  totalAvg("actualization"), totalAvg("transcendance")],
          // data: [7, 7, 8, 6, 3, 5, 8, 6],
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
            color: ["#577590","#4D908E", "#43AA8B", "#90BE6D", "#F9C74F", "#F8961E", "#F3722C", "#F94144"],
          },
          grid: {
            color: "darkgrey",
          },
          pointLabels: {
            color: ["#577590","#4D908E", "#43AA8B", "#90BE6D", "#F9C74F", "#F8961E", "#F3722C", "#F94144"],
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

  const allRatings = useSelector(state => state.ratings)

  const handleFollow = (e) => {
    e.preventDefault();
    console.log('followed')
  }
const sortedRatings = ratings.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
          <div className="ratings-list">
            {ratings.length > 0 ?
            (sortedRatings.map((rating, idx) => (
              <FeedItem key={idx} rating={rating} idx={idx} />
            ))) :
            (<div className='no-ratings'>
              <h2 className='no-rating-heading'>No ratings yet!</h2>
              <Link to='/rating' className='no-decor'>
              <div className='no-rating-nav'>Click to add your first rating on Today's page</div>
              </Link>
            </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}