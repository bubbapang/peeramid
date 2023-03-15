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
    const lineChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
    

    const lineChartOptions = {
      // Your existing options
    };

    const radarChartData = {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 90, 81, 56, 55, 40],
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
      // Your existing radar options
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
          <Line data={lineData} options={lineOptions} />
          <Radar data={radarData} options={radarOptions} />
        </div>
          {/* Suggestions */}
          <div className="suggestions">
            <Pin />
          </div>
      </div>

    </div>
  );
}
