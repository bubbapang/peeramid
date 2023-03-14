import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './Profile.css';
import PinnedSuggestions from '../PinnedSuggestions';

const Profile = () => {
  const lineChartRef = useRef(null);
  const radarChartRef = useRef(null);

  useEffect(() => {
    if (lineChartRef.current !== null) {
      lineChartRef.current.destroy();
    }
    const lineChartCanvas = document.getElementById('lineChart');
    const lineChartConfig = {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
              label: 'Physiology',
              data: [55, 99, 80, 81, 76, 85, 40, 55, 99, 80, 81, 76],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            },
            {
              label: 'Safety',
              data: [30, 40, 45, 50, 55, 60, 65, 30, 40, 45, 50, 55],
              fill: false,
              borderColor: 'rgb(55, 159, 64)',
              tension: 0.1
            },
            {
              label: 'Love',
              data: [70, 65, 60, 55, 50, 45, 40, 70, 65, 60, 55, 50],
              fill: false,
              borderColor: 'rgb(155, 97, 12)',
              tension: 0.1
            },
            {
              label: 'Esteem',
              data: [30, 55, 70, 35, 90, 55, 70, 30, 55, 70, 35, 90],
              fill: false,
              borderColor: 'rgb(215, 39, 32)',
              tension: 0.1
            },
            {
              label: 'Cognition',
              data: [70, 65, 60, 55, 50, 45, 40, 70, 65, 60, 55, 50],
              fill: false,
              borderColor: 'rgb(25, 99, 12)',
              tension: 0.1
            },
            {
              label: 'Aesthetic',
              data: [70, 65, 60, 55, 50, 45, 40, 70, 65, 60, 55, 50],
              fill: false,
              borderColor: 'rgb(20, 49, 32)',
              tension: 0.1
            },
            {
              label: 'Self-Actualization',
              data: [70, 65, 60, 55, 50, 45, 40, 70, 65, 60, 55, 50],
              fill: false,
              borderColor: 'rgb(0, 99, 13)',
              tension: 0.1
            },
            {
              label: 'Transcendence',
              data: [70, 65, 60, 55, 50, 45, 40, 70, 65, 60, 55, 50],
              fill: false,
              borderColor: 'rgb(65, 93, 32)',
              tension: 0.1
            }
          ]

        
      },
      options: {}
    };
    lineChartRef.current = new Chart(lineChartCanvas, lineChartConfig);

    if (radarChartRef.current !== null) {
      radarChartRef.current.destroy();
    }
    const radarChartCanvas = document.getElementById('radarChart');
    const radarChartConfig = {
      type: 'radar',
      data: {
        labels: ['Physiology', 'Safety', 'Love', 'Esteem', 'Cognitive', 'Aesthetic', 'Self-Actualization', 'Transcendence'],
        datasets: [{
          label: 'Avg Ratings',
          data: [85, 69, 90, 81, 86, 75, 80, 72],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
      },
      options: {}
    };
    radarChartRef.current = new Chart(radarChartCanvas, radarChartConfig);
  }, []);

  return (
    <div className="profile-container">
        <div className='left-side'>
            <i id="profile-icon" class="fas fa-user-circle"></i>
            <div className='user-info-middle'>
                <h2>First Name</h2>
                <h2>Last Name</h2>
                <h2>Username</h2>
                <h2>Member Since: 2021</h2>
                <h2>Days Logged: 10</h2>
            </div>

            <div className="suggestions">
                <PinnedSuggestions />
            </div>
        </div>  
        
      <div className="charts-container">
        
        <canvas id="lineChart"></canvas>
        <canvas id="radarChart"></canvas>
      </div>
      
    </div>
  );
}

export default Profile;
