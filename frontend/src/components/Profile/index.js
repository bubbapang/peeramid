import React, { useEffect, useState } from 'react';
import { Line, Radar } from 'react-chartjs-2';
import './Profile.css';
import Pin from './Pin';

export default function Profile() {
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

  // Handle bio change and submit
  // const handleBioChange = (event) => {
  //   setBio(event.target.value);
  // };

  // const handleBioSubmit = (event) => {
  //   event.preventDefault();
  //   // Do something with the bio, e.g. send it to the server
  // };

  // Set up chart data and options
  useEffect(() => {

    // example datum
    // {
    //   label: 'My First Dataset',
    //   data: [65, 59, 80, 81, 56, 55, 40],
    //   fill: false,
    //   borderColor: 'rgb(75, 192, 192)',
    //   tension: 0.1,
    // },
    
    // const needs = ['Physiology', 'Safety', 'Love', 'Esteem', 'Cognition', 'Aesthetics', 'Actualization', 'Transcendence']

    const needColors = {
      "Transcendence": "#577590",
      "Actualization": "#4d908e",
      "Aesthetics": "#43aa8b",
      "Cognition": "#90be6d",
      "Esteem": "#f9c74f",
      "Love": "#f8961e",
      "Safety": "#f3722c",
      "Physiology": "#f94144"
    };
    const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    const datasets = [];

    for (const [need, color] of Object.entries(needColors)) {
      datasets.push({
        label: need,
        borderColor: color,
        data: months.map((month) => Math.floor(Math.random() * 10 + 1)),
        fill: false,
        tension: 0.1,
      });
    }
    

    const lineChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      // insert finished datasets here
      datasets
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
    

    const radarChartData = {
      labels: ['Physiology', 'Safety', 'Love', 'Esteem', 'Cognition', 'Aesthetics', 'Actualization', 'Transcendence'],

      datasets: [
        {
          label: 'Average over time',
          data: [
            8,
            9,
            8,
            8,
            8,
            9,
            8,
            6
          ],
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(75, 192, 192)'
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

  }, []);

  return (
    // Profile Page
    <div className="profile-page">

      {/* Top */}
      <div className="top">

        {/* Info box */}
        <div className="info-box">
          {/* Profile Icon */}
          <i id="profile-icon" className="fas fa-user-circle"></i>

          {/* Username */}
          <div className="username-layer">
            <h2 className="username">andre_hanna</h2>
          </div>

          {/* Ratings, Followers, Following */}
          <div className="stats-layer">
            <div className="stat-item">
              <span className="stat-value">123</span>
              <span className="stat-label">Ratings</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">456</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">789</span>
              <span className="stat-label">Following</span>
            </div>
          </div>

          {/* Bio */}
          <div className="bio-layer">
            <p>{bio}</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bottom">

        {/* Charts */}
        <div className='charts-container'>

          <div className="radar-chart-container">
            <Radar data={radarData} options={radarOptions} />

            {/* Suggestions */}
            <div className="suggestions">
              <Pin />
            </div>
          </div>

          <div className="line-chart-container">
            <Line data={lineData} options={lineOptions} />
          </div>
          
        </div>
      </div>

    </div>
  );
}
